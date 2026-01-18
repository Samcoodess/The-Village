
from fastapi import FastAPI, UploadFile, File, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from database import supabase
from websocket_manager import ws_manager
from models import (
    Elder, CallSession, CallStatus, TranscriptLine, VillageAction,
    Concern, ProfileFact, VillageMember
)
from margaret import margaret_elder
from ai_analyzer import ai_analyzer
import requests
import os
import uuid
import json
from livekit import api
from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime
import asyncio
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Request models for API endpoints
class CallRequest(BaseModel):
    participant_name: str = "Margaret"
    room_name: str | None = None
    phone_number: str | None = None # Use E.164 format e.g. +14155551234 but our trunk allows raw numbers

class StartCallRequest(BaseModel):
    elder_id: str

class TranscriptEntry(BaseModel):
    timestamp: str
    speaker: str
    text: str

class TranscriptRequest(BaseModel):
    room_name: str
    transcript: List[TranscriptEntry]
    ended_at: str

class SimulateConcernRequest(BaseModel):
    concern_type: str
    severity: str

# We can reuse the same environment variables
LIVEKIT_API_KEY = os.environ.get("LIVEKIT_API_KEY")
LIVEKIT_API_SECRET = os.environ.get("LIVEKIT_API_SECRET")
LIVEKIT_URL = os.environ.get("LIVEKIT_URL")
SIP_TRUNK_ID = os.environ.get("SIP_TRUNK_ID")

# In-memory storage for demo (replace with database in production)
active_calls: Dict[str, CallSession] = {}
call_history: List[CallSession] = []
village_actions_store: List[VillageAction] = []

app = FastAPI(title="The Village API", version="1.0.0")

# Allow all origins for hackathon simplicity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to The Village API"}

@app.get("/health")
def health_check():
    """Checks if the backend can connect to Supabase"""
    try:
        if not supabase:
             return {"status": "ok", "supabase": "not_configured"}
        return {"status": "ok", "supabase": "initialized"}
    except Exception as e:
        return {"status": "error", "detail": str(e)}


# ============================================================================
# ELDER ENDPOINTS
# ============================================================================

@app.get("/api/elder/{elder_id}")
async def get_elder(elder_id: str) -> Elder:
    """Get elder profile by ID"""
    # For now, return Margaret as the demo elder
    if elder_id == "margaret" or elder_id == margaret_elder.id:
        return margaret_elder
    raise HTTPException(status_code=404, detail=f"Elder not found: {elder_id}")


@app.get("/api/elder/{elder_id}/history")
async def get_elder_history(elder_id: str, limit: int = 10) -> List[CallSession]:
    """Get call history for an elder"""
    if elder_id != "margaret" and elder_id != margaret_elder.id:
        raise HTTPException(status_code=404, detail=f"Elder not found: {elder_id}")

    # Return most recent calls first
    elder_calls = [call for call in call_history if call.elder_id == elder_id]
    return sorted(elder_calls, key=lambda x: x.started_at, reverse=True)[:limit]


# ============================================================================
# CALL ENDPOINTS
# ============================================================================

@app.post("/api/call/start")
async def start_call_api(request: StartCallRequest) -> CallSession:
    """Start a new call with an elder"""
    # Get elder profile
    if request.elder_id == "margaret" or request.elder_id == margaret_elder.id:
        elder = margaret_elder
    else:
        raise HTTPException(status_code=404, detail=f"Elder not found: {request.elder_id}")

    # Create call session
    call_id = str(uuid.uuid4())
    call_session = CallSession(
        id=call_id,
        elder_id=elder.id,
        type="elder_checkin",
        started_at=datetime.utcnow(),
        status=CallStatus.RINGING,
        transcript=[],
        concerns=[],
        profile_updates=[],
        village_actions=[]
    )

    # Store in active calls
    active_calls[call_id] = call_session

    # Broadcast WebSocket event
    await ws_manager.emit_call_started(call_id, elder.id)

    # TODO: Actually initiate LiveKit call
    # For now, just return the call session

    return call_session


