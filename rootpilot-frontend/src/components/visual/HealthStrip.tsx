import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { StatusPill } from '../common/StatusPill';

export function HealthStrip({ score, status, latency = '42ms', events = 128 }: { score: number; status: string; latency?: string; events?: number }) {
  const nodes = ['API', 'ML', 'Graph', 'Redis', 'Queue', 'DB'];
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} gap={2} alignItems={{ md: 'center' }} sx={{ p: 2, borderRadius: 4, bgcolor: 'rgba(15,23,42,.54)', border: '1px solid rgba(148,163,184,.14)' }}>
      <Stack direction="row" alignItems="center" gap={1.2} sx={{ minWidth: 220 }}>
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.8, repeat: Infinity }}><Box sx={{ width: 13, height: 13, borderRadius: '50%', bgcolor: score > 85 ? 'success.main' : score > 70 ? 'warning.main' : 'error.main', boxShadow: '0 0 24px currentColor' }} /></motion.div>
        <Typography fontWeight={900}>Real-time System Health</Typography>
        <StatusPill value={status} />
      </Stack>
      <Box sx={{ flex: 1 }}><LinearProgress variant="determinate" value={score} sx={{ height: 10, borderRadius: 999, bgcolor: 'rgba(148,163,184,.15)', '& .MuiLinearProgress-bar': { borderRadius: 999, background: 'linear-gradient(90deg,#22c55e,#38bdf8,#8b5cf6)' } }} /></Box>
      <Stack direction="row" gap={1} flexWrap="wrap">{nodes.map((node, index) => <Box key={node} sx={{ px: 1.2, py: .65, borderRadius: 999, bgcolor: index < 4 ? 'rgba(34,197,94,.12)' : 'rgba(245,158,11,.12)', color: index < 4 ? '#86efac' : '#fcd34d', fontWeight: 900, fontSize: 12 }}>{node}</Box>)}</Stack>
      <Typography color="text.secondary" whiteSpace="nowrap">p95 {latency} · {events} events/min</Typography>
    </Stack>
  );
}
