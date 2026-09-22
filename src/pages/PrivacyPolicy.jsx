import { useEffect } from 'react'
import { SiteNavbar } from '@/components/ui/resizable-navbar'
import { Footer } from '@/components/ui/Footer'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import '@/App.css'

export default function PrivacyPolicy() {
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
            <span>Compliance & Transparency</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#263238]">Privacy Policy</h1>
          <p className="text-sm text-[#717171]">Last updated: August 25, 2026</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="boxy-card p-8 sm:p-12 bg-white space-y-8 leading-relaxed text-sm sm:text-base text-[#4D4D4D]">
          <div>
            <h2 className="text-xl font-bold text-[#263238] mb-3">1. Information We Collect</h2>
            <p>
              When you submit a project inquiry or consultation brief through our website, we collect your name, business email address, organization details, and project specifications.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#263238] mb-3">2. How We Use Information</h2>
            <p>
              We strictly utilize provided contact and project details to evaluate technical requirements, prepare architecture proposals, and communicate project deliverables. We never sell, rent, or monetize your information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#263238] mb-3">3. Source Code & Intellectual Property</h2>
            <p>
              All client code repositories, Figma designs, and system architectures created during an engagement are 100% owned by the client upon milestone clearance, subject to our mutual non-disclosure agreements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#263238] mb-3">4. Security & Data Protection</h2>
            <p>
              We implement industry-standard TLS 1.3 encryption, secure hosting environments, and access controls to prevent unauthorized access or disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#263238] mb-3">5. Contact Information</h2>
            <p>
              For privacy-related inquiries, contact our data protection team directly at <a href="mailto:zytronabusiness@gmail.com" className="text-[#4CAF4F] font-semibold hover:underline">zytronabusiness@gmail.com</a>.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
