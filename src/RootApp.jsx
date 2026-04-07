import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import App from './App.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import ClickSpark from './components/ui/ClickSpark'

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

      // Always start from home/top on first load or browser reload.
      if (hash) {
        window.history.replaceState(null, '', pathname)
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    // If there's a hash, scroll to that element
    if (hash) {
      // Wait for the page to render
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
    <ClickSpark
      sparkColor="#00c8ff"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
      extraScale={1.2}
    >
      <ScrollToSection />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/service/:serviceId" element={<ServiceDetail />} />
      </Routes>
    </ClickSpark>
  )
}
