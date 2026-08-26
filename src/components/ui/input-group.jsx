import * as React from "react"
import { cn } from "@/lib/utils"

const InputGroup = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center w-full rounded-lg border border-slate-200 bg-white shadow-sm transition-all focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
InputGroup.displayName = "InputGroup"

const InputGroupInput = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full bg-transparent px-3 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})
InputGroupInput.displayName = "InputGroupInput"

const InputGroupAddon = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center pr-3 text-slate-400 [&_svg]:size-3.5", className)}
      {...props}
    >
      {children}
    </div>
  )
})
InputGroupAddon.displayName = "InputGroupAddon"

export { InputGroup, InputGroupInput, InputGroupAddon }
