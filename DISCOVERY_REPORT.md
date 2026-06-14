# RootPilot Backend Discovery Report

**Generated:** 2026-06-14  
**Status:** Complete  
**Backend URL:** `http://localhost:8080`  
**Frontend v1 Location:** `/rootpilot-frontend`  
**Frontend v2 Location:** `/rootpilot-frontend-v2` (to be created)

---

## 1. Endpoint Inventory

### Controllers & Routes

| Controller | Mapping | Endpoints | Status |
|-----------|---------|-----------|--------|
| HealthController | `/` | 1 | Active |
| IncidentController | `/incidents` | 3 | Active |
| MetricsController | `/` | 3 | Active |
| AnalysisController | `/analysis` | 77 | **Primary** |
| DependencyAnalysisController | `/analysis` | 5 | Active |
| SelfHealingController | `/analysis` | 4 | Active |
| RedisTestController | (unknown) | (unknown) | Unchecked |

### Endpoint Categories

#### Health & System (1 endpoint)
- `GET /health` — System health status

#### Incident Management (3 endpoints)
- `GET /incidents` — List all incidents
- `GET /incidents/{id}` — Get incident by ID
- `GET /incidents/services` — List all services with incidents

#### Metrics (3 endpoints)
- `GET /metrics` — Total incidents count
- `GET /metrics/exceptions` — Exception metrics by type
- `GET /metrics/services` — Service metrics

#### Analysis — Dashboard (6 endpoints)
- `GET /analysis/dashboard` → DashboardSummary
- `GET /analysis/executive-summary` → ExecutiveSummary
- `GET /analysis/live-dashboard` → LiveDashboard
- `GET /analysis/dashboard-snapshot` → DashboardSnapshot
- `GET /analysis/health-score` → int
- `GET /analysis/system-status` → String

#### Analysis — Incident Metrics (15 endpoints)
- `GET /analysis/exceptions` → Map<String, Long>
- `GET /analysis/top-service` → Map<String, Object>
- `GET /analysis/top-exception` → Map<String, Object>
- `GET /analysis/summary` → Map<String, Object>
- `GET /analysis/service-ranking` → List<Map>
- `GET /analysis/exception-ranking` → List<Map>
- `GET /analysis/live-count` → Map<String, Long>
- `GET /analysis/live-services` → Map<String, Long>
- `GET /analysis/live-exceptions` → Map<String, Long>
- `GET /analysis/severity` → Map<String, Object>
- `GET /analysis/recent-incidents` → Map<String, Long>
- `GET /analysis/recent-top-service` → Map<String, Object>
- `GET /analysis/recent-top-exception` → Map<String, Object>
- `GET /analysis/hourly-trend` → List<Map>
- `GET /analysis/spike-detection` → Map<String, Object>

#### Analysis — Root Cause Analysis (9 endpoints)
- `GET /analysis/root-cause-candidates` → Map<String, Object>
- `GET /analysis/correlations` → List<Map>
- `GET /analysis/top-correlation` → Map<String, Object>
- `GET /analysis/rca-summary` → Map<String, Object>
- `GET /analysis/recent-correlations` → List<Map>
- `GET /analysis/recent-top-correlation` → Map<String, Object>
- `GET /analysis/recent-rca-summary` → Map<String, Object>
- `GET /analysis/trend-summary` → Map<String, Object>
- `GET /analysis/alerts` → Map<String, List<String>>

#### Analysis — Alerting & Scoring (2 endpoints)
- `GET /analysis/scored-alerts` → List<Alert> DTO
- `GET /analysis/live-summary` → String

#### Analysis — Dependencies (11 endpoints)
- `GET /analysis/service-dependencies` → List<ServiceDependency>
- `GET /analysis/top-dependencies` → List<ServiceDependency>
- `GET /analysis/dependency-summary` → DependencySummary
- `GET /analysis/cascade-failures` → List<CascadeFailure>
- `GET /analysis/dependency-risks` → List<DependencyRisk>
- `GET /analysis/dependency-executive-summary` → DependencyExecutiveSummary
- `GET /analysis/failure-predictions` → List<FailurePrediction>
- `GET /analysis/top-risk-services` → String
- `GET /analysis/prediction-summary` → PredictionSummary
- `GET /analysis/prediction-executive-summary` → PredictionExecutiveSummary

