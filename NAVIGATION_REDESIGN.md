# RootPilot v2 Navigation Redesign

**Objective:** Reorganize navigation for SRE, NOC, Platform Engineering, and Operations personas. Optimize for incident response, decision-making, and system insight.

## V1 Current Navigation (19 items)
1. Dashboard
2. Executive Overview
3. Infrastructure
4. Incidents
5. Service Intelligence
6. War Room
7. Incident Correlation
8. Root Cause Analysis
9. Predictive Analytics
10. Service Map
11. Impact Analysis
12. Service Health
13. Business Impact
14. Autonomous Engine
15. Operations Command
16. Settings

**Problem:** Flat, non-hierarchical. Difficult to find related features. Lacks context (no grouping).

---

## V2 Optimized Navigation (3-tier hierarchy)

### Primary Navigation (Top-level, always visible)
Organized by **operational workflow** not feature name.

```
1. Command Center (flagship)
   ↓ Operational Priorities
   ↓ Real-time Status
   ↓ Quick Actions

2. Incident Management
   ↓ Active Incidents
   ↓ Incident Timeline
   ↓ War Room

3. Root Cause Analysis
   ↓ Correlations
   ↓ Service Dependencies
   ↓ Anomalies & Predictions

4. Service Intelligence
   ↓ Service Health
   ↓ Reliability Timeline
   ↓ Service Profiles

5. Infrastructure
   ↓ Dependency Map
   ↓ Service Topology
   ↓ Impact Analysis

6. Automation & Insights
   ↓ Autonomous Actions
   ↓ Automation Readiness
   ↓ Knowledge Graph

7. Settings
```

### Rationale

#### For SRE/NOC Users
- **Command Center first** — real-time operational dashboard with priorities
- **Incident Management second** — immediate problem access
- **RCA third** — when they need to investigate deeper
- **Service Intel fourth** — for health checks and alerts
- Clear workflow: Detect → Respond → Investigate → Learn

#### For Platform Engineering
- **Infrastructure first** — dependency and topology view
- **Service Intelligence second** — reliability and performance
- **Automation Readiness third** — can we automate this?
- **Autonomous Actions fourth** — what has been automated?

#### For Operations/Executive
- **Command Center** — business-critical operational overview
- **Service Intelligence** — system health at a glance
- **Incident Management** — what's broken and why

### Implementation Notes

1. **Command Center** becomes the index page (not generic Dashboard)
2. **Submenu groups** show in sidebar with expand/collapse
3. **Breadcrumbs** show current hierarchy
4. **Search** filters across all sections
5. **Shortcuts** for power users (jump to top 5 services)
6. **Recent views** - "Recently Viewed" section at top
7. **Context-aware navigation** - when in incident detail, show "Related" section

---

## Competitive Benchmarking

### Datadog (APM, Monitoring, Logs)
- **Structure:** Dashboard → Services → Incidents → Traces → Logs
- **Navigation:** Unified top-nav + left sidebar
- **Strength:** Service-centric, clear entry points
- **Weakness:** Lots of scrolling in sidebar

### Dynatrace (AIOps, Full-Stack)
- **Structure:** Home → Problems → Services → Infrastructure → Analyze
- **Navigation:** Top-nav + collapsible sidebar
- **Strength:** Problem-first, intelligence-driven
- **Weakness:** Deep nesting, hard to find specific features

### New Relic (Observability Platform)
- **Structure:** All Entities → Services → Infrastructure → Logs → Traces
- **Navigation:** Top + left sidebar, heavily customizable
- **Strength:** Entity-first, flexible
- **Weakness:** Too many options, customization fatigue

### Grafana (Dashboarding, Alerting)
- **Structure:** Dashboards → Alerts → Explore → Admin
- **Navigation:** Top-nav + left sidebar
- **Strength:** Dashboard-first, simple
- **Weakness:** Limited for AIOps/incident management

### Splunk Observability (AIOps)
- **Structure:** Home → Incidents → Services → Infrastructure → Alerts
- **Navigation:** Top-nav + collapsible sidebar
- **Strength:** Incident-first, real-time
- **Weakness:** Overwhelming information density

### ServiceNow AIOps
- **Structure:** Dashboard → Incidents → Problems → Changes → Services
- **Navigation:** Top-nav + massive sidebar
- **Strength:** ITIL-aligned, processes
- **Weakness:** Enterprise bloat, slow to navigate

