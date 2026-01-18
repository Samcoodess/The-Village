
import os
from dotenv import load_dotenv

load_dotenv()

# Try to import supabase, but gracefully handle if not installed
try:
    from supabase import create_client, Client
    SUPABASE_AVAILABLE = True
except ImportError:
    print("Info: Supabase module not installed. Running in demo mode without database.")
    SUPABASE_AVAILABLE = False
    Client = None

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_KEY")

supabase: Client = None

if SUPABASE_AVAILABLE and url and key:
    try:
        supabase = create_client(url, key)
        print("✅ Supabase client initialized successfully")
    except Exception as e:
        print(f"⚠️  Warning: Failed to initialize Supabase client: {e}")
        supabase = None
elif SUPABASE_AVAILABLE:
    print("ℹ️  Info: Supabase credentials not found. Running without database.")
else:
    print("ℹ️  Info: Running in demo mode (no database connection)")
