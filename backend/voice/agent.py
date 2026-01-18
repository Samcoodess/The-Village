from dotenv import load_dotenv

from livekit import agents, rtc
from livekit.agents import AgentServer, AgentSession, Agent, room_io
from livekit.plugins import noise_cancellation, silero, google
from livekit.plugins.turn_detector.multilingual import MultilingualModel
import os
import json
import asyncio
import aiohttp
from datetime import datetime

# Load environment variables
# First try .env.local, then fall back to .env in the project root
load_dotenv(".env.local")
load_dotenv()  # This will load from .env if .env.local doesn't exist

# Backend API configuration
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""You are a helpful voice AI assistant.
            You eagerly assist users with their questions by providing information from your extensive knowledge.
            Your responses are concise, to the point, and without any complex formatting or punctuation including emojis, asterisks, or other symbols.
            You are curious, friendly, and have a sense of humor.""",
        )

server = AgentServer()

@server.rtc_session()
async def my_agent(ctx: agents.JobContext):
    # Track transcript for this call (for backup/local storage)
    transcript = []
    room_name = ctx.room.name

    # Extract call_id from room_name or use room_name as call_id
    # Backend creates rooms with specific names, we'll use room_name as call_id
    call_id = room_name

    # Create HTTP session for streaming transcripts to backend
    http_session = aiohttp.ClientSession()

    print(f"🎙️  Agent starting for room: {room_name}")
    print(f"📡 Backend URL: {BACKEND_URL}")

    try:
        session = AgentSession(
            stt="assemblyai/universal-streaming:en",
            llm=google.LLM(model="gemini-2.5-flash"),  # Using Gemini!
            tts="cartesia/sonic-3:9626c31c-bec5-4cca-baa8-f8ba9e84c8bc",
            vad=silero.VAD.load(),
            # turn_detection=MultilingualModel(),  # Temporarily disabled to test quickly
        )

        # NEW: Real-time transcript streaming for user speech
        @session.on("user_input_transcribed")
        async def on_user_transcript(event):
            """Stream user speech to backend as it's transcribed"""
            # Only send final transcripts (not interim/partial)
            if event.is_final:
                transcript_data = {
                    "timestamp": datetime.utcnow().isoformat(),
                    "speaker": "elder",
                    "text": event.transcript
                }
                transcript.append(transcript_data)

                print(f"[USER]: {event.transcript}")

                # POST to backend API
                try:
                    async with http_session.post(
                        f"{BACKEND_URL}/api/transcript/stream",
                        json={
                            "call_id": call_id,
                            "speaker": "elder",
                            "speaker_name": "Margaret",
                            "text": event.transcript,
                            "timestamp": datetime.utcnow().isoformat()
                        },
                        timeout=aiohttp.ClientTimeout(total=3)
                    ) as resp:
                        if resp.status == 200:
                            print(f"  ✓ Streamed to backend")
                        else:
                            error_text = await resp.text()
                            print(f"  ⚠️  Backend returned {resp.status}: {error_text}")
                except asyncio.TimeoutError:
                    print(f"  ⚠️  Backend timeout - continuing call")
                except Exception as e:
                    print(f"  ⚠️  Error streaming to backend: {e}")
                    # Don't break the call if backend fails

        # NEW: Real-time transcript streaming for agent responses
        @session.on("conversation_item_added")
        async def on_conversation_item(event):
            """Stream agent responses to backend"""
            item = event.item

            # Only stream agent (assistant) responses
            if item.role == "assistant":
                transcript_data = {
                    "timestamp": datetime.utcnow().isoformat(),
                    "speaker": "agent",
                    "text": item.content
                }
                transcript.append(transcript_data)

                print(f"[AGENT]: {item.content}")

                # POST to backend API
                try:
                    async with http_session.post(
                        f"{BACKEND_URL}/api/transcript/stream",
                        json={
                            "call_id": call_id,
                            "speaker": "agent",
                            "speaker_name": "Village Agent",
                            "text": item.content,
                            "timestamp": datetime.utcnow().isoformat()
                        },
                        timeout=aiohttp.ClientTimeout(total=3)
                    ) as resp:
                        if resp.status == 200:
                            print(f"  ✓ Streamed to backend")
                        else:
                            error_text = await resp.text()
                            print(f"  ⚠️  Backend returned {resp.status}: {error_text}")
                except asyncio.TimeoutError:
                    print(f"  ⚠️  Backend timeout - continuing call")
                except Exception as e:
                    print(f"  ⚠️  Error streaming to backend: {e}")

        await session.start(
            room=ctx.room,
            agent=Assistant(),
            room_options=room_io.RoomOptions(
                audio_input=room_io.AudioInputOptions(
                    noise_cancellation=lambda params: noise_cancellation.BVCTelephony() if params.participant.kind == rtc.ParticipantKind.PARTICIPANT_KIND_SIP else noise_cancellation.BVC(),
                ),
            ),
        )

        await session.generate_reply(
            instructions="Greet the user and offer your assistance."
        )

        # Register shutdown callback to save transcript and cleanup
        async def cleanup():
            # Save transcript to local file (backup)
            if transcript:
                try:
                    os.makedirs("transcripts", exist_ok=True)
                    timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S')
                    filename = f"transcripts/{room_name}_{timestamp}.json"

                    transcript_data = {
                        "room_name": room_name,
                        "transcript": transcript,
                        "started_at": transcript[0]["timestamp"] if transcript else datetime.utcnow().isoformat(),
                        "ended_at": datetime.utcnow().isoformat(),
                        "total_messages": len(transcript)
                    }

                    with open(filename, "w") as f:
                        json.dump(transcript_data, f, indent=2)

                    print(f"✅ Transcript saved: {filename}")
                    print(f"   Total messages: {len(transcript)}")

                except Exception as e:
                    print(f"❌ Failed to save transcript: {e}")

            # Close HTTP session
            await http_session.close()
            print(f"🔌 HTTP session closed")

        # Add shutdown callback
        ctx.add_shutdown_callback(cleanup)

    except Exception as e:
        print(f"❌ Agent error: {e}")
        await http_session.close()
        raise


if __name__ == "__main__":
    agents.cli.run_app(server)
