import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { 
  ArrowRight, Globe, Smartphone, Palette, 
  Layers, Star, CheckCircle2, Zap,
  Menu, X, Check, ExternalLink, Sparkles, Calendar, Mail, Phone,
  Loader2, AlertCircle
} from 'lucide-react'
import { 
  ZytronaLogo, 
  ZytronaHeroIllustration, 
  ZytronaEngineeringIllustration, 
  ZytronaCloudArchitectureIllustration, 
  ShowcaseBadge 
} from './components/ZytronaFigmaAssets'
import { SiteNavbar } from './components/ui/resizable-navbar'
import { Footer } from './components/ui/Footer'
import { NumberTicker } from './components/ui/number-ticker'
import { SpotlightCard } from './components/ui/SpotlightCard'
import { CustomSelect } from './components/ui/CustomSelect'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { sendEmail } from './lib/emailService'
import './App.css'

// 2 Core ZYTRONA Capabilities (Boxy Cards)
const CORE_SERVICES = [
  {
    id: 'web-development',
    title: 'Web & Enterprise SaaS Platforms',
    description: 'Architecting lightning-fast React 19 & Next.js platforms, multi-tenant databases, and microservices engineered for 98+ Core Web Vitals and global scalability.',
    link: '/service/website-development',
    icon: (
      <svg className="w-8 h-8 text-[#4CAF4F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="22" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10z"></path>
      </svg>
    )
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Product Design Systems',
    description: 'Crafting comprehensive Figma design token libraries, interactive component prototypes, and conversion-optimized user journeys that eliminate friction.',
    link: '/service/ui-designs',
    icon: (
      <svg className="w-8 h-8 text-[#4CAF4F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5"></circle>
        <circle cx="17.5" cy="10.5" r=".5"></circle>
        <circle cx="8.5" cy="7.5" r=".5"></circle>
        <circle cx="6.5" cy="12.5" r=".5"></circle>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
      </svg>
    )
  }
]

// Animated Number Counter using UI library NumberTicker with spring physics
function AnimatedStatNumber({ value, suffix = '' }) {
  return (
    <span className="inline-flex items-center">
      <NumberTicker value={value} className="text-2xl sm:text-3xl font-extrabold text-[#263238]" />
      <span>{suffix}</span>
    </span>
  )
}

// ZYTRONA Production Case Studies & Insights
const INSIGHTS_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=700&q=80',
    title: 'Blue Base Family Saloon: High-Impact Brand & Booking Web App',
    category: 'Booking Web App',
    linkText: 'View Live Site',
    linkUrl: 'https://bluebase-family-spot.lovable.app'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=80',
    title: 'Fly Studio Showcase: Interactive Portfolio Architecture & Design System',
    category: 'Portfolio & Design System',
    linkText: 'View Live Site',
    linkUrl: 'https://fly-studio-showcase.lovable.app/'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=80',
    title: 'Scaling ZOCA Crimson Charm: +140% Mobile Conversion via Sub-Second UX',
    category: 'E-Commerce Platform',
    linkText: 'View Live Site',
    linkUrl: 'https://zoca-crimson-charm.lovable.app'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80',
    title: 'Cakes & Bites: Gourmet Culinary Showcase & WhatsApp Ordering Portal',
    category: 'Culinary Showcase',
    linkText: 'View Live Site',
    linkUrl: 'https://bites-artisanal-charm.lovable.app'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',
    title: '11 TO 11 Family Restaurant: Multi-Cuisine Interactive Dining Experience',
    category: 'Restaurant Platform',
    linkText: 'View Live Site',
    linkUrl: 'https://a-11to11family.lovable.app'
  }
]

// 2 Dynamic Hero Slides
const HERO_SLIDES = [
  {
    id: 0,
    title: 'Next-Gen Software Engineering',
    highlight: 'Built for Scale & Impact',
    description: 'We engineer high-performance web platforms, scalable SaaS architectures, and enterprise AI automation with 100% intellectual property ownership and milestone-backed delivery.',
    primaryCta: { label: 'Start a Project', action: 'project' },
    secondaryCta: { label: 'Explore Capabilities', href: '#services', isRouterLink: false },
    illustration: <ZytronaHeroIllustration className="w-full max-w-[480px]" />
  },
  {
    id: 1,
    title: 'Full-Stack Cloud & System Architecture',
    highlight: 'Enterprise Reliability & Microservices',
    description: 'Architecting resilient cloud systems, automated CI/CD pipelines, and high-throughput microservices designed for 99.9% uptime, data integrity, and seamless global scalability.',
    primaryCta: { label: 'Start a Project', action: 'project' },
    secondaryCta: { label: 'View Case Studies', href: '#insights', isRouterLink: false },
    illustration: <ZytronaEngineeringIllustration className="w-full max-w-[440px]" />
  }
]

