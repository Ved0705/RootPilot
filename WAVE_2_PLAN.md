# Wave 2 — Incident Management & Root Cause Analysis

**Status:** In Progress  
**Duration:** 1-2 weeks  
**Focus:** Flagship operational incident management and AI-powered RCA  
**Key Deliverables:** Professional-grade incident explorer, RCA workbench, correlation engine

---

## Overview

Wave 2 transforms RootPilot from a dashboard-centric tool into an **operational incident platform**. SRE teams will be able to:
- Search, filter, and drill-down into incidents with full context
- Identify root causes through AI-powered correlation and change intelligence
- Explore incident relationships and cascade patterns
- Understand historical context through similar incidents

---

## Features to Implement/Enhance

### 1. Incident Explorer (IncidentsPage)

**Status:** Already implemented with real APIs  
**Connected Endpoints:**
- `GET /incidents` — List all incidents ✅
- `GET /incidents/services` — Filter by service ✅
- `GET /incidents/{id}/similar` — Find similar incidents ✅
- `GET /analysis/scored-alerts` — Alert scoring ✅

**Enhancements Needed:**
1. Incident detail drawer with full context
   - Exception stack trace (if available)
   - Service dependencies affected
   - Timeline of events
   - Related changes

2. Incident severity indicator
   - Color-coded by severity (red/orange/yellow)
   - Calculated from status code, error rate, user impact

3. Advanced filtering
   - By severity
   - By status (open/resolved/acknowledged)
   - By time range (last hour, 24h, 7d, custom)
   - By exception type

4. Bulk actions
   - Acknowledge incidents
   - Suppress alerts
   - Create incident review

5. Search optimization
   - Full-text search across incident data
   - Fuzzy matching for service names
   - Filter suggestions/autocomplete

**Component Structure:**
```
IncidentsPage
├── SearchBar (with service filter)
├── IncidentTable (sortable)
│   ├── IncidentRow
│   │   └── IncidentDetailDrawer
│   │       ├── IncidentHeader
│   │       ├── ExceptionStack
│   │       ├── ServiceImpactList
│   │       ├── IncidentTimelineChart
│   │       ├── RelatedIncidentsList
│   │       └── AiCopilot
│   └── Pagination
└── LoadingState/ErrorState
```

### 2. Root Cause Analysis Workbench (RootCausePage)

**Status:** Already implemented with real APIs  
**Connected Endpoints:**
- `GET /analysis/recommendations` — RCA recommendations ✅
- `GET /analysis/rca-summary` — RCA metadata ✅
- `GET /analysis/recommendation-summary` — Summary statistics ✅
- `GET /api/changes/recent` — Recent changes (for Change Intelligence) ⚠️ NOT IMPLEMENTED

**Enhancements Needed:**
1. RCA Evidence Workbench
   - Timeline visualization of events leading to incident
   - Correlation score for each piece of evidence
   - ML confidence indicators

2. Explainable AI Recommendations
   - Recommendation confidence score (0-100%)
   - Supporting evidence for each recommendation
   - Links to documentation/runbooks

3. Change Intelligence Section
   - Deploy events before incident
   - Config changes before incident
   - Correlate changes with incident timing
   - ⚠️ Needs `/api/changes/recent` endpoint (documented gap)

4. Evidence Dashboard
   - Exception patterns
   - Service dependency chain
   - Infrastructure changes
   - Network anomalies (if available)

5. Decision Support
   - "What if we rollback this change?"
   - "What if we scale this service?"
   - Link to runbooks
   - Slack/PagerDuty integration buttons

**Component Structure:**
```
RootCausePage
├── RCASummaryCard
│   ├── ProbableRootCause (KPI)
│   ├── TopService (KPI)
│   ├── RecommendationCount (KPI)
├── RCACopilotPanel
│   ├── ExecutiveSummary
│   └── RecommendationsList
├── ChangeIntelligenceCard
│   ├── RecentChangesList
│   └── ChangeTimeline
├── EvidenceDashboard
│   ├── ExceptionPatterns
│   ├── DependencyChain
│   └── AnomalyMarkers
└── RecommendationsTable
```

### 3. Correlation Engine (CorrelationPage)

**Status:** Already implemented with real APIs  
**Connected Endpoints:**
- `GET /analysis/correlations` — Correlation groups ✅
- `GET /analysis/recent-correlations` — Recent groups ✅
- `GET /analysis/service-dependencies` — Dependency graph ✅

