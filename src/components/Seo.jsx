import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeoForPath, SITE_OG_IMAGE } from '@/seo/config'

function upsertMeta(attr, key, content) {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function Seo() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const seo = getSeoForPath(pathname)
    document.title = seo.title
    document.documentElement.lang = 'en'

    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'robots', seo.robots)
    upsertMeta('name', 'googlebot', seo.robots)
    upsertMeta('name', 'author', 'ZYTRONA')
    upsertLink('canonical', seo.canonical)

    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', seo.canonical)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'ZYTRONA')
    upsertMeta('property', 'og:image', SITE_OG_IMAGE)
    upsertMeta('property', 'og:locale', 'en_US')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', seo.title)
    upsertMeta('name', 'twitter:description', seo.description)
    upsertMeta('name', 'twitter:image', SITE_OG_IMAGE)

    document.querySelectorAll('script[data-seo-jsonld="true"]').forEach((node) => node.remove())
    seo.jsonLd.forEach((schema) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seoJsonld = 'true'
      script.text = JSON.stringify(schema)
      document.head.appendChild(script)
    })
  }, [pathname])

  return null
}
