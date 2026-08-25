"use client"
import * as React from "react"
import { Calendar as CalendarIcon, X, ChevronDown } from "lucide-react"
import { UCalendar } from "./calendar"
import { motion, AnimatePresence } from "motion/react"

export function DatePicker({ date, setDate, placeholder = "Pick a preferred date", className = "" }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const formatDate = (d) => {
    if (!d || !(d instanceof Date) || isNaN(d)) return null
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className={`date-picker-container ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`date-picker-trigger ${date ? "has-value" : ""} ${isOpen ? "is-open" : ""}`}
        aria-expanded={isOpen}
      >
        <div className="date-picker-trigger-content">
          <div className="date-picker-icon-box">
            <CalendarIcon size={15} />
          </div>
          <span className={date ? "date-picker-text-active" : "date-picker-text-placeholder"}>
            {date ? formatDate(date) : placeholder}
          </span>
        </div>

        <div className="date-picker-actions-right">
          {date ? (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                setDate(null)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation()
                  setDate(null)
                }
              }}
              className="date-picker-clear-btn"
              title="Clear date"
            >
              <X size={13} />
            </span>
          ) : (
            <ChevronDown size={14} className={`date-picker-chevron ${isOpen ? "rotate-180" : ""}`} />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="date-picker-dropdown"
          >
            <UCalendar
              selected={date}
              onSelect={(d) => {
                setDate(d)
                setIsOpen(false)
              }}
              disabled={{ before: new Date() }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DatePicker
