import * as React from "react"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={`relative flex shrink-0 overflow-hidden rounded-full ${className || ""}`}
    {...props}
  />
))
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef(({ className, src, alt, ...props }, ref) => (
  <img
    ref={ref}
    src={src}
    alt={alt || ""}
    className={`aspect-square h-full w-full object-cover ${className || ""}`}
    {...props}
  />
))
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={`flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs font-semibold ${className || ""}`}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
