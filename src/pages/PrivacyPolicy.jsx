import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { 
  Navbar, 
  NavBody, 
  NavbarLogo, 
  NavbarButton 
} from '@/components/ui/resizable-navbar'
import { Footer } from '@/components/ui/Footer'
import '@/App.css'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="app">
      {/* Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center gap-3">
            <Link to="/">
              <NavbarButton variant="secondary">← Back to Home</NavbarButton>
            </Link>
            <Link to="/#contact">
              <NavbarButton variant="primary">Start Consultation</NavbarButton>
            </Link>
          </div>
        </NavBody>
      </Navbar>

      <section className="legal-page">
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto', padding: '10rem 1.5rem 5rem' }}>
          <span className="section-badge">Compliance & Transparency</span>
          <h1 className="section-title" style={{ marginTop: '0.5rem', marginBottom: '0.75rem' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--color-muted)', marginBottom: '2.5rem', fontSize: '0.92rem' }}>Last updated: August 25, 2026</p>

          <div className="legal-content" style={{ lineHeight: 1.8, color: 'var(--color-body)', fontSize: '0.95rem' }}>
            <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--color-heading)' }}>1. Information We Collect</h2>
            <p style={{ marginBottom: '1rem' }}>
              When you submit a project inquiry or consultation brief through our website, we collect the following information:
            </p>
            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Full Name</li>
              <li>Work Email Address</li>
              <li>Phone Number (optional)</li>
              <li>Service of Interest & Preferred Consultation Date</li>
              <li>Project Scope and Technical Requirements</li>
            </ul>

            <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--color-heading)' }}>2. How We Use Your Information</h2>
            <p style={{ marginBottom: '1rem' }}>
              We use the collected information exclusively to:
            </p>
            <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Review your technical requirements and prepare custom milestone roadmaps</li>
              <li>Schedule technical discovery calls with senior software architects</li>
              <li>Communicate directly regarding project milestones and deliverables</li>
            </ul>

            <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--color-heading)' }}>3. Non-Disclosure & Data Protection</h2>
            <p style={{ marginBottom: '1rem' }}>
              We never sell, rent, or monetize your personal or business data. Mutual Non-Disclosure Agreements (NDAs) are provided prior to in-depth architecture discussions.
            </p>

            <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--color-heading)' }}>4. Security Safeguards</h2>
            <p style={{ marginBottom: '1rem' }}>
              We utilize TLS 1.3 encryption, secure credential vaults, and air-gapped private cloud environments to safeguard your project information.
            </p>

            <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--color-heading)' }}>5. Direct Contact</h2>
            <p style={{ marginBottom: '1rem' }}>
              For data access requests or privacy questions, contact our security officer directly at{' '}
              <a href="mailto:zytronabusiness@gmail.com" style={{ color: '#000000', fontWeight: 700, textDecoration: 'underline' }}>zytronabusiness@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Unified Footer */}
      <Footer />
    </div>
  )
}
