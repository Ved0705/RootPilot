import { CardContent, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { GlassCard } from '../common/GlassCard';

export function ChartCard({ title, subtitle, children, glow = '#38bdf8' }: { title: string; subtitle?: string; children: ReactNode; glow?: string }) {
  return <GlassCard glow={glow} sx={{ height: '100%' }}><CardContent sx={{ p: 2.5 }}><Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}><div><Typography variant="h6">{title}</Typography>{subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}</div><Typography variant="caption" color="primary.main" fontWeight={900}>LIVE</Typography></Stack>{children}</CardContent></GlassCard>;
}
