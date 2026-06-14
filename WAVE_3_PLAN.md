# Wave 3 — Service Intelligence & Dependencies

**Status:** Planning  
**Duration:** 1-2 weeks  
**Focus:** Service profiling, dependency visualization, business impact analysis  
**Key Deliverables:** Service profile pages, dependency explorer, service map with business context

---

## Overview

Wave 3 transforms RootPilot from incident-focused into **service-centric**. SRE teams will understand:
- Individual service health, reliability, and resilience scores
- Upstream/downstream dependencies and cascade risks
- Business impact of service issues
- Service ownership and runbook links
- Historical performance and anomaly patterns

---

## Features to Implement

### 1. Service Intelligence Hub (ServiceIntelligencePage)

**Status:** Page exists, needs enhancement  
**Connected Endpoints:**
- `GET /services` — Service catalog ✅
- `GET /analysis/service-health` — Health metrics ✅
- `GET /analysis/service-reliability` — Reliability stats ✅
- `GET /analysis/service-resilience` — Resilience data ✅
- `GET /analysis/anomalies` — Service anomalies ✅

**Features to Build:**
1. Service browser grid
   - Service name, owner, team
   - Health score (color-coded)
   - Last incident timestamp
   - Incident count (30d, 90d)
   - Critical alerts count
   - Click to navigate to service profile

2. Advanced filtering
   - By team
   - By health score (critical, warning, healthy)
   - By incident frequency
   - By anomaly count
   - By business criticality

3. Search and discovery
   - Full-text search by service name
   - Fuzzy matching on owner names
   - Filter suggestions from recent services

4. Service grouping
   - By team/owner
   - By criticality tier
   - By technology stack (when available)
   - By business domain

**Component Structure:**
```
ServiceIntelligencePage
├── SearchBar (with filters)
├── ServiceGrid (or Table)
│   ├── ServiceCard
│   │   ├── HealthBadge
│   │   ├── IncidentCount
│   │   ├── AnomalyIndicator
│   │   └── OwnerInfo
│   └── Pagination/VirtualScroll
├── FilterPanel
└── LoadingState/ErrorState
```

**Estimated:** 2-3 days

### 2. Service Profile Page (ServiceProfilePage)

**Status:** Route exists, needs implementation  
**Connected Endpoints:**
- `GET /services/{name}` — Service details
- `GET /analysis/service-reliability` — Reliability timeline
- `GET /analysis/service-resilience` — Resilience data
- `GET /analysis/anomalies` — Service anomalies
- `GET /analysis/top-dependencies` — Dependencies
- `GET /analysis/cascade-failures` — Cascade risks

**Features to Build:**
1. Service header
   - Service name, description, owner, team
   - SLA/SLO if available
   - Business criticality badge
   - Last incident link
   - Link to runbook

2. Health dashboard
   - Reliability score (%) with trend
   - Resilience score (%) with trend
   - Error rate (%) with chart
   - Response time (ms) with chart
   - 99th percentile latency

3. Incident history
   - Recent incidents (5-10)
   - Incident timeline (30d)
   - MTTR (mean time to resolve)
   - Incident frequency trend

4. Anomaly detection
   - Recent anomalies
   - Anomaly timeline
   - Alert threshold configuration (if writable)
   - Anomaly type breakdown

5. Dependencies visualization
   - Upstream dependencies (services calling this)
   - Downstream dependencies (services this calls)
   - Dependency strength (% traffic)
   - Cascade risk indicator

6. Business impact
   - Estimated users affected on failure
   - Revenue impact (if available)
   - Related business services
   - SLA/SLO status

7. Team information
   - Owner/on-call team
   - Links to Slack channel
   - PagerDuty policy
   - Deployment schedule

**Component Structure:**
```
ServiceProfilePage
├── ServiceHeader
│   ├── ServiceName & Metadata
│   ├── SLABadge
│   └── ActionButtons (runbook, pagerduty, etc.)
├── HealthDashboard
│   ├── ReliabilityCard
│   ├── ResilienceCard
│   ├── ErrorRateChart
│   └── LatencyChart
├── IncidentHistory
│   ├── RecentIncidentsList
│   └── MTTRMetric
├── AnomalySection
│   ├── RecentAnomalies
│   └── AnomalyTimeline
├── DependenciesSection
│   ├── UpstreamList
│   └── DownstreamList
└── BusinessImpactPanel
```

**Estimated:** 3-4 days

### 3. Dependency Explorer (DependencyPage)

