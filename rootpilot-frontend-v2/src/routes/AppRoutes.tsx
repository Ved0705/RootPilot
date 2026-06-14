import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { LoadingState } from '../components/feedback/LoadingState';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from '../pages/LoginPage';

// Lazy-loaded pages for performance
const DashboardPage          = lazy(() => import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const ExecutiveOverviewPage  = lazy(() => import('../pages/ExecutiveOverviewPage').then((m) => ({ default: m.ExecutiveOverviewPage })));
const IncidentsPage          = lazy(() => import('../pages/IncidentsPage').then((m) => ({ default: m.IncidentsPage })));
const CorrelationPage        = lazy(() => import('../pages/CorrelationPage').then((m) => ({ default: m.CorrelationPage })));
const RootCausePage          = lazy(() => import('../pages/RootCausePage').then((m) => ({ default: m.RootCausePage })));
const PredictivePage         = lazy(() => import('../pages/PredictivePage').then((m) => ({ default: m.PredictivePage })));
const KnowledgeGraphPage     = lazy(() => import('../pages/KnowledgeGraphPage').then((m) => ({ default: m.KnowledgeGraphPage })));
const DependencyPage         = lazy(() => import('../pages/DependencyPage').then((m) => ({ default: m.DependencyPage })));
const ServiceHealthPage      = lazy(() => import('../pages/ServiceHealthPage').then((m) => ({ default: m.ServiceHealthPage })));
const BusinessImpactPage     = lazy(() => import('../pages/BusinessImpactPage').then((m) => ({ default: m.BusinessImpactPage })));
const AutonomousPage         = lazy(() => import('../pages/AutonomousPage').then((m) => ({ default: m.AutonomousPage })));
const CommandCenterPage      = lazy(() => import('../pages/CommandCenterPage').then((m) => ({ default: m.CommandCenterPage })));
const SettingsPage           = lazy(() => import('../pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const WarRoomPage            = lazy(() => import('../pages/WarRoomPage').then((m) => ({ default: m.WarRoomPage })));
const InfrastructurePage     = lazy(() => import('../pages/InfrastructurePage').then((m) => ({ default: m.InfrastructurePage })));
// New pages
const IncidentReplayPage     = lazy(() => import('../pages/IncidentReplayPage').then((m) => ({ default: m.IncidentReplayPage })));
const ServiceIntelligencePage = lazy(() => import('../pages/ServiceIntelligencePage').then((m) => ({ default: m.ServiceIntelligencePage })));
const ServiceProfilePage     = lazy(() => import('../pages/ServiceProfilePage').then((m) => ({ default: m.ServiceProfilePage })));

function PageShell({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingState cards={4} />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      // V2: Command Center is the primary landing page (flagship feature)
      { index: true,                              element: <PageShell><CommandCenterPage /></PageShell> },

      // Incident Management Section
      { path: 'incidents',                        element: <PageShell><IncidentsPage /></PageShell> },
      { path: 'incidents/:id/replay',             element: <PageShell><IncidentReplayPage /></PageShell> },
      { path: 'war-room',                         element: <PageShell><WarRoomPage /></PageShell> },

      // Root Cause Analysis Section
      { path: 'rca/correlations',                 element: <PageShell><CorrelationPage /></PageShell> },
      { path: 'rca/root-cause',                   element: <PageShell><RootCausePage /></PageShell> },
      { path: 'rca/predictive',                   element: <PageShell><PredictivePage /></PageShell> },

      // Service Intelligence Section
      { path: 'service-intelligence',             element: <PageShell><ServiceIntelligencePage /></PageShell> },
      { path: 'service-intelligence/:serviceName',element: <PageShell><ServiceProfilePage /></PageShell> },
      { path: 'service-health',                   element: <PageShell><ServiceHealthPage /></PageShell> },

      // Infrastructure Section
      { path: 'infrastructure',                   element: <PageShell><InfrastructurePage /></PageShell> },
      { path: 'dependencies',                     element: <PageShell><DependencyPage /></PageShell> },
      { path: 'business-impact',                  element: <PageShell><BusinessImpactPage /></PageShell> },

      // Automation & Insights Section
      { path: 'automation/actions',               element: <PageShell><AutonomousPage /></PageShell> },
      { path: 'automation/knowledge-graph',       element: <PageShell><KnowledgeGraphPage /></PageShell> },

      // Legacy pages (kept for compatibility)
      { path: 'dashboard',                        element: <PageShell><DashboardPage /></PageShell> },
      { path: 'executive',                        element: <PageShell><ExecutiveOverviewPage /></PageShell> },

      // Settings
      { path: 'settings',                         element: <PageShell><SettingsPage /></PageShell> },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