@app.post("/api/call/{call_id}/end")
async def end_call_api(call_id: str) -> CallSession:
    """End an active call"""
    if call_id not in active_calls:
        raise HTTPException(status_code=404, detail=f"Call not found: {call_id}")

    call = active_calls[call_id]
    call.ended_at = datetime.utcnow()
    call.status = CallStatus.COMPLETED

    if call.started_at and call.ended_at:
        call.duration_seconds = int((call.ended_at - call.started_at).total_seconds())

    # Broadcast status change
    await ws_manager.emit_call_status(call_id, call.status.value)

    # Broadcast call ended event (with summary if available)
    if call.summary:
        await ws_manager.emit_call_ended(call_id, call.summary.dict())

    # Move to history
    call_history.append(call)
    del active_calls[call_id]

    return call


@app.get("/api/call/{call_id}")
async def get_call(call_id: str) -> CallSession:
    """Get call details by ID"""
    # Check active calls first
    if call_id in active_calls:
        return active_calls[call_id]

    # Check history
    for call in call_history:
        if call.id == call_id:
            return call

    raise HTTPException(status_code=404, detail=f"Call not found: {call_id}")


@app.get("/api/calls")
async def list_calls(elder_id: Optional[str] = None, limit: int = 20) -> List[CallSession]:
    """List all calls, optionally filtered by elder_id"""
    all_calls = list(active_calls.values()) + call_history

    if elder_id:
        all_calls = [call for call in all_calls if call.elder_id == elder_id]

    # Sort by started_at descending (most recent first)
    all_calls.sort(key=lambda x: x.started_at, reverse=True)

    return all_calls[:limit]


# ============================================================================
# VILLAGE ENDPOINTS
# ============================================================================

@app.post("/api/village/trigger")
async def trigger_village_action(action: VillageAction) -> VillageAction:
    """Trigger a village action (call to family/neighbor/medical/volunteer)"""
    # Store the action
    village_actions_store.append(action)

    # TODO: Actually initiate the outbound call
    # For now, just return the action

    return action


@app.get("/api/village/actions")
async def list_village_actions(
    call_id: Optional[str] = None,
    status: Optional[str] = None
) -> List[VillageAction]:
    """List village actions, optionally filtered"""
    actions = village_actions_store

    if call_id:
        actions = [a for a in actions if a.call_session_id == call_id]

    if status:
        actions = [a for a in actions if a.status == status]

    return actions


# ============================================================================
# REAL-TIME TRANSCRIPT STREAMING ENDPOINT
# ============================================================================

class TranscriptChunkRequest(BaseModel):
    call_id: str
    speaker: str  # "elder" or "agent"
    speaker_name: str
    text: str
    timestamp: Optional[str] = None

@app.post("/api/transcript/stream")
async def stream_transcript_chunk(chunk: TranscriptChunkRequest):
    """
    Receive real-time transcript chunks during an active call.
    This endpoint will:
    1. Store the transcript line
    2. Trigger AI analysis
    3. Broadcast to WebSocket subscribers
    """
    call_id = chunk.call_id

    # Check if call exists
    if call_id not in active_calls:
        raise HTTPException(status_code=404, detail=f"Call not found: {call_id}")

    call = active_calls[call_id]

    # Create transcript line
    transcript_line = TranscriptLine(
        id=str(uuid.uuid4()),
        speaker=chunk.speaker,
        speaker_name=chunk.speaker_name,
        text=chunk.text,
        timestamp=chunk.timestamp or datetime.utcnow().isoformat()
    )

    # Add to call transcript
    call.transcript.append(transcript_line)

    # Broadcast to WebSocket subscribers
    await ws_manager.emit_transcript_update(call_id, transcript_line.dict())

    # Get elder profile
    elder = margaret_elder  # For now, hardcoded to Margaret
    if call.elder_id != margaret_elder.id:
        # In production, fetch from database
        pass

    # Trigger AI analysis in the background (non-blocking)
    asyncio.create_task(analyze_and_update_call(call, elder, transcript_line))

    return {"status": "success", "transcript_line_id": transcript_line.id}