**Enhancements Needed:**
1. Interactive Correlation Network
   - Service dependency graph
   - Color-coded by correlation strength
   - Click to drill into correlation group
   - Zoom/pan interactions

2. Correlation Detail Modal
   - List all incidents in group
   - Common exception type
   - Time window of correlation
   - Affected services
   - Business impact

3. Cascade Failure Analysis
   - Show dependency chain
   - Highlight critical paths
   - Identify single points of failure

**Component Structure:**
```
CorrelationPage
├── CorrelationSummaryKPIs
├── CorrelationTable
├── ServiceNetworkGraph
│   ├── InteractiveNetwork
│   └── CorrelationDetailModal
└── CascadeFailureAnalysis
```

### 4. War Room (WarRoomPage)

**Status:** Already exists, needs enhancement  
**Purpose:** Real-time incident war room for active incident response

**Features to Add:**
1. Real-time incident board
   - Active incidents (grouped by severity)
   - On-call rotation
   - Incident commander
   - Status updates

2. Collaboration tools
   - Timeline of actions taken
   - Notes/comments
   - Link to external tools (Slack, PagerDuty, Jira)

3. Decision log
   - What we did
   - Why we did it
   - Outcome
   - Time to resolution

---

## Design Principles (Wave 2)

### Information Hierarchy
1. **Primary:** Incident severity & status (immediate attention)
2. **Secondary:** Time-to-resolution & affected services
3. **Tertiary:** Exception type & correlation group
4. **Supporting:** AI confidence & recommendations

