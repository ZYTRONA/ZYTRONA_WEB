import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowUpRight, 
  Copy, 
  Check, 
  Phone, 
  Mail, 
  Sparkles, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react'
import { 
  FaLinkedin, 
  FaGithub, 
  FaInstagram, 
  FaWhatsapp 
} from 'react-icons/fa'

const LOGO_SRC = '/Logo.png'

export function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText('zytronabusiness@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-modern">
      {/* Top Banner / Scoping Strip */}
      <div className="footer-top-strip">
        <div className="container">
          <div className="footer-strip-wrapper">
            <div className="footer-status-pill">
              <span className="status-live-dot" />
              <span>Accepting New Enterprise & Startup Projects</span>
            </div>

            <div className="footer-strip-actions">
              <a 
                href="https://wa.me/918667273159?text=Hi%20ZYTRONA,%20I%20would%20like%20to%20discuss%20a%20project" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-strip-link"
              >
                <FaWhatsapp className="text-emerald-500 w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>

              <a href="tel:+918667273159" className="footer-strip-link">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 8667273159</span>
              </a>

              <button 
                onClick={handleCopyEmail}
                className="footer-strip-copy-btn"
                title="Copy business email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied!' : 'zytronabusiness@gmail.com'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Bento Grid */}
      <div className="container">
        <div className="footer-main-grid">
          {/* Col 1: Brand & Narrative */}
          <div className="footer-col-brand">
            <Link to="/#home" className="footer-brand-logo">
              <img src={LOGO_SRC} alt="ZYTRONA Logo" className="footer-logo-img" />
              <span className="footer-logo-text">ZYTRONA</span>
            </Link>
            
            <p className="footer-brand-tagline">
              Engineering world-class AI systems, modern web platforms, high-performance mobile apps, and scalable cloud architectures.
            </p>

            <div className="footer-badges-row">
              <span className="footer-mini-badge">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% IP Ownership
              </span>
              <span className="footer-mini-badge">
                <Sparkles className="w-3.5 h-3.5" />
                Sub-Second Vitals
              </span>
            </div>

            <div className="footer-social-cluster">
              <a 
                href="https://www.linkedin.com/company/zytrona" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a 
                href="https://github.com/ZYTRONA" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a 
                href="https://www.instagram.com/zytrona_official/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a 
                href="https://wa.me/918667273159" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Capabilities & Services */}
          <div className="footer-col-nav">
            <h4 className="footer-col-title">Capabilities</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/service/website-development" className="footer-nav-link">
                  Web & Cloud SaaS
                  <ArrowUpRight className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/service/app-development" className="footer-nav-link">
                  Mobile App Engineering
                  <ArrowUpRight className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/service/tensorflow-ai" className="footer-nav-link">
                  AI & ML Automation
                  <ArrowUpRight className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/service/ui-designs" className="footer-nav-link">
                  UI/UX & Design Systems
                  <ArrowUpRight className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/service/devops-linux" className="footer-nav-link">
                  DevOps & Cloud SRE
                  <ArrowUpRight className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/service/video-editing" className="footer-nav-link">
                  Commercial Motion & VFX
                  <ArrowUpRight className="footer-link-arrow" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Approach */}
          <div className="footer-col-nav">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/about" className="footer-nav-link">
                  About ZYTRONA
                  <ArrowUpRight className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/#about" className="footer-nav-link">
                  Engineering Values
                </Link>
              </li>
              <li>
                <Link to="/#projects" className="footer-nav-link">
                  Featured Case Studies
                </Link>
              </li>
              <li>
                <Link to="/#models" className="footer-nav-link">
                  Engagement Models
                </Link>
              </li>
              <li>
                <Link to="/#process" className="footer-nav-link">
                  Agile Delivery Process
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="footer-nav-link">
                  Client FAQs
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="footer-nav-link">
                  Senior Engineering Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Consultation Direct */}
          <div className="footer-col-nav">
            <h4 className="footer-col-title">Direct Connect</h4>
            <p className="footer-contact-desc">
              Zero middlemen. Connect directly with senior software architects and designers.
            </p>
            
            <div className="footer-direct-box">
              <span className="footer-direct-label">Senior Technical Inquiries</span>
              <a href="mailto:zytronabusiness@gmail.com" className="footer-direct-email">
                zytronabusiness@gmail.com
              </a>
            </div>

            <div className="footer-direct-box" style={{ marginTop: '0.75rem' }}>
              <span className="footer-direct-label">Direct Hotline</span>
              <a href="tel:+918667273159" className="footer-direct-phone">
                +91 8667273159
              </a>
            </div>

            <Link to="/#contact" className="footer-cta-action-btn">
              <span>Start a Consultation</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <p>© {currentYear} ZYTRONA Inc. All rights reserved.</p>
          </div>

          <div className="footer-bottom-right">
            <Link to="/privacy-policy" className="footer-legal-link">Privacy Policy</Link>
            <span className="footer-legal-dot">•</span>
            <Link to="/terms-of-service" className="footer-legal-link">Terms of Service</Link>
            <span className="footer-legal-dot">•</span>
            <span className="footer-legal-link" style={{ cursor: 'default' }}>NDA Protected</span>
          </div>
        </div>
      </div>

      {/* Oversized Subtle Watermark */}
      <div className="footer-giant-watermark">
        <span>ZYTRONA</span>
      </div>
    </footer>
  )
}

export default Footer
