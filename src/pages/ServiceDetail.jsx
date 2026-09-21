import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import NotFound from './NotFound.jsx'
import { ZytronaLogo } from '@/components/ZytronaFigmaAssets'
import { Footer } from '@/components/ui/Footer'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { CustomSelect } from '@/components/ui/CustomSelect'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { 
  Globe, 
  Smartphone, 
  Palette, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Lock, 
  Sparkles, 
  Check, 
  ChevronDown, 
  Code2, 
  GitBranch, 
  FileCheck, 
  Server, 
  Database, 
  Cpu, 
  Activity, 
  Award, 
  Clock, 
  ChevronRight, 
  X, 
  Menu, 
  Flame,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { 
  FaReact, FaNodeJs, FaApple, FaAws, FaDocker, FaCheck, FaTimes
} from 'react-icons/fa'
import { sendEmail } from '@/lib/emailService'
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiFlutter, SiKotlin, SiFirebase, SiGraphql,
  SiFigma, SiPostgresql, SiRedis, SiKubernetes, SiMongodb, SiPython
} from 'react-icons/si'
import '@/App.css'

// Enterprise vs Agency vs Freelancers Comparison Table
const COMPARISON_DATA = [
  {
    feature: 'Dedicated Engineering Lead',
    zytrona: '100% Direct (Slack/Discord with Senior Architects)',
    agency: 'Confusing layers of junior account managers',
    freelancer: 'Single person, high single-point-of-failure risk'
  },
  {
    feature: 'IP & Source Code Ownership',
    zytrona: '100% Day-One Private Git Repository Transfer',
    agency: 'Code withheld until final payment milestone',
    freelancer: 'Fragmented or informal agreements'
  },
  {
    feature: 'Performance & Core Web Vitals',
    zytrona: '98+ Lighthouse & Sub-250ms TTFB SLA Guarantee',
    agency: 'Generic heavy CMS templates with slow response',
    freelancer: 'Rarely profiled or guaranteed'
  },
  {
    feature: 'Code Quality & Test Coverage',
    zytrona: 'Strict TypeScript, CI/CD, 90%+ Automated Tests',
    agency: 'Legacy monolithic spaghetti without test suites',
    freelancer: 'Varying subjective quality, minimal documentation'
  },
  {
    feature: 'Delivery Velocity & Sprints',
    zytrona: 'Disciplined 2-Week Sprints with Live Staging Demos',
    agency: 'Multi-month waterfall delivery with scope creep',
    freelancer: 'Frequent ghosting and deadline slippage'
  },
  {
    feature: 'Post-Launch Warranty & Support',
    zytrona: '30-Day Launch Warranty + 24/7 Monitoring Options',
    agency: 'Expensive recurring monthly lock-in retainers',
    freelancer: 'Unavailable once initial invoice is cleared'
  }
]

// 4-Phase Delivery Engineering Framework (Zero to Production)
const ENGINEERING_PROCESS = [
  {
    phase: '01',
    title: 'Architectural Discovery & Blueprint',
    duration: 'Week 1 – 2',
    desc: 'System architecture topology, database schemas, API specs, and technical feasibility validation under mutual NDA.',
    deliverable: 'System Architecture Document + Milestone Roadmap'
  },
  {
    phase: '02',
    title: 'Interactive Prototyping & Token Setup',
    duration: 'Week 2 – 3',
    desc: 'Figma component libraries, Auto-Layout user journeys, and tokenized design systems matching Tailwind configuration.',
    deliverable: 'Clickable Figma Prototype + Design Tokens'
  },
  {
    phase: '03',
    title: 'Agile 2-Week Sprints & Staging Previews',
    duration: 'Week 3 – 7',
    desc: 'Rapid feature engineering, automated CI/CD builds, and continuous client review in isolated staging environments.',
    deliverable: 'Production Git Commits + Live Staging URLs'
  },
  {
    phase: '04',
    title: 'Security Hardening & Global Launch',
    duration: 'Week 8',
    desc: 'OWASP Top 10 vulnerability mitigation, 98+ Lighthouse performance tuning, DNS propagation, and IP handover.',
    deliverable: 'Full IP Deed Transfer + Production Launch'
  }
]

