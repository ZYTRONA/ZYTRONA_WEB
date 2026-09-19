<div align="center">

# ZYTRONA

### Innovating Tomorrow's Technology Today

[![Vite](https://img.shields.io/badge/Vite-8.0.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#)

---

**ZYTRONA** is a modern technology solutions company website built with React and Vite. We deliver cutting-edge web development, mobile app engineering, and UI/UX design systems that empower businesses to thrive in the digital age.

[Website](#) • [Services](#services) • [Projects](#projects) • [Contact](#contact)

</div>

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Development](#development)
  - [Build](#build)
  - [Preview](#preview)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Services](#services)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Responsive Design** — Fully optimized for ultra-wide, desktop, tablet, and mobile devices
- **Performance Optimized** — Throttled scroll listeners, hardware concurrency detection, and low-perf fallback mode for constrained devices
- **Smooth Micro-Animations** — Motion-powered transitions, spring physics, and frosted glassmorphism
- **Dynamic Consultation Scheduler** — Interactive date & time range picker with animated analog SVG clock dial
- **Executive Social Proof** — Verified client testimonials and enterprise ratings from delivered commercial platforms
- **Flexible Engagement Models** — Fixed-Milestone Sprints, Dedicated Engineering Pods, and Full-Stack Retainers
- **EmailJS Integration** — Full consultation form pipeline with client auto-reply and honeypot spam protection
- **Multi-Route System** — React Router v7 supporting hash scrolling, direct section navigation, dynamic `/service/:serviceId` pages, and custom 404 handler
- **Comprehensive Service Architecture** — In-depth technical specifications, deliverables, and SLAs across 3 core domains
- **SEO & Social Optimization** — Complete sitemap.xml, semantic HTML5, and OpenGraph/Twitter social share preview card
- **Core Engineering Leadership** — Direct senior architect collaboration model with zero agency middlemen

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Routing** | React Router DOM 7 |
| **Styling** | Vanilla CSS Tokens & Tailwind CSS 4 |
| **Animation** | Motion (Framer Motion engine) |
| **Email** | EmailJS Browser SDK |
| **Icons** | Lucide React & React Icons |
| **Primitives** | Radix UI (Select, Accordion, Popover) |
| **Date & Time** | React Day Picker & Date-fns |
| **Deployment** | Vercel |

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 24.x or higher
- **npm** (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/ZYTRONA/ZYTRONA_WEB.git

# Navigate to the project directory
cd ZYTRONA_WEB

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_TEMPLATE_ID_OWNER=your_owner_template_id
VITE_EMAILJS_TEMPLATE_ID_REPLY=your_reply_template_id
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or `http://localhost:5173`).

### Build

```bash
npm run build
```

The optimized production build will be output to the `dist/` directory.

### Preview

```bash
npm run preview
```

Preview the production build locally at `http://localhost:4173`.

---

## Project Structure

```
ZYTRONA_WEB/
├── public/                    # Static assets
│   ├── Logo.png               # Primary brand logo
│   ├── og-image.png           # OpenGraph social share card
│   ├── robots.txt             # Search crawler directives
│   └── sitemap.xml            # Full XML sitemap
├── src/
│   ├── assets/                # Logos & vector media
│   ├── components/
│   │   ├── ui/                # Core reusable UI components
│   │   │   ├── resizable-navbar.jsx # Floating sticky navbar
│   │   │   ├── Footer.jsx           # 4-column modern footer
│   │   │   ├── BackgroundGrid.jsx   # Ambient grid & gradient orbs
│   │   │   ├── SpotlightCard.jsx    # Card wrapper with hover elevation
│   │   │   ├── typewriter-effect.jsx # Animated typewriter headline
│   │   │   ├── accordion.jsx        # FAQ accordion
│   │   │   ├── select.jsx           # Custom select dropdown
│   │   │   ├── calendar.jsx         # Calendar primitive
│   │   │   ├── button.jsx           # Button component
│   │   │   └── number-ticker.jsx    # Animated metrics counter
│   │   ├── shadcn-space/
│   │   │   └── calendar/            # Time slot & clock dial component
│   │   └── animate-ui/              # Avatar cluster component
│   ├── lib/                   # Utility helpers (cn)
│   ├── pages/                 # Route page components
│   │   ├── About.jsx          # Company story, pillars, leadership team
│   │   ├── ServiceDetail.jsx  # Dynamic service specifications & deliverables
│   │   ├── PrivacyPolicy.jsx  # Legal privacy compliance
│   │   ├── TermsOfService.jsx # Legal client engagement terms
│   │   └── NotFound.jsx       # 404 Error page
│   ├── App.jsx                # Main landing platform
│   ├── App.css                # Global & component stylesheet
│   ├── index.css              # Design tokens & base variables
│   ├── RootApp.jsx            # Top-level routing & performance adaptations
│   └── main.jsx               # Application entry point
├── .env.example               # Environment variables template
├── package.json
├── vercel.json                # Vercel deployment configuration
└── vite.config.js             # Vite configuration & path aliases
```

---

## Core Services

| Service | Key Capabilities |
|---------|------------------|
| **Web Development & SaaS Platforms** | React 19, Next.js, sub-second Core Web Vitals, microservices & multi-tenancy |
| **Mobile App Engineering** | Fluid 60fps native iOS & Android, React Native, Flutter, offline-first data sync |
| **UI/UX & Product Design Systems** | Tokenized Figma systems, interactive prototyping, conversion-driven user journeys |

---

## Deployment

This project is configured for deployment on **Vercel**.

### Deploy to Vercel

```bash
npm run deploy:vercel
```

Or push to the connected GitHub repository for automatic deployments.

### Vercel Configuration

The `vercel.json` file is pre-configured with:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "framework": "vite"
}
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

**ZYTRONA**

- **Email:** zytronabusiness@gmail.com
- **Phone:** +91 8667273159
- **Location:** Tamil Nadu, India

**Social Links:**

- [LinkedIn](https://www.linkedin.com/company/zytrona)
- [GitHub](https://github.com/ZYTRONA)
- [Instagram](https://www.instagram.com/zytrona_official/)

---

<div align="center">

**Built with care by [ZYTRONA](https://github.com/ZYTRONA)**

</div>
