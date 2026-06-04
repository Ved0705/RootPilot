import { Avatar, Box, Button, CardContent, Divider, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { GlassCard } from '../common/GlassCard';
import { StatusPill } from '../common/StatusPill';

export function AiCopilotPanel({ title = 'RootPilot Copilot', summary, recommendations }: { title?: string; summary?: string; recommendations: { severity: string; message: string }[] }) {
  return (
    <GlassCard glow="#8b5cf6" sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" alignItems="center" gap={1.4} sx={{ mb: 1.5 }}>
          <Avatar sx={{ background: 'linear-gradient(135deg,#38bdf8,#8b5cf6)' }}><PsychologyIcon /></Avatar>
          <Box><Typography variant="h6">{title}</Typography><Typography variant="body2" color="text.secondary">AI-generated operational guidance</Typography></Box>
        </Stack>
        <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(139,92,246,.1)', border: '1px solid rgba(139,92,246,.22)', mb: 1.5 }}>
          <Typography color="text.secondary">{summary ?? 'RootPilot is correlating incident pressure, dependency risk, and readiness signals to recommend the safest next action.'}</Typography>
        </Box>
        <List disablePadding>{recommendations.slice(0, 4).map((item) => <ListItem key={item.message} disableGutters sx={{ py: 1.15 }}><ListItemAvatar><Avatar sx={{ bgcolor: 'rgba(56,189,248,.13)', color: 'primary.main' }}><AutoFixHighIcon /></Avatar></ListItemAvatar><ListItemText primary={item.message} secondary={<StatusPill value={item.severity} />} /></ListItem>)}</List>
        <Divider sx={{ my: 1.5 }} />
        <Button fullWidth variant="contained" startIcon={<AutoFixHighIcon />} sx={{ py: 1.15, background: 'linear-gradient(90deg,#38bdf8,#8b5cf6)' }}>Open remediation workspace</Button>
      </CardContent>
    </GlassCard>
  );
}
