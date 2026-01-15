import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, Target } from 'react-feather';
import { getMonthData, getEventTypeColor } from "../events";

function QuarterOne({ events, onEventSelect, selectedEvent }) {
    const year = 2026;
    const title = "Q1: January - April";
    const subTitle = "2026";

    const months = [
        { name: "January", abbr: "JAN", index: 0 },
        { name: "February", abbr: "FEB", index: 1 },
        { name: "March", abbr: "MAR", index: 2 },
        { name: "April", abbr: "APR", index: 3 },
    ];

    const theme = {
        headerGradient: "bg-gradient-to-r from-indigo-600 to-purple-600",
        monthBgGradient: "bg-gradient-to-br from-indigo-50 to-white",
        monthBorder: "border-indigo-100",
        monthIconColor: "text-indigo-500",
        monthTextColor: "text-indigo-600",
        hoverBg: "hover:bg-indigo-50",
        monthEventDotBorder: "border-indigo-300"
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm mb-6">
            <div className={`px-4 py-3 flex items-center justify-between ${theme.headerGradient}`}>
                <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white" />
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
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                <div key={day} className="flex-1 min-w-[32px] text-center text-xs font-medium text-gray-500">
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
                                        <Target className={`w-4 h-4 mb-1 ${theme.monthIconColor}`} />
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

                                                    return (
                                                        <div
                                                            key={dayIndex}
                                                            onClick={() => dayEvent && onEventSelect(isSelected ? null : dayEvent)}
                                                            className={`flex-1 min-w-[32px] h-7 flex items-center justify-center text-xs rounded cursor-pointer transition-all relative
                                ${dayEvent
                                                                    ? `${getEventTypeColor(dayEvent.category)} text-white font-medium ring-2 ring-offset-1 ring-offset-white ${isSelected ? "ring-white scale-110" : "ring-transparent hover:ring-white/50"}`
                                                                    : `text-gray-900 ${theme.hoverBg}`
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

export default QuarterOne;
