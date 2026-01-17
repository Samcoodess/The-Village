// TypeScript types for The Village frontend

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
  enabled?: boolean; // For demo configuration
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
// BIOMETRIC DATA
// ============================================================================

export interface BiometricData {
  heartRate?: number;
  heartRateVariability?: number;
  respiratoryRate?: string | number;
  rhythmRegularity?: string;
  audioQuality?: number;
  confidence?: number;
  timestamp?: string;
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
  biometrics?: BiometricData;
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
  | 'loneliness' | 'grief' | 'fear' | 'hopelessness'
  | 'depression' | 'anxiety' | 'loss_of_purpose'
  | 'isolation' | 'family_disconnect' | 'community_loss'
  | 'pain' | 'dizziness' | 'fall' | 'mobility' | 'sleep' | 'nutrition' | 'medication' | 'fatigue'
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
  | { type: 'biometric_update'; data: BiometricData }
  | { type: 'wellbeing_update'; data: Partial<WellbeingAssessment> }
  | { type: 'profile_update'; data: ProfileFact }
  | { type: 'concern_detected'; data: Concern }
  | { type: 'village_action_started'; data: VillageAction }
  | { type: 'village_action_update'; data: { id: string; status: string; response?: string } }
  | { type: 'call_ended'; data: { call_id: string; summary: CallSummary } }
  | { type: 'timer_update'; data: { elapsed_seconds: number } };

// ============================================================================
// DEMO CONFIGURATION
// ============================================================================

export interface DemoConfig {
  mode: 'all-to-me' | 'custom';
  myPhone?: string;
  elder: {
    name: string;
    age: number;
    phone: string;
  };
  village: VillageMember[];
}

// ============================================================================
// DASHBOARD STATE
// ============================================================================

export interface DashboardState {
  elder: Elder;
  activeCall: CallSession | null;
  recentCalls: CallSession[];
  currentWellbeing: WellbeingAssessment | null;
  currentBiometrics: BiometricData | null;
  activeVillageActions: VillageAction[];
  responseTimer: {
    running: boolean;
    started_at: string | null;
    elapsed_seconds: number;
  };
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
}
