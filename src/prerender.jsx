import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { RootApp } from './RootApp.jsx'
import { getSeoForPath, seoHeadFromPage, PRERENDER_ROUTES } from './seo/config.js'

export async function prerender(data) {
  const html = renderToString(
    <StaticRouter location={data.url}>
      <RootApp />
    </StaticRouter>
  )

  const { parseLinks } = await import('vite-prerender-plugin/parse')
  const discovered = parseLinks(html).filter((href) => {
    if (!href.startsWith('/')) return false
    if (href.startsWith('//')) return false
    if (href.includes('#') || href.includes('?')) return false
    if (href.startsWith('/service/') && href.split('/').length > 3) return false
    return true
  })

  const seo = getSeoForPath(data.url)

  return {
    html,
    links: new Set([...PRERENDER_ROUTES, ...discovered]),
    head: seoHeadFromPage(seo),
  }
}