async def analyze_and_update_call(call: CallSession, elder: Elder, transcript_line: TranscriptLine):
    """
    Analyze transcript chunk and update call state.
    Runs in background to not block the transcript streaming endpoint.
    """
    try:
        # Run AI analysis
        analysis = await ai_analyzer.analyze_transcript_chunk(call, elder, transcript_line)

        # Update wellbeing assessment
        if analysis.get("wellbeing_update"):
            call.wellbeing = analysis["wellbeing_update"]
            await ws_manager.emit_wellbeing_update(call.id, analysis["wellbeing_update"].dict())

        # Add detected concerns
        for concern in analysis.get("concerns", []):
            call.concerns.append(concern)
            await ws_manager.emit_concern_detected(call.id, concern.dict())

            # Start timer if action required
            if concern.action_required:
                print(f"⚠️  Concern detected requiring action: {concern.description}")

        # Add profile facts
        for fact in analysis.get("profile_facts", []):
            call.profile_updates.append(fact)
            await ws_manager.emit_profile_update(call.id, fact.dict())

        # Trigger village actions
        for suggested_action in analysis.get("suggested_actions", []):
            if suggested_action.get("urgency") == "immediate":
                # Trigger immediate village action
                await trigger_village_action_internal(call, suggested_action)

    except Exception as e:
        print(f"Error in background analysis: {e}")
        import traceback
        traceback.print_exc()


async def trigger_village_action_internal(call: CallSession, suggested_action: Dict):
    """
    Internal function to trigger a village action.
    """
    target_member = suggested_action.get("target_member")
    if not target_member:
        print("No target member found for village action")
        return

    # Create village action
    action = VillageAction(
        id=str(uuid.uuid4()),
        call_session_id=call.id,
        triggered_at=datetime.utcnow().isoformat(),
        type=suggested_action.get("type", "unknown"),
        reason=suggested_action.get("reason", ""),
        target_member_id=target_member.get("id", ""),
        target_member_name=target_member.get("name", ""),
        target_member_phone=target_member.get("phone", ""),
        status="initiated",
        estimated_response_time=suggested_action.get("estimated_response_time", 78)
    )

    # Store action
    village_actions_store.append(action)
    call.village_actions.append(action)

    # Broadcast action started
    await ws_manager.emit_village_action_started(call.id, action.dict())

    print(f"🚨 VILLAGE ACTION TRIGGERED: {action.type} → {action.target_member_name}")

    # Actually call the village member via LiveKit SIP
    asyncio.create_task(call_village_member(call.id, action, suggested_action.get("reason", "")))


async def call_village_member(call_id: str, action: VillageAction, concern_reason: str):
    """
    Actually call a village member via LiveKit SIP when a concern is detected.
    This is the KEY FEATURE - real calls to village members!
    """
    if not LIVEKIT_API_KEY or not LIVEKIT_API_SECRET or not LIVEKIT_URL or not SIP_TRUNK_ID:
        print("⚠️  LiveKit not configured, falling back to simulation")
        await simulate_village_response(call_id, action)
        return

    try:
        # Update status to calling
        action.status = "calling"
        await ws_manager.emit_village_action_update(call_id, action.id, "calling")

        # Format phone number for SIP
        phone = action.target_member_phone
        if not phone:
            print(f"❌ No phone number for {action.target_member_name}")
            action.status = "failed"
            await ws_manager.emit_village_action_update(call_id, action.id, "failed", "No phone number")
            return

        if not phone.startswith("+"):
            phone = "+" + phone

        # Create LiveKit room for this village call
        room_name = f"village-{action.id}"

        # Initialize LiveKit API
        lk_api = api.LiveKitAPI(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET)

        # Initiate ACTUAL SIP call to village member
        print(f"📞 CALLING {action.target_member_name} at {phone}...")

        sip_participant = await lk_api.sip.create_sip_participant(
            api.CreateSIPParticipantRequest(
                sip_trunk_id=SIP_TRUNK_ID,
                sip_call_to=phone,
                room_name=room_name,
                participant_identity=f"village-{action.id}",
                participant_name=action.target_member_name,
                attributes={
                    "concern_type": action.type,
                    "concern_reason": concern_reason,
                    "elder_name": margaret_elder.name
                }
            )
        )

        action.status = "ringing"
        await ws_manager.emit_village_action_update(call_id, action.id, "ringing")

        print(f"📱 SIP call initiated!")
        print(f"   → {action.target_member_name} at {phone}")
        print(f"   → Room: {room_name}")
        print(f"   → Reason: {concern_reason}")

        # Mark as connected (in production, you'd deploy a LiveKit agent to:
        # 1. Join this room
        # 2. Tell the village member about the concern
        # 3. Get their response
        # 4. Update the action status)
        await asyncio.sleep(5)  # Give time for call to connect
        action.status = "connected"
        action.response = f"Called {action.target_member_name}. Concern: {concern_reason}"
        await ws_manager.emit_village_action_update(call_id, action.id, "connected", action.response)

        await lk_api.aclose()

        print(f"✅ Village call established with {action.target_member_name}")

    except Exception as e:
        print(f"❌ Error calling village member: {e}")
        import traceback
        traceback.print_exc()

        action.status = "failed"
        action.response = f"Failed to call: {str(e)}"
        await ws_manager.emit_village_action_update(call_id, action.id, "failed", action.response)


