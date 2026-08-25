<div align="center">

# ZYTRONA

### Innovating Tomorrow's Technology Today

[![Vite](https://img.shields.io/badge/Vite-8.0.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#)

---

**ZYTRONA** is a modern technology solutions company website built with React and Vite. We deliver cutting-edge web development, app development, video editing, and UI design services that empower businesses to thrive in the digital age.

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

- **Responsive Design** — Fully optimized for desktop, tablet, and mobile devices
- **Performance Optimized** — Intersection Observer-based lazy loading, throttled scroll events, and low-perf mode for constrained devices
- **Smooth Animations** — Motion-powered transitions and Framer Motion-inspired effects
- **3D Visualizations** — Three.js-powered interactive tech globe component
- **Custom Cursor Effects** — Animated cursor with click spark effects
- **Email Integration** — EmailJS-powered contact form with auto-reply functionality
- **Multi-Page Routing** — React Router v7 with hash-based navigation
- **Carousel Components** — Embla Carousel for smooth, accessible carousels
- **Icon System** — React Icons and Lucide React icon libraries
- **SEO Friendly** — Semantic HTML structure with proper meta tags
- **Accessibility** — ARIA-compliant interactive components

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Routing** | React Router DOM 7 |
| **Styling** | Custom CSS |
| **Animation** | Motion (Framer Motion) |
| **3D Graphics** | Three.js |
| **Carousel** | Embla Carousel |
| **Email** | EmailJS |
| **Icons** | React Icons, Lucide React |
| **Linting** | ESLint 9 |
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

Create a `.env` file in the root directory and add the following:

```env
# EmailJS Configuration
VITE_EMAILJS_TEMPLATE_ID_OWNER=your_owner_template_id
VITE_EMAILJS_TEMPLATE_ID_REPLY=your_reply_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Note:** The EmailJS Service ID and Business Email are pre-configured in the application. You only need to provide the template IDs and public key from your EmailJS account.

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

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

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run deploy:vercel` | Deploy to Vercel (production) |
| `npm run deploy:preview` | Build and preview locally |

---

## Project Structure

```
ZYTRONA_WEB/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images and media files
│   ├── components/
│   │   └── ui/               # Reusable UI components
│   │       ├── AnimatedCursor.jsx
│   │       ├── ClickSpark.jsx
│   │       ├── MotionCarousel.jsx
│   │       ├── TechGlobe.jsx
│   │       ├── ripple-button.jsx
│   │       └── button-variants.js
│   ├── lib/                  # Utility functions
│   ├── pages/                # Page components
│   │   ├── AboutPage.jsx
│   │   ├── FaqPage.jsx
│   │   ├── PortfolioPage.jsx
│   │   ├── ServiceDetail.jsx
│   │   └── ServicesPage.jsx
│   ├── App.jsx               # Main application
│   ├── App.css               # Global styles
│   ├── index.css             # Base styles
│   ├── RootApp.jsx           # Root component
│   └── main.jsx              # Entry point
├── .env                      # Environment variables
├── .gitignore
├── .nvmrc                    # Node version manager config
├── .vercelignore             # Vercel deployment ignore
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── jsconfig.json             # JavaScript config
├── package.json
├── vercel.json               # Vercel deployment config
└── vite.config.js            # Vite configuration
```

---

## Services

| Service | Description |
|---------|-------------|
| **Website Development** | Build stunning, responsive websites that captivate your audience and drive business growth |
| **App Development** | Create powerful mobile applications for iOS and Android that deliver exceptional user experiences |
| **Video Editing** | Professional video editing services to bring your visual content to life with stunning effects |
| **UI Designs** | Craft beautiful and intuitive user interfaces that enhance user engagement and satisfaction |

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