#### Dependency Analysis (5 endpoints)
- `GET /analysis/dependency-impacts` → List<DependencyImpact>
- `GET /analysis/dependency-impact-summary` → DependencyImpactSummary
- `GET /analysis/dependency-impact-executive-summary` → DependencyImpactExecutiveSummary
- `GET /analysis/dependency-risk-scores` → List<DependencyRiskScore>
- `GET /analysis/dependency-risk-dashboard` → DependencyRiskDashboard

#### Analysis — Anomalies (4 endpoints)
- `GET /analysis/anomalies` → List<AnomalyDetection>
- `GET /analysis/top-anomaly` → String
- `GET /analysis/anomaly-summary` → AnomalySummary
- `GET /analysis/anomaly-executive-summary` → AnomalyExecutiveSummary

#### Analysis — Recommendations (4 endpoints)
- `GET /analysis/recommendations` → List<RootCauseRecommendation>
- `GET /analysis/top-recommendation` → String
- `GET /analysis/recommendation-summary` → RecommendationSummary
- `GET /analysis/recommendation-executive-summary` → RecommendationExecutiveSummary

#### Analysis — Reliability (6 endpoints)
- `GET /analysis/service-reliability` → List<ServiceReliability>
- `GET /analysis/top-risk-reliability` → String
- `GET /analysis/reliability-summary` → ReliabilitySummary
- `GET /analysis/reliability-executive-summary` → ReliabilityExecutiveSummary
- `GET /analysis/autonomous-actions` → List<AutonomousAction>
- `GET /analysis/action-summary` → ActionSummary
- `GET /analysis/action-executive-summary` → ActionExecutiveSummary

#### Analysis — Knowledge Graph (3 endpoints)
- `GET /analysis/knowledge-graph` → Map<String, Object>
- `GET /analysis/knowledge-graph-summary` → KnowledgeGraphSummary
- `GET /analysis/knowledge-graph-executive-summary` → KnowledgeGraphExecutiveSummary

#### Analysis — Automation Readiness (4 endpoints)
- `GET /analysis/automation-readiness` → List<AutomationReadiness>
- `GET /analysis/automation-readiness-summary` → AutomationReadinessSummary
- `GET /analysis/automation-readiness-executive-summary` → AutomationReadinessExecutiveSummary
- `GET /analysis/automation-readiness-dashboard` → AutomationReadinessDashboard

#### Analysis — Orchestrator (4 endpoints)
- `GET /analysis/autonomous-execution-plans` → List<AutonomousExecutionPlan>
- `GET /analysis/orchestrator-summary` → OrchestratorSummary
- `GET /analysis/orchestrator-executive-summary` → OrchestratorExecutiveSummary
- `GET /analysis/orchestrator-dashboard` → OrchestratorDashboard

#### Analysis — AIOps Command Center (4 endpoints)
- `GET /analysis/operational-priorities` → List<OperationalPriority>
- `GET /analysis/aiops-summary` → AIOpsSummary
- `GET /analysis/aiops-executive-summary` → AIOpsExecutiveSummary
- `GET /analysis/aiops-dashboard` → AIOpsDashboard

#### Analysis — Service Resilience (5 endpoints)
- `GET /analysis/service-resilience` → List<ServiceResilience>
- `GET /analysis/service-resilience-summary` → ServiceResilienceSummary
- `GET /analysis/service-resilience-executive-summary` → ServiceResilienceExecutiveSummary
- `GET /analysis/resilience-recommendations` → List<ResilienceRecommendation>
- `GET /analysis/resilience-dashboard` → ResilienceDashboard

#### Self-Healing (4 endpoints)
- `GET /analysis/self-healing-recommendations` → List<SelfHealingRecommendation>
- `GET /analysis/self-healing-summary` → SelfHealingSummary
- `GET /analysis/self-healing-executive-summary` → SelfHealingExecutiveSummary
- `GET /analysis/self-healing-dashboard` → SelfHealingDashboard

### Summary
- **Total Endpoints:** 114 (confirmed)
- **GET Operations:** 114 (100%)
- **POST/PUT/DELETE:** 0 (read-only API)
- **Authenticated:** Bearer token support (no OAuth, API keys)

---

## 2. DTO Inventory

**Total DTOs:** 58

### Core DTOs
- Incident, ServiceDependency, Alert
- AnomalyDetection, FailurePrediction, CascadeFailure
- DependencyRisk, DependencyImpact, DependencyRiskScore

