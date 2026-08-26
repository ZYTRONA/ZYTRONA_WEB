import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Navbar, 
  NavBody, 
  NavItems,
  NavbarLogo, 
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu
} from '@/components/ui/resizable-navbar'
import { Footer } from '@/components/ui/Footer'
import { Marquee } from '@/components/shadcn-space/animations/marquee'
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Palette, 
  Server, 
  Video, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Lock, 
  Clock, 
  Sparkles, 
  Phone, 
  Mail, 
  MessageSquare, 
  Check, 
  Copy, 
  ChevronDown,
  Code2,
  GitBranch,
  FileCheck,
  Award,
  Film
} from 'lucide-react'
import { 
  FaReact, FaNodeJs, FaApple, FaAws, FaDocker, 
  FaPython, FaWhatsapp
} from 'react-icons/fa'
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiFlutter, SiKotlin, SiFirebase, SiGraphql, SiMongodb,
  SiDavinciresolve, SiFigma, SiFramer,
  SiTensorflow, SiPytorch, SiKeras, SiOpencv, SiScikitlearn,
  SiKubernetes, SiTerraform, SiPrometheus, SiLinux, SiPostgresql, SiRedis
} from 'react-icons/si'
import '@/App.css'

const SERVICES_FULL_DATA = {
  'website-development': {
    id: 'website-development',
    icon: <Globe className="w-8 h-8" />,
    badge: 'Enterprise Web & SaaS Architecture',
    title: 'Web Development & Cloud SaaS',
    tagline: 'High-Performance Web Platforms Built for Scale & Conversion',
    description: 'We engineer lightning-fast, secure, and SEO-optimized web applications and SaaS platforms. Built with modern modular architectures, sub-second latency, and enterprise-grade resilience.',
    metrics: [
      { label: 'Lighthouse Score', value: '98/100' },
      { label: 'Average Page Load', value: '< 0.8s' },
      { label: 'Uptime Reliability', value: '99.99%' },
      { label: 'IP Ownership', value: '100%' }
    ],
    highlights: [
      { icon: <Zap className="w-5 h-5" />, title: 'Sub-Second Vitals', desc: 'Engineered for instant first-contentful paint and top Google Core Web Vitals rankings.' },
      { icon: <ShieldCheck className="w-5 h-5" />, title: 'Enterprise Security', desc: 'Automated CSRF/XSS protection, rate-limiting, and strict SSL/TLS encryption.' },
      { icon: <Layers className="w-5 h-5" />, title: 'Modular Architecture', desc: 'Clean micro-frontends and REST/GraphQL APIs for effortless future scaling.' }
    ],
    features: [
      { title: 'Custom React 19 & Next.js Platforms', desc: 'SSR, SSG, and streaming edge rendering for maximum speed and instant page loads.', icon: <Code2 className="w-5 h-5" /> },
      { title: 'Full-Stack SaaS & Multi-Tenancy', desc: 'Secure user authentication, role-based access control (RBAC), and subscription billing.', icon: <Lock className="w-5 h-5" /> },
      { title: 'SEO & Technical Optimization', desc: 'Semantic HTML5 structure, automated dynamic OpenGraph metadata, and structured JSON-LD schemas.', icon: <Sparkles className="w-5 h-5" /> },
      { title: 'Headless CMS & Commerce', desc: 'Seamless integration with Shopify, Strapi, Sanity, and custom REST/GraphQL endpoints.', icon: <Layers className="w-5 h-5" /> },
      { title: 'Real-Time WebSockets & Analytics', desc: 'Low-latency live data feeds, user behavior tracking, and executive telemetry dashboards.', icon: <Zap className="w-5 h-5" /> },
      { title: 'Continuous Automated CI/CD', desc: 'Zero-downtime GitHub Actions deployment with automated build tests and branch previews.', icon: <GitBranch className="w-5 h-5" /> }
    ],
    deliverables: [
      'Production-ready, fully commented GitHub / GitLab repository',
      'Automated CI/CD deployment pipelines with Docker configuration',
      'Full TypeScript type safety definitions and automated tests',
      'Comprehensive REST / GraphQL API documentation and architectural blueprint',
      'Figma design system tokens & responsive component libraries',
      '100% intellectual property transfer and NDA protection'
    ],
    technologies: [
      { name: 'React 19', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', icon: <FaReact size={24} /> },
      { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', icon: <SiNextdotjs size={24} /> },
      { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', icon: <SiTypescript size={24} /> },
      { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', icon: <SiTailwindcss size={24} /> },
      { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', icon: <FaNodeJs size={24} /> },
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', icon: <SiPostgresql size={24} /> },
      { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg', icon: <SiRedis size={24} /> },
      { name: 'AWS Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', icon: <FaAws size={24} /> }
    ],
    process: [
      { step: '01', title: 'Architecture Discovery', desc: 'We analyze your product vision, target audience, database schemas, and performance requirements.' },
      { step: '02', title: 'UI/UX Prototyping', desc: 'Designing interactive high-fidelity wireframes and responsive layouts in Figma.' },
      { step: '03', title: 'Agile Sprint Slices', desc: 'Bi-weekly milestone deliveries with transparent GitHub commits and live staging previews.' },
      { step: '04', title: 'Security & QA Hardening', desc: 'Rigorous cross-browser stress testing, Lighthouse audits, and penetration testing.' },
      { step: '05', title: 'Launch & 24/7 Support', desc: 'Zero-downtime deployment, DNS propagation, cloud monitoring, and dedicated post-launch SLA.' }
    ],
    faqs: [
      { q: 'How long does a typical custom web platform take to develop?', a: 'Standard MVP platforms take 3 to 6 weeks, while large-scale multi-tenant enterprise SaaS applications typically range from 6 to 12 weeks with bi-weekly milestone deliverables.' },
      { q: 'Do we own the full source code and intellectual property?', a: 'Yes, 100%. All repository code, database schemas, Figma design files, and documentation belong completely to your company upon milestone delivery.' },
      { q: 'How do you ensure optimal page speed and SEO rankings?', a: 'We build with modern Next.js server components, edge caching, image compression, minimal bundle sizing, and strict Core Web Vitals compliance aiming for 95+ Lighthouse scores.' }
    ]
  },

  'app-development': {
    id: 'app-development',
    icon: <Smartphone className="w-8 h-8" />,
    badge: 'Native & Cross-Platform Mobile Engineering',
    title: 'Mobile App Engineering',
    tagline: 'Fluid, 60fps Mobile Applications for iOS & Android',
    description: 'We build high-performance mobile apps engineered for fluid touch gestures, instant offline data syncing, and frictionless user experiences across all Apple iOS and Google Android devices.',
    metrics: [
      { label: 'UI Frame Rate', value: '60 - 120 FPS' },
      { label: 'App Store Rating', value: '4.9/5 Avg' },
      { label: 'Crash-Free Rate', value: '99.9%' },
      { label: 'Code Reusability', value: 'Up to 90%' }
    ],
    highlights: [
      { icon: <Zap className="w-5 h-5" />, title: 'Native Performance', desc: 'Zero-lag animations, hardware acceleration, and optimized memory usage.' },
      { icon: <Layers className="w-5 h-5" />, title: 'Offline-First Sync', desc: 'Robust local SQLite/MMKV caching with background cloud reconciliation.' },
      { icon: <ShieldCheck className="w-5 h-5" />, title: 'Store Compliance', desc: 'Full compliance with Apple App Store & Google Play Store guidelines.' }
    ],
    features: [
      { title: 'React Native & Flutter Mastery', desc: 'Unified high-performance codebase delivering authentic native iOS and Android apps.', icon: <Code2 className="w-5 h-5" /> },
      { title: 'Biometric & Secure Auth', desc: 'Face ID, Touch ID, biometric encryption, and secure keychain credential storage.', icon: <Lock className="w-5 h-5" /> },
      { title: 'Push Notification Pipelines', desc: 'Targeted rich push notifications, background silent alerts, and scheduled user messaging.', icon: <Sparkles className="w-5 h-5" /> },
      { title: 'In-App Purchases & Subscriptions', desc: 'Integration with Apple StoreKit, Google Play Billing, and RevenueCat platforms.', icon: <Layers className="w-5 h-5" /> },
      { title: 'Real-Time Chat & Media Uploads', desc: 'Instant messaging, audio/video streaming, and background multipart media uploads.', icon: <Zap className="w-5 h-5" /> },
      { title: 'App Store Submission & Approval', desc: 'End-to-end management of certificates, provisioning profiles, review approval, and releases.', icon: <FileCheck className="w-5 h-5" /> }
    ],
    deliverables: [
      'Clean React Native / Flutter source code with modular architecture',
      'Configured iOS (Xcode) and Android (Gradle) native build projects',
      'Full App Store & Google Play Store metadata and screenshot kit',
      'Automated Fastlane build and TestFlight / Play Console deployment scripts',
      'Post-launch crash monitoring (Sentry / Firebase Crashlytics) setup'
    ],
    technologies: [
      { name: 'React Native', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', icon: <FaReact size={24} /> },
      { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg', icon: <SiFlutter size={24} /> },
      { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', icon: <SiTypescript size={24} /> },
      { name: 'iOS Swift', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg', icon: <FaApple size={24} /> },
      { name: 'Kotlin', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg', icon: <SiKotlin size={24} /> },
      { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg', icon: <SiFirebase size={24} /> },
      { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg', icon: <SiGraphql size={24} /> },
      { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', icon: <SiMongodb size={24} /> }
    ],
    process: [
      { step: '01', title: 'User Flow Mapping', desc: 'Architecting wireframes, navigation stacks, screen states, and offline behavior.' },
      { step: '02', title: 'Figma Mobile Design', desc: 'Crafting pixel-perfect iOS & Android UI screens adhering to HIG & Material 3.' },
      { step: '03', title: 'Component Engineering', desc: 'Developing fluid screens, micro-interactions, and API client integrations.' },
      { step: '04', title: 'Device Matrix Testing', desc: 'Testing across a spectrum of real iPhones, iPads, and Android phone screen resolutions.' },
      { step: '05', title: 'Store Publication', desc: 'Managing TestFlight betas, signing, submission, and public store rollout.' }
    ],
    faqs: [
      { q: 'Should we build cross-platform or native?', a: 'For 90% of business applications, React Native or Flutter offers native 60fps performance while cutting development time and maintenance costs by over 40%.' },
      { q: 'Do you assist with Apple App Store and Google Play approval?', a: 'Yes, we manage the complete submission process, including developer accounts, privacy declarations, screenshots, and addressing review guidelines.' }
    ]
  },

  'tensorflow-ai': {
    id: 'tensorflow-ai',
    icon: <Cpu className="w-8 h-8" />,
    badge: 'Applied AI & Neural Engineering',
    title: 'AI & Machine Learning Automation',
    tagline: 'Custom Neural Models, Computer Vision & LLM Workflow Automation',
    description: 'Transform raw data into competitive intelligence. We develop custom machine learning models, computer vision systems, natural language processing, and automated AI workflows tailored to your business operations.',
    metrics: [
      { label: 'Inference Latency', value: '< 50ms' },
      { label: 'Model Accuracy', value: '96%+' },
      { label: 'Pipeline Automation', value: '24/7 Live' },
      { label: 'Data Security', value: 'Air-Gapped' }
    ],
    highlights: [
      { icon: <Cpu className="w-5 h-5" />, title: 'Custom Model Training', desc: 'Custom fine-tuned neural models built specifically on your domain data.' },
      { icon: <Zap className="w-5 h-5" />, title: 'Edge & Cloud Inference', desc: 'Optimized ONNX / TensorRT runtime for blazing fast millisecond predictions.' },
      { icon: <ShieldCheck className="w-5 h-5" />, title: 'Private & Secure', desc: 'Zero data leakage — models deployed directly within your dedicated private VPC.' }
    ],
    features: [
      { title: 'Custom LLM & Agent Pipelines', desc: 'RAG (Retrieval-Augmented Generation), vector databases, and autonomous business workflows.', icon: <Code2 className="w-5 h-5" /> },
      { title: 'Computer Vision & Detection', desc: 'Real-time object detection, OCR document parsing, video analysis, and facial recognition.', icon: <Sparkles className="w-5 h-5" /> },
      { title: 'Predictive Analytics & Forecasting', desc: 'Time-series forecasting, predictive customer churn, demand estimation, and risk analytics.', icon: <Zap className="w-5 h-5" /> },
      { title: 'NLP & Conversational AI', desc: 'Intelligent customer assistants, sentiment extraction, classification, and summarization.', icon: <Layers className="w-5 h-5" /> },
      { title: 'Automated Data ETL Pipelines', desc: 'Data cleaning, feature engineering, synthetic data generation, and training pipelines.', icon: <GitBranch className="w-5 h-5" /> },
      { title: 'Model Monitoring & Retraining', desc: 'Drift detection, automated regression testing, telemetry tracking, and continuous retraining.', icon: <FileCheck className="w-5 h-5" /> }
    ],
    deliverables: [
      'Complete Python training and inference repository with documented notebooks',
      'Serialized model weights (ONNX / TorchScript / TensorFlow SavedModel)',
      'Containerized FastAPI microservice for high-throughput prediction requests',
      'Automated data validation and model evaluation test suite',
      'Private cloud deployment script (AWS SageMaker, ECS, or bare metal)'
    ],
    technologies: [
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', icon: <FaPython size={24} /> },
      { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg', icon: <SiPytorch size={24} /> },
      { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg', icon: <SiTensorflow size={24} /> },
      { name: 'Keras', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg', icon: <SiKeras size={24} /> },
      { name: 'OpenCV', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg', icon: <SiOpencv size={24} /> },
      { name: 'scikit-learn', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg', icon: <SiScikitlearn size={24} /> },
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', icon: <FaDocker size={24} /> },
      { name: 'AWS SageMaker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', icon: <FaAws size={24} /> }
    ],
    process: [
      { step: '01', title: 'Data Audit & Feasibility', desc: 'Assessing your data quality, labeling requirements, and target accuracy metrics.' },
      { step: '02', title: 'Baseline Prototyping', desc: 'Rapidly training initial model architectures to validate feasibility and benchmark latency.' },
      { step: '03', title: 'Hyperparameter Tuning', desc: 'Optimizing model depth, regularization, and feature engineering to maximize precision.' },
      { step: '04', title: 'Containerized API Serving', desc: 'Wrapping models inside asynchronous FastAPI microservices with batching optimization.' },
      { step: '05', title: 'Production Telemetry', desc: 'Deploying with real-time inference latency and accuracy drift alerts.' }
    ],
    faqs: [
      { q: 'How do you protect our proprietary training data?', a: 'All training and inference routines execute inside your private cloud environment or air-gapped instances. We never share, expose, or use your data outside your project.' },
      { q: 'Can you integrate AI into our existing web or mobile app?', a: 'Yes. We build clean REST or gRPC API endpoints that integrate seamlessly with your current web, mobile, or backend stack.' }
    ]
  },

  'ui-designs': {
    id: 'ui-designs',
    icon: <Palette className="w-8 h-8" />,
    badge: 'Design Systems & Product UX',
    title: 'UI/UX & Product Design Systems',
    tagline: 'Intuitive Interfaces, Conversion-Focused Design & Scalable Tokens',
    description: 'We craft human-centric UI/UX designs, comprehensive component libraries, and interactive Figma prototypes engineered to maximize user retention, product adoption, and business conversion.',
    metrics: [
      { label: 'Design Tokens', value: '100% Sync' },
      { label: 'Figma Components', value: '250+ UI' },
      { label: 'Accessibility', value: 'WCAG AAA' },
      { label: 'User Retention Boost', value: '+40% Avg' }
    ],
    highlights: [
      { icon: <Palette className="w-5 h-5" />, title: 'Pixel-Perfect Systems', desc: 'Clean typography scales, color tokens, and atomic components built for developers.' },
      { icon: <Sparkles className="w-5 h-5" />, title: 'Conversion-Driven', desc: 'Eliminating user friction through heuristic analysis and optimized user journeys.' },
      { icon: <Layers className="w-5 h-5" />, title: 'Interactive Prototypes', desc: 'High-fidelity Figma flows ready for stakeholder validation and usability testing.' }
    ],
    features: [
      { title: 'Atomic Design Component Libraries', desc: 'Reusable, themeable design systems in Figma with auto-layout and variable tokens.', icon: <Code2 className="w-5 h-5" /> },
      { title: 'User Research & Wireframing', desc: 'Customer persona mapping, empathy mapping, and rapid low-fidelity wireframes.', icon: <Sparkles className="w-5 h-5" /> },
      { title: 'Interactive Micro-Interactions', desc: 'Engaging micro-animations, hover states, transitions, and loading feedback.', icon: <Zap className="w-5 h-5" /> },
      { title: 'Design-to-Code Handoff', desc: 'Developer-ready specs, asset exports, Tailwind tokens, and CSS property documentation.', icon: <Layers className="w-5 h-5" /> },
      { title: 'Responsive Multi-Device Views', desc: 'Dedicated mobile, tablet, desktop, and ultra-wide responsive viewport layouts.', icon: <Smartphone className="w-5 h-5" /> },
      { title: 'Accessibility Compliance', desc: 'WCAG 2.1 AAA color contrast checks, screen reader compatibility, and touch-target sizing.', icon: <ShieldCheck className="w-5 h-5" /> }
    ],
    deliverables: [
      'Comprehensive Figma project file with full component library and variants',
      'Design Token JSON export compatible with Tailwind CSS & CSS variables',
      'Clickable interactive user journey prototype for usability testing',
      'Exported icon packages, SVGs, and responsive brand assets',
      'Developer handoff documentation detailing animations and state transitions'
    ],
    technologies: [
      { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', icon: <SiFigma size={24} /> },
      { name: 'Framer', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg', icon: <SiFramer size={24} /> },
      { name: 'Tailwind Tokens', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', icon: <SiTailwindcss size={24} /> },
      { name: 'Design Systems', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/storybook/storybook-original.svg', icon: <Palette size={24} /> },
      { name: 'Motion Design', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg', icon: <Sparkles size={24} /> },
      { name: 'UI Systems', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-original.svg', icon: <Layers size={24} /> }
    ],
    process: [
      { step: '01', title: 'UX Research & Audit', desc: 'Analyzing user goals, existing product bottlenecks, and competitor design patterns.' },
      { step: '02', title: 'Information Architecture', desc: 'Mapping user journeys, sitemaps, and low-fidelity structural wireframes.' },
      { step: '03', title: 'Visual UI Direction', desc: 'Crafting moodboards, typography, color palettes, and hero concept directions.' },
      { step: '04', title: 'Component Library', desc: 'Building full Figma auto-layout components, modal states, and design tokens.' },
      { step: '05', title: 'Developer Handoff', desc: 'Providing interactive specs, assets, and token documentation to the engineering team.' }
    ],
    faqs: [
      { q: 'How easily can developers implement your Figma designs?', a: 'Very easily. Every screen uses Figma Auto-Layout, proper naming conventions, and Tailwind-compatible tokens, making development 50% faster.' },
      { q: 'Do you create interactive prototypes?', a: 'Yes, we provide clickable prototypes showing real page transitions, dropdowns, and button states so you can experience the app before writing any code.' }
    ]
  },

  'devops-linux': {
    id: 'devops-linux',
    icon: <Server className="w-8 h-8" />,
    badge: 'Cloud Infrastructure & SRE',
    title: 'Cloud & DevOps Infrastructure',
    tagline: 'Automated CI/CD, Container Orchestration & Resilient Cloud Architecture',
    description: 'We design, automate, and manage rock-solid cloud infrastructure. From automated GitHub Actions deployment pipelines to Kubernetes orchestration, Terraform IaC, and 24/7 observability.',
    metrics: [
      { label: 'Deployment Speed', value: '10x Faster' },
      { label: 'Uptime SLA', value: '99.99%' },
      { label: 'Rollback Recovery', value: '< 60s' },
      { label: 'Cloud Cost Savings', value: 'Up to 35%' }
    ],
    highlights: [
      { icon: <Server className="w-5 h-5" />, title: 'Zero-Downtime Releases', desc: 'Blue-green and rolling deployment strategies with instant automatic rollbacks.' },
      { icon: <ShieldCheck className="w-5 h-5" />, title: 'Hardened Security', desc: 'IAM least-privilege, automated vulnerability scanning, and encrypted secrets.' },
      { icon: <Zap className="w-5 h-5" />, title: 'Automated Scaling', desc: 'Horizontal autoscaling dynamically provisioned based on traffic spikes.' }
    ],
    features: [
      { title: 'Docker & Kubernetes (K8s)', desc: 'Containerizing microservices with self-healing pods, ingress controllers, and load balancers.', icon: <Code2 className="w-5 h-5" /> },
      { title: 'Infrastructure as Code (Terraform)', desc: 'Repeatable, version-controlled cloud environments on AWS, Google Cloud, or Azure.', icon: <Layers className="w-5 h-5" /> },
      { title: 'CI/CD Pipeline Automation', desc: 'Automated linting, unit testing, docker building, and multi-stage deployment workflows.', icon: <GitBranch className="w-5 h-5" /> },
      { title: 'Linux Server Administration', desc: 'Kernel tuning, systemd process management, firewall security (UFW/iptables), and Nginx reverse proxies.', icon: <Server className="w-5 h-5" /> },
      { title: 'Observability & Monitoring', desc: 'Prometheus metrics, Grafana dashboards, centralized Loki/ELK logging, and Slack/PagerDuty alerts.', icon: <Zap className="w-5 h-5" /> },
      { title: 'Cloud Cost Optimization', desc: 'Right-sizing cloud instances, spot instance scheduling, and egress optimization.', icon: <ShieldCheck className="w-5 h-5" /> }
    ],
    deliverables: [
      'Modular Terraform / OpenTofu infrastructure codebase',
      'Production multi-stage Dockerfiles and Helm charts',
      'Fully automated GitHub Actions / GitLab CI pipeline workflows',
      'Configured Grafana monitoring dashboards with custom alert rules',
      'Comprehensive disaster recovery and automated backup runbook'
    ],
    technologies: [
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', icon: <FaDocker size={24} /> },
      { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg', icon: <SiKubernetes size={24} /> },
      { name: 'Terraform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg', icon: <SiTerraform size={24} /> },
      { name: 'AWS Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', icon: <FaAws size={24} /> },
      { name: 'Prometheus', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg', icon: <SiPrometheus size={24} /> },
      { name: 'Linux OS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', icon: <SiLinux size={24} /> },
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', icon: <SiPostgresql size={24} /> },
      { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg', icon: <SiRedis size={24} /> }
    ],
    process: [
      { step: '01', title: 'Infrastructure Audit', desc: 'Assessing your existing cloud setup, cost structure, security posture, and bottlenecks.' },
      { step: '02', title: 'Architecture Blueprint', desc: 'Designing resilient VPC networking, container clusters, and security policies.' },
      { step: '03', title: 'Terraform & CI/CD Setup', desc: 'Writing modular IaC scripts and automated build & test deployment pipelines.' },
      { step: '04', title: 'Observability & Hardening', desc: 'Configuring metrics, tracing, audit logging, and automated incident alert channels.' },
      { step: '05', title: 'Handover & Runbooks', desc: 'Conducting live team walkthroughs and providing documented operations runbooks.' }
    ],
    faqs: [
      { q: 'Can you migrate our existing infrastructure to Kubernetes without downtime?', a: 'Yes. We use traffic mirroring and blue/green DNS cutovers to ensure 100% uptime during cloud and cluster migrations.' },
      { q: 'Do you help lower monthly AWS or cloud hosting bills?', a: 'Yes. Our infrastructure audits routinely identify unused resources, oversized instances, and architecture inefficiencies, reducing monthly bills by 20% to 40%.' }
    ]
  },

  'video-editing': {
    id: 'video-editing',
    icon: <Video className="w-8 h-8" />,
    badge: 'Cinematic Motion & VFX Production',
    title: 'Commercial Video & Motion Graphics',
    tagline: 'High-Impact Brand Videos, 3D Product Demos & Motion Graphics',
    description: 'We produce compelling commercial videos, 3D product animations, motion graphics, and visual effects that capture attention, explain complex software, and drive high conversion across digital marketing channels.',
    metrics: [
      { label: 'Video Resolution', value: '4K / 60 FPS' },
      { label: 'Turnaround Time', value: '3 - 7 Days' },
      { label: 'Client Approvals', value: '99%' },
      { label: 'Multi-Platform', value: '100% Optimized' }
    ],
    highlights: [
      { icon: <Video className="w-5 h-5" />, title: 'Cinematic Visuals', desc: 'Hollywood-grade color grading, dynamic sound design, and custom motion graphics.' },
      { icon: <Sparkles className="w-5 h-5" />, title: 'Product Storytelling', desc: 'Distilling complex software features into crisp, engaging 60-second video stories.' },
      { icon: <Zap className="w-5 h-5" />, title: 'Rapid Delivery', desc: 'Iterative review cycles with frame-accurate timestamp feedback.' }
    ],
    features: [
      { title: 'Commercial SaaS & Product Demos', desc: 'High-end UI screen recordings with 3D camera sweeps, zooms, and kinetic typography.', icon: <Code2 className="w-5 h-5" /> },
      { title: 'Kinetic Motion Graphics & VFX', desc: 'Custom 2D/3D logo animations, lower-thirds, infographic callouts, and particle effects.', icon: <Sparkles className="w-5 h-5" /> },
      { title: 'Cinematic Color Grading', desc: 'DaVinci Resolve color timing, LUT application, HDR mastering, and lighting correction.', icon: <Palette className="w-5 h-5" /> },
      { title: 'Sound Design & Spatial Audio', desc: 'Pro audio mastering, SFX layering, noise reduction, and licensing high-energy royalty-free music.', icon: <Zap className="w-5 h-5" /> },
      { title: 'Multi-Aspect Ratio Exports', desc: 'Optimized formats for YouTube (16:9), Instagram/TikTok (9:16), and LinkedIn (1:1/4:5).', icon: <Layers className="w-5 h-5" /> },
      { title: 'Interactive Subtitles & Captions', desc: 'Dynamic animated captions formatted for high viewer engagement and silent playback.', icon: <FileCheck className="w-5 h-5" /> }
    ],
    deliverables: [
      'Master 4K 60fps ProRes / H.265 export files',
      'Multi-platform cropped exports for YouTube, LinkedIn, Instagram & TikTok',
      'Full Adobe Premiere Pro / DaVinci Resolve project package and raw assets',
      'Licensed commercial audio rights and voiceover WAV stems',
      'Animated GIF and WebM micro-assets for web integration'
    ],
    technologies: [
      { name: 'DaVinci Resolve', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/davinciresolve/davinciresolve-original.svg', icon: <SiDavinciresolve size={24} /> },
      { name: 'Premiere Pro', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg', icon: <Film size={24} /> },
      { name: 'After Effects', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg', icon: <Sparkles size={24} /> },
      { name: 'Blender 3D', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg', icon: <Palette size={24} /> },
      { name: 'Photoshop', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg', icon: <Layers size={24} /> },
      { name: 'Audio Mastering', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/audition/audition-original.svg', icon: <Zap size={24} /> }
    ],
    process: [
      { step: '01', title: 'Creative Brief & Script', desc: 'Outlining video goals, key product messages, visual pacing, and storyboard concepts.' },
      { step: '02', title: 'Footage & Asset Ingestion', desc: 'Screen recording UI, compiling 3D models, capturing footage, and organizing project bins.' },
      { step: '03', title: 'Assembly & Rough Cut', desc: 'Building the narrative flow, sync points, music bed, and pacing.' },
      { step: '04', title: 'Motion Graphics & VFX', desc: 'Adding 3D camera moves, text callouts, sound effects, and color grading.' },
      { step: '05', title: 'Revisions & Master Export', desc: 'Refining per your feedback and rendering multi-platform 4K deliverables.' }
    ],
    faqs: [
      { q: 'What is your typical turnaround time for a commercial video?', a: 'Standard product demo and promotional videos typically take 4 to 7 business days, including full motion graphics, sound design, and revision rounds.' },
      { q: 'Do you provide voiceovers and licensed background music?', a: 'Yes. We include full commercial licensing for all soundtrack selections and can arrange studio-grade AI or human voiceovers in multiple accents.' }
    ]
  }
}

function TechCardItem({ tech }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="service-tech-item">
      <div className="service-tech-icon-box">
        {tech.logo && !imgError ? (
          <img
            src={tech.logo}
            alt={tech.name}
            loading="lazy"
            decoding="async"
            className="service-tech-logo-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="service-tech-icon">{tech.icon}</span>
        )}
      </div>
      <span className="service-tech-name">{tech.name}</span>
    </div>
  )
}

function ServiceDetail() {
  const { serviceId } = useParams()
  const service = SERVICES_FULL_DATA[serviceId] || SERVICES_FULL_DATA['website-development']
  const [activeFaq, setActiveFaq] = useState(null)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [serviceId])

  const handleCopyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText('zytronabusiness@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  if (!service) {
    return (
      <div className="app">
        <Navbar>
          <NavBody>
            <NavbarLogo />
            <div className="flex items-center gap-3">
              <Link to="/#services">
                <NavbarButton variant="secondary">Back to Services</NavbarButton>
              </Link>
            </div>
          </NavBody>
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <Link to="/#services">
                <NavbarButton variant="secondary" className="text-xs py-1.5 px-3">Back to Services</NavbarButton>
              </Link>
            </MobileNavHeader>
          </MobileNav>
        </Navbar>
        <section className="service-modern-hero">
          <div className="container">
            <h1 className="service-modern-title">Service Not Found</h1>
            <Link to="/#services" className="btn btn-primary btn-lg">Back to Services</Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Dynamic Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={[
              { name: 'Home', link: '/#home' },
              { name: 'About', link: '/about' },
              { name: 'Services', link: '/#services' },
              { name: 'Work', link: '/#work' },
              { name: 'Contact', link: '/#contact' },
            ]}
          />
          <div className="flex items-center">
            <Link to="/#contact">
              <NavbarButton variant="primary" className="gap-1.5">
                <span>Start Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </NavbarButton>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
            <div className="flex items-center justify-between py-1 mb-2 border-b border-black/[0.06]">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Navigation</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Accepting Projects
              </span>
            </div>

            {[
              { name: 'Home', link: '/#home' },
              { name: 'About ZYTRONA', link: '/about' },
              { name: 'Capabilities & Services', link: '/#services' },
              { name: 'Featured Work & Case Studies', link: '/#work' },
              { name: 'Contact & Consultation', link: '/#contact' },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-neutral-800 text-sm font-semibold py-2.5 px-1 hover:text-black transition-colors"
              >
                <span>{item.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            ))}

            <div className="flex w-full flex-col gap-2.5 mt-3 pt-3 border-t border-black/[0.06]">
              <Link to="/#contact" onClick={() => setMobileMenuOpen(false)}>
                <NavbarButton variant="primary" className="w-full justify-center gap-2 py-2.5">
                  <span>Start Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <section className="service-modern-hero">
        <div className="service-hero-bg-blur" />
        <div className="container">
          <motion.div
            className="service-modern-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="service-hero-icon-badge">
              {service.icon}
            </div>
            
            <div className="service-badge-pill-wrap">
              <span className="hero-badge">
                <span className="hero-badge-dot" />
                {service.badge}
              </span>
            </div>

            <h1 className="service-modern-title">{service.title}</h1>
            <p className="service-modern-tagline-text">{service.tagline}</p>
            <p className="service-modern-description">{service.description}</p>

            {/* Metrics Bar */}
            <div className="service-metrics-grid">
              {service.metrics.map((m, i) => (
                <div key={i} className="service-metric-card">
                  <span className="service-metric-value">{m.value}</span>
                  <span className="service-metric-label">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Quick Hero Actions */}
            <div className="service-hero-actions">
              <Link to="/#contact" className="btn btn-primary btn-lg">
                Book Technical Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="https://wa.me/918667273159?text=Hi%20ZYTRONA,%20I%20would%20like%20to%20discuss%20a%20project%20for%20" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary btn-lg"
              >
                <FaWhatsapp className="w-4 h-4 text-emerald-600" /> Chat on WhatsApp
              </a>
            </div>

            {/* Highlights Chips */}
            <div className="service-hero-highlights">
              {service.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  className="service-highlight-chip"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <span className="highlight-chip-icon">{h.icon}</span>
                  <div>
                    <strong>{h.title}</strong>
                    <span>{h.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Bento Grid */}
      <section className="service-modern-features">
        <div className="container">
          <motion.div
            className="section-header-detail"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">Scope & Capabilities</span>
            <h2 className="section-title-large">Architectural Features</h2>
            <p className="section-desc">Comprehensive capabilities included in every {service.title} engagement</p>
          </motion.div>

          <div className="service-bento-grid">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                className="service-bento-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="bento-card-icon">{feature.icon}</div>
                <h3 className="bento-card-title">{feature.title}</h3>
                <p className="bento-card-desc">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="service-deliverables-section">
        <div className="container">
          <div className="service-deliverables-wrapper">
            <div className="service-deliverables-header">
              <span className="section-badge">Tangible Assets</span>
              <h2 className="section-title-large">What You Receive</h2>
              <p className="section-desc">Zero ambiguity. Here is what is delivered upon completion.</p>
            </div>
            <div className="service-deliverables-grid">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="service-deliverable-item">
                  <div className="deliverable-check-icon">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="deliverable-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="service-modern-tech">
        <div className="container">
          <motion.div
            className="section-header-detail"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">Engineering Stack</span>
            <h2 className="section-title-large">Technologies & Frameworks</h2>
            <p className="section-desc">Battle-tested tools selected for reliability, speed, and maintainability</p>
          </motion.div>

          <div className="service-tech-marquee-container">
            {/* Row 1: Smooth Continuous Forward Flow */}
            <Marquee duration="28s" gap="1.25rem" repeat={4} className="py-2">
              {service.technologies.map((tech, index) => (
                <TechCardItem key={`tech-fwd-${index}`} tech={tech} />
              ))}
            </Marquee>

            {/* Row 2: Smooth Continuous Reverse Flow */}
            {service.technologies.length >= 4 && (
              <Marquee duration="32s" gap="1.25rem" reverse repeat={4} className="py-2 mt-3">
                {[...service.technologies].reverse().map((tech, index) => (
                  <TechCardItem key={`tech-rev-${index}`} tech={tech} />
                ))}
              </Marquee>
            )}
          </div>
        </div>
      </section>

      {/* Delivery Process Workflow */}
      <section className="service-modern-process">
        <div className="container">
          <motion.div
            className="section-header-detail"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">Agile Delivery Blueprint</span>
            <h2 className="section-title-large">How We Execute</h2>
            <p className="section-desc">Transparent 5-stage lifecycle from architecture to production launch</p>
          </motion.div>

          <div className="service-process-grid">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                className="service-process-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="process-step-number">{step.step}</div>
                <h3 className="process-card-title">{step.title}</h3>
                <p className="process-card-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service-Specific FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="service-faq-section">
          <div className="container">
            <div className="section-header-detail">
              <span className="section-badge">Delivery Assurance</span>
              <h2 className="section-title-large">Frequently Asked Questions</h2>
              <p className="section-desc">Common questions regarding our {service.title} workflow</p>
            </div>

            <div className="service-faq-container">
              {service.faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`service-faq-item ${activeFaq === idx ? 'open' : ''}`}
                  onClick={() => toggleFaq(idx)}
                >
                  <div className="service-faq-question">
                    <span>{faq.q}</span>
                    <ChevronDown className={`service-faq-arrow ${activeFaq === idx ? 'rotated' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div 
                        className="service-faq-answer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Consultation Direct Bridge Banner */}
      <section className="service-modern-cta">
        <div className="container">
          <motion.div
            className="service-cta-bento"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="cta-badge">✦ Let's Build Your Solution</span>
            <h2 className="cta-title">Ready to Architect Your {service.title}?</h2>
            <p className="cta-subtitle">
              Collaborate directly with our senior engineering team. Get a detailed technical brief, milestone roadmap, and direct estimate within 24 hours.
            </p>
            
            <div className="cta-buttons">
              <Link to="/#contact" className="btn btn-primary btn-lg">
                Submit Consultation Brief <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+918667273159" className="btn btn-secondary btn-lg">
                <Phone className="w-4 h-4" /> Direct Line: +91 8667273159
              </a>
              <button 
                onClick={handleCopyEmail}
                className="btn btn-secondary btn-lg"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copiedEmail ? 'Email Copied!' : 'Copy Business Email'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ServiceDetail
