# ZYTRONA Web Architecture & Cross-Device Memory Rule

This persistent rule provides complete context on the ZYTRONA Web platform architecture, design system, and responsive device behaviors.

## Core Directives
1. **Design System**: Always preserve Nexcent Signature Green (`#4CAF4F`), Dark Slate (`#263238`), Light Slate (`#F5F7FA`), and dark mode equivalents (`#0B0D0F`, `#15181E`, `#F8FAFC`).
2. **Scope of Services**: ZYTRONA focuses exclusively on:
   - **Web & Enterprise SaaS Platforms** (`/service/website-development`)
   - **UI/UX & Product Design Systems** (`/service/ui-designs`)
   - **Cloud, Microservices & AI Architecture** (Showcased in architecture sections and hero slide 2)
   - *Note*: Mobile App Engineering has been intentionally removed from the website and service offerings.
3. **Hero Carousel**:
   - 2 slides: Slide 0 (Software Engineering) and Slide 1 (Cloud & System Architecture).
   - Auto-rotates every 6 seconds; pauses on hover.
   - 2 indicator dots (`HERO_SLIDES.map(...)`).
4. **Responsive Patterns**:
   - Mobile (<768px): Single column, hamburger toggle (`MobileNavHeader`/`MobileNavMenu`), illustrations <= 320px, low-performance detection via `isLowPerformanceMobile()`.
   - Tablet/Desktop (>=768px): 2-column feature cards (`md:grid-cols-2 max-w-5xl mx-auto`), side-by-side hero (`lg:grid-cols-12`), full desktop navbar with dropdowns.
5. **Assets & Illustrations**:
   - Located in `src/components/ZytronaFigmaAssets.jsx`:
     - `ZytronaLogo`
     - `ZytronaHeroIllustration` (Workstation)
     - `ZytronaEngineeringIllustration` (Collaborating engineers)
     - `ZytronaCloudArchitectureIllustration` (Server rack, API gateway, microservices)
     - `ZytronaClientLogosRow` (Live marquee)
     - `ShowcaseBadge` (Verified SLA)
6. **SEO & Static Prerendering**:
   - 7 prerendered routes: `/`, `/about`, `/privacy-policy`, `/terms-of-service`, `/service/website-development`, `/service/ui-designs`, `/404`.
   - Any access to `/service/app-development` redirects cleanly to `/service/website-development`.
