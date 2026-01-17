# The Village - 3-Person Team Plan

## Team Roles & Ownership

### 👤 **Person 1: Backend API + Database (Backend Lead)**
**Primary Files:** `backend/main.py`, `backend/database.py`, `backend/config.py`

### 👤 **Person 2: Voice Agents + AI (Voice/AI Lead)**
**Primary Files:** `backend/voice/`, `backend/analysis/`, `backend/village/`, `backend/prompts/`

### 👤 **Person 3: Frontend + Dashboard (Frontend Lead)**
**Primary Files:** `frontend/src/` (all React components)

---

## Phase-by-Phase Breakdown

### 📅 **Phase 1: Foundation (Hours 0-6)**

#### Person 1: Backend API
- [ ] **Setup Supabase** (1 hour)
  - Create Supabase project
  - Run `schema.sql` in SQL Editor
  - Get URL + service key
  - Test connection with simple query

- [ ] **Complete `database.py`** (2 hours)
  - Implement all CRUD operations
  - Test elder creation/retrieval
  - Test call session management
  - Add error handling

- [ ] **Complete `main.py`** (3 hours)
  - All REST endpoints (`/api/elder/*`, `/api/call/*`)
  - WebSocket setup for real-time updates
  - CORS middleware
  - Health check endpoint
  - Test with Postman/curl

**Deliverable:** Working API that can create elders, start calls, store data

---

#### Person 2: Voice + AI Setup
- [ ] **Get all API keys** (1 hour)
  - LiveKit account + API keys
  - Deepgram API key
  - ElevenLabs API key + select voice
  - Anthropic Claude API key
  - Test each with "hello world"

- [ ] **Create `backend/voice/agent.py`** (3 hours)
  - LiveKit agent setup
  - Basic conversation loop
  - STT (Deepgram) integration
  - TTS (ElevenLabs) integration
  - Test with phone call

- [ ] **Create `backend/prompts/prompts.py`** (1 hour)
  - Port all prompts from spec as Python strings
  - Format with f-string variables
  - Export as constants

- [ ] **Create `backend/analysis/analyzer.py`** (1 hour)
  - Claude API setup
  - Basic analysis function (takes transcript, returns JSON)
  - Test with mock transcript

**Deliverable:** Can make a phone call and get transcript, Claude can analyze text

---

#### Person 3: Frontend Foundation
- [ ] **Vite + React setup** (1 hour)
  ```bash
  cd frontend
  npm create vite@latest . -- --template react-ts
  npm install
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```

- [ ] **Copy `types.ts` from spec** (30 min)
  - Add all TypeScript interfaces

- [ ] **Create `hooks/useWebSocket.ts`** (1 hour)
  - WebSocket connection to backend
  - Event handling
  - Auto-reconnect logic

- [ ] **Create `lib/api.ts`** (1 hour)
  - REST API client functions
  - Error handling
  - Type-safe requests

- [ ] **Create basic layout** (2 hours)
  - `components/layout/DashboardLayout.tsx`
  - `components/layout/Header.tsx`
  - Basic routing
  - Dark/light theme (optional)

- [ ] **Create `components/elder/ElderProfileCard.tsx`** (30 min)
  - Display elder info
  - Static for now

**Deliverable:** Frontend connects to backend, can display data, WebSocket works

---

### 📅 **Phase 2: Core Features (Hours 6-14)**

#### Person 1: Call Management
- [ ] **Implement call lifecycle** (3 hours)
  - `/api/call/start` - Create call + LiveKit room
  - Integration with Person 2's voice agent
  - Transcript storage (save each line to DB)
  - `/api/call/end` - Close call, trigger summary

- [ ] **WebSocket event broadcasting** (2 hours)
  - `call_started`, `call_status`
  - `transcript_update` (stream each line)
  - `concern_detected`
  - `village_action_started`
  - Test events reach frontend

- [ ] **Create Margaret seed data** (1 hour)
  - Script to insert Margaret into Supabase
  - Add all village members
  - Add initial profile facts
  - Make it idempotent (can run multiple times)

- [ ] **Demo reset endpoint** (1 hour)
  - `POST /api/demo/reset` - Clear all calls/actions
  - Keep elders intact
  - For quick demo resets

- [ ] **Help Person 2 integrate voice agent** (1 hour)

