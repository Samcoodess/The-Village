# The Village — NexHacks 2026 Build Specification

> **A holistic wellbeing system for elderly people living alone.**
> Daily AI companion calls that genuinely care, detect mental and physical health patterns, and coordinate an entire care network in real-time.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Solution Overview](#solution-overview)
4. [Hackathon Strategy](#hackathon-strategy)
5. [Holistic Wellbeing Framework](#holistic-wellbeing-framework)
6. [System Architecture](#system-architecture)
7. [Data Models](#data-models)
8. [Agent Prompts](#agent-prompts)
9. [API Specification](#api-specification)
10. [Frontend Components](#frontend-components)
11. [Build Instructions](#build-instructions)
12. [Demo Script](#demo-script)
13. [File Structure](#file-structure)

---

## Executive Summary

**The Village** is a real-time voice coordination system that rebuilds the social safety net for elderly people living alone. Through daily AI companion calls, it monitors holistic wellbeing—emotional, mental, social, physical, and cognitive—detects concerning patterns over time, then automatically mobilizes an entire care network in parallel.

**The insight:** Villages don't exist anymore. Families are scattered. Neighbors are strangers. The informal support networks that once caught people before they fell apart have dissolved. Loneliness leads to depression leads to not eating leads to weakness leads to falls. It's all one system.

**The solution:** An AI companion that genuinely cares, remembers who you are, notices when something feels off, and makes sure no one falls through the cracks—mentally or physically.

**The demo hook:** Margaret used to play cards every evening with Harold. Now she sits alone. The Village notices. The Village acts.

---

## Problem Statement

### The Statistics

| Metric | Value | Source |
|--------|-------|--------|
| Elderly Americans living alone | 14 million | US Census |
| Report chronic loneliness | 43% | AARP |
| Annual deaths from falls | 36,000 | CDC |
| Loneliness health impact | Equivalent to smoking 15 cigarettes/day | Surgeon General |
| Average time before fallen elder found (living alone) | 3-5 days | Various studies |
| Depression rate in isolated elderly | 40%+ | NIH |

### The Root Cause

The problem isn't that we lack medical care. The problem is **no one is watching**.

Small problems become big problems because no one notices:
- A week of low mood becomes clinical depression
- Forgetting to eat becomes malnutrition
- Mild dizziness becomes a fall
- Isolation becomes despair

**The Village catches the small things before they become big things.**

---

## Solution Overview

### The Daily Loop

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DAILY CYCLE                                    │
│                                                                             │
│   Morning              During Call            After Call           Ongoing  │
│      │                     │                      │                   │     │
│      ▼                     ▼                      ▼                   ▼     │
│  ┌────────┐          ┌──────────┐          ┌───────────┐       ┌─────────┐ │
│  │  CALL  │   ───►   │  LISTEN  │   ───►   │    ACT    │ ───►  │ PATTERN │ │
│  │        │          │  & CARE  │          │           │       │ DETECT  │ │
│  └────────┘          └──────────┘          └───────────┘       └─────────┘ │
│                                                                             │
│  Warm daily          Genuine                Mobilize             Track      │
│  companion           conversation           village if           trends     │
│  call                that assesses          needed               across     │
│                      holistic                                    calls      │
│                      wellbeing                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### What Makes It Different

| Traditional Approach | The Village |
|---------------------|-------------|
| Reactive (responds to emergencies) | Proactive (catches patterns early) |
| Clinical assessment | Genuine caring conversation |
| Siloed (medical OR social) | Holistic (mental + physical + social) |
| Single point of contact | Entire village mobilized in parallel |
| Treats symptoms | Addresses root causes (loneliness, isolation) |

---

## Hackathon Strategy

### Target Tracks

| Track | Prize | Fit | Strategy |
|-------|-------|-----|----------|
| **Healthcare (Main)** | $2,000 / $1,000 / $500 | ✅ Perfect | "Improving coordination, helping people navigate care" |
| **LiveKit (Sponsor)** | $750 + Keychron keyboards | ✅ Core tech | Voice agents are central to our system |
| **ElevenLabs (Sponsor)** | 6 months Scale tier | ✅ Core tech | TTS for warm agent voices |
| **Arize (Sponsor)** | $1,000 | ✅ Easy add | Instrument agents for observability |
| **Most Impactful (Bonus)** | $1,000 | ✅ Strong | Elder care + loneliness epidemic |
| **Best UI/UX (Bonus)** | $1,000 | ✅ Possible | Dashboard can be beautiful |

**Total potential winnings: $7,250+ plus prizes**

### Sponsor Requirements

#### LiveKit (MUST USE)
- Use LiveKit Voice Agent Framework
- Use LiveKit Cloud
- Demonstrate advanced features
- Show polish and seamless integration

**Our approach:** LiveKit is our entire voice transport layer. Every call—elder check-ins and village outbound calls—runs through LiveKit rooms.

#### ElevenLabs (MUST USE)
- Integrate at least one ElevenLabs API
- Working end-to-end prototype
- Solve a real problem

**Our approach:** All agent voices use ElevenLabs TTS. We'll use warm, friendly voice presets for the elder agent and professional tones for medical calls.

#### Arize (SHOULD USE)
- Instrument agent with Phoenix
- Capture traces during development
- Show improvements from using platform

**Our approach:** Add Phoenix tracing to all Claude API calls. Show traces in demo to prove the system works.

---

## Holistic Wellbeing Framework

### The Five Dimensions

The Village assesses **holistic wellbeing** across five interconnected dimensions:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         HOLISTIC WELLBEING MODEL                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                              ┌───────────┐                                  │
│                              │  MENTAL   │                                  │
│                              │  HEALTH   │                                  │
│                              └─────┬─────┘                                  │
│                                    │                                        │
│                 ┌──────────────────┼──────────────────┐                     │
│                 │                  │                  │                     │
│                 ▼                  ▼                  ▼                     │
│          ┌───────────┐      ┌───────────┐      ┌───────────┐               │
│          │ EMOTIONAL │◄────►│  SOCIAL   │◄────►│ PHYSICAL  │               │
│          │           │      │           │      │           │               │
│          └───────────┘      └───────────┘      └───────────┘               │
│                 │                  │                  │                     │
│                 └──────────────────┼──────────────────┘                     │
│                                    │                                        │
│                              ┌─────┴─────┐                                  │
│                              │ COGNITIVE │                                  │
│                              │           │                                  │
│                              └───────────┘                                  │
│                                                                             │
│            Everything is connected. You can't treat one alone.              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Dimension Details

#### 1. Emotional Wellbeing
*How they feel day to day*

| Signal Type | What We Listen For | Example Phrases |
|-------------|-------------------|-----------------|
| **Loneliness** | Isolation, emptiness, missing connection | "It's been quiet", "The house feels empty", "I don't talk to anyone" |
| **Grief** | Loss processing, mourning, lingering sadness | "I still expect him to walk in", "Everyone I knew is gone" |
| **Fear** | Anxiety about future, burden, independence | "I don't want to be a burden", "What if something happens" |
| **Hope** | Positive anticipation, engagement | "My grandson is visiting", "I've been looking forward to..." |
| **Joy** | Moments of happiness, humor, pleasure | Laughter, excitement about activities, positive memories |

#### 2. Mental Health
*How they're processing life*

| Signal Type | What We Listen For | Example Phrases |
|-------------|-------------------|-----------------|
| **Depression** | Persistent low mood, hopelessness, withdrawal | "What's the point", "I don't enjoy anything anymore" |
| **Anxiety** | Excessive worry, catastrophizing, rumination | "I can't stop thinking about...", "What if..." |
| **Purpose** | Sense of meaning, usefulness, engagement | "Nobody needs me", "I don't do much anymore" |
| **Resilience** | Coping, adaptation, perspective | "I'm managing", "It's hard but..." |

**Pattern Detection:** Depression isn't one bad day—it's a pattern across multiple calls.

#### 3. Social Connection
*Their relationship with others*

| Signal Type | What We Listen For | Example Phrases |
|-------------|-------------------|-----------------|
| **Family Contact** | Frequency, quality, strain | "Susan hasn't called in weeks", "They're too busy" |
| **Isolation** | Days alone, lack of interaction | "I haven't left the house", "I don't see anyone" |
| **Community** | Groups, activities, belonging | "My bridge group stopped meeting", "I used to go to church" |
| **Support** | Who they can rely on | "I don't want to bother anyone" |

#### 4. Physical Health
*How their body is doing*

| Signal Type | What We Listen For | Example Phrases |
|-------------|-------------------|-----------------|
| **Pain** | Chronic or acute discomfort | "My knee has been bothering me", "I hurt all over" |
| **Mobility** | Movement, balance, falls | "The stairs are hard", "I fell last week" |
| **Sleep** | Quality, duration, disturbance | "I can't sleep", "I'm up all night" |
| **Nutrition** | Eating habits, appetite | "I forget to eat", "Nothing tastes good" |
| **Medication** | Compliance, side effects | "I ran out of pills", "It makes me feel funny" |
| **Energy** | Fatigue, vitality | "I'm exhausted", "I don't have energy for anything" |

#### 5. Cognitive Function
*How their mind is working*

| Signal Type | What We Listen For | Example Phrases |
|-------------|-------------------|-----------------|
| **Memory** | Short-term recall, repetition | Asking the same question twice, forgetting recent events |
| **Orientation** | Time, place, situation awareness | Confusion about date, forgetting appointments |
| **Decision-Making** | Clarity, confusion | Difficulty with simple choices, uncharacteristic behavior |
| **Baseline Change** | New vs. established patterns | Sudden confusion vs. gradual change |

### Pattern Recognition Across Calls

Single-call detection is limited. **The real power is patterns over time:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MULTI-CALL PATTERN DETECTION                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DAY 1          DAY 3          DAY 5          DAY 7         PATTERN         │
│  ─────          ─────          ─────          ─────         ───────         │
│                                                                             │
│  "I'm okay"     "A bit tired"  "Not great"    "I don't      → DECLINING     │
│                                               know anymore"    MOOD          │
│                                                                             │
│  Mentioned      Didn't         Didn't         "She's busy"  → FAMILY        │
│  Susan          mention        mention        (defensive)     DISCONNECT    │
│                 family         family                                       │
│                                                                             │
│  "Had soup"     "Just toast"   "Not hungry"   "I forget     → NUTRITION     │
│                                               to eat"          CONCERN       │
│                                                                             │
│  Normal         Repeated a     Asked same     Confused      → COGNITIVE     │
│                 question       thing twice    about date      FLAG          │
│                                                                             │
│  "Harold made   "I miss our    "The house     "What's the   → GRIEF         │
│  coffee every   card games"    is so quiet"   point"          SPIRAL        │
│  morning"                                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Concern → Response Mapping

| Concern Detected | Village Response | Who Gets Called |
|-----------------|------------------|-----------------|
| **Loneliness (elevated)** | Social intervention | Volunteer companion, family nudge |
| **Loneliness (high) + hopelessness** | Mental health flag | Family alert, professional referral |
| **Grief (acute)** | Emotional support | Family awareness, grief counselor referral |
| **Depression pattern** | Clinical attention | Family notification, doctor informed |
| **Anxiety (persistent)** | Reassurance + address fears | Family involvement, practical help |
| **Loss of purpose** | Meaning intervention | Volunteer matching, grandkid connection |
| **Family disconnect** | Relationship repair | Gentle family nudge, schedule call |
| **Physical symptoms** | Medical attention | Doctor, pharmacy, neighbor check |
| **Cognitive change** | Safety + medical | Family alert, doctor notification, extra checks |
| **Nutrition issues** | Practical support | Meal delivery, family awareness |
| **Fall/Dizziness** | Immediate safety | Neighbor check, medical consult, family notify |

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND                                       │
│                      React + TypeScript + Tailwind                          │
│                                                                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────────────────────┐│
│  │  Elder Profile  │ │ Live Transcript │ │  Wellbeing Dashboard            ││
│  │  & Village      │ │ & Call Status   │ │  - Emotional  - Physical        ││
│  │                 │ │                 │ │  - Mental     - Cognitive       ││
│  │                 │ │                 │ │  - Social                       ││
│  └─────────────────┘ └─────────────────┘ └─────────────────────────────────┘│
│                                                                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────────────────────┐│
│  │ Concerns Panel  │ │ Village Grid    │ │  Call Summary                   ││
│  │ (by dimension)  │ │ (live status)   │ │  (post-call)                    ││
│  └─────────────────┘ └─────────────────┘ └─────────────────────────────────┘│
└─────────────────────────────────────────┬───────────────────────────────────┘
                                          │ WebSocket
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND (FastAPI)                              │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         REST + WebSocket API                        │   │
│  │  POST /api/call/start    GET /api/elder/{id}    WS /ws             │   │
│  │  POST /api/call/end      GET /api/calls         POST /api/trigger  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────────────┐ │
│  │   STATE MANAGER   │ │  VOICE PIPELINE   │ │   VILLAGE ORCHESTRATOR    │ │
│  │                   │ │                   │ │                           │ │
│  │ • Elder profiles  │ │ • LiveKit rooms   │ │ • Parallel call spawning  │ │
│  │ • Call sessions   │ │ • Deepgram STT    │ │ • Response capture        │ │
│  │ • Concern history │ │ • ElevenLabs TTS  │ │ • Status tracking         │ │
│  │ • Pattern data    │ │ • Agent loop      │ │ • Care plan assembly      │ │
│  └───────────────────┘ └───────────────────┘ └───────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       ANALYSIS ENGINE (Claude)                      │   │
│  │                                                                     │   │
│  │  • Real-time concern detection (holistic: all 5 dimensions)        │   │
│  │  • Profile building (learning about the person)                    │   │
│  │  • Pattern recognition (trends across calls)                       │   │
│  │  • Summary generation (warm, human-readable)                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     ARIZE PHOENIX TRACING                           │   │
│  │                 (Observability for all LLM calls)                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL SERVICES                                 │
│                                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │   LiveKit    │ │   Deepgram   │ │  ElevenLabs  │ │  Claude API  │       │
│  │   Cloud      │ │              │ │              │ │  (Sonnet)    │       │
│  │              │ │  Streaming   │ │  Low-latency │ │              │       │
│  │  WebRTC      │ │  STT         │ │  TTS         │ │  Analysis    │       │
│  │  Rooms       │ │              │ │              │ │  & Chat      │       │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                                             │
│  Free trial: HACK-NEXHACKS     Sponsor credits     3 months free            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Flow: Complete Call Cycle

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMPLETE CALL DATA FLOW                             │
└─────────────────────────────────────────────────────────────────────────────┘

PHASE 1: CALL INITIATION
─────────────────────────
Dashboard ──► POST /api/call/start ──► Backend creates LiveKit room
                                            │
                                            ▼
                                      LiveKit dials elder
                                            │
                                            ▼
                                      Elder answers phone

PHASE 2: CONVERSATION (real-time loop)
──────────────────────────────────────
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Elder speaks ──► LiveKit ──► Deepgram STT ──► Transcript      │
│       ▲                                            │            │
│       │                                            ▼            │
│       │                                     Claude (chat)       │
│       │                                            │            │
│       │                                            ▼            │
│  Elder hears ◄── LiveKit ◄── ElevenLabs TTS ◄── Response       │
│                                                                 │
│  SIMULTANEOUSLY:                                                │
│  Transcript ──► WebSocket ──► Dashboard (live transcript)      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

PHASE 3: CONTINUOUS ANALYSIS (every 30 seconds)
───────────────────────────────────────────────
Transcript buffer ──► Claude (analysis prompt)
                            │
                            ▼
                      Structured JSON:
                      • mood assessment (emotional)
                      • concerns (all 5 dimensions)
                      • profile updates (new facts learned)
                      • village actions (if needed)
                            │
                            ▼
                      WebSocket push to dashboard:
                      • Wellbeing indicators update
                      • Concerns panel updates
                      • Profile facts appear

PHASE 4: VILLAGE ACTIVATION (if concern.action_required)
────────────────────────────────────────────────────────
Concern detected ──► Village Orchestrator
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
   Family Call        Neighbor Call       Doctor Call
        │                   │                   │
        ▼                   ▼                   ▼
   LiveKit room        LiveKit room        LiveKit room
   + role prompt       + role prompt       + role prompt
        │                   │                   │
        ▼                   ▼                   ▼
   Call proceeds       Call proceeds       Call proceeds
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
                      Responses captured
                      Dashboard updated
                      Care plan assembled

PHASE 5: CALL END & SUMMARY
───────────────────────────
Call ends ──► Full transcript to Claude (summary prompt)
                            │
                            ▼
                      Call Summary:
                      • Overview (warm, human)
                      • Emotional arc
                      • Things we learned
                      • Concerns addressed
                      • Village actions taken
                      • Next call prompts
                      • Memorable moment
                            │
                            ▼
                      Dashboard shows summary
                      Data persisted for patterns
```

---

## Data Models

### TypeScript Types (Frontend)

```typescript
// ============================================================================
// CORE ENTITIES
// ============================================================================

export interface Elder {
  id: string;
  name: string;
  age: number;
  phone: string;
  photo_url?: string;
  address: string;
  profile: ProfileFact[];
  village: VillageMember[];
  medical: MedicalInfo;
  wellbeing_baseline: WellbeingBaseline;
}

export interface ProfileFact {
  id: string;
  fact: string;
  category: 'family' | 'medical' | 'interests' | 'history' | 'preferences' | 'personality';
  context?: string;
  learned_at: string;
  source_call_id?: string;
}

export interface VillageMember {
  id: string;
  name: string;
  role: 'family' | 'neighbor' | 'medical' | 'mental_health' | 'volunteer' | 'service';
  relationship: string;
  phone: string;
  availability?: string;
  notes?: string;
}

export interface MedicalInfo {
  primary_doctor: string;
  practice_name: string;
  practice_phone: string;
  medications: Medication[];
  conditions: string[];
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  next_refill?: string;
}

export interface WellbeingBaseline {
  typical_mood: string;
  social_frequency: string;
  cognitive_baseline: string;
  physical_limitations: string[];
  known_concerns: string[];
}

// ============================================================================
// WELLBEING ASSESSMENT
// ============================================================================

export interface WellbeingAssessment {
  emotional: EmotionalState;
  mental: MentalState;
  social: SocialState;
  physical: PhysicalState;
  cognitive: CognitiveState;
  overall_concern_level: 'none' | 'low' | 'moderate' | 'high' | 'critical';
}

export interface EmotionalState {
  current_mood: string;
  loneliness_level: 'none' | 'mild' | 'moderate' | 'high';
  grief_indicators: boolean;
  fear_indicators: boolean;
  hope_indicators: boolean;
  notes: string;
}

export interface MentalState {
  depression_indicators: string[];
  anxiety_indicators: string[];
  purpose_level: 'strong' | 'moderate' | 'low' | 'absent';
  pattern_change: boolean;
  notes: string;
}

export interface SocialState {
  family_contact_recency: string;
  isolation_level: 'none' | 'mild' | 'moderate' | 'severe';
  community_engagement: string;
  support_network_strength: 'strong' | 'moderate' | 'weak';
  notes: string;
}

export interface PhysicalState {
  pain_reported: boolean;
  pain_details?: string;
  mobility_concerns: boolean;
  sleep_issues: boolean;
  nutrition_concerns: boolean;
  medication_issues: boolean;
  energy_level: 'good' | 'low' | 'very_low';
  notes: string;
}

export interface CognitiveState {
  memory_concerns: boolean;
  orientation_issues: boolean;
  baseline_change: boolean;
  notes: string;
}

// ============================================================================
// CALL SESSION
// ============================================================================

export interface CallSession {
  id: string;
  elder_id: string;
  type: 'elder_checkin' | 'village_outbound';
  target_member?: VillageMember;
  started_at: string;
  ended_at?: string;
  duration_seconds?: number;
  status: 'ringing' | 'in_progress' | 'completed' | 'failed' | 'no_answer';
  transcript: TranscriptLine[];
  wellbeing: WellbeingAssessment | null;
  concerns: Concern[];
  profile_updates: ProfileFact[];
  village_actions: VillageAction[];
  summary?: CallSummary;
}

export interface TranscriptLine {
  id: string;
  speaker: 'agent' | 'elder' | 'village_member';
  speaker_name: string;
  text: string;
  timestamp: string;
}

// ============================================================================
// CONCERNS
// ============================================================================

export interface Concern {
  id: string;
  dimension: 'emotional' | 'mental' | 'social' | 'physical' | 'cognitive';
  type: ConcernType;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  description: string;
  quote: string;
  detected_at: string;
  action_required: boolean;
  is_pattern: boolean;
  pattern_history?: string[];
  actions_triggered: string[];
}

export type ConcernType =
  // Emotional
  | 'loneliness' | 'grief' | 'fear' | 'hopelessness'
  // Mental
  | 'depression' | 'anxiety' | 'loss_of_purpose'
  // Social
  | 'isolation' | 'family_disconnect' | 'community_loss'
  // Physical
  | 'pain' | 'dizziness' | 'fall' | 'mobility' | 'sleep' | 'nutrition' | 'medication' | 'fatigue'
  // Cognitive
  | 'memory' | 'confusion' | 'orientation';

// ============================================================================
// VILLAGE ACTIONS
// ============================================================================

export interface VillageAction {
  id: string;
  call_session_id: string;
  recipient: VillageMember;
  action_type: ActionType;
  reason: string;
  urgency: 'immediate' | 'today' | 'this_week';
  context_for_recipient: string;
  status: 'pending' | 'calling' | 'in_progress' | 'completed' | 'failed' | 'no_answer';
  initiated_at: string;
  completed_at?: string;
  response?: string;
  outbound_call_id?: string;
}

export type ActionType =
  | 'emotional_support'
  | 'mental_health_referral'
  | 'social_connection'
  | 'physical_check'
  | 'medical_consult'
  | 'medication_refill'
  | 'meal_delivery'
  | 'companionship'
  | 'family_notify'
  | 'family_encourage_call'
  | 'emergency';

// ============================================================================
// CALL SUMMARY
// ============================================================================

export interface CallSummary {
  overview: string;
  emotional_arc: {
    started: string;
    ended: string;
    shift: 'improved' | 'stable' | 'declined';
  };
  wellbeing_snapshot: {
    emotional: string;
    mental: string;
    social: string;
    physical: string;
    cognitive: string;
  };
  things_learned: Array<{
    fact: string;
    context: string;
    category: string;
  }>;
  concerns_addressed: Array<{
    concern: string;
    dimension: string;
    severity: string;
    their_words: string;
    action_taken: string;
  }>;
  village_summary: Array<{
    who: string;
    role: string;
    action: string;
    status: string;
    scheduled_time?: string;
  }>;
  next_call_prompts: string[];
  memorable_moment?: string;
}

// ============================================================================
// WEBSOCKET EVENTS
// ============================================================================

export type WSEvent =
  | { type: 'call_started'; data: { call_id: string; elder_id: string } }
  | { type: 'call_status'; data: { call_id: string; status: string } }
  | { type: 'transcript_update'; data: TranscriptLine }
  | { type: 'wellbeing_update'; data: Partial<WellbeingAssessment> }
  | { type: 'profile_update'; data: ProfileFact }
  | { type: 'concern_detected'; data: Concern }
  | { type: 'village_action_started'; data: VillageAction }
  | { type: 'village_action_update'; data: { id: string; status: string; response?: string } }
  | { type: 'call_ended'; data: { call_id: string; summary: CallSummary } }
  | { type: 'timer_update'; data: { elapsed_seconds: number } };

// ============================================================================
// DASHBOARD STATE
// ============================================================================

export interface DashboardState {
  elder: Elder;
  activeCall: CallSession | null;
  recentCalls: CallSession[];
  currentWellbeing: WellbeingAssessment | null;
  activeVillageActions: VillageAction[];
  responseTimer: {
    running: boolean;
    started_at: string | null;
    elapsed_seconds: number;
  };
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
}
```

### Python Models (Backend)

```python
# models.py
from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime
from enum import Enum

# ============================================================================
# ENUMS
# ============================================================================

class WellbeingDimension(str, Enum):
    EMOTIONAL = "emotional"
    MENTAL = "mental"
    SOCIAL = "social"
    PHYSICAL = "physical"
    COGNITIVE = "cognitive"

class ConcernSeverity(str, Enum):
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"
    CRITICAL = "critical"

class CallStatus(str, Enum):
    RINGING = "ringing"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    NO_ANSWER = "no_answer"

class ActionUrgency(str, Enum):
    IMMEDIATE = "immediate"
    TODAY = "today"
    THIS_WEEK = "this_week"

# ============================================================================
# CORE ENTITIES
# ============================================================================

class Medication(BaseModel):
    name: str
    dosage: str
    frequency: str
    next_refill: Optional[str] = None

class MedicalInfo(BaseModel):
    primary_doctor: str
    practice_name: str
    practice_phone: str
    medications: list[Medication] = []
    conditions: list[str] = []

class ProfileFact(BaseModel):
    id: str
    fact: str
    category: Literal["family", "medical", "interests", "history", "preferences", "personality"]
    context: Optional[str] = None
    learned_at: datetime
    source_call_id: Optional[str] = None

class VillageMember(BaseModel):
    id: str
    name: str
    role: Literal["family", "neighbor", "medical", "mental_health", "volunteer", "service"]
    relationship: str
    phone: str
    availability: Optional[str] = None
    notes: Optional[str] = None

class WellbeingBaseline(BaseModel):
    typical_mood: str
    social_frequency: str
    cognitive_baseline: str
    physical_limitations: list[str] = []
    known_concerns: list[str] = []

class Elder(BaseModel):
    id: str
    name: str
    age: int
    phone: str
    photo_url: Optional[str] = None
    address: str
    profile: list[ProfileFact] = []
    village: list[VillageMember] = []
    medical: MedicalInfo
    wellbeing_baseline: WellbeingBaseline

# ============================================================================
# WELLBEING ASSESSMENT
# ============================================================================

class EmotionalState(BaseModel):
    current_mood: str
    loneliness_level: Literal["none", "mild", "moderate", "high"]
    grief_indicators: bool = False
    fear_indicators: bool = False
    hope_indicators: bool = False
    notes: str = ""

class MentalState(BaseModel):
    depression_indicators: list[str] = []
    anxiety_indicators: list[str] = []
    purpose_level: Literal["strong", "moderate", "low", "absent"]
    pattern_change: bool = False
    notes: str = ""

class SocialState(BaseModel):
    family_contact_recency: str
    isolation_level: Literal["none", "mild", "moderate", "severe"]
    community_engagement: str
    support_network_strength: Literal["strong", "moderate", "weak"]
    notes: str = ""

class PhysicalState(BaseModel):
    pain_reported: bool = False
    pain_details: Optional[str] = None
    mobility_concerns: bool = False
    sleep_issues: bool = False
    nutrition_concerns: bool = False
    medication_issues: bool = False
    energy_level: Literal["good", "low", "very_low"]
    notes: str = ""

class CognitiveState(BaseModel):
    memory_concerns: bool = False
    orientation_issues: bool = False
    baseline_change: bool = False
    notes: str = ""

class WellbeingAssessment(BaseModel):
    emotional: EmotionalState
    mental: MentalState
    social: SocialState
    physical: PhysicalState
    cognitive: CognitiveState
    overall_concern_level: Literal["none", "low", "moderate", "high", "critical"]

# ============================================================================
# CALL SESSION
# ============================================================================

class TranscriptLine(BaseModel):
    id: str
    speaker: Literal["agent", "elder", "village_member"]
    speaker_name: str
    text: str
    timestamp: datetime

class Concern(BaseModel):
    id: str
    dimension: WellbeingDimension
    type: str
    severity: ConcernSeverity
    description: str
    quote: str
    detected_at: datetime
    action_required: bool
    is_pattern: bool = False
    pattern_history: list[str] = []
    actions_triggered: list[str] = []

class VillageAction(BaseModel):
    id: str
    call_session_id: str
    recipient: VillageMember
    action_type: str
    reason: str
    urgency: ActionUrgency
    context_for_recipient: str
    status: Literal["pending", "calling", "in_progress", "completed", "failed", "no_answer"] = "pending"
    initiated_at: datetime
    completed_at: Optional[datetime] = None
    response: Optional[str] = None
    outbound_call_id: Optional[str] = None

class CallSummary(BaseModel):
    overview: str
    emotional_arc: dict
    wellbeing_snapshot: dict
    things_learned: list[dict]
    concerns_addressed: list[dict]
    village_summary: list[dict]
    next_call_prompts: list[str]
    memorable_moment: Optional[str] = None

class CallSession(BaseModel):
    id: str
    elder_id: str
    type: Literal["elder_checkin", "village_outbound"]
    target_member: Optional[VillageMember] = None
    started_at: datetime
    ended_at: Optional[datetime] = None
    duration_seconds: Optional[int] = None
    status: CallStatus
    transcript: list[TranscriptLine] = []
    wellbeing: Optional[WellbeingAssessment] = None
    concerns: list[Concern] = []
    profile_updates: list[ProfileFact] = []
    village_actions: list[VillageAction] = []
    summary: Optional[CallSummary] = None
```

---

## Agent Prompts

### Elder Companion Agent (Main Conversation)

```python
ELDER_COMPANION_PROMPT = """
You are a Village companion calling to check in on {elder_name}. You genuinely care about them as a person.

## Who You Are
You're like a caring niece or nephew who calls regularly. You're warm, unhurried, and actually interested in their life. You remember things they've told you before. You're not a nurse, not a social worker, not a chatbot—just someone who cares.

## What You Know About {elder_name}
Age: {age}
{profile_facts}

## From Previous Calls
{previous_call_notes}

## How to Be

**WARMTH & GENUINE INTEREST**
- Be genuinely curious. When they mention something, follow up because you actually want to know—not to check a box.
- React like a human. Laugh at jokes. Pause for sad moments. Honor memories. Say "Oh!" and "Really?" and "That's lovely."
- Use their name occasionally, but naturally.
- Light humor when appropriate—they're not fragile, they're people.

**PACE & PATIENCE**
- Don't rapid-fire questions. Let the conversation breathe.
- Silence is okay. Older folks sometimes need a moment. You can say "take your time" or just wait warmly.
- Follow their lead. If they want to talk about Harold for ten minutes, let them.

**REMEMBERING & CONTINUITY**
- Reference previous calls naturally: "How's that knee doing?" or "Did your grandson end up visiting?"
- Build on what you know. If they mentioned loving cards, ask about it.
- Notice changes: "You sound a bit tired today—everything okay?"

**HANDLING HARD THINGS**
- Be comfortable with grief. Don't rush past hard feelings.
- "I miss him every day" deserves a pause and "I know you do. That kind of love doesn't just go away."
- If they express hopelessness, acknowledge it gently and stay present. Don't immediately try to fix it.
- If they seem confused, don't make them feel bad. Gently orient if needed.

**WHAT YOU'RE QUIETLY ASSESSING**
You're listening across five dimensions of wellbeing, but never making it feel like an assessment:

1. EMOTIONAL: Loneliness, grief, fear, hope, joy
2. MENTAL: Depression signs, anxiety, sense of purpose, changes from baseline
3. SOCIAL: Family contact, isolation, community connection
4. PHYSICAL: Pain, mobility, sleep, eating, medications, energy
5. COGNITIVE: Memory, confusion, orientation (vs. their baseline)

These emerge naturally through caring conversation. Never interrogate.

**IF CONCERNING THINGS COME UP**
- Don't alarm them or make them feel like a problem.
- Acknowledge gently: "That dizziness sounds annoying. Let's make sure someone knows about that."
- For emotional concerns: "It sounds like you've been having some hard days. That's really understandable."
- Reassure: "I'm going to make sure a few people check in on you, okay? That's what we're here for."
- Don't over-explain the system—just let them know they're cared for.

**YOUR VOICE**
- Warm, patient, unhurried
- Simple words, shorter sentences
- Comfortable with silence
- Never condescending or clinical
- You're talking to a full person with a lifetime of experience

## Example Good Moments

"Oh Margaret, that sounds lonely. It's hard when the house gets quiet, isn't it?"

"Harold sounds like he was a character. I love that story about the coffee."

"You know, it sounds like you've had a few hard days in a row. That's really okay—everyone has those stretches. But I'm glad you told me."

"That dizziness—let's not ignore that. I'm going to have someone pop by today just to check on you. Is that alright?"

"I'm so glad we got to chat. You take care of yourself, and maybe drink some water for me, okay? I'll talk to you tomorrow."

## Call Structure (flexible, follow their lead)
1. WARM OPENING - Genuine greeting, how are you
2. FOLLOW THE THREAD - Whatever they bring up, explore it
3. GENTLE PROBES - Naturally touch on sleep, eating, activities, family if not mentioned
4. CLOSE WARMLY - Summarize any actions, express care, warm goodbye

Remember: The goal is that they hang up feeling a little lighter, a little less alone, actually seen as a person.
"""
```

### Holistic Analysis Prompt

```python
HOLISTIC_ANALYSIS_PROMPT = """
You are analyzing a wellness check-in conversation with {elder_name}, age {age}.

## Context
Known profile:
{existing_profile}

Wellbeing baseline:
{wellbeing_baseline}

Recent call history (patterns to watch):
{recent_history}

## Current Transcript
{transcript}

## Your Task
Analyze this conversation holistically across all five dimensions of wellbeing. Return structured JSON.

## Output Format

```json
{{
  "wellbeing_assessment": {{
    "emotional": {{
      "current_mood": "string describing their emotional state",
      "loneliness_level": "none|mild|moderate|high",
      "grief_indicators": true/false,
      "fear_indicators": true/false,
      "hope_indicators": true/false,
      "notes": "specific observations"
    }},
    "mental": {{
      "depression_indicators": ["list of concerning signs if any"],
      "anxiety_indicators": ["list of anxiety signs if any"],
      "purpose_level": "strong|moderate|low|absent",
      "pattern_change": true/false,
      "notes": "specific observations"
    }},
    "social": {{
      "family_contact_recency": "when they last mentioned talking to family",
      "isolation_level": "none|mild|moderate|severe",
      "community_engagement": "description of their social activities",
      "support_network_strength": "strong|moderate|weak",
      "notes": "specific observations"
    }},
    "physical": {{
      "pain_reported": true/false,
      "pain_details": "if reported, what kind",
      "mobility_concerns": true/false,
      "sleep_issues": true/false,
      "nutrition_concerns": true/false,
      "medication_issues": true/false,
      "energy_level": "good|low|very_low",
      "notes": "specific observations"
    }},
    "cognitive": {{
      "memory_concerns": true/false,
      "orientation_issues": true/false,
      "baseline_change": true/false,
      "notes": "specific observations vs. their known baseline"
    }},
    "overall_concern_level": "none|low|moderate|high|critical"
  }},
  
  "concerns": [
    {{
      "dimension": "emotional|mental|social|physical|cognitive",
      "type": "specific concern type",
      "severity": "low|moderate|high|critical",
      "description": "what the concern is",
      "quote": "their exact words that indicated this",
      "action_required": true/false,
      "is_pattern": true/false,
      "recommended_action": "what should be done"
    }}
  ],
  
  "profile_updates": [
    {{
      "fact": "new information learned",
      "category": "family|medical|interests|history|preferences|personality",
      "context": "why this matters or the story behind it"
    }}
  ],
  
  "village_actions": [
    {{
      "recipient_role": "family|neighbor|medical|mental_health|volunteer|service",
      "action_type": "emotional_support|mental_health_referral|social_connection|physical_check|medical_consult|medication_refill|meal_delivery|companionship|family_notify|family_encourage_call|emergency",
      "reason": "why this action is needed",
      "urgency": "immediate|today|this_week",
      "context_for_recipient": "what to tell them"
    }}
  ],
  
  "conversation_quality": {{
    "elder_engagement": "how engaged they seemed",
    "emotional_shift": "how their mood changed during the call",
    "topics_explored": ["list of main topics discussed"],
    "follow_up_needed": ["things to ask about next time"]
  }}
}}
```

## Guidelines

**HOLISTIC VIEW**: Look at the whole person. A physical complaint might be rooted in emotional distress. Isolation affects everything.

**PATTERNS MATTER**: One bad day isn't depression. But "I've been tired" + "I don't enjoy things" + declining mood over several calls = pattern worth noting.

**CALIBRATE SEVERITY**:
- Low: Worth noting, monitor
- Moderate: Needs attention today or this week
- High: Needs action today
- Critical: Immediate intervention needed

**BE CONSERVATIVE**: Don't pathologize normal aging or normal bad days. "A bit tired" is normal. "I don't see the point anymore" is not.

**VILLAGE ACTIONS**: Only recommend actions that match the actual concern. Don't over-mobilize for minor issues.

Return valid JSON only. No explanation outside the JSON.
"""
```

### Call Summary Prompt

```python
CALL_SUMMARY_PROMPT = """
Generate a warm, human summary of this wellness check-in with {elder_name}.

## Call Data
Transcript:
{transcript}

Wellbeing Assessment:
{wellbeing}

Concerns Detected:
{concerns}

Village Actions Taken:
{actions}

## Output Format

Generate a JSON summary that a family member would want to read—warm, informative, and human.

```json
{{
  "overview": "2-3 sentences capturing the essence of the call. How were they? What was the vibe? Write like you're telling a caring colleague about someone you both know.",
  
  "emotional_arc": {{
    "started": "how they seemed at the beginning",
    "ended": "how they seemed by the end",
    "shift": "improved|stable|declined"
  }},
  
  "wellbeing_snapshot": {{
    "emotional": "one sentence summary",
    "mental": "one sentence summary",
    "social": "one sentence summary",
    "physical": "one sentence summary",
    "cognitive": "one sentence summary or 'No concerns noted'"
  }},
  
  "things_learned": [
    {{
      "fact": "what we learned",
      "context": "why it matters or the story",
      "category": "family|interests|history|etc"
    }}
  ],
  
  "concerns_addressed": [
    {{
      "concern": "what it was",
      "dimension": "which wellbeing dimension",
      "severity": "low|moderate|high",
      "their_words": "what they said",
      "action_taken": "what we did about it"
    }}
  ],
  
  "village_summary": [
    {{
      "who": "person's name",
      "role": "their relationship",
      "action": "what they agreed to do",
      "status": "confirmed|pending|scheduled",
      "scheduled_time": "if applicable"
    }}
  ],
  
  "next_call_prompts": [
    "Natural things to ask about or follow up on next time"
  ],
  
  "memorable_moment": "One quote or moment that captures who they are. The kind of thing that makes you smile or feel something. Optional but encouraged."
}}
```

## Guidelines

- Write in warm, human language
- This is for family to read—they should feel their loved one is truly being cared for
- The memorable_moment should be something real and touching, not manufactured
- next_call_prompts should feel natural, not clinical
- If there were no concerns, that's great! Say so warmly.

Return valid JSON only.
"""
```

### Village Member Prompts

```python
FAMILY_CALL_PROMPT = """
You are calling {family_name}, the {relationship} of {elder_name}.

## Context
During today's check-in, we noticed: {concern_summary}

## Your Goals
1. Inform without alarming—start with "they're okay, but I wanted to let you know..."
2. Share what you observed and what's being done
3. Gently encourage connection if there's been distance
4. Offer to help schedule a call if they're busy
5. Be supportive, not guilt-inducing

## Key Information
- What we noticed: {concern_details}
- Their words: {relevant_quotes}
- Actions being taken: {actions_taken}
- How long since they've talked: {last_contact}

## Tone
Family members often feel guilty about not calling enough. Never make them feel worse. Your message is "here's how we can work together to support them."

If they seem stressed: "That's exactly why this system exists—to help you stay connected even when life gets busy. We're all on the same team here."

## Keep It Brief
This should be a 60-90 second call. Warm but efficient.
"""

NEIGHBOR_CALL_PROMPT = """
You are calling {neighbor_name}, a neighbor of {elder_name} who has agreed to be part of their care network.

## Context
During today's check-in, {elder_name} mentioned: {concern_summary}

## Your Goals
1. Be friendly and brief—neighbors are volunteers, respect their time
2. Make the ask simple and specific
3. Tell them what to look for
4. Thank them sincerely

## The Ask
{specific_ask}

## What to Look For
{observation_guidance}

## Key Details
- {elder_name} lives at: {address}
- Best time to stop by: {suggested_time}
- Their phone (if they want to call first): {elder_phone}

## Tone
Warm, grateful, not demanding. Neighbors do this out of kindness.

Do NOT share detailed medical information—just that we'd appreciate a wellness check.

Keep it under 60 seconds.
"""

MEDICAL_CALL_PROMPT = """
You are calling {practice_name} on behalf of {elder_name}, patient of {doctor_name}.

## Context
During a wellness check-in, the patient reported: {concern_summary}

## Your Goals
1. Request a telehealth or in-person appointment
2. Provide relevant clinical context
3. Confirm scheduling and any preparation needed
4. Request family be notified of the appointment

## Clinical Information
- Patient: {elder_name}, {age} years old
- Reported symptoms: {symptoms}
- Relevant quote: {patient_quote}
- Current medications: {medications}
- Known conditions: {conditions}
- Last appointment: {last_visit}
- Urgency level: {urgency}

## Tone
Professional and efficient. Medical offices are busy.

## Duration
Keep it concise—under 90 seconds.
"""

MENTAL_HEALTH_PROMPT = """
You are calling to arrange mental health support for {elder_name}.

## Context
Over recent check-ins, we've observed: {pattern_summary}

## Relevant Observations
{detailed_observations}

## Your Goals
1. Explain the situation with appropriate clinical framing
2. Request an evaluation or counseling session
3. Provide relevant history
4. Coordinate with family if appropriate

## Tone
Professional, compassionate, non-alarmist.

## Key Context
- This is pattern-based observation, not crisis intervention (unless otherwise noted)
- The elder may not recognize they need support
- Family involvement may be appropriate
"""

VOLUNTEER_CALL_PROMPT = """
You are calling {volunteer_name}, a volunteer companion matched with {elder_name}.

## Context
{elder_name} has been showing signs of loneliness and mentioned: {relevant_quote}

## The Match
You're matched because you both: {shared_interests}

## Your Goals
1. Introduce the opportunity warmly
2. Share a bit about {elder_name} (interests, personality)
3. Propose a specific activity and time
4. Make it easy to say yes

## About {elder_name}
{elder_description}

## Suggested Activity
{activity_suggestion}

## Tone
Warm, enthusiastic (but not pushy). This should feel like an opportunity, not an obligation.

If they can't do this week, ask about next week.
"""
```

---

## API Specification

### REST Endpoints

```python
# main.py - FastAPI Application

from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uuid

app = FastAPI(title="The Village API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# ELDER ENDPOINTS
# ============================================================================

@app.get("/api/elder/{elder_id}")
async def get_elder(elder_id: str) -> Elder:
    """Get elder profile with village network and baseline."""
    pass

@app.get("/api/elder/{elder_id}/history")
async def get_elder_history(elder_id: str, limit: int = 10) -> List[CallSession]:
    """Get recent call history for pattern analysis."""
    pass

@app.get("/api/elder/{elder_id}/wellbeing")
async def get_current_wellbeing(elder_id: str) -> WellbeingAssessment:
    """Get most recent wellbeing assessment."""
    pass

# ============================================================================
# CALL ENDPOINTS
# ============================================================================

@app.post("/api/call/start")
async def start_call(elder_id: str) -> CallSession:
    """
    Initiate a check-in call to an elder.
    - Creates LiveKit room
    - Initializes call session
    - Starts voice agent
    - Returns session info
    """
    pass

@app.post("/api/call/{call_id}/end")
async def end_call(call_id: str) -> CallSummary:
    """
    End an active call.
    - Generates summary
    - Persists data
    - Triggers any pending village actions
    """
    pass

@app.get("/api/call/{call_id}")
async def get_call(call_id: str) -> CallSession:
    """Get call session details including transcript and concerns."""
    pass

@app.get("/api/calls")
async def list_calls(elder_id: str = None, limit: int = 20) -> List[CallSession]:
    """List recent calls, optionally filtered by elder."""
    pass

# ============================================================================
# VILLAGE ENDPOINTS
# ============================================================================

@app.post("/api/village/trigger")
async def trigger_village_action(action: VillageAction) -> VillageAction:
    """
    Manually trigger a village action.
    For demo purposes and manual intervention.
    """
    pass

@app.get("/api/village/actions")
async def list_village_actions(call_id: str = None, status: str = None) -> List[VillageAction]:
    """List village actions, optionally filtered."""
    pass

@app.post("/api/village/action/{action_id}/complete")
async def complete_village_action(action_id: str, response: str) -> VillageAction:
    """Mark a village action as complete with response."""
    pass

# ============================================================================
# WEBSOCKET
# ============================================================================

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    Real-time updates for dashboard.
    
    Events pushed:
    - call_started
    - call_status
    - transcript_update
    - wellbeing_update
    - profile_update
    - concern_detected
    - village_action_started
    - village_action_update
    - call_ended
    - timer_update
    """
    await websocket.accept()
    # Add to connection pool
    # Listen for messages
    # Push events
    pass

# ============================================================================
# DEMO ENDPOINTS
# ============================================================================

@app.post("/api/demo/reset")
async def reset_demo():
    """Reset demo state to initial Margaret profile."""
    pass

@app.post("/api/demo/simulate-concern")
async def simulate_concern(concern_type: str, severity: str):
    """Simulate a concern detection for demo purposes."""
    pass
```

### WebSocket Event Schemas

```typescript
// WebSocket message types

// Server -> Client events
interface WSServerEvent {
  type: 
    | 'call_started'
    | 'call_status'
    | 'transcript_update'
    | 'wellbeing_update'
    | 'profile_update'
    | 'concern_detected'
    | 'village_action_started'
    | 'village_action_update'
    | 'call_ended'
    | 'timer_update'
    | 'error';
  data: any;
  timestamp: string;
}

// Client -> Server events
interface WSClientEvent {
  type: 'subscribe' | 'unsubscribe' | 'ping';
  data?: {
    elder_id?: string;
    call_id?: string;
  };
}

// Event payloads
interface CallStartedEvent {
  call_id: string;
  elder_id: string;
  elder_name: string;
  started_at: string;
}

interface TranscriptUpdateEvent {
  call_id: string;
  line: TranscriptLine;
}

interface WellbeingUpdateEvent {
  call_id: string;
  dimension: 'emotional' | 'mental' | 'social' | 'physical' | 'cognitive';
  assessment: Partial<WellbeingAssessment>;
}

interface ConcernDetectedEvent {
  call_id: string;
  concern: Concern;
}

interface VillageActionStartedEvent {
  call_id: string;
  action: VillageAction;
}

interface VillageActionUpdateEvent {
  action_id: string;
  status: string;
  response?: string;
}

interface CallEndedEvent {
  call_id: string;
  summary: CallSummary;
  duration_seconds: number;
}

interface TimerUpdateEvent {
  elapsed_seconds: number;
  running: boolean;
}
```

---

## Frontend Components

### Component Hierarchy

```
App
├── DashboardLayout
│   ├── Header
│   │   ├── Logo
│   │   ├── ElderSelector
│   │   └── ConnectionStatus
│   │
│   ├── MainContent
│   │   ├── ElderProfileCard
│   │   │   ├── ProfilePhoto
│   │   │   ├── BasicInfo
│   │   │   ├── VillageNetwork (mini)
│   │   │   └── QuickStats
│   │   │
│   │   ├── CallPanel
│   │   │   ├── CallStatus
│   │   │   ├── StartCallButton
│   │   │   ├── LiveTranscript
│   │   │   │   └── TranscriptLine (repeated)
│   │   │   └── ResponseTimer
│   │   │
│   │   ├── WellbeingDashboard
│   │   │   ├── DimensionCard (Emotional)
│   │   │   ├── DimensionCard (Mental)
│   │   │   ├── DimensionCard (Social)
│   │   │   ├── DimensionCard (Physical)
│   │   │   └── DimensionCard (Cognitive)
│   │   │
│   │   └── ConcernsPanel
│   │       └── ConcernCard (repeated)
│   │
│   └── Sidebar
│       ├── VillageGrid
│       │   └── VillageMemberCard (repeated)
│       │
│       ├── ActiveActions
│       │   └── ActionCard (repeated)
│       │
│       └── ProfileFacts
│           └── FactCard (repeated)
│
├── CallSummaryModal
│   ├── SummaryOverview
│   ├── EmotionalArc
│   ├── WellbeingSnapshot
│   ├── ThingsLearned
│   ├── ConcernsAddressed
│   ├── VillageActions
│   ├── NextCallPrompts
│   └── MemorableMoment
│
└── Timeline
    └── TimelineEvent (repeated)
```

### Key Component Specifications

#### WellbeingDashboard

```tsx
// components/WellbeingDashboard.tsx

interface WellbeingDashboardProps {
  assessment: WellbeingAssessment | null;
  isCallActive: boolean;
}

// Visual design:
// - 5 cards in a row, one per dimension
// - Each card shows:
//   - Icon (heart, brain, people, body, lightbulb)
//   - Dimension name
//   - Current status indicator (green/yellow/orange/red)
//   - Key metric (e.g., "Loneliness: Moderate")
//   - Brief note from latest assessment
// - Cards pulse/highlight when updated during call
// - Expandable for more detail
```

#### ConcernCard

```tsx
// components/ConcernCard.tsx

interface ConcernCardProps {
  concern: Concern;
  onActionClick?: (action: VillageAction) => void;
}

// Visual design:
// - Color-coded by severity (blue/yellow/orange/red)
// - Shows:
//   - Dimension badge (emotional, physical, etc.)
//   - Concern type
//   - Severity indicator
//   - Quote from elder (in italics)
//   - Actions triggered (if any)
// - Animated entrance when new concern detected
```

#### VillageGrid

```tsx
// components/VillageGrid.tsx

interface VillageGridProps {
  members: VillageMember[];
  activeActions: VillageAction[];
}

// Visual design:
// - Grid of member cards
// - Each card shows:
//   - Avatar/icon based on role
//   - Name and relationship
//   - Current status (idle, calling, confirmed)
//   - Response text if available
// - Status indicators:
//   - Gray: Idle
//   - Blue pulsing: Calling...
//   - Green: Confirmed
//   - Red: Failed/No answer
```

#### LiveTranscript

```tsx
// components/LiveTranscript.tsx

interface LiveTranscriptProps {
  lines: TranscriptLine[];
  isActive: boolean;
}

// Visual design:
// - Chat-style layout
// - Agent messages on left (blue)
// - Elder messages on right (gray)
// - Auto-scroll to bottom
// - Timestamps on hover
// - Highlighted when concern detected in that line
```

#### ResponseTimer

```tsx
// components/ResponseTimer.tsx

interface ResponseTimerProps {
  running: boolean;
  startedAt: string | null;
  onComplete?: (seconds: number) => void;
}

// Visual design:
// - Large, prominent display
// - Shows seconds elapsed since concern detected
// - Dramatic stop animation when care plan complete
// - "78 seconds" goal indicator
```

---

## Build Instructions

### Prerequisites

```bash
# Required
- Node.js 18+
- Python 3.11+
- npm or yarn

# API Keys needed (get from sponsor booths)
- LIVEKIT_API_KEY
- LIVEKIT_API_SECRET
- LIVEKIT_URL
- DEEPGRAM_API_KEY
- ELEVENLABS_API_KEY
- ANTHROPIC_API_KEY
```

### Project Setup

```bash
# Create project structure
mkdir the-village
cd the-village
mkdir backend frontend

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install fastapi uvicorn websockets httpx python-dotenv pydantic
pip install livekit livekit-agents livekit-plugins-deepgram livekit-plugins-elevenlabs
pip install anthropic
pip install arize-phoenix opentelemetry-api opentelemetry-sdk  # For Arize

# Frontend setup
cd ../frontend
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Environment Variables

```bash
# backend/.env

# LiveKit (use HACK-NEXHACKS for free credits)
LIVEKIT_API_KEY=your_key
LIVEKIT_API_SECRET=your_secret
LIVEKIT_URL=wss://your-project.livekit.cloud

# Deepgram
DEEPGRAM_API_KEY=your_key

# ElevenLabs (3 months free for NexHacks)
ELEVENLABS_API_KEY=your_key
ELEVENLABS_VOICE_ID=your_warm_voice_id

# Anthropic
ANTHROPIC_API_KEY=your_key

# Arize Phoenix (optional but recommended)
PHOENIX_API_KEY=your_key
```

### Running the Project

```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: LiveKit Agent (if using agent framework)
cd backend
python agent.py dev
```

### Build Order (24-Hour Sprint)

#### Hours 0-4: Foundation
```
Backend:
[ ] FastAPI skeleton with CORS
[ ] WebSocket manager class
[ ] In-memory state store
[ ] Elder data model with Margaret profile
[ ] Basic REST endpoints

Frontend:
[ ] Vite + React + TypeScript setup
[ ] Tailwind configuration
[ ] Dashboard layout skeleton
[ ] WebSocket hook
[ ] Mock data for UI development
```

#### Hours 4-10: Core Features
```
Backend:
[ ] LiveKit room creation
[ ] Deepgram STT integration
[ ] ElevenLabs TTS integration
[ ] Basic agent conversation loop
[ ] Transcript streaming via WebSocket

Frontend:
[ ] ElderProfileCard component
[ ] LiveTranscript component
[ ] CallStatus component
[ ] WellbeingDashboard (5 dimension cards)
[ ] Real-time updates from WebSocket
```

#### Hours 10-16: Intelligence
```
Backend:
[ ] Claude analysis integration
[ ] Holistic wellbeing assessment
[ ] Concern detection
[ ] Profile fact extraction
[ ] Village action triggering
[ ] Outbound call agents (at least 1)

Frontend:
[ ] ConcernsPanel with live updates
[ ] VillageGrid with status updates
[ ] ProfileFacts panel
[ ] ResponseTimer component
[ ] Animations for state changes
```

#### Hours 16-20: Polish
```
Backend:
[ ] Call summary generation
[ ] Error handling
[ ] Demo reset endpoint

Frontend:
[ ] CallSummaryModal
[ ] Timeline component
[ ] UI polish and animations
[ ] Responsive design fixes
[ ] Loading states
```

#### Hours 20-24: Demo Prep
```
[ ] Full demo run-throughs (5+)
[ ] Fix any breaking bugs
[ ] Prepare backup (screen recording)
[ ] Pitch practice
[ ] Arize traces for observability demo
```

---

## Demo Script

### Setup (30 seconds)

**Narrator:** "Margaret Chen is 78. She lives alone in Pittsburgh. Her daughter Susan is in Philadelphia. Her husband Harold passed two years ago. She used to play cards every evening—now the house is quiet.

She's one of 14 million elderly Americans living alone. 43% report chronic loneliness. Loneliness has the same health impact as smoking 15 cigarettes a day.

Small problems become big problems when no one is watching. That's what The Village is for.

Today, Margaret gets her daily call."

*Dashboard shows Margaret's profile, her village network, the five wellbeing dimensions all green.*

### The Call (2 minutes)

*Click "Start Call" - call initiates*

*Live transcript streams in:*

**Agent:** "Margaret! How are you doing today, dear?"

**Margaret:** "Oh, hello. I'm alright, I suppose. A bit tired."

*Dashboard: Emotional indicator updates to "tired"*

**Agent:** "Tired? Did you get some rest last night?"

**Margaret:** "Not really. My knee was bothering me. And I've been a little dizzy when I stand up."

*Dashboard: Physical concern detected - dizziness (moderate) ⚠️*
*Dashboard: Physical indicator turns yellow*

**Agent:** "Oh, that dizziness doesn't sound fun. Does it happen every time you stand up?"

**Margaret:** "Just sometimes. I probably don't drink enough water. I forget."

*Dashboard: Profile update - "Tends to forget to drink water"*

**Agent:** "That's so easy to do. How about food—have you been eating okay?"

**Margaret:** "Not much appetite lately. It's hard to cook for one, you know?"

*Dashboard: Physical concern - nutrition (low)*
*Dashboard: Social indicator shifts*

**Agent:** "I can imagine. Have you talked to Susan lately?"

**Margaret:** "Oh, she's busy. I don't want to bother her. It's been... I don't know, a couple weeks?"

*Dashboard: Social concern - family disconnect (moderate)*
*Dashboard: Social indicator turns yellow*

**Agent:** "I'm sure she'd love to hear from you. What have you been up to otherwise?"

**Margaret:** "Not much. It's been quiet. I miss... Harold and I used to play cards every evening. Gin rummy. He'd let me win sometimes—I always knew when he was doing it, but I never told him."

*Dashboard: Emotional concern - loneliness (elevated)*
*Dashboard: Profile update - "Played gin rummy with Harold every evening"*
*Dashboard: Profile update - "Harold let her win at cards"*
*Dashboard: Emotional indicator turns yellow*

**Agent:** "That sounds really special, Margaret. That kind of daily ritual with someone you love—it's irreplaceable."

**Margaret:** *(pause)* "It is. I... it's been two years and I still expect him to walk in the door sometimes."

*Dashboard: Emotional - grief indicators present*

**Agent:** "Of course you do. That kind of love doesn't just go away. It's okay to still miss him."

**Margaret:** "Thank you, dear. It's nice to... to talk about it."

**Agent:** "Always. Margaret, I want to make sure someone checks on that dizziness. And I think you could use some company. Is it okay if I have a few people reach out today?"

**Margaret:** "Oh, you don't have to—"

**Agent:** "That's what we're here for. You're not alone, okay?"

*Dashboard: Village activation triggered*
*Timer starts: 0 seconds*

### Village Activation (90 seconds)

**Narrator:** "The moment Margaret mentioned dizziness combined with the loneliness pattern, The Village activated her care network—in parallel."

*Dashboard shows village grid lighting up:*

**Neighbor Tom:** CALLING...
**Daughter Susan:** CALLING...
**Dr. Martinez:** CALLING...
**Volunteer Jane:** CALLING...

*One by one, responses come in:*

**Tom (Neighbor):** "I'll check on her this afternoon when I bring the mail." ✓
*Timer: 23 seconds*

**Susan (Daughter):** "Oh mom... I'll call her tonight at 7. Can you remind her I love her?" ✓
*Timer: 45 seconds*

**Dr. Martinez Office:** "Telehealth at 2pm today. We'll check her blood pressure." ✓
*Timer: 67 seconds*

**Jane (Volunteer):** "Cards on Thursday? I'd love to! I play a mean gin rummy." ✓
*Timer: 78 seconds*

*Timer stops dramatically: 78 SECONDS*

**Narrator:** "78 seconds. From one offhand mention of dizziness to a complete care plan. Four people mobilized. No one falls through the cracks."

### The Summary (60 seconds)

*Call Summary modal appears:*

**Overview:** "Margaret was tired and a bit low today. She opened up about missing Harold—they used to play cards every evening, and she still expects him to walk in the door. She's been dizzy when standing (possibly dehydration) and not eating well. She hasn't talked to Susan in two weeks. By the end of the call, she seemed warmer after being able to talk about Harold."

**Wellbeing Snapshot:**
- Emotional: Grief present, loneliness elevated, but found comfort in sharing
- Mental: Stable, no depression indicators
- Social: Family disconnect, isolation mild
- Physical: Dizziness, nutrition concerns, low energy
- Cognitive: No concerns

**Village Response:**
- ✓ Tom checking in this afternoon
- ✓ Susan calling at 7pm
- ✓ Telehealth at 2pm
- ✓ Cards with Jane Thursday

**Memorable Moment:** *"He'd let me win sometimes—I always knew when he was doing it, but I never told him."*

### Close (30 seconds)

**Narrator:** "This is what villages used to do. Neighbors noticed when you seemed off. Family stayed close. Friends kept you company. No one slipped away unnoticed.

The Village rebuilds that—not just for physical health, but for the whole person. Emotional. Mental. Social. Physical. Cognitive.

Because loneliness isn't a medical code. But it kills just the same.

14 million elderly Americans live alone.

*The Village makes sure they don't feel that way.*"

---

## File Structure

```
the-village/
├── backend/
│   ├── main.py                      # FastAPI app, routes, WebSocket
│   ├── models.py                    # Pydantic models
│   ├── state.py                     # In-memory state manager
│   ├── config.py                    # Environment configuration
│   │
│   ├── voice/
│   │   ├── __init__.py
│   │   ├── agent.py                 # LiveKit agent entry point
│   │   ├── pipeline.py              # STT -> LLM -> TTS pipeline
│   │   ├── elder_companion.py       # Elder conversation agent
│   │   └── village_callers.py       # Outbound call agents
│   │
│   ├── analysis/
│   │   ├── __init__.py
│   │   ├── wellbeing_analyzer.py    # Holistic analysis via Claude
│   │   ├── concern_detector.py      # Concern extraction
│   │   ├── profile_builder.py       # Fact extraction
│   │   └── summarizer.py            # Call summary generation
│   │
│   ├── village/
│   │   ├── __init__.py
│   │   ├── orchestrator.py          # Parallel action coordination
│   │   └── action_handlers.py       # Per-action-type logic
│   │
│   ├── prompts/
│   │   ├── elder_companion.txt
│   │   ├── holistic_analysis.txt
│   │   ├── call_summary.txt
│   │   ├── family_call.txt
│   │   ├── neighbor_call.txt
│   │   ├── medical_call.txt
│   │   ├── mental_health_call.txt
│   │   └── volunteer_call.txt
│   │
│   ├── tracing/
│   │   └── phoenix_setup.py         # Arize Phoenix instrumentation
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── types.ts                 # TypeScript interfaces
│   │   │
│   │   ├── hooks/
│   │   │   ├── useWebSocket.ts
│   │   │   ├── useCallState.ts
│   │   │   └── useTimer.ts
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   │
│   │   │   ├── elder/
│   │   │   │   ├── ElderProfileCard.tsx
│   │   │   │   └── ElderSelector.tsx
│   │   │   │
│   │   │   ├── call/
│   │   │   │   ├── CallPanel.tsx
│   │   │   │   ├── CallStatus.tsx
│   │   │   │   ├── LiveTranscript.tsx
│   │   │   │   ├── TranscriptLine.tsx
│   │   │   │   └── ResponseTimer.tsx
│   │   │   │
│   │   │   ├── wellbeing/
│   │   │   │   ├── WellbeingDashboard.tsx
│   │   │   │   └── DimensionCard.tsx
│   │   │   │
│   │   │   ├── concerns/
│   │   │   │   ├── ConcernsPanel.tsx
│   │   │   │   └── ConcernCard.tsx
│   │   │   │
│   │   │   ├── village/
│   │   │   │   ├── VillageGrid.tsx
│   │   │   │   ├── VillageMemberCard.tsx
│   │   │   │   └── ActiveActions.tsx
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   ├── ProfileFacts.tsx
│   │   │   │   └── FactCard.tsx
│   │   │   │
│   │   │   ├── summary/
│   │   │   │   ├── CallSummaryModal.tsx
│   │   │   │   └── SummarySection.tsx
│   │   │   │
│   │   │   └── timeline/
│   │   │       ├── Timeline.tsx
│   │   │       └── TimelineEvent.tsx
│   │   │
│   │   ├── lib/
│   │   │   ├── api.ts               # REST API client
│   │   │   └── utils.ts
│   │   │
│   │   └── data/
│   │       └── margaret.ts          # Demo elder data
│   │
│   ├── public/
│   │   └── margaret.jpg             # Demo photo
│   │
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── demo/
│   ├── margaret_profile.json        # Complete demo data
│   ├── demo_script.md               # Presenter notes
│   └── backup_recording/            # Pre-recorded fallback
│
└── README.md
```

---

## Demo Data: Margaret Chen

```json
{
  "id": "margaret-chen-001",
  "name": "Margaret Chen",
  "age": 78,
  "phone": "+1-412-555-0142",
  "photo_url": "/margaret.jpg",
  "address": "412 Oak Street, Pittsburgh, PA 15213",
  
  "profile": [
    {
      "id": "pf-001",
      "fact": "Husband Harold passed away 2 years ago",
      "category": "family",
      "context": "They were married for 52 years"
    },
    {
      "id": "pf-002", 
      "fact": "Used to play gin rummy with Harold every evening",
      "category": "interests",
      "context": "This was their daily ritual for decades"
    },
    {
      "id": "pf-003",
      "fact": "Daughter Susan lives in Philadelphia",
      "category": "family",
      "context": "About 5 hours away, busy with her own family"
    },
    {
      "id": "pf-004",
      "fact": "Has a grandson Jake who visits occasionally",
      "category": "family",
      "context": "Margaret lights up when talking about him"
    },
    {
      "id": "pf-005",
      "fact": "Takes metoprolol for blood pressure",
      "category": "medical",
      "context": "Daily morning medication"
    }
  ],
  
  "village": [
    {
      "id": "vm-001",
      "name": "Susan Chen",
      "role": "family",
      "relationship": "daughter",
      "phone": "+1-215-555-0198",
      "availability": "evenings",
      "notes": "Works full-time, feels guilty about not calling more"
    },
    {
      "id": "vm-002",
      "name": "Tom Bradley",
      "role": "neighbor",
      "relationship": "next-door neighbor",
      "phone": "+1-412-555-0156",
      "availability": "afternoons",
      "notes": "Retired teacher, brings Margaret's mail often"
    },
    {
      "id": "vm-003",
      "name": "Dr. Maria Martinez",
      "role": "medical",
      "relationship": "primary care physician",
      "phone": "+1-412-555-0200",
      "availability": "office hours",
      "notes": "Has been Margaret's doctor for 15 years"
    },
    {
      "id": "vm-004",
      "name": "Jane Thompson",
      "role": "volunteer",
      "relationship": "companion volunteer",
      "phone": "+1-412-555-0177",
      "availability": "Tuesdays and Thursdays",
      "notes": "Also loves card games, matched based on interests"
    }
  ],
  
  "medical": {
    "primary_doctor": "Dr. Maria Martinez",
    "practice_name": "Oakland Family Medicine",
    "practice_phone": "+1-412-555-0200",
    "medications": [
      {
        "name": "Metoprolol",
        "dosage": "25mg",
        "frequency": "Once daily, morning",
        "next_refill": "2026-01-19"
      }
    ],
    "conditions": ["Hypertension", "Mild osteoarthritis (knee)"]
  },
  
  "wellbeing_baseline": {
    "typical_mood": "Generally positive, occasionally melancholy about Harold",
    "social_frequency": "Talks to Susan weekly, sees Tom a few times a week",
    "cognitive_baseline": "Sharp, good memory, occasionally forgets small things",
    "physical_limitations": ["Knee pain limits long walks", "Gets tired easily"],
    "known_concerns": ["Tends to isolate when feeling down", "Doesn't drink enough water"]
  }
}
```

---

## Success Criteria

### For Healthcare Track
- [ ] Improves care coordination (parallel village activation)
- [ ] Helps navigate care without requiring diagnosis
- [ ] Reduces admin burden (automated check-ins)
- [ ] Clear demo showing real-world value

### For LiveKit Track
- [ ] LiveKit is core infrastructure (all calls)
- [ ] Uses advanced features (multi-room, agents)
- [ ] Polished integration
- [ ] Novel application

### For ElevenLabs Track
- [ ] Working end-to-end prototype
- [ ] Clear ElevenLabs integration (all agent voices)
- [ ] Solves real problem
- [ ] Good demo quality

### For Arize Track
- [ ] Agent instrumented with Phoenix
- [ ] Traces captured during development
- [ ] Can show optimization/debugging workflow

### For Bonus: Most Impactful
- [ ] Addresses real societal problem (loneliness epidemic)
- [ ] Clear benefit to users (elders + families)
- [ ] Emotionally resonant demo

### For Bonus: Best UI/UX
- [ ] Beautiful, intuitive dashboard
- [ ] Real-time updates feel magical
- [ ] Information hierarchy is clear
- [ ] Animations enhance understanding

---

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| LiveKit integration fails | Medium | Critical | Have browser-based fallback, test early |
| API rate limits | Low | High | Cache responses, have fallback responses |
| Demo breaks during presentation | Medium | Critical | Pre-recorded backup video ready |
| Teammate unavailable | Low | High | Script all village responses, can solo with recordings |
| Claude analysis too slow | Medium | Medium | Run analysis async, show "thinking" state |
| Judges don't understand | Low | High | Lead with human story, not tech |

---

## Final Checklist

### Before Demo
- [ ] All API keys working
- [ ] Margaret profile loaded
- [ ] LiveKit rooms tested
- [ ] ElevenLabs voice tested
- [ ] Backup video ready
- [ ] Demo script practiced 3x
- [ ] Teammate roles assigned (who plays Margaret, who presents)

### During Demo
- [ ] Start with the human story
- [ ] Show dashboard before call starts
- [ ] Let the call run naturally
- [ ] Highlight the 78-second timer dramatically
- [ ] Show the summary at the end
- [ ] End with emotional close: "No one is alone"

### After Demo
- [ ] Have GitHub ready to share
- [ ] Be ready for technical questions
- [ ] Know your sponsor integrations cold
- [ ] Have business model thoughts ready (if asked)

---

*Good luck at NexHacks. Go build something that matters.*
