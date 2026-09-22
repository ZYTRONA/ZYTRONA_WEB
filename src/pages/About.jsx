import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ZytronaLogo, ZytronaEngineeringIllustration } from '@/components/ZytronaFigmaAssets'
import { SiteNavbar } from '@/components/ui/resizable-navbar'
import { Footer } from '@/components/ui/Footer'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { CustomSelect } from '@/components/ui/CustomSelect'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { 
  ShieldCheck, 
  Zap, 
  Users, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Layers, 
  Check, 
  X,
  Menu,
  Briefcase,
  Search,
  UserCheck,
  Send,
  Globe,
  HeartHandshake,
  Cpu,
  Target,
  Clock,
  Compass,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import { sendEmail } from '@/lib/emailService'
import '@/App.css'

// 3. What Makes Us Different
const DIFFERENTIATORS = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#4CAF4F]" />,
    title: 'Strict Vetting & Quality Control',
    desc: 'Only the top 3% of developers and designers make it through our rigorous technical audits, code reviews, and live architecture assessments.'
  },
  {
    icon: <Lock className="w-8 h-8 text-[#4CAF4F]" />,
    title: 'Fair Milestone Protection',
    desc: 'Clear milestone agreements guarantee that freelancers get compensated reliably on delivery, and clients only pay for verified, approved work.'
  },
  {
    icon: <Cpu className="w-8 h-8 text-[#4CAF4F]" />,
    title: 'Specialized High-Impact Talent',
    desc: 'We focus exclusively on modern software disciplines: React/Next.js platforms, tokenized UI/UX systems, microservices, and scalable cloud APIs.'
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-[#4CAF4F]" />,
    title: 'Transparent Collaboration',
    desc: 'No bidding wars, no hidden platform commissions, and no middlemen. Work directly through dedicated Slack and Discord communication channels.'
  }
]

// 4. How It Works (4 Steps)
const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Post a Project or Apply',
    desc: 'Companies describe their technical goals and scope. Freelancers showcase their verified portfolio and specialized stack.',
    icon: <Search className="w-6 h-6 text-[#4CAF4F]" />
  },
  {
    step: '02',
    title: 'Fast, Precision Matching',
    desc: 'Our curated matching connects clients with vetted specialists within 48 hours — eliminating endless interviews.',
    icon: <UserCheck className="w-6 h-6 text-[#4CAF4F]" />
  },
  {
    step: '03',
    title: 'Milestone-Backed Sprints',
    desc: 'Work begins in disciplined 2-week agile sprints with milestone escrow protection and live staging previews.',
    icon: <Clock className="w-6 h-6 text-[#4CAF4F]" />
  },
  {
    step: '04',
    title: 'Review, Approval & Handover',
    desc: 'Client verifies the milestone deliverable, payments release smoothly, and 100% IP and repository code is transferred.',
    icon: <CheckCircle2 className="w-6 h-6 text-[#4CAF4F]" />
  }
]

// 6. Our Core Values
const CORE_VALUES = [
  {
    title: 'Radical Transparency',
    desc: 'Open communication, honest timelines, and crystal-clear milestone definitions with zero hidden platform markups.'
  },
  {
    title: 'Fair Compensation',
    desc: 'Honoring exceptional craftsmanship with industry-leading compensation and prompt, guaranteed milestone payouts.'
  },
  {
    title: 'Quality Over Quantity',
    desc: 'We curate a selective network of proven specialists rather than hosting bloated directories of unvetted profiles.'
  },
  {
    title: 'Continuous Craftsmanship',
    desc: 'Staying at the frontier of modern frameworks, sub-second performance, accessible design, and clean code architecture.'
  },
  {
    title: 'Mutual Marketplace Respect',
    desc: 'Treating both independent talent and client organizations as equal, long-term partners in building great products.'
  }
]

