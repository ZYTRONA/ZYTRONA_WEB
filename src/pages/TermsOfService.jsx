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

export default function TermsOfService() {
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
          <span className="section-badge">Client Engagement Standards</span>
          <h1 className="section-title" style={{ marginTop: '0.5rem', marginBottom: '0.75rem' }}>Terms of Service</h1>
          <p style={{ color: 'var(--color-muted)', marginBottom: '2.5rem', fontSize: '0.92rem' }}>Last updated: August 25, 2026</p>

          <div className="legal-content" style={{ lineHeight: 1.8, color: 'var(--color-body)', fontSize: '0.95rem' }}>
            <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--color-heading)' }}>1. Acceptance of Terms</h2>
            <p style={{ marginBottom: '1rem' }}>
              By accessing the Zytrona platform or commissioning technology services, you agree to be bound by these Terms of Service.
            </p>

            <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--color-heading)' }}>2. Scope of Services</h2>
            <p style={{ marginBottom: '1rem' }}>
              Zytrona delivers custom web platform engineering, mobile application development, neural AI automation, UI/UX design systems, and cloud infrastructure management. Specific scopes, deliverables, milestones, and SLAs are governed by mutually executed Statements of Work (SOW).
            </p>

            <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--color-heading)' }}>3. 100% Intellectual Property Ownership</h2>
            <p style={{ marginBottom: '1rem' }}>
              Upon payment for milestone deliverables, you receive full, exclusive ownership of all source code repositories, databases, Figma design libraries, and commercial software assets produced for your project.
            </p>

            <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--color-heading)' }}>4. Strict Confidentiality & NDA</h2>
            <p style={{ marginBottom: '1rem' }}>
              Both parties agree to hold all proprietary trade secrets, business concepts, source code, and customer data in strict confidence under binding mutual non-disclosure covenants.
            </p>

            <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--color-heading)' }}>5. Inquiries & Legal Support</h2>
            <p style={{ marginBottom: '1rem' }}>
              For contract inquiries, reach out to our legal engineering team at{' '}
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
