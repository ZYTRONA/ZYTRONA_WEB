import React from 'react'
import { motion } from 'motion/react'
import { cn } from '../../lib/utils'

export function SpotlightCard({
  children,
  className = '',
  enableHover = true,
  onClick,
  ...props
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={enableHover ? { y: -4, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
      className={cn('spotlight-card-wrapper', className)}
      {...props}
    >
      {/* Card Content Container */}
      <div className="spotlight-content">{children}</div>
    </motion.div>
  )
}

export default SpotlightCard
