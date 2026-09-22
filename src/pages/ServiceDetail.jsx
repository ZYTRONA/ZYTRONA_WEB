import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import NotFound from './NotFound.jsx'
import { ZytronaLogo } from '@/components/ZytronaFigmaAssets'
import { SiteNavbar } from '@/components/ui/resizable-navbar'
import { Footer } from '@/components/ui/Footer'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { CustomSelect } from '@/components/ui/CustomSelect'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Marquee } from '@/components/shadcn-space/animations/marquee'
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
          { name: 'React 19', desc: 'Server Components & Concurrent Hooks', tag: 'Edge UI', icon: <FaReact className="w-10 h-10 sm:w-11 sm:h-11 text-[#61DAFB]" /> },
          { name: 'Next.js 15', desc: 'App Router, Turbopack & Hybrid SSR', tag: 'Full-Stack', icon: <SiNextdotjs className="w-10 h-10 sm:w-11 sm:h-11 text-[#000000] dark:text-[#FFFFFF]" /> },
          { name: 'TypeScript', desc: 'Strict End-to-End Type Safety Contracts', tag: 'Type System', icon: <SiTypescript className="w-10 h-10 sm:w-11 sm:h-11 text-[#3178C6]" /> },
          { name: 'Tailwind CSS', desc: 'Utility-First Responsive Design System', tag: 'Styling Engine', icon: <SiTailwindcss className="w-10 h-10 sm:w-11 sm:h-11 text-[#06B6D4]" /> }
        ]
      },
      {
        category: 'Backend & Microservices',
        skills: [
          { name: 'Node.js', desc: 'Asynchronous Event-Driven Microservices', tag: 'Backend Runtime', icon: <FaNodeJs className="w-10 h-10 sm:w-11 sm:h-11 text-[#5FA04E]" /> },
          { name: 'Python', desc: 'High-Throughput FastAPIs & AI Pipelines', tag: 'Data & AI', icon: <SiPython className="w-10 h-10 sm:w-11 sm:h-11 text-[#3776AB]" /> },
          { name: 'GraphQL', desc: 'Declarative Data Fetching & Apollo Federation', tag: 'API Layer', icon: <SiGraphql className="w-10 h-10 sm:w-11 sm:h-11 text-[#E10098]" /> },
          { name: 'REST APIs', desc: 'OpenAPI 3.0 Standardized Strict Endpoints', tag: 'REST Standard', icon: <Code2 className="w-10 h-10 sm:w-11 sm:h-11 text-[#6366F1]" /> }
        ]
      },
      {
        category: 'Database & Caching',
        skills: [
          { name: 'PostgreSQL', desc: 'High-Concurrency ACID Relational Storage', tag: 'Primary DB', icon: <SiPostgresql className="w-10 h-10 sm:w-11 sm:h-11 text-[#4169E1]" /> },
          { name: 'Redis', desc: 'Sub-Millisecond In-Memory Caching & Pub/Sub', tag: 'Memory Cache', icon: <SiRedis className="w-10 h-10 sm:w-11 sm:h-11 text-[#DC382D]" /> },
          { name: 'MongoDB', desc: 'Flexible Distributed Document Database', tag: 'Document DB', icon: <SiMongodb className="w-10 h-10 sm:w-11 sm:h-11 text-[#47A248]" /> },
          { name: 'Prisma ORM', desc: 'Type-Safe Database Client & Migrations', tag: 'ORM Layer', icon: <Database className="w-10 h-10 sm:w-11 sm:h-11 text-[#2D3748] dark:text-[#E2E8F0]" /> }
        ]
      },
      {
        category: 'DevOps & Cloud Infrastructure',
        skills: [
          { name: 'AWS Cloud', desc: 'Auto-Scaling ECS, Lambda & S3 Buckets', tag: 'Cloud Platform', icon: <FaAws className="w-10 h-10 sm:w-11 sm:h-11 text-[#FF9900]" /> },
          { name: 'Docker', desc: 'Multi-Stage Production Containerization', tag: 'Containers', icon: <FaDocker className="w-10 h-10 sm:w-11 sm:h-11 text-[#2496ED]" /> },
          { name: 'Kubernetes', desc: 'Automated Container Orchestration & Ingress', tag: 'Orchestration', icon: <SiKubernetes className="w-10 h-10 sm:w-11 sm:h-11 text-[#326CE5]" /> },
          { name: 'CI/CD Pipelines', desc: 'Zero-Downtime Automated Test & Deploy', tag: 'DevOps', icon: <GitBranch className="w-10 h-10 sm:w-11 sm:h-11 text-[#F05032]" /> }
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
        desc: 'Fluid layouts tested across all screen viewports, tablets, desktops, and ultra-wide displays with strict grid consistency.',
        tech: ['12-Column Grids', 'Fluid Breakpoints', 'Responsive UI', 'Retina Assets']
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
          { name: 'Figma Master', desc: 'Auto-Layout 5.0 & Component Variants', tag: 'Core Tool', icon: <SiFigma className="w-10 h-10 sm:w-11 sm:h-11 text-[#F24E1E]" /> },
          { name: 'Design Tokens', desc: 'Standardized Color & Spatial Tokens', tag: 'Tokens System', icon: <Palette className="w-10 h-10 sm:w-11 sm:h-11 text-[#EC4899]" /> },
          { name: 'Figma Variables', desc: 'Multi-Theme Dark & Light Modes', tag: 'Variables', icon: <Layers className="w-10 h-10 sm:w-11 sm:h-11 text-[#8B5CF6]" /> },
          { name: 'Smart Animate', desc: 'Fluid Micro-Interaction Prototypes', tag: 'Interactions', icon: <Sparkles className="w-10 h-10 sm:w-11 sm:h-11 text-[#3B82F6]" /> }
        ]
      },
      {
        category: 'Engineering Sync & Code Tokens',
        skills: [
          { name: 'Tailwind Config', desc: '1:1 Figma-to-Utility Class Mapping', tag: 'Code Sync', icon: <SiTailwindcss className="w-10 h-10 sm:w-11 sm:h-11 text-[#06B6D4]" /> },
          { name: 'CSS Variables', desc: 'Semantic Dynamic Style Variables', tag: 'CSS Engine', icon: <Code2 className="w-10 h-10 sm:w-11 sm:h-11 text-[#264DE4]" /> },
          { name: 'Design Tokens JSON', desc: 'Automated Style Dictionary Exports', tag: 'Handoff Format', icon: <FileCheck className="w-10 h-10 sm:w-11 sm:h-11 text-[#F59E0B]" /> },
          { name: 'SVG Asset Kit', desc: 'Optimized Scalable Vector Graphics', tag: 'Vector Assets', icon: <Palette className="w-10 h-10 sm:w-11 sm:h-11 text-[#10B981]" /> }
        ]
      },
      {
        category: 'UX Research & Validation',
        skills: [
          { name: 'User Testing', desc: 'Unmoderated & Moderated Task Testing', tag: 'Validation', icon: <CheckCircle2 className="w-10 h-10 sm:w-11 sm:h-11 text-[#6366F1]" /> },
          { name: 'Wireframing', desc: 'Rapid Low-Fidelity Layout Discovery', tag: 'UX Discovery', icon: <Layers className="w-10 h-10 sm:w-11 sm:h-11 text-[#64748B]" /> },
          { name: 'Flow Diagrams', desc: 'Frictionless Conversion Journeys', tag: 'Information Arch', icon: <GitBranch className="w-10 h-10 sm:w-11 sm:h-11 text-[#8B5CF6]" /> },
          { name: 'Heuristic Review', desc: 'Nielsen Norman 10 Usability Heuristics', tag: 'Audit Standard', icon: <Award className="w-10 h-10 sm:w-11 sm:h-11 text-[#F59E0B]" /> }
        ]
      },
      {
        category: 'Compliance & Accessibility',
        skills: [
          { name: 'WCAG 2.2 AAA', desc: 'Color Contrast & Accessible Ratios', tag: 'Accessibility', icon: <ShieldCheck className="w-10 h-10 sm:w-11 sm:h-11 text-[#059669]" /> },
          { name: 'Color Contrast', desc: 'APCA & WCAG Contrast Verification', tag: 'Visual Quality', icon: <CheckCircle2 className="w-10 h-10 sm:w-11 sm:h-11 text-[#3B82F6]" /> },
          { name: 'Responsive Grids', desc: 'Adaptive 4px/8px Spatial Scale', tag: 'Grid System', icon: <Globe className="w-10 h-10 sm:w-11 sm:h-11 text-[#6366F1]" /> },
          { name: 'Typography Scale', desc: 'Modular Fluid Typography Ratios', tag: 'Typography', icon: <Code2 className="w-10 h-10 sm:w-11 sm:h-11 text-[#EC4899]" /> }
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
      impact: '+140% Conversion Rate • Sub-Second Discovery',
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

// Technology & Framework Matrix Item Card (Clean, borderless, authentic brand colors, vertical stack)
function TechScrollCard({ skill }) {
  return (
    <div 
      className="group flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl transition-all duration-300 select-none shrink-0 cursor-pointer hover:bg-black/[0.04] dark:hover:bg-white/[0.06] w-[130px] sm:w-[150px]"
    >
      {/* Real Brand Icon (Centered on Top, No Outline, Authentic Colors) */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-115">
        {skill.icon}
      </div>

      {/* Name Under the Icon */}
      <span className="text-xs sm:text-sm font-bold text-[#263238] dark:text-[#F8FAFC] tracking-tight leading-tight group-hover:text-black dark:group-hover:text-white transition-colors">
        {skill.name}
      </span>

      {/* Subtitle / Role Under the Name */}
      {skill.tag && (
        <span className="text-[10px] sm:text-[11px] text-[#717171] dark:text-[#94A3B8] font-medium mt-1 leading-none whitespace-nowrap">
          {skill.tag}
        </span>
      )}
    </div>
  )
}

export default function ServiceDetail() {
  const { serviceId } = useParams()
  const [modalOpen, setModalOpen] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)
  const [activeFaq, setActiveFaq] = useState(null)

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

  if (!service) {
    return <NotFound />
  }

  // Flatten skills with category info for the Scroll UI
  const allSkills = service ? service.techCategories.flatMap(cat => 
    cat.skills.map(s => ({ ...s, category: cat.category }))
  ) : []

  const halfLength = Math.ceil(allSkills.length / 2)
  const row1Skills = allSkills.slice(0, halfLength)
  const row2Skills = allSkills.slice(halfLength)

  const serviceModalRef = useRef(null)
  const previousActiveElement = useRef(null)

  // Lock both root and body scrolling + prevent layout shift when modal is open
  useEffect(() => {
    if (modalOpen) {
      previousActiveElement.current = document.activeElement

      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      const originalHtmlOverflow = document.documentElement.style.overflow
      const originalBodyOverflow = document.body.style.overflow
      const originalBodyPaddingRight = document.body.style.paddingRight
      const originalHtmlOverscroll = document.documentElement.style.overscrollBehavior
      const originalBodyOverscroll = document.body.style.overscrollBehavior

      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overscrollBehavior = 'none'
      document.body.style.overscrollBehavior = 'none'
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`
      }

      return () => {
        document.documentElement.style.overflow = originalHtmlOverflow
        document.body.style.overflow = originalBodyOverflow
        document.body.style.paddingRight = originalBodyPaddingRight
        document.documentElement.style.overscrollBehavior = originalHtmlOverscroll
        document.body.style.overscrollBehavior = originalBodyOverscroll

        if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
          setTimeout(() => previousActiveElement.current?.focus(), 10)
        }
      }
    }
  }, [modalOpen])

  // Focus trap & Escape key handling
  useEffect(() => {
    if (!modalOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleCloseModal()
        return
      }

      if (e.key === 'Tab' && serviceModalRef.current) {
        const focusable = Array.from(
          serviceModalRef.current.querySelectorAll(
            'a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null)

        if (focusable.length === 0) {
          e.preventDefault()
          return
        }

        const firstElement = focusable[0]
        const lastElement = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement || !serviceModalRef.current.contains(document.activeElement)) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement || !serviceModalRef.current.contains(document.activeElement)) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalOpen])

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
      {/* 1. TOP NAVBAR (Unified Site Navbar) */}
      <SiteNavbar onStartProject={handleOpenModal} />

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

      {/* 6. TECH STACK MATRIX (Interactive Scroll UI with Programming Icons) */}
      <section id="tech-matrix" className="py-20 px-6 lg:px-16 bg-[#F5F7FA] dark:bg-[#0B0D0F] border-b border-[#E0E0E0] dark:border-[#232936] overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] dark:bg-[#1B2E21] text-[#2E7D32] dark:text-[#81C784] text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>Production Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#263238] dark:text-[#F8FAFC]">
              Technology &amp; Framework Matrix
            </h2>
            <p className="text-[#717171] dark:text-[#94A3B8] text-sm sm:text-base">
              We leverage modern, type-safe, and industry-standard open-source ecosystems. Explore our production stack below.
            </p>
          </div>

          {/* Dynamic Continuous Scroll UI (Never stops on cursor hover) */}
          <div className="space-y-4 pt-2">
            {/* Row 1: Forward Marquee */}
            <Marquee duration="35s" repeat={3} gap="1.25rem" className="py-2 [--gap:1.25rem]">
              {row1Skills.map((skill, idx) => (
                <TechScrollCard key={idx} skill={skill} />
              ))}
            </Marquee>

            {/* Row 2: Reverse Marquee */}
            <Marquee reverse duration="38s" repeat={3} gap="1.25rem" className="py-2 [--gap:1.25rem]">
              {row2Skills.map((skill, idx) => (
                <TechScrollCard key={idx} skill={skill} />
              ))}
            </Marquee>
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
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseModal()
            }}
            onWheel={(e) => {
              if (e.target === e.currentTarget) e.preventDefault()
            }}
            onTouchMove={(e) => {
              if (e.target === e.currentTarget) e.preventDefault()
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overscroll-contain"
          >
            <motion.div 
              ref={serviceModalRef}
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-2xl border border-[#E0E0E0] max-w-md w-full p-6 sm:p-8 relative overscroll-contain outline-none max-h-[90vh] overflow-y-auto"
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