async def simulate_village_response(call_id: str, action: VillageAction):
    """Fallback simulation when LiveKit is not configured"""
    await asyncio.sleep(2)
    action.status = "calling"
    await ws_manager.emit_village_action_update(call_id, action.id, "calling")

    await asyncio.sleep(3)
    action.status = "connected"
    action.response = f"{action.target_member_name} has been notified (simulated - configure LiveKit for real calls)."
    await ws_manager.emit_village_action_update(call_id, action.id, "connected", action.response)

    print(f"✅ Village response simulated for {action.target_member_name}")


# ============================================================================
# DEMO ENDPOINTS
# ============================================================================

@app.post("/api/demo/reset")
async def reset_demo():
    """Reset demo state (clear all calls and actions)"""
    active_calls.clear()
    call_history.clear()
    village_actions_store.clear()

    return {"status": "success", "message": "Demo state reset"}


@app.post("/api/demo/simulate-concern")
async def simulate_concern(request: SimulateConcernRequest):
    """Simulate a concern for testing (useful for demos)"""
    # TODO: Implement concern simulation
    return {
        "status": "success",
        "message": f"Simulated {request.severity} concern: {request.concern_type}"
    }


@app.post("/api/demo/test-websocket/{call_id}")
async def test_websocket(call_id: str):
    """Test WebSocket broadcasting by sending demo events"""
    # Simulate transcript update
    await ws_manager.emit_transcript_update(call_id, {
        "id": str(uuid.uuid4()),
        "speaker": "elder",
        "speaker_name": "Margaret",
        "text": "This is a test message from the WebSocket!",
        "timestamp": datetime.utcnow().isoformat()
    })

    # Simulate status update
    await ws_manager.emit_call_status(call_id, "in_progress")

    return {
        "status": "success",
        "message": f"Test events broadcast to call {call_id}"
    }


