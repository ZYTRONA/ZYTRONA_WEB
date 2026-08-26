"use client";

import React, { useId, useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock, ChevronDownIcon, Check, Sparkles } from "lucide-react";
import { formatTime12h, addHoursToTime, getDurationHours, TIME_OPTIONS } from "./calendar-utils";

/* ══════════════════════════════════════════════
   Interactive Analog Clock Dial (Live Sync)
   ══════════════════════════════════════════════ */
function ClockDial({ hours, minutes, size = 46 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 3;
  const toRad = (d) => (d * Math.PI) / 180;

  const h12 = hours % 12;
  const hAngle = (h12 + minutes / 60) * 30 - 90;
  const mAngle = minutes * 6 - 90;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 drop-shadow-xs">
      <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      {[0, 3, 6, 9].map((num) => {
        const angle = toRad((num === 0 ? 12 : num) * 30 - 90);
        return (
          <line
            key={num}
            x1={cx + (r - 5) * Math.cos(angle)}
            y1={cy + (r - 5) * Math.sin(angle)}
            x2={cx + (r - 2) * Math.cos(angle)}
            y2={cy + (r - 2) * Math.sin(angle)}
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        );
      })}
      {/* Hour Hand */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + r * 0.5 * Math.cos(toRad(hAngle))}
        y2={cy + r * 0.5 * Math.sin(toRad(hAngle))}
        stroke="#0f172a"
        strokeWidth="2.2"
        strokeLinecap="round"
        style={{ transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      />
      {/* Minute Hand */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + r * 0.72 * Math.cos(toRad(mAngle))}
        y2={cy + r * 0.72 * Math.sin(toRad(mAngle))}
        stroke="#0f172a"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      />
      <circle cx={cx} cy={cy} r="2.5" fill="#0f172a" />
    </svg>
  );
}

/* ══════════════════════════════════════════════
   Ultra-Clean Custom Time Dropdown
   Card: [ 🕒 10:30 AM ⌄ ]
   ══════════════════════════════════════════════ */
function TimeCard({ timeStr, onChange, label, isError }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>

      {/* Trigger Card: [ 🕒 10:30 AM ⌄ ] */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-3 h-10 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 transition-all shadow-xs cursor-pointer select-none",
          isOpen && "border-slate-900 ring-2 ring-slate-900/10 bg-slate-50/70",
          isError && "border-red-500 ring-2 ring-red-500/10"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-xs font-bold text-slate-900 tabular-nums truncate">
            {formatTime12h(timeStr)}
          </span>
        </div>
        <ChevronDownIcon
          className={cn(
            "w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0",
            isOpen && "rotate-180 text-slate-900"
          )}
        />
      </button>

      {/* Floating 1-Click Dropdown List */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 max-h-40 overflow-y-auto bg-white rounded-xl border border-slate-200 shadow-xl z-50 p-1 flex flex-col gap-0.5 animate-in fade-in-0 zoom-in-95 duration-150">
          {TIME_OPTIONS.map((time) => {
            const isSelected = time === timeStr;
            return (
              <button
                key={time}
                type="button"
                onClick={() => {
                  onChange(time);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-left",
                  isSelected
                    ? "bg-slate-900 text-white font-bold"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                )}
              >
                <span>{formatTime12h(time)}</span>
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   Preset Durations
   ══════════════════════════════════════════════ */
const PRESETS = [
  { label: "1h", value: 1 },
  { label: "2h", value: 2 },
  { label: "4h", value: 4 },
];

/* ══════════════════════════════════════════════
   Main Professional CalendarWithTimeRange
   ══════════════════════════════════════════════ */
export function CalendarWithTimeRange({
  value,
  onChange,
  disabledBefore,
  className = "",
}) {
  const id = useId();
  const [open, setOpen] = useState(false);

  const [internalDate, setInternalDate] = useState(() => new Date());
  const [internalStartTime, setInternalStartTime] = useState("10:30");
  const [internalEndTime, setInternalEndTime] = useState("12:30");

  const date = value?.date !== undefined ? value.date : internalDate;
  const startTime = value?.startTime !== undefined ? value.startTime : internalStartTime;
  const endTime = value?.endTime !== undefined ? value.endTime : internalEndTime;

  const fire = (d, s, e) => {
    if (onChange) onChange({ date: d, startTime: s, endTime: e });
  };

  const handleDateChange = (d) => {
    if (onChange) fire(d, startTime, endTime);
    else setInternalDate(d);
  };
  const handleStartTimeChange = (t) => {
    const currentDur = getDurationHours(startTime, endTime) || 2;
    const newEnd = addHoursToTime(t, currentDur);
    if (onChange) fire(date, t, newEnd);
    else {
      setInternalStartTime(t);
      setInternalEndTime(newEnd);
    }
  };
  const handleEndTimeChange = (t) => {
    if (onChange) fire(date, startTime, t);
    else setInternalEndTime(t);
  };

  const isInvalid = Boolean(startTime && endTime && startTime >= endTime);
  const currentDuration = getDurationHours(startTime, endTime);
  const isAllDayActive = startTime === "09:00" && endTime === "17:00";

  const startParts = (startTime || "10:30").split(":").map(Number);
  const startH24 = isNaN(startParts[0]) ? 10 : startParts[0];
  const startMins = isNaN(startParts[1]) ? 30 : startParts[1];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* ── Outer Consultation Form Trigger Field ── */}
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          className={cn(
            "group/pick w-full h-[48px] min-h-[48px] px-3.5 sm:px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300 text-left font-normal transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-between box-border",
            !date && "text-slate-400",
            open && "border-slate-900 ring-2 ring-slate-900/10",
            className
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden pr-2">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 text-slate-700 group-hover/pick:bg-slate-900 group-hover/pick:text-white transition-colors shrink-0">
              <CalendarIcon aria-hidden className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 min-w-0 overflow-hidden">
              <span className="text-slate-900 font-bold text-xs sm:text-sm truncate">
                {date ? format(date, "MMM d, yyyy") : "Pick a date and time"}
              </span>
              {date && (startTime || endTime) && (
                <div className="flex items-center gap-1 text-slate-500 min-w-0">
                  <span className="hidden sm:inline text-slate-300 select-none">•</span>
                  <Clock className="h-3 w-3 shrink-0 text-slate-400 hidden xs:inline" />
                  <span className="text-[11px] sm:text-xs font-semibold tabular-nums text-slate-600 truncate">
                    {startTime ? formatTime12h(startTime) : "—"}
                    {" – "}
                    {endTime ? formatTime12h(endTime) : "—"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <ChevronDownIcon
            className={cn(
              "h-4 w-4 text-slate-400 group-hover/pick:text-slate-600 shrink-0 transition-transform duration-300",
              open && "rotate-180 text-slate-900"
            )}
          />
        </button>
      </PopoverTrigger>

      {/* ── Professional Popover Dialog (Side-by-Side 2-Column / Mobile Stacked) ── */}
      <PopoverContent
        align="center"
        sideOffset={8}
        className="w-auto p-0 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-y-auto max-h-[85vh] z-[100] max-w-[calc(100vw-24px)] sm:max-w-none"
      >
        <div className="flex flex-col sm:flex-row">
          {/* Left Column: Interactive Month Calendar */}
          <div className="p-3 sm:pr-4 flex flex-col items-center sm:items-stretch">
            <div className="flex items-center justify-between w-full px-2 pb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Select Date
              </span>
              {date && (
                <span className="text-[11px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md tabular-nums">
                  {format(date, "EEE, MMM d")}
                </span>
              )}
            </div>
            <Calendar
              selected={date}
              onSelect={handleDateChange}
              disabled={disabledBefore ? { before: disabledBefore } : undefined}
            />
          </div>

          {/* Vertical Divider for Desktop / Horizontal for Mobile */}
          <div className="hidden sm:block w-px bg-slate-100 my-3" />
          <div className="sm:hidden h-px bg-slate-100 mx-3" />

          {/* Right Column: Time Window & Preset Controls */}
          <div className="p-3.5 sm:p-4 sm:w-[250px] flex flex-col justify-between bg-slate-50/40 gap-4">
            <div className="flex flex-col gap-3.5">
              {/* Header with Live Animated Dial */}
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Time Window
                  </span>
                  <span className="text-xs font-black text-slate-900 tracking-tight tabular-nums">
                    {formatTime12h(startTime)} – {formatTime12h(endTime)}
                  </span>
                </div>
                <ClockDial hours={startH24} minutes={startMins} size={42} />
              </div>

              {/* Start & End Time Dropdown Cards */}
              <div className="flex flex-col gap-2">
                <TimeCard
                  timeStr={startTime}
                  onChange={handleStartTimeChange}
                  label="Start Time"
                />
                <TimeCard
                  timeStr={endTime}
                  onChange={handleEndTimeChange}
                  label="End Time"
                  isError={isInvalid}
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Quick Presets
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRESETS.map((p) => {
                    const active = currentDuration === p.value && !isAllDayActive;
                    return (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => handleEndTimeChange(addHoursToTime(startTime, p.value))}
                        className={cn(
                          "h-8 px-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer active:scale-95 flex items-center justify-center gap-1",
                          active
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                        )}
                      >
                        {p.label}
                        {active && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => {
                      handleStartTimeChange("09:00");
                      handleEndTimeChange("17:00");
                    }}
                    className={cn(
                      "h-8 px-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer active:scale-95 flex items-center justify-center gap-1",
                      isAllDayActive
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                    )}
                  >
                    All Day
                    {isAllDayActive && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {isInvalid && (
              <p className="text-[11px] text-red-600 font-semibold text-center bg-red-50 py-1 px-2 rounded-md border border-red-200">
                End time must be after start
              </p>
            )}
          </div>
        </div>

        {/* ── Bottom Action Footer ── */}
        <div className="border-t border-slate-100 px-4 py-3 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-700 tabular-nums">
              {currentDuration ? `${currentDuration}h Discussion` : "Custom Window"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={isInvalid}
            className={cn(
              "px-5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5",
              isInvalid
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
            )}
          >
            <Sparkles className="w-3 h-3 text-cyan-300" />
            <span>Apply Schedule</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default CalendarWithTimeRange;
