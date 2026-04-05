import { Link } from 'react-router-dom'
import '../App.css'

export default function ServicesPage() {
  const services = [
    {
      id: "website-development",
      title: "Website Development",
      description: "Build stunning, responsive websites that captivate your audience and drive business growth."
    },
    {
      id: "app-development",
      title: "App Development",
      description: "Create powerful mobile applications for iOS and Android that deliver exceptional user experiences."
    },
    {
      id: "video-editing",
      title: "Video Editing",
      description: "Professional video editing services to bring your visual content to life with stunning effects."
    },
    {
      id: "ui-designs",
      title: "UI Designs",
      description: "Craft beautiful and intuitive user interfaces that enhance user engagement and satisfaction."
    }
  ]

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <span className="logo-text">ZYTRONA</span>
          </Link>
          <div className="nav-actions">
            <Link to="/#services" className="btn btn-secondary">← Back</Link>
          </div>
        </div>
      </nav>

      <section className="services-page">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Our Services</h1>
            <p className="section-subtitle">
              Comprehensive solutions for your business needs
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={`/service/${service.id}`} className="btn btn-primary">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
