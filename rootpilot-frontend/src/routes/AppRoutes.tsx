import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { IncidentsPage } from '../pages/IncidentsPage';
import { AutonomousPage, BusinessImpactPage, CommandCenterPage, CorrelationPage, DependencyPage, KnowledgeGraphPage, PredictivePage, RootCausePage, ServiceHealthPage, SettingsPage } from '../pages/PlatformPages';

const router = createBrowserRouter([{ path: '/', element: <AppLayout />, children: [
  { index: true, element: <DashboardPage /> }, { path: 'incidents', element: <IncidentsPage /> }, { path: 'correlation', element: <CorrelationPage /> }, { path: 'root-cause', element: <RootCausePage /> }, { path: 'predictive', element: <PredictivePage /> }, { path: 'knowledge-graph', element: <KnowledgeGraphPage /> }, { path: 'dependencies', element: <DependencyPage /> }, { path: 'service-health', element: <ServiceHealthPage /> }, { path: 'business-impact', element: <BusinessImpactPage /> }, { path: 'autonomous', element: <AutonomousPage /> }, { path: 'command-center', element: <CommandCenterPage /> }, { path: 'settings', element: <SettingsPage /> },
] }]);
export function AppRoutes() { return <RouterProvider router={router} />; }
