import * as React from 'react'
import { RippleButtonPrimitive } from './ripple-primitive'
import { rippleColorVariants } from './button-variants'

function RippleButton({ children, className = '', variant = 'default', size = 'default', style = {}, onClick, ...props }) {
  // Build class names based on variant and size
  const baseClasses = 'ripple-button'
  const variantClasses = {
    default: 'bg-white text-black',
    accent: 'bg-cyan-500 text-black',
    destructive: 'bg-red-500 text-white',
    outline: 'border border-white/20 bg-transparent text-white',
    secondary: 'bg-gray-800 text-white',
    ghost: 'bg-transparent text-white',
    link: 'text-cyan-400',
  }
  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
    iconLg: 'h-12 w-12',
  }
  
  const rippleColor = rippleColorVariants[variant] || rippleColorVariants.default
  const combinedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.default} ${className}`
  
  return (
    <RippleButtonPrimitive
      className={combinedClasses}
      style={{ 
        '--ripple-color': rippleColor,
        position: 'relative',
        overflow: 'hidden',
        ...style 
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </RippleButtonPrimitive>
  )
}

export { RippleButton }
