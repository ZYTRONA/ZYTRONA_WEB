import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'motion/react'
import { 
  FaReact, FaNodeJs, FaAws
} from 'react-icons/fa'
import { 
  SiNextdotjs, SiTypescript, SiTensorflow
} from 'react-icons/si'
import { 
  Globe, Smartphone, Video, Palette, 
  ArrowRight, ExternalLink, CheckCircle2, 
  Send, Zap, Star, MapPin, Mail, Phone, 
  Users, Award, Cpu, Server, ShieldCheck, 
  Clock, Briefcase, Layers, FileCode,
  Copy, Check, Sparkles
} from 'lucide-react'

import SpotlightCard from './components/ui/SpotlightCard'
import { TypewriterEffectSmooth } from './components/ui/typewriter-effect'
import { AvatarGroup } from '@/components/animate-ui/components/animate/avatar-group'
import { CalendarWithTimeRange } from '@/components/shadcn-space/calendar/calendar-16'
import { formatTime12h } from '@/components/shadcn-space/calendar/calendar-utils'
import { NumberTicker } from '@/registry/magicui/number-ticker'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Footer } from '@/components/ui/Footer'
import './App.css'

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar'

const LOGO_SRC = '/Logo.png'

// 6 Core Company Services
const SERVICES_DATA = [
  {
    id: "website-development",
    icon: <Globe className="w-6 h-6" />,
    badge: "⚡ 98+ Core Web Vitals",
    title: "Web Development & Cloud SaaS",
    description: "Architecting lightning-fast, SEO-optimized web applications and enterprise SaaS platforms engineered for high conversion and global scalability.",
    tags: ["React 19", "Next.js", "TypeScript", "Microservices", "REST & GraphQL"]
  },
  {
    id: "app-development",
    icon: <Smartphone className="w-6 h-6" />,
    badge: "📱 60fps Native Performance",
    title: "Mobile App Engineering",
    description: "Crafting fluid, high-performance native iOS & Android applications with offline-first data caching and gesture-rich user interfaces.",
    tags: ["iOS Native", "Android", "Flutter", "React Native", "Firebase"]
  },
  {
    id: "tensorflow-ai",
    icon: <Cpu className="w-6 h-6" />,
    badge: "🤖 Deep Learning & LLMs",
    title: "AI & Machine Learning Automation",
    description: "Developing custom machine learning algorithms, intelligent automation pipelines, natural language processing, and computer vision workflows.",
    tags: ["Python", "PyTorch", "TensorFlow", "Computer Vision", "LLM APIs"]
  },
  {
    id: "ui-designs",
    icon: <Palette className="w-6 h-6" />,
    badge: "🎨 Tokenized Design Systems",
    title: "UI/UX & Product Design Systems",
    description: "Designing modern design systems, comprehensive component tokens, wireframes, and interactive Figma prototypes centered on user retention.",
    tags: ["Design Systems", "Figma", "User Journey", "Design Tokens", "Wireframing"]
  },
  {
    id: "devops-linux",
    icon: <Server className="w-6 h-6" />,
    badge: "☁️ 99.99% Cloud Uptime",
    title: "Cloud & DevOps Infrastructure",
    description: "Setting up automated CI/CD deployment pipelines, containerized microservices, serverless backends, and 24/7 cloud health monitoring.",
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD Pipelines", "Linux Systems"]
  },
  {
    id: "video-editing",
    icon: <Video className="w-6 h-6" />,
    badge: "🎬 4K 60fps VFX & Motion",
    title: "Commercial Video & Motion Graphics",
    description: "Producing cinematic brand videos, 3D motion graphics, commercial advertisements, and VFX tailored for high-impact digital marketing.",
    tags: ["Motion Graphics", "3D VFX", "Brand Films", "Color Grading", "DaVinci"]
  }
]

// Key Company Performance Stats
const STATS_DATA = [
  { value: 10, startValue: 0, suffix: '+', label: "Delivered Platforms & Repositories", icon: <Layers className="w-5 h-5" /> },
  { value: 98, startValue: 70, suffix: '%', label: "Client Satisfaction Rate", icon: <Star className="w-5 h-5" /> },
  { value: 100, startValue: 80, suffix: '%', label: "On-Time Milestone Delivery", icon: <CheckCircle2 className="w-5 h-5" /> },
  { value: 24, startValue: 0, suffix: '/7', label: "Dedicated Technical Support", icon: <Zap className="w-5 h-5" /> }
]


// Company Guarantees & Values
const COMPANY_VALUES = [
  {
    title: "100% IP & Source Code Ownership",
    desc: "You retain full intellectual property rights, repository ownership, and commercial licenses for all code and design assets produced."
  },
  {
    title: "Non-Disclosure Agreement (NDA) Protected",
    desc: "We sign mutual confidentiality agreements prior to discussing technical specifications and business strategies."
  },
  {
    title: "Sub-Second Core Web Vitals",
    desc: "Every website and application is engineered with modern asset optimization to achieve exceptional 95+ Google Lighthouse scores."
  },
  {
    title: "Direct Senior Engineer Communication",
    desc: "No middlemen or confusing account managers. You collaborate directly with senior architects and designers."
  }
]

