import { Box, Divider, IconButton, InputBase, Stack, Tooltip, Typography, Avatar, Badge } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import HubIcon from '@mui/icons-material/Hub';
import PsychologyIcon from '@mui/icons-material/Psychology';
import InsightsIcon from '@mui/icons-material/Insights';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import BoltIcon from '@mui/icons-material/Bolt';
import { motion } from 'framer-motion';
import { useUiStore } from '../store/uiStore';
import { StatusPill } from '../components/common/StatusPill';

const nav = [
  ['Dashboard', '/', DashboardIcon], ['Incidents', '/incidents', ReportProblemIcon], ['Correlation Engine', '/correlation', HubIcon], ['Root Cause Analysis', '/root-cause', PsychologyIcon], ['Predictive Analytics', '/predictive', InsightsIcon], ['Knowledge Graph', '/knowledge-graph', AccountTreeIcon], ['Dependency Analysis', '/dependencies', HubIcon], ['Service Health', '/service-health', HealthAndSafetyIcon], ['Business Impact', '/business-impact', BusinessCenterIcon], ['Autonomous Operations', '/autonomous', AutoFixHighIcon], ['AI Ops Command Center', '/command-center', PsychologyIcon], ['Settings', '/settings', SettingsIcon],
] as const;

export function AppLayout() {
  const { sidebarCollapsed, toggleSidebar } = useUiStore();
  const width = sidebarCollapsed ? 88 : 292;
  return <Box sx={{ display: 'flex', minHeight: '100vh' }}>
    <Box component="aside" sx={{ width, transition: 'width .24s ease', position: 'fixed', inset: '0 auto 0 0', p: 2, borderRight: '1px solid rgba(148,163,184,.14)', bgcolor: 'rgba(5,7,18,.76)', backdropFilter: 'blur(24px)', zIndex: 10, '&:before': { content: '""', position: 'absolute', inset: 0, background: 'radial-gradient(circle at 0 0, rgba(56,189,248,.18), transparent 32%), radial-gradient(circle at 100% 30%, rgba(139,92,246,.12), transparent 38%)', pointerEvents: 'none' } }}>
      <Stack direction="row" alignItems="center" spacing={1.4} sx={{ mb: 2, position: 'relative' }}><motion.div animate={{ rotate: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity }}><Box sx={{ width: 44, height: 44, borderRadius: 3, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#38bdf8,#8b5cf6)', boxShadow: '0 0 36px rgba(56,189,248,.28)' }}><PsychologyIcon /></Box></motion.div>{!sidebarCollapsed && <Box><Typography variant="h6" sx={{ letterSpacing: '-.04em' }}>RootPilot</Typography><Typography variant="caption" color="text.secondary">Autonomous AIOps</Typography></Box>}<IconButton size="small" onClick={toggleSidebar} sx={{ ml: 'auto' }}><MenuOpenIcon /></IconButton></Stack>
      {!sidebarCollapsed && <Stack direction="row" alignItems="center" gap={1} sx={{ p: 1.3, mb: 2, borderRadius: 4, bgcolor: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.18)', position: 'relative' }}><BoltIcon color="success" fontSize="small" /><Typography variant="caption" fontWeight={900}>AI agent online · 94% confidence</Typography></Stack>}
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={.55} sx={{ position: 'relative' }}>{nav.map(([label, path, Icon]) => <Tooltip title={sidebarCollapsed ? label : ''} placement="right" key={path}><Box component={NavLink} to={path} sx={{ display: 'flex', alignItems: 'center', gap: 1.4, px: 1.5, py: 1.15, borderRadius: 3, color: 'text.secondary', textDecoration: 'none', fontWeight: 850, transition: 'all .18s ease', '&.active': { color: '#e0f2fe', background: 'linear-gradient(90deg, rgba(56,189,248,.16), rgba(139,92,246,.10))', boxShadow: 'inset 0 0 0 1px rgba(56,189,248,.24), 0 10px 30px rgba(56,189,248,.08)' }, '&:hover': { bgcolor: 'rgba(148,163,184,.08)', color: 'text.primary', transform: 'translateX(3px)' } }}><Icon fontSize="small" />{!sidebarCollapsed && <Typography variant="body2" fontWeight={850}>{label}</Typography>}</Box></Tooltip>)}</Stack>
    </Box>
    <Box sx={{ ml: `${width}px`, flex: 1, transition: 'margin-left .24s ease' }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ position: 'sticky', top: 0, zIndex: 8, px: { xs: 2, md: 3.5 }, py: 2, borderBottom: '1px solid rgba(148,163,184,.12)', bgcolor: 'rgba(5,7,18,.68)', backdropFilter: 'blur(20px)' }}><Box sx={{ flex: 1, maxWidth: 680, display: 'flex', alignItems: 'center', px: 2, py: 1.05, borderRadius: 4, bgcolor: 'rgba(15,23,42,.72)', border: '1px solid rgba(148,163,184,.16)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.02)' }}><SearchIcon color="primary" /><InputBase placeholder="Ask RootPilot about incidents, services, root causes..." sx={{ ml: 1, flex: 1 }} /></Box><StatusPill value="DEGRADED" /><IconButton><Badge color="error" variant="dot"><NotificationsIcon /></Badge></IconButton><Avatar sx={{ background: 'linear-gradient(135deg,#38bdf8,#8b5cf6)', fontWeight: 900 }}>RP</Avatar></Stack>
      <Box component="main" sx={{ p: { xs: 2, md: 3.5 }, maxWidth: 1720, mx: 'auto' }}><Outlet /></Box>
    </Box>
  </Box>;
}
