import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Globe, Smartphone, Palette, FolderGit2, Sparkles, Building2 } from 'lucide-react';

const SEARCHABLE_ITEMS = [
  // Services
  {
    type: 'Service',
    title: 'Web Development & SaaS Platforms',
    desc: 'React 19, Next.js, Microservices & Sub-Second Core Web Vitals',
    link: '/service/website-development',
    icon: <Globe className="w-4 h-4 text-emerald-400" />
  },
  {
    type: 'Service',
    title: 'Mobile App Engineering',
    desc: 'Fluid 60fps Native iOS & Android, React Native & Flutter',
    link: '/service/app-development',
    icon: <Smartphone className="w-4 h-4 text-emerald-400" />
  },
  {
    type: 'Service',
    title: 'UI/UX & Product Design Systems',
    desc: 'Tokenized Figma Systems, Interactive Prototypes & Heuristics',
    link: '/service/ui-designs',
    icon: <Palette className="w-4 h-4 text-emerald-400" />
  },
  // Projects
  {
    type: 'Client Project',
    title: 'ZOCA Crimson Charm',
    desc: 'Experiential Lifestyle & Fashion E-Commerce Storefront',
    link: 'https://zoca-crimson-charm.lovable.app',
    icon: <Building2 className="w-4 h-4 text-blue-400" />
  },
  {
    type: 'Client Project',
    title: 'Blue Base Family Saloon',
    desc: 'Modern Multi-Branch Salon Booking Portal with Real-Time Scheduling',
    link: 'https://bluebase-family-spot.lovable.app',
    icon: <Building2 className="w-4 h-4 text-blue-400" />
  },
  {
    type: 'Client Project',
    title: 'Fly Studio Showcase',
    desc: 'Interactive 4K Media Showcase & Digital Arts Portfolio',
    link: 'https://fly-studio-showcase.lovable.app/',
    icon: <Building2 className="w-4 h-4 text-blue-400" />
  },
  {
    type: 'Client Project',
    title: 'Cakes & Bites',
    desc: 'Gourmet Culinary Showcase with WhatsApp Ordering Integration',
    link: 'https://bites-artisanal-charm.lovable.app',
    icon: <Building2 className="w-4 h-4 text-blue-400" />
  },
  {
    type: 'Client Project',
    title: '11 TO 11 Family Restaurant',
    desc: 'Multi-Cuisine Interactive Dining Experience & Table Discovery',
    link: 'https://a-11to11family.lovable.app',
    icon: <Building2 className="w-4 h-4 text-blue-400" />
  },
  {
    type: 'Open Source',
    title: 'ZYCARE Healthcare Platform',
    desc: 'Clinical Telemetry & Doctor Appointment Scheduling System',
    link: '/#work',
    icon: <FolderGit2 className="w-4 h-4 text-purple-400" />
  },
  {
    type: 'Open Source',
    title: 'ZYNC-CHAT WebSockets Architecture',
    desc: 'Sub-Millisecond End-to-End Encrypted Packet Messaging',
    link: '/#work',
    icon: <FolderGit2 className="w-4 h-4 text-purple-400" />
  },
  // Pages & Sections
  {
    type: 'Navigation',
    title: 'About ZYTRONA',
    desc: 'Engineering Leadership, 5-Stage Blueprint & Core Philosophy',
    link: '/about',
    icon: <Sparkles className="w-4 h-4 text-amber-400" />
  },
  {
    type: 'Navigation',
    title: 'Book Technical Consultation',
    desc: 'Schedule a free discovery call and milestone roadmap review',
    link: '/#contact',
    icon: <Sparkles className="w-4 h-4 text-emerald-400" />
  }
];

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = query.trim() === ''
    ? SEARCHABLE_ITEMS
    : SEARCHABLE_ITEMS.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (link) => {
    onClose();
    if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else if (link.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = link.replace('/#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(link);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07130f]/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0d271f] border border-[#1f4a3b] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-10 text-white"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1b3f32]">
              <Search className="w-5 h-5 text-emerald-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, platforms, open source repos, or pages..."
                className="w-full bg-transparent text-white placeholder-neutral-400 text-sm md:text-base outline-none font-medium"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-[#153428]/40">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-neutral-400 text-sm">
                  No matching services or case studies found for "{query}".
                </div>
              ) : (
                filtered.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item.link)}
                    className="w-full text-left p-3 rounded-xl hover:bg-white/[0.07] transition-all duration-150 flex items-center justify-between group gap-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-[#14392d] border border-[#215443] shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#1b4435] text-emerald-300">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))
              )}
            </div>

            {/* Footer Hints */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#091b15] border-t border-[#17382c] text-[11px] text-neutral-400 font-medium">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">ESC</kbd> to close</span>
              <span>Quick Navigation</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
