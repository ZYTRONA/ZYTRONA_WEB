import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import AnimatedCursor from './components/AnimatedCursor'

// Component to handle scroll on route change - supports hash navigation
function ScrollToSection() {
  const { pathname, hash } = useLocation()
  
  useEffect(() => {
    // If there's a hash, scroll to that element
    if (hash) {
      // Wait for the page to render
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // Otherwise scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
  
  return null
}

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <AnimatedCursor 
          color="#ffffff"
          cursorSize={24}
          label="Explorer"
          sideOffset={18}
          alignOffset={8}
        />
        <ScrollToSection />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  )
}
