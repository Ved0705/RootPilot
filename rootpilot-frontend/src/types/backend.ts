// Generated from Spring Boot DTO/entity contracts. Keep names aligned with backend JSON fields.

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | string;

export type RiskLevel = Severity | string;

export interface StringNumberMap { [key: string]: number }

export interface StringObjectMap { [key: string]: unknown }

export interface Incident {
  id: number;
  serviceName: string;
  endpoint: string;
  statusCode: number;
  latency: number;
  exceptionType: string;
  version: string;
  timestamp: string;
}

export interface AIOpsDashboard {
  operationalPriorities: OperationalPriority[];
  aiOpsSummary: AIOpsSummary;
  executiveSummary: AIOpsExecutiveSummary;
}

export interface AIOpsExecutiveSummary {
  operationalStatus: string;
  keyRiskArea: string;
  recommendedFocus: string;
  automationReadinessAssessment: string;
  executiveRecommendation: string;
}

export interface AIOpsSummary {
  totalPriorities: number;
  criticalPriorities: number;
  highPriorities: number;
  servicesRequiringAction: number;
  averageOperationalScore: number;
  operationalReadinessScore: number;
  topPriorityService: string;
}

export interface ActionExecutiveSummary {
  summary: string;
}

export interface ActionSummary {
  totalActions: number;
  criticalActions: number;
  pendingActions: number;
  topActionType: string;
}

export interface Alert {
  severity: string;
  message: string;
}

export interface AnomalyDetection {
  serviceName: string;
  incidentCount: number;
  averageCount: number;
  deviation: number;
  anomalyScore: number;
  anomalyLevel: string;
  reason: string;
}

export interface AnomalyExecutiveSummary {
  summary: string;
}

export interface AnomalySummary {
  totalAnomalies: number;
  topAnomalyService: string;
  highestAnomalyScore: number;
  criticalAnomalies: number;
}

export interface AutomationReadiness {
  serviceName: string;
  recommendedAction: string;
  automationRisk: string;
  executionConfidence: number;
  rollbackReady: boolean;
  approvalRequired: boolean;
  autonomousExecutionReady: boolean;
}

export interface AutomationReadinessDashboard {
  totalRecommendations: number;
  autonomousReadyCount: number;
  approvalRequiredCount: number;
  averageExecutionConfidence: number;
  overallAutomationReadinessScore: number;
  automationMaturity: string;
  platformAutomationGrade: string;
  topAutomationRisk: string;
}

export interface AutomationReadinessExecutiveSummary {
  automationMaturity: string;
  autonomousCoverage: number;
  topAutomationRisk: string;
  executiveRecommendation: string;
  platformAutomationGrade: string;
}

export interface AutomationReadinessSummary {
  totalRecommendations: number;
  autonomousReadyCount: number;
  approvalRequiredCount: number;
  rollbackReadyCount: number;
  averageExecutionConfidence: number;
  highestRiskService: string;
  overallAutomationReadinessScore: number;
}

export interface AutonomousAction {
  actionType: string;
  serviceName: string;
  triggerSource: string;
  severity: string;
  recommendedAction: string;
  status: string;
  reason: string;
}

export interface AutonomousExecutionPlan {
  serviceName: string;
  recommendedAction: string;
  executionStatus: string;
  executionStrategy: string;
  approvalRequired: boolean;
  executionConfidence: number;
  autonomousExecutionReady: boolean;
}

export interface CascadeFailure {
  sourceService: string;
  middleService: string;
  targetService: string;
}

export interface DashboardSnapshot {
  dashboard: LiveDashboard;
  healthScore: number;
  systemStatus: string;
  liveSummary: string;
  topDependency: string;
  highestDependencyRisk: string;
}

export interface DashboardSummary {
  totalIncidents: number;
  topService: string;
  topException: string;
  severity: string;
  alertsCount: number;
  scoredAlertsCount: number;
  topCorrelation: string;
  topDependency: string;
  highestDependencyRisk: string;
  totalDependencies: number;
}

export interface DependencyExecutiveSummary {
  summary: string;
}

export interface DependencyImpact {
  sourceService: string;
  impactedService: string;
  impactLevel: string;
  impactScore: number;
}

export interface DependencyImpactExecutiveSummary {
  dependencyHealth: string;
  highestRiskService: string;
  blastRadiusRisk: string;
  businessImpactLevel: string;
  executiveRecommendation: string;
}

export interface DependencyImpactSummary {
  totalDependencies: number;
  highImpactDependencies: number;
  mostCriticalService: string;
  averageImpactScore: number;
}

export interface DependencyRisk {
  sourceService: string;
  targetService: string;
  dependencyCount: number;
  riskLevel: string;
}

export interface DependencyRiskDashboard {
  totalDependencies: number;
  highImpactDependencies: number;
  mostCriticalService: string;
  highestRiskLevel: string;
  dependencyHealth: string;
  executiveRecommendation: string;
}

export interface DependencyRiskScore {
  service: string;
  impactScore: number;
  riskLevel: string;
}

export interface DependencySummary {
  totalDependencies: number;
  uniqueDependencies: number;
  topSourceService: string;
  topTargetService: string;
  topDependencyCount: number;
}

export interface ExecutiveSummary {
  summary: string;
}

