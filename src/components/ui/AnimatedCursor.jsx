import { createContext, useContext, useState, useEffect, useCallback } from 'react'

// Context for cursor state
const CursorContext = createContext(null)

// Hook to use cursor context
function useCursor() {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor must be used within CursorProvider')
  }
  return context
}

// Utility function for classnames
function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Check if touch device
function isTouchDevice() {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// CursorProvider - Manages cursor state globally
function CursorProvider({ 
  children, 
  global = true,
  clickables = ['a', 'button', 'input', 'textarea', 'select', 'label', '[role="button"]', '.clickable']
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const onMouseMove = useCallback((e) => {
    setCoords({ x: e.clientX, y: e.clientY })
    setIsVisible(true)
  }, [])

  const onMouseEnter = useCallback(() => setIsVisible(true), [])
  const onMouseLeave = useCallback(() => setIsVisible(false), [])
  const onMouseDown = useCallback(() => setIsActive(true), [])
  const onMouseUp = useCallback(() => setIsActive(false), [])

  useEffect(() => {
    if (isTouchDevice()) return

    const target = global ? document : null
    if (!target) return

    target.addEventListener('mousemove', onMouseMove)
    target.addEventListener('mouseenter', onMouseEnter)
    target.addEventListener('mouseleave', onMouseLeave)
    target.addEventListener('mousedown', onMouseDown)
    target.addEventListener('mouseup', onMouseUp)

    return () => {
      target.removeEventListener('mousemove', onMouseMove)
      target.removeEventListener('mouseenter', onMouseEnter)
      target.removeEventListener('mouseleave', onMouseLeave)
      target.removeEventListener('mousedown', onMouseDown)
      target.removeEventListener('mouseup', onMouseUp)
    }
  }, [global, onMouseMove, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp])

  // Handle hover states for clickable elements
  useEffect(() => {
    if (isTouchDevice()) return

    const handleMouseOver = () => setIsHovering(true)
    const handleMouseOut = () => setIsHovering(false)

    const addListeners = () => {
      document.querySelectorAll(clickables.join(',')).forEach((el) => {
        el.addEventListener('mouseover', handleMouseOver)
        el.addEventListener('mouseout', handleMouseOut)
      })
    }

    const removeListeners = () => {
      document.querySelectorAll(clickables.join(',')).forEach((el) => {
        el.removeEventListener('mouseover', handleMouseOver)
        el.removeEventListener('mouseout', handleMouseOut)
      })
    }

    addListeners()

    const observer = new MutationObserver(() => {
      removeListeners()
      addListeners()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      removeListeners()
      observer.disconnect()
    }
  }, [clickables])

  const value = {
    coords,
    isVisible,
    isActive,
    isHovering,
    setIsHovering
  }

  return (
    <CursorContext.Provider value={value}>
      {children}
    </CursorContext.Provider>
  )
}

// CursorContainer - Wraps content and renders cursor elements
function CursorContainer({ children, className = '', ...props }) {
  if (isTouchDevice()) return <>{children}</>

  return (
    <div className={cn('cursor-container', className)} {...props}>
      {children}
    </div>
  )
}

// Cursor - The main cursor element (SVG pointer)
function Cursor({ 
  className = '', 
  size = 24,
  color = '#ffffff',
  scale = 0.9,
  hoverScale = 1.1,
  ...props 
}) {
  const { coords, isVisible, isActive, isHovering } = useCursor()
  
  if (isTouchDevice()) return null

  const currentScale = isActive ? scale : isHovering ? hoverScale : 1

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: `translate(${coords.x - size / 2}px, ${coords.y - size / 2}px) scale(${currentScale})`,
    transition: 'transform 50ms ease-out, opacity 150ms ease-in-out'
  }

  return (
    <div 
      className={cn('cursor-pointer', className)} 
      style={style}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={color}
          d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
        />
      </svg>
    </div>
  )
}

// CursorFollow - The following label/content element
function CursorFollow({ 
  className = '', 
  sideOffset = 15,
  alignOffset = 5,
  children = null,
  ...props 
}) {
  const { coords, isVisible, isActive, isHovering } = useCursor()
  
  if (isTouchDevice()) return null
  if (!children) return null

  const currentScale = isActive ? 0.95 : isHovering ? 1.05 : 1

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: `translate(${coords.x + sideOffset}px, ${coords.y + alignOffset}px) scale(${currentScale})`,
    transition: 'transform 80ms ease-out, opacity 150ms ease-in-out'
  }

  return (
    <div 
      className={cn('cursor-follow', className)} 
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}

// Default animated cursor component (combines all parts)
function AnimatedCursor({
  color = '#ffffff',
  cursorSize = 24,
  label = null,
  sideOffset = 15,
  alignOffset = 5,
  showCursor = true,
  showFollow = true
}) {
  if (isTouchDevice()) return null

  return (
    <CursorProvider global>
      {showCursor && (
        <Cursor size={cursorSize} color={color} />
      )}
      {showFollow && label && (
        <CursorFollow sideOffset={sideOffset} alignOffset={alignOffset}>
          {label}
        </CursorFollow>
      )}
    </CursorProvider>
  )
}

export {
  AnimatedCursor as default,
  CursorProvider,
  CursorContainer,
  Cursor,
  CursorFollow,
  useCursor
}
