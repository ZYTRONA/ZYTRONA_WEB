import { useCallback, useState } from 'react'

// Ripple state management hook
export function useRipple() {
  const [ripples, setRipples] = useState([])

  const addRipple = useCallback((event) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    }
    
    setRipples((prev) => [...prev, newRipple])
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)
  }, [])

  return { ripples, addRipple }
}
