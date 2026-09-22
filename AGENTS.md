# ZYTRONA Engineering Context & Agent Memory

Welcome to the **ZYTRONA Web Platform** repository.

This project is the official web platform for **ZYTRONA**, a senior software engineering studio specializing in high-performance web platforms, enterprise SaaS architectures, and modern UI/UX design systems.

---

## 1. Quick Reference & Core Rules

1. **Scope of Services**:
   - Web & Enterprise SaaS Platforms (`/service/website-development`)
   - UI/UX & Product Design Systems (`/service/ui-designs`)
   - Cloud, Microservices & AI Architecture
   - *Strict Rule*: Mobile App Engineering has been deprecated and removed. Any request to `/service/app-development` redirects to `/service/website-development`.

2. **Design System Tokens**:
   - **Primary Green**: `#4CAF4F` (hover: `#388E3C`, tint: `#E8F5E9` / `rgba(76, 175, 79, 0.15)`)
   - **Dark Slate Neutral**: `#263238`
   - **Light Background**: `#F5F7FA` | **Dark Background**: `#0B0D0F`
   - **Card Surface**: `#FFFFFF` | **Dark Card Surface**: `#15181E`
   - **Borders**: `#E0E0E0` / `#E5E7EB` | **Dark Borders**: `#232936`
   - **Typography**: Inter (primary), Manrope (secondary)
   - **Key Utilities**: `.btn-nexcent-primary`, `.btn-nexcent-secondary`, `.boxy-card`, `.card-lift`

3. **Routing & Prerendering**:
   - 7 Prerendered Routes: `/`, `/about`, `/privacy-policy`, `/terms-of-service`, `/service/website-development`, `/service/ui-designs`, `/404`.
   - Built with React 19, Vite 8, React Router 7, and `vite-prerender-plugin`.

4. **Performance Adaptations**:
   - Automatic low-performance hardware detection (`isLowPerformanceMobile()`) toggles `.low-perf-mobile` on `<html>` to disable heavy blur filters and switch smooth scrolling to instant navigation on constrained devices.

5. **Inquiry Pipeline**:
   - `src/lib/emailService.js` wraps EmailJS with dual-template support and an automatic fallback simulation mode for local development.

---

## 2. Master Architecture Reference

For the comprehensive, detailed architecture specification covering all components, vector illustrations, schemas, and build hooks, refer to:
- [website_architecture_memory.md](file:///c:/project/ZYTRONA_WEB/.agents/rules/website_architecture_memory.md)
