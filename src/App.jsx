import { useState } from 'react'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const services = [
    {
      icon: "💡",
      title: "Innovation Consulting",
      description: "Transform your business with cutting-edge strategies and innovative solutions tailored to your needs."
    },
    {
      icon: "⚡",
      title: "Digital Transformation",
      description: "Accelerate your digital journey with our comprehensive transformation services and expertise."
    },
    {
      icon: "🛡️",
      title: "Cybersecurity",
      description: "Protect your assets with enterprise-grade security solutions and 24/7 monitoring services."
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Scale effortlessly with our cloud infrastructure and migration services for modern businesses."
    },
    {
      icon: "📊",
      title: "Data Analytics",
      description: "Unlock insights from your data with advanced analytics and AI-powered business intelligence."
    },
    {
      icon: "🔧",
      title: "Custom Development",
      description: "Build tailored software solutions that perfectly align with your unique business requirements."
    }
  ]

  const stats = [
    { value: "500+", label: "Clients Worldwide" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "15+", label: "Years Experience" },
    { value: "24/7", label: "Support Available" }
  ]

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

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#" className="nav-logo">
            <span className="logo-icon">Z</span>
            <span className="logo-text">ZYTRONA</span>
          </a>
          
          <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <a href="#home" className="nav-link">Home</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#testimonials" className="nav-link">Testimonials</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <div className="nav-actions">
            <a href="#contact" className="btn btn-primary">Get Started</a>
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
            <span className="hero-badge">🚀 Welcome to the Future</span>
            <h1 className="hero-title">
              Innovating Tomorrow's
              <span className="gradient-text"> Technology Today</span>
            </h1>
            <p className="hero-subtitle">
              We deliver cutting-edge technology solutions that empower businesses 
              to thrive in the digital age. Transform, innovate, and lead with ZYTRONA.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary btn-lg">
                Start Your Journey
                <span className="btn-arrow">→</span>
              </a>
              <a href="#services" className="btn btn-secondary btn-lg">
                Explore Services
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-graphic">
              <div className="graphic-circle"></div>
              <div className="graphic-circle"></div>
              <div className="graphic-circle"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <a href="#contact" className="service-link">
                  Learn More <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-badge">About ZYTRONA</span>
              <h2 className="section-title">Pioneering Digital Excellence Since 2010</h2>
              <p className="about-text">
                At ZYTRONA, we believe in the transformative power of technology. 
                Our team of experts combines deep industry knowledge with cutting-edge 
                innovation to deliver solutions that drive real business results.
              </p>
              <p className="about-text">
                With over 15 years of experience serving Fortune 500 companies and 
                ambitious startups alike, we've built a reputation for excellence, 
                reliability, and forward-thinking solutions.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <span className="feature-check">✓</span>
                  <span>Industry-Leading Expertise</span>
                </div>
                <div className="about-feature">
                  <span className="feature-check">✓</span>
                  <span>Tailored Solutions</span>
                </div>
                <div className="about-feature">
                  <span className="feature-check">✓</span>
                  <span>24/7 Dedicated Support</span>
                </div>
                <div className="about-feature">
                  <span className="feature-check">✓</span>
                  <span>Proven Track Record</span>
                </div>
              </div>
              <a href="#contact" className="btn btn-primary">Partner With Us</a>
            </div>
            <div className="about-visual">
              <div className="about-image">
                <div className="image-placeholder">
                  <span className="placeholder-icon">🏢</span>
                  <span className="placeholder-text">Innovation Hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <a href="#contact" className="btn btn-white btn-lg">
                Schedule Consultation
              </a>
              <a href="tel:+1234567890" className="btn btn-outline btn-lg">
                Call Us: +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </section>

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
                  <span className="contact-icon">📍</span>
                  <div>
                    <strong>Address</strong>
                    <p>123 Innovation Drive, Tech City, TC 12345</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <strong>Email</strong>
                    <p>hello@zytrona.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <strong>Phone</strong>
                    <p>+1 (234) 567-890</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrapper">
              <form className="contact-form">
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Subject" />
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  Send Message
                  <span className="btn-arrow">→</span>
                </button>
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
              <a href="#" className="nav-logo">
                <span className="logo-icon">Z</span>
                <span className="logo-text">ZYTRONA</span>
              </a>
              <p className="footer-description">
                Empowering businesses with innovative technology solutions 
                for a digital-first world.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">in</a>
                <a href="#" className="social-link">𝕏</a>
                <a href="#" className="social-link">f</a>
                <a href="#" className="social-link">ig</a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Services</h4>
              <a href="#">Innovation Consulting</a>
              <a href="#">Digital Transformation</a>
              <a href="#">Cybersecurity</a>
              <a href="#">Cloud Solutions</a>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
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