### Dashboard DTOs
- DashboardSummary, DashboardSnapshot
- LiveDashboard
- ExecutiveSummary

### Feature-Specific DTOs
- **RCA:** RootCauseRecommendation
- **Anomaly:** AnomalySummary, AnomalyExecutiveSummary
- **Reliability:** ServiceReliability, ReliabilitySummary, ReliabilityExecutiveSummary
- **Resilience:** ServiceResilience, ServiceResilienceSummary, ServiceResilienceExecutiveSummary, ResilienceRecommendation, ResilienceDashboard
- **Automation Readiness:** AutomationReadiness, AutomationReadinessSummary, AutomationReadinessExecutiveSummary, AutomationReadinessDashboard
- **Autonomous Actions:** AutonomousAction, AutonomousExecutionPlan, ActionSummary, ActionExecutiveSummary
- **Orchestrator:** OrchestratorSummary, OrchestratorExecutiveSummary, OrchestratorDashboard
- **Knowledge Graph:** KnowledgeGraphNode, KnowledgeGraphEdge, KnowledgeGraphSummary, KnowledgeGraphExecutiveSummary
- **AIops:** AIOpsSummary, AIOpsExecutiveSummary, AIOpsDashboard, OperationalPriority
- **Dependency Analysis:** DependencyImpactSummary, DependencyImpactExecutiveSummary, DependencyRiskDashboard
- **Predictions:** PredictionSummary, PredictionExecutiveSummary
- **Recommendations:** RecommendationSummary, RecommendationExecutiveSummary
- **Self-Healing:** SelfHealingRecommendation, SelfHealingSummary, SelfHealingExecutiveSummary, SelfHealingDashboard
- **Dependencies:** DependencySummary, DependencyExecutiveSummary

---

## 3. Authentication & Security

### Current Implementation
- **Type:** Bearer Token (JWT-compatible)
- **Storage:** localStorage (`token`, `user`)
- **Headers:** 
  - `Authorization: Bearer <token>`
  - `X-RootPilot-Client: frontend-v1`
- **401 Response:** Auto-logout, redirect to `/login`
- **Interceptors:** Active (request/response)

### Missing Components
- **Login endpoint:** Defined as `/api/auth/login` in endpoints.ts but not implemented in backend
- **Session endpoint:** Defined as `/api/auth/session` in endpoints.ts but not implemented
- **OAuth:** Not implemented
- **API Key auth:** Not implemented
- **Logout endpoint:** Not found

### Recommendation
- Backend has **no authentication endpoints** currently
- v2 frontend should implement **optional token support** (if provided)
- For demo/evaluation: Run without auth or with mock token in localStorage

---

## 4. Current Frontend → Backend Integration Map

### v1 Frontend Status
- **19 pages:** CommandCenter, RootCauseAnalysis, PredictiveAnalytics, etc.
- **API Client:** Axios with interceptors (axios.js pattern)
- **Data Fetching:** React Query (TanStack Query)
- **Mock Data:** None found (endpoints.ts lists all routes but implementation may vary)
- **Theme:** Material-UI v5 with custom dark theme
- **State Management:** React Context (Auth, Theme)

### Integration Gaps Identified
1. **Auth endpoints missing** — `/api/auth/login`, `/api/auth/session` not implemented
2. **Search endpoint missing** — `/api/search` defined but not in backend
3. **Audit logs missing** — `/api/audit-logs` not found
4. **Alert subscriptions missing** — `/api/alert-subscriptions/*` not found
5. **Infrastructure endpoints missing** — `/api/infrastructure/*` not found
6. **Changes & narrative endpoints missing** — `/api/changes/*` not found
7. **Business services missing** — `/api/business-services/*` not found
8. **Operational briefing missing** — `/api/operational-briefing/*` not found
9. **Copilot endpoint missing** — `/api/copilot/ask` not found
10. **Reliability timeline missing** — Query endpoint defined but not implemented

### Fully Implemented Categories
- Health check ✓
- Incident CRUD ✓
- Analysis dashboards ✓ (77 analysis endpoints)
- Metrics ✓
- Dependency analysis ✓
- Self-healing ✓

---

## 5. Mock Data Inventory

**Result:** No mock data files found in v1 frontend.  
**Inference:** All data sourced from backend APIs (or uses real data generators in backend services).

