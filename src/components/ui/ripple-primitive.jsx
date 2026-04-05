import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'
import { useRipple } from './use-ripple'

// Ripple Button Primitive
function RippleButtonPrimitive({ children, className = '', onClick = null, style = {}, ...props }) {
  const { ripples, addRipple } = useRipple()

  const handleClick = (e) => {
    addRipple(e)
    if (onClick) onClick(e)
  }

  return (
    <button
      className={className}
      onClick={handleClick}
      style={style}
      {...props}
    >
      {children}
      <RippleButtonRipplesPrimitive ripples={ripples} />
    </button>
  )
}

// Ripple Circles
function RippleButtonRipplesPrimitive({ ripples, className = '' }) {
  return (
    <span className={`ripple-container ${className}`}>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="ripple-circle"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              borderRadius: '50%',
              backgroundColor: 'var(--ripple-color, rgba(255,255,255,0.4))',
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </span>
  )
}

export {
  RippleButtonPrimitive,
  RippleButtonRipplesPrimitive,
}