export interface FailurePrediction {
  serviceName: string;
  incidentCount: number;
  alertCount: number;
  dependencyRisk: number;
  riskScore: number;
  predictedRisk: string;
  predictionReason: string;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  relationshipType: string;
  strength: number;
}

export interface KnowledgeGraphExecutiveSummary {
  graphHealth: string;
  mostInfluentialNode: string;
  criticalRelationship: string;
  relationshipRiskLevel: string;
  executiveRecommendation: string;
}

export interface KnowledgeGraphNode {
  nodeId: string;
  nodeType: string;
  nodeName: string;
  relationshipCount: number;
}

export interface KnowledgeGraphSummary {
  totalNodes: number;
  totalRelationships: number;
  mostConnectedNode: string;
  strongestRelationship: string;
  strongestRelationshipStrength: number;
  graphDensity: number;
  incidentClusters: number;
  mostCommonException: string;
  graphMaturityScore: number;
  relationshipDiversityScore: number;
  graphHealthScore: number;
}

export interface LiveDashboard {
  totalIncidents: number;
  topService: string;
  topException: string;
  severity: string;
  alertsCount: number;
  scoredAlertsCount: number;
  topCorrelation: string;
  executiveSummary: string;
  healthScore: number;
  systemStatus: string;
  topDependency: string;
  highestDependencyRisk: string;
}

export interface OperationalPriority {
  serviceName: string;
  priorityLevel: string;
  recommendedAction: string;
  businessImpact: string;
  executionUrgency: string;
  operationalScore: number;
}

export interface OrchestratorDashboard {
  executionPlans: AutonomousExecutionPlan[];
  summary: OrchestratorSummary;
  executiveSummary: OrchestratorExecutiveSummary;
}

export interface OrchestratorExecutiveSummary {
  orchestratorHealth: string;
  executionReadiness: string;
  approvalRiskLevel: string;
  confidenceAssessment: string;
  executiveRecommendation: string;
}

export interface OrchestratorSummary {
  totalExecutionPlans: number;
  readyPlans: number;
  pendingApprovalPlans: number;
  blockedPlans: number;
  simulatedExecutionPlans: number;
  averageExecutionConfidence: number;
}

export interface PredictionExecutiveSummary {
  summary: string;
}

export interface PredictionSummary {
  totalPredictions: number;
  topRiskService: string;
  highestRiskScore: number;
  criticalServices: number;
}

export interface RecommendationExecutiveSummary {
  summary: string;
}

export interface RecommendationSummary {
  totalRecommendations: number;
  topRecommendationService: string;
  criticalRecommendations: number;
  highestPriority: string;
}

export interface ReliabilityExecutiveSummary {
  summary: string;
}

export interface ReliabilitySummary {
  totalServices: number;
  mostUnreliableService: string;
  lowestReliabilityScore: number;
  sloViolations: number;
}

export interface ResilienceDashboard {
  platformResilienceScore: number;
  resilienceStatus: string;
  mostVulnerableService: string;
  strongestService: string;
  criticalServicesCount: number;
  totalRecommendations: number;
  topRecommendation: string;
}

export interface ResilienceRecommendation {
  serviceName: string;
  recommendation: string;
  priority: string;
  expectedResilienceImprovement: number;
  justification: string;
}

export interface RootCauseRecommendation {
  serviceName: string;
  exceptionName: string;
  incidentCount: number;
  riskLevel: string;
  recommendation: string;
  priority: string;
  reason: string;
}

export interface SelfHealingDashboard {
  recommendations: SelfHealingRecommendation[];
  summary: SelfHealingSummary;
  executiveSummary: SelfHealingExecutiveSummary;
}

export interface SelfHealingExecutiveSummary {
  overallAutomationReadiness: number;
  selfHealingMaturity: string;
  highestPriorityAction: string;
  automationCoverage: number;
  executiveRecommendation: string;
}

export interface SelfHealingRecommendation {
  serviceName: string;
  action: string;
  priority: string;
  triggerReason: string;
  automationEligible: boolean;
}

export interface SelfHealingSummary {
  totalRecommendations: number;
  automationEligibleCount: number;
  criticalActions: number;
  topRecommendedAction: string;
  averageAutomationReadiness: number;
}

export interface ServiceDependency {
  sourceService: string;
  targetService: string;
  dependencyCount: number;
}

export interface ServiceReliability {
  serviceName: string;
  incidentCount: number;
  reliabilityScore: number;
  availabilityPercentage: number;
  sloTarget: number;
  sloStatus: string;
  riskLevel: string;
}

export interface ServiceResilience {
  serviceName: string;
  resilienceScore: number;
  riskLevel: string;
  recommendedAction: string;
}

export interface ServiceResilienceExecutiveSummary {
  platformResilienceScore: number;
  resilienceStatus: string;
  mostVulnerableService: string;
  strongestService: string;
  topRecommendation: string;
  criticalServicesCount: number;
  executiveAssessment: string;
}

export interface ServiceResilienceSummary {
  totalServices: number;
  lowRiskServices: number;
  mediumRiskServices: number;
  highRiskServices: number;
  criticalRiskServices: number;
  mostResilientService: string;
  leastResilientService: string;
  averageResilienceScore: number;
}