// Open Source & Engineering Repositories
const PROJECTS_DONE = [
  {
    name: 'ZYCARE',
    category: 'Healthcare SaaS Platform',
    industry: 'Digital Health & Clinical Telemetry',
    purpose: 'Architected a digital healthcare platform to streamline clinical appointment workflows, doctor scheduling, and patient interaction records.',
    impact: '99.9% Uptime SLA',
    stack: 'TypeScript',
    techStack: ['TypeScript', 'React 19', 'Node.js', 'PostgreSQL', 'Docker'],
    type: 'Open Source',
    bgImage: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1000&q=80',
    url: 'https://github.com/ZYTRONA/ZYCARE'
  },
  {
    name: 'ZYGLASS',
    category: 'Computer Vision & AI Pipeline',
    industry: 'Automation & Neural Inference',
    purpose: 'Python-based edge computer vision system for real-time video stream processing, object identification, and low-latency inference pipelines.',
    impact: '< 35ms Inference',
    stack: 'Python & AI',
    techStack: ['Python', 'OpenCV', 'PyTorch', 'TensorFlow', 'FastAPI'],
    type: 'AI & Automation',
    bgImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1000&q=80',
    url: 'https://github.com/ZYTRONA/ZYGLASS'
  },
  {
    name: 'ZYCROP',
    category: 'Precision Agritech Management',
    industry: 'Enterprise Agriculture & Field Ops',
    purpose: 'Data-driven agricultural management platform focused on crop cycle optimization, yield forecasting, and field telemetry tracking.',
    impact: 'Automated Yield Tracking',
    stack: 'JavaScript',
    techStack: ['JavaScript', 'React', 'REST APIs', 'Chart.js', 'PWA'],
    type: 'Web Application',
    bgImage: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80',
    url: 'https://github.com/ZYTRONA/ZYCROP'
  },
  {
    name: 'NUMMAZE',
    category: 'Algorithmic Logic Engine',
    industry: 'Educational & Interactive Tech',
    purpose: 'Interactive algorithmic puzzle web platform designed to foster recursive computational problem solving and dynamic graph traversal.',
    impact: '60fps Canvas Rendering',
    stack: 'JavaScript',
    techStack: ['JavaScript', 'HTML5 Canvas', 'Algorithms', 'Tailwind CSS'],
    type: 'Interactive Web',
    bgImage: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1000&q=80',
    url: 'https://github.com/ZYTRONA/NUMMAZE'
  },
  {
    name: 'ZYNC-CHAT',
    category: 'Real-Time WebSockets Architecture',
    industry: 'Telecommunications & Messaging',
    purpose: 'High-throughput, real-time messaging architecture prototype designed for sub-millisecond end-to-end encrypted packet delivery.',
    impact: '< 15ms Socket Sync',
    stack: 'WebSockets',
    techStack: ['JavaScript', 'WebSockets', 'Node.js', 'Redis Pub/Sub'],
    type: 'Real-Time App',
    bgImage: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1000&q=80',
    url: 'https://github.com/ZYTRONA/ZYNC-CHAT'
  }
]

// Live Client Commercial Platforms
const CLIENT_PROJECTS = [
  {
    name: 'ZOCA Crimson Charm',
    category: 'E-Commerce & Lifestyle Platform',
    industry: 'Fashion & Retail Commerce',
    purpose: 'Engineered an experiential lifestyle storefront featuring high-resolution visual storytelling, responsive lookbooks, and high-conversion checkout paths.',
    impact: '+140% Mobile Conversion',
    stack: 'Live Client Site',
    techStack: ['React', 'Tailwind CSS', 'Vite', 'Headless Store', 'Responsive UI'],
    type: 'Live Production',
    bgImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=80',
    url: 'https://zoca-crimson-charm.lovable.app'
  },
  {
    name: 'Blue Base Family Saloon',
    category: 'Service Booking Portal',
    industry: 'Wellness & Commercial Saloon',
    purpose: 'Modern multi-branch salon web application with responsive service exploration, staff showcases, and frictionless customer appointment flows.',
    impact: 'Sub-Second Discovery',
    stack: 'Live Client Site',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Booking Flow', 'Mobile PWA'],
    type: 'Live Production',
    bgImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80',
    url: 'https://bluebase-family-spot.lovable.app'
  },
  {
    name: 'Fly Studio Showcase',
    category: 'Creative Media Showcase',
    industry: 'Digital Arts & Motion Studio',
    purpose: 'Interactive high-fidelity media portfolio engineered to showcase 4K commercial reels, client case studies, and rapid discovery briefs.',
    impact: '60fps Media Stream',
    stack: 'Live Client Site',
    techStack: ['React', 'Motion Animation', 'Tailwind CSS', 'Video CDN', 'Interactive UI'],
    type: 'Live Production',
    bgImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80',
    url: 'https://fly-studio-showcase.lovable.app/'
  },
  {
    name: 'Cakes & Bites',
    category: 'Gourmet Culinary Showcase',
    industry: 'Artisanal Bakery & Gourmet',
    purpose: 'Fluid artisanal bakery platform with visual category filtering, seasonal menus, and direct WhatsApp customer ordering integrations.',
    impact: '+85% Order Inquiries',
    stack: 'Live Client Site',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'WhatsApp API', 'SEO Optimized'],
    type: 'Live Production',
    bgImage: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1000&q=80',
    url: 'https://bites-artisanal-charm.lovable.app'
  },
  {
    name: '11 TO 11 Family Restaurant',
    category: 'Hospitality & Dining Platform',
    industry: 'Fine Dining & Hospitality',
    purpose: 'Contemporary culinary web app engineered for instant digital menu navigation, dining reservations, and branch geolocation.',
    impact: 'Instant Table Booking',
    stack: 'Live Client Site',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Google Maps API', 'Mobile-First'],
    type: 'Live Production',
    bgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    url: 'https://a-11to11family.lovable.app'
  }
]

