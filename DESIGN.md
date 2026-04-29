# Operon Design System — Shopify Simplicity + Miro Layout

## 1. Visual Theme & Atmosphere

A clean, white-background design with Shopify's simplified component patterns (pill buttons, subtle cards, clean typography) combined with Miro's generous whitespace-driven layouts and smooth scroll animations. The design is light and professional with a single dark blue accent color.

Inter Variable handles all typography (free, variable weight). Display text uses normal weight (400) at large scale for a clean, modern presence. Accent blue (`#2a41b6`) serves as the primary interactive and brand color, used sparingly.

**Key Characteristics:**
- White background with light gray (`#f8f9fb`) alternate sections
- Inter Variable for all text — clean, precise weights
- Dark blue (`#2a41b6`) as primary accent
- Full-pill buttons (9999px radius) from Shopify
- Subtle multi-layer shadows on cards
- Miro-style generous section spacing and scroll-triggered animations
- One dark section (metrics) for contrast

## 2. Color Palette & Roles

### Primary
- **Near Black** (`#1c1c1e`): Primary text
- **White** (`#ffffff`): Primary background

### Accent
- **Accent** (`#2a41b6`): Buttons, interactive elements, use case titles, icons
- **Accent Light** (`#3b56d9`): Hover state
- **Accent Wash** (`#eef1ff`): Icon backgrounds, badge fills

### Surface
- **White** (`#ffffff`): Primary sections
- **Light Gray** (`#f8f9fb`): Alternate sections (deep-teal token)
- **Lighter Gray** (`#f1f3f6`): Tertiary surface (dark-forest token)
- **Dark** (`#0a1628`): Metrics section (forest token)

### Neutrals
- **Muted** (`#555a6a`): Secondary/body text
- **Shade-50** (`#71717A`): Tertiary text, locations
- **Card Border** (`#e2e5ea`): Card and section borders

## 3. Typography Rules

### Font Family
**All text**: Inter Variable (Google Fonts, free)
- Fallbacks: Helvetica, Arial, sans-serif

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Display Hero | 72px (mobile 40px) | 400 | 1.05 | -0.5px |
| Section Heading | 44px (mobile 32px) | 400 | 1.1 | -0.3px |
| Card Title | 20px | 500 | 1.3 | 0.1px |
| Body Large | 20px | 400 | 1.5 | 0.3px |
| Body | 16px | 400 | 1.56 | — |
| Button | 16px | 500 | 1.5 | 0.16px |
| Nav Link | 15px | 500 | 1.25 | 0.2px |
| Caption | 14px | 500 | 1.5 | 0.14px |
| Label | 13px | 500 | 1.5 | 0.5px |

## 4. Component Stylings

### Buttons
**Primary (Blue Pill)**
- Background: `#2a41b6`, Text: White
- Border radius: 9999px (full pill)
- Padding: 12px 28px / 16px 32px
- Hover: `#3b56d9`

**Secondary (Ghost Pill)**
- Background: transparent, Text: `#1c1c1e`
- Border: 1px solid `#e2e5ea`
- Border radius: 9999px
- Hover: border darkens to `#555a6a`

### Cards
- Background: White or `#f8f9fb`
- Border: 1px solid `#e2e5ea`
- Border radius: 12px
- Shadow: `0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)`

### Icon Containers
- Background: `#eef1ff` (accent wash)
- Border radius: 8px
- Size: 40x40px

## 5. Layout Principles (Miro-inspired)

### Spacing
- Section padding: py-24 (96px) to py-32 (128px)
- Container max-width: 1200px (nav), 1100px (content)
- Horizontal padding: 24px mobile, 24px+ desktop
- Grid gap: 20px cards, 24-32px steps

### Section Rhythm
- Alternate between White and Light Gray (`#f8f9fb`) backgrounds
- One dark section (Metrics) for visual break
- Center-aligned headings with max-width constraints
- Scroll-triggered Framer Motion animations

### Border Radius Scale
| Value | Context |
|-------|---------|
| 8px | Icon containers, inputs |
| 12px | Cards |
| 9999px | Buttons, badges |

## 6. Do's and Don'ts

### Do
- Use pill-shaped buttons for all CTAs
- Keep section spacing generous (96px+)
- Use accent blue sparingly — buttons, icons, use case titles
- Alternate white/gray section backgrounds
- Use subtle, multi-layer card shadows

### Don't
- Don't use heavy shadows or elevation
- Don't use more than one accent color
- Don't use font weights above 500 for display text
- Don't reduce section spacing below 96px
- Don't put accent color on large background areas

## 7. Quick Reference

- Page bg: `#ffffff`
- Alt section bg: `#f8f9fb`
- Dark section bg: `#0a1628`
- Accent: `#2a41b6`
- Accent hover: `#3b56d9`
- Accent wash: `#eef1ff`
- Text primary: `#1c1c1e`
- Text secondary: `#555a6a`
- Text tertiary: `#71717A`
- Card border: `#e2e5ea`
- Button radius: 9999px
- Card radius: 12px
- Font: Inter Variable (Google Fonts)
