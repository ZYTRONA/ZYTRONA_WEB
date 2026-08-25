"use client"
import * as React from "react"
import { motion } from "motion/react"

const AvatarGroupContext = React.createContext({ max: 5 })

const AvatarGroup = React.forwardRef(({ className, max = 5, children, ...props }, ref) => {
  const childArray = React.Children.toArray(children)
  const visible = childArray.slice(0, max)
  const remaining = childArray.length - max

  return (
    <AvatarGroupContext.Provider value={{ max }}>
      <div
        ref={ref}
        className={`flex items-center ${className || ""}`}
        {...props}
      >
        {visible.map((child, index) => (
          <motion.div
            key={index}
            className="relative -ml-2 first:ml-0"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            style={{ zIndex: max - index }}
          >
            {child}
          </motion.div>
        ))}
        {remaining > 0 && (
          <motion.div
            className="relative -ml-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: max * 0.08, duration: 0.3 }}
            style={{ zIndex: 0 }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0f172a] bg-slate-700 text-xs font-semibold text-white">
              +{remaining}
            </span>
          </motion.div>
        )}
      </div>
    </AvatarGroupContext.Provider>
  )
})
AvatarGroup.displayName = "AvatarGroup"

const AvatarGroupTooltip = ({ children, ...props }) => {
  return (
    <span
      className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0f172a] px-2 py-1 text-xs font-medium text-white opacity-0 pointer-events-none transition-opacity group-hover:opacity-100"
      {...props}
    >
      {children}
    </span>
  )
}

export { AvatarGroup, AvatarGroupTooltip }
