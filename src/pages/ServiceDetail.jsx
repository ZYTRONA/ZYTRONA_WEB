import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { 
  FaGlobe, FaMobileAlt, FaVideo, FaGamepad, FaBriefcase, FaLinux, FaPalette, FaBrain,
  FaBolt, FaLock, FaChartLine, FaFileAlt, FaShoppingCart, FaChartBar, FaSearch, FaClipboardList,
  FaCode, FaFlask, FaRocket, FaBullseye, FaSyncAlt, FaMobile, FaLink, FaBell, FaLightbulb,
  FaCogs, FaFilm, FaMagic, FaMusic, FaComments, FaStar, FaBox, FaCube, FaUsers, FaDollarSign,
  FaVrCardboard, FaUserTie, FaClock, FaCalendarAlt, FaTools, FaCheckCircle, FaGem, FaHandshake,
  FaDocker, FaCloud, FaShieldAlt, FaServer, FaEye, FaPencilRuler, FaBookOpen, FaUniversalAccess,
  FaNetworkWired, FaDatabase, FaPython, FaMicrochip,
  FaReact, FaNodeJs, FaVuejs, FaWordpress, FaShopify, FaApple, FaAndroid, FaAws, FaGitlab, FaJenkins
} from 'react-icons/fa'
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiFlutter, SiKotlin, SiFirebase, SiGraphql, SiMongodb,
  SiAdobepremierepro, SiAdobeaftereffects, SiDavinciresolve, SiBlender, SiUnity, SiUnrealengine,
  SiGodotengine, SiCplusplus, SiFigma, SiAdobexd, SiSketch, SiInvision, SiFramer,
  SiAdobeillustrator, SiAdobephotoshop, SiTensorflow, SiPytorch, SiKeras, SiOpencv, SiScikitlearn,
  SiDocker, SiKubernetes, SiTerraform, SiPrometheus, SiSharp
} from 'react-icons/si'
import { FeatureCarousel, ProcessCarousel } from '../components/MotionCarousel'
import '../App.css'
import logo from '../assets/logo.svg'

// Icon mapping for service main icons
const serviceIcons = {
  'website-development': <FaGlobe />,
  'app-development': <FaMobileAlt />,
  'video-editing': <FaVideo />,
  'game-development': <FaGamepad />,
  'freelancing': <FaBriefcase />,
  'devops-linux': <FaLinux />,
  'ui-designs': <FaPalette />,
  'tensorflow-ai': <FaBrain />
}