---

## V2 Design Principles (vs. Competitors)

1. **Incident-First** (like Splunk, Dynatrace)
   - But more accessible than Datadog
   - Less enterprise bloat than ServiceNow

2. **Service-Centric** (like New Relic, Datadog)
   - But with clear operational workflows
   - Not overwhelming customization

3. **Real-Time Focused** (like Splunk, Dynatrace)
   - Priorities, alerts, quick actions
   - Not dashboard-heavy like Grafana

4. **AIOps-Ready** (like Dynatrace, ServiceNow)
   - Predictions, recommendations, autonomous actions
   - Knowledge graph for correlation

5. **Lean Navigation** (vs. all competitors)
   - Max 7 top-level items
   - 3-4 sub-items per section
   - Search always available
   - Recent/favorite shortcuts

---

## V2 Navigation Structure (Technical)

### Route Architecture

```typescript
/
├── login
└── [Protected]
    ├── command-center (index) ← Default landing
    │   ├── priorities
    │   └── quick-actions
    ├── incidents
    │   ├── active
    │   ├── [id]/detail
    │   ├── [id]/timeline
    │   └── war-room
    ├── rca
    │   ├── correlations
    │   ├── dependencies
    │   └── anomalies
    ├── service-intel
    │   ├── health
    │   ├── reliability
    │   └── [name]/profile
    ├── infrastructure
    │   ├── topology
    │   ├── impact-map
    │   └── services-list
    ├── automation
    │   ├── actions
    │   ├── readiness
    │   └── knowledge-graph
    └── settings
```

### Navigation State Management

```typescript
interface NavState {
  currentSection: 'command-center' | 'incidents' | 'rca' | 'service-intel' | 'infrastructure' | 'automation' | 'settings';
  expandedGroups: Set<string>;
  recentPages: Array<{ path: string; label: string; timestamp: number }>;
  favorites: Set<string>;
}
```

---

## Migration Path (v1 → v2)

| V1 Page | V2 Section | Status |
|---------|-----------|--------|
| Dashboard | Command Center | Enhanced |
| Executive Overview | Command Center | Merged |
| Incidents | Incident Management | Enhanced |
| War Room | Incident Management | Kept |
| Incident Correlation | RCA | Renamed |
| Root Cause Analysis | RCA | Enhanced |
| Predictive Analytics | RCA | Grouped |
| Service Intelligence | Service Intel | Enhanced |
| Service Health | Service Intel | Grouped |
| Service Map | RCA / Infrastructure | Moved |
| Impact Analysis | Infrastructure | Renamed |
| Dependencies | Infrastructure | Grouped |
| Business Impact | (Removed - low usage) | — |
| Infrastructure | Infrastructure | New |
| Autonomous Engine | Automation | Renamed |
| Knowledge Graph | Automation | Grouped |
| Settings | Settings | Kept |

---

## Wave 1 Implementation

### What's Built
1. **Command Center** — Real-time operational cockpit
   - AIOs Dashboard data
   - Operational Priorities list
   - Real-time system status
   - Quick action buttons
   - Health score card

2. **Navigation Structure** — 3-tier hierarchy
   - Collapsible groups
   - Search integration
   - Recent pages shortcut
   - Icons for quick scanning

3. **Core Layout** — Enhanced AppLayout
   - Refined sidebar
   - Better visual hierarchy
   - Real-time status indicator
   - User profile menu

### What's Connected
- `/analysis/aiops-dashboard` — Operational overview
- `/analysis/operational-priorities` — Priority list
- `/analysis/aiops-executive-summary` — System summary
- `/analysis/system-status` — Status check
- `/analysis/health-score` — Health metric

---

## Accessibility Considerations

- **Keyboard Navigation:** Arrow keys to navigate sections, Enter to open
- **Screen Readers:** ARIA labels for navigation structure
- **Contrast:** WCAG AA minimum on all text
- **Focus Management:** Clear focus indicators, skip links
- **Mobile:** Bottom tab navigation, collapsible sections

---

## Summary

**V2 Navigation eliminates cognitive load** by:
1. Grouping related features
2. Providing clear entry points by persona
3. Reducing top-level items from 16 to 7
4. Adding search and shortcuts
5. Organizing by operational workflow, not features

**Expected Outcome:** Fortune 500 SRE leaders will recognize this as a professional AIOps platform, not a demo application.
