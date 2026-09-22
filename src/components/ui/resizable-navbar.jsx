"use client";
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Globe,
  Palette,
  ArrowRight,
  ChevronDown,
  Search,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { ZytronaLogo } from "@/components/ZytronaFigmaAssets";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchModal } from "@/components/ui/SearchModal";

// 2 Core Services for Dropdown & Mobile Menu
const SERVICES_MENU = [
  {
    name: "Web Platform & SaaS",
    desc: "React 19, Next.js & Sub-Second Speed",
    icon: <Globe className="w-4 h-4 text-[#4CAF4F]" />,
    link: "/service/website-development",
  },
  {
    name: "UI/UX & Design Systems",
    desc: "Figma Tokens, Micro-Interactions & Prototyping",
    icon: <Palette className="w-4 h-4 text-[#4CAF4F]" />,
    link: "/service/ui-designs",
  },
];

export function SiteNavbar({ 
  onStartProject, 
  activeSection, 
  className 
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);
  const servicesBtnRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Scroll listener for sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile menu and dropdowns on route change
  const currentLocationKey = location.pathname + location.hash;
  const [prevLocationKey, setPrevLocationKey] = useState(currentLocationKey);
  if (prevLocationKey !== currentLocationKey) {
    setPrevLocationKey(currentLocationKey);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileServicesOpen(false);
  }

  // Determine active item
  const currentPath = location.pathname;
  const currentHash = location.hash;

  const isHome = activeSection === "home" || (currentPath === "/" && !currentHash);
  const isServices = activeSection === "services" || currentPath.startsWith("/service") || currentHash === "#services";
  const isArchitecture = activeSection === "architecture" || currentHash === "#architecture";
  const isInsights = activeSection === "insights" || currentHash === "#insights";
  const isAbout = activeSection === "about" || currentPath === "/about";

  const openDropdown = (name) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const scheduleCloseDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const closeDropdownImmediately = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(null);
  };

  const handleStartProject = () => {
    setMobileMenuOpen(false);
    if (onStartProject) {
      onStartProject();
    } else {
      navigate("/#contact");
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          "bg-white/95 dark:bg-[#0B0D0F]/95 backdrop-blur-md border-b border-[#E0E0E0] dark:border-[#232936]",
          scrolled ? "shadow-md h-[72px]" : "shadow-xs h-20",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-16 h-full flex items-center justify-between">
          {/* 1. Official Brand Logo */}
          <Link to="/" className="flex items-center shrink-0" aria-label="ZYTRONA Homepage">
            <ZytronaLogo />
          </Link>

          {/* 2. Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10 relative">
            {/* Home */}
            <Link
              to="/"
              className={cn(
                "text-[15px] font-medium transition-colors py-2",
                isHome
                  ? "text-[#4CAF4F] font-semibold"
                  : "text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F] dark:hover:text-[#4CAF4F]"
              )}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown("services")}
              onMouseLeave={scheduleCloseDropdown}
            >
              <button
                ref={servicesBtnRef}
                type="button"
                aria-haspopup="true"
                aria-expanded={activeDropdown === "services"}
                onClick={() =>
                  setActiveDropdown((prev) => (prev === "services" ? null : "services"))
                }
                onFocus={() => openDropdown("services")}
                className={cn(
                  "text-[15px] font-medium flex items-center gap-1.5 py-2 transition-colors cursor-pointer bg-transparent",
                  isServices
                    ? "text-[#4CAF4F] font-semibold"
                    : "text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F] dark:hover:text-[#4CAF4F]"
                )}
              >
                <span>Services</span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    activeDropdown === "services"
                      ? "rotate-180 text-[#4CAF4F]"
                      : "text-neutral-400"
                  )}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[380px] p-2.5 rounded-lg bg-white dark:bg-[#15181E] border border-[#E0E0E0] dark:border-[#232936] shadow-xl z-50 flex flex-col gap-1"
                  >
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#4CAF4F] border-b border-[#F0F0F0] dark:border-[#232936] flex items-center justify-between">
                      <span>Core Engineering Disciplines</span>
                      <span className="text-[10px] text-neutral-400 font-normal">2 Services</span>
                    </div>

                    {SERVICES_MENU.map((srv, sIdx) => (
                      <Link
                        key={sIdx}
                        to={srv.link}
                        role="menuitem"
                        onClick={closeDropdownImmediately}
                        className="p-2.5 rounded-md hover:bg-[#F5F7FA] dark:hover:bg-[#1E222A] transition-colors flex items-start gap-3 group"
                      >
                        <div className="p-2 rounded-md bg-[#E8F5E9] dark:bg-[#4CAF4F]/15 text-[#4CAF4F] shrink-0">
                          {srv.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-[#263238] dark:text-[#F8FAFC] group-hover:text-[#4CAF4F] flex items-center justify-between">
                            <span>{srv.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                          </div>
                          <p className="text-xs text-[#717171] dark:text-[#A0AEC0] leading-snug mt-0.5">
                            {srv.desc}
                          </p>
                        </div>
                      </Link>
                    ))}

                    <div className="pt-1 mt-1 border-t border-[#F0F0F0] dark:border-[#232936]">
                      <Link
                        to="/#services"
                        role="menuitem"
                        onClick={closeDropdownImmediately}
                        className="px-3 py-2 text-xs font-semibold text-[#4CAF4F] hover:bg-[#E8F5E9]/60 dark:hover:bg-[#4CAF4F]/10 rounded flex items-center justify-between transition-colors"
                      >
                        <span>View All Capabilities & Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Engineering */}
            <Link
              to="/#architecture"
              className={cn(
                "text-[15px] font-medium transition-colors py-2",
                isArchitecture
                  ? "text-[#4CAF4F] font-semibold"
                  : "text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F] dark:hover:text-[#4CAF4F]"
              )}
            >
              Engineering
            </Link>

            {/* Case Studies */}
            <Link
              to="/#insights"
              className={cn(
                "text-[15px] font-medium transition-colors py-2",
                isInsights
                  ? "text-[#4CAF4F] font-semibold"
                  : "text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F] dark:hover:text-[#4CAF4F]"
              )}
            >
              Case Studies
            </Link>

            {/* About */}
            <Link
              to="/about"
              className={cn(
                "text-[15px] font-medium transition-colors py-2",
                isAbout
                  ? "text-[#4CAF4F] font-semibold"
                  : "text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F] dark:hover:text-[#4CAF4F]"
              )}
            >
              About
            </Link>
          </nav>

          {/* 3. Right Controls (Desktop: Search Trigger, Theme Toggle, Start a Project) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search website"
              className="hidden lg:flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#717171] dark:text-[#94A3B8] bg-[#F5F7FA] dark:bg-[#15181E] border border-[#E0E0E0] dark:border-[#232936] rounded-md hover:border-[#4CAF4F] hover:text-[#263238] dark:hover:text-white transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#4CAF4F]" />
              <span>Search...</span>
              <kbd className="text-[10px] bg-white dark:bg-[#232936] border border-[#E0E0E0] dark:border-[#374151] px-1.5 py-0.5 rounded text-[#717171] dark:text-[#94A3B8] font-sans">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Start a Project Boxy Button */}
            <button
              onClick={handleStartProject}
              className="btn-nexcent-primary cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4. Mobile Right Controls (Search Icon, Theme Toggle, Hamburger Button) */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Mobile Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search website"
              className="p-2 text-[#263238] dark:text-[#E2E8F0] hover:text-[#4CAF4F] rounded-md transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Theme Toggle */}
            <ThemeToggle size="sm" />

            {/* Animated Hamburger / Close Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="p-2 text-[#263238] dark:text-[#E2E8F0] hover:text-[#4CAF4F] rounded-md transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#4CAF4F]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* 5. Mobile Animated Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden bg-white/98 dark:bg-[#0B0D0F]/98 backdrop-blur-xl border-b border-[#E0E0E0] dark:border-[#232936] shadow-xl text-[#18191F] dark:text-[#F8FAFC]"
            >
              <div className="flex flex-col gap-2 px-6 py-6 max-h-[80vh] overflow-y-auto">
                {/* Home */}
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-base font-semibold py-2 transition-colors",
                    isHome ? "text-[#4CAF4F]" : "text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
                  )}
                >
                  Home
                </Link>

                {/* Services with Sub-Accordion */}
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className={cn(
                      "w-full flex items-center justify-between text-base font-semibold py-2 transition-colors text-left",
                      isServices ? "text-[#4CAF4F]" : "text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
                    )}
                  >
                    <span>Services</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        mobileServicesOpen ? "rotate-180 text-[#4CAF4F]" : "text-neutral-400"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-3 border-l-2 border-[#4CAF4F]/30 space-y-2 mt-1 mb-2"
                      >
                        {SERVICES_MENU.map((srv, idx) => (
                          <Link
                            key={idx}
                            to={srv.link}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 py-1.5 text-sm font-medium text-[#717171] dark:text-[#A0AEC0] hover:text-[#4CAF4F]"
                          >
                            <span className="text-[#4CAF4F]">{srv.icon}</span>
                            <span>{srv.name}</span>
                          </Link>
                        ))}
                        <Link
                          to="/#services"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 text-xs font-bold text-[#4CAF4F]"
                        >
                          → View All Capabilities
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Engineering */}
                <Link
                  to="/#architecture"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-base font-semibold py-2 transition-colors",
                    isArchitecture ? "text-[#4CAF4F]" : "text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
                  )}
                >
                  Engineering
                </Link>

                {/* Case Studies */}
                <Link
                  to="/#insights"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-base font-semibold py-2 transition-colors",
                    isInsights ? "text-[#4CAF4F]" : "text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
                  )}
                >
                  Case Studies
                </Link>

                {/* About */}
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-base font-semibold py-2 transition-colors",
                    isAbout ? "text-[#4CAF4F]" : "text-[#18191F] dark:text-[#F8FAFC] hover:text-[#4CAF4F]"
                  )}
                >
                  About
                </Link>

                {/* Start a Project Button in Mobile Menu */}
                <div className="pt-3 mt-2 border-t border-[#E0E0E0] dark:border-[#232936]">
                  <button
                    onClick={handleStartProject}
                    className="w-full btn-nexcent-primary py-3.5 text-center font-bold text-base justify-center shadow-sm cursor-pointer"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

// Backward-compatible individual exports
export const Navbar = ({ children, className }) => (
  <header className={cn("fixed top-0 left-0 right-0 z-50 w-full", className)}>
    {children}
  </header>
);

export default SiteNavbar;