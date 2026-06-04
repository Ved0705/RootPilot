import { Box, Chip, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', lg: 'center' }} gap={2.5} sx={{ mb: 3.5 }}>
        <Box>
          <Chip label={eyebrow} color="primary" variant="outlined" sx={{ mb: 1.4, fontWeight: 900, letterSpacing: '.08em', bgcolor: 'rgba(56,189,248,.08)' }} />
          <Typography variant="h3" sx={{ fontWeight: 950, letterSpacing: '-.06em', background: 'linear-gradient(90deg,#f8fbff,#a5d8ff 48%,#c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{title}</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 920, mt: 1, fontSize: 16 }}>{description}</Typography>
        </Box>
        {action}
      </Stack>
    </motion.div>
  );
}
