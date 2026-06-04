import { Box, Card, type CardProps } from '@mui/material';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function GlassCard({ children, glow = '#38bdf8', interactive = false, sx, ...props }: CardProps & { children: ReactNode; glow?: string; interactive?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} whileHover={interactive ? { y: -5, scale: 1.01 } : undefined} transition={{ duration: 0.32, ease: 'easeOut' }} style={{ height: '100%' }}>
      <Card
        sx={{ position: 'relative', overflow: 'hidden', height: '100%', '&:before': { content: '""', position: 'absolute', inset: 0, borderRadius: 'inherit', padding: '1px', background: `linear-gradient(135deg, ${glow}80, rgba(255,255,255,.08), rgba(139,92,246,.34))`, WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }, '&:after': { content: '""', position: 'absolute', width: 220, height: 220, right: -90, top: -110, background: `radial-gradient(circle, ${glow}22, transparent 68%)`, pointerEvents: 'none' }, ...sx }}
        {...props}
      >
        <Box sx={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</Box>
      </Card>
    </motion.div>
  );
}
