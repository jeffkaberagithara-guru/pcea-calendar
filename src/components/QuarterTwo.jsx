import React from 'react';
import { ChevronLeft, ChevronRight, Sun } from 'react-feather';
import { getMonthData, getEventTypeColor } from "../events";

function QuarterTwo({ events, onEventSelect, selectedEvent }) {
    const year = 2026;
    const title = "Q2: May - August";
    const subTitle = "Summer Quarter";

    const months = [
        { name: "May", abbr: "MAY", index: 4 },
        { name: "June", abbr: "JUN", index: 5 },
        { name: "July", abbr: "JUL", index: 6 },
        { name: "August", abbr: "AUG", index: 7 },
    ];

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
                    <button className="p-1 text-white/80 hover:text-white">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-white/90">{subTitle}</span>
                    <button className="p-1 text-white/80 hover:text-white">
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
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
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

                                                    // Determine text color based on day of week (if no event)
                                                    let dayTextColor = "text-gray-900";
                                                    if (!dayEvent) {
                                                        if (dayIndex === 0) dayTextColor = "text-red-600 font-semibold";
                                                        else if (dayIndex === 2 || dayIndex === 4 || dayIndex === 6) dayTextColor = "text-green-600 font-semibold";
                                                    }

                                                    return (
                                                        <div
                                                            key={dayIndex}
                                                            onClick={() => dayEvent && onEventSelect(isSelected ? null : dayEvent)}
                                                            className={`flex-1 min-w-[32px] h-7 flex items-center justify-center text-xs rounded cursor-pointer transition-all relative
                                ${dayEvent
                                                                    ? `${getEventTypeColor(dayEvent.category)} text-white font-medium ring-2 ring-offset-1 ring-offset-white ${isSelected ? "ring-white scale-110" : "ring-transparent hover:ring-white/50"}`
                                                                    : `${dayTextColor} ${theme.hoverBg}`
                                                                }`}
                                                        >
                                                            {day}
                                                            {dayEvent && (
                                                                <div className={`absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border ${theme.monthEventDotBorder}`}></div>
                                                            )}
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
