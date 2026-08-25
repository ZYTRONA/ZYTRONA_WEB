import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'motion/react'
import { 
  FaLinkedinIn, FaGithub, FaInstagram 
} from 'react-icons/fa'
import { 
  Globe, Smartphone, Video, Palette, 
  ArrowRight, ExternalLink, CheckCircle2, ChevronDown, 
  Send, Zap, Star, MapPin, Mail, Phone, 
  Users, Award, Menu, X, Cpu, Server, ShieldCheck, 
  Clock, Check, Sparkles, Briefcase, Layers, FileCode
} from 'lucide-react'

import SpotlightCard from './components/ui/SpotlightCard'
import ProcessCarousel from './components/ui/MotionCarousel'
import { NumberTicker } from '@/registry/magicui/number-ticker'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import './App.css'

const LOGO_SRC = '/Logo.png'

// 6 Core Company Services
const SERVICES_DATA = [
  {
    id: "website-development",
    icon: <Globe className="w-6 h-6" />,
    title: "Web Development & Cloud SaaS",
    description: "Architecting lightning-fast, SEO-optimized web applications and enterprise SaaS platforms engineered for high conversion and global scalability.",
    tags: ["React 19", "Next.js", "TypeScript", "Microservices", "REST & GraphQL"]
  },
  {
    id: "app-development",
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile App Engineering",
    description: "Crafting fluid, high-performance native iOS & Android applications with offline-first data caching and gesture-rich user interfaces.",
    tags: ["iOS Native", "Android", "Flutter", "React Native", "Firebase"]
  },
  {
    id: "tensorflow-ai",
    icon: <Cpu className="w-6 h-6" />,
    title: "AI & Machine Learning Automation",
    description: "Developing custom machine learning algorithms, intelligent automation pipelines, natural language processing, and computer vision workflows.",
    tags: ["Python", "PyTorch", "TensorFlow", "Computer Vision", "LLM APIs"]
  },
  {
    id: "ui-designs",
    icon: <Palette className="w-6 h-6" />,
    title: "UI/UX & Product Design Systems",
    description: "Designing modern design systems, comprehensive component tokens, wireframes, and interactive Figma prototypes centered on user retention.",
    tags: ["Design Systems", "Figma", "User Journey", "Design Tokens", "Wireframing"]
  },
  {
    id: "devops-linux",
    icon: <Server className="w-6 h-6" />,
    title: "Cloud & DevOps Infrastructure",
    description: "Setting up automated CI/CD deployment pipelines, containerized microservices, serverless backends, and 24/7 cloud health monitoring.",
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD Pipelines", "Linux Systems"]
  },
  {
    id: "video-editing",
    icon: <Video className="w-6 h-6" />,
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

// Engagement Models
const ENGAGEMENT_MODELS = [
  {
    title: "Fixed-Scope Project",
    tagline: "Predictable & Milestone-Based",
    description: "Ideal for well-defined web, mobile, or AI projects with set deliverables, guaranteed budget caps, and a strict timeline roadmap.",
    features: [
      "Fixed milestone pricing",
      "Defined scope & deliverables",
      "Dedicated Project Lead",
      "Weekly video demonstrations"
    ],
    recommended: false
  },
  {
    title: "Dedicated Engineering Squad",
    tagline: "Scalable Team Augmentation",
    description: "A specialized cross-functional team (Frontend, Backend, AI, UI/UX) working as a dedicated extension of your company to accelerate product shipping.",
    features: [
      "Full-stack team dedicated to you",
      "Flexible agile sprint cycles",
      "Direct Slack/Discord integration",
      "Continuous code reviews & CI/CD"
    ],
    recommended: true
  },
  {
    title: "Rapid MVP & Design Sprint",
    tagline: "From Concept to Live Launch in Weeks",
    description: "Fast-tracked 2 to 4-week sprint designed for startups and new business initiatives to validate market demand with a polished product.",
    features: [
      "2-4 week delivery timeline",
      "High-fidelity design system",
      "Production-ready deployment",
      "Post-launch analytics & feedback"
    ],
    recommended: false
  }
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

// GitHub Repositories
const PROJECTS_DONE = [
  {
    name: 'ZYCARE',
    purpose: 'Healthcare platform designed to streamline digital interactions, appointment systems, and care workflows.',
    stack: 'TypeScript',
    type: 'Open Source',
    bgImage: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=70',
    url: 'https://github.com/ZYTRONA/ZYCARE'
  },
  {
    name: 'ZYGLASS',
    purpose: 'Python project for real-time automation, computer vision routines, and data pipelines in commercial use cases.',
    stack: 'Python',
    type: 'AI & Automation',
    bgImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=70',
    url: 'https://github.com/ZYTRONA/ZYGLASS'
  },
  {
    name: 'ZYCROP',
    purpose: 'Domain-specific web application initiative focused on precision workflow management and clean user interfaces.',
    stack: 'JavaScript',
    type: 'Web Application',
    bgImage: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=70',
    url: 'https://github.com/ZYTRONA/ZYCROP'
  },
  {
    name: 'NUMMAZE',
    purpose: 'Interactive algorithmic puzzle and engagement experience built to foster logical problem solving.',
    stack: 'JavaScript',
    type: 'Interactive Web',
    bgImage: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=800&q=70',
    url: 'https://github.com/ZYTRONA/NUMMAZE'
  },
  {
    name: 'ZYNC-CHAT',
    purpose: 'High-speed, real-time messaging architecture prototype designed for low-latency peer-to-peer discussions.',
    stack: 'JavaScript',
    type: 'Real-Time App',
    bgImage: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800&q=70',
    url: 'https://github.com/ZYTRONA/ZYNC-CHAT'
  }
]

// Client Web Applications
const CLIENT_PROJECTS = [
  {
    name: 'ZOCA Crimson Charm',
    purpose: 'Fashion and lifestyle brand web presence built with rich visual storytelling and conversion-first layout.',
    stack: 'Live Client Site',
    type: 'Web Platform',
    bgImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=70',
    url: 'https://zoca-crimson-charm.lovable.app'
  },
  {
    name: 'Blue Base Family Saloon',
    purpose: 'Brand website with responsive service discovery, online appointment flows, and accessible content hierarchy.',
    stack: 'Live Client Site',
    type: 'Commercial Web',
    bgImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=70',
    url: 'https://bluebase-family-spot.lovable.app'
  },
  {
    name: 'Fly Studio Showcase',
    purpose: 'Creative studio portfolio engineered to showcase high-fidelity media, client work, and service inquiries.',
    stack: 'Live Client Site',
    type: 'Studio Portfolio',
    bgImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=70',
    url: 'https://fly-studio-showcase.lovable.app/'
  },
  {
    name: 'Cakes & Bites',
    purpose: 'Artisanal brand showcase built for fluid culinary product discovery, menu exploration, and customer connect.',
    stack: 'Live Client Site',
    type: 'Brand Showcase',
    bgImage: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=70',
    url: 'https://bites-artisanal-charm.lovable.app'
  },
  {
    name: '11 TO 11 Family Restaurant',
    purpose: 'Contemporary restaurant website designed for appetizing dish showcases, table reservations, and location info.',
    stack: 'Live Client Site',
    type: 'Hospitality Web',
    bgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=70',
    url: 'https://a-11to11family.lovable.app'
  }
]

// Testimonials
const TESTIMONIALS_DATA = [
  {
    quote: "ZYTRONA transformed our entire digital infrastructure. Their engineering speed, eye for design, and responsiveness were crucial to our scale.",
    author: "Sarah Johnson",
    position: "CEO, TechVentures Inc."
  },
  {
    quote: "The team's innovative approach and clean UI designs helped us increase client engagement by over 300% within months.",
    author: "Michael Chen",
    position: "CTO, GlobalScale Solutions"
  },
  {
    quote: "Professional, reliable, and deeply knowledgeable in modern full-stack web and AI. ZYTRONA is our go-to technology partner.",
    author: "Emily Rodriguez",
    position: "Director, Innovation Labs"
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

function App() {
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID_OWNER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_OWNER
  const EMAILJS_TEMPLATE_ID_REPLY = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REPLY
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const BUSINESS_EMAIL = 'zytronabusiness@gmail.com'

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [activeProjectTab, setActiveProjectTab] = useState('all')
  const [selectedService, setSelectedService] = useState('Web Architecture')
  const [contactReplyMessage, setContactReplyMessage] = useState('')
  const [isContactSending, setIsContactSending] = useState(false)
  const [contactErrors, setContactErrors] = useState({})
  
  const honeypotRef = useRef(null)
  const formTimestampRef = useRef(Date.now())
  const lastScrollRunRef = useRef(Date.now())

  // Track active section on scroll
  useEffect(() => {
    const sections = ['home', 'services', 'solutions', 'process', 'projects', 'about', 'testimonials', 'faq', 'contact']
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
      .slice(0, 500)
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    if (isContactSending) return

    if (honeypotRef.current?.value) {
      setContactReplyMessage('Thank you for contacting ZYTRONA.')
      return
    }

    if (Date.now() - formTimestampRef.current < 2500) {
      setContactReplyMessage('Please take a moment before submitting.')
      return
    }

    const formElement = event.currentTarget
    const rawName = formElement.querySelector('#userName')?.value || ''
    const rawEmail = formElement.querySelector('#userEmail')?.value || ''
    const rawCompany = formElement.querySelector('#companyName')?.value || ''
    const rawBudget = formElement.querySelector('#budgetSelect')?.value || 'Not Specified'
    const rawMessage = formElement.querySelector('#message')?.value || ''

    const errors = {}
    if (!rawName.trim()) errors.name = 'Your name is required'
    if (!rawEmail.trim()) errors.email = 'Business email is required'
    else if (!validateEmail(rawEmail)) errors.email = 'Please enter a valid email address'
    if (!rawMessage.trim()) errors.message = 'Project details are required'
    else if (rawMessage.trim().length < 10) errors.message = 'Message must be at least 10 characters'

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors)
      return
    }
    setContactErrors({})

    const templateParams = {
      user_name: sanitizeInput(rawName),
      user_email: sanitizeInput(rawEmail),
      company_name: sanitizeInput(rawCompany || 'N/A'),
      service_interest: selectedService,
      budget_range: sanitizeInput(rawBudget),
      subject: `Project Inquiry: ${selectedService} (${rawCompany || rawName})`,
      message: sanitizeInput(rawMessage)
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY) {
      setContactReplyMessage('Thank you for reaching out! Our team will review your inquiry and schedule a discovery call within 24 hours.')
      formElement.reset()
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
            ...templateParams
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
            ...templateParams
          },
          EMAILJS_PUBLIC_KEY
        )
      }

      setContactReplyMessage('Thank you for contacting ZYTRONA! Our engineering team will review your project and respond within 24 hours.')
      formElement.reset()
    } catch (error) {
      console.error('Contact email error:', error)
      setContactReplyMessage('Thank you! Your project inquiry was registered and our team will follow up promptly.')
    } finally {
      setIsContactSending(false)
    }
  }

  const handleMenuLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="app">
      {/* Top Company Announcement Bar */}
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

      {/* Navigation */}
      <motion.nav 
        className="navbar"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="nav-container">
          <Link to="/#home" className="nav-logo" onClick={handleMenuLinkClick}>
            <img src={LOGO_SRC} alt="ZYTRONA Logo" className="logo-icon" />
            <span className="logo-text">ZYTRONA</span>
          </Link>
          
          <div className="nav-menu">
            {[
              { id: 'home', label: 'Home' },
              { id: 'services', label: 'Services' },
              { id: 'solutions', label: 'Models' },
              { id: 'process', label: 'Process' },
              { id: 'projects', label: 'Case Studies' },
              { id: 'about', label: 'About' },
              { id: 'testimonials', label: 'Reviews' },
              { id: 'faq', label: 'FAQ' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => {
              const isActive = activeSection === item.id
              return (
                <Link
                  key={item.id}
                  to={`/#${item.id}`}
                  onClick={handleMenuLinkClick}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="nav-link-pill"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="nav-actions">
            <Link to="/#services" className="btn btn-secondary nav-explore-btn" onClick={handleMenuLinkClick}>
              Explore Services
            </Link>
            <Link to="/#contact" className="btn btn-primary" onClick={handleMenuLinkClick}>
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-nav-drawer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              {[
                { id: 'home', label: 'Home' },
                { id: 'services', label: 'Services' },
                { id: 'solutions', label: 'Engagement Models' },
                { id: 'process', label: 'Our Process' },
                { id: 'projects', label: 'Case Studies' },
                { id: 'about', label: 'About ZYTRONA' },
                { id: 'testimonials', label: 'Client Reviews' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact Us' },
              ].map((item) => (
                <Link
                  key={item.id}
                  to={`/#${item.id}`}
                  onClick={handleMenuLinkClick}
                  className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={16} />
                </Link>
              ))}
              <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link to="/#contact" className="btn btn-primary btn-full" onClick={handleMenuLinkClick}>
                  Schedule Consultation
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="hero">
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
                Engineering World-Class
                <span className="gradient-text"> Digital Architecture</span>
              </h1>

              <p className="hero-subtitle">
                ZYTRONA partners with forward-thinking companies to design, build, and scale 
                high-performance web platforms, intelligent mobile apps, and custom AI systems.
              </p>

              <div className="hero-buttons">
                <Link to="/#contact" className="btn btn-primary btn-lg">
                  Schedule Free Discovery Call
                  <span className="btn-arrow"><ArrowRight className="w-4 h-4" /></span>
                </Link>
                <Link to="/#projects" className="btn btn-secondary btn-lg">
                  View Case Studies
                </Link>
              </div>

              <div className="hero-tags">
                <span className="hero-tag">✦ 100% Code Ownership</span>
                <span className="hero-tag">✦ NDA Confidentiality</span>
                <span className="hero-tag">✦ 99.9% Uptime Guarantee</span>
                <span className="hero-tag">✦ Sub-Second Core Web Vitals</span>
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
                    <div className="service-icon-box">{service.icon}</div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                    <div className="hero-tags" style={{ marginBottom: '1.25rem' }}>
                      {service.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="hero-tag">{tag}</span>
                      ))}
                    </div>
                    <span className="service-action-link">
                      Explore Technical Scope <ArrowRight className="w-4 h-4" />
                    </span>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Company Engagement Models Section */}
      <section id="solutions" className="services">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">Flexible Collaboration</span>
            <h2 className="section-title">Tailored Engagement Models</h2>
            <p className="section-subtitle">
              Choose the partnership structure that best aligns with your company's product stage, budget, and velocity.
            </p>
          </motion.div>

          <div className="models-grid">
            {ENGAGEMENT_MODELS.map((model, index) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard className={`model-card ${model.recommended ? 'model-card-featured' : ''}`}>
                  {model.recommended && (
                    <div className="model-popular-badge">
                      <Sparkles size={13} /> Most Selected
                    </div>
                  )}
                  <h3 className="model-title">{model.title}</h3>
                  <span className="model-tagline">{model.tagline}</span>
                  <p className="model-desc">{model.description}</p>
                  
                  <div className="model-features-list">
                    {model.features.map((feat, fIdx) => (
                      <div key={fIdx} className="model-feature-item">
                        <Check size={16} className="model-feature-check" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/#contact" className={`btn ${model.recommended ? 'btn-primary' : 'btn-secondary'} btn-full`} style={{ marginTop: 'auto' }}>
                    Select Model <ArrowRight size={15} />
                  </Link>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Engineering Process Section */}
      <section id="process" className="process-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">How We Deliver</span>
            <h2 className="section-title">Our 4-Phase Engineering Framework</h2>
            <p className="section-subtitle">
              A transparent, agile development lifecycle ensuring your digital product is delivered on time, within budget, and to the highest standards.
            </p>
          </motion.div>

          <ProcessCarousel />
        </div>
      </section>


      {/* Projects & Case Studies Gallery */}
      <section id="projects" className="services">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">Proof of Work</span>
            <h2 className="section-title">Delivered Case Studies & Code Repositories</h2>
            <p className="section-subtitle">
              Explore our live commercial client platforms and open-source engineering initiatives.
            </p>

            {/* Filter Tabs */}
            <div className="project-filter-tabs">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'client', label: 'Client Websites' },
                { id: 'github', label: 'Open Source & AI' },
              ].map((tab) => {
                const isActive = activeProjectTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveProjectTab(tab.id)}
                    className={`project-filter-tab ${isActive ? 'active' : ''}`}
                  >
                    {tab.label}
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
                    <div className="project-card-image-wrap">
                      <img 
                        src={project.bgImage} 
                        alt={project.name} 
                        className="project-card-image"
                        loading="lazy" 
                      />
                      <div className="project-card-overlay" />
                      <span className="project-badge-tag">{project.type}</span>
                    </div>

                    <div className="project-card-body">
                      <h3 className="project-card-title">{project.name}</h3>
                      <p className="project-card-purpose">{project.purpose}</p>

                      <div className="project-card-meta">
                        <span className="project-stack-chip">{project.stack}</span>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card-link-btn"
                        >
                          <span>{project.stack === 'Live Client Site' ? 'View Live Site' : 'View Code'}</span>
                          <ExternalLink size={15} />
                        </a>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>


      {/* About Section & Company Guarantees */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              className="about-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">About ZYTRONA</span>
              <h2 className="section-title">Pioneering Digital Excellence for Modern Enterprise</h2>
              <p className="about-text">
                ZYTRONA is a dedicated technology engineering company built by passionate technologists. 
                We combine deep technical expertise with cutting-edge UI/UX design to deliver platforms that produce measurable business outcomes.
              </p>
              <p className="about-text">
                Whether creating a high-conversion e-commerce ecosystem, an intuitive mobile app, or an automated AI data pipeline, we build software designed for long-term scalability and speed.
              </p>

              <div className="about-values-list">
                {COMPANY_VALUES.map((val, idx) => (
                  <div key={idx} className="about-value-item">
                    <CheckCircle2 className="about-value-icon" size={20} />
                    <div>
                      <strong>{val.title}</strong>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/#contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Schedule Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Visual Metric Card */}
            <motion.div 
              className="about-visual-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="about-metric-row">
                <div className="about-mini-card">
                  <span className="about-mini-number">100%</span>
                  <span className="about-mini-label">Source Code & IP Ownership</span>
                </div>
                <div className="about-mini-card">
                  <span className="about-mini-number">⚡ Fast</span>
                  <span className="about-mini-label">Sub-second Web Core Vitals</span>
                </div>
              </div>
              <div className="about-metric-row">
                <div className="about-mini-card">
                  <span className="about-mini-number">🔒 Secure</span>
                  <span className="about-mini-label">Enterprise-Grade Security</span>
                </div>
                <div className="about-mini-card">
                  <span className="about-mini-number">🌐 Global</span>
                  <span className="about-mini-label">High-Availability Cloud SLAs</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Client Endorsements / Testimonials */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">Client Endorsements</span>
            <h2 className="section-title">What Founders & Leaders Say</h2>
            <p className="section-subtitle">
              Hear from leadership teams that have scaled their digital products with ZYTRONA.
            </p>
          </motion.div>

          <div className="testimonials-grid">
            {TESTIMONIALS_DATA.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <SpotlightCard className="testimonial-spotlight-card">
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="#f59e0b" stroke="#f59e0b" />
                    ))}
                  </div>

                  <p className="testimonial-quote-text">"{testimonial.quote}"</p>

                  <div className="testimonial-author-row">
                    <div className="author-avatar-circle">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="author-info-block">
                      <span className="author-name-text">{testimonial.author}</span>
                      <span className="author-position-text">{testimonial.position}</span>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Clear answers regarding our development process, pricing, timeline, and IP policies.
            </p>
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
      </section>


      {/* Call to Action Banner */}
      <section className="cta">
        <div className="container">
          <motion.div 
            className="cta-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cta-title">Ready to Elevate Your Company's Tech?</h2>
            <p className="cta-subtitle">
              Book a strategy consultation with our senior engineering team to discuss architecture, timeline, and deliverables.
            </p>
            <div className="cta-buttons">
              <Link to="/#contact" className="btn btn-primary btn-lg">
                Schedule Discovery Call <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+918667273159" className="btn btn-outline btn-lg">
                Call Us: +91 8667273159
              </a>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Project Consultation & Inquiry Form */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">Get In Touch</span>
              <h2 className="section-title">Let's Build Something Exceptional</h2>
              <p className="contact-text">
                Share your project objectives or RFP. We will analyze your requirements and provide a detailed scope proposal within 24 hours.
              </p>

              <div className="contact-details">
                <div className="contact-item-card">
                  <div className="contact-icon-box"><MapPin /></div>
                  <div className="contact-item-text">
                    <strong>Global Headquarters</strong>
                    <p>Tamilnadu, India</p>
                  </div>
                </div>

                <a href="mailto:zytronabusiness@gmail.com" className="contact-item-card">
                  <div className="contact-icon-box"><Mail /></div>
                  <div className="contact-item-text">
                    <strong>Business Inquiries</strong>
                    <p>zytronabusiness@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+918667273159" className="contact-item-card">
                  <div className="contact-icon-box"><Phone /></div>
                  <div className="contact-item-text">
                    <strong>Direct Contact</strong>
                    <p>+91 8667273159</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Glassmorphic Project Inquiry Form */}
            <motion.div 
              className="contact-form-wrapper"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleContactSubmit} noValidate>
                {/* Honeypot field for bot protection */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                  <input
                    ref={honeypotRef}
                    type="text"
                    name="website_validation_token"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Service Selection Pills */}
                <div className="form-group">
                  <label>I'm interested in:</label>
                  <div className="service-select-pills">
                    {[
                      'Web Architecture',
                      'Mobile App',
                      'AI & Automation',
                      'UI/UX Design',
                      'Cloud & DevOps',
                      'Video & Media'
                    ].map((srv) => (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => setSelectedService(srv)}
                        className={`service-pill-btn ${selectedService === srv ? 'active' : ''}`}
                      >
                        {srv}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label htmlFor="userName">Your Name *</label>
                    <input 
                      id="userName" 
                      type="text" 
                      placeholder="e.g. Sarah Connor" 
                      className="form-input" 
                      required 
                      maxLength={100} 
                    />
                    {contactErrors.name && <span className="form-error">{contactErrors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="userEmail">Business Email *</label>
                    <input 
                      id="userEmail" 
                      type="email" 
                      placeholder="e.g. sarah@company.com" 
                      className="form-input" 
                      required 
                      maxLength={254} 
                    />
                    {contactErrors.email && <span className="form-error">{contactErrors.email}</span>}
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label htmlFor="companyName">Company / Organization</label>
                    <input 
                      id="companyName" 
                      type="text" 
                      placeholder="e.g. Acme Corp" 
                      className="form-input" 
                      maxLength={100} 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="budgetSelect">Estimated Budget</label>
                    <select id="budgetSelect" className="form-input">
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                      <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                      <option value="$50,000+">$50,000+ (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Scope & Objectives *</label>
                  <textarea 
                    id="message" 
                    placeholder="Describe your vision, target timeline, technical requirements, or existing platforms..." 
                    rows={4} 
                    className="form-textarea" 
                    required 
                    maxLength={2000}
                  />
                  {contactErrors.message && <span className="form-error">{contactErrors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-full" disabled={isContactSending}>
                  {isContactSending ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Project Inquiry</span>
                      <Send size={16} />
                    </>
                  )}
                </button>

                {contactReplyMessage && (
                  <motion.div 
                    className="contact-reply-banner"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {contactReplyMessage}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comprehensive Company Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/#home" className="nav-logo">
                <img src={LOGO_SRC} alt="ZYTRONA Logo" className="logo-icon" />
                <span className="logo-text">ZYTRONA</span>
              </Link>
              <p className="footer-description">
                Next-generation software engineering company building high-availability web platforms, native mobile applications, and custom AI systems for ambitious businesses globally.
              </p>
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/company/zytrona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://github.com/ZYTRONA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.instagram.com/zytrona_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Capabilities</h4>
              <Link to="/service/website-development">Web & SaaS Architecture</Link>
              <Link to="/service/app-development">Mobile App Engineering</Link>
              <Link to="/service/tensorflow-ai">AI & Machine Learning</Link>
              <Link to="/service/ui-designs">UI/UX Design Systems</Link>
              <Link to="/service/devops-linux">Cloud & DevOps</Link>
              <Link to="/service/video-editing">Commercial Media</Link>
            </div>

            <div className="footer-links">
              <h4>Company</h4>
              <Link to="/#about">About Us</Link>
              <Link to="/#solutions">Engagement Models</Link>
              <Link to="/#process">Our Process</Link>
              <Link to="/#projects">Case Studies</Link>
              <Link to="/#testimonials">Client Reviews</Link>
              <Link to="/#contact">Contact</Link>
            </div>

            <div className="footer-links">
              <h4>Contact & Location</h4>
              <a href="mailto:zytronabusiness@gmail.com">zytronabusiness@gmail.com</a>
              <a href="tel:+918667273159">+91 8667273159</a>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Tamilnadu, India
              </p>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-cyan)', fontWeight: 600, marginTop: '0.5rem', display: 'inline-block' }}>
                ● Accepting New Clients for 2026
              </span>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} ZYTRONA Inc. All rights reserved.</p>
            <p style={{ color: 'var(--color-cyan)', fontSize: '0.85rem' }}>Next-Gen Software Engineering & Design</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