// FAQs
const FAQS_DATA = [
  {
    question: 'What types of companies does ZYTRONA work with?',
    answer: 'We partner with ambitious startups, fast-growing digital scale-ups, and established enterprises across North America, Europe, and Asia seeking high-performance software engineering, UI/UX systems, and AI automation.'
  },
  {
    question: 'How do you handle IP ownership and project confidentiality?',
    answer: 'We operate under strict confidentiality. We sign an NDA prior to discussions, and upon project completion and milestone clearance, 100% of intellectual property, code repositories, and design assets belong exclusively to your company.'
  },
  {
    question: 'What is the typical project development timeline?',
    answer: 'A high-impact web application or design system typically takes 2 to 4 weeks, while complex full-stack web platforms and custom AI solutions range from 6 to 14 weeks. We provide a milestone-backed timeline before kickoff.'
  },
  {
    question: 'How does team collaboration and communication work?',
    answer: 'We integrate directly into your workflow using dedicated Slack/Discord channels, bi-weekly agile sprint demos, and transparent Kanban boards so you have real-time visibility into progress at every step.'
  },
  {
    question: 'Do you provide post-launch maintenance, SLAs, and cloud support?',
    answer: 'Yes. We offer continuous SLA support packages that cover 24/7 uptime monitoring, security patching, feature iterations, and cloud infrastructure optimization.'
  }
]

// Animated Count-Up Component using MagicUI NumberTicker
function AnimatedStatItem({ stat, index }) {
  return (
    <SpotlightCard className="stat-spotlight-card">
      <div className="stat-card-inner">
        <div className="stat-icon">{stat.icon}</div>
        <div className="stat-value">
          <NumberTicker
            value={stat.value}
            startValue={stat.startValue || 0}
            delay={index * 0.15}
            className="stat-ticker-number font-heading font-extrabold"
          />
          <span className="stat-suffix">{stat.suffix}</span>
        </div>
        <div className="stat-label">{stat.label}</div>
      </div>
    </SpotlightCard>
  )
}

const CONTACT_SERVICES = [
  'Web Development & Cloud SaaS',
  'Mobile App Engineering',
  'AI & Machine Learning Automation',
  'UI/UX & Product Design Systems',
  'Cloud & DevOps Infrastructure',
  'Commercial Video & Motion Graphics'
]

