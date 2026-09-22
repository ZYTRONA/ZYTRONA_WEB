import React from 'react'
import { motion } from 'motion/react'
import { cn } from '../../lib/utils'

export function SpotlightCard({
  children,
  className = '',
  contentClassName = '',
  enableHover = true,
  onClick,
  ...props
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={enableHover ? { y: -4, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
      className={cn('spotlight-card-wrapper group relative overflow-hidden flex flex-col h-full bg-white', className)}
      {...props}
    >
      {/* Card Content Container */}
      <div className={cn('spotlight-content relative z-10 flex-1 flex flex-col h-full w-full', contentClassName)}>
        {children}
      </div>
    </motion.div>
  )
}

export default SpotlightCard

