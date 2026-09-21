import { useState, useEffect } from 'react'
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
  ZytronaMobileSecurityIllustration, 
  ZytronaClientLogosRow, 
  ShowcaseBadge 
} from './components/ZytronaFigmaAssets'
import { Footer } from './components/ui/Footer'
import { NumberTicker } from './components/ui/number-ticker'
import { SpotlightCard } from './components/ui/SpotlightCard'
import { CustomSelect } from './components/ui/CustomSelect'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { sendEmail } from './lib/emailService'
import './App.css'

// 3 Core ZYTRONA Capabilities (Boxy Cards)
const CORE_SERVICES = [
  {
    id: 'web-development',
    title: 'Web & Enterprise SaaS Platforms',
    description: 'Architecting lightning-fast React 19 & Next.js platforms, multi-tenant databases, and microservices engineered for 98+ Core Web Vitals and global scalability.',
    link: '/service/website-development',
    icon: (
      <svg className="w-8 h-8 text-[#4CAF4F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    )
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Engineering',
    description: 'Engineering fluid, 60fps native iOS & Android applications with offline-first local caching, biometric security, and gesture-rich user interfaces.',
    link: '/service/app-development',
    icon: (
      <svg className="w-8 h-8 text-[#4CAF4F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
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
    linkText: 'View Live Site',
    linkUrl: 'https://bluebase-family-spot.lovable.app'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=80',
    title: 'Fly Studio Showcase: Interactive Portfolio Architecture & Design System',
    linkText: 'View Live Site',
    linkUrl: 'https://fly-studio-showcase.lovable.app/'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=80',
    title: 'Scaling ZOCA Crimson Charm: +140% Mobile Conversion via Sub-Second UX',
    linkText: 'View Live Site',
    linkUrl: 'https://zoca-crimson-charm.lovable.app'
  }
]

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('home')
  const [heroSlide, setHeroSlide] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      {/* 1. TOP NAVBAR (Always visible while scrolling) */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0B0D0F]/95 backdrop-blur-md border-b border-[#E0E0E0] dark:border-[#232936] transition-all duration-200 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link to="/" className="flex items-center">
            <ZytronaLogo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <a 
              href="#home" 
              onClick={() => setActiveNav('home')}
              className={`text-[15px] font-medium transition-colors ${activeNav === 'home' ? 'text-[#4CAF4F] font-semibold' : 'text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]'}`}
            >
              Home
            </a>
            <a 
              href="#services" 
              onClick={() => setActiveNav('services')}
              className={`text-[15px] font-medium transition-colors ${activeNav === 'services' ? 'text-[#4CAF4F] font-semibold' : 'text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]'}`}
            >
              Services
            </a>
            <a 
              href="#architecture" 
              onClick={() => setActiveNav('architecture')}
              className={`text-[15px] font-medium transition-colors ${activeNav === 'architecture' ? 'text-[#4CAF4F] font-semibold' : 'text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]'}`}
            >
              Engineering
            </a>
            <a 
              href="#insights" 
              onClick={() => setActiveNav('insights')}
              className={`text-[15px] font-medium transition-colors ${activeNav === 'insights' ? 'text-[#4CAF4F] font-semibold' : 'text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]'}`}
            >
              Case Studies
            </a>
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
              onClick={() => handleOpenModal('project')}
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
              className="p-2 text-[#263238] dark:text-[#E2E8F0] hover:text-[#4CAF4F] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#15181E] border-b border-[#E0E0E0] dark:border-[#232936] px-6 py-5 shadow-lg space-y-4 animate-in slide-in-from-top-2">
            <a 
              href="#home" 
              onClick={() => { setActiveNav('home'); setMobileMenuOpen(false); }}
              className="block text-base font-medium text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
            >
              Home
            </a>
            <a 
              href="#services" 
              onClick={() => { setActiveNav('services'); setMobileMenuOpen(false); }}
              className="block text-base font-medium text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
            >
              Services
            </a>
            <a 
              href="#architecture" 
              onClick={() => { setActiveNav('architecture'); setMobileMenuOpen(false); }}
              className="block text-base font-medium text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
            >
              Engineering
            </a>
            <a 
              href="#insights" 
              onClick={() => { setActiveNav('insights'); setMobileMenuOpen(false); }}
              className="block text-base font-medium text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
            >
              Case Studies
            </a>
            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
            >
              About
            </Link>
            <button 
              onClick={() => { setMobileMenuOpen(false); handleOpenModal('project'); }}
              className="w-full btn-nexcent-primary mt-2"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="bg-[#F5F7FA] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 px-5 sm:px-6 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#263238] tracking-tight leading-[1.18]">
              Next-Gen Software Engineering <br />
              <span className="text-[#4CAF4F]">Built for Scale & Impact</span>
            </h1>

            <p className="text-base sm:text-lg text-[#717171] max-w-xl leading-relaxed">
              We engineer high-performance web platforms, fluid 60fps mobile applications, and enterprise AI automation with 100% intellectual property ownership and milestone-backed delivery.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button 
                onClick={() => handleOpenModal('project')}
                className="btn-nexcent-primary text-base px-8 py-3.5"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="#services"
                className="btn-nexcent-secondary text-base px-8 py-3.5"
              >
                Explore Capabilities
              </a>
            </div>
          </div>

          {/* Right: Isometric Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <ZytronaHeroIllustration className="w-full max-w-[480px]" />
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button 
            onClick={() => setHeroSlide(0)}
            className={`transition-all duration-300 rounded-full ${heroSlide === 0 ? 'w-6 h-2.5 bg-[#4CAF4F]' : 'w-2.5 h-2.5 bg-[#BDBDBD] hover:bg-[#81C784]'}`}
            aria-label="Slide 1"
          />
          <button 
            onClick={() => setHeroSlide(1)}
            className={`transition-all duration-300 rounded-full ${heroSlide === 1 ? 'w-6 h-2.5 bg-[#4CAF4F]' : 'w-2.5 h-2.5 bg-[#BDBDBD] hover:bg-[#81C784]'}`}
            aria-label="Slide 2"
          />
          <button 
            onClick={() => setHeroSlide(2)}
            className={`transition-all duration-300 rounded-full ${heroSlide === 2 ? 'w-6 h-2.5 bg-[#4CAF4F]' : 'w-2.5 h-2.5 bg-[#BDBDBD] hover:bg-[#81C784]'}`}
            aria-label="Slide 3"
          />
        </div>
      </section>

      {/* 3. OUR CLIENTS SECTION */}
      <section className="py-10 sm:py-14 px-5 sm:px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-3 mb-10">
          <h2 className="text-3xl font-bold text-[#263238]">Our Commercial & Production Platforms</h2>
          <p className="text-[#717171] text-base">Trusted by high-growth startups and established enterprises across industries</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <ZytronaClientLogosRow />
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

        {/* 3 Boxy Feature Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {CORE_SERVICES.map((srv) => (
            <SpotlightCard 
              key={srv.id} 
              spotlightColor="rgba(76, 175, 79, 0.12)"
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
                <div className="text-xs sm:text-sm text-[#717171] truncate">Production Platforms</div>
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
                <div className="text-xs sm:text-sm text-[#717171] truncate">Client Satisfaction</div>
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
                <div className="text-xs sm:text-sm text-[#717171] truncate">On-Time Milestones</div>
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
                <div className="text-xs sm:text-sm text-[#717171] truncate">Continuous SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ARCHITECTURE SHOWCASE */}
      <section className="py-12 sm:py-16 lg:py-24 px-5 sm:px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Mobile Security Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <ZytronaMobileSecurityIllustration className="w-full max-w-[320px] sm:max-w-[440px]" />
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
              "ZYTRONA engineered our entire e-commerce platform with precision. The sub-second loading speeds, fluid animations, and mobile-first checkout flows boosted our mobile conversion by over 140%. Working directly with their senior engineers made the launch effortless."
            </p>

            <div>
              <div className="text-[#4CAF4F] font-bold text-base sm:text-lg">Aravindhan K.</div>
              <div className="text-[#89939E] text-xs sm:text-sm">Founder &amp; Director, ZOCA Crimson Charm</div>
            </div>

            {/* Client Logos & Link Row (Responsive Badges so text never clips) */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 border-t border-[#E0E0E0]">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[#263238] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <span className="text-[#4CAF4F] whitespace-nowrap px-2.5 py-1 rounded bg-[#E8F5E9]/70 border border-[#C8E6C9]/60">ZOCA</span>
                <span className="whitespace-nowrap px-2.5 py-1 rounded bg-white border border-[#E0E0E0]">BLUE BASE</span>
                <span className="whitespace-nowrap px-2.5 py-1 rounded bg-white border border-[#E0E0E0]">FLY STUDIO</span>
                <span className="whitespace-nowrap px-2.5 py-1 rounded bg-white border border-[#E0E0E0]">CAKES &amp; BITES</span>
                <span className="whitespace-nowrap px-2.5 py-1 rounded bg-white border border-[#E0E0E0]">11 TO 11</span>
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

      {/* 9. INSIGHTS & ENGINEERING CASE STUDIES */}
      <section id="insights" className="py-12 sm:py-16 lg:py-24 px-5 sm:px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-2.5 mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#263238]">
            Engineering Insights &amp; Production Case Studies
          </h2>
          <p className="text-[#717171] text-xs sm:text-base max-w-2xl mx-auto">
            Read technical breakdowns from our senior engineering team on modern software architecture, AI inference pipelines, and conversion-driven design systems.
          </p>
        </div>

        {/* 3 Blog Cards with Overlapping Floating White Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 items-stretch">
          {INSIGHTS_POSTS.map((post) => (
            <div key={post.id} className="relative flex flex-col items-center h-full">
              {/* Image */}
              <div className="w-full h-48 sm:h-72 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Overlapping Boxy Card */}
              <div className="relative -mt-10 sm:-mt-16 w-[92%] sm:w-[90%] bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md sm:shadow-lg border border-[#E5E7EB] text-center flex flex-col items-center justify-between min-h-[140px] sm:min-h-[170px] hover:border-[#4CAF4F]/50 transition-all">
                <h4 className="text-sm sm:text-base font-bold text-[#263238] leading-snug line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 flex-1 flex items-center justify-center">
                  {post.title}
                </h4>

                <div className="mt-auto pt-2.5 sm:pt-3 border-t border-[#F0F0F0] w-full flex justify-center">
                  {post.linkUrl.startsWith('http') ? (
                    <a 
                      href={post.linkUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 sm:gap-2 text-[#4CAF4F] font-bold text-xs sm:text-sm hover:text-[#388E3C] transition-colors"
                    >
                      <span>{post.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                  ) : (
                    <Link 
                      to={post.linkUrl}
                      className="inline-flex items-center gap-1.5 sm:gap-2 text-[#4CAF4F] font-bold text-xs sm:text-sm hover:text-[#388E3C] transition-colors"
                    >
                      <span>{post.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
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
                          'Mobile App Engineering',
                          'UI/UX & Design Systems',
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
                  ZYTRONA is a full-cycle software engineering and digital product agency. We engineer web platforms, mobile apps, and UI/UX design systems with transparent milestone execution.
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
