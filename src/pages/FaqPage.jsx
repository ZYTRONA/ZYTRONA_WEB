import { Link } from 'react-router-dom'
import '../App.css'

export default function FaqPage() {
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

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <span className="logo-text">ZYTRONA</span>
          </Link>
          <div className="nav-actions">
            <Link to="/#faq" className="btn btn-secondary">← Back</Link>
          </div>
        </div>
      </nav>

      <section className="faq-page">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Frequently Asked Questions</h1>
            <p className="section-subtitle">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
