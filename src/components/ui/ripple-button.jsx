import * as React from 'react'
import { cva } from 'class-variance-authority'
import { RippleButtonPrimitive } from './ripple-primitive'

const buttonVariants = cva(
  'ripple-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-white text-black hover:bg-gray-100',
        accent: 'bg-cyan-500 text-black hover:bg-cyan-400',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border border-white/20 bg-transparent text-white hover:bg-white/10',
        secondary: 'bg-gray-800 text-white hover:bg-gray-700',
        ghost: 'bg-transparent text-white hover:bg-white/10',
        link: 'text-cyan-400 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        iconLg: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const rippleColorVariants = {
  default: 'rgba(0,0,0,0.2)',
  accent: 'rgba(0,0,0,0.3)',
  destructive: 'rgba(255,255,255,0.3)',
  outline: 'rgba(255,255,255,0.2)',
  secondary: 'rgba(255,255,255,0.2)',
  ghost: 'rgba(255,255,255,0.2)',
  link: 'rgba(0,255,255,0.3)',
}

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

export { RippleButton, buttonVariants }
