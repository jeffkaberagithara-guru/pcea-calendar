import React from 'react';
import { ChevronLeft, ChevronRight, Sun } from 'react-feather';
import { getMonthData, getEventTypeColor, ALL_MONTHS, WEEKDAYS } from "../events";

function QuarterTwo({ events, onEventSelect, selectedEvent, filterType = 'all' }) {
    const year = 2026;
    const title = "May - August";
    const subTitle = "2026";

    const months = ALL_MONTHS.slice(4, 8);


    const theme = {
        headerGradient: "bg-gradient-to-r from-emerald-600 to-teal-600",
        monthBgGradient: "bg-gradient-to-br from-emerald-50 to-white",
        monthBorder: "border-emerald-100",
        monthIconColor: "text-emerald-500",
        monthTextColor: "text-emerald-600",
        hoverBg: "hover:bg-emerald-50",
        monthEventDotBorder: "border-emerald-300"
    };

    return (
        <div id="quarter-two" className="quarter-container rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm mb-6 scroll-mt-6">
            <div className={`px-4 py-3 flex items-center justify-between ${theme.headerGradient}`}>
                <div className="flex items-center gap-3">
                    <Sun className="w-5 h-5 text-white" />
                    <h2 className="text-lg font-semibold text-white">{title}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            const prevQuarter = document.getElementById('quarter-one');
                            prevQuarter?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="p-1 text-white/80 hover:text-white transition-all active:scale-90 bg-white/10 hover:bg-white/20 rounded"
                        title="View Quarter 1"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-white/90 font-medium px-2">{subTitle}</span>
                    <button
                        onClick={() => {
                            const nextQuarter = document.getElementById('quarter-three');
                            nextQuarter?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="p-1 text-white/80 hover:text-white transition-all active:scale-90 bg-white/10 hover:bg-white/20 rounded"
                        title="View Quarter 3"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="p-4 overflow-x-auto">
                <div className="space-y-3">

                    {months.map((month) => {
                        const monthData = getMonthData(year, month.index);
                        const monthEvents = events.filter((e) => e.month === month.index + 1);

                        // Create weeks array
                        const weeks = [];
                        let currentWeek = Array(monthData.startDay).fill(null);

                        for (let day = 1; day <= monthData.daysInMonth; day++) {
                            currentWeek.push(day);
                            if (currentWeek.length === 7) {
                                weeks.push(currentWeek);
                                currentWeek = [];
                            }
                        }
                        if (currentWeek.length > 0) {
                            while (currentWeek.length < 7) currentWeek.push(null);
                            weeks.push(currentWeek);
                        }

                        return (
                            <div key={month.abbr} className={`rounded-xl p-3 border ${theme.monthBgGradient} ${theme.monthBorder} flex flex-col sm:flex-row items-start gap-3 sm:gap-4`}>
                                <div className="w-full sm:w-12 shrink-0 flex sm:flex-col items-center justify-between sm:justify-center sm:border-r border-gray-100/50 sm:pr-2 sm:mr-1">
                                    <span className={`text-sm sm:text-base font-black uppercase tracking-tighter ${theme.monthTextColor}`}>{month.name}</span>
                                    <Sun className={`w-4 h-4 sm:mt-1 opacity-50 ${theme.monthIconColor}`} />
                                </div>

                                <div className="flex-1 w-full">
                                    {/* Weekdays Header inside each month */}
                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {WEEKDAYS.map((day, index) => (
                                            <div key={day} className={`text-center text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${index === 0 ? "text-red-500" :
                                                (index === 2 || index === 4 || index === 6) ? "text-green-600" : "text-gray-400"
                                                }`}>
                                                {day.substring(0, 3)}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                                        {Array.from({ length: monthData.startDay }).map((_, i) => (
                                            <div key={`empty-${i}`} className="aspect-square w-full max-w-[28px] sm:max-w-[32px] mx-auto" />
                                        ))}

                                        {Array.from({ length: monthData.daysInMonth }).map((_, i) => {
                                            const day = i + 1;
                                            const date = new Date(year, month.index, day);
                                            const dayOfWeek = date.getDay();

                                            const dayEvent = monthEvents.find((e) => e.day === day);
                                            const genericId = `generic-${month.index}-${day}`;
                                            const isSelected = selectedEvent?.id === dayEvent?.id || selectedEvent?.id === genericId;

                                            let isPracticeDay = (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6);
                                            let isPresentationDay = dayOfWeek === 0;

                                            let shouldHighlight = false;
                                            let highlightColor = "";

                                            if (filterType === 'all') {
                                                if (isPracticeDay) {
                                                    shouldHighlight = true;
                                                    highlightColor = "bg-green-600";
                                                } else if (isPresentationDay) {
                                                    shouldHighlight = true;
                                                    highlightColor = "bg-red-600";
                                                }
                                            } else if (filterType === 'presentation') {
                                                if (isPresentationDay) {
                                                    shouldHighlight = true;
                                                    highlightColor = "bg-red-600";
                                                }
                                            } else if (filterType === 'practice') {
                                                if (isPracticeDay || (dayEvent && dayEvent.category === 'practice')) {
                                                    shouldHighlight = true;
                                                    highlightColor = "bg-green-600";
                                                }
                                            } else {
                                                if (dayEvent && dayEvent.category === filterType) {
                                                    shouldHighlight = true;
                                                    highlightColor = getEventTypeColor(dayEvent.category);
                                                }
                                            }

                                            let cellBase = "aspect-square w-full max-w-[28px] sm:max-w-[32px] mx-auto flex items-center justify-center text-[10px] sm:text-xs rounded-full cursor-pointer transition-all duration-300 relative group";
                                            let cellStyle = shouldHighlight
                                                ? `${highlightColor} text-white font-bold shadow-sm`
                                                : `hover:bg-indigo-50 text-gray-700 font-medium`;

                                            if (isSelected) {
                                                cellStyle += " scale-105 z-10 shadow-md";
                                            }

                                            return (
                                                <div
                                                    key={day}
                                                    onClick={() => {
                                                        if (dayEvent) {
                                                            onEventSelect(dayEvent);
                                                        } else if (isPracticeDay || isPresentationDay) {
                                                            onEventSelect({
                                                                id: genericId,
                                                                title: isPracticeDay ? "Choir Practice" : "Church Presentation",
                                                                description: isPracticeDay ? "Regular midweek choir practice session" : "Sunday morning church presentation",
                                                                category: isPracticeDay ? "practice" : "presentation",
                                                                type: isPracticeDay ? "practice" : "presentation",
                                                                time: isPracticeDay ? (dayOfWeek === 6 ? "4:00 PM - 6:00 PM" : "6:00 PM - 8:00 PM") : "10:00 AM",
                                                                month: month.index + 1,
                                                                day: day,
                                                                year: year
                                                            });
                                                        }
                                                    }}
                                                    className={`${cellBase} ${cellStyle}`}
                                                >
                                                    {day}
                                                    {dayEvent && !shouldHighlight && !isSelected && (
                                                        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full"></div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default QuarterTwo;