export default function App() {
  const [heroSlide, setHeroSlide] = useState(0)
  const [isHeroHovered, setIsHeroHovered] = useState(false)

  // Auto-advance hero slides every 6 seconds, pausing when hovered
  useEffect(() => {
    if (isHeroHovered) return

    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isHeroHovered])

  // Interactive Project Inquiry & Consultation Modals
  const [modalType, setModalType] = useState(null) // 'project' | 'consultation' | 'learnMore'
  const [formSuccess, setFormSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    service: 'Web & Enterprise SaaS Platforms',
    projectScope: ''
  })
  const modalContainerRef = useRef(null)
  const previousActiveElement = useRef(null)

  // Lock both root and body scrolling + prevent layout shift when modal is open
  useEffect(() => {
    if (modalType) {
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
  }, [modalType])

  const handleOpenModal = (type) => {
    setModalType(type)
    setFormSuccess(false)
    setFormError(null)
    setIsSubmitting(false)
  }

  const handleCloseModal = () => {
    setModalType(null)
    setFormSuccess(false)
    setFormError(null)
    setIsSubmitting(false)
    setFormData({
      fullName: '',
      email: '',
      service: 'Web & Enterprise SaaS Platforms',
      projectScope: ''
    })
  }

  // Focus trap & Escape key handling
  useEffect(() => {
    if (!modalType) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleCloseModal()
        return
      }

      if (e.key === 'Tab' && modalContainerRef.current) {
        const focusable = Array.from(
          modalContainerRef.current.querySelectorAll(
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
          if (document.activeElement === firstElement || !modalContainerRef.current.contains(document.activeElement)) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement || !modalContainerRef.current.contains(document.activeElement)) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalType])

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    const result = await sendEmail(formData)
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
      <SiteNavbar onStartProject={() => handleOpenModal('project')} />

      {/* 2. HERO SECTION */}
      <section 
        id="home" 
        className="bg-[#F5F7FA] dark:bg-[#11141A] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 px-5 sm:px-6 lg:px-16 overflow-hidden transition-colors"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        aria-roledescription="carousel"
        aria-label="Hero Highlights"
      >
        <div className="max-w-7xl mx-auto min-h-[420px] sm:min-h-[460px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroSlide}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Left: Headline & Actions */}
              <div className="lg:col-span-7 space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#263238] dark:text-[#F8FAFC] tracking-tight leading-[1.18]">
                  {HERO_SLIDES[heroSlide].title} <br />
                  <span className="text-[#4CAF4F]">{HERO_SLIDES[heroSlide].highlight}</span>
                </h1>

                <p className="text-base sm:text-lg text-[#717171] dark:text-[#94A3B8] max-w-xl leading-relaxed">
                  {HERO_SLIDES[heroSlide].description}
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button 
                    onClick={() => handleOpenModal(HERO_SLIDES[heroSlide].primaryCta.action)}
                    className="btn-nexcent-primary text-base px-8 py-3.5 cursor-pointer"
                  >
                    <span>{HERO_SLIDES[heroSlide].primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  {HERO_SLIDES[heroSlide].secondaryCta.isRouterLink ? (
                    <Link 
                      to={HERO_SLIDES[heroSlide].secondaryCta.href}
                      className="btn-nexcent-secondary text-base px-8 py-3.5 cursor-pointer inline-flex items-center"
                    >
                      {HERO_SLIDES[heroSlide].secondaryCta.label}
                    </Link>
                  ) : (
                    <a 
                      href={HERO_SLIDES[heroSlide].secondaryCta.href}
                      className="btn-nexcent-secondary text-base px-8 py-3.5 cursor-pointer inline-flex items-center"
                    >
                      {HERO_SLIDES[heroSlide].secondaryCta.label}
                    </a>
                  )}
                </div>
              </div>

              {/* Right: Isometric Illustration */}
              <div className="lg:col-span-5 flex justify-center">
                {HERO_SLIDES[heroSlide].illustration}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-2 mt-12" role="tablist" aria-label="Hero slide indicators">
          {HERO_SLIDES.map((slide, idx) => (
            <button 
              key={slide.id}
              onClick={() => setHeroSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                heroSlide === idx 
                  ? 'w-7 h-2.5 bg-[#4CAF4F]' 
                  : 'w-2.5 h-2.5 bg-[#BDBDBD] dark:bg-[#374151] hover:bg-[#81C784]'
              }`}
              aria-label={`Slide ${idx + 1}: ${slide.title}`}
              aria-selected={heroSlide === idx}
              role="tab"
            />
          ))}
        </div>
      </section>


      {/* 4. CORE SERVICES (3 Boxy Cards: Manage your entire ecosystem) */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 px-5 sm:px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#263238] max-w-2xl mx-auto leading-snug">
            Manage your entire digital ecosystem in a single system
          </h2>
          <p className="text-[#717171] text-sm sm:text-base">Full-cycle engineering tailored for ambitious brands and scalable startups</p>
        </div>

        {/* 2 Boxy Feature Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {CORE_SERVICES.map((srv) => (
            <SpotlightCard 
              key={srv.id} 
              className="boxy-card p-6 sm:p-8 lg:p-10 h-full flex flex-col"
            >
              <div className="flex-1 flex flex-col items-center text-center">
                {/* Modern Squircle Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9]/60 flex items-center justify-center mb-5 text-[#4CAF4F] shadow-sm group-hover:scale-105 transition-transform duration-300">
                  {srv.icon}
                </div>

                <h3 className="text-2xl font-bold text-[#263238] leading-tight mb-3 min-h-[60px] flex items-center justify-center">
                  {srv.title}
                </h3>

                <p className="text-[#717171] text-sm leading-relaxed mb-6">
                  {srv.description}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-[#F0F0F0] w-full flex justify-center">
                <Link 
                  to={srv.link} 
                  className="inline-flex items-center gap-2 text-[#4CAF4F] font-bold text-sm hover:text-[#388E3C] transition-colors group/link"
                >
                  <span>Learn Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 5. ENGINEERING NARRATIVE SECTION */}
      <section id="architecture" className="py-12 sm:py-16 lg:py-24 px-5 sm:px-6 lg:px-16 bg-white border-t border-[#F0F0F0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <ZytronaEngineeringIllustration className="w-full max-w-[320px] sm:max-w-[440px]" />
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#263238] leading-snug">
              The engineering standards behind every ZYTRONA platform
            </h2>

            <p className="text-[#717171] text-sm sm:text-base leading-relaxed">
              We operate without the typical agency overhead. Every platform we build is hardened for high-throughput traffic, achieves 98+ Google Lighthouse vitals, and comes with full repository IP handover and mutual NDA protection.
            </p>

            <button 
              onClick={() => handleOpenModal('learnMore')}
              className="btn-nexcent-primary"
            >
              Explore Our Capabilities
            </button>
          </div>
        </div>
      </section>

      {/* 6. STATS SECTION (Helping modern businesses reinvent themselves) */}
      <section id="stats" className="bg-[#F5F7FA] py-12 sm:py-16 lg:py-20 px-5 sm:px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Narrative */}
          <div className="lg:col-span-5 space-y-2 sm:space-y-3 text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#263238] leading-snug">
              Helping ambitious businesses <br className="hidden sm:inline" />
              <span className="text-[#4CAF4F]">scale and reinvent themselves</span>
            </h2>
            <p className="text-[#717171] text-xs sm:text-base">
              Milestone-backed delivery powered by experienced software engineers and transparent agile sprints.
            </p>
          </div>

          {/* Right: 2x2 Stats Grid on mobile & desktop */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-8 lg:gap-10">
            {/* Stat 1: Delivered Platforms */}
            <div className="flex items-center gap-2.5 sm:gap-4 p-3 sm:p-0 bg-white/70 sm:bg-transparent rounded-lg sm:rounded-none border border-[#E0E0E0]/60 sm:border-0">
              <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-[#4CAF4F] shrink-0">
                <Layers className="w-7 h-7 sm:w-10 sm:h-10" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-3xl font-extrabold text-[#263238]">
                  <AnimatedStatNumber value={10} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-[#717171] leading-tight">Production Platforms</div>
              </div>
            </div>

            {/* Stat 2: Client Satisfaction */}
            <div className="flex items-center gap-2.5 sm:gap-4 p-3 sm:p-0 bg-white/70 sm:bg-transparent rounded-lg sm:rounded-none border border-[#E0E0E0]/60 sm:border-0">
              <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-[#4CAF4F] shrink-0">
                <Star className="w-7 h-7 sm:w-10 sm:h-10" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-3xl font-extrabold text-[#263238]">
                  <AnimatedStatNumber value={98} suffix="%" />
                </div>
                <div className="text-xs sm:text-sm text-[#717171] leading-tight">Client Satisfaction</div>
              </div>
            </div>

            {/* Stat 3: On-Time Delivery */}
            <div className="flex items-center gap-2.5 sm:gap-4 p-3 sm:p-0 bg-white/70 sm:bg-transparent rounded-lg sm:rounded-none border border-[#E0E0E0]/60 sm:border-0">
              <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-[#4CAF4F] shrink-0">
                <CheckCircle2 className="w-7 h-7 sm:w-10 sm:h-10" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-3xl font-extrabold text-[#263238]">
                  <AnimatedStatNumber value={100} suffix="%" />
                </div>
                <div className="text-xs sm:text-sm text-[#717171] leading-tight">On-Time Milestones</div>
              </div>
            </div>

            {/* Stat 4: Technical Support */}
            <div className="flex items-center gap-2.5 sm:gap-4 p-3 sm:p-0 bg-white/70 sm:bg-transparent rounded-lg sm:rounded-none border border-[#E0E0E0]/60 sm:border-0">
              <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-[#4CAF4F] shrink-0">
                <Zap className="w-7 h-7 sm:w-10 sm:h-10" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-3xl font-extrabold text-[#263238]">
                  <AnimatedStatNumber value={24} suffix="/7" />
                </div>
                <div className="text-xs sm:text-sm text-[#717171] leading-tight">Continuous SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ARCHITECTURE SHOWCASE */}
      <section className="py-12 sm:py-16 lg:py-24 px-5 sm:px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Cloud Architecture Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <ZytronaCloudArchitectureIllustration className="w-full max-w-[320px] sm:max-w-[440px]" />
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#263238] leading-snug">
              Scalable microservices, sub-second latency, and zero regressions
            </h2>

            <p className="text-[#717171] text-sm sm:text-base leading-relaxed">
              From PostgreSQL schema optimization and Redis pub/sub WebSockets to Dockerized microservices and automated CI/CD deployment pipelines, our production standards ensure your platform scales effortlessly under heavy real-world traffic.
            </p>

            <button 
              onClick={() => handleOpenModal('learnMore')}
              className="btn-nexcent-primary"
            >
              Learn About Our Stack
            </button>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIAL / COMMERCIAL SPOTLIGHT */}
      <section id="testimonials" className="bg-[#F5F7FA] py-12 sm:py-16 lg:py-20 px-5 sm:px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Showcase Badge with Logo */}
          <div className="lg:col-span-4 flex justify-center">
            <ShowcaseBadge className="w-full max-w-[220px] sm:max-w-[280px]" />
          </div>

          {/* Right: Client Quote */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5">
            <p className="text-[#717171] text-xs sm:text-base leading-relaxed italic">
              "ZYTRONA engineered our entire e-commerce platform with precision. The sub-second loading speeds, fluid animations, and streamlined checkout flows boosted our customer conversion by over 140%. Working directly with their senior engineers made the launch effortless."
            </p>

            <div>
              <div className="text-[#4CAF4F] font-bold text-base sm:text-lg">Aravindhan K.</div>
              <div className="text-[#89939E] text-xs sm:text-sm">Founder &amp; Director, ZOCA Crimson Charm</div>
            </div>

            {/* Client Logos & Link Row (Interactive Badges with live links) */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 border-t border-[#E0E0E0]">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[#263238] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <a 
                  href="https://zoca-crimson-charm.lovable.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#4CAF4F] whitespace-nowrap px-2.5 py-1 rounded bg-[#E8F5E9]/80 border border-[#C8E6C9]/60 hover:bg-[#E8F5E9] hover:scale-105 transition-all inline-flex items-center gap-1"
                  title="View ZOCA Crimson Charm Live Site"
                >
                  <span>ZOCA</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a 
                  href="https://bluebase-family-spot.lovable.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whitespace-nowrap px-2.5 py-1 rounded bg-white border border-[#E0E0E0] hover:border-[#4CAF4F] hover:text-[#4CAF4F] hover:scale-105 transition-all inline-flex items-center gap-1"
                  title="View Blue Base Live Site"
                >
                  <span>BLUE BASE</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a 
                  href="https://fly-studio-showcase.lovable.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whitespace-nowrap px-2.5 py-1 rounded bg-white border border-[#E0E0E0] hover:border-[#4CAF4F] hover:text-[#4CAF4F] hover:scale-105 transition-all inline-flex items-center gap-1"
                  title="View Fly Studio Live Site"
                >
                  <span>FLY STUDIO</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a 
                  href="https://bites-artisanal-charm.lovable.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whitespace-nowrap px-2.5 py-1 rounded bg-white border border-[#E0E0E0] hover:border-[#4CAF4F] hover:text-[#4CAF4F] hover:scale-105 transition-all inline-flex items-center gap-1"
                  title="View Cakes &amp; Bites Live Site"
                >
                  <span>CAKES &amp; BITES</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a 
                  href="https://a-11to11family.lovable.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whitespace-nowrap px-2.5 py-1 rounded bg-white border border-[#E0E0E0] hover:border-[#4CAF4F] hover:text-[#4CAF4F] hover:scale-105 transition-all inline-flex items-center gap-1"
                  title="View 11 TO 11 Restaurant Live Site"
                >
                  <span>11 TO 11</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>

              <a 
                href="#insights" 
                className="inline-flex items-center gap-2 text-[#4CAF4F] font-bold text-sm sm:text-base hover:text-[#388E3C] transition-colors"
              >
                <span>Explore all case studies</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. INSIGHTS & ENGINEERING CASE STUDIES (Aliased with #work) */}
      <section id="insights" className="py-12 sm:py-16 lg:py-24 px-5 sm:px-6 lg:px-16 bg-white relative">
        <div id="work" className="absolute -top-24 left-0 w-full pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center space-y-2.5 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
            <span>Verified Case Studies</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#263238]">
            Engineering Insights &amp; Production Case Studies
          </h2>
          <p className="text-[#717171] text-xs sm:text-base max-w-2xl mx-auto">
            Explore live commercial platforms engineered by our senior software team. Click any card to launch the live site.
          </p>
        </div>

        {/* 5 Case Study Cards with Complete Links & No Text Cut-Off */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 items-stretch">
          {INSIGHTS_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center h-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4CAF4F] rounded-2xl no-underline"
              aria-label={`View live site for ${post.title}`}
            >
              {/* Image with zoom effect and category pill */}
              <div className="w-full h-52 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-[#E5E7EB] bg-neutral-100 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 dark:bg-[#15181E]/95 backdrop-blur-xs text-[11px] font-bold text-[#263238] dark:text-[#F8FAFC] border border-[#E0E0E0] shadow-xs">
                  {post.category}
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 dark:bg-[#15181E]/95 backdrop-blur-xs flex items-center justify-center text-[#4CAF4F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xs border border-[#E0E0E0]">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>

              {/* Overlapping Card: Full text visible, no ellipsis cut-off */}
              <div className="relative -mt-10 sm:-mt-14 w-[92%] sm:w-[90%] bg-white dark:bg-[#15181E] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md sm:shadow-lg border border-[#E5E7EB] dark:border-[#232936] flex flex-col justify-between min-h-[140px] sm:min-h-[160px] group-hover:border-[#4CAF4F] transition-all">
                <h4 className="text-sm sm:text-base font-bold text-[#263238] dark:text-[#F8FAFC] leading-snug mb-3 text-left group-hover:text-[#4CAF4F] transition-colors break-words">
                  {post.title}
                </h4>

                <div className="mt-auto pt-2.5 sm:pt-3 border-t border-[#F0F0F0] dark:border-[#232936] w-full flex items-center justify-between text-[#4CAF4F] font-bold text-xs sm:text-sm">
                  <span>{post.linkText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 10. COMMUNITY / CTA BANNER (Nexcent standard) */}
      <section className="bg-[#F5F7FA] py-12 sm:py-16 lg:py-20 px-5 sm:px-6 lg:px-16 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight leading-tight">
            Ready to engineer your next <br /> high-performance platform?
          </h2>

          <p className="text-base text-[#717171] max-w-xl mx-auto">
            Connect directly with our senior software architects. Transparent roadmap, 100% IP ownership, and zero agency fluff.
          </p>

          <div className="pt-2">
            <button 
              onClick={() => handleOpenModal('project')}
              className="btn-nexcent-primary text-base px-8 py-3.5"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <Footer />

      {/* INTERACTIVE MODALS */}
      <AnimatePresence>
        {modalType && (
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
              ref={modalContainerRef}
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

            {modalType === 'project' && (
              <div>
                <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#4CAF4F] flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#263238] mb-2">Start a Project with ZYTRONA</h3>
                <p className="text-sm text-[#717171] mb-6">
                  100% IP ownership, transparent milestone delivery, and mutual NDA protection.
                </p>

                {formSuccess ? (
                  <div className="p-4 bg-[#E8F5E9] border border-[#C8E6C9] rounded-md text-center text-[#2E7D32]">
                    <Check className="w-8 h-8 mx-auto mb-2 text-[#4CAF4F]" />
                    <p className="font-bold">Inquiry Sent Successfully!</p>
                    <p className="text-xs mt-1">Our engineering team will review your project and reply within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitForm} className="space-y-4">
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
                        placeholder="Alex Morgan" 
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
                        placeholder="alex@company.com" 
                        className="w-full px-3.5 py-2.5 rounded border border-[#E0E0E0] text-sm focus:border-[#4CAF4F] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263238] uppercase mb-1.5">Capability Needed</label>
                      <CustomSelect 
                        value={formData.service}
                        onChange={(val) => setFormData({...formData, service: val})}
                        options={[
                          'Web & Enterprise SaaS Platforms',
                          'UI/UX & Design Systems',
                          'Cloud & DevOps Architecture',
                          'AI Automation & Neural Pipelines'
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263238] uppercase mb-1">Project Scope / Details</label>
                      <textarea 
                        rows={3}
                        value={formData.projectScope}
                        onChange={(e) => setFormData({...formData, projectScope: e.target.value})}
                        placeholder="Briefly describe your goals, required features, or timeline..." 
                        className="w-full px-3.5 py-2 rounded border border-[#E0E0E0] text-xs focus:border-[#4CAF4F] focus:outline-none resize-none"
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
                          <span>Sending Project Brief...</span>
                        </>
                      ) : (
                        <span>Submit Project Brief</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {modalType === 'learnMore' && (
              <div>
                <h3 className="text-2xl font-bold text-[#263238] mb-3">About ZYTRONA Engineering</h3>
                <p className="text-sm text-[#717171] leading-relaxed mb-4">
                  ZYTRONA is a full-cycle software engineering and digital product agency. We engineer web platforms, enterprise SaaS, and UI/UX design systems with transparent milestone execution.
                </p>
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2 text-sm text-[#263238]">
                    <Check className="w-4 h-4 text-[#4CAF4F]" />
                    <span>100% IP & Source Code Handover</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#263238]">
                    <Check className="w-4 h-4 text-[#4CAF4F]" />
                    <span>Sub-Second Google Core Web Vitals (98+)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#263238]">
                    <Check className="w-4 h-4 text-[#4CAF4F]" />
                    <span>Transparent Milestone Tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#263238]">
                    <Check className="w-4 h-4 text-[#4CAF4F]" />
                    <span>Strict Mutual Non-Disclosure Agreements</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => { handleCloseModal(); handleOpenModal('project'); }} 
                    className="flex-1 btn-nexcent-primary py-2.5"
                  >
                    Start a Project
                  </button>
                  <button 
                    onClick={handleCloseModal} 
                    className="btn-nexcent-secondary py-2.5 px-5"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
