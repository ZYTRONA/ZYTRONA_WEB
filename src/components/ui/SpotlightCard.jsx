import React, { useState, useRef } from 'react'
import { motion } from 'motion/react'
import { cn } from '../../lib/utils'

export function SpotlightCard({
  children,
  className = '',
  contentClassName = '',
  enableHover = true,
  spotlightColor = 'rgba(76, 175, 79, 0.12)',
  onClick,
  ...props
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={enableHover ? { y: -4, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
      className={cn('spotlight-card-wrapper group relative overflow-hidden flex flex-col h-full bg-white', className)}
      {...props}
    >
      {/* Spotlight Effect Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Card Content Container */}
      <div className={cn('spotlight-content relative z-10 flex-1 flex flex-col h-full w-full', contentClassName)}>
        {children}
      </div>
    </motion.div>
  )
}

export default SpotlightCard