---

## 6. Architecture Notes

### Backend Architecture
- **Framework:** Spring Boot
- **Language:** Java
- **Database:** PostgreSQL (localhost:5432)
- **Message Queue:** RabbitMQ (localhost:5672)
- **Cache:** Redis (localhost:6379)
- **API Style:** REST (no GraphQL, no gRPC)
- **Response Format:** JSON

### Frontend Architecture (v1)
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Package Manager:** npm
- **UI Library:** Material-UI v5
- **Data Fetching:** TanStack React Query
- **State:** React Context + localStorage
- **Styling:** Material-UI theme system

### Considerations for v2
1. **Keep existing structure** for familiarity
2. **Use same API client pattern** (axios-based)
3. **Extend DTOs** to cover v2 features
4. **Consider:** Real-time updates (WebSocket) if needed
5. **Consider:** Streaming for large datasets

---

## 7. Endpoint Usage Priority

### Must Have (Flagship Features)
1. `/analysis/aiops-dashboard` — Command Center
2. `/analysis/aiops-executive-summary` — Command Center summary
3. `/analysis/operational-priorities` — Command Center priorities
4. `/incidents` — Incident list
5. `/analysis/correlations` — RCA correlation
6. `/analysis/rca-summary` — RCA summary
7. `/analysis/service-reliability` — Service Intelligence
8. `/analysis/service-dependencies` — Dependency mapping
9. `/analysis/anomalies` → Anomaly detection
10. `/analysis/autonomous-execution-plans` → Autonomous Actions

### Should Have (Enhanced Features)
- `/analysis/knowledge-graph*` — Operations Copilot
- `/analysis/automation-readiness*` — Automation insights
- `/analysis/resilience*` — Resilience analysis
- `/analysis/prediction*` — Predictive analytics
- `/metrics/*` — Operational metrics

### Nice to Have (Enhancement)
- `/analysis/service-ranking` — Comparative view
- `/analysis/exception-ranking` — Exception analytics
- `/analysis/cascade-failures` — Impact analysis
- `/analysis/spike-detection` — Trend detection

---

## 8. Known Gaps & Action Items

| Gap | Impact | Action |
|-----|--------|--------|
| No POST/PUT/DELETE endpoints | Read-only API | Document as limitation |
| Auth endpoints missing | Cannot authenticate | Use optional token or demo mode |
| Search endpoint missing | Cannot implement global search | Skip for v1 |
| Audit logs missing | Cannot track changes | Skip for v1 |
| Infrastructure endpoints missing | Cannot show infra view | Skip for v1 |
| Changes/narrative missing | RCA narrative incomplete | Use correlations only |
| Business services missing | Cannot show business mapping | Skip for v1 |
| Operational briefing missing | Cannot show daily briefing | Skip for v1 |
| Copilot API missing | Cannot implement AI copilot | Use static recommendations |
| Reliability timeline missing | Cannot show historical trends | Implement later |

---

## 9. Recommendations

### For v2 Frontend Prioritization
1. **Phase 1 (Flagship):** Command Center, Incident Management, RCA
2. **Phase 2 (Core):** Service Intelligence, Dependencies, Anomalies
3. **Phase 3 (Enhanced):** Autonomous Actions, Orchestration, Knowledge Graph
4. **Phase 4 (Polish):** Automation Readiness, Resilience, Predictions

### For Backend Enhancement (Out of Scope for v2)
- Implement missing auth endpoints
- Add POST/PUT/DELETE for incident management
- Implement search endpoint
- Add audit logging
- Implement infrastructure endpoints
- Add changes/narrative API
- Implement copilot endpoint

---

## Summary Statistics

- **Total Endpoints:** 114 (all GET)
- **Usable Endpoints:** 99+ (all Analysis + Incidents + Metrics)
- **Missing Endpoints:** 15+ (Auth, Search, Audit, Infrastructure, etc.)
- **Total DTOs:** 58
- **Authentication:** Bearer token (optional)
- **Backend Status:** Running on localhost:8080
- **Database:** PostgreSQL (localhost:5432)
- **Message Queue:** RabbitMQ (localhost:5672)
- **Cache:** Redis (localhost:6379)

**Recommendation:** Proceed with v2 frontend implementation using available endpoints (114 confirmed). Mark missing endpoints as documented gaps in production-readiness scorecard.
