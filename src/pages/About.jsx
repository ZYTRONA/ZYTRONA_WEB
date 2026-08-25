import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { 
  Navbar, 
  NavBody, 
  NavItems,
  NavbarLogo, 
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu
} from '@/components/ui/resizable-navbar'
import { Footer } from '@/components/ui/Footer'
import { 
  ShieldCheck, 
  Zap, 
  Users, 
  Lock, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Code2, 
  Sparkles, 
  Cpu, 
  Globe, 
  Server,
  Award,
  GitBranch,
  Phone
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import '@/App.css'

const CORE_PILLARS = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-black" />,
    title: '100% IP & Code Ownership',
    desc: 'You retain full, unconditional ownership of all repository code, database schemas, Figma design libraries, and commercial software licenses.',
    badge: 'Confidential & NDA Protected'
  },
  {
    icon: <Users className="w-6 h-6 text-black" />,
    title: 'Zero Middlemen — Direct Senior Access',
    desc: 'You collaborate directly with our senior software architects, AI engineers, and principal designers. No confusing layers of junior account reps.',
    badge: 'Transparent Slack/Discord Sync'
  },
  {
    icon: <Zap className="w-6 h-6 text-black" />,
    title: 'Sub-Second Vitals & Scalability',
    desc: 'Every web application and API is engineered for sub-second response times, modular microservice decoupling, and 95+ Google Lighthouse scores.',
    badge: 'Top Core Web Vitals'
  },
  {
    icon: <Lock className="w-6 h-6 text-black" />,
    title: 'Production Hardening & 24/7 SLA',
    desc: 'Automated CI/CD security scanning, TLS 1.3 encryption, Docker containerization, and dedicated continuous cloud health monitoring.',
    badge: 'Enterprise Security'
  }
]

const METHODOLOGY_STEPS = [
  {
    num: '01',
    title: 'Technical Discovery & Architecture',
    desc: 'We map user journeys, system workflows, database models, and cloud infrastructure requirements to produce a clear, milestone-backed roadmap.'
  },
  {
    num: '02',
    title: 'Rapid High-Fidelity Prototyping',
    desc: 'Interactive Figma prototypes and design token systems validated with real user flows before writing production code.'
  },
  {
    num: '03',
    title: 'Agile 2-Week Sprint Slices',
    desc: 'High-velocity development cycles with transparent GitHub commits, automated test suites, and live staging preview environments.'
  },
  {
    num: '04',
    title: 'Rigorous QA & Security Audit',
    desc: 'Cross-device stress testing, penetration audits, and Lighthouse performance optimization across all target browsers and screen sizes.'
  },
  {
    num: '05',
    title: 'Production Launch & Handover',
    desc: 'Zero-downtime cloud deployment, DNS cutover, comprehensive documentation, and 100% IP repository handover.'
  }
]