**Deliverable:** Complete call flow works, data persists, events stream

---

#### Person 2: Intelligence Layer
- [ ] **Complete `analysis/wellbeing_analyzer.py`** (3 hours)
  - Take transcript buffer (last 30s)
  - Call Claude with holistic analysis prompt
  - Parse JSON response
  - Return structured wellbeing assessment
  - Handle API errors gracefully

- [ ] **Complete `analysis/concern_detector.py`** (1 hour)
  - Extract concerns from analysis
  - Save to database via Person 1's API
  - Broadcast via WebSocket

- [ ] **Complete `village/orchestrator.py`** (3 hours)
  - When concern requires action → trigger village calls
  - Create LiveKit room for each village member
  - Dispatch agent with role-specific prompt
  - Make SIP call via `CreateSIPParticipant`
  - Track call status
  - Capture responses

- [ ] **Create village caller agents** (1 hour)
  - `village/family_caller.py`
  - `village/medical_caller.py`
  - Use role-specific prompts from `prompts/`

**Deliverable:** AI analyzes calls, detects concerns, triggers village

---

#### Person 3: Dashboard UI
- [ ] **Create `components/call/LiveTranscript.tsx`** (2 hours)
  - Chat-style transcript display
  - Auto-scroll
  - Speaker differentiation
  - Real-time updates via WebSocket

- [ ] **Create `components/call/CallPanel.tsx`** (1 hour)
  - "Start Call" button
  - Call status indicator
  - End call button

- [ ] **Create `components/wellbeing/WellbeingDashboard.tsx`** (3 hours)
  - 5 dimension cards (emotional, mental, social, physical, cognitive)
  - Color coding (green/yellow/orange/red)
  - Update in real-time
  - Smooth animations

- [ ] **Create `components/concerns/ConcernsPanel.tsx`** (1 hour)
  - List of detected concerns
  - Color-coded by severity
  - Show quote from elder
  - Animate on new concern

- [ ] **Create `components/village/VillageGrid.tsx`** (1 hour)
  - Grid of village members
  - Status indicators (idle/calling/confirmed)
  - Update in real-time

**Deliverable:** Beautiful dashboard that shows live call data

---

### 📅 **Phase 3: Polish & Integration (Hours 14-20)**

#### Person 1: Summary & Final API
- [ ] **Complete `analysis/summarizer.py`** (2 hours)
  - Call Claude with summary prompt
  - Generate warm human summary
  - Return structured summary

- [ ] **Implement `/api/call/end` summary** (1 hour)
  - Trigger summarizer
  - Save summary to call record
  - Broadcast to frontend

- [ ] **Add village action endpoints** (1 hour)
  - `POST /api/village/trigger` (manual trigger for testing)
  - `GET /api/village/actions` (list actions)
  - Update action status

- [ ] **Testing & bug fixes** (2 hours)
  - Test complete flow end-to-end
  - Fix database issues
  - Handle edge cases

**Deliverable:** Complete backend working perfectly

---

#### Person 2: Voice Polish & Arize
- [ ] **Improve elder companion agent** (2 hours)
  - Tune conversation flow
  - Better prompt engineering
  - Handle interruptions
  - Natural conversation pacing

- [ ] **Test village calls** (2 hours)
  - Call real phones (teammates)
  - Verify prompts work
  - Script responses for demo
  - Time the 78-second flow

- [ ] **Add Arize Phoenix tracing** (1 hour)
  - `backend/tracing/phoenix_setup.py`
  - Instrument all Claude calls
  - Show traces in demo

- [ ] **Error handling & fallbacks** (1 hour)
  - Handle API failures
  - Retry logic
  - Graceful degradation

**Deliverable:** Voice calls work reliably, observability ready

---

#### Person 3: UI Polish & Demo
- [ ] **Create `components/summary/CallSummaryModal.tsx`** (2 hours)
  - Beautiful summary display
  - Emotional arc visualization
  - Things learned section
  - Village actions summary
  - Memorable moment highlight

- [ ] **Add animations** (2 hours)
  - Smooth transitions
  - Pulse effects on updates
  - Entrance animations for concerns
  - Timer countdown animation

- [ ] **Create `components/ResponseTimer.tsx`** (1 hour)
  - Large prominent timer
  - Starts on concern detection
  - Stops at "78 seconds" dramatically

