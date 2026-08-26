import React from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = "30s",
  gap = "1.25rem",
  ...props
}) {
  return (
    <>
      <style>
        {`
          @keyframes zytrona-marquee-h {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-100%, 0, 0);
            }
          }

          @keyframes zytrona-marquee-v {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(0, -100%, 0);
            }
          }

          .zytrona-marquee-track {
            display: flex;
            flex-shrink: 0;
            will-change: transform;
            backface-visibility: hidden;
            transform: translateZ(0);
          }

          .animate-marquee-h {
            animation: zytrona-marquee-h var(--duration, 30s) linear infinite;
          }

          .animate-marquee-v {
            animation: zytrona-marquee-v var(--duration, 30s) linear infinite;
          }

          .animate-reverse {
            animation-direction: reverse !important;
          }

          .pause-on-hover:hover .zytrona-marquee-track {
            animation-play-state: paused !important;
          }
        `}
      </style>
      <div
        {...props}
        className={cn(
          "group flex overflow-hidden w-full select-none",
          vertical ? "flex-col" : "flex-row",
          pauseOnHover && "pause-on-hover",
          className
        )}
        style={{
          "--duration": typeof duration === "number" ? `${duration}s` : duration,
          "--gap": gap,
          ...props.style,
        }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "zytrona-marquee-track items-center",
              !vertical && "animate-marquee-h flex-row",
              vertical && "animate-marquee-v flex-col",
              reverse && "animate-reverse"
            )}
            style={{
              gap: gap,
              paddingRight: !vertical ? gap : undefined,
              paddingBottom: vertical ? gap : undefined,
            }}
          >
            {children}
          </div>
        ))}
      </div>
    </>
  );
}

export default Marquee;
