"use client"
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export function UCalendar({
  selected,
  onSelect,
  disabled,
  className = "",
}) {
  const today = React.useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  // Currently viewed month/year
  const [viewDate, setViewDate] = React.useState(() => {
    if (selected instanceof Date && !isNaN(selected)) {
      return new Date(selected.getFullYear(), selected.getMonth(), 1)
    }
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  // Sync view when selected date changes externally
  React.useEffect(() => {
    if (selected instanceof Date && !isNaN(selected)) {
      setViewDate(new Date(selected.getFullYear(), selected.getMonth(), 1))
    }
  }, [selected])

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const prevMonth = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setViewDate(new Date(year, month - 1, 1))
  }

  const nextMonth = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setViewDate(new Date(year, month + 1, 1))
  }

  // Calculate calendar days (Monday-first)
  const calendarDays = React.useMemo(() => {
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7 // Monday = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    const days = []

    // Previous month trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i)
      date.setHours(0, 0, 0, 0)
      days.push({
        date,
        dayNumber: daysInPrevMonth - i,
        isCurrentMonth: false,
        isPrevMonth: true,
      })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      date.setHours(0, 0, 0, 0)
      days.push({
        date,
        dayNumber: i,
        isCurrentMonth: true,
      })
    }

    // Next month leading days (fill up to 35 or 42 cells)
    const totalCells = days.length <= 35 ? 35 : 42
    const remaining = totalCells - days.length
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i)
      date.setHours(0, 0, 0, 0)
      days.push({
        date,
        dayNumber: i,
        isCurrentMonth: false,
        isNextMonth: true,
      })
    }

    return days
  }, [year, month])

  const isSelected = (d) => {
    if (!selected || !(selected instanceof Date) || isNaN(selected)) return false
    return (
      d.getFullYear() === selected.getFullYear() &&
      d.getMonth() === selected.getMonth() &&
      d.getDate() === selected.getDate()
    )
  }

  const isToday = (d) => {
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    )
  }

  const isPastDisabled = (d) => {
    if (!disabled) return false
    if (disabled.before) {
      const beforeDate = new Date(disabled.before)
      beforeDate.setHours(0, 0, 0, 0)
      return d < beforeDate
    }
    return false
  }

  return (
    <div className={`u-calendar-root ${className}`}>
      {/* Header with Month/Year and Always-Active Chevrons */}
      <div className="u-calendar-header">
        <div className="u-calendar-caption">
          <span className="u-calendar-month">{MONTH_NAMES[month]}</span>
          <span className="u-calendar-year">{year}</span>
        </div>

        <div className="u-calendar-nav">
          <button
            type="button"
            onClick={prevMonth}
            className="u-calendar-nav-btn"
            aria-label="Previous month"
            title="Previous month"
          >
            <ChevronLeft size={16} className="u-nav-icon" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="u-calendar-nav-btn"
            aria-label="Next month"
            title="Next month"
          >
            <ChevronRight size={16} className="u-nav-icon" />
          </button>
        </div>
      </div>

      {/* Weekday Row */}
      <div className="u-calendar-weekdays">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="u-calendar-weekday">
            {wd}
          </div>
        ))}
      </div>

      {/* 7-Column Days Grid */}
      <div className="u-calendar-grid">
        {calendarDays.map((item, idx) => {
          const selectedState = isSelected(item.date)
          const todayState = isToday(item.date)
          const pastDisabled = isPastDisabled(item.date)
          const isCurrent = item.isCurrentMonth
          const disabledState = pastDisabled || !isCurrent

          return (
            <button
              key={idx}
              type="button"
              disabled={disabledState}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (!disabledState && onSelect) {
                  onSelect(item.date)
                }
              }}
              className={`u-calendar-day-btn ${
                selectedState ? "is-selected" : ""
              } ${todayState ? "is-today" : ""} ${
                !isCurrent ? "is-outside" : ""
              } ${pastDisabled && isCurrent ? "is-past" : ""} ${
                disabledState ? "is-disabled" : ""
              }`}
              aria-label={item.date.toDateString()}
            >
              <span className="u-calendar-day-text">{item.dayNumber}</span>
              {todayState && !selectedState && (
                <span className="u-calendar-today-dot" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { UCalendar as Calendar }
export default UCalendar