// 7. Leadership Team
const LEADERSHIP_TEAM = [
  {
    name: 'Aadhiasarana T',
    role: 'Founder',
    specialty: 'Product Vision, Engineering Strategy & Operations',
    bio: 'Directs company vision, technical roadmap, and milestone-backed delivery standards across all ZYTRONA client engagements.',
    tags: ['Product Vision', 'Leadership', 'System Strategy', 'Marketplace'],
    initials: 'AT',
    linkedin: 'https://www.linkedin.com/company/zytrona'
  },
  {
    name: 'Jeevanantham P',
    role: 'Frontend Developer',
    specialty: 'React 19, Next.js, Modern UI/UX Architecture',
    bio: 'Specializes in high-performance web platforms, scalable design token systems, and sub-second Core Web Vitals optimizations.',
    tags: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    initials: 'JP',
    linkedin: 'https://www.linkedin.com/company/zytrona'
  },
  {
    name: 'Jeeva S',
    role: 'Cloud & Systems Engineer',
    specialty: 'Distributed Systems, Cloud Microservices & Scalability',
    bio: 'Architects resilient cloud microservices, real-time WebSockets synchronization, and high-throughput distributed database systems.',
    tags: ['Docker', 'Kubernetes', 'Node.js', 'WebSockets'],
    initials: 'JS',
    linkedin: 'https://www.linkedin.com/company/zytrona'
  },
  {
    name: 'Harivikram S',
    role: 'Backend & Cloud',
    specialty: 'Distributed Microservices, Scalable APIs & Cloud Infra',
    bio: 'Architects resilient backend systems, PostgreSQL database schemas, Redis caching layers, and automated Docker/AWS pipelines.',
    tags: ['Node.js', 'PostgreSQL', 'Docker', 'AWS Cloud'],
    initials: 'HS',
    linkedin: 'https://www.linkedin.com/company/zytrona'
  }
]