- [ ] **Responsive design & polish** (1 hour)
  - Make it look great on projector
  - Fix any layout issues
  - Loading states
  - Error states

**Deliverable:** Demo-ready beautiful UI

---

### 📅 **Phase 4: Demo Prep (Hours 20-24)**

#### Everyone Together
- [ ] **Full demo run-throughs** (2 hours)
  - Run demo 5+ times
  - Time it (should be 3-4 minutes)
  - Fix any bugs that appear
  - Adjust script if needed

- [ ] **Record backup video** (1 hour)
  - Screen recording of successful demo
  - In case live demo fails

- [ ] **Practice pitch** (1 hour)
  - Who says what
  - Timing
  - Transitions
  - Q&A prep

- [ ] **Final polish** (30 min)
  - Update README
  - Clean up code
  - Add comments
  - Push to GitHub

---

## Dependencies & Coordination

### 🔗 Critical Handoffs

**Person 1 → Person 2:**
- Database schema must be finalized first
- API endpoints must be done before voice integration
- **Sync point:** Hour 6 - Person 1 has working API, Person 2 can integrate

**Person 2 → Person 1:**
- Voice agent must provide transcript in correct format
- Analysis must return structured JSON
- **Sync point:** Hour 10 - Person 2 has working analysis, Person 1 can save results

**Person 1 → Person 3:**
- WebSocket events must match frontend expectations
- API endpoints must be documented
- **Sync point:** Hour 4 - Person 3 can start consuming API

**All → All:**
- **Hour 14:** Integration check - Everything should work together
- **Hour 20:** Start demo rehearsals together

---

## Communication Protocol

### Daily Standups (Every 4 Hours)
- What did you complete?
- What are you working on next?
- Any blockers?

### Slack Channels
- `#backend` - Person 1 + 2 coordination
- `#frontend` - Person 3 updates
- `#demo` - Demo script and rehearsal
- `#blockers` - Urgent help needed

### GitHub Workflow
- Create branches: `person1/feature-name`
- Push often (every hour)
- Merge to `main` when feature complete
- Tag each other in PR reviews

---

## Emergency Fallbacks

### If LiveKit telephony is too hard:
- **Person 2:** Build Wizard-of-Oz system
- Teammate manually types Margaret's responses
- Still show transcript + analysis working

### If Supabase is down:
- **Person 1:** Fall back to in-memory state
- Create `state.py` with dict-based storage
- Demo still works, data doesn't persist

### If Claude is too slow:
- **Person 2:** Add caching layer
- Pre-generate responses for demo script
- Use cached responses during demo

### If frontend is behind:
- **Person 3:** Focus on core flow only
- Skip animations and polish
- Make it functional, not beautiful

---

## Success Metrics

### Minimum Viable Demo (Must Have)
- ✅ Click "Start Call" button
- ✅ See transcript streaming
- ✅ See 1 concern detected
- ✅ See 1 village member called
- ✅ See call summary

### Ideal Demo (Should Have)
- ✅ Real phone call with Margaret (teammate)
- ✅ 2-3 concerns detected
- ✅ 2-3 village members called
- ✅ 78-second timer
- ✅ Beautiful UI with animations

### Bonus (Nice to Have)
- ✅ 4 village calls in parallel
- ✅ Arize Phoenix traces shown
- ✅ Pattern detection across multiple calls
- ✅ Mobile responsive

---

## Final Checklist

### Before Hackathon:
- [ ] All API keys obtained (Person 2)
- [ ] Supabase project created (Person 1)
- [ ] Frontend dev server runs (Person 3)
- [ ] Everyone has cloned repo
- [ ] Everyone has `.env` configured

### Hour 6 Checkpoint:
- [ ] Backend API working (Person 1)
- [ ] Voice agent can make calls (Person 2)
- [ ] Frontend shows data (Person 3)

### Hour 14 Checkpoint:
- [ ] Full flow works end-to-end
- [ ] Can run one complete demo

### Hour 20 Checkpoint:
- [ ] Demo runs perfectly
- [ ] Backup video recorded
- [ ] Pitch practiced

### Submission:
- [ ] GitHub repo public
- [ ] README updated
- [ ] Demo video uploaded
- [ ] Sponsor requirements met (LiveKit, ElevenLabs, Arize)

---

**Let's build something that matters. No one should be alone.**
