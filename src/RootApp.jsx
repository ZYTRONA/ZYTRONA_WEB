import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import App from './App.jsx'
import About from './pages/About.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import NotFound from './pages/NotFound.jsx'
import BackgroundGrid from './components/ui/BackgroundGrid'
import { Seo } from './components/Seo.jsx'

function isLowPerformanceMobile() {
  if (typeof window === 'undefined') return false

  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches
  const smallViewport = window.matchMedia?.('(max-width: 1100px)').matches
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const memory = navigator.deviceMemory ?? 0
  const cores = navigator.hardwareConcurrency ?? 0
  const connection = navigator.connection
  const saveData = Boolean(connection?.saveData)
  const slowNetwork = /2g|3g/.test(connection?.effectiveType ?? '')
  const lowHardware = (memory > 0 && memory <= 4) || (cores > 0 && cores <= 4)

  return Boolean(coarsePointer && (smallViewport || lowHardware || saveData || slowNetwork || reducedMotion))
}

// Component to handle scroll on route change - supports hash navigation
function ScrollToSection() {
  const { pathname, hash } = useLocation()
  const isInitialLoad = useRef(true)
  
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false

      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            const lowPerfMode = document.documentElement.classList.contains('low-perf-mobile')
            element.scrollIntoView({ behavior: lowPerfMode ? 'auto' : 'smooth' })
          }
        }, 150)
        return
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    // If there's a hash, scroll to that element
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          const lowPerfMode = document.documentElement.classList.contains('low-perf-mobile')
          element.scrollIntoView({ behavior: lowPerfMode ? 'auto' : 'smooth' })
        }
      }, 100)
    } else {
      // Otherwise scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
  
  return null
}

export function RootApp() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Ensure a hard reload always starts at the hero section.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    const applyPerformanceClass = () => {
      const html = document.documentElement
      html.classList.toggle('low-perf-mobile', isLowPerformanceMobile())
    }

    applyPerformanceClass()
    window.addEventListener('resize', applyPerformanceClass, { passive: true })

    return () => {
      window.removeEventListener('resize', applyPerformanceClass)
    }
  }, [])

  return (
    <>
      <BackgroundGrid />
      <ScrollToSection />
      <Seo />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/service/app-development" element={<Navigate to="/service/website-development" replace />} />
        <Route path="/service/:serviceId" element={<ServiceDetail />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/services" element={<Navigate to="/service/website-development" replace />} />
        <Route path="/work" element={<Navigate to="/#work" replace />} />
        <Route path="/portfolio" element={<Navigate to="/#work" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="/pricing" element={<Navigate to="/" replace />} />
        <Route path="/price" element={<Navigate to="/" replace />} />
        <Route path="/reviews" element={<Navigate to="/" replace />} />
        <Route path="/testimonials" element={<Navigate to="/" replace />} />
        <Route path="/engagement" element={<Navigate to="/" replace />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default RootApp