// Icon component mapping for dynamic rendering
const iconMap = {
  // General icons
  bolt: <FaBolt />,
  mobile: <FaMobile />,
  lock: <FaLock />,
  palette: <FaPalette />,
  chartLine: <FaChartLine />,
  rocket: <FaRocket />,
  fileAlt: <FaFileAlt />,
  shoppingCart: <FaShoppingCart />,
  chartBar: <FaChartBar />,
  search: <FaSearch />,
  clipboard: <FaClipboardList />,
  code: <FaCode />,
  flask: <FaFlask />,
  bullseye: <FaBullseye />,
  sync: <FaSyncAlt />,
  link: <FaLink />,
  bell: <FaBell />,
  lightbulb: <FaLightbulb />,
  cogs: <FaCogs />,
  film: <FaFilm />,
  magic: <FaMagic />,
  music: <FaMusic />,
  comments: <FaComments />,
  star: <FaStar />,
  box: <FaBox />,
  cube: <FaCube />,
  users: <FaUsers />,
  dollar: <FaDollarSign />,
  vr: <FaVrCardboard />,
  userTie: <FaUserTie />,
  clock: <FaClock />,
  calendar: <FaCalendarAlt />,
  tools: <FaTools />,
  checkCircle: <FaCheckCircle />,
  gem: <FaGem />,
  handshake: <FaHandshake />,
  docker: <FaDocker />,
  cloud: <FaCloud />,
  shield: <FaShieldAlt />,
  server: <FaServer />,
  eye: <FaEye />,
  pencilRuler: <FaPencilRuler />,
  book: <FaBookOpen />,
  accessible: <FaUniversalAccess />,
  network: <FaNetworkWired />,
  database: <FaDatabase />,
  brain: <FaBrain />,
  microchip: <FaMicrochip />,
  // Technology icons
  react: <FaReact />,
  nodejs: <FaNodeJs />,
  vuejs: <FaVuejs />,
  wordpress: <FaWordpress />,
  shopify: <FaShopify />,
  apple: <FaApple />,
  android: <FaAndroid />,
  aws: <FaAws />,
  gitlab: <FaGitlab />,
  jenkins: <FaJenkins />,
  nextjs: <SiNextdotjs />,
  typescript: <SiTypescript />,
  tailwind: <SiTailwindcss />,
  flutter: <SiFlutter />,
  kotlin: <SiKotlin />,
  firebase: <SiFirebase />,
  graphql: <SiGraphql />,
  mongodb: <SiMongodb />,
  premiere: <SiAdobepremierepro />,
  aftereffects: <SiAdobeaftereffects />,
  davinci: <SiDavinciresolve />,
  blender: <SiBlender />,
  unity: <SiUnity />,
  unreal: <SiUnrealengine />,
  godot: <SiGodotengine />,
  cpp: <SiCplusplus />,
  csharp: <SiSharp />,
  figma: <SiFigma />,
  xd: <SiAdobexd />,
  sketch: <SiSketch />,
  invision: <SiInvision />,
  framer: <SiFramer />,
  illustrator: <SiAdobeillustrator />,
  photoshop: <SiAdobephotoshop />,
  tensorflow: <SiTensorflow />,
  pytorch: <SiPytorch />,
  keras: <SiKeras />,
  opencv: <SiOpencv />,
  sklearn: <SiScikitlearn />,
  dockerSi: <SiDocker />,
  kubernetes: <SiKubernetes />,
  terraform: <SiTerraform />,
  prometheus: <SiPrometheus />,
  python: <FaPython />,
  linux: <FaLinux />
}

// Helper function to get icon component
const getIcon = (iconKey) => iconMap[iconKey] || null