# ============================================================================
# WEBSOCKET ENDPOINT
# ============================================================================

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for real-time updates.

    Clients can subscribe to call updates and receive real-time events:
    - call_started
    - call_status
    - transcript_update
    - wellbeing_update
    - concern_detected
    - village_action_started
    - village_action_update
    - call_ended
    - timer_update
    """
    await ws_manager.connect(websocket)

    try:
        # Send welcome message
        await ws_manager.send_personal_message({
            "type": "connected",
            "data": {"message": "WebSocket connected", "timestamp": datetime.utcnow().isoformat()}
        }, websocket)

        # Keep connection alive and handle incoming messages
        while True:
            try:
                # Use receive_text to avoid JSON parsing errors
                raw_data = await websocket.receive_text()

                # Try to parse as JSON
                try:
                    data = json.loads(raw_data)
                except json.JSONDecodeError:
                    await ws_manager.send_personal_message({
                        "type": "error",
                        "data": {"message": "Invalid JSON"}
                    }, websocket)
                    continue

                # Handle client messages
                message_type = data.get("type")

                if message_type == "subscribe_call":
                    # Subscribe to updates for a specific call
                    call_id = data.get("call_id")
                    if call_id:
                        ws_manager.subscribe_to_call(websocket, call_id)
                        await ws_manager.send_personal_message({
                            "type": "subscribed",
                            "data": {"call_id": call_id}
                        }, websocket)

                elif message_type == "ping":
                    # Respond to ping to keep connection alive
                    await ws_manager.send_personal_message({
                        "type": "pong",
                        "data": {"timestamp": datetime.utcnow().isoformat()}
                    }, websocket)

                else:
                    # Unknown message type - just log it, don't close connection
                    print(f"Unknown WebSocket message type: {message_type}")

            except WebSocketDisconnect:
                break
            except Exception as e:
                print(f"Error processing WebSocket message: {e}")
                # Don't break the loop for message processing errors

    except WebSocketDisconnect:
        pass
    except Exception as e:
        print(f"WebSocket connection error: {e}")
    finally:
        ws_manager.disconnect(websocket)


# ============================================================================
# LEGACY ENDPOINTS (Keep for backward compatibility with voice agent)
# ============================================================================

@app.post("/get_biomarkers")
async def get_biomarkers(file: UploadFile = File(...)):
    """
    Proxies the audio file to Vital Audio API to get biomarkers.
    """
    url = "https://api.qr.sonometrik.vitalaudio.io/analyze-audio"
    
    # Headers from test.py
    headers = {
        'Origin': 'https://qr.sonometrik.vitalaudio.io',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
        'DNT': '1',
        'Sec-CH-UA': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
        'Sec-CH-UA-Mobile': '?0',
        'Sec-CH-UA-Platform': '"macOS"'
    }

    try:
        # Read file content
        file_content = await file.read()
        
        # Prepare payload
        files = {
            'audio_file': (file.filename, file_content, file.content_type or 'audio/mp3')
        }
        data = {
            'name': 'test_audio_file' # Or maybe use filename
        }

        # Send request
        response = requests.post(url, files=files, data=data, headers=headers)
        
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=f"Vital Audio API Error: {response.text}")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@app.post("/start_call")
async def start_call(request: CallRequest):
    """
    Creates a room and automatically starts recording.
    1. If `phone_number` is provided, it initiates an outbound SIP call to that number.
    2. If NOT provided, returns an access token for a frontend web client to join.
    3. Automatically starts recording the call audio.
    4. Agent will automatically capture and save transcript when call ends.
    """
    
    if not LIVEKIT_API_KEY or not LIVEKIT_API_SECRET or not LIVEKIT_URL:
        raise HTTPException(status_code=500, detail="LiveKit credentials not configured")

    room_name = request.room_name or f"call-{uuid.uuid4()}"
    
    lk_api = api.LiveKitAPI(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET)
    
    try:
        # If phone number is provided, dial out via SIP
        if request.phone_number:
            if not SIP_TRUNK_ID:
                raise HTTPException(status_code=500, detail="SIP_TRUNK_ID not configured in backend environment. Please add it to your .env file.")

            # Ensure number is in E.164
            num = request.phone_number.strip()
            if not num.startswith("+"):
                # Basic fix, assuming US if not specified, or just add + if user forgot
                num = "+" + num 
                
            sip_participant = await lk_api.sip.create_sip_participant(
                api.CreateSIPParticipantRequest(
                    sip_trunk_id=SIP_TRUNK_ID, 
                    sip_call_to=num,
                    room_name=room_name,
                    participant_identity=f"sip-{num}-{uuid.uuid4()}",
                    participant_name=request.participant_name,
                )
            )
            
            response_data = {
                "message": f"Calling {num}...",
                "room_name": room_name,
                "sip_participant_id": sip_participant.participant_id
            }
            
        else:
            # WebRTC (Frontend Client)
            participant_identity = f"user-{uuid.uuid4()}"
            
            token = api.AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET) \
                .with_identity(participant_identity) \
                .with_name(request.participant_name) \
                .with_grants(api.VideoGrants(
                    room_join=True,
                    room=room_name,
                ))
            
            response_data = {
                "room_name": room_name,
                "token": token.to_jwt(),
                "url": LIVEKIT_URL
            }
        
        # Start recording automatically (if configured)
        # Note: Recording requires LiveKit Egress to be properly configured
        # For now, we'll skip recording if not configured properly
        recording_enabled = os.getenv("ENABLE_RECORDING", "false").lower() == "true"
        
        if recording_enabled:
            try:
                os.makedirs("recordings", exist_ok=True)
                timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S')
                recording_filename = f"{room_name}_{timestamp}.mp3"
                
                # For LiveKit Egress to work, you need to configure file output in your LiveKit Cloud
                # Or use S3/GCS/Azure storage. For now, we'll try basic file output
                egress = await lk_api.egress.start_room_composite_egress(
                    api.RoomCompositeEgressRequest(
                        room_name=room_name,
                        file_outputs=[
                            api.EncodedFileOutput(
                                file_type=api.EncodedFileType.MP4,  # MP4 with audio-only
                                filepath=recording_filename,
                            )
                        ],
                        audio_only=True,
                    )
                )
                
                response_data["recording"] = {
                    "status": "started",
                    "egress_id": egress.egress_id,
                    "file": f"recordings/{recording_filename}"
                }
                print(f"🎙️  Recording started: {recording_filename}")
                
            except Exception as recording_error:
                print(f"⚠️  Recording failed to start: {recording_error}")
                response_data["recording"] = {
                    "status": "failed",
                    "error": str(recording_error),
                    "note": "Recording requires LiveKit Egress configuration. Transcript will still be saved."
                }
        else:
            response_data["recording"] = {
                "status": "disabled",
                "note": "Set ENABLE_RECORDING=true in .env to enable audio recording"
            }
        
        await lk_api.aclose()
        return response_data
        
    except Exception as e:
        await lk_api.aclose()
        # Check for specific "missing sip trunk id" message from LiveKit to give better hint
        msg = str(e)
        if "missing sip trunk id" in msg.lower():
            raise HTTPException(status_code=500, detail="LiveKit returned 'Missing SIP Trunk ID'. Verify your SIP_TRUNK_ID is correct and valid in your .env file.")
        
        raise HTTPException(status_code=500, detail=f"Failed to start call: {msg}")

@app.post("/save_transcript")
async def save_transcript(request: TranscriptRequest):
    """
    Receives and stores call transcripts locally.
    """
    try:
        # Save to local file system
        os.makedirs("transcripts", exist_ok=True)
        timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S')
        filename = f"transcripts/{request.room_name}_{timestamp}.json"
        
        with open(filename, "w") as f:
            import json
            json.dump({
                "room_name": request.room_name,
                "transcript": [entry.dict() for entry in request.transcript],
                "ended_at": request.ended_at,
                "saved_at": datetime.utcnow().isoformat()
            }, f, indent=2)
        
        print(f"📝 Transcript saved: {filename}")
        
        return {
            "status": "success",
            "message": f"Transcript saved for room {request.room_name}",
            "file": filename
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save transcript: {str(e)}")

@app.get("/get_transcript/{room_name}")
async def get_transcript(room_name: str):
    """
    Retrieve transcript for a specific room from local files.
    """
    try:
        import glob
        # Find all transcripts matching the room name
        files = glob.glob(f"transcripts/{room_name}_*.json")
        
        if not files:
            raise HTTPException(status_code=404, detail=f"No transcripts found for room: {room_name}")
        
        # Return the most recent transcript
        latest_file = max(files, key=os.path.getmtime)
        
        with open(latest_file, "r") as f:
            import json
            return json.load(f)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve transcript: {str(e)}")

@app.post("/start_recording/{room_name}")
async def start_recording(room_name: str):
    """
    Start recording audio for a specific room using LiveKit Egress.
    The recording will be saved as an MP3 file.
    """
    if not LIVEKIT_API_KEY or not LIVEKIT_API_SECRET or not LIVEKIT_URL:
        raise HTTPException(status_code=500, detail="LiveKit credentials not configured")
    
    try:
        lk_api = api.LiveKitAPI(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET)
        
        # Create recordings directory if it doesn't exist
        os.makedirs("recordings", exist_ok=True)
        
        # Start room composite recording (all participants' audio combined)
        egress = await lk_api.egress.start_room_composite_egress(
            api.RoomCompositeEgressRequest(
                room_name=room_name,
                file_outputs=[
                    api.EncodedFileOutput(
                        filepath=f"recordings/{room_name}_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.mp3",
                    )
                ],
                audio_only=True,
            )
        )
        
        await lk_api.aclose()
        
        return {
            "status": "recording_started",
            "room_name": room_name,
            "egress_id": egress.egress_id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start recording: {str(e)}")

@app.get("/list_transcripts")
async def list_transcripts():
    """
    List all available transcripts from local files.
    """
    try:
        import glob
        transcripts = []
        
        # Get all transcript files
        files = glob.glob("transcripts/*.json")
        
        for file in files:
            try:
                with open(file, "r") as f:
                    import json
                    data = json.load(f)
                    transcripts.append({
                        "room_name": data.get("room_name"),
                        "file": file,
                        "ended_at": data.get("ended_at"),
                        "total_messages": data.get("total_messages", len(data.get("transcript", []))),
                        "created_at": datetime.fromtimestamp(os.path.getmtime(file)).isoformat()
                    })
            except Exception as e:
                print(f"Error reading {file}: {e}")
        
        # Sort by creation time (most recent first)
        transcripts.sort(key=lambda x: x["created_at"], reverse=True)
        
        return {
            "count": len(transcripts),
            "transcripts": transcripts
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list transcripts: {str(e)}")
