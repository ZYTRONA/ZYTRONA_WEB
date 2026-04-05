import { Link } from 'react-router-dom'
import '../App.css'

export default function PortfolioPage() {
  const projects = [
    {
      name: 'ZYCARE',
      purpose: 'Healthcare-focused platform designed to streamline care workflows and digital patient interactions.',
      stack: 'TypeScript',
      url: 'https://github.com/ZYTRONA/ZYCARE'
    },
    {
      name: 'ZYGLASS',
      purpose: 'Python project for practical automation and data-driven workflows in real-world business use cases.',
      stack: 'Python',
      url: 'https://github.com/ZYTRONA/ZYGLASS'
    },
    {
      name: 'ZYCROP',
      purpose: 'Web application initiative focused on domain-specific workflows and user-first functionality.',
      stack: 'JavaScript',
      url: 'https://github.com/ZYTRONA/ZYCROP'
    },
    {
      name: 'NUMMAZE',
      purpose: 'Interactive logic and number-based web experience built to improve engagement and problem-solving.',
      stack: 'JavaScript',
      url: 'https://github.com/ZYTRONA/NUMMAZE'
    },
    {
      name: 'ZYNC-CHAT',
      purpose: 'Real-time communication application prototype built around fast, lightweight messaging interactions.',
      stack: 'JavaScript',
      url: 'https://github.com/ZYTRONA/ZYNC-CHAT'
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
            <Link to="/#projects" className="btn btn-secondary">← Back</Link>
          </div>
        </div>
      </nav>

      <section className="portfolio-page">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Our Portfolio</h1>
            <p className="section-subtitle">
              Showcasing our innovative projects and solutions
            </p>
          </div>

          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <div key={index} className="portfolio-item">
                <h3>{project.name}</h3>
                <p className="stack">{project.stack}</p>
                <p className="description">{project.purpose}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
