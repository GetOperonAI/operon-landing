# Operon Landing Page — Implementation Plan

## Overview
A high-converting, YC-quality landing page for Operon — the AI operating system for school management. Single-page design with clean, modern aesthetics per DESIGN.md (Miro-inspired design system).

## Tech Stack
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Fonts**: Roobert PRO Medium (display), Noto Sans (body) — per DESIGN.md
- **Hosting**: Firebase Hosting (firebase-debug.log already in repo)
- **Animations**: Framer Motion for scroll-triggered reveals

## Page Structure & Sections

### 1. Navigation Bar (sticky)
- Operon logo (left)
- Nav links: Product, Use Cases, Team, Contact
- CTA button: "Request a Demo" (Blue 450 `#5b76fe`)
- Mobile: hamburger menu

### 2. Hero Section
- Headline: "The AI Operating System for Universities"
- Subheadline: value prop paragraph
- Two CTAs: "Request a Demo" (primary blue) + "See How It Works" (outlined)
- Social proof line below CTAs
- Hero visual: abstract illustration or product screenshot mockup
- Background: white with subtle pastel accent

### 3. Problem Section
- Heading: "Universities Don't Fail Because They Lack Tools..."
- 4 pain point cards with icons on pastel backgrounds
- Layout: 2x2 grid on desktop, stacked on mobile

### 4. Solution Section
- Heading: "Replace 30-50% of Manual Work"
- 4 capability cards with icons
- Pastel teal or coral accents
- Optional: simple animation showing data flowing through system

### 5. How It Works
- 4-step horizontal flow: Connect > Structure > Automate > Expand
- Numbered steps with icons
- Clean connector lines between steps
- Stacked vertically on mobile

### 6. Use Cases
- Heading: "Proven Workflows Deployed at a Top Global Business School"
- 3-4 use case cards with pastel backgrounds
- Each card: icon, title, short description
- Expandable or tab-based on mobile

### 7. Metrics / Traction
- Large stat numbers with labels
- Layout: horizontal row of 4 stats
- Bold Roobert PRO numbers, Noto Sans labels

### 8. Land-and-Expand
- Visual showing one workflow expanding to many
- Short paragraph + supporting graphic
- Pastel background section for visual break

### 9. Team Section
- 3 founder cards: photo placeholder, name, role, location, one-liner
- Team story paragraph below
- Clean card layout with subtle shadows

### 10. Differentiators
- "What We Understand That Others Don't"
- 4 points in a clean list or card layout
- Icon + bold title + description per point

### 11. CTA Section
- Full-width pastel or dark section
- Heading + subheading
- Large "Request a Demo" button
- Optional: email input for quick contact

### 12. Footer
- Operon logo + tagline
- Links: Privacy, Terms
- Location: San Francisco Bay Area
- Copyright

## Design Tokens (from DESIGN.md)

| Token | Value |
|-------|-------|
| Primary text | `#1c1c1e` |
| Background | `#ffffff` |
| Interactive blue | `#5b76fe` |
| Border | `#c7cad5` |
| Ring shadow | `rgb(224,226,232) 0px 0px 0px 1px` |
| Button radius | `8px` |
| Card radius | `12-24px` |
| Panel radius | `20-24px` |

## Implementation Phases

### Phase 1: Project Setup
- [ ] Initialize Vite + React + TypeScript
- [ ] Install Tailwind CSS
- [ ] Configure fonts (Roobert PRO, Noto Sans)
- [ ] Set up Tailwind config with design tokens from DESIGN.md
- [ ] Firebase hosting config

### Phase 2: Core Layout & Components
- [ ] Navbar component (responsive)
- [ ] Hero section
- [ ] Section container component (consistent spacing/max-width)
- [ ] Button components (primary, outlined)
- [ ] Card component (reusable for pain points, use cases, team)

### Phase 3: Content Sections
- [ ] Problem section
- [ ] Solution section
- [ ] How It Works section
- [ ] Use Cases section
- [ ] Metrics section

### Phase 4: Team & CTA
- [ ] Team section with founder cards
- [ ] Differentiators section
- [ ] CTA section
- [ ] Footer

### Phase 5: Polish
- [ ] Framer Motion scroll animations
- [ ] Responsive testing across breakpoints
- [ ] SEO meta tags + Open Graph
- [ ] Performance optimization (lazy loading, image optimization)
- [ ] Form integration for "Request a Demo" (Firebase or simple mailto)

### Phase 6: Deploy
- [ ] Firebase hosting deploy
- [ ] Custom domain setup
- [ ] Analytics (optional: Google Analytics or Plausible)

## Key Design Principles
1. **White canvas** — generous whitespace, clean and confident
2. **Pastel accents** — use sparingly to differentiate sections (max 2 per section)
3. **Typography-driven** — let Roobert PRO headlines do the heavy lifting
4. **Minimal shadows** — ring shadows only, no heavy drop shadows
5. **Mobile-first** — responsive across all breakpoints in DESIGN.md
6. **Speed** — fast load times, no unnecessary dependencies

## Reference Sites (YC-quality landing pages)
- Miro (design system inspiration)
- Linear
- Vercel
- Notion
- Retool
