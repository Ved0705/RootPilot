# RootPilot v2 — Design Brief & Enterprise Standards

**Version:** 2.0  
**Date:** 2026-06-14  
**Target Users:** SRE engineers, NOC operators, Platform engineers  
**Market:** Fortune 500 enterprises  
**Competitive Benchmarks:** Datadog, Dynatrace, New Relic, Grafana, Splunk, ServiceNow

---

## Design Philosophy

RootPilot v2 is a **professional enterprise AIOps platform** that prioritizes:
1. **Clarity over aesthetics** — Information hierarchy first, pretty second
2. **Actionability over insight** — Users should know what to do immediately
3. **Performance over perfection** — Fast beats beautiful
4. **Consistency over novelty** — Predictable interactions
5. **Accessibility over flashiness** — Works for everyone

---

## Visual Design System

### Color Palette
**Base Colors:**
- **Dark Background:** #0f172a (slate-950) — Primary background
- **Card Background:** #1e293b (slate-900) — Card/section backgrounds
- **Border:** #334155 (slate-700) — Subtle dividers
- **Text Primary:** #f1f5f9 (slate-100) — Main text
- **Text Secondary:** #cbd5e1 (slate-400) — Secondary/disabled text

**Status Colors:**
- 🔴 **Critical/Error:** #dc2626 (red-600) — Status 500+, critical alerts
- 🟠 **Warning:** #d97706 (amber-600) — Status 400-499, warnings
- 🟡 **Info:** #f59e0b (amber-500) — Status 300-399, info
- 🟢 **Healthy:** #059669 (emerald-600) — Resolved, healthy status
- 🔵 **Primary Action:** #2563eb (blue-600) — Links, primary buttons

**Accent Colors:**
- **Success:** #10b981 (emerald-500)
- **Danger:** #ef4444 (red-500)
- **Warning:** #f97316 (orange-500)
- **Info:** #3b82f6 (blue-500)

### Typography
**Font Family:** Inter (system sans-serif fallback)
- Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- Line heights: 1.4-1.6 for body text, 1.2 for headings

**Scale:**
- H1: 32px (2rem) — Page titles
- H2: 24px (1.5rem) — Section headers
- H3: 20px (1.25rem) — Card titles
- Body: 14px (0.875rem) — Body text
- Small: 12px (0.75rem) — Labels, metadata

### Component Spacing
- **XS:** 2px — Borders, gaps
- **S:** 4px — Inside buttons, small gaps
- **M:** 8px — Normal padding, gaps
- **L:** 16px — Card padding, section gaps
- **XL:** 24px — Major sections
- **2XL:** 32px — Page margins

---

## Component Standards

### Cards & Containers
- **Background:** #1e293b (card background)
- **Border:** 1px solid #334155
- **Border Radius:** 8px (consistent corner rounding)
- **Shadow:** Subtle elevation shadow on hover
- **Padding:** 16px (L spacing) standard
- **Glow Effect:** Optional colored glow for emphasis (2563eb for default)

