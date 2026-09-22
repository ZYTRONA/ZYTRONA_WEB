import { useEffect } from 'react'
import { SiteNavbar } from '@/components/ui/resizable-navbar'
import { Footer } from '@/components/ui/Footer'
import { ShieldCheck } from 'lucide-react'
import '@/App.css'

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0D0F] text-[#4D4D4D] dark:text-[#94A3B8] font-['Inter',sans-serif]">
      {/* Unified Site Navbar */}
      <SiteNavbar />

      <section className="bg-[#F5F7FA] pt-32 pb-16 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF4F]" />
            <span>Client Engagement Standards</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#263238]">Terms of Service</h1>
          <p className="text-sm text-[#717171]">Last updated: August 25, 2026</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="boxy-card p-8 sm:p-12 bg-white space-y-8 leading-relaxed text-sm sm:text-base text-[#4D4D4D]">
          <div>
            <h2 className="text-xl font-bold text-[#263238] mb-3">1. Acceptance of Terms</h2>
            <p>
              By engaging ZYTRONA for software engineering, web application development, cloud systems engineering, or UI/UX design systems, you agree to these Terms of Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#263238] mb-3">2. Engineering Sprints & Milestones</h2>
            <p>
              Projects are executed in disciplined sprint milestones. Milestone deliverables, code reviews, and staging previews are provided for client validation prior to production deployments.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#263238] mb-3">3. 100% IP Ownership Guarantee</h2>
            <p>
              Upon milestone clearance and completion of agreed scope, all intellectual property, source code, database architectures, and Figma design files are unconditionally owned by the client.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#263238] mb-3">4. Mutual Confidentiality (NDA)</h2>
            <p>
              Both parties agree to uphold strict confidentiality regarding technical architectures, business logic, user data, and commercial trade secrets.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#263238] mb-3">5. Warranties & Post-Launch SLA</h2>
            <p>
              We provide post-launch warranty periods to fix any regressions or defects within agreed scope, along with optional continuous SLA uptime monitoring packages.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
