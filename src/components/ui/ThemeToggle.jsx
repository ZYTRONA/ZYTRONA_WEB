import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

// Reusable ThemeToggle button with smooth micro-interactions
export function ThemeToggle({ className = '', size = 'md' }) {
  const { isDark, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div 
        className={`h-10 w-10 rounded-md border border-[#E0E0E0] dark:border-[#232936] bg-transparent ${className}`} 
        aria-hidden="true" 
      />
    )
  }

  const isSmall = size === 'sm'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center rounded-md border transition-all duration-200 cursor-pointer select-none
        border-[#E0E0E0] dark:border-[#232936] 
        bg-white dark:bg-[#15181E] 
        text-[#263238] dark:text-[#E2E8F0]
        hover:border-[#4CAF4F] dark:hover:border-[#4CAF4F] 
        hover:bg-[#F5F7FA] dark:hover:bg-[#1C212B]
        hover:shadow-sm active:scale-95
        ${isSmall ? 'h-8 w-8' : 'h-10 w-10'}
        ${className}
      `}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun 
            className="w-[18px] h-[18px] text-amber-400 transition-all duration-300 rotate-0 scale-100 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" 
          />
        ) : (
          <Moon 
            className="w-[18px] h-[18px] text-[#263238] transition-all duration-300 -rotate-12 scale-100" 
          />
        )}
      </div>
    </button>
  )
}
