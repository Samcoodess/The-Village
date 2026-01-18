from dotenv import load_dotenv

from livekit import agents, rtc
from livekit.agents import AgentServer, AgentSession, Agent, room_io, llm
from livekit.plugins import noise_cancellation, silero, google
from livekit.plugins.turn_detector.multilingual import MultilingualModel
import os
import json
import asyncio
from datetime import datetime

# Load environment variables
# First try .env.local, then fall back to .env in the project root
load_dotenv(".env.local")
load_dotenv()  # This will load from .env if .env.local doesn't exist

# Define absolute path for saving files
PROJECT_ROOT = "/Users/amnesiac/Fall/The-Village"

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
    # Track transcript for this call
    transcript = []
    room_name = ctx.room.name
    call_start_time = datetime.utcnow()
    
    print(f"")
    print(f"🎬 Call started for room: {room_name}")
    print(f"📞 Participant count: {len(ctx.room.remote_participants)}")
    print(f"🎙️  Recording: Managed by LiveKit Egress (started from main.py)")
    print(f"")
    
    session = AgentSession(
        stt="assemblyai/universal-streaming:en",
        llm=google.LLM(model="gemini-2.5-flash"),  # Using Gemini!
        tts="cartesia/sonic-3:9626c31c-bec5-4cca-baa8-f8ba9e84c8bc",
        vad=silero.VAD.load(),
        # turn_detection=MultilingualModel(),  # Temporarily disabled to test quickly
    )
    
    # Use the correct event from LiveKit docs: conversation_item_added
    @session.on("conversation_item_added")
    def on_conversation_item_added(event):
        """Capture all conversation items (user + agent) as they're added to chat history"""
        try:
            # The event has an 'item' attribute which contains the ChatMessage
            chat_message = event.item if hasattr(event, 'item') else event
            
            # Extract role and content from the chat message
            role = chat_message.role if hasattr(chat_message, 'role') else "unknown"
            
            # Content is usually a list, so join or take first element
            if hasattr(chat_message, 'content'):
                content = chat_message.content
                if isinstance(content, list) and len(content) > 0:
                    content = content[0]  # Take first element if it's a list
                elif isinstance(content, list):
                    content = ""
                else:
                    content = str(content)
            else:
                content = str(chat_message)
            
            # Map role to speaker (user or assistant/agent)
            if role in ["user", "human"]:
                speaker = "user"
                emoji = "👤"
            elif role in ["assistant", "agent"]:
                speaker = "agent"
                emoji = "🤖"
            else:
                speaker = role
                emoji = "💬"
            
            # Add to transcript
            transcript.append({
                "timestamp": datetime.utcnow().isoformat(),
                "speaker": speaker,
                "text": content
            })
            
            print(f"{emoji} [{speaker.upper()}]: {content}")
            
        except Exception as e:
            print(f"❌ Error in conversation_item_added: {e}")
            print(f"🔍 Event type: {type(event)}")
            print(f"🔍 Event: {event}")
            import traceback
            traceback.print_exc()
    
    # Define shutdown callback to save transcript
    async def save_transcript_on_shutdown():
        call_end_time = datetime.utcnow()
        duration = (call_end_time - call_start_time).total_seconds()
        
        print(f"")
        print(f"=" * 60)
        print(f"🔄 Session ending for room: {room_name}")
        print(f"⏱️  Call duration: {duration:.1f} seconds")
        print(f"💬 Total messages captured: {len(transcript)}")
        print(f"=" * 60)
        
        # Always try to save transcript
        try:
            # Create transcripts directory
            transcripts_dir = os.path.join(PROJECT_ROOT, "transcripts")
            os.makedirs(transcripts_dir, exist_ok=True)
            
            # Save to local file
            timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S')
            filename = os.path.join(transcripts_dir, f"{room_name}_{timestamp}.json")
            
            transcript_data = {
                "room_name": room_name,
                "transcript": transcript,
                "started_at": call_start_time.isoformat(),
                "ended_at": call_end_time.isoformat(),
                "duration_seconds": round(duration, 2),
                "total_messages": len(transcript),
                "user_messages": len([t for t in transcript if t['speaker'] == 'user']),
                "agent_messages": len([t for t in transcript if t['speaker'] == 'agent'])
            }
            
            with open(filename, "w") as f:
                json.dump(transcript_data, f, indent=2)
            
            print(f"✅ Transcript saved: {filename}")
            print(f"   📊 {transcript_data['user_messages']} user messages")
            print(f"   📊 {transcript_data['agent_messages']} agent messages")
            
        except Exception as e:
            print(f"❌ Failed to save transcript: {e}")
            import traceback
            traceback.print_exc()
        
        print(f"🎙️  Recording: Managed by LiveKit Egress (will be saved to S3)")
        print(f"=" * 60)
        print(f"")
    
    # Register shutdown callback
    ctx.add_shutdown_callback(save_transcript_on_shutdown)
    print(f"✅ Shutdown callback registered for transcript saving")

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


if __name__ == "__main__":
    agents.cli.run_app(server)
