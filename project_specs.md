# Project Specs — Settly Canada Marketing Website

## What it does & who uses it
A public marketing homepage for Settly Canada — a service that helps newcomers navigate their first 90 days in Canada (housing, banking, SIN, phone plan, mobility). The page is for anyone planning to move to or who recently moved to Canada.

## Tech stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Global CSS with Settly Design System tokens
- **Animations:** GSAP 3 (GreenSock) + ScrollTrigger plugin
- **Font:** Plus Jakarta Sans via next/font/google
- **Icons:** lucide-react
- **Hosting:** Vercel (via `next build`)

## Pages & user flows
- **/** — Single marketing page (public, no auth)
  - Sticky nav → Hero → Services → How it works → Stats → CTA → Footer

## Data models
- None — purely static/presentational

## Third-party services
- Unsplash (hero photo, open URL)
- randomuser.me (avatar photos, open URL)
- Google Fonts (Plus Jakarta Sans, via next/font)
- GSAP CDN not used — installed as npm package

## File structure
```
src/
  app/
    layout.tsx      — root layout, font, metadata
    page.tsx        — assembles all sections
    globals.css     — full design token system
  components/
    Nav.tsx         — sticky nav, GSAP slide-down on mount
    Hero.tsx        — hero section, GSAP text reveal + parallax + floating card
    Services.tsx    — 3×2 service card grid, GSAP stagger on scroll
    Steps.tsx       — 3-step band, GSAP stagger + icon bounce
    Stats.tsx       — stat numbers, GSAP count-up on scroll
    CTA.tsx         — dark CTA band, GSAP fade-up
    Footer.tsx      — dark footer, GSAP fade-in
public/
  settly-logo.svg
  settly-logo-white.svg
  settly-mark.svg
```

## What "done" looks like
- `npm run dev` starts without errors
- All 7 sections render correctly at 1280px
- GSAP animations fire: nav slides in, hero text reveals, services stagger, stats count up
- Responsive at 768px (tablet breakpoint)
- Canada-specific copy throughout (SIN not SSN, Canadian cities, CAD)
