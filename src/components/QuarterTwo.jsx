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
                                                    const genericId = `generic-${month.index}-${day}`;
                                                    const isSelected = selectedEvent?.id === dayEvent?.id || selectedEvent?.id === genericId;

                                                    // Determine styling based on day of week and events
                                                    let isPracticeDay = (dayIndex === 2 || dayIndex === 4 || dayIndex === 6);
                                                    let isPresentationDay = dayIndex === 0;

                                                    let shouldHighlight = false;
                                                    let highlightColor = "";

                                                    if (filterType === 'all') {
                                                        if (isPracticeDay) {
                                                            shouldHighlight = true;
                                                            highlightColor = "bg-green-600";
                                                        } else if (isPresentationDay) {
                                                            shouldHighlight = true;
                                                            highlightColor = "bg-red-600";
                                                        } else if (dayEvent) {
                                                            shouldHighlight = true;
                                                            const defaultColor = getEventTypeColor(dayEvent.category);
                                                            // Safety check: Only Sundays should be red
                                                            highlightColor = (defaultColor === 'bg-red-600' && dayIndex !== 0)
                                                                ? 'bg-blue-600'
                                                                : defaultColor;
                                                        }
                                                    } else if (filterType === 'presentation') {
                                                        // When filtering for presentation, only show Sundays as red
                                                        if (isPresentationDay) {
                                                            shouldHighlight = true;
                                                            highlightColor = "bg-red-600";
                                                        } else if (dayEvent && dayEvent.category === 'presentation' && dayIndex === 0) {
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

                                                    let cellBase = "w-6 h-6 flex items-center justify-center text-xs rounded-full cursor-pointer transition-all duration-200 relative";
                                                    let cellStyle = shouldHighlight
                                                        ? `${highlightColor} text-white font-medium shadow-sm hover:opacity-90 hover:scale-110`
                                                        : `${theme.hoverBg} text-gray-900`;

                                                    if (isSelected) {
                                                        cellStyle += " scale-110 z-10 ring-2 ring-offset-2 ring-indigo-500 shadow-lg";
                                                    } else if (shouldHighlight) {
                                                        cellStyle += " hover:scale-110";
                                                    }

                                                    return (
                                                        <div key={dayIndex} className="flex-1 flex justify-center">
                                                            <div
                                                                onClick={() => {
                                                                    if (dayEvent) {
                                                                        onEventSelect(dayEvent);
                                                                    } else if (isPracticeDay || isPresentationDay) {
                                                                        onEventSelect({
                                                                            id: `generic-${month.index}-${day}`,
                                                                            title: isPracticeDay ? "Choir Practice" : "Church Presentation",
                                                                            description: isPracticeDay ? "Regular midweek choir practice session" : "Sunday morning church presentation",
                                                                            category: isPracticeDay ? "practice" : "presentation",
                                                                            type: isPracticeDay ? "practice" : "presentation",
                                                                            time: isPracticeDay ? (dayIndex === 6 ? "4:00 PM - 6:00 PM" : "6:00 PM - 8:00 PM") : "10:00 AM",
                                                                            month: month.index + 1,
                                                                            day: day,
                                                                            year: year
                                                                        });
                                                                    }
                                                                }}
                                                                className={`${cellBase} ${cellStyle}`}
                                                            >
                                                                {day}
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
