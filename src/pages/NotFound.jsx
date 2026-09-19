import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Navbar, 
  NavBody, 
  NavbarLogo, 
  NavbarButton,
  MobileNav,
  MobileNavHeader
} from '@/components/ui/resizable-navbar'
import { Footer } from '@/components/ui/Footer'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Home, ArrowRight, AlertCircle } from 'lucide-react'
import '@/App.css'

export function NotFound() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0D0F] text-[#4D4D4D] dark:text-[#94A3B8] font-['Inter',sans-serif]">
      {/* Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/">
              <NavbarButton variant="secondary">← Back to Home</NavbarButton>
            </Link>
            <Link to="/#contact">
              <NavbarButton variant="primary">Start a Project</NavbarButton>
            </Link>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              <ThemeToggle size="sm" />
              <Link to="/">
                <NavbarButton variant="secondary" className="text-xs py-1.5 px-3">← Home</NavbarButton>
              </Link>
              <Link to="/#contact">
                <NavbarButton variant="primary" className="text-xs py-1.5 px-3">Contact</NavbarButton>
              </Link>
            </div>
          </MobileNavHeader>
        </MobileNav>
      </Navbar>

      <div className="pt-36 pb-24 px-6 lg:px-16 flex items-center justify-center">
        <div className="max-w-lg w-full boxy-card p-10 sm:p-12 text-center space-y-6 bg-white">
          <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#4CAF4F] flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div>
            <div className="text-6xl font-black text-[#263238] tracking-tight mb-2">
              404
            </div>
            <h1 className="text-2xl font-bold text-[#263238]">
              Page Not Found
            </h1>
            <p className="text-sm text-[#717171] mt-2 leading-relaxed">
              The page or resource you are looking for might have been moved, renamed, or is temporarily unavailable.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-nexcent-primary">
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
            <Link to="/#services" className="btn-nexcent-secondary">
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default NotFound