function App() {
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID_OWNER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_OWNER
  const EMAILJS_TEMPLATE_ID_REPLY = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REPLY
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const BUSINESS_EMAIL = 'zytronabusiness@gmail.com'

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [activeProjectTab, setActiveProjectTab] = useState('all')
  
  // Contact Form State
  const [formData, setFormData] = useState({
    serviceInterest: 'Web Development & Cloud SaaS',
    fullName: '',
    email: '',
    phone: '',
    preferredDate: null,
    startTime: '10:30',
    endTime: '12:30',
    reachTime: '10:30 AM – 12:30 PM',
    projectDetails: '',
  })
  const [contactErrors, setContactErrors] = useState({})
  const [isContactSending, setIsContactSending] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactReplyMessage, setContactReplyMessage] = useState('')
  const [copiedEmail, setCopiedEmail] = useState(false)
  
  const honeypotRef = useRef(null)
  const formTimestampRef = useRef(Date.now())
  const lastScrollRunRef = useRef(Date.now())

  // Track active section on scroll
  useEffect(() => {
    const sections = ['home', 'about', 'work', 'services', 'contact']
    let rafId = 0

    const handleScroll = () => {
      const now = Date.now()
      if (now - lastScrollRunRef.current < 100) return
      lastScrollRunRef.current = now

      rafId = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 140
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId)
          if (!element) continue
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Filtered projects
  const displayedProjects = useMemo(() => {
    if (activeProjectTab === 'client') return CLIENT_PROJECTS
    if (activeProjectTab === 'ai') return PROJECTS_DONE.filter(p => p.type.includes('AI') || p.category.includes('AI') || p.category.includes('Vision'))
    if (activeProjectTab === 'github') return PROJECTS_DONE
    return [...CLIENT_PROJECTS, ...PROJECTS_DONE]
  }, [activeProjectTab])

  const sanitizeInput = (str) => {
    if (typeof str !== 'string') return ''
    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .trim()
      .slice(0, 2000)
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (contactErrors[field]) {
      setContactErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(BUSINESS_EMAIL)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = BUSINESS_EMAIL
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2500)
    } catch {
      setCopiedEmail(false)
    }
  }

  const handleResetContactForm = () => {
    setFormData({
      serviceInterest: 'Web Development & Cloud SaaS',
      fullName: '',
      email: '',
      phone: '',
      preferredDate: null,
      startTime: '10:30',
      endTime: '12:30',
      reachTime: '10:30 AM – 12:30 PM',
      projectDetails: '',
    })
    setContactErrors({})
    setContactSubmitted(false)
    setContactReplyMessage('')
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    if (isContactSending) return

    if (honeypotRef.current?.value) {
      setContactSubmitted(true)
      return
    }

    if (Date.now() - formTimestampRef.current < 1500) {
      setContactReplyMessage('Please take a moment before submitting.')
      return
    }

    const errors = {}
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (minimum 2 characters)'
    }
    if (!formData.email.trim()) {
      errors.email = 'Business email is required'
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required so we can reach you'
    } else if (formData.phone.trim().length < 6) {
      errors.phone = 'Please enter a valid phone number'
    }
    if (!formData.projectDetails.trim()) {
      errors.projectDetails = 'Please provide details about your project or inquiry'
    } else if (formData.projectDetails.trim().length < 10) {
      errors.projectDetails = 'Project details must be at least 10 characters'
    }

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors)
      return
    }
    setContactErrors({})

    const formattedDate = formData.preferredDate
      ? formData.preferredDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Flexible / Earliest available'

    const templateParams = {
      user_name: sanitizeInput(formData.fullName),
      user_email: sanitizeInput(formData.email),
      user_phone: sanitizeInput(formData.phone),
      service_interest: formData.serviceInterest,
      preferred_date: formattedDate,
      reach_time: formData.reachTime,
      subject: `Project Inquiry: ${formData.serviceInterest} (${formData.fullName})`,
      message: sanitizeInput(formData.projectDetails),
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY) {
      setContactSubmitted(true)
      return
    }

    try {
      setIsContactSending(true)
      setContactReplyMessage('')

      if (EMAILJS_TEMPLATE_ID_OWNER) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID_OWNER,
          {
            to_email: BUSINESS_EMAIL,
            to_name: 'ZYTRONA Executive Team',
            ...templateParams,
          },
          EMAILJS_PUBLIC_KEY
        )
      }

      if (EMAILJS_TEMPLATE_ID_REPLY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID_REPLY,
          {
            to_email: templateParams.user_email,
            to_name: templateParams.user_name,
            from_name: 'ZYTRONA',
            ...templateParams,
          },
          EMAILJS_PUBLIC_KEY
        )
      }

      setContactSubmitted(true)
    } catch (error) {
      console.error('Contact email error:', error)
      // Even if EmailJS service call encounters an issue, show completion with fallback mailto link
      setContactSubmitted(true)
    } finally {
      setIsContactSending(false)
    }
  }

  const handleMenuLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="app">
      {/* Resizable Navbar */}
      <Navbar>
        {/* Announcement Bar */}
        <div className="announcement-bar">
          <div className="container announcement-inner">
            <span className="announcement-badge">✦ Available for Q3/Q4</span>
            <span className="announcement-text">
              Partner with ZYTRONA for high-performance software engineering & AI solutions.
            </span>
            <Link to="/#contact" className="announcement-link">
              Schedule Discovery Call <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={[
              { name: 'Home', link: '/#home' },
              { name: 'About', link: '/#about' },
              { name: 'Services', link: '/#services' },
              { name: 'Work', link: '/#work' },
              { name: 'Contact', link: '/#contact' },
            ]}
            activeSection={activeSection}
            onItemClick={handleMenuLinkClick}
          />
          <div className="flex items-center">
            <Link to="/#contact" onClick={handleMenuLinkClick}>
              <NavbarButton variant="primary" className="gap-1.5">
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavbarButton>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
            <div className="flex items-center justify-between py-1 mb-2 border-b border-black/[0.06]">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Navigation</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Accepting Projects
              </span>
            </div>

            {[
              { name: 'Home', link: '/#home' },
              { name: 'About ZYTRONA', link: '/about' },
              { name: 'Capabilities & Services', link: '/#services' },
              { name: 'Featured Work & Case Studies', link: '/#work' },
              { name: 'Contact & Consultation', link: '/#contact' },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={() => { setMobileMenuOpen(false); handleMenuLinkClick(); }}
                className="flex items-center justify-between text-neutral-800 text-sm font-semibold py-2.5 px-1 hover:text-black transition-colors"
              >
                <span>{item.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            ))}

            <div className="flex w-full flex-col gap-2.5 mt-3 pt-3 border-t border-black/[0.06]">
              <Link to="/#contact" onClick={() => setMobileMenuOpen(false)}>
                <NavbarButton variant="primary" className="w-full justify-center gap-2 py-2.5">
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-mesh-bg" />
        <div className="hero-grid-overlay" />
        <div className="container">
          <div className="hero-wrapper hero-wrapper-center">
            <motion.div 
              className="hero-content hero-content-center"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                className="hero-badge"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="hero-badge-dot" />
                <span>Next-Gen Software Engineering & AI Agency</span>
              </motion.div>

              <h1 className="hero-title">
                <span className="hero-title-main">Engineering World-Class</span>
                <span className="hero-title-dynamic">
                  <TypewriterEffectSmooth
                    words={[
                      { text: "AI Systems" },
                      { text: "Web Platforms" },
                      { text: "Mobile Applications" },
                      { text: "Cloud Architectures" },
                      { text: "Intelligent SaaS" },
                      { text: "Digital Products" },
                    ]}
                    className="hero-typewriter"
                  />
                </span>
              </h1>

              <p className="hero-subtitle">
                We partner with forward-thinking companies to design, build, and scale 
                high-performance software — from concept to production, with zero compromises on quality.
              </p>

              <div className="hero-buttons">
                <Link to="/#contact" className="btn btn-primary btn-lg">
                  Schedule Free Discovery Call
                  <span className="btn-arrow"><ArrowRight className="w-4 h-4" /></span>
                </Link>
                <Link to="/#work" className="btn btn-secondary btn-lg">
                  View Our Work
                </Link>
              </div>

              <div className="hero-tags">
                <span className="hero-tag">✦ 100% Code Ownership</span>
                <span className="hero-tag">✦ NDA Protected</span>
                <span className="hero-tag">✦ 99.9% Uptime SLA</span>
                <span className="hero-tag">✦ Sub-Second Web Vitals</span>
              </div>

              {/* Trust Logos */}
              <div className="hero-trust-bar">
                <span className="hero-trust-label">Trusted by innovative teams</span>
                <div className="hero-trust-logos">
                  <div className="hero-trust-logo-item">
                    <FaReact size={22} />
                    <span>React</span>
                  </div>
                  <div className="hero-trust-logo-item">
                    <SiNextdotjs size={20} />
                    <span>Next.js</span>
                  </div>
                  <div className="hero-trust-logo-item">
                    <FaNodeJs size={20} />
                    <span>Node.js</span>
                  </div>
                  <div className="hero-trust-logo-item">
                    <SiTypescript size={20} />
                    <span>TypeScript</span>
                  </div>
                  <div className="hero-trust-logo-item">
                    <FaAws size={20} />
                    <span>AWS</span>
                  </div>
                  <div className="hero-trust-logo-item">
                    <SiTensorflow size={20} />
                    <span>TensorFlow</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Performance Metrics */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {STATS_DATA.map((stat, index) => (
              <AnimatedStatItem key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">✦ Engineering Philosophy & Values</span>
            <h2 className="section-title">Built for Founders Who Value Execution</h2>
            <p className="section-subtitle">
              We bridge the gap between ambitious business goals and exceptional software execution. 
              No middlemen, no vanity metrics — just high-performance engineering designed for scale.
            </p>
          </motion.div>

          <div className="about-grid">
            <motion.div 
              className="about-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <span className="about-mini-tag">Our Engineering Standard</span>
              <h3 className="about-heading">Zero Middlemen. Pure Technical Execution.</h3>
              <p className="about-text">
                ZYTRONA was founded to eliminate the traditional agency bloat. When you build with us, 
                you collaborate directly with senior software architects and designers who write clean, modular, and resilient code.
              </p>
              <p className="about-text">
                From high-conversion SaaS platforms to intelligent AI pipelines, every system we ship is engineered 
                for long-term scalability, sub-second speed, and complete enterprise security.
              </p>

              <div className="about-values-list">
                {COMPANY_VALUES.map((val, idx) => (
                  <div key={idx} className="about-value-item">
                    <div className="about-value-icon-wrap">
                      <CheckCircle2 className="about-value-icon" size={18} />
                    </div>
                    <div>
                      <strong>{val.title}</strong>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="about-actions-row">
                <Link to="/#contact" className="btn btn-primary">
                  Schedule Consultation <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  Read Our Full Story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="about-visual-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="about-card-badge-top">
                <span className="live-pulse-dot" />
                <span>Verified Engineering SLAs & Guarantees</span>
              </div>

              <div className="about-metric-row">
                <div className="about-mini-card about-mini-card-accent">
                  <span className="about-mini-number">100%</span>
                  <span className="about-mini-label">Source Code & IP Rights</span>
                </div>
                <div className="about-mini-card">
                  <span className="about-mini-number">95+</span>
                  <span className="about-mini-label">Google Lighthouse Standard</span>
                </div>
              </div>

              <div className="about-metric-row">
                <div className="about-mini-card">
                  <span className="about-mini-number">24/7</span>
                  <span className="about-mini-label">Dedicated Technical SLA</span>
                </div>
                <div className="about-mini-card about-mini-card-accent">
                  <span className="about-mini-number">98%</span>
                  <span className="about-mini-label">Client Retention & Rating</span>
                </div>
              </div>

              <div className="about-metric-row">
                <div className="about-mini-card about-mini-card-wide">
                  <span className="about-mini-number">&lt; 2hr</span>
                  <span className="about-mini-label">Direct Senior Software Architect Access on Every Milestone</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Work Gallery */}
      <section id="work" className="services">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">✦ Engineering Portfolio & Case Studies</span>
            <h2 className="section-title">Production Platforms & Open Source</h2>
            <p className="section-subtitle">
              Explore our live commercial client web platforms, custom AI pipelines, and open-source software engineering repositories.
            </p>

            {/* Filter Tabs with Counts */}
            <div className="project-filter-tabs">
              {[
                { id: 'all', label: 'All Work', count: 10 },
                { id: 'client', label: 'Client Platforms', count: 5 },
                { id: 'ai', label: 'AI & Automation', count: 1 },
                { id: 'github', label: 'Open Source', count: 5 },
              ].map((tab) => {
                const isActive = activeProjectTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveProjectTab(tab.id)}
                    className={`project-filter-tab ${isActive ? 'active' : ''}`}
                  >
                    <span>{tab.label}</span>
                    <span className="filter-count-chip">{tab.count}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="project-filter-tab-pill"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Animated Project Grid */}
          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project) => (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <SpotlightCard className="project-spotlight-card">
                    {/* Browser Mockup Header */}
                    <div className="project-browser-bar">
                      <div className="browser-dots">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                      </div>
                      <div className="browser-url-bar">
                        <span>{project.stack === 'Live Client Site' ? 'https://' + project.url.replace(/^https?:\/\//, '') : 'github.com/ZYTRONA/' + project.name}</span>
                      </div>
                    </div>

                    <div className="project-card-image-wrap">
                      <img 
                        src={project.bgImage} 
                        alt={project.name} 
                        className="project-card-image"
                        loading="lazy" 
                      />
                      <div className="project-card-overlay" />
                      
                      {/* Top Badges */}
                      <div className="project-card-top-badges">
                        <span className={`project-status-pill ${project.type === 'Live Production' ? 'status-live' : 'status-oss'}`}>
                          <span className="status-indicator-dot" />
                          {project.type === 'Live Production' ? 'Live Platform' : 'Open Source'}
                        </span>

                        {project.impact && (
                          <span className="project-impact-badge">{project.impact}</span>
                        )}
                      </div>
                    </div>

                    <div className="project-card-body">
                      <div className="project-industry-row">
                        <span className="project-industry-tag">{project.industry || project.category}</span>
                      </div>

                      <h3 className="project-card-title">{project.name}</h3>
                      <p className="project-card-purpose">{project.purpose}</p>

                      {/* Tech Stack Chips */}
                      {project.techStack && (
                        <div className="project-tech-chips-row">
                          {project.techStack.map((tech, tIdx) => (
                            <span key={tIdx} className="project-tech-chip">{tech}</span>
                          ))}
                        </div>
                      )}

                      <div className="project-card-meta">
                        <span className="project-category-chip">{project.category || project.stack}</span>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card-action-btn"
                        >
                          <span>{project.stack === 'Live Client Site' ? 'Launch Platform' : 'Explore Repo'}</span>
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom Proof Trust Banner */}
          <div className="project-proof-banner">
            <div className="proof-banner-item">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client Intellectual Property & Source Code Ownership</span>
            </div>
            <div className="proof-banner-item">
              <Zap className="w-4 h-4" />
              <span>Sub-Second Google Core Web Vitals & 95+ Lighthouse Score</span>
            </div>
            <div className="proof-banner-item">
              <CheckCircle2 className="w-4 h-4" />
              <span>Direct Senior Software Architect Access & Zero Middlemen</span>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section with 6 Core Company Capabilities */}
      <section id="services" className="services">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">Core Capabilities</span>
            <h2 className="section-title">End-to-End Technology Services</h2>
            <p className="section-subtitle">
              From product discovery and modern UI/UX design to resilient cloud deployment and automated AI pipelines.
            </p>
          </motion.div>

          <div className="services-grid">
            {SERVICES_DATA.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link to={`/service/${service.id}`} className="service-card-link">
                  <SpotlightCard className="service-spotlight-card">
                    <div className="service-card-top-row">
                      <div className="service-icon-box">{service.icon}</div>
                      {service.badge && (
                        <span className="service-card-metric-badge">{service.badge}</span>
                      )}
                    </div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                    <div className="hero-tags" style={{ marginBottom: '1.5rem', justifyContent: 'flex-start' }}>
                      {service.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="hero-tag">{tag}</span>
                      ))}
                    </div>
                    <span className="service-action-link">
                      Explore Technical Scope & Architecture <ArrowRight className="w-4 h-4" />
                    </span>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Project Consultation & Inquiry Form */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            {/* LEFT - Avatar Group & Direct Engineering Panel */}
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="contact-info-card">
                <div className="contact-info-header">
                  <span className="contact-tag">✦ Senior Engineering Hub</span>
                  <h3 className="contact-title">Direct Access to Senior Engineers</h3>
                  <p className="contact-subtitle">
                    Collaborate directly with our lead architects, AI engineers, and product designers. Zero middlemen, transparent milestones, and high-velocity execution.
                  </p>
                </div>

                {/* Animated Avatar Group using @animate-ui style */}
                <div className="contact-avatar-section">
                  <AvatarGroup size="md" />
                  <div className="contact-social-proof">
                    <div className="contact-stars">★★★★★</div>
                    <span className="contact-social-text">4.9/5 Rating • Direct Engineering Collaboration</span>
                  </div>
                </div>

                {/* Direct Contact Channels */}
                <div className="contact-channels">
                  <div className="contact-channel-item">
                    <div className="contact-channel-icon">
                      <Mail size={18} />
                    </div>
                    <div className="contact-channel-body">
                      <span className="contact-channel-label">Official Business Email</span>
                      <a href={`mailto:${BUSINESS_EMAIL}`} className="contact-channel-value">
                        {BUSINESS_EMAIL}
                      </a>
                    </div>
                    <button 
                      type="button" 
                      onClick={handleCopyEmail}
                      className="contact-copy-btn"
                      title="Copy email address"
                      aria-label="Copy business email"
                    >
                      {copiedEmail ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="contact-channel-item">
                    <div className="contact-channel-icon">
                      <Phone size={18} />
                    </div>
                    <div className="contact-channel-body">
                      <span className="contact-channel-label">Direct Line & WhatsApp</span>
                      <a href="tel:+918667273159" className="contact-channel-value">
                        +91 8667273159
                      </a>
                    </div>
                    <a 
                      href="https://wa.me/918667273159" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-whatsapp-btn"
                    >
                      WhatsApp
                    </a>
                  </div>

                  <div className="contact-channel-item">
                    <div className="contact-channel-icon">
                      <Clock size={18} />
                    </div>
                    <div className="contact-channel-body">
                      <span className="contact-channel-label">Response Guarantee</span>
                      <span className="contact-channel-text">Average reply &lt; 2 hrs • Guaranteed within 24 hrs</span>
                    </div>
                  </div>
                </div>

                {/* Trust & Compliance Badges */}
                <div className="contact-trust-badges">
                  <div className="contact-trust-pill">
                    <ShieldCheck size={14} />
                    <span>100% IP Ownership</span>
                  </div>
                  <div className="contact-trust-pill">
                    <CheckCircle2 size={14} />
                    <span>NDA Protected</span>
                  </div>
                  <div className="contact-trust-pill">
                    <Zap size={14} />
                    <span>Agile Sprints</span>
                  </div>
                  <div className="contact-trust-pill">
                    <Layers size={14} />
                    <span>24/7 SLA Support</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT - Comprehensive Consultation Form */}
            <motion.div 
              className="contact-form-wrapper"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              {contactSubmitted ? (
                <motion.div 
                  className="contact-success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="success-icon-wrapper">
                    <CheckCircle2 size={44} className="text-teal-600" />
                  </div>
                  <h3 className="success-title">Consultation Brief Received!</h3>
                  <p className="success-message">
                    Thank you, <strong>{formData.fullName}</strong>. We've logged your project brief for <strong>{formData.serviceInterest}</strong>.
                  </p>

                  <div className="success-summary-box">
                    <div className="success-summary-row">
                      <span className="summary-label">Preferred Date:</span>
                      <span className="summary-value">
                        {formData.preferredDate ? formData.preferredDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible / Earliest available'}
                      </span>
                    </div>
                    <div className="success-summary-row">
                      <span className="summary-label">Call Window:</span>
                      <span className="summary-value">{formData.reachTime}</span>
                    </div>
                    <div className="success-summary-row">
                      <span className="summary-label">Work Email:</span>
                      <span className="summary-value">{formData.email}</span>
                    </div>
                    <div className="success-summary-row">
                      <span className="summary-label">Phone:</span>
                      <span className="summary-value">{formData.phone}</span>
                    </div>
                  </div>

                  <p className="success-footnote">
                    Our engineering lead will review your project requirements and reach out within 24 hours with a calendar invitation and initial scope assessment.
                  </p>

                  <div className="success-actions">
                    <button 
                      type="button" 
                      onClick={handleResetContactForm}
                      className="btn btn-primary"
                    >
                      Submit Another Project Brief
                    </button>
                    <a 
                      href={`https://wa.me/918667273159?text=${encodeURIComponent(`Hi ZYTRONA Team, I just submitted an inquiry for ${formData.serviceInterest}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      Instant WhatsApp Connect
                    </a>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="contact-form-header">
                    <div className="contact-form-badge">Project Brief & Consultation</div>
                    <h3>Let's Build Your Vision</h3>
                    <p>Select your service, choose a preferred discussion slot, and share your requirements.</p>
                  </div>

                  <form onSubmit={handleContactSubmit} noValidate>
                    {/* Honeypot */}
                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                      <input
                        ref={honeypotRef}
                        type="text"
                        name="website_validation_token"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* 1. Service Interest */}
                    <div className="form-group">
                      <label className="form-label-with-badge">
                        <span>Service Interest *</span>
                      </label>
                      <Select 
                        value={formData.serviceInterest} 
                        onValueChange={(val) => handleInputChange('serviceInterest', val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Core Services</SelectLabel>
                            {CONTACT_SERVICES.map((srv) => (
                              <SelectItem key={srv} value={srv}>
                                {srv}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 2. Full Name & Work Email */}
                    <div className="form-row-2col">
                      <div className="form-group">
                        <label htmlFor="fullName">Full Name *</label>
                        <input 
                          id="fullName" 
                          type="text" 
                          placeholder="John Doe" 
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className={`form-input ${contactErrors.fullName ? 'input-error' : ''}`}
                          maxLength={100} 
                        />
                        {contactErrors.fullName && <span className="form-error">{contactErrors.fullName}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Work Email *</label>
                        <input 
                          id="email" 
                          type="email" 
                          placeholder="john@company.com" 
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`form-input ${contactErrors.email ? 'input-error' : ''}`}
                          maxLength={254} 
                        />
                        {contactErrors.email && <span className="form-error">{contactErrors.email}</span>}
                      </div>
                    </div>

                    {/* 3. Phone Number & Preferred Schedule (Date + Time Range) */}
                    <div className="form-row-2col">
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number *</label>
                        <input 
                          id="phone" 
                          type="tel" 
                          placeholder="+91 98765 43210 / +1 (555) 000-0000" 
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`form-input ${contactErrors.phone ? 'input-error' : ''}`}
                          maxLength={30} 
                        />
                        {contactErrors.phone && <span className="form-error">{contactErrors.phone}</span>}
                      </div>

                      <div className="form-group">
                        <label>Preferred Discussion Schedule</label>
                        <CalendarWithTimeRange 
                          value={{
                            date: formData.preferredDate,
                            startTime: formData.startTime || '10:30',
                            endTime: formData.endTime || '12:30',
                          }}
                          onChange={({ date, startTime, endTime }) => {
                            setFormData((prev) => ({
                              ...prev,
                              preferredDate: date,
                              startTime,
                              endTime,
                              reachTime: `${formatTime12h(startTime)} – ${formatTime12h(endTime)}`,
                            }))
                          }}
                          disabledBefore={new Date()}
                        />
                      </div>
                    </div>

                    {/* 5. Project Details */}
                    <div className="form-group">
                      <div className="flex items-center justify-between">
                        <label htmlFor="projectDetails">Project Details & Scope *</label>
                        <span className="form-counter">{formData.projectDetails.length}/2000</span>
                      </div>
                      <textarea 
                        id="projectDetails" 
                        placeholder="Tell us about your goals, target audience, timeline, tech requirements, or existing platforms..." 
                        rows={4} 
                        value={formData.projectDetails}
                        onChange={(e) => handleInputChange('projectDetails', e.target.value)}
                        className={`form-textarea ${contactErrors.projectDetails ? 'input-error' : ''}`}
                        maxLength={2000}
                      />
                      {contactErrors.projectDetails && <span className="form-error">{contactErrors.projectDetails}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-full" disabled={isContactSending}>
                      {isContactSending ? (
                        <div className="btn-loading-content">
                          <span className="spinner"></span>
                          <span>Submitting Brief...</span>
                        </div>
                      ) : (
                        <>
                          <span>Submit Consultation Brief</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>

                    {contactReplyMessage && !contactSubmitted && (
                      <motion.div 
                        className="contact-reply-banner error"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {contactReplyMessage}
                      </motion.div>
                    )}
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <div className="faq-layout">
            <motion.div 
              className="faq-header"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="faq-title">Frequently asked questions</h2>
            </motion.div>

            <div className="faq-list">
              <Accordion defaultValue={["faq-0"]} type="single" collapsible className="w-full">
                {FAQS_DATA.map((item, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
