-- The Village Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- ============================================================================
-- ELDERS TABLE
-- ============================================================================

CREATE TABLE elders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    phone TEXT NOT NULL,
    photo_url TEXT,
    address TEXT NOT NULL,

    -- Medical info (stored as JSONB)
    medical_info JSONB NOT NULL DEFAULT '{
        "primary_doctor": "",
        "practice_name": "",
        "practice_phone": "",
        "medications": [],
        "conditions": []
    }'::jsonb,

    -- Wellbeing baseline (stored as JSONB)
    wellbeing_baseline JSONB NOT NULL DEFAULT '{
        "typical_mood": "",
        "social_frequency": "",
        "cognitive_baseline": "",
        "physical_limitations": [],
        "known_concerns": []
    }'::jsonb,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- VILLAGE MEMBERS TABLE
-- ============================================================================

CREATE TABLE village_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    elder_id UUID NOT NULL REFERENCES elders(id) ON DELETE CASCADE,

    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('family', 'neighbor', 'medical', 'mental_health', 'volunteer', 'service')),
    relationship TEXT NOT NULL,
    phone TEXT NOT NULL,
    availability TEXT,
    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_village_members_elder ON village_members(elder_id);

-- ============================================================================
-- PROFILE FACTS TABLE
-- ============================================================================

CREATE TABLE profile_facts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    elder_id UUID NOT NULL REFERENCES elders(id) ON DELETE CASCADE,

    fact TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('family', 'medical', 'interests', 'history', 'preferences', 'personality')),
    context TEXT,
    learned_at TIMESTAMPTZ DEFAULT NOW(),
    source_call_id UUID,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profile_facts_elder ON profile_facts(elder_id);

-- ============================================================================
-- CALL SESSIONS TABLE
-- ============================================================================

CREATE TABLE call_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    elder_id UUID NOT NULL REFERENCES elders(id) ON DELETE CASCADE,

    type TEXT NOT NULL CHECK (type IN ('elder_checkin', 'village_outbound')),
    target_member_id UUID REFERENCES village_members(id),

    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER,
    status TEXT NOT NULL CHECK (status IN ('ringing', 'in_progress', 'completed', 'failed', 'no_answer')),

    -- Wellbeing assessment (stored as JSONB)
    wellbeing JSONB,

    -- Call summary (stored as JSONB)
    summary JSONB,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_call_sessions_elder ON call_sessions(elder_id);
CREATE INDEX idx_call_sessions_started ON call_sessions(started_at DESC);

-- ============================================================================
-- TRANSCRIPT LINES TABLE
-- ============================================================================

CREATE TABLE transcript_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    call_session_id UUID NOT NULL REFERENCES call_sessions(id) ON DELETE CASCADE,

    speaker TEXT NOT NULL CHECK (speaker IN ('agent', 'elder', 'village_member')),
    speaker_name TEXT NOT NULL,
    text TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transcript_call ON transcript_lines(call_session_id, timestamp);

-- ============================================================================
-- CONCERNS TABLE
-- ============================================================================

CREATE TABLE concerns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    call_session_id UUID NOT NULL REFERENCES call_sessions(id) ON DELETE CASCADE,

    dimension TEXT NOT NULL CHECK (dimension IN ('emotional', 'mental', 'social', 'physical', 'cognitive')),
    type TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('low', 'moderate', 'high', 'critical')),
    description TEXT NOT NULL,
    quote TEXT NOT NULL,
    detected_at TIMESTAMPTZ DEFAULT NOW(),

    action_required BOOLEAN DEFAULT FALSE,
    is_pattern BOOLEAN DEFAULT FALSE,
    pattern_history JSONB DEFAULT '[]'::jsonb,
    actions_triggered JSONB DEFAULT '[]'::jsonb
);

CREATE INDEX idx_concerns_call ON concerns(call_session_id);
CREATE INDEX idx_concerns_detected ON concerns(detected_at DESC);

-- ============================================================================
-- VILLAGE ACTIONS TABLE
-- ============================================================================

CREATE TABLE village_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    call_session_id UUID NOT NULL REFERENCES call_sessions(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES village_members(id),

    action_type TEXT NOT NULL,
    reason TEXT NOT NULL,
    urgency TEXT NOT NULL CHECK (urgency IN ('immediate', 'today', 'this_week')),
    context_for_recipient TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'calling', 'in_progress', 'completed', 'failed', 'no_answer')),

    initiated_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    response TEXT,
    outbound_call_id UUID REFERENCES call_sessions(id)
);

CREATE INDEX idx_village_actions_call ON village_actions(call_session_id);
CREATE INDEX idx_village_actions_status ON village_actions(status, initiated_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - Optional but recommended
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE elders ENABLE ROW LEVEL SECURITY;
ALTER TABLE village_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcript_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE concerns ENABLE ROW LEVEL SECURITY;
ALTER TABLE village_actions ENABLE ROW LEVEL SECURITY;

-- For hackathon: Allow all operations (you can tighten this later)
CREATE POLICY "Allow all for service role" ON elders FOR ALL USING (true);
CREATE POLICY "Allow all for service role" ON village_members FOR ALL USING (true);
CREATE POLICY "Allow all for service role" ON profile_facts FOR ALL USING (true);
CREATE POLICY "Allow all for service role" ON call_sessions FOR ALL USING (true);
CREATE POLICY "Allow all for service role" ON transcript_lines FOR ALL USING (true);
CREATE POLICY "Allow all for service role" ON concerns FOR ALL USING (true);
CREATE POLICY "Allow all for service role" ON village_actions FOR ALL USING (true);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_elders_updated_at BEFORE UPDATE ON elders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
