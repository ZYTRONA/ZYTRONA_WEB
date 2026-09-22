import React from 'react'
import { Link } from 'react-router-dom'

// ZYTRONA Official Brand Logo using /Logo.png with Figma styling
export function ZytronaLogo({ className = "h-9", light = false }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official ZYTRONA Logo Image */}
      <img 
        src="/Logo.png" 
        alt="ZYTRONA Logo" 
        className="h-10 w-10 object-contain rounded-md border border-[#E0E0E0] dark:border-[#232936] shadow-sm bg-white dark:bg-[#15181E] p-0.5 shrink-0"
      />

      <span className={`font-['Inter'] font-extrabold text-xl tracking-wider leading-none ${light ? 'text-white' : 'text-[#263238] dark:text-white'}`}>
        ZYTRONA
      </span>
    </div>
  )
}

// Hero Isometric 3D Developer & Platform Architecture Illustration
export function ZytronaHeroIllustration({ className = "w-full max-w-[520px]" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 540 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xl">
        {/* Floor Shadow */}
        <ellipse cx="270" cy="400" rx="220" ry="40" fill="#E8F5E9" fillOpacity="0.8" />
        <ellipse cx="270" cy="395" rx="170" ry="25" fill="#C8E6C9" fillOpacity="0.5" />

        {/* Isometric Gear on Ground */}
        <g transform="translate(360, 340) scale(0.65)">
          <path d="M40 0L48 12L62 8L66 22L80 24L78 38L90 46L82 58L90 70L78 78L80 92L66 94L62 108L48 104L40 116L28 108L20 114L16 100L2 98L4 84L-8 76L0 64L-8 52L4 44L2 30L16 28L20 14L28 20L40 0Z" fill="#CFD8DC" />
          <circle cx="41" cy="58" r="22" fill="#ECEFF1" />
          <circle cx="41" cy="58" r="12" fill="#B0BEC5" />
        </g>

        {/* Big Isometric Monitor Base and Stand */}
        <path d="M210 330 L270 330 L280 345 L200 345 Z" fill="#90A4AE" />
        <path d="M235 280 L245 280 L245 330 L235 330 Z" fill="#78909C" />
        <path d="M245 280 L255 280 L255 330 L245 330 Z" fill="#607D8B" />

        {/* Isometric Monitor Body */}
        <path d="M120 120 L360 80 L360 270 L120 310 Z" fill="#263238" />
        <path d="M128 128 L352 90 L352 262 L128 300 Z" fill="#37474F" />
        <path d="M136 136 L344 100 L344 254 L136 290 Z" fill="#FFFFFF" />

        {/* Screen Top Bar */}
        <path d="M136 136 L344 100 L344 120 L136 156 Z" fill="#ECEFF1" />
        <circle cx="152" cy="148" r="3.5" fill="#EF5350" />
        <circle cx="164" cy="146" r="3.5" fill="#FFCA28" />
        <circle cx="176" cy="144" r="3.5" fill="#66BB6A" />

        {/* Code / Architecture UI on Screen */}
        <rect x="146" y="170" width="70" height="7" rx="3.5" transform="skewY(-9.5)" fill="#4CAF4F" />
        <rect x="146" y="184" width="50" height="6" rx="3" transform="skewY(-9.5)" fill="#90A4AE" />
        <rect x="156" y="196" width="60" height="6" rx="3" transform="skewY(-9.5)" fill="#B0BEC5" />
        <rect x="156" y="208" width="45" height="6" rx="3" transform="skewY(-9.5)" fill="#4CAF4F" />
        <rect x="146" y="220" width="65" height="6" rx="3" transform="skewY(-9.5)" fill="#90A4AE" />
        <rect x="146" y="232" width="40" height="6" rx="3" transform="skewY(-9.5)" fill="#4CAF4F" />

        {/* Right Chart on Screen */}
        <path d="M240 148 L330 133 L330 185 L240 200 Z" fill="#F5F7FA" stroke="#CFD8DC" strokeWidth="1.5" />
        <path d="M248 185 L268 175 L288 180 L308 160 L322 150" stroke="#4CAF4F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="322" cy="150" r="3.5" fill="#388E3C" />

        {/* Floating Isometric Code Badge */}
        <g transform="translate(60, 160)">
          <rect x="0" y="0" width="75" height="42" rx="6" fill="#4CAF4F" />
          <text x="37" y="27" fill="#FFFFFF" fontFamily="monospace" fontWeight="bold" fontSize="18" textAnchor="middle">&lt; / &gt;</text>
        </g>

        {/* Floating Isometric Close Badge */}
        <g transform="translate(370, 90)">
          <rect x="0" y="0" width="38" height="38" rx="6" fill="#263238" />
          <path d="M13 13 L25 25 M25 13 L13 25" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* Floating Stats Pill */}
        <g transform="translate(85, 270)">
          <rect x="0" y="0" width="70" height="34" rx="6" fill="#388E3C" />
          <circle cx="18" cy="17" r="7" fill="#FFFFFF" fillOpacity="0.25" />
          <path d="M14 17 L17 20 L22 14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="30" y="11" width="30" height="5" rx="2.5" fill="#FFFFFF" />
          <rect x="30" y="19" width="20" height="4" rx="2" fill="#C8E6C9" />
        </g>

        {/* Developer Person Standing on Right */}
        <g transform="translate(390, 175)">
          <ellipse cx="40" cy="40" rx="14" ry="17" fill="#FFCC80" />
          <path d="M26 36 C26 22 54 20 54 36 C52 26 42 22 26 36 Z" fill="#263238" />
          <rect x="36" y="54" width="8" height="8" fill="#FFB74D" />

          <path d="M22 62 L58 62 L64 125 L16 125 Z" fill="#4CAF4F" />
          <path d="M34 62 C34 68 46 68 46 62 Z" fill="#388E3C" />

          {/* Left Arm & Laptop */}
          <path d="M22 62 L10 95 L-5 95 L-12 110" stroke="#4CAF4F" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-28 100 L8 88 L14 110 L-22 122 Z" fill="#81C784" />
          <path d="M-25 98 L5 87 L2 72 L-28 83 Z" fill="#388E3C" />
          <rect x="-18" y="80" width="18" height="12" rx="2" transform="rotate(-20)" fill="#E8F5E9" />

          {/* Right Arm */}
          <path d="M58 62 L66 100 L62 135" stroke="#4CAF4F" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="62" cy="138" r="5" fill="#FFCC80" />

          {/* Legs */}
          <rect x="22" y="125" width="14" height="105" rx="4" fill="#263238" />
          <rect x="44" y="125" width="14" height="105" rx="4" fill="#37474F" />
          <ellipse cx="28" cy="232" rx="10" ry="5" fill="#263238" />
          <ellipse cx="52" cy="232" rx="10" ry="5" fill="#263238" />
        </g>
      </svg>
    </div>
  )
}

