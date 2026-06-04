import { endpoints } from '../api/endpoints';
import { getOrMock } from './base';
import * as mock from '../utils/mockData';
import type { AIOpsDashboard, Alert, AnomalyDetection, AutomationReadiness, AutomationReadinessDashboard, AutonomousAction, AutonomousExecutionPlan, CascadeFailure, DashboardSnapshot, DashboardSummary, DependencyImpact, DependencyRisk, DependencyRiskDashboard, DependencyRiskScore, DependencySummary, FailurePrediction, Incident, KnowledgeGraphSummary, RootCauseRecommendation, SelfHealingDashboard, ServiceDependency, ServiceReliability, ServiceResilience, StringNumberMap, StringObjectMap } from '../types/backend';

export const dashboardService = {
  summary: () => getOrMock<DashboardSummary>(endpoints.analysis.dashboard, mock.dashboardSummary),
  snapshot: () => getOrMock<DashboardSnapshot>(endpoints.analysis.dashboardSnapshot, mock.dashboardSnapshot),
  hourlyTrend: () => getOrMock<StringObjectMap[]>(endpoints.analysis.hourlyTrend, mock.trend),
  scoredAlerts: () => getOrMock<Alert[]>(endpoints.analysis.scoredAlerts, mock.alerts),
  serviceMetrics: () => getOrMock<StringNumberMap>(endpoints.serviceMetrics, Object.fromEntries(mock.reliability.map((s) => [s.serviceName, s.incidentCount]))),
  exceptionMetrics: () => getOrMock<StringNumberMap>(endpoints.exceptionMetrics, { TimeoutException: 48, NullPointerException: 32, RateLimitException: 21, JwtValidationException: 12 }),
};
export const incidentService = {
  list: () => getOrMock<Incident[]>(endpoints.incidents, mock.mockIncidents),
  services: () => getOrMock<string[]>(endpoints.services, mock.reliability.map((s) => s.serviceName)),
};
export const correlationService = {
  correlations: () => getOrMock<StringObjectMap[]>(endpoints.analysis.correlations, mock.recommendations.map((r) => ({ service: r.serviceName, exception: r.exceptionName, incidentCount: r.incidentCount }))),
  recentCorrelations: () => getOrMock<StringObjectMap[]>(endpoints.analysis.recentCorrelations, mock.recommendations.map((r) => ({ service: r.serviceName, exception: r.exceptionName, incidentCount: Math.round(r.incidentCount / 3) }))),
};
export const rootCauseService = {
  rcaSummary: () => getOrMock<StringObjectMap>(endpoints.analysis.rcaSummary, { totalIncidents: 128, topService: 'checkout-service', topException: 'TimeoutException', probableRootCause: 'TimeoutException in checkout-service', topCorrelation: { service: 'checkout-service', exception: 'TimeoutException', incidentCount: 48 } }),
  recommendations: () => getOrMock<RootCauseRecommendation[]>(endpoints.analysis.recommendations, mock.recommendations),
};
export const predictionService = {
  predictions: () => getOrMock<FailurePrediction[]>(endpoints.analysis.failurePredictions, mock.predictions),
  anomalies: () => getOrMock<AnomalyDetection[]>(endpoints.analysis.anomalies, mock.anomalies),
};
export const knowledgeGraphService = {
  graph: () => getOrMock<StringObjectMap>(endpoints.analysis.knowledgeGraph, { nodes: mock.reliability.map((r) => ({ nodeId: r.serviceName, nodeType: 'SERVICE', nodeName: r.serviceName, relationshipCount: 3 })), edges: mock.serviceDependencies.map((d) => ({ source: d.sourceService, target: d.targetService, relationshipType: 'DEPENDS_ON', strength: d.dependencyCount * 7 })) }),
  summary: () => getOrMock<KnowledgeGraphSummary>(endpoints.analysis.knowledgeGraphSummary, mock.knowledgeSummary),
};
export const dependencyService = {
  dependencies: () => getOrMock<ServiceDependency[]>(endpoints.analysis.topDependencies, mock.serviceDependencies),
  summary: () => getOrMock<DependencySummary>(endpoints.analysis.dependencySummary, mock.dependencySummary),
  risks: () => getOrMock<DependencyRisk[]>(endpoints.analysis.dependencyRisks, mock.dependencyRisks),
  cascades: () => getOrMock<CascadeFailure[]>(endpoints.analysis.cascadeFailures, mock.cascades),
  impacts: () => getOrMock<DependencyImpact[]>(endpoints.analysis.dependencyImpacts, mock.dependencyImpacts),
  riskScores: () => getOrMock<DependencyRiskScore[]>(endpoints.analysis.dependencyRiskScores, mock.dependencyRiskScores),
  riskDashboard: () => getOrMock<DependencyRiskDashboard>(endpoints.analysis.dependencyRiskDashboard, mock.dependencyRiskDashboard),
};
export const healthService = {
  reliability: () => getOrMock<ServiceReliability[]>(endpoints.analysis.serviceReliability, mock.reliability),
  resilience: () => getOrMock<ServiceResilience[]>(endpoints.analysis.serviceResilience, mock.resilience),
};
export const autonomousService = {
  actions: () => getOrMock<AutonomousAction[]>(endpoints.analysis.autonomousActions, mock.autonomousActions),
  executionPlans: () => getOrMock<AutonomousExecutionPlan[]>(endpoints.analysis.autonomousExecutionPlans, mock.executionPlans),
  readiness: () => getOrMock<AutomationReadiness[]>(endpoints.analysis.automationReadiness, mock.automationReadiness),
  readinessDashboard: () => getOrMock<AutomationReadinessDashboard>(endpoints.analysis.automationReadinessDashboard, mock.automationDashboard),
  selfHealing: () => getOrMock<SelfHealingDashboard>(endpoints.analysis.selfHealingDashboard, mock.selfHealingDashboard),
};
export const commandCenterService = {
  dashboard: () => getOrMock<AIOpsDashboard>(endpoints.analysis.aiopsDashboard, mock.aiopsDashboard),
  priorities: () => getOrMock(endpoints.analysis.operationalPriorities, mock.priorities),
};
