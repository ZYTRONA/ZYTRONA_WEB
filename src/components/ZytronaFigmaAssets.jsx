import React from 'react'
import { Link } from 'react-router-dom'

// ZYTRONA Official Brand Logo using /Logo.png with Figma styling
export function ZytronaLogo({ className = "h-9", light = false, showTagline = true }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official ZYTRONA Logo Image */}
      <img 
        src="/Logo.png" 
        alt="ZYTRONA Logo" 
        className="h-10 w-10 object-contain rounded-md border border-[#E0E0E0] dark:border-[#232936] shadow-sm bg-white dark:bg-[#15181E] p-0.5 shrink-0"
      />

      <div className="flex flex-col">
        <span className={`font-['Inter'] font-extrabold text-xl tracking-wider leading-none ${light ? 'text-white' : 'text-[#263238] dark:text-white'}`}>
          ZYTRONA
        </span>
        {showTagline && (
          <span className="text-[10px] font-bold tracking-widest text-[#4CAF4F] uppercase mt-0.5">
            SYNERGY
          </span>
        )}
      </div>
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

// Mobile & Security Architecture Illustration
export function ZytronaMobileSecurityIllustration({ className = "w-full max-w-[440px]" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 460 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <ellipse cx="230" cy="350" rx="190" ry="24" fill="#E8F5E9" fillOpacity="0.8" />

        {/* Large Smartphone Mockup */}
        <g transform="translate(160, 45)">
          <rect x="0" y="0" width="140" height="270" rx="22" fill="#263238" />
          <rect x="5" y="5" width="130" height="260" rx="18" fill="#FFFFFF" />
          
          <rect x="45" y="12" width="50" height="5" rx="2.5" fill="#CFD8DC" />

          <rect x="18" y="32" width="104" height="24" rx="6" fill="#F5F7FA" />
          <circle cx="30" cy="44" r="6" fill="#4CAF4F" />
          <rect x="44" y="41" width="50" height="6" rx="3" fill="#BDBDBD" />

          {/* Central Security / Performance Card */}
          <rect x="18" y="70" width="104" height="110" rx="10" fill="#E8F5E9" stroke="#C8E6C9" strokeWidth="1.5" />
          <circle cx="70" cy="110" r="24" fill="#4CAF4F" />
          <path d="M62 110 L68 116 L79 104" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="36" y="145" width="68" height="7" rx="3.5" fill="#2E7D32" />
          <rect x="44" y="158" width="52" height="5" rx="2.5" fill="#81C784" />

          <rect x="18" y="195" width="104" height="24" rx="4" fill="#4CAF4F" />
          <rect x="45" y="204" width="50" height="6" rx="3" fill="#FFFFFF" />

          <rect x="18" y="226" width="104" height="24" rx="4" fill="#F5F7FA" stroke="#E0E0E0" />
          <rect x="45" y="235" width="50" height="6" rx="3" fill="#757575" />
        </g>

        {/* Green Shield on Top of Phone */}
        <g transform="translate(255, 20)">
          <circle cx="28" cy="28" r="24" fill="#4CAF4F" />
          <path d="M22 24 V19 C22 15 34 15 34 19 V24 M18 24 H38 V36 H18 Z" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Engineer on Left */}
        <g transform="translate(85, 120)">
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

        {/* Plant on right */}
        <g transform="translate(325, 190)">
          <path d="M20 120 C10 80 50 60 50 40 C50 60 90 80 80 120 Z" fill="#4CAF4F" />
          <path d="M10 120 C-5 90 25 75 30 60 C30 75 60 90 50 120 Z" fill="#66BB6A" />
          <path d="M45 120 C40 85 70 70 85 50 C85 70 110 85 95 120 Z" fill="#81C784" />
          <rect x="35" y="120" width="30" height="35" rx="4" fill="#B0BEC5" />
        </g>
      </svg>
    </div>
  )
}

import { Marquee } from './shadcn-space/animations/marquee'

// 7 Clean Client & Partner Logos in Infinite Smooth Marquee
export function ZytronaClientLogosRow({ className = "" }) {
  const logos = [
    { name: "ZOCA", title: "ZOCA Crimson Charm", style: "font-extrabold text-xs sm:text-sm tracking-wider" },
    { name: "BLUE BASE", title: "Blue Base Saloon", style: "font-bold text-[11px] sm:text-xs tracking-wider uppercase" },
    { name: "FLY", title: "Fly Studio", style: "font-black text-xs sm:text-sm tracking-widest" },
    { name: "CAKES & BITES", title: "Cakes & Bites", style: "font-bold text-[11px] sm:text-xs tracking-wide" },
    { name: "11 TO 11", title: "11 TO 11 Restaurant", style: "font-extrabold text-xs sm:text-sm tracking-widest" },
    { name: "ZYCARE", title: "ZYCARE Health", style: "font-black text-xs sm:text-sm tracking-wider text-[#4CAF4F]" },
    { name: "ZYGLASS", title: "ZYGLASS AI", style: "font-black text-xs sm:text-sm tracking-wider" },
  ]

  return (
    <div className={`w-full overflow-hidden py-1 sm:py-2 ${className}`}>
      <Marquee pauseOnHover duration="25s" repeat={4} gap="1.25rem" className="[--gap:1.25rem] sm:[--gap:2.5rem]">
        {logos.map((logo, idx) => (
          <div 
            key={idx} 
            className="h-10 sm:h-12 px-3.5 sm:px-6 flex items-center justify-center text-[#263238] hover:text-[#4CAF4F] transition-all cursor-pointer bg-[#F5F7FA] border border-[#E0E0E0] hover:border-[#4CAF4F] rounded-md shadow-2xs hover:shadow-sm shrink-0 whitespace-nowrap select-none"
            title={logo.title}
          >
            <span className={`${logo.style} whitespace-nowrap`}>{logo.name}</span>
          </div>
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
        alt="ZYTRONA Synergy" 
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