// ZYTRONA Engineering Narrative Illustration
export function ZytronaEngineeringIllustration({ className = "w-full max-w-[440px]" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 460 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <ellipse cx="230" cy="350" rx="190" ry="24" fill="#E8F5E9" fillOpacity="0.8" />

        {/* Central Display Screen */}
        <g transform="translate(140, 60)">
          <rect x="0" y="0" width="180" height="260" rx="12" fill="#263238" />
          <rect x="6" y="6" width="168" height="248" rx="8" fill="#FFFFFF" />
          
          <rect x="16" y="20" width="148" height="40" rx="6" fill="#E8F5E9" />
          <circle cx="36" cy="40" r="12" fill="#4CAF4F" />
          <rect x="56" y="32" width="75" height="7" rx="3" fill="#388E3C" />
          <rect x="56" y="43" width="50" height="5" rx="2" fill="#81C784" />

          <rect x="16" y="72" width="148" height="35" rx="4" fill="#F5F7FA" stroke="#E0E0E0" />
          <rect x="26" y="82" width="40" height="6" rx="3" fill="#263238" />
          <rect x="26" y="92" width="70" height="5" rx="2" fill="#9E9E9E" />
          <rect x="130" y="82" width="24" height="15" rx="3" fill="#4CAF4F" />

          <rect x="16" y="115" width="148" height="35" rx="4" fill="#F5F7FA" stroke="#E0E0E0" />
          <rect x="26" y="125" width="50" height="6" rx="3" fill="#263238" />
          <rect x="26" y="135" width="60" height="5" rx="2" fill="#9E9E9E" />
          <rect x="130" y="125" width="24" height="15" rx="3" fill="#4CAF4F" />

          <rect x="16" y="158" width="148" height="55" rx="4" fill="#E8F5E9" />
          <rect x="26" y="170" width="90" height="6" rx="3" fill="#388E3C" />
          <rect x="26" y="182" width="110" height="5" rx="2" fill="#4CAF4F" />
          <rect x="26" y="193" width="70" height="5" rx="2" fill="#81C784" />

          <rect x="80" y="260" width="20" height="35" fill="#CFD8DC" />
          <ellipse cx="90" cy="295" rx="45" ry="10" fill="#B0BEC5" />
        </g>

        {/* Engineer on Left */}
        <g transform="translate(60, 110)">
          <circle cx="45" cy="35" r="13" fill="#FFCC80" />
          <path d="M35 30 C35 15 58 15 58 30 C58 20 45 18 35 30 Z" fill="#263238" />
          <path d="M35 32 C25 36 28 50 32 54" stroke="#263238" strokeWidth="5" strokeLinecap="round" />

          <path d="M32 50 L58 50 L64 115 L28 115 Z" fill="#4CAF4F" />
          <path d="M54 55 L75 80 L95 72" stroke="#4CAF4F" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="98" cy="71" r="4.5" fill="#FFCC80" />

          <path d="M32 55 L22 80 L35 90" stroke="#4CAF4F" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />

          <rect x="33" y="115" width="11" height="95" rx="4" fill="#263238" />
          <rect x="49" y="115" width="11" height="95" rx="4" fill="#37474F" />
          <ellipse cx="37" cy="212" rx="9" ry="4" fill="#263238" />
          <ellipse cx="55" cy="212" rx="9" ry="4" fill="#263238" />
        </g>

        {/* Engineer on Right */}
        <g transform="translate(320, 100)">
          <circle cx="40" cy="35" r="14" fill="#FFCC80" />
          <path d="M28 30 C28 16 54 16 54 30 Z" fill="#263238" />

          <path d="M26 52 L54 52 L58 125 L22 125 Z" fill="#4CAF4F" />
          <path d="M26 55 L10 85 L-5 85" stroke="#4CAF4F" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M54 55 L35 90 L10 88" stroke="#4CAF4F" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="-15" y="75" width="28" height="38" rx="3" fill="#263238" />
          <rect x="-12" y="78" width="22" height="32" rx="2" fill="#E8F5E9" />

          <rect x="26" y="125" width="12" height="105" rx="4" fill="#263238" />
          <rect x="44" y="125" width="12" height="105" rx="4" fill="#37474F" />
          <ellipse cx="31" cy="232" rx="9" ry="4" fill="#263238" />
          <ellipse cx="51" cy="232" rx="9" ry="4" fill="#263238" />
        </g>
      </svg>
    </div>
  )
}

