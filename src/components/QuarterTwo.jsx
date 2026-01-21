import React from 'react';
import { ChevronLeft, ChevronRight, Sun } from 'react-feather';
import { getMonthData, getEventTypeColor, ALL_MONTHS, WEEKDAYS } from "../events";

function QuarterTwo({ events, onEventSelect, selectedEvent }) {
    const year = 2026;
    const title = "Q2: May - August";
    const subTitle = "Summer Quarter";

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
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm mb-6">
            <div className={`px-4 py-3 flex items-center justify-between ${theme.headerGradient}`}>
                <div className="flex items-center gap-3">
                    <Sun className="w-5 h-5 text-white" />
                    <h2 className="text-lg font-semibold text-white">{title}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => alert("Previous month period")}
                        className="p-1 text-white/80 hover:text-white transition-all active:scale-90 bg-white/10 hover:bg-white/20 rounded"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-white/90 font-medium px-2">{subTitle}</span>
                    <button
                        onClick={() => alert("Next month period")}
                        className="p-1 text-white/80 hover:text-white transition-all active:scale-90 bg-white/10 hover:bg-white/20 rounded"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="p-4 overflow-x-auto">
                <div className="space-y-3">
                    {/* Week Header */}
                    <div className="flex items-center gap-2">
                        <div className="w-12 flex-shrink-0" />
                        <div className="flex gap-1 flex-1">
                            {WEEKDAYS.map((day, index) => (
                                <div key={day} className={`flex-1 min-w-[32px] text-center text-xs font-medium ${index === 0 ? "text-red-500" :
                                    (index === 2 || index === 4 || index === 6) ? "text-green-600" : "text-gray-500"
                                    }`}>
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>

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
                            <div key={month.abbr} className={`rounded-lg p-3 border ${theme.monthBgGradient} ${theme.monthBorder}`}>
                                <div className="flex items-start gap-2">
                                    <div className="w-12 flex-shrink-0 flex flex-col items-center">
                                        <Sun className={`w-4 h-4 mb-1 ${theme.monthIconColor}`} />
                                        <span className={`text-sm font-bold ${theme.monthTextColor}`}>{month.abbr}</span>
                                    </div>

                                    <div className="flex-1 space-y-1">
                                        {weeks.map((week, weekIndex) => (
                                            <div key={weekIndex} className="flex gap-1">
                                                {week.map((day, dayIndex) => {
                                                    if (day === null) {
                                                        return <div key={dayIndex} className="flex-1 min-w-[32px] h-7" />;
                                                    }

                                                    const dayEvent = monthEvents.find((e) => e.day === day);
                                                    const isSelected = selectedEvent?.id === dayEvent?.id;

                                                    // Determine styling based on day of week and events
                                                    let isPracticeDay = !dayEvent && (dayIndex === 2 || dayIndex === 4 || dayIndex === 6);
                                                    let isPresentationDay = !dayEvent && dayIndex === 0;
                                                    const isHighlightDay = dayIndex === 0 || dayIndex === 2 || dayIndex === 4 || dayIndex === 6;

                                                    let cellBase = "w-6 h-6 flex items-center justify-center text-xs rounded-full cursor-pointer transition-all duration-200 relative";
                                                    let cellStyle = theme.hoverBg + " text-gray-900";

                                                    if (dayIndex === 2 || dayIndex === 4 || dayIndex === 6 || isPracticeDay) {
                                                        cellStyle = `bg-green-600 text-white font-medium shadow-sm hover:bg-green-700 hover:scale-110`;
                                                    } else if (isPresentationDay || (dayIndex === 0 && !dayEvent)) {
                                                        cellStyle = `bg-red-600 text-white font-medium shadow-sm hover:bg-red-700 hover:scale-110`;
                                                    } else if (dayEvent && isHighlightDay) {
                                                        cellStyle = `${getEventTypeColor(dayEvent.category)} text-white font-medium shadow-sm hover:opacity-90 hover:scale-110`;
                                                    }

                                                    if (isSelected) {
                                                        cellStyle += " ring-2 ring-blue-500 scale-110 z-10";
                                                    }

                                                    return (
                                                        <div key={dayIndex} className="flex-1 flex justify-center">
                                                            <div
                                                                onClick={() => (dayEvent || isPracticeDay || isPresentationDay) && onEventSelect(isSelected ? null : (dayEvent || (isPracticeDay ? { title: "Choir Practice", description: "Regular midweek choir practice session", category: "practice", time: "6:00 PM" } : { title: "Church Presentation", description: "Sunday morning church presentation", category: "presentation", time: "10:00 AM" })))}
                                                                className={`${cellBase} ${cellStyle}`}
                                                            >
                                                                {day}
                                                                {(dayEvent || isPracticeDay || isPresentationDay) && (
                                                                    <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-white
                                                                    ${(isPracticeDay || isPresentationDay || (dayEvent && isHighlightDay))
                                                                            ? "bg-white"
                                                                            : `${getEventTypeColor(dayEvent.category)}`}`}
                                                                    ></div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
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
