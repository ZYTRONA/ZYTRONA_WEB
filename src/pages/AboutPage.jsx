import { Link } from 'react-router-dom'
import '../App.css'

export default function AboutPage() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <span className="logo-text">ZYTRONA</span>
          </Link>
          <div className="nav-actions">
            <Link to="/#about" className="btn btn-secondary">← Back</Link>
          </div>
        </div>
      </nav>

      <section className="about-page">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">About ZYTRONA</h1>
            <p className="section-subtitle">
              Empowering businesses through innovative technology solutions
            </p>
          </div>

          <div className="about-content">
            <p>
              ZYTRONA is a team of passionate technologists dedicated to delivering cutting-edge solutions 
              that transform businesses and create lasting impact.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
