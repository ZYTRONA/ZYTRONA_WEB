import { useEffect, useRef, useState } from 'react'

// Throttle hook for scroll events
export function useThrottledScroll(callback, delay = 100) {
  const lastRunRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      if (now - lastRunRef.current >= delay) {
        callback()
        lastRunRef.current = now
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [callback, delay])
}

// Intersection Observer for lazy loading
export function useLazyLoad() {
  const [visibleElements, setVisibleElements] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => ({
              ...prev,
              [entry.target.dataset.id]: true
            }))
            // Stop observing once visible
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '50px' }
    )

    return () => {
      observer.disconnect()
    }
  }, [])

  return visibleElements
}