const servicesData = {
  'website-development': {
    title: "Website Development",
    tagline: "Crafting Digital Experiences That Convert",
    description: "Build stunning, responsive websites that captivate your audience and drive business growth.",
    fullDescription: `Our website development services deliver custom, high-performance websites tailored to your business needs. We specialize in creating responsive, SEO-optimized websites that look great on all devices and convert visitors into customers.`,
    highlights: [
      { icon: "bolt", title: "Lightning Fast", desc: "Optimized for speed and performance" },
      { icon: "mobile", title: "Fully Responsive", desc: "Perfect on every device" },
      { icon: "lock", title: "Secure & Reliable", desc: "Enterprise-grade security" }
    ],
    features: [
      { title: "Custom Responsive Design", desc: "Tailored designs that adapt beautifully to all screen sizes", icon: "palette" },
      { title: "SEO Optimization", desc: "Built-in SEO best practices for higher search rankings", icon: "chartLine" },
      { title: "Performance Optimization", desc: "Blazing fast load times with optimized assets", icon: "rocket" },
      { title: "CMS Integration", desc: "Easy content management with WordPress, Strapi, or custom CMS", icon: "fileAlt" },
      { title: "E-commerce Ready", desc: "Full shopping cart and payment gateway integration", icon: "shoppingCart" },
      { title: "Analytics Setup", desc: "Track user behavior and conversion metrics", icon: "chartBar" }
    ],
    technologies: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Vue.js", icon: "vuejs" },
      { name: "WordPress", icon: "wordpress" },
      { name: "Shopify", icon: "shopify" },
      { name: "Node.js", icon: "nodejs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" }
    ],
    process: [
      { step: "Discovery", desc: "Deep dive into your business goals, target audience, and competitors", icon: "search" },
      { step: "Strategy", desc: "Create a comprehensive plan with sitemap and user journeys", icon: "clipboard" },
      { step: "Design", desc: "Craft stunning UI/UX designs with your brand identity", icon: "palette" },
      { step: "Development", desc: "Build with clean, scalable code and modern technologies", icon: "code" },
      { step: "Testing", desc: "Rigorous QA across all devices and browsers", icon: "flask" },
      { step: "Launch & Support", desc: "Seamless deployment with ongoing maintenance", icon: "rocket" }
    ]
  },
  'app-development': {
    title: "App Development",
    tagline: "Mobile Solutions That Users Love",
    description: "Create powerful mobile applications for iOS and Android that deliver exceptional user experiences.",
    fullDescription: `Transform your ideas into powerful mobile applications. Our expert team develops native and cross-platform apps that engage users, drive retention, and deliver measurable business results.`,
    highlights: [
      { icon: "users", title: "User-Centric", desc: "Designed for engagement" },
      { icon: "sync", title: "Cross-Platform", desc: "iOS & Android from one codebase" },
      { icon: "chartLine", title: "Data-Driven", desc: "Built-in analytics & insights" }
    ],
    features: [
      { title: "Native Development", desc: "Pure iOS (Swift) and Android (Kotlin) apps for best performance", icon: "apple" },
      { title: "Cross-Platform", desc: "React Native & Flutter for efficient multi-platform deployment", icon: "react" },
      { title: "UI/UX Design", desc: "Intuitive interfaces following platform design guidelines", icon: "palette" },
      { title: "Backend Integration", desc: "Robust APIs and real-time data synchronization", icon: "link" },
      { title: "Push Notifications", desc: "Engage users with timely, personalized notifications", icon: "bell" },
      { title: "App Store Optimization", desc: "Maximize visibility and downloads on app stores", icon: "chartBar" }
    ],
    technologies: [
      { name: "React Native", icon: "react" },
      { name: "Flutter", icon: "flutter" },
      { name: "Swift", icon: "apple" },
      { name: "Kotlin", icon: "kotlin" },
      { name: "Firebase", icon: "firebase" },
      { name: "AWS Amplify", icon: "aws" },
      { name: "GraphQL", icon: "graphql" },
      { name: "MongoDB", icon: "mongodb" }
    ],
    process: [
      { step: "Ideation", desc: "Define your app concept, features, and target users", icon: "lightbulb" },
      { step: "Prototyping", desc: "Create interactive prototypes to validate ideas", icon: "cogs" },
      { step: "Design", desc: "Craft beautiful, intuitive user interfaces", icon: "palette" },
      { step: "Development", desc: "Build robust, scalable mobile applications", icon: "code" },
      { step: "QA Testing", desc: "Comprehensive testing across devices and scenarios", icon: "flask" },
      { step: "Deployment", desc: "Launch on App Store and Google Play with support", icon: "rocket" }
    ]
  },
  'video-editing': {
    title: "Video Editing",
    tagline: "Stories That Captivate & Convert",
    description: "Professional video editing services to bring your visual content to life with stunning effects.",
    fullDescription: `Elevate your brand with professional video editing services. From corporate videos to viral social media content, we create compelling visual stories that captivate your audience and drive engagement.`,
    highlights: [
      { icon: "film", title: "Cinematic Quality", desc: "Hollywood-grade editing" },
      { icon: "bolt", title: "Fast Turnaround", desc: "Quick delivery times" },
      { icon: "bullseye", title: "Platform Optimized", desc: "Perfect for every channel" }
    ],
    features: [
      { title: "Color Grading", desc: "Professional color correction for cinematic looks", icon: "palette" },
      { title: "Motion Graphics", desc: "Eye-catching animations and visual effects", icon: "magic" },
      { title: "Sound Design", desc: "Professional audio mixing and sound effects", icon: "music" },
      { title: "Subtitles & Captions", desc: "Accurate captions for accessibility and reach", icon: "comments" },
      { title: "Visual Effects", desc: "Stunning VFX and compositing", icon: "star" },
      { title: "Multi-Platform Export", desc: "Optimized formats for every platform", icon: "box" }
    ],
    technologies: [
      { name: "Premiere Pro", icon: "premiere" },
      { name: "After Effects", icon: "aftereffects" },
      { name: "DaVinci Resolve", icon: "davinci" },
      { name: "Final Cut Pro", icon: "apple" },
      { name: "Cinema 4D", icon: "cube" },
      { name: "Audition", icon: "music" }
    ],
    process: [
      { step: "Brief", desc: "Understand your vision, style, and goals", icon: "clipboard" },
      { step: "Review", desc: "Analyze footage and plan the edit", icon: "search" },
      { step: "Assembly", desc: "Create the initial cut with pacing", icon: "film" },
      { step: "Polish", desc: "Add effects, graphics, and transitions", icon: "magic" },
      { step: "Feedback", desc: "Collaborative revision process", icon: "comments" },
      { step: "Delivery", desc: "Final export in all required formats", icon: "checkCircle" }
    ]
  },
  'game-development': {
    title: "Game Development",
    tagline: "Immersive Worlds, Endless Possibilities",
    description: "Develop immersive and engaging games across multiple platforms with cutting-edge technology.",
    fullDescription: `Bring your game ideas to life with our comprehensive game development services. We create engaging, visually stunning games for mobile, PC, console, and emerging platforms like VR/AR.`,
    highlights: [
      { icon: "sync", title: "Multi-Platform", desc: "PC, Mobile, Console, VR" },
      { icon: "eye", title: "Stunning Visuals", desc: "Next-gen graphics" },
      { icon: "star", title: "Engaging Gameplay", desc: "Addictive mechanics" }
    ],
    features: [
      { title: "2D & 3D Games", desc: "From casual mobile to AAA-quality titles", icon: "cube" },
      { title: "Multiplayer Systems", desc: "Real-time multiplayer and matchmaking", icon: "users" },
      { title: "Monetization", desc: "In-app purchases, ads, and subscription models", icon: "dollar" },
      { title: "AR/VR Experiences", desc: "Immersive augmented and virtual reality games", icon: "vr" },
      { title: "Game Analytics", desc: "Player behavior tracking and optimization", icon: "chartLine" },
      { title: "Live Operations", desc: "Ongoing updates, events, and content", icon: "sync" }
    ],
    technologies: [
      { name: "Unity", icon: "unity" },
      { name: "Unreal Engine", icon: "unreal" },
      { name: "Godot", icon: "godot" },
      { name: "C#", icon: "csharp" },
      { name: "C++", icon: "cpp" },
      { name: "Blender", icon: "blender" },
      { name: "Photon", icon: "network" },
      { name: "PlayFab", icon: "cloud" }
    ],
    process: [
      { step: "Concept", desc: "Define game mechanics, story, and vision", icon: "lightbulb" },
      { step: "Pre-Production", desc: "Game design document and art direction", icon: "clipboard" },
      { step: "Prototype", desc: "Build playable prototype for validation", icon: "cogs" },
      { step: "Production", desc: "Full development with assets and polish", icon: "code" },
      { step: "QA & Testing", desc: "Extensive playtesting and bug fixing", icon: "flask" },
      { step: "Launch", desc: "Release with marketing and live ops support", icon: "rocket" }
    ]
  },
  'freelancing': {
    title: "Freelancing",
    tagline: "Top Talent, On Demand",
    description: "Flexible freelance solutions for all your project needs with dedicated expert professionals.",
    fullDescription: `Access top-tier talent for your projects with our freelancing services. We provide skilled professionals who integrate seamlessly with your team to deliver outstanding results on time and within budget.`,
    highlights: [
      { icon: "userTie", title: "Expert Talent", desc: "Vetted professionals" },
      { icon: "clock", title: "Flexible Hours", desc: "Scale up or down anytime" },
      { icon: "dollar", title: "Cost Effective", desc: "No long-term commitments" }
    ],
    features: [
      { title: "Dedicated Experts", desc: "Skilled professionals matched to your needs", icon: "users" },
      { title: "Flexible Engagement", desc: "Hourly, project-based, or retainer models", icon: "calendar" },
      { title: "Quick Scaling", desc: "Rapidly expand your team capacity", icon: "chartLine" },
      { title: "Diverse Skills", desc: "Development, design, marketing, and more", icon: "tools" },
      { title: "Quality Assured", desc: "Rigorous vetting and performance tracking", icon: "checkCircle" },
      { title: "Transparent Pricing", desc: "Clear rates with no hidden costs", icon: "gem" }
    ],
    technologies: [
      { name: "Full-Stack Dev", icon: "code" },
      { name: "UI/UX Design", icon: "palette" },
      { name: "Digital Marketing", icon: "chartBar" },
      { name: "Content Writing", icon: "fileAlt" },
      { name: "Data Analysis", icon: "chartLine" },
      { name: "Project Management", icon: "clipboard" }
    ],
    process: [
      { step: "Requirement", desc: "Define your project scope and needs", icon: "clipboard" },
      { step: "Matching", desc: "Find the perfect professional for you", icon: "users" },
      { step: "Onboarding", desc: "Quick integration with your workflow", icon: "handshake" },
      { step: "Execution", desc: "Deliver high-quality work consistently", icon: "code" },
      { step: "Review", desc: "Regular check-ins and feedback loops", icon: "comments" },
      { step: "Completion", desc: "Project handoff with documentation", icon: "checkCircle" }
    ]
  },
  'devops-linux': {
    title: "DevOps & Linux Operations",
    tagline: "Automate, Deploy, Scale",
    description: "Streamline your infrastructure with DevOps practices and expert Linux system administration.",
    fullDescription: `Optimize your development workflow and infrastructure with our DevOps and Linux expertise. We help you build scalable, reliable, and secure systems that enable rapid deployment and continuous improvement.`,
    highlights: [
      { icon: "sync", title: "CI/CD Pipelines", desc: "Automated deployments" },
      { icon: "docker", title: "Containerization", desc: "Docker & Kubernetes" },
      { icon: "shield", title: "Security First", desc: "Hardened infrastructure" }
    ],
    features: [
      { title: "CI/CD Pipelines", desc: "Automated build, test, and deployment workflows", icon: "sync" },
      { title: "Infrastructure as Code", desc: "Terraform, Ansible, and CloudFormation", icon: "code" },
      { title: "Container Orchestration", desc: "Docker and Kubernetes at scale", icon: "docker" },
      { title: "Cloud Management", desc: "AWS, Azure, and GCP infrastructure", icon: "cloud" },
      { title: "Monitoring & Alerting", desc: "Proactive observability and incident response", icon: "eye" },
      { title: "Security Hardening", desc: "Secure configurations and compliance", icon: "shield" }
    ],
    technologies: [
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Jenkins", icon: "jenkins" },
      { name: "GitLab CI", icon: "gitlab" },
      { name: "Terraform", icon: "terraform" },
      { name: "AWS", icon: "aws" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "Linux", icon: "linux" }
    ],
    process: [
      { step: "Assessment", desc: "Evaluate current infrastructure and pain points", icon: "search" },
      { step: "Strategy", desc: "Design DevOps roadmap and architecture", icon: "clipboard" },
      { step: "Implementation", desc: "Set up tools, pipelines, and automation", icon: "cogs" },
      { step: "Migration", desc: "Seamlessly transition to new infrastructure", icon: "sync" },
      { step: "Monitoring", desc: "Implement observability and alerting", icon: "eye" },
      { step: "Optimization", desc: "Continuous improvement and cost optimization", icon: "chartLine" }
    ]
  },
  'ui-designs': {
    title: "UI Designs",
    tagline: "Beautiful Interfaces, Seamless Experiences",
    description: "Craft beautiful and intuitive user interfaces that enhance user engagement and satisfaction.",
    fullDescription: `Create stunning user interfaces that delight your users and strengthen your brand. Our design team combines aesthetics with usability to deliver exceptional experiences that drive conversions and loyalty.`,
    highlights: [
      { icon: "gem", title: "Pixel Perfect", desc: "Attention to every detail" },
      { icon: "users", title: "User Research", desc: "Data-driven decisions" },
      { icon: "mobile", title: "Responsive", desc: "All devices covered" }
    ],
    features: [
      { title: "User Research", desc: "Deep understanding of your users and their needs", icon: "search" },
      { title: "Wireframing", desc: "Low-fidelity layouts for rapid iteration", icon: "pencilRuler" },
      { title: "Visual Design", desc: "Stunning high-fidelity mockups", icon: "palette" },
      { title: "Design Systems", desc: "Scalable component libraries and guidelines", icon: "book" },
      { title: "Prototyping", desc: "Interactive prototypes for user testing", icon: "cogs" },
      { title: "Accessibility", desc: "WCAG compliant, inclusive designs", icon: "accessible" }
    ],
    technologies: [
      { name: "Figma", icon: "figma" },
      { name: "Adobe XD", icon: "xd" },
      { name: "Sketch", icon: "sketch" },
      { name: "InVision", icon: "invision" },
      { name: "Principle", icon: "cogs" },
      { name: "Framer", icon: "framer" },
      { name: "Illustrator", icon: "illustrator" },
      { name: "Photoshop", icon: "photoshop" }
    ],
    process: [
      { step: "Research", desc: "Understand users, competitors, and goals", icon: "search" },
      { step: "Ideation", desc: "Explore concepts and design directions", icon: "lightbulb" },
      { step: "Wireframe", desc: "Create low-fidelity layouts and flows", icon: "pencilRuler" },
      { step: "Design", desc: "Develop high-fidelity visual designs", icon: "palette" },
      { step: "Prototype", desc: "Build interactive prototypes for testing", icon: "cogs" },
      { step: "Handoff", desc: "Deliver specs and assets to developers", icon: "checkCircle" }
    ]
  },
  'tensorflow-ai': {
    title: "TensorFlow & AI Solutions",
    tagline: "Intelligence That Transforms Business",
    description: "Leverage machine learning and AI with TensorFlow to build intelligent, data-driven applications.",
    fullDescription: `Harness the power of artificial intelligence and machine learning to transform your business. Our AI experts build intelligent solutions using TensorFlow and other cutting-edge frameworks that automate processes and unlock insights.`,
    highlights: [
      { icon: "brain", title: "Deep Learning", desc: "Neural network expertise" },
      { icon: "chartLine", title: "Predictive Analytics", desc: "Data-driven insights" },
      { icon: "eye", title: "Computer Vision", desc: "Image & video AI" }
    ],
    features: [
      { title: "Custom ML Models", desc: "Tailored machine learning solutions for your needs", icon: "microchip" },
      { title: "NLP Solutions", desc: "Text analysis, chatbots, and language understanding", icon: "comments" },
      { title: "Computer Vision", desc: "Image recognition and video analysis", icon: "eye" },
      { title: "Predictive Analytics", desc: "Forecast trends and make data-driven decisions", icon: "chartLine" },
      { title: "Recommendation Engines", desc: "Personalized content and product suggestions", icon: "star" },
      { title: "AI Integration", desc: "Seamlessly integrate AI into your applications", icon: "link" }
    ],
    technologies: [
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "Keras", icon: "keras" },
      { name: "Python", icon: "python" },
      { name: "OpenCV", icon: "opencv" },
      { name: "Hugging Face", icon: "brain" },
      { name: "scikit-learn", icon: "sklearn" },
      { name: "CUDA", icon: "microchip" }
    ],
    process: [
      { step: "Discovery", desc: "Identify AI opportunities and use cases", icon: "search" },
      { step: "Data Strategy", desc: "Collect, clean, and prepare training data", icon: "database" },
      { step: "Model Design", desc: "Architect and train ML models", icon: "brain" },
      { step: "Validation", desc: "Test accuracy and refine performance", icon: "flask" },
      { step: "Deployment", desc: "Integrate into production systems", icon: "rocket" },
      { step: "Monitoring", desc: "Continuous model improvement and retraining", icon: "eye" }
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
            <Link to="/#services" className="btn btn-primary">Back to Services</Link>
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
            <Link to="/#services" className="btn btn-secondary">← Back to Services</Link>
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
            <span className="service-badge-glow">{serviceIcons[serviceId]}</span>
            <span className="service-tagline">{service.tagline}</span>
            <h1 className="service-detail-title">{service.title}</h1>
            <p className="service-detail-subtitle">{service.fullDescription}</p>
            
            {/* Highlights */}
            <div className="service-highlights">
              {service.highlights.map((highlight, index) => (
                <div key={index} className="highlight-card">
                  <span className="highlight-icon">{getIcon(highlight.icon)}</span>
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
          <FeatureCarousel features={service.features} getIcon={getIcon} />
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
          <ProcessCarousel process={service.process} getIcon={getIcon} />
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
                <span className="tech-icon">{getIcon(tech.icon)}</span>
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
