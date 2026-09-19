import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, Check } from 'lucide-react'

export function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option...',
  className = '',
  id
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const selectedOption = options.find((opt) => 
    (typeof opt === 'string' ? opt : opt.value) === value
  )

  const displayLabel = selectedOption
    ? (typeof selectedOption === 'string' ? selectedOption : selectedOption.label)
    : (typeof value === 'string' && value ? value : placeholder)

  const handleSelect = (opt) => {
    const val = typeof opt === 'string' ? opt : opt.value
    if (onChange) {
      onChange(val)
    }
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className={`relative w-full ${className}`} id={id}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-sm text-left transition-all cursor-pointer border ${
          isOpen
            ? 'border-[#4CAF4F] ring-2 ring-[#4CAF4F]/20 text-[#263238] dark:text-[#F8FAFC]'
            : 'border-[#E0E0E0] dark:border-[#232936] hover:border-[#4CAF4F] dark:hover:border-[#4CAF4F]'
        } bg-white dark:bg-[#15181E]`}
      >
        <span className={`truncate ${value ? 'text-[#263238] dark:text-[#F8FAFC]' : 'text-neutral-400 dark:text-neutral-500'}`}>
          {displayLabel}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? 'rotate-180 text-[#4CAF4F]' : ''
          }`} 
        />
      </button>

      {/* Custom Dropdown List */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="listbox"
            className="absolute z-50 left-0 right-0 mt-1 p-1 bg-white dark:bg-[#15181E] border border-[#E0E0E0] dark:border-[#232936] rounded shadow-xl max-h-60 overflow-auto focus:outline-none"
          >
            {options.map((opt, idx) => {
              const optValue = typeof opt === 'string' ? opt : opt.value
              const optLabel = typeof opt === 'string' ? opt : opt.label
              const isSelected = optValue === value

              return (
                <li
                  key={idx}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt)}
                  className={`flex items-center justify-between px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#E8F5E9] dark:bg-[#4CAF4F]/20 text-[#2E7D32] dark:text-[#66BB6A] font-semibold'
                      : 'text-[#4D4D4D] dark:text-[#94A3B8] hover:bg-[#F5F7FA] dark:hover:bg-[#1C212B] hover:text-[#263238] dark:hover:text-[#F8FAFC]'
                  }`}
                >
                  <span className="truncate">{optLabel}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#4CAF4F] shrink-0 ml-2" />
                  )}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CustomSelect