### Color Coding
- 🔴 **Critical/Error:** Red (#DC2626) for status 500+
- 🟠 **Warning:** Orange (#D97706) for status 400-499
- 🟡 **Info:** Yellow/Amber for status 300-399, warnings
- 🟢 **Healthy:** Green (#059669) for resolved, status <300

### Interaction Patterns
- **Hover:** Show additional context (confidence, timestamp)
- **Click:** Drill into detail modal/drawer
- **Right-click:** Quick actions (acknowledge, suppress, etc.)
- **Keyboard:** Ctrl+K for search, Arrow keys for navigation

### Responsive Design
- **Desktop:** Full table with charts, graphs, full detail drawers
- **Tablet:** Condensed tables, bottom sheets instead of drawers
- **Mobile:** Card-based layout, list view only

---

## API Integration Status

| Endpoint | Status | Page | Notes |
|----------|--------|------|-------|
| `/incidents` | ✅ | Incidents | Works perfectly |
| `/incidents/{id}/similar` | ✅ | Incidents | Shows related incidents |
| `/analysis/scored-alerts` | ✅ | Incidents | Alert scoring |
| `/analysis/correlations` | ✅ | Correlation | Correlation groups |
| `/analysis/recent-correlations` | ✅ | Correlation | Recent groups |
| `/analysis/recommendations` | ✅ | RCA | RCA recommendations |
| `/analysis/rca-summary` | ✅ | RCA | RCA metadata |
| `/analysis/recommendation-summary` | ✅ | RCA | Summary stats |
| `/api/changes/recent` | ❌ | RCA | **Missing** — Change Intelligence disabled |
| `/analysis/service-dependencies` | ✅ | Correlation | Dependency graph |

**Missing Gaps:**
- Changes/narrative endpoint (for Change Intelligence)
- Incident detail endpoint (can use incident.id from list)
- Custom runbook links (would need backend)

---

## Implementation Tasks

### Task 1: Enhance Incidents Page
**Estimated:** 3-4 days
1. Read incident list from backend ✅ (already done)
2. Build incident detail drawer with full context
3. Add severity indicator and color coding
4. Implement advanced filters (status, severity, time range)
5. Add search optimization and autocomplete
6. Test with real incident data
7. Accessibility audit (keyboard, screen readers)

### Task 2: Enhance RCA Workbench
**Estimated:** 3-4 days
1. Build RCA evidence dashboard
2. Add explainable AI recommendation cards
3. Implement Change Intelligence section (with graceful degradation for missing endpoint)
4. Add decision support panel
5. Create recommendation detail modal
6. Add evidence timeline visualization

### Task 3: Enhance Correlation Engine
**Estimated:** 2-3 days
1. Build interactive service network graph
2. Add correlation group detail modal
3. Implement cascade failure highlighting
4. Add filter by correlation strength
5. Test graph rendering with large datasets

### Task 4: Polish & Testing
**Estimated:** 2-3 days
1. Visual polish (spacing, typography, animations)
2. Performance optimization (loading states, pagination)
3. Error handling (missing data, API errors)
4. Accessibility testing
5. Browser compatibility testing
6. Create production-readiness scorecard

---

## Success Criteria

### Feature Completeness
- ✅ Incident explorer with real-time data
- ✅ RCA workbench with AI recommendations
- ✅ Correlation engine with network visualization
- ✅ War room with incident management tools
- ✅ All endpoints integrated (except missing backend features)

### User Experience
- Incident search < 1 second
- Detail drawer open in < 500ms
- Network graph render in < 2 seconds
- No jank (60 FPS) on interactions

### Code Quality
- 0 TypeScript errors
- 0 ESLint warnings
- 100% type coverage for API responses
- Accessibility: WCAG 2.1 AA

### Enterprise Readiness
- Fortune 500 SRE leaders recognize as production platform
- Incident workflow feels complete
- RCA provides actionable insights
- UI matches Datadog/Dynatrace quality

---

## Wave 2 Deliverables

### Documentation
1. **WAVE_2_SUMMARY.md** — Completion summary
2. **INCIDENT_MANAGEMENT_GUIDE.md** — User guide
3. **RCA_GUIDE.md** — Root cause analysis workflow

### Code
1. Enhanced IncidentsPage.tsx
2. Enhanced RootCausePage.tsx
3. Enhanced CorrelationPage.tsx
4. Enhanced WarRoomPage.tsx
5. New components:
   - IncidentDetailDrawer
   - ChangeIntelligenceCard
   - CorrelationNetworkGraph
   - EvidenceDashboard

### Screenshots
1. Incident explorer with filters
2. Incident detail drawer
3. RCA workbench
4. Correlation network
5. War room
6. Mobile responsiveness

---

## Known Limitations (Wave 2)

1. **No Change Intelligence** — `/api/changes/recent` not implemented
   - Workaround: Show "Change Intelligence unavailable" message
   - Fallback: Use deployment metadata from service info

2. **No Incident Resolution** — No POST endpoint to update incident status
   - Workaround: Add "View in external tool" button
   - Future: Implement when backend supports it

3. **No Runbook Integration** — No backend runbook system
   - Workaround: Link to documentation
   - Future: Add runbook search

4. **No Real-time Updates** — Polling only (no WebSocket)
   - Workaround: 10-second refresh interval
   - Future: Implement WebSocket for <1s updates

---

## Metrics to Track (Wave 2)

| Metric | Target | Status |
|--------|--------|--------|
| Page Load Time | < 2s | TBD |
| Search Response Time | < 1s | TBD |
| Detail Modal Open | < 500ms | TBD |
| Graph Render Time | < 2s | TBD |
| First Contentful Paint | < 1.5s | TBD |
| Time to Interactive | < 3s | TBD |
| Accessibility Score | > 90 | TBD |
| Mobile Score | > 85 | TBD |

---

## Next Steps

1. **Day 1-2:** Implement incident detail drawer and filters
2. **Day 3-4:** Build RCA evidence dashboard
3. **Day 5-6:** Enhance correlation network graph
4. **Day 7:** Polish UI and testing
5. **Day 8:** Final accessibility and performance optimization
6. **Day 9:** Create documentation and screenshots
7. **Day 10:** Commit and prepare for Wave 3

---

## Timeline

- **Wave 2 Start:** Today
- **Wave 2 Finish:** +10 days (by end of next week)
- **Wave 3 Start:** Week after Wave 2
- **Full Project:** 10-12 weeks (6 waves)

---

## Questions/Risks

1. **Change Intelligence Unavailable** — Should we show disabled UI or hide it?
   - Recommendation: Show with "Data unavailable" message (educate user about gap)

2. **Performance at Scale** — Can we render 10k incidents?
   - Solution: Implement virtual scrolling + pagination

3. **Graph Performance** — Can D3/Recharts handle 100+ services?
   - Solution: Use force-directed layout with optimized rendering

---

## Sign-Off

**Wave 2 Plan Approved:** ✅  
**Ready for Implementation:** ✅  
**Estimated Completion:** +10 days  
**Next Review:** After implementation complete