// Comprehensive Enterprise Services Data
const SERVICES_ENTERPRISE_DATA = {
  'website-development': {
    id: 'website-development',
    category: 'Web Platforms & Enterprise Cloud',
    title: 'Web Development & SaaS Platforms',
    headline: 'Enterprise-Scale Web Platforms & Distributed SaaS Architecture',
    tagline: 'Engineered for sub-second Core Web Vitals, 99.99% uptime, and multi-tenant global scalability.',
    overview: 'We build high-throughput web applications, cloud-native SaaS platforms, and headless digital ecosystems. Every platform is architected with modern modular micro-frontends, edge server components, automated CI/CD pipelines, and 100% source-code ownership.',
    metrics: [
      { value: '98+', label: 'Lighthouse Score', desc: 'Top 1% Core Web Vitals' },
      { value: '< 240ms', label: 'Edge TTFB', desc: 'Sub-second page rendering' },
      { value: '99.99%', label: 'Uptime SLA', desc: 'Zero single point of failure' },
      { value: '100%', label: 'IP Handover', desc: 'Full repository ownership' }
    ],
    capabilities: [
      {
        title: 'React 19 & Next.js Distributed Platforms',
        desc: 'Full-stack server components, static regeneration (ISR), edge API routes, and client hydrations tuned for high conversion.',
        tech: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS']
      },
      {
        title: 'Multi-Tenant SaaS & RBAC Security',
        desc: 'Tenant database isolation, granular role-based access control, SSO (SAML/OAuth), and automated recurring subscription billing.',
        tech: ['Node.js', 'PostgreSQL', 'Auth0', 'Stripe Billing']
      },
      {
        title: 'High-Throughput WebSockets & Telemetry',
        desc: 'Sub-15ms real-time bidirectional data streams, event-driven messaging, and live executive telemetry dashboards.',
        tech: ['WebSockets', 'Redis Pub/Sub', 'Kafka', 'GraphQL']
      },
      {
        title: 'Headless E-Commerce & Content Systems',
        desc: 'Omnichannel headless architectures with instant search indexing, checkout optimizations, and custom CMS integrations.',
        tech: ['Shopify Headless', 'Strapi', 'Algolia', 'REST APIs']
      },
      {
        title: 'Automated CI/CD & Cloud Infrastructure',
        desc: 'Zero-downtime automated deployment pipelines, Docker containerization, and AWS/Vercel serverless provisioning.',
        tech: ['Docker', 'AWS ECS', 'CI/CD Pipelines', 'Terraform']
      },
      {
        title: 'Technical SEO & Dynamic OpenGraph',
        desc: 'Automated semantic HTML5 markup, structured JSON-LD schemas, and dynamic social preview generations.',
        tech: ['JSON-LD', 'Dynamic OG', 'Sitemap Automation', 'Lighthouse']
      }
    ],
    techCategories: [
      {
        category: 'Frontend & Edge Runtimes',
        skills: [
          { name: 'React 19', icon: <FaReact className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Next.js 15', icon: <SiNextdotjs className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'TypeScript', icon: <SiTypescript className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-4 h-4 text-[#4CAF4F]" /> }
        ]
      },
      {
        category: 'Backend & Microservices',
        skills: [
          { name: 'Node.js', icon: <FaNodeJs className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Python', icon: <SiPython className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'GraphQL', icon: <SiGraphql className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'REST APIs', icon: <Code2 className="w-4 h-4 text-[#4CAF4F]" /> }
        ]
      },
      {
        category: 'Database & Caching',
        skills: [
          { name: 'PostgreSQL', icon: <SiPostgresql className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Redis', icon: <SiRedis className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'MongoDB', icon: <SiMongodb className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Prisma ORM', icon: <Database className="w-4 h-4 text-[#4CAF4F]" /> }
        ]
      },
      {
        category: 'DevOps & Cloud Infrastructure',
        skills: [
          { name: 'AWS Cloud', icon: <FaAws className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Docker', icon: <FaDocker className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Kubernetes', icon: <SiKubernetes className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'CI/CD Pipelines', icon: <GitBranch className="w-4 h-4 text-[#4CAF4F]" /> }
        ]
      }
    ],
    deliverables: [
      'Production-ready code repository with branching strategy and semantic commit history',
      'Docker container configurations and automated multi-stage CI/CD pipelines',
      'Comprehensive OpenAPI 3.0 / Swagger and Postman API collections',
      'Full TypeScript type safety contracts with Jest & Playwright test coverage (90%+)',
      'Security audit report with automated OWASP vulnerability scans',
      '100% intellectual property deed transfer and commercial license handover'
    ],
    caseStudy: {
      client: 'Fly Studio Showcase',
      title: 'Modern Creative Studio Digital Presence',
      impact: '99+ Core Web Vitals • Responsive Architecture',
      desc: 'Engineered a high-impact portfolio platform highlighting creative services, interactive showcases, and frictionless brand inquiry pathways.',
      link: 'https://fly-studio-showcase.lovable.app/'
    },
    faqs: [
      {
        q: 'What is your typical web platform engineering timeline?',
        a: 'A high-impact web application or SaaS MVP typically takes 4 to 8 weeks. We work in disciplined 2-week agile sprint slices with live staging environments, ensuring you have hands-on visibility into progress at every milestone.'
      },
      {
        q: 'How do you guarantee 100% source code and IP ownership?',
        a: 'We sign a mutual Non-Disclosure Agreement (NDA) before discovery. All code is committed directly to your private repository from day one, and upon milestone sign-off, all intellectual property belongs exclusively to your company.'
      },
      {
        q: 'How do you ensure sub-second Core Web Vitals (98+ Lighthouse)?',
        a: 'We engineer with Next.js edge server components, aggressive asset bundling, modern WebP/AVIF media optimization, minimal JavaScript hydration, and CDN caching strategies to guarantee sub-250ms First Contentful Paint.'
      },
      {
        q: 'Can you integrate with our existing backend or microservices?',
        a: 'Yes. We frequently architect modular micro-frontends and API gateway adapters that integrate seamlessly with existing Java, Go, Python, or legacy systems without disrupting active production users.'
      }
    ]
  },

  'app-development': {
    id: 'app-development',
    category: 'Mobile Applications & Native Systems',
    title: 'Mobile App Engineering',
    headline: 'Native-Quality, 60fps Mobile Applications for iOS & Android',
    tagline: 'Engineered for fluid touch responsiveness, offline-first local data syncing, and frictionless App Store approvals.',
    overview: 'We build enterprise mobile applications that combine native 60fps performance with single-codebase efficiency. From complex offline data caching and real-time WebSockets to biometric security and in-app purchase funnels, our mobile engineering ensures high user retention across both iOS and Android.',
    metrics: [
      { value: '60-120', label: 'FPS Smoothness', desc: 'Hardware accelerated UI' },
      { value: '99.9%', label: 'Crash-Free Rate', desc: 'Battle-tested reliability' },
      { value: '100%', label: 'Store Approval', desc: 'Guaranteed submission' },
      { value: '90%', label: 'Code Sharing', desc: 'Fast time to market' }
    ],
    capabilities: [
      {
        title: 'React Native & Flutter Native Mastery',
        desc: 'Single-source codebases delivering authentic native experiences on iOS and Android without sacrificing platform feel.',
        tech: ['React Native', 'Flutter', 'TypeScript', 'Native Modules']
      },
      {
        title: 'Offline-First SQLite & MMKV Caching',
        desc: 'High-speed local key-value and relational database engines enabling full app functionality without active internet.',
        tech: ['SQLite', 'MMKV', 'WatermelonDB', 'Sync Engine']
      },
      {
        title: 'Rich Push Notifications & Background Tasks',
        desc: 'Segmented user notification pipelines with silent background data sync, rich interactive actions, and badges.',
        tech: ['APNs', 'FCM', 'OneSignal', 'Background Fetch']
      },
      {
        title: 'In-App Purchases & Subscription Funnels',
        desc: 'End-to-end integration with Apple StoreKit 2, Google Play Billing, and RevenueCat for seamless revenue generation.',
        tech: ['StoreKit 2', 'Google Play Billing', 'RevenueCat', 'Stripe']
      },
      {
        title: 'Native Camera & Hardware Sensor Bridge',
        desc: 'Direct hardware interfaces for barcode/QR scanning, GPS geolocation telemetry, Bluetooth BLE, and accelerometer data.',
        tech: ['CameraX', 'AVFoundation', 'CoreBluetooth', 'Geolocation']
      },
      {
        title: 'App Store & Google Play Submission',
        desc: 'End-to-end release management including provisioning profiles, privacy manifests, test tracks, and review resolution.',
        tech: ['Fastlane', 'TestFlight', 'Google Play Console', 'App Privacy']
      }
    ],
    techCategories: [
      {
        category: 'Mobile Frameworks & Runtimes',
        skills: [
          { name: 'React Native', icon: <FaReact className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Flutter', icon: <SiFlutter className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'TypeScript', icon: <SiTypescript className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Swift (iOS)', icon: <FaApple className="w-4 h-4 text-[#4CAF4F]" /> }
        ]
      },
      {
        category: 'Native Android & Architecture',
        skills: [
          { name: 'Kotlin', icon: <SiKotlin className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Native Bridges', icon: <Cpu className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'MMKV Storage', icon: <Database className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'SQLite DB', icon: <Database className="w-4 h-4 text-[#4CAF4F]" /> }
        ]
      },
      {
        category: 'Cloud Services & Push Pipelines',
        skills: [
          { name: 'Firebase', icon: <SiFirebase className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Apple APNs', icon: <FaApple className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Google FCM', icon: <SiFirebase className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'RevenueCat', icon: <Zap className="w-4 h-4 text-[#4CAF4F]" /> }
        ]
      },
      {
        category: 'Deployment & Mobile DevOps',
        skills: [
          { name: 'Fastlane', icon: <GitBranch className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'TestFlight', icon: <FaApple className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Play Console', icon: <Globe className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Sentry Crashlytics', icon: <Activity className="w-4 h-4 text-[#4CAF4F]" /> }
        ]
      }
    ],
    deliverables: [
      'Modular React Native / Flutter repository with clear separation of business logic and UI',
      'Native Xcode (.xcworkspace) and Android Studio project configurations',
      'Automated Fastlane scripts for continuous beta deployment to TestFlight and Play Store Internal',
      'Comprehensive store asset package including App Store icons, splash screens, and localized screenshots',
      'Offline sync engine documentation and API schema specifications',
      '100% intellectual property deed transfer and commercial distribution rights'
    ],
    caseStudy: {
      client: 'Blue Base Multi-Branch',
      title: 'Service Exploration & Instant Booking App',
      impact: 'Sub-Second Discovery • 4.9/5 Rating',
      desc: 'Engineered a modern salon and wellness mobile platform with responsive service exploration, real-time staff scheduling, and frictionless booking.',
      link: 'https://bluebase-family-spot.lovable.app'
    },
    faqs: [
      {
        q: 'Why choose React Native or Flutter over separate native apps?',
        a: 'For over 95% of modern business applications, React Native and Flutter provide identical native 60fps performance and access to all device sensors while cutting initial development time and long-term maintenance cycles by nearly half.'
      },
      {
        q: 'Do you manage the entire Apple App Store and Google Play approval?',
        a: 'Yes. We manage certificates, provisioning profiles, privacy policy compliance, age ratings, and metadata. In the rare event of an App Review note, our engineers resolve it directly until your app is live.'
      },
      {
        q: 'How does offline functionality work when the user has no signal?',
        a: 'We architect apps with local SQLite or MMKV persistent storage. All actions are logged locally and automatically sync back to your cloud database in the background when connectivity is re-established.'
      }
    ]
  },

  'ui-designs': {
    id: 'ui-designs',
    category: 'Product Design & Design Systems',
    title: 'UI/UX & Product Design Systems',
    headline: 'Conversion-Engineered Design Systems & Interactive Prototypes',
    tagline: 'Figma token architectures, component libraries, and user flows designed to eliminate developer friction.',
    overview: 'We design modern design systems, comprehensive component tokens, and interactive Figma prototypes centered on user retention and measurable conversion. We bridge the gap between creative design and engineering by building tokenized systems that map 1:1 to production code.',
    metrics: [
      { value: '120+', label: 'Tokenized Components', desc: 'Atomic design library' },
      { value: 'WCAG AAA', label: 'Accessibility', desc: 'Full contrast compliance' },
      { value: '100%', label: 'Developer Fidelity', desc: 'Auto-layout & tokens' },
      { value: '+140%', label: 'Avg Conversion', desc: 'Frictionless user flows' }
    ],
    capabilities: [
      {
        title: 'Figma Token Libraries & Variable Modes',
        desc: 'Structured color tokens, light/dark mode variables, typography scaling, and component states organized for rapid scaling.',
        tech: ['Figma Variables', 'Design Tokens', 'Auto-Layout 5.0', 'Variants']
      },
      {
        title: 'Interactive Clickable Prototyping',
        desc: 'High-fidelity prototypes replicating real application behavior, micro-interactions, modal flows, and responsive layouts.',
        tech: ['Smart Animate', 'Component States', 'User Flow Mapping', 'Figma']
      },
      {
        title: 'User Journey Mapping & Conversion Optimization',
        desc: 'Analyzing user drop-off points, simplifying complex onboarding flows, and designing high-converting checkout funnels.',
        tech: ['UX Research', 'Information Architecture', 'Wireframing', 'Heatmaps']
      },
      {
        title: 'Responsive Multi-Device Breakpoint Layouts',
        desc: 'Fluid layouts tested across mobile, tablet, desktop, and ultra-wide displays with strict grid consistency.',
        tech: ['12-Column Grids', 'Fluid Breakpoints', 'Mobile-First UI', 'Retina Assets']
      },
      {
        title: 'Micro-Interactions & Animation Specs',
        desc: 'Precise transition curves, hover elevations, tactile feedback animations, and motion handoff sheets for developers.',
        tech: ['Easing Curves', 'Lottie Animations', 'Micro-Interactions', 'Motion']
      },
      {
        title: 'Frictionless Developer Handoff & Storybook',
        desc: 'Organized component documentation, CSS variables, Tailwind configuration mappings, and exported SVG icon packs.',
        tech: ['Tailwind Config', 'CSS Variables', 'SVG Exports', 'Style Guides']
      }
    ],
    techCategories: [
      {
        category: 'Design & Prototyping Tools',
        skills: [
          { name: 'Figma Master', icon: <SiFigma className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Design Tokens', icon: <Palette className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Figma Variables', icon: <Layers className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Smart Animate', icon: <Sparkles className="w-4 h-4 text-[#4CAF4F]" /> }
        ]
      },
      {
        category: 'Engineering Sync & Code Tokens',
        skills: [
          { name: 'Tailwind Config', icon: <SiTailwindcss className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'CSS Variables', icon: <Code2 className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Design Tokens JSON', icon: <FileCheck className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'SVG Asset Kit', icon: <Palette className="w-4 h-4 text-[#4CAF4F]" /> }
        ]
      },
      {
        category: 'UX Research & Validation',
        skills: [
          { name: 'User Testing', icon: <CheckCircle2 className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Wireframing', icon: <Layers className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Flow Diagrams', icon: <GitBranch className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Heuristic Review', icon: <Award className="w-4 h-4 text-[#4CAF4F]" /> }
        ]
      },
      {
        category: 'Compliance & Accessibility',
        skills: [
          { name: 'WCAG 2.2 AAA', icon: <ShieldCheck className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Color Contrast', icon: <CheckCircle2 className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Responsive Grids', icon: <Globe className="w-4 h-4 text-[#4CAF4F]" /> },
          { name: 'Typography Scale', icon: <Code2 className="w-4 h-4 text-[#4CAF4F]" /> }
        ]
      }
    ],
    deliverables: [
      'Master Figma (.fig) file with structured token variables, components, and auto-layout',
      'Complete clickable prototype ready for user testing and investor presentations',
      'Tailwind CSS configuration file and CSS variable exports matching Figma tokens 1:1',
      'Optimized SVG icon sets, illustrations, and graphic asset packs',
      'Comprehensive design system documentation and accessibility compliance report',
      '100% intellectual property transfer and unrestricted commercial license'
    ],
    caseStudy: {
      client: 'ZOCA Crimson Charm',
      title: 'High-Conversion Lifestyle Storefront',
      impact: '+140% Mobile Conversion • Sub-Second Discovery',
      desc: 'Designed a high-end luxury lifestyle e-commerce interface with fluid interactive lookbooks, responsive filtering, and seamless checkout.',
      link: 'https://zoca-crimson-charm.lovable.app'
    },
    faqs: [
      {
        q: 'How do design tokens help our developers build faster?',
        a: 'Design tokens replace arbitrary values with standardized names (e.g. `color-primary`, `spacing-lg`). Because our Figma tokens map 1:1 to Tailwind CSS and CSS variables, your developers never have to guess sizes, margins, or hex codes.'
      },
      {
        q: 'Do you design in Figma with Auto-Layout?',
        a: 'Yes, 100%. Every screen, card, and component is constructed using native Figma Auto-Layout 5.0, variables, and variants so resizing and responsive testing are instantaneous and exact.'
      },
      {
        q: 'Can we use your Figma files directly for developer handoff?',
        a: 'Absolutely. We include full component documentation, state variations (hover, active, focus, disabled), and exported Tailwind configurations so developers can build with zero ambiguity.'
      }
    ]
  }
}

export default function ServiceDetail() {
  const { serviceId } = useParams()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)
  const [activeFaq, setActiveFaq] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    stage: 'Early-Stage MVP / Prototype',
    scope: ''
  })

  const service = SERVICES_ENTERPRISE_DATA[serviceId]

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [serviceId])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!service) {
    return <NotFound />
  }

  const handleOpenModal = () => {
    setModalOpen(true)
    setFormSuccess(false)
    setFormError(null)
    setIsSubmitting(false)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setFormSuccess(false)
    setFormError(null)
    setIsSubmitting(false)
    setFormData({
      fullName: '',
      email: '',
      stage: 'Early-Stage MVP / Prototype',
      scope: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    const result = await sendEmail({
      ...formData,
      service: service.title,
      type: 'Service Technical Discovery'
    })
    setIsSubmitting(false)

    if (result.success) {
      setFormSuccess(true)
      setTimeout(() => {
        handleCloseModal()
      }, 2500)
    } else {
      setFormError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0D0F] text-[#4D4D4D] dark:text-[#94A3B8] font-['Inter',sans-serif]">
      {/* 1. TOP NAVBAR (PROPERLY IDENTICAL TO HOME PAGE NAVBAR) */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0B0D0F]/95 backdrop-blur-md border-b border-[#E0E0E0] dark:border-[#232936] transition-all duration-200 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link to="/" className="flex items-center">
            <ZytronaLogo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <Link 
              to="/" 
              className="text-[15px] font-medium text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F] transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/#services" 
              className="text-[15px] font-semibold text-[#4CAF4F] transition-colors"
            >
              Services
            </Link>
            <Link 
              to="/#architecture" 
              className="text-[15px] font-medium text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F] transition-colors"
            >
              Engineering
            </Link>
            <Link 
              to="/#insights" 
              className="text-[15px] font-medium text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F] transition-colors"
            >
              Case Studies
            </Link>
            <Link 
              to="/about" 
              className="text-[15px] font-medium text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F] transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right Action Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <button 
              onClick={handleOpenModal}
              className="btn-nexcent-primary"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle size="sm" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#263238] dark:text-[#E2E8F0] hover:text-[#4CAF4F] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#15181E] border-b border-[#E0E0E0] dark:border-[#232936] px-6 py-5 shadow-lg space-y-4 animate-in slide-in-from-top-2">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
            >
              Home
            </Link>
            <Link 
              to="/#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-[#4CAF4F]"
            >
              Services
            </Link>
            <Link 
              to="/#architecture" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
            >
              Engineering
            </Link>
            <Link 
              to="/#insights" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
            >
              Case Studies
            </Link>
            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
            >
              About
            </Link>
            <div className="pt-2">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleOpenModal()
                }}
                className="w-full btn-nexcent-primary py-2.5 text-sm"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. ENTERPRISE HERO SECTION */}
      <section id="overview" className="bg-[#F5F7FA] pt-32 pb-20 px-6 lg:px-16 border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#4CAF4F] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/#services" className="hover:text-[#4CAF4F] transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#4CAF4F]">{service.title}</span>
          </div>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#4CAF4F]" />
                <span>{service.category}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#263238] tracking-tight leading-[1.15]">
                {service.headline}
              </h1>

              <p className="text-base sm:text-lg text-[#717171] max-w-2xl leading-relaxed">
                {service.overview}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-neutral-600 font-medium">
                <span className="inline-flex items-center gap-1.5 bg-white border border-[#E0E0E0] px-3 py-1 rounded">
                  <ShieldCheck className="w-4 h-4 text-[#4CAF4F]" />
                  100% IP & Git Ownership
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-[#E0E0E0] px-3 py-1 rounded">
                  <Lock className="w-4 h-4 text-[#4CAF4F]" />
                  Mutual NDA Protection
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-[#E0E0E0] px-3 py-1 rounded">
                  <Flame className="w-4 h-4 text-[#4CAF4F]" />
                  Sub-Second Speed SLA
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button 
                  onClick={handleOpenModal}
                  className="btn-nexcent-primary text-base px-8 py-3.5"
                >
                  <span>Book Technical Discovery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a 
                  href="#capabilities"
                  className="btn-nexcent-secondary text-base px-8 py-3.5"
                >
                  Explore Capabilities
                </a>
              </div>
            </div>

            {/* 4 Boxy Metric Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {service.metrics.map((metric, mIdx) => (
                <div key={mIdx} className="boxy-card p-5 sm:p-6 bg-white text-left hover:border-[#4CAF4F] transition-all">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#4CAF4F] tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-[#263238] mt-1.5">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                    {metric.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE CAPABILITIES MATRIX (6 Deep Boxy Cards) */}
      <section id="capabilities" className="py-20 px-6 lg:px-16 bg-white border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#263238]">
              Deep Technical Capabilities
            </h2>
            <p className="text-[#717171] text-base">
              Senior software engineering standards built to withstand enterprise volume, compliance, and user growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {service.capabilities.map((cap, idx) => (
              <SpotlightCard 
                key={idx} 
                spotlightColor="rgba(76, 175, 79, 0.12)"
                className="boxy-card p-8 bg-white flex flex-col justify-between h-full"
              >
                <div className="flex-1 flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#4CAF4F] flex items-center justify-center font-bold text-sm mb-4 border border-[#C8E6C9]/60 shadow-sm shrink-0">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-[#263238] leading-snug mb-3 min-h-[56px] flex items-start">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[#717171] leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="mt-auto pt-5 border-t border-[#E0E0E0] flex flex-wrap gap-1.5">
                  {cap.tech.map((t, tIdx) => (
                    <span key={tIdx} className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#F5F7FA] border border-[#E0E0E0] text-neutral-600">
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY ZYTRONA VS GENERIC AGENCIES (Comparison Matrix) */}
      <section id="comparison" className="py-20 px-6 lg:px-16 bg-[#F5F7FA] border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="text-xs font-bold text-[#4CAF4F] uppercase tracking-wider">
              Transparent Standards
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#263238]">
              Why Top Companies Choose ZYTRONA
            </h2>
            <p className="text-[#717171] text-base">
              See how our senior-led studio model outperforms traditional agencies and unvetted freelance marketplaces.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm bg-white rounded-md overflow-hidden border border-[#E0E0E0]">
              <thead>
                <tr className="border-b-2 border-[#E0E0E0] bg-[#F5F7FA]">
                  <th className="py-4 px-6 font-bold text-[#263238] w-1/4">Key Dimension</th>
                  <th className="py-4 px-6 font-bold text-[#4CAF4F] bg-[#E8F5E9]/50 border-x-2 border-[#4CAF4F] w-1/3">
                    ZYTRONA Senior Studio
                  </th>
                  <th className="py-4 px-6 font-bold text-[#717171] w-1/4">Traditional Agencies</th>
                  <th className="py-4 px-6 font-bold text-[#717171] w-1/4">Freelancer Marketplaces</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0]">
                {COMPARISON_DATA.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-4 px-6 font-bold text-[#263238]">{row.feature}</td>
                    <td className="py-4 px-6 font-semibold text-[#2E7D32] bg-[#E8F5E9]/30 border-x-2 border-[#4CAF4F]">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#4CAF4F] shrink-0 mt-0.5" />
                        <span>{row.zytrona}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-neutral-600">
                      <div className="flex items-start gap-2">
                        <FaTimes className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                        <span>{row.agency}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-neutral-600">
                      <div className="flex items-start gap-2">
                        <FaTimes className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                        <span>{row.freelancer}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. ENGINEERING DELIVERY TIMELINE (4-Phase Zero to Production) */}
      <section className="py-20 px-6 lg:px-16 bg-[#F5F7FA] border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Disciplined Execution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#263238]">
              4-Phase Delivery Framework
            </h2>
            <p className="text-[#717171] text-base">
              Predictable, milestone-backed delivery from Day 1 discovery to production scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {ENGINEERING_PROCESS.map((proc, pIdx) => (
              <SpotlightCard 
                key={pIdx} 
                spotlightColor="rgba(76, 175, 79, 0.12)"
                className="boxy-card p-6 bg-white flex flex-col justify-between h-full"
              >
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-[#4CAF4F] font-mono tracking-tighter">
                      {proc.phase}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]/60">
                      {proc.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#263238] mb-2 min-h-[68px] flex items-start leading-snug">
                    {proc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#717171] leading-relaxed">
                    {proc.desc}
                  </p>
                </div>

                <div className="mt-auto pt-5 border-t border-[#E0E0E0]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Deliverable:
                  </div>
                  <div className="text-xs font-semibold text-[#263238] leading-snug min-h-[38px] flex items-start">
                    {proc.deliverable}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TECH STACK MATRIX (Categorized) */}
      <section id="tech-matrix" className="py-20 px-6 lg:px-16 bg-[#F5F7FA] border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#263238]">
              Technology & Framework Matrix
            </h2>
            <p className="text-[#717171] text-base">
              We leverage modern, type-safe, and industry-standard open-source ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.techCategories.map((cat, cIdx) => (
              <div key={cIdx} className="boxy-card p-6 bg-white space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4CAF4F] border-b border-[#F0F0F0] pb-2">
                  {cat.category}
                </h4>
                <div className="space-y-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-3 p-2.5 rounded bg-[#F5F7FA] border border-[#E0E0E0]">
                      <div className="shrink-0">{skill.icon}</div>
                      <span className="text-xs font-bold text-[#263238]">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DELIVERABLES & QUALITY GATES */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold text-[#4CAF4F] uppercase tracking-wider">
              Engineering Governance
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#263238] leading-tight">
              Standard Quality Gates & Handoff Deliverables
            </h2>
            <p className="text-[#717171] text-base leading-relaxed">
              We never cut corners on codebase integrity. Every milestone must pass our automated quality gates before production release.
            </p>

            <div className="space-y-3">
              {service.deliverables.map((item, dIdx) => (
                <div key={dIdx} className="flex items-start gap-3 p-3 bg-[#F5F7FA] rounded-md border border-[#E0E0E0]">
                  <div className="w-5 h-5 rounded-full bg-[#E8F5E9] text-[#4CAF4F] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-medium text-[#263238] leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Case Study Card */}
          <div className="lg:col-span-6">
            <div className="boxy-card p-8 sm:p-10 bg-[#F5F7FA] border-2 border-[#4CAF4F]/30 space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
                  Featured Case Study
                </span>
                <span className="text-xs text-neutral-500 font-medium">Production Verified</span>
              </div>

              <div>
                <div className="text-sm font-bold text-[#4CAF4F] mb-1">{service.caseStudy.client}</div>
                <h3 className="text-2xl font-bold text-[#263238] mb-3">{service.caseStudy.title}</h3>
                <div className="text-xs font-semibold text-[#2E7D32] bg-[#E8F5E9] inline-block px-2.5 py-1 rounded mb-4">
                  ⚡ {service.caseStudy.impact}
                </div>
                <p className="text-sm text-[#717171] leading-relaxed">
                  {service.caseStudy.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E0E0E0]">
                {service.caseStudy.link.startsWith('http') ? (
                  <a 
                    href={service.caseStudy.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#4CAF4F] font-bold text-sm hover:text-[#388E3C] transition-colors"
                  >
                    <span>View Live Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link 
                    to={service.caseStudy.link}
                    className="inline-flex items-center gap-2 text-[#4CAF4F] font-bold text-sm hover:text-[#388E3C] transition-colors"
                  >
                    <span>View Case Study Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TECHNICAL FAQS */}
      <section id="faqs" className="py-20 px-6 lg:px-16 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#263238]">
              Frequently Asked Technical Questions
            </h2>
            <p className="text-[#717171] text-base">
              Clear answers from our senior engineering team regarding {service.title}.
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, fIdx) => (
              <div key={fIdx} className="boxy-card overflow-hidden bg-white">
                <button
                  onClick={() => setActiveFaq(activeFaq === fIdx ? null : fIdx)}
                  className="w-full p-6 text-left flex items-center justify-between font-bold text-[#263238] hover:text-[#4CAF4F] transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${activeFaq === fIdx ? 'rotate-180 text-[#4CAF4F]' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === fIdx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-[#717171] leading-relaxed border-t border-[#F0F0F0] pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA BANNER */}
      <section className="bg-white py-20 px-6 lg:px-16 text-center border-t border-[#E0E0E0]">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
            <span>100% IP & Code Ownership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight leading-tight">
            Ready to engineer your <br /> {service.title}?
          </h2>

          <p className="text-base text-[#717171] max-w-xl mx-auto">
            Schedule a technical discovery session with our engineering team. Transparent milestones, 100% IP handover, and mutual NDA protection.
          </p>

          <div className="pt-2">
            <button 
              onClick={handleOpenModal}
              className="btn-nexcent-primary text-base px-8 py-3.5"
            >
              <span>Book Technical Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <Footer />

      {/* TECHNICAL DISCOVERY MODAL (No Prices) */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-2xl border border-[#E0E0E0] max-w-md w-full p-6 sm:p-8 relative"
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#4CAF4F] flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#263238] mb-1">Book Technical Discovery</h3>
              <p className="text-xs text-[#4CAF4F] font-bold uppercase tracking-wider mb-2">{service.title}</p>
              <p className="text-sm text-[#717171] mb-6">
                Connect with our engineering team. 100% IP ownership & mutual NDA protection.
              </p>

              {formSuccess ? (
                <div className="p-4 bg-[#E8F5E9] border border-[#C8E6C9] rounded-md text-center text-[#2E7D32]">
                  <Check className="w-8 h-8 mx-auto mb-2 text-[#4CAF4F]" />
                  <p className="font-bold">Discovery Request Received!</p>
                  <p className="text-xs mt-1">Our technical lead will review your scope and reply within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{formError}</span>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-semibold text-[#263238] uppercase mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Jordan Lee" 
                      className="w-full px-3.5 py-2.5 rounded border border-[#E0E0E0] text-sm focus:border-[#4CAF4F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#263238] uppercase mb-1">Work Email</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="jordan@company.com" 
                      className="w-full px-3.5 py-2.5 rounded border border-[#E0E0E0] text-sm focus:border-[#4CAF4F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#263238] uppercase mb-1.5">Project Stage & Scope</label>
                    <CustomSelect 
                      value={formData.stage}
                      onChange={(val) => setFormData({...formData, stage: val})}
                      options={[
                        'Early-Stage MVP / Prototype',
                        'Full Production Platform Build',
                        'Enterprise Scale & High-Throughput Modernization',
                        'Dedicated Senior Engineering Pod Retainer'
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#263238] uppercase mb-1">Project Brief / Scope Notes</label>
                    <textarea 
                      rows={3}
                      value={formData.scope}
                      onChange={(e) => setFormData({...formData, scope: e.target.value})}
                      placeholder="Briefly describe your goals, timeline, and key requirements..."
                      className="w-full px-3.5 py-2 rounded border border-[#E0E0E0] text-xs text-neutral-700 focus:border-[#4CAF4F] focus:outline-none resize-none"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-nexcent-primary py-3 mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Discovery Request...</span>
                      </>
                    ) : (
                      <span>Confirm Discovery Session</span>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
