"use client";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Palette, 
  Server, 
  Video, 
  ArrowRight, 
  ChevronDown 
} from "lucide-react";

const Navbar = ({ children, className }) => {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 pointer-events-none",
        className
      )}
    >
      <div className="pointer-events-auto w-full">
        {children}
      </div>
    </header>
  );
};

const NavBody = ({ children, className }) => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 30) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <motion.div
      initial={{ width: "100%", y: 0, borderRadius: "0px" }}
      animate={{
        width: scrolled ? "86%" : "100%",
        maxWidth: scrolled ? "980px" : "100%",
        y: scrolled ? 14 : 0,
        borderRadius: scrolled ? "9999px" : "0px",
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
        mass: 0.8
      }}
      className={cn(
        "mx-auto flex items-center justify-between transition-colors duration-300",
        "bg-white/85 backdrop-blur-xl",
        scrolled
          ? "border border-black/[0.1] shadow-2xl shadow-black/[0.08] px-5 sm:px-6 py-2 bg-white/92"
          : "border-b border-black/[0.08] px-6 lg:px-12 py-3.5 bg-white/85",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const SERVICES_MENU = [
  {
    name: "Web Platform & SaaS",
    desc: "React 19, Next.js & Sub-Second Cloud",
    icon: <Globe className="w-4 h-4 text-black" />,
    link: "/service/website-development"
  },
  {
    name: "Mobile App Engineering",
    desc: "React Native & Swift Native Performance",
    icon: <Smartphone className="w-4 h-4 text-black" />,
    link: "/service/app-development"
  },
  {
    name: "AI & Neural Automation",
    desc: "Deep Learning, LLMs & Computer Vision",
    icon: <Cpu className="w-4 h-4 text-black" />,
    link: "/service/tensorflow-ai"
  },
  {
    name: "UI/UX & Design Systems",
    desc: "Figma Tokens, Micro-Interactions & Prototyping",
    icon: <Palette className="w-4 h-4 text-black" />,
    link: "/service/ui-designs"
  },
  {
    name: "DevOps & Cloud SRE",
    desc: "CI/CD, Kubernetes, Docker & 99.99% Uptime",
    icon: <Server className="w-4 h-4 text-black" />,
    link: "/service/devops-linux"
  },
  {
    name: "Commercial Motion & Media",
    desc: "4K Brand Reels, 3D VFX & Motion Graphics",
    icon: <Video className="w-4 h-4 text-black" />,
    link: "/service/video-editing"
  }
];

const NavItems = ({ items, className, onItemClick, activeSection }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={cn(
        "hidden md:flex items-center gap-1 lg:gap-1.5 relative",
        className
      )}
    >
      {items.map((item, index) => {
        const isServices = item.name === 'Services';
        const isActive = activeSection ? activeSection === item.name.toLowerCase() : false;

        if (isServices) {
          return (
            <div 
              key={item.name} 
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <a
                href={item.link}
                onClick={() => {
                  if (onItemClick) onItemClick();
                }}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs lg:text-sm font-semibold transition-colors duration-200 rounded-full flex items-center gap-1 cursor-pointer",
                  "text-neutral-700 hover:text-black",
                  (servicesOpen || isActive) && "text-black font-bold"
                )}
              >
                <span>{item.name}</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", servicesOpen && "rotate-180")} />
              </a>

              {/* Frosted Services Dropdown */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-[500px] p-3 rounded-2xl bg-white/95 backdrop-blur-2xl border border-black/[0.08] shadow-2xl shadow-black/10 grid grid-cols-2 gap-2 z-50"
                  >
                    {SERVICES_MENU.map((srv, sIdx) => (
                      <Link
                        key={sIdx}
                        to={srv.link}
                        onClick={() => setServicesOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-black/[0.06] transition-all duration-200 flex items-start gap-2.5 group"
                      >
                        <div className="p-2 rounded-lg bg-neutral-100 group-hover:bg-black group-hover:text-white transition-colors duration-200 flex-shrink-0">
                          {React.cloneElement(srv.icon, { className: "w-4 h-4 group-hover:text-white" })}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-neutral-900 group-hover:text-black flex items-center gap-1">
                            {srv.name}
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                          </div>
                          <p className="text-[10px] text-neutral-500 leading-snug mt-0.5">{srv.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        return (
          <a
            key={item.name}
            href={item.link}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={onItemClick}
            className={cn(
              "relative px-3.5 py-1.5 text-xs lg:text-sm font-semibold transition-colors duration-200 rounded-full",
              "text-neutral-700 hover:text-black",
              isActive && "text-black font-bold"
            )}
          >
            {hoveredIndex === index && (
              <motion.span
                layoutId="nav-hover"
                className="absolute inset-0 bg-neutral-100/90 rounded-full -z-10"
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}
            <span className="relative z-10">{item.name}</span>
          </a>
        );
      })}
    </nav>
  );
};

const NavbarLogo = ({ className }) => {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5 group flex-shrink-0", className)}>
      <div className="relative">
        <img
          src="/Logo.png"
          alt="ZYTRONA Logo"
          className="w-7 h-7 rounded-full object-cover border border-black/10 group-hover:scale-105 transition-transform duration-200"
        />
        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
      </div>
      <div className="flex flex-col">
        <span className="font-['Allerta_Stencil'] text-base font-bold text-neutral-900 tracking-wider group-hover:text-black transition-colors">
          ZYTRONA
        </span>
      </div>
    </Link>
  );
};

const NavbarButton = ({ children, variant = "primary", className, ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 text-xs lg:text-sm font-bold rounded-full transition-all duration-200 inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap",
        variant === "primary"
          ? "bg-black text-white hover:bg-neutral-800 shadow-md shadow-black/10 hover:shadow-lg hover:-translate-y-0.5"
          : "bg-white/80 backdrop-blur-md text-neutral-900 border border-neutral-200/90 hover:bg-neutral-100 hover:border-neutral-300",
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
    <div className={cn("md:hidden pointer-events-auto", className)}>
      {children}
    </div>
  );
};

const MobileNavHeader = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-5 py-3 bg-white/90 backdrop-blur-xl border-b border-black/[0.08]",
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
      className={cn("p-2 text-neutral-800 rounded-lg hover:bg-neutral-100 transition-colors", className)}
      aria-label="Toggle menu"
    >
      <div className="w-5 h-4 flex flex-col justify-between">
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 7 : 0,
          }}
          className="w-full h-0.5 bg-neutral-900 block rounded-full"
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={{ opacity: isOpen ? 0 : 1 }}
          className="w-full h-0.5 bg-neutral-900 block rounded-full"
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -7 : 0,
          }}
          className="w-full h-0.5 bg-neutral-900 block rounded-full"
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
            "overflow-hidden bg-white/95 backdrop-blur-2xl border-b border-black/[0.08] shadow-2xl",
            className
          )}
        >
          <div className="flex flex-col gap-2 px-5 py-5 max-h-[85vh] overflow-y-auto">
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
