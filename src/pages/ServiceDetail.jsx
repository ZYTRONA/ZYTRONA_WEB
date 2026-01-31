import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../App.css'
import logo from '../assets/logo.svg'

const servicesData = {
  'website-development': {
    icon: "",
    title: "Website Development",
    tagline: "Crafting Digital Experiences That Convert",
    description: "Build stunning, responsive websites that captivate your audience and drive business growth.",
    fullDescription: `Our website development services deliver custom, high-performance websites tailored to your business needs. We specialize in creating responsive, SEO-optimized websites that look great on all devices and convert visitors into customers.`,
    highlights: [
      { icon: "", title: "Lightning Fast", desc: "Optimized for speed and performance" },
      { icon: "", title: "Fully Responsive", desc: "Perfect on every device" },
      { icon: "", title: "Secure & Reliable", desc: "Enterprise-grade security" }
    ],
    features: [
      { title: "Custom Responsive Design", desc: "Tailored designs that adapt beautifully to all screen sizes", icon: "" },
      { title: "SEO Optimization", desc: "Built-in SEO best practices for higher search rankings", icon: "" },
      { title: "Performance Optimization", desc: "Blazing fast load times with optimized assets", icon: "" },
      { title: "CMS Integration", desc: "Easy content management with WordPress, Strapi, or custom CMS", icon: "" },
      { title: "E-commerce Ready", desc: "Full shopping cart and payment gateway integration", icon: "" },
      { title: "Analytics Setup", desc: "Track user behavior and conversion metrics", icon: "" }
    ],
    technologies: [
      { name: "React", icon: "" },
      { name: "Next.js", icon: "" },
      { name: "Vue.js", icon: "" },
      { name: "WordPress", icon: "" },
      { name: "Shopify", icon: "" },
      { name: "Node.js", icon: "" },
      { name: "TypeScript", icon: "" },
      { name: "Tailwind CSS", icon: "" }
    ],
    process: [
      { step: "Discovery", desc: "Deep dive into your business goals, target audience, and competitors", icon: "" },
      { step: "Strategy", desc: "Create a comprehensive plan with sitemap and user journeys", icon: "" },
      { step: "Design", desc: "Craft stunning UI/UX designs with your brand identity", icon: "" },
      { step: "Development", desc: "Build with clean, scalable code and modern technologies", icon: "" },
      { step: "Testing", desc: "Rigorous QA across all devices and browsers", icon: "" },
      { step: "Launch & Support", desc: "Seamless deployment with ongoing maintenance", icon: "" }
    ]
  },
  'app-development': {
    icon: "",
    title: "App Development",
    tagline: "Mobile Solutions That Users Love",
    description: "Create powerful mobile applications for iOS and Android that deliver exceptional user experiences.",
    fullDescription: `Transform your ideas into powerful mobile applications. Our expert team develops native and cross-platform apps that engage users, drive retention, and deliver measurable business results.`,
    highlights: [
      { icon: "", title: "User-Centric", desc: "Designed for engagement" },
      { icon: "", title: "Cross-Platform", desc: "iOS & Android from one codebase" },
      { icon: "", title: "Data-Driven", desc: "Built-in analytics & insights" }
    ],
    features: [
      { title: "Native Development", desc: "Pure iOS (Swift) and Android (Kotlin) apps for best performance", icon: "" },
      { title: "Cross-Platform", desc: "React Native & Flutter for efficient multi-platform deployment", icon: "" },
      { title: "UI/UX Design", desc: "Intuitive interfaces following platform design guidelines", icon: "" },
      { title: "Backend Integration", desc: "Robust APIs and real-time data synchronization", icon: "" },
      { title: "Push Notifications", desc: "Engage users with timely, personalized notifications", icon: "" },
      { title: "App Store Optimization", desc: "Maximize visibility and downloads on app stores", icon: "" }
    ],
    technologies: [
      { name: "React Native", icon: "" },
      { name: "Flutter", icon: "" },
      { name: "Swift", icon: "" },
      { name: "Kotlin", icon: "" },
      { name: "Firebase", icon: "" },
      { name: "AWS Amplify", icon: "" },
      { name: "GraphQL", icon: "" },
      { name: "MongoDB", icon: "" }
    ],
    process: [
      { step: "Ideation", desc: "Define your app concept, features, and target users", icon: "" },
      { step: "Prototyping", desc: "Create interactive prototypes to validate ideas", icon: "" },
      { step: "Design", desc: "Craft beautiful, intuitive user interfaces", icon: "" },
      { step: "Development", desc: "Build robust, scalable mobile applications", icon: "" },
      { step: "QA Testing", desc: "Comprehensive testing across devices and scenarios", icon: "" },
      { step: "Deployment", desc: "Launch on App Store and Google Play with support", icon: "" }
    ]
  },
  'video-editing': {
    icon: "",
    title: "Video Editing",
    tagline: "Stories That Captivate & Convert",
    description: "Professional video editing services to bring your visual content to life with stunning effects.",
    fullDescription: `Elevate your brand with professional video editing services. From corporate videos to viral social media content, we create compelling visual stories that captivate your audience and drive engagement.`,
    highlights: [
      { icon: "", title: "Cinematic Quality", desc: "Hollywood-grade editing" },
      { icon: "", title: "Fast Turnaround", desc: "Quick delivery times" },
      { icon: "", title: "Platform Optimized", desc: "Perfect for every channel" }
    ],
    features: [
      { title: "Color Grading", desc: "Professional color correction for cinematic looks", icon: "" },
      { title: "Motion Graphics", desc: "Eye-catching animations and visual effects", icon: "" },
      { title: "Sound Design", desc: "Professional audio mixing and sound effects", icon: "" },
      { title: "Subtitles & Captions", desc: "Accurate captions for accessibility and reach", icon: "" },
      { title: "Visual Effects", desc: "Stunning VFX and compositing", icon: "" },
      { title: "Multi-Platform Export", desc: "Optimized formats for every platform", icon: "" }
    ],
    technologies: [
      { name: "Premiere Pro", icon: "" },
      { name: "After Effects", icon: "" },
      { name: "DaVinci Resolve", icon: "" },
      { name: "Final Cut Pro", icon: "" },
      { name: "Cinema 4D", icon: "" },
      { name: "Audition", icon: "" }
    ],
    process: [
      { step: "Brief", desc: "Understand your vision, style, and goals", icon: "" },
      { step: "Review", desc: "Analyze footage and plan the edit", icon: "" },
      { step: "Assembly", desc: "Create the initial cut with pacing", icon: "" },
      { step: "Polish", desc: "Add effects, graphics, and transitions", icon: "" },
      { step: "Feedback", desc: "Collaborative revision process", icon: "" },
      { step: "Delivery", desc: "Final export in all required formats", icon: "" }
    ]
  },
  'game-development': {
    icon: "",
    title: "Game Development",
    tagline: "Immersive Worlds, Endless Possibilities",
    description: "Develop immersive and engaging games across multiple platforms with cutting-edge technology.",
    fullDescription: `Bring your game ideas to life with our comprehensive game development services. We create engaging, visually stunning games for mobile, PC, console, and emerging platforms like VR/AR.`,
    highlights: [
      { icon: "", title: "Multi-Platform", desc: "PC, Mobile, Console, VR" },
      { icon: "", title: "Stunning Visuals", desc: "Next-gen graphics" },
      { icon: "", title: "Engaging Gameplay", desc: "Addictive mechanics" }
    ],
    features: [
      { title: "2D & 3D Games", desc: "From casual mobile to AAA-quality titles", icon: "" },
      { title: "Multiplayer Systems", desc: "Real-time multiplayer and matchmaking", icon: "" },
      { title: "Monetization", desc: "In-app purchases, ads, and subscription models", icon: "" },
      { title: "AR/VR Experiences", desc: "Immersive augmented and virtual reality games", icon: "" },
      { title: "Game Analytics", desc: "Player behavior tracking and optimization", icon: "" },
      { title: "Live Operations", desc: "Ongoing updates, events, and content", icon: "" }
    ],
    technologies: [
      { name: "Unity", icon: "" },
      { name: "Unreal Engine", icon: "" },
      { name: "Godot", icon: "" },
      { name: "C#", icon: "" },
      { name: "C++", icon: "" },
      { name: "Blender", icon: "" },
      { name: "Photon", icon: "" },
      { name: "PlayFab", icon: "" }
    ],
    process: [
      { step: "Concept", desc: "Define game mechanics, story, and vision", icon: "" },
      { step: "Pre-Production", desc: "Game design document and art direction", icon: "" },
      { step: "Prototype", desc: "Build playable prototype for validation", icon: "" },
      { step: "Production", desc: "Full development with assets and polish", icon: "" },
      { step: "QA & Testing", desc: "Extensive playtesting and bug fixing", icon: "" },
      { step: "Launch", desc: "Release with marketing and live ops support", icon: "" }
    ]
  },
  'freelancing': {
    icon: "",
    title: "Freelancing",
    tagline: "Top Talent, On Demand",
    description: "Flexible freelance solutions for all your project needs with dedicated expert professionals.",
    fullDescription: `Access top-tier talent for your projects with our freelancing services. We provide skilled professionals who integrate seamlessly with your team to deliver outstanding results on time and within budget.`,
    highlights: [
      { icon: "", title: "Expert Talent", desc: "Vetted professionals" },
      { icon: "", title: "Flexible Hours", desc: "Scale up or down anytime" },
      { icon: "", title: "Cost Effective", desc: "No long-term commitments" }
    ],
    features: [
      { title: "Dedicated Experts", desc: "Skilled professionals matched to your needs", icon: "" },
      { title: "Flexible Engagement", desc: "Hourly, project-based, or retainer models", icon: "" },
      { title: "Quick Scaling", desc: "Rapidly expand your team capacity", icon: "" },
      { title: "Diverse Skills", desc: "Development, design, marketing, and more", icon: "" },
      { title: "Quality Assured", desc: "Rigorous vetting and performance tracking", icon: "" },
      { title: "Transparent Pricing", desc: "Clear rates with no hidden costs", icon: "" }
    ],
    technologies: [
      { name: "Full-Stack Dev", icon: "" },
      { name: "UI/UX Design", icon: "" },
      { name: "Digital Marketing", icon: "" },
      { name: "Content Writing", icon: "" },
      { name: "Data Analysis", icon: "" },
      { name: "Project Management", icon: "" }
    ],
    process: [
      { step: "Requirement", desc: "Define your project scope and needs", icon: "" },
      { step: "Matching", desc: "Find the perfect professional for you", icon: "" },
      { step: "Onboarding", desc: "Quick integration with your workflow", icon: "" },
      { step: "Execution", desc: "Deliver high-quality work consistently", icon: "" },
      { step: "Review", desc: "Regular check-ins and feedback loops", icon: "" },
      { step: "Completion", desc: "Project handoff with documentation", icon: "" }
    ]
  },
  'devops-linux': {
    icon: "",
    title: "DevOps & Linux Operations",
    tagline: "Automate, Deploy, Scale",
    description: "Streamline your infrastructure with DevOps practices and expert Linux system administration.",
    fullDescription: `Optimize your development workflow and infrastructure with our DevOps and Linux expertise. We help you build scalable, reliable, and secure systems that enable rapid deployment and continuous improvement.`,
    highlights: [
      { icon: "", title: "CI/CD Pipelines", desc: "Automated deployments" },
      { icon: "", title: "Containerization", desc: "Docker & Kubernetes" },
      { icon: "", title: "Security First", desc: "Hardened infrastructure" }
    ],
    features: [
      { title: "CI/CD Pipelines", desc: "Automated build, test, and deployment workflows", icon: "" },
      { title: "Infrastructure as Code", desc: "Terraform, Ansible, and CloudFormation", icon: "" },
      { title: "Container Orchestration", desc: "Docker and Kubernetes at scale", icon: "" },
      { title: "Cloud Management", desc: "AWS, Azure, and GCP infrastructure", icon: "" },
      { title: "Monitoring & Alerting", desc: "Proactive observability and incident response", icon: "" },
      { title: "Security Hardening", desc: "Secure configurations and compliance", icon: "" }
    ],
    technologies: [
      { name: "Docker", icon: "" },
      { name: "Kubernetes", icon: "" },
      { name: "Jenkins", icon: "" },
      { name: "GitLab CI", icon: "" },
      { name: "Terraform", icon: "" },
      { name: "AWS", icon: "" },
      { name: "Prometheus", icon: "" },
      { name: "Linux", icon: "" }
    ],
    process: [
      { step: "Assessment", desc: "Evaluate current infrastructure and pain points", icon: "" },
      { step: "Strategy", desc: "Design DevOps roadmap and architecture", icon: "" },
      { step: "Implementation", desc: "Set up tools, pipelines, and automation", icon: "" },
      { step: "Migration", desc: "Seamlessly transition to new infrastructure", icon: "" },
      { step: "Monitoring", desc: "Implement observability and alerting", icon: "" },
      { step: "Optimization", desc: "Continuous improvement and cost optimization", icon: "" }
    ]
  },
  'ui-designs': {
    icon: "",
    title: "UI Designs",
    tagline: "Beautiful Interfaces, Seamless Experiences",
    description: "Craft beautiful and intuitive user interfaces that enhance user engagement and satisfaction.",
    fullDescription: `Create stunning user interfaces that delight your users and strengthen your brand. Our design team combines aesthetics with usability to deliver exceptional experiences that drive conversions and loyalty.`,
    highlights: [
      { icon: "", title: "Pixel Perfect", desc: "Attention to every detail" },
      { icon: "", title: "User Research", desc: "Data-driven decisions" },
      { icon: "", title: "Responsive", desc: "All devices covered" }
    ],
    features: [
      { title: "User Research", desc: "Deep understanding of your users and their needs", icon: "" },
      { title: "Wireframing", desc: "Low-fidelity layouts for rapid iteration", icon: "" },
      { title: "Visual Design", desc: "Stunning high-fidelity mockups", icon: "" },
      { title: "Design Systems", desc: "Scalable component libraries and guidelines", icon: "" },
      { title: "Prototyping", desc: "Interactive prototypes for user testing", icon: "" },
      { title: "Accessibility", desc: "WCAG compliant, inclusive designs", icon: "" }
    ],
    technologies: [
      { name: "Figma", icon: "" },
      { name: "Adobe XD", icon: "" },
      { name: "Sketch", icon: "" },
      { name: "InVision", icon: "" },
      { name: "Principle", icon: "" },
      { name: "Framer", icon: "" },
      { name: "Illustrator", icon: "" },
      { name: "Photoshop", icon: "" }
    ],
    process: [
      { step: "Research", desc: "Understand users, competitors, and goals", icon: "" },
      { step: "Ideation", desc: "Explore concepts and design directions", icon: "" },
      { step: "Wireframe", desc: "Create low-fidelity layouts and flows", icon: "" },
      { step: "Design", desc: "Develop high-fidelity visual designs", icon: "" },
      { step: "Prototype", desc: "Build interactive prototypes for testing", icon: "" },
      { step: "Handoff", desc: "Deliver specs and assets to developers", icon: "" }
    ]
  },
  'tensorflow-ai': {
    icon: "",
    title: "TensorFlow & AI Solutions",
    tagline: "Intelligence That Transforms Business",
    description: "Leverage machine learning and AI with TensorFlow to build intelligent, data-driven applications.",
    fullDescription: `Harness the power of artificial intelligence and machine learning to transform your business. Our AI experts build intelligent solutions using TensorFlow and other cutting-edge frameworks that automate processes and unlock insights.`,
    highlights: [
      { icon: "", title: "Deep Learning", desc: "Neural network expertise" },
      { icon: "", title: "Predictive Analytics", desc: "Data-driven insights" },
      { icon: "", title: "Computer Vision", desc: "Image & video AI" }
    ],
    features: [
      { title: "Custom ML Models", desc: "Tailored machine learning solutions for your needs", icon: "" },
      { title: "NLP Solutions", desc: "Text analysis, chatbots, and language understanding", icon: "" },
      { title: "Computer Vision", desc: "Image recognition and video analysis", icon: "" },
      { title: "Predictive Analytics", desc: "Forecast trends and make data-driven decisions", icon: "" },
      { title: "Recommendation Engines", desc: "Personalized content and product suggestions", icon: "" },
      { title: "AI Integration", desc: "Seamlessly integrate AI into your applications", icon: "" }
    ],
    technologies: [
      { name: "TensorFlow", icon: "" },
      { name: "PyTorch", icon: "" },
      { name: "Keras", icon: "" },
      { name: "Python", icon: "" },
      { name: "OpenCV", icon: "" },
      { name: "Hugging Face", icon: "" },
      { name: "scikit-learn", icon: "" },
      { name: "CUDA", icon: "" }
    ],
    process: [
      { step: "Discovery", desc: "Identify AI opportunities and use cases", icon: "" },
      { step: "Data Strategy", desc: "Collect, clean, and prepare training data", icon: "" },
      { step: "Model Design", desc: "Architect and train ML models", icon: "" },
      { step: "Validation", desc: "Test accuracy and refine performance", icon: "" },
      { step: "Deployment", desc: "Integrate into production systems", icon: "" },
      { step: "Monitoring", desc: "Continuous model improvement and retraining", icon: "" }
    ]
  }
}

