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
                                                    let cellStyle = theme.hoverBg;
                                                    let isPracticeDay = !dayEvent && (dayIndex === 2 || dayIndex === 4 || dayIndex === 6);
                                                    let isPresentationDay = !dayEvent && dayIndex === 0;



                                                    // Highlight background only on Sun (0), Tue (2), Thu (4), Sat (6)
                                                    const isHighlightDay = dayIndex === 0 || dayIndex === 2 || dayIndex === 4 || dayIndex === 6;

                                                    if (dayIndex === 2 || dayIndex === 4) {
                                                        cellStyle = `bg-green-600 text-white font-medium ring-2 ring-offset-1 ring-offset-white ${isSelected ? "ring-white scale-110" : "ring-transparent hover:ring-white/50"}`;
                                                    } else if (dayEvent && isHighlightDay) {
                                                        cellStyle = `${getEventTypeColor(dayEvent.category)} text-white font-medium ring-2 ring-offset-1 ring-offset-white ${isSelected ? "ring-white scale-110" : "ring-transparent hover:ring-white/50"}`;
                                                    } else if (isPracticeDay) {
                                                        cellStyle = "bg-green-600 text-white font-medium ring-2 ring-offset-1 ring-offset-white ring-transparent hover:ring-white/50";
                                                    } else if (isPresentationDay) {
                                                        cellStyle = "bg-red-600 text-white font-medium ring-2 ring-offset-1 ring-offset-white ring-transparent hover:ring-white/50";
                                                    } else {
                                                        // No highlight days (Mon, Wed, Fri) or days with events that shouldn't be highlighted
                                                        if (!dayEvent && dayIndex === 0) cellStyle = "text-red-600 font-semibold " + theme.hoverBg;
                                                        else cellStyle = "text-gray-900 " + theme.hoverBg;
                                                    }

                                                    return (
                                                        <div
                                                            key={dayIndex}
                                                            onClick={() => (dayEvent || isPracticeDay || isPresentationDay) && onEventSelect(isSelected ? null : (dayEvent || (isPracticeDay ? { title: "Choir Practice", description: "Regular midweek choir practice session", category: "practice", time: "6:00 PM" } : { title: "Church Presentation", description: "Sunday morning church presentation", category: "presentation", time: "10:00 AM" })))}
                                                            className={`flex-1 min-w-[32px] h-7 flex items-center justify-center text-xs rounded cursor-pointer transition-all relative ${cellStyle}`}
                                                        >
                                                            {day}
                                                            {/* Show dot if it's a practice/presentation day OR has an actual event */}
                                                            {(dayEvent || isPracticeDay || isPresentationDay) && (
                                                                <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full border
                                                                    ${(isPracticeDay || isPresentationDay || (dayEvent && isHighlightDay))
                                                                        ? "bg-white border-white/50"
                                                                        : `${getEventTypeColor(dayEvent.category)} border-white shadow-sm`}`}
                                                                ></div>
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
