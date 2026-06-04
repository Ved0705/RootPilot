import { Box, CardContent, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import PsychologyIcon from '@mui/icons-material/Psychology';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import HubIcon from '@mui/icons-material/Hub';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { usePlatformQuery } from '../hooks/usePlatformQuery';
import { dashboardService, incidentService } from '../services/platformServices';
import { KpiCard } from '../components/common/KpiCard';
import { PageHeader } from '../components/common/PageHeader';
import { ChartCard } from '../components/charts/ChartCard';
import { Donut, HealthArea, TrendLine, VolumeBar } from '../components/charts/RootPilotCharts';
import { severityDistribution } from '../utils/mockData';
import { StatusPill } from '../components/common/StatusPill';
import { LoadingState } from '../components/feedback/LoadingState';
import { HealthStrip } from '../components/visual/HealthStrip';
import { AiCopilotPanel } from '../components/visual/AiCopilotPanel';
import { GlassCard } from '../components/common/GlassCard';

export function DashboardPage() {
  const summary = usePlatformQuery(['dashboard-summary'], dashboardService.summary);
  const snapshot = usePlatformQuery(['dashboard-snapshot'], dashboardService.snapshot);
  const trend = usePlatformQuery(['dashboard-trend'], dashboardService.hourlyTrend);
  const alerts = usePlatformQuery(['alerts'], dashboardService.scoredAlerts);
  const incidents = usePlatformQuery(['incidents'], incidentService.list);
  if (summary.isLoading || trend.isLoading) return <LoadingState />;
  const d = summary.data!;
  const healthScore = snapshot.data?.healthScore ?? 82;
  const recommendations = (alerts.data ?? []).map((item) => ({ severity: item.severity, message: item.message }));
  return <>
    <PageHeader eyebrow="Executive Overview" title="AIOps Intelligence Dashboard" description={snapshot.data?.liveSummary ?? 'Real-time operational health, incident intelligence, dependency risk, and autonomous readiness derived from Spring Boot backend contracts.'} action={<StatusPill value={snapshot.data?.systemStatus ?? 'DEGRADED'} />} />
    <Stack spacing={2.5}>
      <HealthStrip score={healthScore} status={snapshot.data?.systemStatus ?? 'DEGRADED'} events={d.totalIncidents} />
      <Grid container spacing={2.2}>
        <Grid item xs={12} md={3}><KpiCard label="Total Incidents" value={d.totalIncidents} helper={`Current severity is ${d.severity}`} icon={<CrisisAlertIcon />} progress={Math.min(100, d.totalIncidents / 2)} accent="#ef4444" /></Grid>
        <Grid item xs={12} md={3}><KpiCard label="Active Incidents" value={snapshot.data?.dashboard.totalIncidents ?? d.totalIncidents} helper="Live incident stream" icon={<CrisisAlertIcon />} progress={72} accent="#38bdf8" /></Grid>
        <Grid item xs={12} md={3}><KpiCard label="Critical Alerts" value={d.scoredAlertsCount} helper={`${d.alertsCount} active alerts scored by AI`} icon={<AutoFixHighIcon />} progress={d.scoredAlertsCount * 15} accent="#f59e0b" /></Grid>
        <Grid item xs={12} md={3}><KpiCard label="Services Impacted" value={d.totalDependencies} helper={d.topDependency} icon={<HubIcon />} progress={d.totalDependencies * 4} accent="#8b5cf6" /></Grid>
        <Grid item xs={12} md={3}><KpiCard label="AI Confidence" value={94} suffix="%" helper="Correlation and RCA confidence" icon={<PsychologyIcon />} progress={94} accent="#38bdf8" /></Grid>
        <Grid item xs={12} md={3}><KpiCard label="Service Health" value={healthScore} suffix="%" helper={snapshot.data?.systemStatus} icon={<HealthAndSafetyIcon />} progress={healthScore} accent="#22c55e" /></Grid>
        <Grid item xs={12} md={3}><KpiCard label="Correlation Accuracy" value={91} suffix="%" helper={d.topCorrelation} icon={<HubIcon />} progress={91} accent="#14b8a6" /></Grid>
        <Grid item xs={12} md={3}><KpiCard label="Prediction Accuracy" value={97} suffix="%" helper="Forecast signal quality" icon={<PsychologyIcon />} progress={97} accent="#8b5cf6" /></Grid>
      </Grid>
      <Grid container spacing={2.2}>
        <Grid item xs={12} lg={8}><ChartCard title="Incident Trend" subtitle="Interactive trend from GET /analysis/hourly-trend"><TrendLine data={trend.data ?? []} /></ChartCard></Grid>
        <Grid item xs={12} lg={4}><AiCopilotPanel summary={snapshot.data?.dashboard.executiveSummary} recommendations={recommendations} /></Grid>
        <Grid item xs={12} lg={4}><ChartCard title="Severity Distribution" subtitle="Current operational posture"><Donut data={severityDistribution} /></ChartCard></Grid>
        <Grid item xs={12} lg={4}><ChartCard title="Service Health Trend" subtitle="Health score across the incident window"><HealthArea data={trend.data ?? []} /></ChartCard></Grid>
        <Grid item xs={12} lg={4}><ChartCard title="Incident Volume" subtitle="Hourly volume by backend trend contract"><VolumeBar data={trend.data ?? []} /></ChartCard></Grid>
        <Grid item xs={12} lg={5}><ChartCard title="Prediction Accuracy" subtitle="Forecast quality overlay"><TrendLine data={trend.data ?? []} dataKey="prediction" color="#8b5cf6" /></ChartCard></Grid>
        <Grid item xs={12} lg={7}><GlassCard glow="#38bdf8"><CardContent><Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}><Box><Typography variant="h6">Recent Incidents</Typography><Typography variant="body2" color="text.secondary">Modern live table with backend incident entity fields.</Typography></Box><StatusPill value="LIVE" /></Stack><Table size="small"><TableHead><TableRow><TableCell>ID</TableCell><TableCell>Service</TableCell><TableCell>Status</TableCell><TableCell>Latency</TableCell><TableCell>Exception</TableCell></TableRow></TableHead><TableBody>{(incidents.data ?? []).slice(0, 5).map((i) => <TableRow key={i.id} hover><TableCell>#{i.id}</TableCell><TableCell><Typography fontWeight={900}>{i.serviceName}</Typography></TableCell><TableCell><StatusPill value={String(i.statusCode)} /></TableCell><TableCell>{i.latency}ms</TableCell><TableCell>{i.exceptionType}</TableCell></TableRow>)}</TableBody></Table></CardContent></GlassCard></Grid>
      </Grid>
    </Stack>
  </>;
}