// Cloud & Microservices Architecture Illustration
export function ZytronaCloudArchitectureIllustration({ className = "w-full max-w-[440px]" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 460 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <ellipse cx="230" cy="350" rx="190" ry="24" fill="#E8F5E9" fillOpacity="0.8" />

        {/* Central Server Rack / Cloud Cluster */}
        <g transform="translate(150, 45)">
          <rect x="0" y="0" width="160" height="260" rx="14" fill="#263238" />
          <rect x="6" y="6" width="148" height="248" rx="10" fill="#37474F" />

          {/* Unit 1: API Gateway */}
          <rect x="14" y="18" width="132" height="42" rx="6" fill="#263238" />
          <circle cx="28" cy="39" r="5" fill="#4CAF4F" />
          <circle cx="42" cy="39" r="3" fill="#81C784" />
          <rect x="54" y="32" width="55" height="5" rx="2.5" fill="#FFFFFF" />
          <rect x="54" y="41" width="35" height="4" rx="2" fill="#90A4AE" />
          <rect x="118" y="32" width="18" height="14" rx="3" fill="#4CAF4F" fillOpacity="0.2" />
          <text x="127" y="42" fill="#4CAF4F" fontSize="8" fontWeight="bold" textAnchor="middle">API</text>

          {/* Unit 2: Microservices Cluster */}
          <rect x="14" y="68" width="132" height="42" rx="6" fill="#263238" />
          <circle cx="28" cy="89" r="5" fill="#4CAF4F" />
          <circle cx="42" cy="89" r="3" fill="#81C784" />
          <rect x="54" y="82" width="60" height="5" rx="2.5" fill="#FFFFFF" />
          <rect x="54" y="91" width="40" height="4" rx="2" fill="#90A4AE" />
          <rect x="118" y="82" width="18" height="14" rx="3" fill="#81C784" fillOpacity="0.2" />
          <text x="127" y="92" fill="#81C784" fontSize="8" fontWeight="bold" textAnchor="middle">SVC</text>

          {/* Unit 3: Database & Cache */}
          <rect x="14" y="118" width="132" height="42" rx="6" fill="#263238" />
          <circle cx="28" cy="139" r="5" fill="#4CAF4F" />
          <circle cx="42" cy="139" r="3" fill="#81C784" />
          <rect x="54" y="132" width="50" height="5" rx="2.5" fill="#FFFFFF" />
          <rect x="54" y="141" width="45" height="4" rx="2" fill="#90A4AE" />
          <rect x="118" y="132" width="18" height="14" rx="3" fill="#66BB6A" fillOpacity="0.2" />
          <text x="127" y="142" fill="#66BB6A" fontSize="8" fontWeight="bold" textAnchor="middle">SQL</text>

          {/* Unit 4: Telemetry & Monitoring */}
          <rect x="14" y="168" width="132" height="42" rx="6" fill="#263238" />
          <circle cx="28" cy="189" r="5" fill="#4CAF4F" />
          <circle cx="42" cy="189" r="3" fill="#66BB6A" />
          <rect x="54" y="182" width="45" height="5" rx="2.5" fill="#FFFFFF" />
          <rect x="54" y="191" width="30" height="4" rx="2" fill="#90A4AE" />
          <path d="M105 192 L112 186 L118 190 L126 182 L132 185" stroke="#4CAF4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Server Base Stand */}
          <rect x="25" y="220" width="110" height="10" rx="3" fill="#263238" />
        </g>

        {/* Floating Cloud Node on Left */}
        <g transform="translate(60, 60)">
          <rect x="0" y="0" width="65" height="36" rx="8" fill="#4CAF4F" />
          <path d="M18 24 C14 24 12 21 12 18 C12 15 15 13 18 13 C19 10 23 8 28 8 C33 8 37 11 38 14 C41 14 44 16 44 19 C44 22 41 24 38 24 Z" fill="#FFFFFF" />
        </g>

        {/* Floating Uptime Badge on Right */}
        <g transform="translate(325, 65)">
          <rect x="0" y="0" width="85" height="34" rx="6" fill="#263238" />
          <circle cx="16" cy="17" r="5" fill="#4CAF4F" />
          <text x="28" y="21" fill="#FFFFFF" fontSize="11" fontWeight="bold">99.9% SLA</text>
        </g>

        {/* Systems Engineer on Left */}
        <g transform="translate(70, 130)">
          <circle cx="40" cy="35" r="13" fill="#FFCC80" />
          <path d="M28 32 C28 16 52 16 52 32 C52 22 40 20 28 32 Z" fill="#263238" />

          <path d="M28 50 L52 50 L56 115 L24 115 Z" fill="#4CAF4F" />
          <path d="M50 55 L75 75 L88 70" stroke="#4CAF4F" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="91" cy="69" r="4" fill="#FFCC80" />

          <path d="M28 55 L16 80 L28 92" stroke="#4CAF4F" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />

          <rect x="28" y="115" width="11" height="95" rx="4" fill="#263238" />
          <rect x="43" y="115" width="11" height="95" rx="4" fill="#37474F" />
          <ellipse cx="33" cy="212" rx="9" ry="4" fill="#263238" />
          <ellipse cx="49" cy="212" rx="9" ry="4" fill="#263238" />
        </g>

        {/* Metrics Display Stand on Right */}
        <g transform="translate(330, 160)">
          <rect x="0" y="0" width="70" height="90" rx="8" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="1.5" />
          <rect x="8" y="12" width="54" height="6" rx="3" fill="#4CAF4F" />
          <rect x="8" y="24" width="40" height="5" rx="2.5" fill="#90A4AE" />
          <rect x="8" y="34" width="48" height="5" rx="2.5" fill="#90A4AE" />
          <rect x="8" y="48" width="54" height="24" rx="4" fill="#E8F5E9" />
          <path d="M14 64 L22 56 L32 60 L42 52 L54 55" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="30" y="90" width="10" height="40" fill="#B0BEC5" />
          <ellipse cx="35" cy="130" rx="25" ry="7" fill="#90A4AE" />
        </g>
      </svg>
    </div>
  )
}