**Status:** Page exists, needs enhancement  
**Connected Endpoints:**
- `GET /analysis/top-dependencies` — Dependency graph ✅
- `GET /analysis/cascade-failures` — Cascade paths ✅
- `GET /analysis/dependency-risks` — Risk scores ✅
- `GET /analysis/dependency-dashboard` — Dependency summary ✅

**Features to Build:**
1. Interactive dependency graph
   - Force-directed layout with D3 or Cytoscape
   - Nodes = services, edges = dependencies
   - Edge thickness = traffic volume
   - Node color = health status
   - Zoom/pan interactions
   - Click to drill into service profile

2. Cascade failure analysis
   - Highlight critical paths
   - Identify single points of failure
   - Risk propagation calculation
   - "What if this service fails?" analysis

3. Dependency table view
   - Source service → Target service
   - Dependency type (direct, indirect)
   - Traffic percentage
   - Health of both parties
   - Risk score
   - Last incident correlation

4. Resilience patterns
   - Identify fully redundant paths
   - Find circular dependencies
   - Measure path diversity
   - Recommend optimization

5. Change impact analysis
   - "If we deploy to Service X, affects..."
   - Related services that may break
   - Recommended test coverage
   - Required coordination teams

**Component Structure:**
```
DependencyPage
├── DependencyGraph
│   ├── InteractiveNetwork
│   ├── ServiceDetailPopover
│   └── FilterByRisk
├── CascadeAnalysis
│   ├── SinglePointsOfFailure
│   ├── CriticalPaths
│   └── RecommendedImprovements
├── DependencyTable
└── ChangeImpactAnalyzer
```

**Estimated:** 3-4 days

### 4. Business Impact Analysis (BusinessImpactPage)

**Status:** Page exists, needs enhancement  
**Connected Endpoints:**
- `GET /analysis/business-impact` — Business impact metrics
- `GET /analysis/dependency-impact` — Dependency impact
- `GET /services` — Service catalog
- `GET /analysis/service-reliability` — Reliability data

**Features to Build:**
1. Business metrics dashboard
   - Revenue per minute (if available)
   - Users affected by service
   - Critical business processes blocked
   - Estimated financial impact

2. Service criticality matrix
   - Users impacted vs. Failure probability
   - Bubble chart (x=users, y=probability, size=revenue)
   - Color = health status
   - Click to drill into service

3. Tier system
   - Tier 1 (critical): Customer-facing, high revenue impact
   - Tier 2 (important): Internal critical, revenue dependent
   - Tier 3 (standard): Non-critical infrastructure
   - View services by tier

4. SLA tracking
   - Monthly uptime per service
   - Remaining SLA budget
   - On track / at risk / violated
   - Historical SLA trends

5. Impact correlation
   - Service outage → Estimated revenue loss
   - Historical data from past incidents
   - Predictive models if available

**Component Structure:**
```
BusinessImpactPage
├── RevenueMetricsDashboard
│   ├── RevenuePerMinuteCard
│   ├── UsersAffectedCard
│   └── FinancialImpactCard
├── CriticalityMatrix
│   └── BubbleChart
├── ServiceTierGrid
│   ├── Tier1Services
│   ├── Tier2Services
│   └── Tier3Services
├── SLATracker
└── ImpactCorrelationChart
```

**Estimated:** 2-3 days

### 5. Service Health Page Enhancement (ServiceHealthPage)

**Status:** Page exists, needs enhancement  
**Connected Endpoints:**
- `GET /analysis/service-reliability` — Service health ✅
- `GET /analysis/service-resilience` — Resilience ✅
- `GET /analysis/reliability-executive-summary` — Summary ✅

**Enhancements:**
1. Add detailed charts
   - Reliability over time (30d, 90d, 1y)
   - Resilience trends
   - Anomaly overlay on charts
   - Incident markers on charts

2. Comparative analysis
   - Compare services (which is most reliable?)
   - Benchmark against team average
   - Percentile ranking

3. Root cause links
   - Link anomalies to incidents
   - Link incidents to RCA
   - Show fixes applied

**Estimated:** 1-2 days

---

## API Integration Status (Wave 3)