### Typography Styling
- **Headings:** 600-700 weight, tight letter spacing (-0.03em)
- **Body:** 400 weight, line-height 1.5
- **Labels:** 500 weight, 12px size, text-secondary color
- **Links:** Blue (#2563eb), underline on hover, no underline by default

### Interactive Elements
- **Buttons:**
  - Primary: Blue background, white text, 8px radius
  - Secondary: Transparent with border, 8px radius
  - Disabled: 50% opacity
  - Hover: 10% lighten background
  - Active: 20% lighten background

- **Inputs:**
  - Background: #0f172a (dark background)
  - Border: 1px solid #334155
  - Focus: Blue outline (2px, blue-600)
  - Placeholder: Text-secondary color

- **Tables:**
  - Striped rows (alternate #0f172a and #1e293b)
  - Row hover: 10% lighten
  - Header: 600 weight, text-secondary color
  - Sortable headers: Cursor pointer, underline on hover

### Status Indicators
- **Pill/Badge:** 8px height, 4px padding, 4px border-radius
- **Color-coded:** Using status colors (red/orange/green/blue)
- **Icon + Label:** Icon on left, label on right
- **Example:** `<StatusPill value="CRITICAL" />` → Red pill with white text

### Charts & Graphs
- **Color Scheme:** Use status colors (red, orange, green, blue)
- **Grid:** Subtle (#334155) grid lines
- **Axes:** Text-secondary color, 12px font
- **Legend:** Below chart, horizontal layout
- **Hover:** Tooltip with detailed info
- **Animation:** Smooth entrance animation (0.3s ease-in)

### Icons
- **Library:** Material-UI Icons (@mui/icons-material)
- **Size:** 16px (small), 20px (normal), 24px (large)
- **Color:** Match text color (inherit opacity)
- **Stroke Width:** Consistent 1.5-2px

---

## Layout Patterns

### Page Structure
```
┌─────────────────────────────────────────────┐
│ PageHeader (eyebrow, title, description)    │
├─────────────────────────────────────────────┤
│ Content Stack (2.5 spacing between sections)│
│ ├─ GlassCard with glow effect              │
│ ├─ Grid of KPI Cards                       │
│ ├─ Full-width SortableTable                │
│ └─ Bottom section / Related content        │
└─────────────────────────────────────────────┘
```

### Grid System
- **Desktop:** 12-column grid, full width
- **Tablet:** 12-column grid, narrower margins
- **Mobile:** Single column with full width

### Common Layouts
1. **Summary + Details:** 2-column (25% summary, 75% details)
2. **Sidebar + Content:** 3-column sidebar, 9-column content
3. **Hero + Cards:** Full-width hero, then 3-4 column grid
4. **Table + Detail:** Table with expandable rows or side drawer

---

## Interaction Patterns

### Hover States
- Subtle lift (2px box-shadow elevation)
- Color lighten (10% lighter background)
- Cursor changes (pointer for clickable, not-allowed for disabled)

### Focus States
- 2px blue outline (#2563eb)
- Outline offset: 2px
- Visible even without hover (important for keyboard users)

### Loading States
- Skeleton screens matching element shape
- Animated shimmer effect (lighter to darker to lighter)
- Loading spinner for operations
- Estimated load time in UI

### Error States
- Error color (#dc2626)
- Error message in red
- Retry button below error message
- Error stack in expandable section (dev only)

### Empty States
- Icon (illustrative, not decorative)
- Headline ("No incidents detected")
- Description ("When incidents occur, they'll appear here")
- Call-to-action button if applicable

---

## Dark Mode Standards

All RootPilot v2 uses dark mode by default. Color specifications above already account for this.

**Rationale:**
- Reduced eye strain during 24/7 NOC operations
- Better contrast for status indicators
- Professional appearance
- Easier on battery life for mobile

---

## Accessibility Standards

### WCAG 2.1 Level AA Compliance

**Color Contrast:**
- Text: Minimum 4.5:1 ratio (normal text)
- Large text: Minimum 3:1 ratio
- Components: Minimum 3:1 ratio for status colors

**Keyboard Navigation:**
- Tab order: Logical (left to right, top to bottom)
- Skip links: Skip to main content
- Focus visible: All interactive elements
- No keyboard traps: Can tab out of any element

**Screen Reader:**
- Semantic HTML (button, link, form, table, etc.)
- ARIA labels for icon-only buttons
- ARIA live regions for real-time updates
- Table headers marked with scope

**Mobile Accessibility:**
- Touch targets: Minimum 44px (both dimensions)
- Zoom: Support up to 200% zoom
- Text size: Adjustable (don't lock)

---

## Animation Standards

### Entrance Animations
- **Duration:** 0.2-0.3 seconds
- **Easing:** cubic-bezier(0.16, 1, 0.3, 1) (ease-out)
- **Effects:**
  - Fade in + slide up 4px
  - Skeleton → content transition (fade)

### Interaction Animations
- **Duration:** 0.15 seconds (fast)
- **Easing:** cubic-bezier(0.2, 0, 0, 1) (ease-in)
- **Effects:**
  - Button press (scale 0.98)
  - Hover lift (translate 0, -2px)

### Data Update Animations
- **Duration:** 0.5 seconds (medium)
- **Easing:** ease-in-out
- **Effects:**
  - Number counter (animate to value)
  - Chart update (animate to new data)
  - Progress bar (animate to percentage)

### Avoid
- Animations > 1 second (feels slow)
- Animations on every interaction (overwhelms)
- Bounce effects (unprofessional)
- Spinning loaders (use progress bars instead)

---

## Responsive Design

### Breakpoints
- **Mobile:** 0-768px (max-width: md)
- **Tablet:** 768-1024px (max-width: lg)
- **Desktop:** 1024px+ (lg and above)

### Mobile-First Strategy
1. Design for mobile first
2. Stack vertically (full-width cards)
3. Collapse tables to card layouts
4. Hide non-essential columns
5. Drawer for details (not modal)

### Responsive Typography
- **Headings:** Smaller on mobile (80% of desktop)
- **Body:** Consistent 14px on all sizes
- **Line Length:** Max 80 characters (optimal reading)

---

## Enterprise Features

### Real-Time Updates
- **Polling:** 30-60 second intervals for most data
- **Critical Alerts:** 5-10 second intervals
- **WebSocket Ready:** Infrastructure for <1s updates

### High-Volume Data
- **Pagination:** 25 rows per page default
- **Virtual Scrolling:** For tables > 500 rows
- **Search:** Full-text with 1-second response time
- **Filters:** Multi-select, chainable, saveable

### Customization
- **Favorites:** Star items to access quickly
- **Custom Layouts:** Rearrange cards (future)
- **Saved Filters:** Save and recall common searches
- **Export:** CSV, JSON for incident data

---

## Performance Standards

### Page Load
- **First Contentful Paint (FCP):** < 1.5 seconds
- **Largest Contentful Paint (LCP):** < 2.5 seconds
- **Time to Interactive (TTI):** < 3 seconds
- **Cumulative Layout Shift (CLS):** < 0.1

### Interaction
- **Input Response:** < 100ms (typing in search)
- **Click Response:** < 200ms (page transition)
- **Scroll:** 60 FPS (no jank)
- **Animation:** 60 FPS (smooth)

### Bundle Size
- **JavaScript:** < 150KB (gzipped)
- **CSS:** < 50KB (gzipped)
- **HTML:** < 30KB (gzipped)
- **Total:** < 230KB (gzipped)

---

## Testing Standards

### Visual Regression
- Screenshot every page at 3 viewport sizes (mobile, tablet, desktop)
- Compare against baseline on every deploy
- Flag any pixel changes

### Accessibility Testing
- Automated: axe DevTools on every page
- Manual: Keyboard-only navigation
- Screen reader: NVDA on Windows, VoiceOver on Mac
- Color contrast: Check all text (WCAG AA minimum)

### Cross-Browser Testing
- Chrome/Edge (Chromium) — Latest
- Firefox — Latest
- Safari — Latest
- Mobile browsers — Latest

---

## Design Documentation

### Component Library
All components are documented in Storybook:
- Props documentation
- Usage examples
- Accessibility notes
- Design tokens

### Color Palette Reference
```typescript
// tailwind.config.ts
colors: {
  dark: {
    bg: '#0f172a',      // Main background
    card: '#1e293b',    // Card background
    border: '#334155',  // Border color
  },
  text: {
    primary: '#f1f5f9',
    secondary: '#cbd5e1',
  },
  status: {
    critical: '#dc2626',
    warning: '#d97706',
    info: '#f59e0b',
    healthy: '#059669',
  },
}
```

---

## Brand Voice & Tone

### Terminology
- "Incident" not "error" or "failure"
- "Root cause" not "bug" or "problem"
- "Service" not "application" or "microservice"
- "Alert" not "notification" or "alarm"

### Message Examples
- **Error:** "Unable to load incidents. Check that the backend is running on localhost:8080."
- **Success:** "Incident acknowledged. Team notified."
- **Warning:** "This change will affect 12 dependent services."
- **Info:** "Analyzing 1,247 incidents for patterns..."

### Tone
- Professional but approachable
- Specific (exact numbers, names)
- Action-oriented ("What to do next")
- Avoid jargon when possible

---

## Implementation Checklist

- [ ] Color tokens defined in tailwind.config.ts
- [ ] Spacing scale consistent across all components
- [ ] All text has appropriate font-weight and line-height
- [ ] Icons are properly sized and colored
- [ ] Buttons follow interaction patterns
- [ ] Form inputs have proper focus states
- [ ] Tables support sorting and filtering
- [ ] Loading states use skeleton screens
- [ ] Error states provide actionable guidance
- [ ] Empty states are helpful (not frustrating)
- [ ] Animations are smooth and appropriate
- [ ] Dark mode is tested and working
- [ ] Mobile responsiveness verified
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Performance metrics met
- [ ] Documentation is complete

---

## Q&A

**Q: Why dark mode only?**  
A: SRE/NOC teams work 24/7. Dark mode reduces eye strain and is the enterprise standard.

**Q: Can we add light mode?**  
A: Yes, in Wave 6. v2 focuses on dark mode for consistency with Datadog, Dynatrace.

**Q: Why these specific colors?**  
A: Status colors (red/orange/green) are universally understood. Blue for primary action is accessible.

**Q: Can we customize the theme?**  
A: Yes, via Tailwind CSS variables. Enterprise customers can adjust in Wave 6+.

**Q: What about brand colors?**  
A: RootPilot brand color is blue (#2563eb). No other brand colors in the main UI.

---

## Resources

- **Tailwind CSS:** tailwindcss.com
- **Material-UI Icons:** mui.com/material-icons
- **WCAG Guidelines:** w3.org/WAI/WCAG21/quickref
- **Web Vitals:** web.dev/vitals
- **Design Tokens:** designtokens.org

---

**Design Brief Version:** 2.0  
**Last Updated:** 2026-06-14  
**Next Review:** After Wave 2 implementation  
**Approval:** ✅ Ready for implementation