export default function About() {
  const [modalType, setModalType] = useState(null) // 'hire' | 'freelancer'
  const [formSuccess, setFormSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)
  const [hireFormData, setHireFormData] = useState({
    fullName: '',
    email: '',
    talentNeeded: 'Full-Stack Web Engineers (React/Next.js)',
    projectScope: ''
  })
  const [careerFormData, setCareerFormData] = useState({
    fullName: '',
    email: '',
    primaryDiscipline: 'Full-Stack Web Development',
    portfolio: ''
  })
  const aboutModalRef = useRef(null)
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

  // Focus trap & Escape key handling
  useEffect(() => {
    if (!modalType) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleCloseModal()
        return
      }

      if (e.key === 'Tab' && aboutModalRef.current) {
        const focusable = Array.from(
          aboutModalRef.current.querySelectorAll(
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
          if (document.activeElement === firstElement || !aboutModalRef.current.contains(document.activeElement)) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement || !aboutModalRef.current.contains(document.activeElement)) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalType])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

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
    setHireFormData({
      fullName: '',
      email: '',
      talentNeeded: 'Full-Stack Web Engineers (React/Next.js)',
      projectScope: ''
    })
    setCareerFormData({
      fullName: '',
      email: '',
      primaryDiscipline: 'Full-Stack Web Development',
      portfolio: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    const payload = modalType === 'hire'
      ? { ...hireFormData, service: hireFormData.talentNeeded, type: 'Talent Hire Request' }
      : { ...careerFormData, role: careerFormData.primaryDiscipline, type: 'Freelancer Application' }

    const result = await sendEmail(payload)
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
      <SiteNavbar onStartProject={() => handleOpenModal('hire')} />

      {/* SECTION 1: HERO / OPENING SECTION */}
      <section className="bg-[#F5F7FA] pt-32 pb-20 px-6 lg:px-16 border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Headline & Introduction */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#4CAF4F]" />
              <span>Vetted Talent & Engineering Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#263238] tracking-tight leading-[1.18]">
              Connecting exceptional freelancers with companies that <br className="hidden sm:inline" />
              <span className="text-[#4CAF4F]">demand real results</span>
            </h1>

            <p className="text-base sm:text-lg text-[#717171] max-w-xl leading-relaxed">
              We bridge high-caliber independent developers and designers with ambitious companies worldwide. Zero bidding wars, strict quality vetting, and fair milestone protection for both sides.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button 
                onClick={() => handleOpenModal('hire')}
                className="btn-nexcent-primary text-base px-8 py-3.5"
              >
                <span>Hire Vetted Talent</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleOpenModal('freelancer')}
                className="btn-nexcent-secondary text-base px-8 py-3.5"
              >
                Join as a Freelancer
              </button>
            </div>
          </div>

          {/* Right: Visual Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <ZytronaEngineeringIllustration className="w-full max-w-[480px]" />
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR STORY / MISSION */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-[#E0E0E0]">
        <div className="max-w-5xl mx-auto space-y-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#4CAF4F]" />
            <span>Our Origin & Purpose</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#263238] leading-tight">
            Why We Started ZYTRONA
          </h2>

          <div className="text-left boxy-card bg-white p-8 sm:p-12 rounded-2xl border border-[#E5E7EB] shadow-sm space-y-5 text-[#717171] text-base sm:text-lg leading-relaxed relative overflow-hidden">
            <p>
              We started because the freelancing world was fundamentally broken. Skilled developers and designers were trapped in race-to-the-bottom bidding wars, high platform commissions, and delayed payouts. At the same time, companies spent weeks sifting through hundreds of unverified resumes only to end up with missed deadlines and unusable codebases.
            </p>
            <p>
              We knew there was a better way. Our mission is to create a transparent, fair marketplace where proven technical skill meets genuine opportunity — eliminating intermediaries and providing guaranteed milestone protection for both clients and independent talent.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT MAKES US DIFFERENT */}
      <section className="py-20 px-6 lg:px-16 bg-[#F5F7FA] border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#4CAF4F]" />
              <span>Differentiators</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#263238]">
              What Sets ZYTRONA Apart
            </h2>
            <p className="text-[#717171] text-base">
              A modern talent network engineered for mutual trust, quality delivery, and zero agency overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {DIFFERENTIATORS.map((item, idx) => (
              <SpotlightCard 
                key={idx} 
                spotlightColor="rgba(76, 175, 79, 0.12)"
                className="boxy-card p-8 sm:p-10 h-full flex flex-col justify-between"
              >
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9]/60 flex items-center justify-center text-[#4CAF4F] shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#F5F7FA] border border-[#E0E0E0] text-[#717171]">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#263238] tracking-tight mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[#717171] text-sm sm:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-[#F0F0F0] flex items-center gap-2 text-xs font-semibold text-[#4CAF4F]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Platform Standard Guaranteed</span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS (VERY IMPORTANT) */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-[#4CAF4F]" />
              <span>Simple 4-Step Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#263238]">
              How It Works
            </h2>
            <p className="text-[#717171] text-base">
              From project scoping to final delivery — a frictionless, transparent workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {HOW_IT_WORKS.map((item, idx) => (
              <SpotlightCard 
                key={idx} 
                spotlightColor="rgba(76, 175, 79, 0.12)"
                className="boxy-card p-7 bg-white h-full flex flex-col justify-between"
              >
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9]/60 flex items-center justify-center text-[#4CAF4F] shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-2xl font-black text-[#4CAF4F] font-mono tracking-tighter">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#263238] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#717171] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0F0F0] flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#4CAF4F] uppercase tracking-wider inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Milestone Protected
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    Step {idx + 1}/4
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHO WE SERVE (TWO CLEAR SECTIONS) */}
      <section className="py-20 px-6 lg:px-16 bg-[#F5F7FA] border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-[#4CAF4F]" />
              <span>Marketplace Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#263238]">
              Who We Serve
            </h2>
            <p className="text-[#717171] text-base">
              Empowering both sides of the modern digital marketplace with equal dignity and protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* For Freelancers */}
            <div className="boxy-card p-8 sm:p-10 bg-white flex flex-col justify-between h-full hover:border-[#4CAF4F]/60 transition-all">
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
                    <Briefcase className="w-4 h-4" />
                    <span>For Freelancers & Builders</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F5F7FA] text-[#717171] border border-[#E0E0E0]">
                    Top 3% Vetted
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#263238] tracking-tight mb-4">
                  Freedom, Fair Pay & High-Impact Projects
                </h3>
                
                <p className="text-sm text-[#717171] mb-6">
                  Build production software on your own terms with guaranteed milestone payouts and zero platform middlemen.
                </p>

                <ul className="space-y-4 text-sm text-[#717171] mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0 mt-0.5 text-[#4CAF4F]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span><strong className="text-[#263238]">No Bidding Wars:</strong> Projects matched to your specific technical expertise and rate expectations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0 mt-0.5 text-[#4CAF4F]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span><strong className="text-[#263238]">Guaranteed Milestone Payouts:</strong> Protected escrow funding released promptly on verified completion.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0 mt-0.5 text-[#4CAF4F]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span><strong className="text-[#263238]">Direct Client Relationships:</strong> Direct communication without layers of junior account intermediaries.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0 mt-0.5 text-[#4CAF4F]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span><strong className="text-[#263238]">Professional Growth:</strong> Work on production-grade web platforms, distributed systems, and enterprise SaaS products.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-[#F0F0F0]">
                <button 
                  onClick={() => handleOpenModal('freelancer')}
                  className="w-full btn-nexcent-primary py-3.5 text-center font-bold text-base justify-center shadow-sm"
                >
                  <span>Apply to Join the Talent Network</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* For Companies / Clients */}
            <div className="boxy-card p-8 sm:p-10 bg-white flex flex-col justify-between h-full hover:border-[#4CAF4F]/60 transition-all">
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    <span>For Companies & Startups</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F5F7FA] text-[#717171] border border-[#E0E0E0]">
                    48h Matching
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#263238] tracking-tight mb-4">
                  Verified Talent, Velocity & Guaranteed Reliability
                </h3>
                
                <p className="text-sm text-[#717171] mb-6">
                  Skip hiring overhead and recruit vetted senior engineers with 100% intellectual property ownership.
                </p>

                <ul className="space-y-4 text-sm text-[#717171] mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0 mt-0.5 text-[#4CAF4F]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span><strong className="text-[#263238]">Pre-Vetted Senior Specialists:</strong> Skip months of interviews — work with tested, top-tier engineers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0 mt-0.5 text-[#4CAF4F]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span><strong className="text-[#263238]">Rapid 48-Hour Matching:</strong> Onboard the right specialist and kick off development without delays.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0 mt-0.5 text-[#4CAF4F]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span><strong className="text-[#263238]">100% IP & Code Ownership:</strong> Complete repository rights transferred unconditionally upon milestone sign-off.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0 mt-0.5 text-[#4CAF4F]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span><strong className="text-[#263238]">Risk-Free Milestone Reviews:</strong> Review working code in live staging environments before releasing funds.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-[#F0F0F0]">
                <button 
                  onClick={() => handleOpenModal('hire')}
                  className="w-full btn-nexcent-secondary py-3.5 text-center font-bold text-base justify-center hover:bg-[#E8F5E9]"
                >
                  <span>Hire Top Talent / Post a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR VALUES OR PRINCIPLES */}
      <section className="py-20 px-6 lg:px-16 bg-white border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#4CAF4F]" />
              <span>Guiding Principles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#263238]">
              Our Core Values
            </h2>
            <p className="text-[#717171] text-base">
              The values that govern every partnership, contract, and deliverable at ZYTRONA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
            {CORE_VALUES.map((val, idx) => (
              <div 
                key={idx} 
                className="boxy-card card-lift p-6 bg-white flex flex-col justify-between h-full"
              >
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-[#E8F5E9] text-[#4CAF4F] flex items-center justify-center font-mono font-bold text-sm border border-[#C8E6C9]/60">
                      0{idx + 1}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#4CAF4F]/60" />
                  </div>
                  <h4 className="text-base font-bold text-[#263238] leading-snug mb-2 min-h-[44px] flex items-center">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#717171] leading-relaxed">
                    {val.desc}
                  </p>
                </div>
                
                <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#4CAF4F]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Principle</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: TEAM / FOUNDERS */}
      <section className="py-20 px-6 lg:px-16 bg-[#F5F7FA] border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-[#4CAF4F]" />
              <span>Leadership & Architects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#263238]">
              Built by Engineers, for Modern Builders
            </h2>
            <p className="text-[#717171] text-base">
              Practitioners who understand real-world system architecture, sprint velocity, and code quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {LEADERSHIP_TEAM.map((member, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="boxy-card p-6 bg-white flex flex-col justify-between h-full hover:border-[#4CAF4F]/50 transition-all"
              >
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#263238] to-[#18191F] text-white flex items-center justify-center font-bold text-base shadow-sm border border-neutral-700/50">
                      {member.initials}
                    </div>
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-9 h-9 rounded-xl bg-[#F5F7FA] border border-[#E0E0E0] text-neutral-500 flex items-center justify-center hover:bg-[#E8F5E9] hover:text-[#4CAF4F] hover:border-[#C8E6C9] transition-all"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="min-h-[44px] mb-1 flex flex-col justify-center">
                    <h4 className="text-lg font-bold text-[#263238] leading-tight">
                      {member.name}
                    </h4>
                  </div>

                  <div className="text-xs font-bold text-[#4CAF4F] uppercase tracking-wider mb-2 min-h-[16px]">
                    {member.role}
                  </div>

                  <p className="text-xs font-semibold text-neutral-500 mb-3 min-h-[34px] flex items-center">
                    {member.specialty}
                  </p>

                  <p className="text-xs sm:text-sm text-[#717171] leading-relaxed mb-5">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-[#E0E0E0] flex flex-wrap gap-1.5">
                  {member.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#F5F7FA] border border-[#E0E0E0] text-[#263238]">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: CALL TO ACTION AT THE BOTTOM */}
      <section className="bg-white py-24 px-6 lg:px-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#4CAF4F]" />
            <span>Join the Marketplace Today</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight leading-tight">
            Ready to build something remarkable?
          </h2>

          <p className="text-base sm:text-lg text-[#717171] max-w-2xl mx-auto">
            Whether you are looking to hire top-tier engineering talent or want to join our network of elite independent builders, let’s connect.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleOpenModal('hire')}
              className="btn-nexcent-primary text-base px-8 py-3.5"
            >
              <span>Hire Talent / Post a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleOpenModal('freelancer')}
              className="btn-nexcent-secondary text-base px-8 py-3.5"
            >
              Join as a Freelancer
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* INTERACTIVE MODALS */}
      <AnimatePresence>
        {modalType && (
          <div 
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseModal()
            }}
            onWheel={(e) => {
              if (e.target === e.currentTarget) e.preventDefault()
            }}
            onTouchMove={(e) => {
              if (e.target === e.currentTarget) e.preventDefault()
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overscroll-contain"
          >
            <motion.div 
              ref={aboutModalRef}
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white rounded-lg shadow-2xl border border-[#E0E0E0] max-w-md w-full p-6 sm:p-8 relative overscroll-contain outline-none max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 p-1 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {modalType === 'hire' ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#4CAF4F] flex items-center justify-center mb-4">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#263238] mb-2">Hire Talent / Post Project</h3>
                  <p className="text-sm text-[#717171] mb-6">
                    Connect with pre-vetted senior software engineers & designers. 100% IP ownership & milestone protection.
                  </p>

                  {formSuccess ? (
                    <div className="p-4 bg-[#E8F5E9] border border-[#C8E6C9] rounded-md text-center text-[#2E7D32]">
                      <Check className="w-8 h-8 mx-auto mb-2 text-[#4CAF4F]" />
                      <p className="font-bold">Project Brief Received!</p>
                      <p className="text-xs mt-1">Our matching team will reply with candidate options within 24 hours.</p>
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
                        <label className="block text-xs font-semibold text-[#263238] uppercase mb-1">Your Name</label>
                        <input 
                          type="text" 
                          required 
                          value={hireFormData.fullName}
                          onChange={(e) => setHireFormData({ ...hireFormData, fullName: e.target.value })}
                          placeholder="Sarah Jenkins" 
                          className="w-full px-3.5 py-2.5 rounded border border-[#E0E0E0] text-sm focus:border-[#4CAF4F] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#263238] uppercase mb-1">Work Email</label>
                        <input 
                          type="email" 
                          required 
                          value={hireFormData.email}
                          onChange={(e) => setHireFormData({ ...hireFormData, email: e.target.value })}
                          placeholder="sarah@company.com" 
                          className="w-full px-3.5 py-2.5 rounded border border-[#E0E0E0] text-sm focus:border-[#4CAF4F] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#263238] uppercase mb-1.5">Talent Needed</label>
                        <CustomSelect 
                          value={hireFormData.talentNeeded}
                          onChange={(val) => setHireFormData({ ...hireFormData, talentNeeded: val })}
                          options={[
                            'Full-Stack Web Engineers (React/Next.js)',
                            'UI/UX Product Designers (Figma)',
                            'Backend & Cloud Architects',
                            'DevOps & Infrastructure Engineers'
                          ]}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#263238] uppercase mb-1">Project Scope / Requirements</label>
                        <textarea 
                          rows={3}
                          value={hireFormData.projectScope}
                          onChange={(e) => setHireFormData({ ...hireFormData, projectScope: e.target.value })}
                          placeholder="Briefly describe your tech stack, timeline, and team size..."
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
                            <span>Sending Request...</span>
                          </>
                        ) : (
                          <span>Submit Project Request</span>
                        )}
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#4CAF4F] flex items-center justify-center mb-4">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#263238] mb-2">Join as a Freelancer</h3>
                  <p className="text-sm text-[#717171] mb-6">
                    Join our vetted network of elite builders. Guaranteed milestone payouts, zero bidding wars, and high-impact clients.
                  </p>

                  {formSuccess ? (
                    <div className="p-4 bg-[#E8F5E9] border border-[#C8E6C9] rounded-md text-center text-[#2E7D32]">
                      <Check className="w-8 h-8 mx-auto mb-2 text-[#4CAF4F]" />
                      <p className="font-bold">Application Received!</p>
                      <p className="text-xs mt-1">Our technical admissions team will review your portfolio and reach out shortly.</p>
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
                          value={careerFormData.fullName}
                          onChange={(e) => setCareerFormData({ ...careerFormData, fullName: e.target.value })}
                          placeholder="David Miller" 
                          className="w-full px-3.5 py-2.5 rounded border border-[#E0E0E0] text-sm focus:border-[#4CAF4F] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#263238] uppercase mb-1">Email Address</label>
                        <input 
                          type="email" 
                          required 
                          value={careerFormData.email}
                          onChange={(e) => setCareerFormData({ ...careerFormData, email: e.target.value })}
                          placeholder="david@miller.dev" 
                          className="w-full px-3.5 py-2.5 rounded border border-[#E0E0E0] text-sm focus:border-[#4CAF4F] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#263238] uppercase mb-1.5">Primary Discipline</label>
                        <CustomSelect 
                          value={careerFormData.primaryDiscipline}
                          onChange={(val) => setCareerFormData({ ...careerFormData, primaryDiscipline: val })}
                          options={[
                            'Full-Stack Web Development',
                            'UI/UX & Product Design',
                            'DevOps & Cloud Architecture',
                            'Backend & Systems Engineering'
                          ]}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#263238] uppercase mb-1">Portfolio or LinkedIn URL</label>
                        <input 
                          type="url" 
                          required 
                          value={careerFormData.portfolio}
                          onChange={(e) => setCareerFormData({ ...careerFormData, portfolio: e.target.value })}
                          placeholder="https://linkedin.com/in/username" 
                          className="w-full px-3.5 py-2.5 rounded border border-[#E0E0E0] text-sm focus:border-[#4CAF4F] focus:outline-none transition-colors"
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
                            <span>Sending Application...</span>
                          </>
                        ) : (
                          <span>Submit Application</span>
                        )}
                      </button>
                    </form>
                  )}
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