export function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="app">
      {/* Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={[
              { name: 'Home', link: '/#home' },
              { name: 'About', link: '/about' },
              { name: 'Services', link: '/#services' },
              { name: 'Work', link: '/#work' },
              { name: 'Contact', link: '/#contact' },
            ]}
          />
          <div className="flex items-center">
            <Link to="/#contact">
              <NavbarButton variant="primary" className="gap-1.5">
                <span>Start Consultation</span>
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
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-neutral-800 text-sm font-semibold py-2.5 px-1 hover:text-black transition-colors"
              >
                <span>{item.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            ))}

            <div className="flex w-full flex-col gap-2.5 mt-3 pt-3 border-t border-black/[0.06]">
              <Link to="/#contact" onClick={() => setMobileMenuOpen(false)}>
                <NavbarButton variant="primary" className="w-full justify-center gap-2 py-2.5">
                  <span>Start Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="service-hero-bg-blur" />
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              ✦ Engineering Philosophy & Company
            </span>

            <h1 className="about-hero-title">
              We Build Software That Ships & Scales.
            </h1>

            <p className="about-hero-subtitle">
              ZYTRONA is a dedicated technology engineering company built by passionate technologists. 
              We bridge the gap between visionary business ideas and high-performance software execution.
            </p>

            <div className="about-hero-stats-row">
              <div className="about-stat-pill">
                <span className="about-stat-value">10+</span>
                <span className="about-stat-label">Delivered Platforms</span>
              </div>
              <div className="about-stat-pill">
                <span className="about-stat-value">98%</span>
                <span className="about-stat-label">Client Satisfaction</span>
              </div>
              <div className="about-stat-pill">
                <span className="about-stat-value">100%</span>
                <span className="about-stat-label">IP Ownership Handover</span>
              </div>
              <div className="about-stat-pill">
                <span className="about-stat-value">&lt; 2hr</span>
                <span className="about-stat-label">Senior Response SLA</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Engineering Pillars */}
      <section className="about-pillars-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">How We Operate</span>
            <h2 className="section-title">Core Engineering Guarantees</h2>
            <p className="section-subtitle">
              Our non-negotiable commitments to every startup founder and enterprise client.
            </p>
          </div>

          <div className="about-pillars-grid">
            {CORE_PILLARS.map((pillar, idx) => (
              <motion.div 
                key={idx}
                className="about-pillar-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <div className="pillar-card-top">
                  <div className="pillar-icon-box">{pillar.icon}</div>
                  <span className="pillar-badge">{pillar.badge}</span>
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative & Story Bento */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-bento">
            <div className="about-story-col-text">
              <span className="section-badge">Our Mission</span>
              <h2 className="about-story-heading">Eliminating Middlemen & Tech Debt</h2>
              <p className="about-story-paragraph">
                Traditional agencies often hide their engineering behind layers of junior account managers, 
                bloated hourly billing, and outdated technology stacks. ZYTRONA was engineered differently.
              </p>
              <p className="about-story-paragraph">
                When you partner with ZYTRONA, you collaborate directly with senior full-stack architects, 
                AI researchers, and product designers who understand how to write clean, modular, and maintainable code.
              </p>
              <div className="about-story-checklist">
                <div className="story-check-item">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                  <span>Fixed milestone sprint delivery with transparent GitHub pull requests</span>
                </div>
                <div className="story-check-item">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                  <span>Direct daily sync via Slack, Discord, or preferred channels</span>
                </div>
                <div className="story-check-item">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                  <span>Sub-second Core Web Vitals and enterprise cloud scalability</span>
                </div>
              </div>
            </div>

            <div className="about-story-col-visual">
              <div className="story-metrics-bento">
                <div className="story-mini-bento-card highlight">
                  <span className="bento-big-num">0</span>
                  <span className="bento-label">Middlemen — Direct Senior Access</span>
                </div>
                <div className="story-mini-bento-card">
                  <span className="bento-big-num">95+</span>
                  <span className="bento-label">Google Lighthouse Standard</span>
                </div>
                <div className="story-mini-bento-card">
                  <span className="bento-big-num">100%</span>
                  <span className="bento-label">Source Code & IP Rights</span>
                </div>
                <div className="story-mini-bento-card highlight">
                  <span className="bento-big-num">24/7</span>
                  <span className="bento-label">Cloud Telemetry & SLA Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agile Delivery Methodology */}
      <section className="about-methodology-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Agile Delivery Blueprint</span>
            <h2 className="section-title">The 5-Stage Execution Framework</h2>
            <p className="section-subtitle">
              From technical discovery and prototyping to production deployment and 24/7 SLA.
            </p>
          </div>

          <div className="about-methodology-grid">
            {METHODOLOGY_STEPS.map((step, idx) => (
              <motion.div 
                key={idx}
                className="about-methodology-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <div className="methodology-num">{step.num}</div>
                <h3 className="methodology-title">{step.title}</h3>
                <p className="methodology-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="service-modern-cta">
        <div className="container">
          <div className="service-cta-bento">
            <span className="cta-badge">✦ Let's Build Your Vision</span>
            <h2 className="cta-title">Ready to Partner with Senior Engineers?</h2>
            <p className="cta-subtitle">
              Get a detailed technical roadmap, scope estimate, and milestone timeline within 24 hours. Zero commitment required.
            </p>
            <div className="cta-buttons">
              <Link to="/#contact" className="btn btn-primary btn-lg">
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="https://wa.me/918667273159?text=Hi%20ZYTRONA,%20I%20would%20like%20to%20discuss%20a%20project" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary btn-lg"
              >
                <FaWhatsapp className="w-4 h-4 text-emerald-500" /> Chat on WhatsApp
              </a>
              <a href="tel:+918667273159" className="btn btn-secondary btn-lg">
                <Phone className="w-4 h-4" /> Direct Line: +91 8667273159
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Unified Footer */}
      <Footer />
    </div>
  )
}

export default About
