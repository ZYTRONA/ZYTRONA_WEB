"use client";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import { 
  Globe, 
  Smartphone, 
  Palette, 
  ArrowRight, 
  ChevronDown,
  Building2,
  FolderGit2,
  ShieldCheck,
  Users
} from "lucide-react";
import { ZytronaLogo } from "@/components/ZytronaFigmaAssets";

const Navbar = ({ children, className }) => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-shadow duration-200",
        scrolled ? "shadow-md" : "shadow-sm",
        className
      )}
    >
      <div className="w-full">
        {children}
      </div>
    </header>
  );
};

const NavBody = ({ children, className }) => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <div
      className={cn(
        "w-full hidden md:flex items-center justify-between transition-all duration-200",
        "bg-white/95 dark:bg-[#0B0D0F]/95 backdrop-blur-md border-b border-[#E0E0E0] dark:border-[#232936] px-6 lg:px-16 py-4 text-[#18191F] dark:text-[#F8FAFC]",
        scrolled && "shadow-sm py-3.5",
        className
      )}
    >
      {children}
    </div>
  );
};

// 3 Core Services for Dropdown
const SERVICES_MENU = [
  {
    name: "Web Platform & SaaS",
    desc: "React 19, Next.js & Sub-Second Speed",
    icon: <Globe className="w-4 h-4 text-[#4CAF4F]" />,
    link: "/service/website-development"
  },
  {
    name: "Mobile App Engineering",
    desc: "React Native & Swift Native Performance",
    icon: <Smartphone className="w-4 h-4 text-[#4CAF4F]" />,
    link: "/service/app-development"
  },
  {
    name: "UI/UX & Design Systems",
    desc: "Figma Tokens, Micro-Interactions & Prototyping",
    icon: <Palette className="w-4 h-4 text-[#4CAF4F]" />,
    link: "/service/ui-designs"
  }
];

const NavItems = ({ className, onItemClick, activeSection }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (menuName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <nav className={cn("hidden md:flex items-center gap-6 lg:gap-10 relative", className)}>
      <Link
        to="/"
        onClick={onItemClick}
        className={cn(
          "text-[15px] font-medium text-[#18191F] hover:text-[#4CAF4F] transition-colors py-1.5",
          activeSection === "home" && "text-[#4CAF4F] font-semibold"
        )}
      >
        Home
      </Link>

      {/* SERVICES DROPDOWN */}
      <div 
        className="relative"
        onMouseEnter={() => handleMouseEnter("services")}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/#services"
          onClick={() => {
            setActiveDropdown(null);
            if (onItemClick) onItemClick();
          }}
          className={cn(
            "text-[15px] font-medium text-[#18191F] hover:text-[#4CAF4F] flex items-center gap-1.5 py-1.5 transition-colors cursor-pointer",
            activeDropdown === "services" && "text-[#4CAF4F] font-semibold"
          )}
        >
          <span>Services</span>
          <ChevronDown className={cn("w-3.5 h-3.5 text-neutral-400 transition-transform duration-200", activeDropdown === "services" && "rotate-180 text-[#4CAF4F]")} />
        </Link>

        <AnimatePresence>
          {activeDropdown === "services" && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[380px] p-2.5 rounded-md bg-white border border-[#E0E0E0] shadow-xl z-50 flex flex-col gap-1"
            >
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#4CAF4F] border-b border-[#F0F0F0]">
                Core Engineering Capabilities
              </div>
              {SERVICES_MENU.map((srv, sIdx) => (
                <Link
                  key={sIdx}
                  to={srv.link}
                  onClick={() => {
                    setActiveDropdown(null);
                    if (onItemClick) onItemClick();
                  }}
                  className="p-2.5 rounded hover:bg-[#F5F7FA] transition-colors flex items-start gap-3 group"
                >
                  <div className="p-2 rounded bg-[#E8F5E9] text-[#4CAF4F] group-hover:bg-[#4CAF4F] group-hover:text-white transition-colors shrink-0">
                    {srv.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-[#263238] group-hover:text-[#4CAF4F] flex items-center justify-between">
                      <span>{srv.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                    </div>
                    <p className="text-xs text-[#717171] leading-snug mt-0.5">{srv.desc}</p>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link
        to="/about"
        onClick={onItemClick}
        className={cn(
          "text-[15px] font-medium text-[#18191F] hover:text-[#4CAF4F] transition-colors py-1.5",
          activeSection === "about" && "text-[#4CAF4F] font-semibold"
        )}
      >
        About
      </Link>

      <Link
        to="/#insights"
        onClick={onItemClick}
        className="text-[15px] font-medium text-[#18191F] hover:text-[#4CAF4F] transition-colors py-1.5"
      >
        Insights
      </Link>
    </nav>
  );
};

const NavbarLogo = ({ className }) => {
  return (
    <Link to="/" className={cn("flex items-center", className)}>
      <ZytronaLogo />
    </Link>
  );
};

// Boxy Green Button
const NavbarButton = ({ children, variant = "primary", className, ...props }) => {
  return (
    <button
      className={cn(
        "px-6 py-2.5 text-sm font-semibold transition-all duration-200 inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap rounded-md",
        variant === "primary"
          ? "bg-[#4CAF4F] text-white hover:bg-[#388E3C] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          : "bg-transparent text-[#4CAF4F] border border-[#4CAF4F] hover:bg-[#E8F5E9] dark:hover:bg-[#4CAF4F]/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const MobileNav = ({ children, className }) => {
  return (
    <div className={cn("md:hidden pointer-events-auto w-full", className)}>
      {children}
    </div>
  );
};

const MobileNavHeader = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 sm:px-6 py-4 bg-white dark:bg-[#0B0D0F] border-b border-[#E0E0E0] dark:border-[#232936] w-full text-[#18191F] dark:text-[#F8FAFC]",
        className
      )}
    >
      {children}
    </div>
  );
};

const MobileNavToggle = ({ isOpen, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn("p-2 text-[#263238] dark:text-[#E2E8F0] rounded-md hover:bg-[#F5F7FA] dark:hover:bg-[#15181E] transition-colors cursor-pointer", className)}
      aria-label="Toggle menu"
    >
      <div className="w-5 h-4 flex flex-col justify-between">
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 7 : 0,
          }}
          className="w-full h-0.5 bg-[#263238] dark:bg-[#E2E8F0] block rounded-full"
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={{ opacity: isOpen ? 0 : 1 }}
          className="w-full h-0.5 bg-[#263238] dark:bg-[#E2E8F0] block rounded-full"
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -7 : 0,
          }}
          className="w-full h-0.5 bg-[#263238] dark:bg-[#E2E8F0] block rounded-full"
          transition={{ duration: 0.2 }}
        />
      </div>
    </button>
  );
};

const MobileNavMenu = ({ children, isOpen, className }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "overflow-hidden bg-white dark:bg-[#15181E] border-b border-[#E0E0E0] dark:border-[#232936] shadow-lg text-[#18191F] dark:text-[#F8FAFC]",
            className
          )}
        >
          <div className="flex flex-col gap-3 px-6 py-5 max-h-[85vh] overflow-y-auto">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
};
