# Operon Landing Page

## Project Overview

Landing page for **Operon** — AI Operating System for School Management. Single-page React app with Shopify's clean component patterns (pill buttons, subtle cards) and Miro's generous layout rhythm.

## Tech Stack

- **Framework**: React + TypeScript (Vite)
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin)
- **Animations**: Framer Motion (scroll-triggered with `useInView`)
- **Font**: Inter Variable (Google Fonts, free) — all text
- **Hosting**: Firebase Hosting

## Project Structure

```
src/
  components/     # One component per landing page section
    Navbar.tsx    # Sticky nav, glass bg, blue pill CTA
    Hero.tsx      # 72px headline, pill buttons
    Problem.tsx   # 4 pain point cards
    Solution.tsx  # 4 capability cards
    HowItWorks.tsx # 4-step numbered flow
    UseCases.tsx  # 4 workflow cards
    Metrics.tsx   # Dark section with stat numbers
    Differentiators.tsx # 4 check-mark points
    Team.tsx      # 2 founder cards
    CTA.tsx       # Final call-to-action
    Footer.tsx    # Minimal footer
  App.tsx         # Assembles all sections
  index.css       # Tailwind imports, design tokens (@theme)
  main.tsx        # React entry point
public/
  favicon.svg
```

## Design System

All tokens in `src/index.css` under `@theme`, documented in `DESIGN.md`:

- **Accent**: Dark blue `#2a41b6` (buttons, icons, highlights)
- **Text**: Near Black `#1c1c1e`, Muted `#555a6a`, Shade-50 `#71717A`
- **Surfaces**: White primary, `#f8f9fb` alternate sections, `#0a1628` dark metrics
- **Cards**: White/light bg, `#e2e5ea` border, subtle multi-layer shadow
- **Buttons**: Full pill (9999px radius)
- **Font**: Inter Variable, weight 400 display, 500 UI

## Key Commands

- `bun run dev` — Start dev server
- `bun run build` — TypeScript check + production build
- `bun run preview` — Preview production build locally

## Content & Planning Docs

- `CONTENT.md` — All landing page copy organized by section
- `PLAN.md` — Implementation plan, phases, section breakdown
- `DESIGN.md` — Shopify simplicity + Miro layout design system

## Conventions

- Each page section is its own component in `src/components/`
- Scroll animations use Framer Motion `useInView` with `once: true`
- Color tokens: `text-accent`, `bg-deep-teal`, `border-card-border`, etc.
- White background, light gray alternate sections
- One dark section (Metrics) for visual contrast
- Theatrical spacing between sections (py-24 md:py-32)
- Pill-shaped buttons for all CTAs

## Company Context

Operon is an AI operating system for universities. Connects to a school's internal data and systems, automates 30-50% of manual admin work. Has 1 paying enterprise customer, $30K+ revenue, 3+ workflows deployed. Founded by Burak Barlas and Tanalp Sengun.