import { Marquee } from './shadcn-space/animations/marquee'

// 7 Clean Client & Partner Logos in Infinite Smooth Marquee
export function ZytronaClientLogosRow({ className = "" }) {
  const logos = [
    { name: "ZOCA", title: "ZOCA Crimson Charm Live Site", style: "font-extrabold text-xs sm:text-sm tracking-wider", href: "https://zoca-crimson-charm.lovable.app" },
    { name: "BLUE BASE", title: "Blue Base Saloon Live Site", style: "font-bold text-[11px] sm:text-xs tracking-wider uppercase", href: "https://bluebase-family-spot.lovable.app" },
    { name: "FLY", title: "Fly Studio Showcase Live Site", style: "font-black text-xs sm:text-sm tracking-widest", href: "https://fly-studio-showcase.lovable.app/" },
    { name: "CAKES & BITES", title: "Cakes & Bites Live Site", style: "font-bold text-[11px] sm:text-xs tracking-wide", href: "https://bites-artisanal-charm.lovable.app" },
    { name: "11 TO 11", title: "11 TO 11 Restaurant Live Site", style: "font-extrabold text-xs sm:text-sm tracking-widest", href: "https://a-11to11family.lovable.app" },
    { name: "ZYCARE", title: "ZYCARE Health Architecture", style: "font-black text-xs sm:text-sm tracking-wider text-[#4CAF4F]", href: "/#services" },
    { name: "ZYGLASS", title: "ZYGLASS AI Systems", style: "font-black text-xs sm:text-sm tracking-wider", href: "/#services" },
  ]

  return (
    <div className={`w-full overflow-hidden py-1 sm:py-2 ${className}`}>
      <Marquee pauseOnHover duration="25s" repeat={4} gap="1.25rem" className="[--gap:1.25rem] sm:[--gap:2.5rem]">
        {logos.map((logo, idx) => (
          <a 
            key={idx}
            href={logo.href}
            {...(logo.href.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="h-10 sm:h-12 px-3.5 sm:px-6 flex items-center justify-center text-[#263238] hover:text-[#4CAF4F] transition-all cursor-pointer bg-[#F5F7FA] border border-[#E0E0E0] hover:border-[#4CAF4F] rounded-md shadow-2xs hover:shadow-sm shrink-0 whitespace-nowrap select-none no-underline"
            title={logo.title}
          >
            <span className={`${logo.style} whitespace-nowrap`}>{logo.name}</span>
          </a>
        ))}
      </Marquee>
    </div>
  )
}

// Showcase / Production Spotlight Badge
export function ShowcaseBadge({ className = "w-full max-w-[320px]" }) {
  return (
    <div className={`aspect-square bg-[#0b1014] rounded-xl flex flex-col items-center justify-center p-5 sm:p-8 shadow-xl border border-neutral-800 text-center ${className}`}>
      <img 
        src="/Logo.png" 
        alt="ZYTRONA" 
        className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-lg p-1 bg-white mb-3 sm:mb-4 shadow-md"
      />
      <span className="text-white font-extrabold text-lg sm:text-xl tracking-wider mb-1">ZYTRONA</span>
      <span className="text-[10px] sm:text-xs text-[#81C784] font-medium tracking-widest uppercase">Verified Enterprise SLA</span>
      <div className="mt-3 sm:mt-4 px-2.5 sm:px-3 py-1 bg-[#18231C] border border-[#2E5E3C] rounded-full text-[10px] sm:text-[11px] text-neutral-300 whitespace-nowrap">
        ⚡ 99.9% Uptime &amp; 100% IP
      </div>
    </div>
  )
}
