// Context for cursor state
import { createContext, useContext } from 'react'

export const CursorContext = createContext(null)

// Hook to use cursor context
export function useCursor() {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor must be used within CursorProvider')
  }
  return context
}

// Utility function for classnames
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Check if touch device
export function isTouchDevice() {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