| Endpoint | Status | Page | Notes |
|----------|--------|------|-------|
| `/services` | ✅ | Service Intelligence | Works perfectly |
| `/analysis/service-reliability` | ✅ | Service Health | Full reliability data |
| `/analysis/service-resilience` | ✅ | Service Health | Resilience metrics |
| `/analysis/top-dependencies` | ✅ | Dependencies | Dependency graph |
| `/analysis/cascade-failures` | ✅ | Dependencies | Cascade analysis |
| `/analysis/dependency-risks` | ✅ | Dependencies | Risk scoring |
| `/analysis/dependency-dashboard` | ✅ | Dependencies | Summary stats |
| `/analysis/business-impact` | ✅ | Business Impact | Impact metrics |
| `/analysis/anomalies` | ✅ | Service Profile | Service anomalies |

**All Wave 3 APIs implemented and ready.**

---

## Implementation Tasks

### Task 1: Service Intelligence Hub (2-3 days)
1. Build ServiceIntelligencePage with service grid
2. Implement search and filtering
3. Add pagination/virtual scrolling
4. Test with real data
5. Mobile responsiveness

### Task 2: Service Profile Page (3-4 days)
1. Create ServiceProfilePage component structure
2. Build health dashboard with charts
3. Add incident history section
4. Implement dependency visualization
5. Add business impact context
6. Accessibility audit

### Task 3: Dependency Explorer (3-4 days)
1. Choose graph library (D3 vs. Cytoscape vs. Reaflow)
2. Implement interactive network visualization
3. Build cascade analysis engine
4. Create risk highlighting
5. Add change impact analyzer
6. Performance test with large graphs

### Task 4: Business Impact & Polish (2-3 days)
1. Enhance BusinessImpactPage with metrics
2. Build criticality matrix visualization
3. Add SLA tracking
4. Visual polish across all pages
5. Cross-browser testing

---

## Design Considerations (Wave 3)

### Service Cards
- Health indicator (left edge, colored)
- Service name, owner, team
- Health score, incident count
- Anomaly indicator badge
- 3-5 cols on desktop, 1-2 on mobile

### Dependency Graph
- Force-directed layout (better than tree)
- Color: health status (red/orange/green)
- Size: traffic volume or incident frequency
- Edge labels: optional (traffic %)
- Interactive tooltips

### Service Profiles
- Sticky header (service name, SLA)
- Scrollable content sections
- Collapsible sections on mobile
- Fixed right sidebar with quick actions

---

## Success Criteria (Wave 3)

### Feature Completeness
- Service browser working with search/filter
- Service profiles load in < 500ms
- Dependency graph renders in < 2 seconds
- Business impact metrics visible
- All team/owner metadata displayed

### Performance
- Service grid: 60 FPS scroll
- Dependency graph: 60 FPS zoom/pan
- Search: < 1 second response
- Chart rendering: < 500ms

### UX Quality
- Service discovery is intuitive
- Dependency visualization is clear
- Business context evident
- Mobile responsive
- Keyboard accessible (WCAG AA)

---

## Deliverables (Wave 3)

1. **WAVE_3_SUMMARY.md** — Completion report
2. **Enhanced Pages:**
   - ServiceIntelligencePage.tsx
   - ServiceProfilePage.tsx (implement)
   - DependencyPage.tsx (enhance)
   - BusinessImpactPage.tsx (enhance)
   - ServiceHealthPage.tsx (enhance)

3. **New Components:**
   - ServiceCard
   - HealthDashboard
   - DependencyGraph
   - CriticalityMatrix
   - ServiceHeader

4. **Screenshots:**
   - Service intelligence grid
   - Service profile page
   - Dependency graph
   - Business impact matrix
   - Mobile views

---

## Timeline

**Wave 3 Start:** After Wave 2 complete  
**Wave 3 Duration:** 10-12 days  
**Wave 3 End:** ~2026-07-05  

---

## Known Limitations (Wave 3)

1. **No Team Assignment API** — Team data may be in service metadata only
   - Workaround: Extract from owner name or hardcode mappings

2. **No Runbook Integration** — No backend runbook system
   - Workaround: Link to external documentation

3. **No SLA Configuration** — SLA values may be static
   - Workaround: Show available SLA data

4. **Graph Performance** — May slow with 500+ services
   - Mitigation: Implement node clustering and filtering

---

## Questions for Stakeholders

1. **Dependency Strength:** Should edges show real traffic data or just correlation?
2. **Business Metrics:** Available in backend or should we estimate?
3. **Team Ownership:** How is team assignment stored in backend?
4. **SLA/SLO:** Are these configurable or read-only from backend?

---

## Sign-Off

**Wave 3 Plan Status:** ✅ READY FOR IMPLEMENTATION
**Approval:** ✅ Ready to begin after Wave 2 complete
**Estimated Completion:** 10-12 days after start