function ServiceDetail() {
  const { serviceId } = useParams()
  const service = servicesData[serviceId]

  // Scroll to top immediately when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [serviceId])

  if (!service) {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              <img src={logo} alt="ZYTRONA Logo" className="logo-icon" />
              <span className="logo-text">ZYTRONA</span>
            </Link>
          </div>
        </nav>
        <section className="service-detail-hero">
          <div className="container">
            <h1>Service Not Found</h1>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src={logo} alt="ZYTRONA Logo" className="logo-icon" />
            <span className="logo-text">ZYTRONA</span>
          </Link>
          <div className="nav-actions">
            <Link to="/" className="btn btn-secondary">← Back to Home</Link>
            <Link to="/#contact" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Service Hero */}
      <section className="service-detail-hero">
        <div className="hero-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="container">
          <div className="service-detail-header">
            <span className="service-badge-glow">{service.icon}</span>
            <span className="service-tagline">{service.tagline}</span>
            <h1 className="service-detail-title">{service.title}</h1>
            <p className="service-detail-subtitle">{service.fullDescription}</p>
            
            {/* Highlights */}
            <div className="service-highlights">
              {service.highlights.map((highlight, index) => (
                <div key={index} className="highlight-card">
                  <span className="highlight-icon">{highlight.icon}</span>
                  <div className="highlight-content">
                    <h4>{highlight.title}</h4>
                    <p>{highlight.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="service-features">
        <div className="container">
          <div className="section-header-detail">
            <span className="section-badge">What We Offer</span>
            <h2 className="section-title-large">Comprehensive Solutions</h2>
            <p className="section-desc">Everything you need to succeed with {service.title.toLowerCase()}</p>
          </div>
          <div className="features-grid-enhanced">
            {service.features.map((feature, index) => (
              <div key={index} className="feature-card-enhanced">
                <div className="feature-icon-box">{feature.icon}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
                <div className="feature-hover-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="service-process">
        <div className="container">
          <div className="section-header-detail">
            <span className="section-badge">Our Process</span>
            <h2 className="section-title-large">How We Work</h2>
            <p className="section-desc">A proven methodology for delivering exceptional results</p>
          </div>
          <div className="process-timeline">
            {service.process.map((item, index) => (
              <div key={index} className="process-card">
                <div className="process-connector">
                  <div className="process-line"></div>
                  <div className="process-dot">
                    <span className="process-icon">{item.icon}</span>
                  </div>
                </div>
                <div className="process-content">
                  <span className="process-step-number">Step {index + 1}</span>
                  <h3 className="process-step-title">{item.step}</h3>
                  <p className="process-step-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="service-technologies">
        <div className="container">
          <div className="section-header-detail">
            <span className="section-badge">Technologies We Use</span>
            <h2 className="section-title-large">Powered By The Best</h2>
            <p className="section-desc">Industry-leading tools and frameworks for optimal results</p>
          </div>
          <div className="tech-grid-enhanced">
            {service.technologies.map((tech, index) => (
              <div key={index} className="tech-card">
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta service-cta">
        <div className="cta-glow"></div>
        <div className="container">
          <div className="cta-content">
            <span className="cta-badge">Let's Build Together</span>
            <h2 className="cta-title">Ready to Get Started with {service.title}?</h2>
            <p className="cta-subtitle">
              Let's discuss how we can help you achieve your goals. 
              Contact us for a free consultation today.
            </p>
            <div className="cta-buttons">
              <Link to="/#contact" className="btn btn-white btn-lg">
                Contact Us
              </Link>
              <a href="tel:+918667273159" className="btn btn-outline btn-lg">
                Call Us: +91 8667273159
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>© 2026 ZYTRONA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ServiceDetail
