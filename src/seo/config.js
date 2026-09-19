export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://zytrona.vercel.app').replace(/\/$/, '')
export const SITE_NAME = 'ZYTRONA'
export const SITE_OG_IMAGE = `${SITE_URL}/og-image.png`
export const SITE_LOGO = `${SITE_URL}/Logo.png`
export const BUSINESS_EMAIL = 'zytronabusiness@gmail.com'
export const BUSINESS_PHONE = '+918667273159'

export const PRERENDER_ROUTES = [
  '/',
  '/about',
  '/privacy-policy',
  '/terms-of-service',
  '/service/website-development',
  '/service/app-development',
  '/service/ui-designs',
  '/404',
]

const HOME_DESCRIPTION =
  'ZYTRONA builds high-performance web platforms, mobile apps, and modern UI/UX design systems for startups and enterprises. High-performance delivery, 100% IP ownership.'

const SERVICE_PAGES = {
  'website-development': {
    title: 'Web Development & SaaS Platforms | ZYTRONA',
    description:
      'SEO-optimized React and Next.js web platforms and SaaS products engineered for conversion, Core Web Vitals, and global scale.',
  },
  'app-development': {
    title: 'Mobile App Engineering | ZYTRONA',
    description:
      'Native-quality iOS and Android apps with React Native and Flutter, offline-first sync, and App Store launch support.',
  },
  'ui-designs': {
    title: 'UI/UX & Product Design Systems | ZYTRONA',
    description:
      'Tokenized design systems, Figma prototypes, and conversion-focused product UI for SaaS and digital products.',
  },
}

const FAQ_ITEMS = [
  {
    question: 'What types of companies does ZYTRONA work with?',
    answer:
      'We partner with ambitious startups, fast-growing digital scale-ups, and established enterprises across North America, Europe, and Asia seeking high-performance software engineering and UI/UX systems.',
  },
  {
    question: 'How do you handle IP ownership and project confidentiality?',
    answer:
      'We operate under strict confidentiality. We sign an NDA prior to discussions, and upon project completion and milestone clearance, 100% of intellectual property, code repositories, and design assets belong exclusively to your company.',
  },
  {
    question: 'What is the typical project development timeline?',
    answer:
      'A high-impact web application or design system typically takes 2 to 4 weeks, while complex full-stack web platforms and multi-tenant applications range from 6 to 14 weeks. We provide a milestone-backed timeline before kickoff.',
  },
  {
    question: 'How does team collaboration and communication work?',
    answer:
      'We integrate directly into your workflow using dedicated Slack/Discord channels, bi-weekly agile sprint demos, and transparent Kanban boards so you have real-time visibility into progress at every step.',
  },
  {
    question: 'Do you provide post-launch maintenance, SLAs, and technical support?',
    answer:
      'Yes. We offer continuous SLA support packages that cover 24/7 uptime monitoring, security patching, feature iterations, and performance optimization.',
  },
]

function normalizePath(url = '/') {
  try {
    const path = url.startsWith('http') ? new URL(url).pathname : url
    const clean = path.replace(/\/index\.html$/i, '/').replace(/\/+$/, '')
    return clean === '' ? '/' : clean
  } catch {
    return '/'
  }
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_LOGO,
    image: SITE_OG_IMAGE,
    email: BUSINESS_EMAIL,
    telephone: BUSINESS_PHONE,
    description: HOME_DESCRIPTION,
    areaServed: 'Worldwide',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.linkedin.com/company/zytrona',
      'https://www.instagram.com/zytrona_official/',
    ],
  }
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  }
}

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function getSeoForPath(url = '/') {
  const pathname = normalizePath(url)
  const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname}`

  if (pathname === '/') {
    return {
      pathname,
      canonical,
      title: 'ZYTRONA',
      description: HOME_DESCRIPTION,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      jsonLd: [
        organizationSchema(),
        websiteSchema(),
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        },
      ],
    }
  }

  if (pathname === '/about') {
    return {
      pathname,
      canonical,
      title: 'About ZYTRONA | Senior Software Engineering Studio',
      description:
        'ZYTRONA is a senior engineering studio building web, mobile, and UI/UX products with direct architect access and full source-code ownership.',
      robots: 'index, follow',
      jsonLd: [
        organizationSchema(),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]),
      ],
    }
  }

  if (pathname === '/privacy-policy') {
    return {
      pathname,
      canonical,
      title: 'Privacy Policy | ZYTRONA',
      description: 'How ZYTRONA collects, uses, and protects information submitted through project inquiries and consultation forms.',
      robots: 'index, follow',
      jsonLd: [
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' },
        ]),
      ],
    }
  }

  if (pathname === '/terms-of-service') {
    return {
      pathname,
      canonical,
      title: 'Terms of Service | ZYTRONA',
      description: 'Engagement terms for ZYTRONA software engineering, design, and consulting services.',
      robots: 'index, follow',
      jsonLd: [
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Terms of Service', path: '/terms-of-service' },
        ]),
      ],
    }
  }

  const serviceMatch = pathname.match(/^\/service\/([^/]+)$/)
  if (serviceMatch && SERVICE_PAGES[serviceMatch[1]]) {
    const service = SERVICE_PAGES[serviceMatch[1]]
    return {
      pathname,
      canonical,
      title: service.title,
      description: service.description,
      robots: 'index, follow',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title.replace(' | ZYTRONA', ''),
          description: service.description,
          provider: { '@type': 'ProfessionalService', name: SITE_NAME, url: SITE_URL },
          areaServed: 'Worldwide',
          url: canonical,
        },
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/' },
          { name: service.title.replace(' | ZYTRONA', ''), path: pathname },
        ]),
      ],
    }
  }

  return {
    pathname,
    canonical: `${SITE_URL}/404`,
    title: 'Page Not Found | ZYTRONA',
    description: 'The page you requested is not available. Return to ZYTRONA to explore services, work, and contact.',
    robots: 'noindex, follow',
    jsonLd: [organizationSchema()],
  }
}

export function seoHeadFromPage(seo) {
  const elements = new Set([
    { type: 'meta', props: { name: 'description', content: seo.description } },
    { type: 'meta', props: { name: 'robots', content: seo.robots } },
    { type: 'meta', props: { name: 'googlebot', content: seo.robots } },
    { type: 'meta', props: { name: 'author', content: SITE_NAME } },
    { type: 'link', props: { rel: 'canonical', href: seo.canonical } },
    { type: 'meta', props: { property: 'og:title', content: seo.title } },
    { type: 'meta', props: { property: 'og:description', content: seo.description } },
    { type: 'meta', props: { property: 'og:url', content: seo.canonical } },
    { type: 'meta', props: { property: 'og:type', content: 'website' } },
    { type: 'meta', props: { property: 'og:site_name', content: SITE_NAME } },
    { type: 'meta', props: { property: 'og:image', content: SITE_OG_IMAGE } },
    { type: 'meta', props: { property: 'og:locale', content: 'en_US' } },
    { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
    { type: 'meta', props: { name: 'twitter:title', content: seo.title } },
    { type: 'meta', props: { name: 'twitter:description', content: seo.description } },
    { type: 'meta', props: { name: 'twitter:image', content: SITE_OG_IMAGE } },
    ...seo.jsonLd.map((schema) => ({
      type: 'script',
      props: {
        type: 'application/ld+json',
        children: JSON.stringify(schema),
      },
    })),
  ])

  return {
    lang: 'en',
    title: seo.title,
    elements,
  }
}
