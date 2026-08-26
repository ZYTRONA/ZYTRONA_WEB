"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function Calendar({
  selected,
  onSelect,
  disabled,
  className = "",
}) {
  const today = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewDate, setViewDate] = React.useState(() => {
    if (selected instanceof Date && !isNaN(selected)) {
      return new Date(selected.getFullYear(), selected.getMonth(), 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  React.useEffect(() => {
    if (selected instanceof Date && !isNaN(selected)) {
      setViewDate(new Date(selected.getFullYear(), selected.getMonth(), 1));
    }
  }, [selected]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const prevMonth = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Calculate calendar days (Sunday-first = 0)
  const calendarDays = React.useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Prev month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      date.setHours(0, 0, 0, 0);
      days.push({ date, dayNumber: daysInPrevMonth - i, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      date.setHours(0, 0, 0, 0);
      days.push({ date, dayNumber: i, isCurrentMonth: true });
    }

    // Fill to 35 or 42 grid cells
    const totalCells = days.length <= 35 ? 35 : 42;
    const remaining = totalCells - days.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      date.setHours(0, 0, 0, 0);
      days.push({ date, dayNumber: i, isCurrentMonth: false });
    }

    return days;
  }, [year, month]);

  const isSelected = (d) => {
    if (!selected || !(selected instanceof Date) || isNaN(selected)) return false;
    return (
      d.getFullYear() === selected.getFullYear() &&
      d.getMonth() === selected.getMonth() &&
      d.getDate() === selected.getDate()
    );
  };

  const isToday = (d) => {
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  };

  const isPastDisabled = (d) => {
    if (!disabled) return false;
    if (disabled.before) {
      const beforeDate = new Date(disabled.before);
      beforeDate.setHours(0, 0, 0, 0);
      return d < beforeDate;
    }
    return false;
  };

  return (
    <div className={cn("w-full max-w-[280px] p-2 select-none mx-auto", className)}>
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between pb-3 px-1">
        <button
          type="button"
          onClick={prevMonth}
          className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-all cursor-pointer border border-slate-200/80 active:scale-95 shadow-2xs"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="text-sm font-bold text-slate-900 tracking-tight select-none">
          {MONTH_NAMES[month]} {year}
        </div>

        <button
          type="button"
          onClick={nextMonth}
          className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-all cursor-pointer border border-slate-200/80 active:scale-95 shadow-2xs"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Weekday Row */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="text-[11px] font-semibold text-slate-400 py-1 uppercase tracking-wider">
            {wd}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {calendarDays.map((item, idx) => {
          const selectedState = isSelected(item.date);
          const todayState = isToday(item.date);
          const pastDisabled = isPastDisabled(item.date);
          const isCurrent = item.isCurrentMonth;
          const disabledState = pastDisabled || !isCurrent;

          return (
            <button
              key={idx}
              type="button"
              disabled={disabledState}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!disabledState && onSelect) {
                  onSelect(item.date);
                }
              }}
              className={cn(
                "h-8 w-8 mx-auto text-xs rounded-lg flex items-center justify-center relative transition-all duration-150 cursor-pointer font-medium",
                selectedState && "bg-slate-900 text-white font-bold shadow-md scale-100 hover:bg-slate-900",
                !selectedState && isCurrent && !pastDisabled && "text-slate-800 hover:bg-slate-100 hover:text-slate-900",
                !isCurrent && "text-slate-300 opacity-40 cursor-not-allowed pointer-events-none",
                pastDisabled && isCurrent && "text-slate-300 opacity-40 cursor-not-allowed pointer-events-none",
                todayState && !selectedState && "font-bold text-slate-900 bg-slate-100/80"
              )}
              aria-label={item.date.toDateString()}
            >
              {item.dayNumber}
              {todayState && !selectedState && (
                <span className="absolute bottom-1 w-1 h-1 bg-slate-900 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
