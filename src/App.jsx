import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { 
  FaGlobe, FaMobileAlt, FaVideo, FaGamepad, FaBriefcase, FaLinux, FaPalette, FaBrain,
  FaBuilding, FaMapMarkerAlt, FaEnvelope, FaPhone, FaCheck, FaRocket,
  FaLinkedinIn, FaGithub, FaInstagram, FaExternalLinkAlt
} from 'react-icons/fa'
import './App.css'
const LOGO_SRC = '/Logo.png'

function App() {
  const EMAILJS_SERVICE_ID = 'service_bo5zjco'
  const EMAILJS_TEMPLATE_ID_OWNER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_OWNER
  const EMAILJS_TEMPLATE_ID_REPLY = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REPLY
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const BUSINESS_EMAIL = 'zytronabusiness@gmail.com'

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [contactReplyMessage, setContactReplyMessage] = useState('')
  const [isContactSending, setIsContactSending] = useState(false)

  // Track active section on scroll
  useEffect(() => {
    const sections = ['home', 'services', 'projects', 'about', 'testimonials', 'faq', 'contact']
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const disableContextMenu = (event) => {
      event.preventDefault()
    }

    const disableDevShortcuts = (event) => {
      const target = event.target
      const isEditable =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA')

      if (isEditable) return

      const key = event.key.toLowerCase()
      const hasCtrlOrCmd = event.ctrlKey || event.metaKey

      const blockedCombinations =
        (hasCtrlOrCmd && key === 'u') ||
        (hasCtrlOrCmd && event.shiftKey && (key === 'i' || key === 'j' || key === 'c' || key === 'k')) ||
        (hasCtrlOrCmd && key === 's')

      const blockedFunctionKeys = event.key === 'F12'

      if (blockedCombinations || blockedFunctionKeys) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    document.addEventListener('contextmenu', disableContextMenu)
    document.addEventListener('keydown', disableDevShortcuts)

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu)
      document.removeEventListener('keydown', disableDevShortcuts)
    }
  }, [])

  const services = [
    {
      id: "website-development",
      icon: <FaGlobe />,
      title: "Website Development",
      description: "Build stunning, responsive websites that captivate your audience and drive business growth."
    },
    {
      id: "app-development",
      icon: <FaMobileAlt />,
      title: "App Development",
      description: "Create powerful mobile applications for iOS and Android that deliver exceptional user experiences."
    },
    {
      id: "video-editing",
      icon: <FaVideo />,
      title: "Video Editing",
      description: "Professional video editing services to bring your visual content to life with stunning effects."
    },
    {
      id: "ui-designs",
      icon: <FaPalette />,
      title: "UI Designs",
      description: "Craft beautiful and intuitive user interfaces that enhance user engagement and satisfaction."
    }
  ]

  const stats = [
      { value: 5, suffix: '+', label: "Clients Worldwide" },
      { value: 98, suffix: '%', label: "Client Satisfaction" },
      { value: 1, suffix: '+', label: "Years Experience" },
      { value: 24, suffix: '/7', label: "Support Available" }
  ]

  const projectsDone = [
    {
      name: 'ZYCARE',
      purpose: 'Healthcare-focused platform designed to streamline care workflows and digital patient interactions.',
      stack: 'TypeScript',
      bgImage: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80',
      url: 'https://github.com/ZYTRONA/ZYCARE'
    },
    {
      name: 'ZYGLASS',
      purpose: 'Python project for practical automation and data-driven workflows in real-world business use cases.',
      stack: 'Python',
      bgImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80',
      url: 'https://github.com/ZYTRONA/ZYGLASS'
    },
    {
      name: 'ZYCROP',
      purpose: 'Web application initiative focused on domain-specific workflows and user-first functionality.',
      stack: 'JavaScript',
      bgImage: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
      url: 'https://github.com/ZYTRONA/ZYCROP'
    },
    {
      name: 'NUMMAZE',
      purpose: 'Interactive logic and number-based web experience built to improve engagement and problem-solving.',
      stack: 'JavaScript',
      bgImage: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=80',
      url: 'https://github.com/ZYTRONA/NUMMAZE'
    },
    {
      name: 'ZYNC-CHAT',
      purpose: 'Real-time communication application prototype built around fast, lightweight messaging interactions.',
      stack: 'JavaScript',
      bgImage: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=80',
      url: 'https://github.com/ZYTRONA/ZYNC-CHAT'
    }
  ]

  const clientProjects = [
    {
      name: 'ZOCA Crimson Charm',
      purpose: 'Modern client project site designed for engaging interactions and clear conversion-focused layout.',
      stack: 'Web App',
      bgImage: 'https://api.microlink.io/?url=https://zoca-crimson-charm.lovable.app&screenshot=true&meta=false',
      url: 'https://zoca-crimson-charm.lovable.app'
    },
    {
      name: 'Blue Base Family Saloon',
      purpose: 'Brand website implementation delivered with responsive structure and accessible content hierarchy.',
      stack: 'Web App',
      bgImage: 'https://api.microlink.io/?url=https://bluebase-family-spot.lovable.app&screenshot=true&meta=false',
      url: 'https://bluebase-family-spot.lovable.app'
    },
    {
      name: 'Fly Studio Showcase',
      purpose: 'Portfolio-style digital presence built to highlight services, offerings, and brand identity.',
      stack: 'Web App',
      bgImage: 'https://api.microlink.io/?url=https://fly-studio-showcase.lovable.app/&screenshot=true&meta=false',
      url: 'https://fly-studio-showcase.lovable.app/'
    },
    {
      name: 'Cakes & Bites',
      purpose: 'Showcase website crafted for a brand-led product experience with polished visual presentation.',
      stack: 'Web App',
      bgImage: 'https://api.microlink.io/?url=https://bites-artisanal-charm.lovable.app&screenshot=true&meta=false',
      url: 'https://bites-artisanal-charm.lovable.app'
    },
    {
      name: '11 TO 11 Family Restaurant',
      purpose: 'Client-facing website experience focused on clean storytelling and smooth user navigation.',
      stack: 'Web App',
      bgImage: 'https://api.microlink.io/?url=https://a-11to11family.lovable.app&screenshot=true&meta=false',
      url: 'https://a-11to11family.lovable.app'
    }
  ]

    // Custom hook for animated count-up
    function useCountUp(target, duration = 2000) {
      const [count, setCount] = useState(0);
      const startTimestamp = useRef(0);

      useEffect(() => {
        let rafId = 0;
        startTimestamp.current = 0;
        function step(timestamp) {
          if (!startTimestamp.current) startTimestamp.current = timestamp;
          const progress = Math.min((timestamp - startTimestamp.current) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) {
            rafId = requestAnimationFrame(step);
          } else {
            setCount(target);
          }
        }
        rafId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafId);
      }, [target, duration]);
      return count;
    }

  const testimonials = [
    {
      quote: "ZYTRONA transformed our entire digital infrastructure. Their expertise and dedication are unmatched.",
      author: "Sarah Johnson",
      position: "CEO, TechVentures Inc."
    },
    {
      quote: "The team's innovative approach helped us achieve 300% growth in just one year. Highly recommended!",
      author: "Michael Chen",
      position: "CTO, GlobalScale Solutions"
    },
    {
      quote: "Professional, reliable, and incredibly skilled. ZYTRONA is our go-to technology partner.",
      author: "Emily Rodriguez",
      position: "Director, Innovation Labs"
    }
  ]

  const faqs = [
    {
      question: 'Can you support my startup, small business, or enterprise team?',
      answer: 'We support startups, small businesses, and enterprise teams across technology, retail, healthcare, education, and media. Our process is flexible and tailored to your business goals.'
    },
    {
      question: 'How long will my website, app, or AI project take?',
      answer: 'Timelines depend on scope. A focused website can take 2 to 4 weeks, while larger app or AI projects can range from 6 to 16 weeks. We provide a clear roadmap and milestones before development starts.'
    },
    {
      question: 'Can your team handle both my design and development needs?',
      answer: 'Yes. We provide end-to-end delivery including UI/UX design, frontend and backend development, deployment, and post-launch support so you can work with one dedicated team.'
    },
    {
      question: 'Will I get ongoing maintenance and support after launch?',
      answer: 'Absolutely. We offer continuous support plans that include monitoring, performance updates, bug fixes, feature enhancements, and infrastructure guidance for long-term stability.'
    },
    {
      question: 'How can I get started with ZYTRONA?',
      answer: 'You can start by contacting us through the form or phone. We will schedule a discovery call, understand your objectives, and share a practical proposal with timeline and estimated cost.'
    }
  ]

  const backgroundMarqueeLines = [
    'Innovation • Technology • Solutions • Digital Growth • Transforming Ideas • Innovacion • Innovazione • Innovation',
    'Tecnologia • Technologie • Tecnologia • Takneek • தொழில்நுட்பம் • تقنية • 科技 • テクノロジー',
    'Future Ready • Build Better • Global Vision • AI Driven • Client Success • Precision • Excellence • Progress'
  ]

  const handleContactSubmit = async (event) => {
    event.preventDefault()

    if (isContactSending) return

    if ((!EMAILJS_TEMPLATE_ID_OWNER || !EMAILJS_TEMPLATE_ID_REPLY) || !EMAILJS_PUBLIC_KEY) {
      setContactReplyMessage('Email service is not configured. Please try again later.')
      return
    }

    const formElement = event.currentTarget
    const templateParams = {
      user_name: document.getElementById('userName').value,
      user_email: document.getElementById('userEmail').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    }

    const ownerTemplateParams = {
      to_email: BUSINESS_EMAIL,
      to_name: 'ZYTRONA',
      recipient: BUSINESS_EMAIL,
      email: BUSINESS_EMAIL,
      from_name: templateParams.user_name,
      from_email: templateParams.user_email,
      reply_to: templateParams.user_email,
      ...templateParams
    }

    const replyTemplateParams = {
      to_email: templateParams.user_email,
      to_name: templateParams.user_name,
      recipient: templateParams.user_email,
      email: templateParams.user_email,
      from_name: 'ZYTRONA',
      from_email: BUSINESS_EMAIL,
      reply_to: BUSINESS_EMAIL,
      ...templateParams
    }

    try {
      setIsContactSending(true)
      setContactReplyMessage('')

      // 1) Send the contact request to business inbox.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_OWNER,
        ownerTemplateParams,
        EMAILJS_PUBLIC_KEY
      )

      // 2) Send auto-reply to the contacting user.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_REPLY,
        replyTemplateParams,
        EMAILJS_PUBLIC_KEY
      )

      setContactReplyMessage('Thankyou for contacting ZYTRONA')
      formElement.reset()
    } catch (error) {
      const emailJsMessage =
        typeof error?.text === 'string' && error.text.trim().length > 0
          ? error.text
          : 'Unknown EmailJS error'

      console.error('EmailJS send failed:', error)
      setContactReplyMessage(`Unable to send your message right now. ${emailJsMessage}`)
    } finally {
      setIsContactSending(false)
    }
  }

  const handleMenuLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="app">
      <div className="bg-marquee" aria-hidden="true">
        {backgroundMarqueeLines.map((line, index) => (
          <div key={index} className={`bg-marquee-row ${index % 2 === 0 ? 'left' : 'right'}`}>
            <span>{line}</span>
            <span>{line}</span>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/#home" className="nav-logo" onClick={handleMenuLinkClick}>
            <img
              src={LOGO_SRC}
              alt="ZYTRONA Logo"
              className="logo-icon"
            />
            <span className="logo-text">ZYTRONA</span>
          </Link>
          
          <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/#home" onClick={handleMenuLinkClick} className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</Link>
            <Link to="/#services" onClick={handleMenuLinkClick} className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}>Services</Link>
            <Link to="/#projects" onClick={handleMenuLinkClick} className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</Link>
            <Link to="/#about" onClick={handleMenuLinkClick} className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</Link>
            <Link to="/#testimonials" onClick={handleMenuLinkClick} className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`}>Testimonials</Link>
            <Link to="/#faq" onClick={handleMenuLinkClick} className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}>FAQ</Link>
            <Link to="/#contact" onClick={handleMenuLinkClick} className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</Link>
          </div>

          <div className="nav-actions">
            <Link to="/#contact" className="btn btn-primary" onClick={handleMenuLinkClick}>Get Started</Link>
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge"><FaRocket /> Welcome to the Future</span>
            <h1 className="hero-title">
              Innovating Tomorrow's
              <span className="gradient-text"> Technology Today</span>
            </h1>
            <p className="hero-subtitle">
              We deliver cutting-edge technology solutions that empower businesses 
              to thrive in the digital age. Transform, innovate, and lead with ZYTRONA.
            </p>
            <div className="hero-buttons">
              <Link to="/#contact" className="btn btn-primary btn-lg">
                Start Your Journey
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/#services" className="btn btn-secondary btn-lg">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => {
                const animatedValue = useCountUp(stat.value, 2000 + index * 300);
                return (
                  <div key={index} className="stat-item">
                    <span className="stat-value">
                      {animatedValue}
                      {stat.suffix}
                    </span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                );
            })}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider">
        <div className="section-divider-line"></div>
      </div>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Services</span>
            <h2 className="section-title">Comprehensive Solutions for Your Business</h2>
            <p className="section-subtitle">
              From strategy to execution, we provide end-to-end technology services 
              designed to accelerate your growth and maximize your potential.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <Link key={index} to={`/service/${service.id}`} className="service-card service-card-link">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <span className="service-link">
                  Learn More <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider">
        <div className="section-divider-line"></div>
      </div>

      {/* Projects Done Section */}
      <section id="projects" className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Projects Done</span>
            <h2 className="section-title">GitHub Repositories Built By ZYTRONA</h2>
            <p className="section-subtitle">
              A curated list of our completed public repositories, showcasing practical engineering across healthcare,
              automation, productivity, and communication products.
            </p>
          </div>
          <div className="services-grid">
            {projectsDone.map((project) => (
              <a
                key={project.name}
                className="service-card project-card"
                style={{ '--project-bg': `url('${project.bgImage}')` }}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="service-title">{project.name}</h3>
                <p className="service-description">{project.purpose}</p>
                <p className="service-description"><strong>Tech Stack:</strong> {project.stack}</p>
                <span className="service-link">
                  View Repository <span><FaExternalLinkAlt /></span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider">
        <div className="section-divider-line"></div>
      </div>

      {/* Client Projects Section */}
      <section id="client-projects" className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Client Projects</span>
            <h2 className="section-title">Live Client Websites Delivered by ZYTRONA</h2>
            <p className="section-subtitle">
              A selection of client websites we have delivered, each built for usability, brand impact,
              and real-world business outcomes.
            </p>
          </div>
          <div className="services-grid">
            {clientProjects.map((project) => (
              <a
                key={project.name}
                className="service-card project-card"
                style={{ '--project-bg': `url('${project.bgImage}')` }}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="service-title">{project.name}</h3>
                <p className="service-description">{project.purpose}</p>
                <p className="service-description"><strong>Type:</strong> {project.stack}</p>
                <span className="service-link">
                  View Live Site <span><FaExternalLinkAlt /></span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider">
        <div className="section-divider-line"></div>
      </div>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-badge">About ZYTRONA</span>
              <h2 className="section-title">Pioneering Digital Excellence Since 2025</h2>
              <p className="about-text">
                At ZYTRONA, we believe in the transformative power of technology. 
                Our team of experts combines deep industry knowledge with cutting-edge 
                innovation to deliver solutions that drive real business results.
              </p>
              <p className="about-text">
                With over 1 years of experience serving Fortune 2 companies and 
                ambitious startups alike, we've built a reputation for excellence, 
                reliability, and forward-thinking solutions.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <span className="feature-check"><FaCheck /></span>
                  <span>Industry-Leading Expertise</span>
                </div>
                <div className="about-feature">
                  <span className="feature-check"><FaCheck /></span>
                  <span>Tailored Solutions</span>
                </div>
                <div className="about-feature">
                  <span className="feature-check"><FaCheck /></span>
                  <span>24/7 Dedicated Support</span>
                </div>
                <div className="about-feature">
                  <span className="feature-check"><FaCheck /></span>
                  <span>Proven Track Record</span>
                </div>
              </div>
              <Link to="/#contact" className="btn btn-primary">Partner With Us</Link>
            </div>
            <div className="about-visual">
              <div className="about-image">
                <div className="image-placeholder">
                  <span className="placeholder-icon"><FaBuilding /></span>
                  <span className="placeholder-text">Innovation Hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider">
        <div className="section-divider-line"></div>
      </div>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Testimonials</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Don't just take our word for it. Here's what industry leaders 
              have to say about partnering with ZYTRONA.
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="author-info">
                    <span className="author-name">{testimonial.author}</span>
                    <span className="author-position">{testimonial.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider">
        <div className="section-divider-line"></div>
      </div>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">FAQ</span>
            <h2 className="section-title">Answers to Common Questions</h2>
            <p className="section-subtitle">
              Everything you need to know before starting your project with ZYTRONA.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => {
              const isOpen = openFaqIndex === index

              return (
                <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span>{item.question}</span>
                    <span className="faq-toggle" aria-hidden="true">⌄</span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className="faq-answer"
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider">
        <div className="section-divider-line"></div>
      </div>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Business?</h2>
            <p className="cta-subtitle">
              Let's discuss how ZYTRONA can help you achieve your goals. 
              Schedule a free consultation with our experts today.
            </p>
            <div className="cta-buttons">
              <Link to="/#contact" className="btn btn-white btn-lg">
                Schedule Consultation
              </Link>
              <a href="tel:+1234567890" className="btn btn-outline btn-lg">
                Call Us: +91 8667273159
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider">
        <div className="section-divider-line"></div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <span className="section-badge">Get In Touch</span>
              <h2 className="section-title">Let's Start a Conversation</h2>
              <p className="contact-text">
                Have a project in mind? We'd love to hear from you. 
                Reach out and let's create something amazing together.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon"><FaMapMarkerAlt /></span>
                  <div>
                    <strong>Address</strong>
                    <p>123 Innovation Drive, Tech City, TC 12345</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon"><FaEnvelope /></span>
                  <div>
                    <strong>Email</strong>
                    <p>zytronabusiness@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon"><FaPhone /></span>
                  <div>
                    <strong>Phone</strong>
                    <p>+91 8667273159</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <input id="userName" type="text" name="from_name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input id="userEmail" type="email" name="from_email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input id="subject" type="text" name="subject" placeholder="Subject" />
                </div>
                <div className="form-group">
                  <textarea id="message" name="message" placeholder="Your Message" rows={5} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={isContactSending}>
                  {isContactSending ? 'Sending...' : 'Send Message'}
                  <span className="btn-arrow">→</span>
                </button>
                {contactReplyMessage && (
                  <p className="contact-reply-message">{contactReplyMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/#home" className="nav-logo">
                <img
                  src={LOGO_SRC}
                  alt="ZYTRONA Logo"
                  className="logo-icon"
                />
                <span className="logo-text">ZYTRONA</span>
              </Link>
              <p className="footer-description">
                Empowering businesses with innovative technology solutions 
                for a digital-first world.
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
              <h4>Services</h4>
              <Link to="/service/website-development">Website Development</Link>
              <Link to="/service/app-development">App Development</Link>
              <Link to="/service/video-editing">Video Editing</Link>
              <Link to="/service/ui-designs">UI Designs</Link>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <Link to="/#about">About Us</Link>
              <Link to="/#projects">Projects Done</Link>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <Link to="/#contact">Contact</Link>
            </div>
            <div className="footer-links">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 ZYTRONA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
