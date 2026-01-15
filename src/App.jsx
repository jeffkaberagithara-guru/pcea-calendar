import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Activity,
  Info,
  Settings,
  Bell,
  Sun,
  Award,
  Target,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  MapPin,
  CheckCircle,
  TrendingUp,
  Star,
  Filter,
  Eye,
  Download,
  X,
  Clock,
  Share2,
  BarChart
} from 'react-feather';
import { events, getMonthData, getEventTypeColor, getEventTypeLabel } from './events';
// Styles are imported in main.jsx via App.css

// --- Components (Merged for simplicity) ---

function QuarterView({
  title,
  subTitle,
  months,
  events,
  onEventSelect,
  selectedEvent,
  theme,
  Icon,
  MonthIcon
}) {
  const year = 2026;

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className={`px-4 py-3 flex items-center justify-between ${theme.headerGradient}`}>
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-white" />
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
                    <MonthIcon className={`w-4 h-4 mb-1 ${theme.monthIconColor}`} />
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

function EventsKeyPanel({ events, selectedEvent, onEventSelect }) {
  const eventTypes = [
    { type: 'presentation', color: 'bg-red-500', icon: <AlertCircle className="w-3 h-3" />, label: 'Presentation' },
    { type: 'mission', color: 'bg-purple-500', icon: <MapPin className="w-3 h-3" />, label: 'Mission' },
    { type: 'practice', color: 'bg-green-500', icon: <CheckCircle className="w-3 h-3" />, label: 'Practice' },
    { type: 'visit', color: 'bg-orange-500', icon: <Users className="w-3 h-3" />, label: 'Visit' },
    { type: 'worship', color: 'bg-blue-500', icon: <Star className="w-3 h-3" />, label: 'Worship' },
    { type: 'youth', color: 'bg-teal-500', icon: <TrendingUp className="w-3 h-3" />, label: 'Youth' },
  ];

  // Count events by type
  const eventCounts = {};
  events.forEach(event => {
    eventCounts[event.category] = (eventCounts[event.category] || 0) + 1;
  });

  // Get events for this week
  const thisWeekEvents = events.filter(event => {
    const eventDate = new Date(2026, event.month - 1, event.day);
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    return eventDate >= today && eventDate <= nextWeek;
  }).slice(0, 5);

  return (
    <div className="w-full xl:w-80 space-y-6">
      {/* Event Key */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Event Legend
          </h3>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <Eye className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {eventTypes.map((eventType) => (
            <div key={eventType.type} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center ${eventType.color} text-white`}>
                  {eventType.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{eventType.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {eventCounts[eventType.type] || 0}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="w-full py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Export Legend
          </button>
        </div>
      </div>

      {/* Selected Event Details */}
      {selectedEvent ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Event Details
            </h3>
            <button
              onClick={() => onEventSelect(null)}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${getEventTypeColor(selectedEvent.category)}`}></div>
                <span className="text-sm font-medium text-gray-700">{getEventTypeLabel(selectedEvent.type)}</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h4>
              <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">
                  {selectedEvent.month}/{selectedEvent.day}/2026
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">
                  {selectedEvent.time || "All Day"}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Event
              </button>
              <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Share2 className="w-4 h-4 inline mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <BarChart className="w-4 h-4" />
            Calendar Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-700">Total Events</span>
              <span className="font-bold text-blue-600">{events.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
              <span className="text-sm text-gray-700">Q1 Events</span>
              <span className="font-bold text-emerald-600">{events.filter(e => e.month >= 1 && e.month <= 4).length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
              <span className="text-sm text-gray-700">Q2 Events</span>
              <span className="font-bold text-amber-600">{events.filter(e => e.month >= 5 && e.month <= 8).length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm text-gray-700">Q3 Events</span>
              <span className="font-bold text-orange-600">{events.filter(e => e.month >= 9 && e.month <= 12).length}</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Click on any event in the calendar to view details
            </p>
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4" />
          Upcoming This Week
        </h3>
        <div className="space-y-3">
          {thisWeekEvents.length > 0 ? (
            thisWeekEvents.map(event => (
              <div
                key={event.id}
                onClick={() => onEventSelect(event)}
                className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-8 rounded-full ${getEventTypeColor(event.category)} mt-1`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600">{event.title}</h4>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {event.month}/{event.day}/2026 • {getEventTypeLabel(event.type)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No upcoming events this week</p>
            </div>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="w-full py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            View All Upcoming Events
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main App Component ---

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const quarters = [
    {
      id: 'q1',
      title: "Q1: January - April",
      subTitle: "2026",
      headerIcon: Calendar,
      monthIcon: Target,
      months: [
        { name: "January", abbr: "JAN", index: 0 },
        { name: "February", abbr: "FEB", index: 1 },
        { name: "March", abbr: "MAR", index: 2 },
        { name: "April", abbr: "APR", index: 3 },
      ],
      theme: {
        headerGradient: "bg-gradient-to-r from-indigo-600 to-purple-600",
        monthBgGradient: "bg-gradient-to-br from-indigo-50 to-white",
        monthBorder: "border-indigo-100",
        monthIconColor: "text-indigo-500",
        monthTextColor: "text-indigo-600",
        hoverBg: "hover:bg-indigo-50",
        monthEventDotBorder: "border-indigo-300"
      }
    },
    {
      id: 'q2',
      title: "Q2: May - August",
      subTitle: "Summer Quarter",
      headerIcon: Sun,
      monthIcon: Sun,
      months: [
        { name: "May", abbr: "MAY", index: 4 },
        { name: "June", abbr: "JUN", index: 5 },
        { name: "July", abbr: "JUL", index: 6 },
        { name: "August", abbr: "AUG", index: 7 },
      ],
      theme: {
        headerGradient: "bg-gradient-to-r from-emerald-600 to-teal-600",
        monthBgGradient: "bg-gradient-to-br from-emerald-50 to-white",
        monthBorder: "border-emerald-100",
        monthIconColor: "text-emerald-500",
        monthTextColor: "text-emerald-600",
        hoverBg: "hover:bg-emerald-50",
        monthEventDotBorder: "border-emerald-300"
      }
    },
    {
      id: 'q3',
      title: "Q3: September - December",
      subTitle: "Holiday Quarter",
      headerIcon: Award,
      monthIcon: Award,
      months: [
        { name: "September", abbr: "SEP", index: 8 },
        { name: "October", abbr: "OCT", index: 9 },
        { name: "November", abbr: "NOV", index: 10 },
        { name: "December", abbr: "DEC", index: 11 },
      ],
      theme: {
        headerGradient: "bg-gradient-to-r from-amber-600 to-orange-600",
        monthBgGradient: "bg-gradient-to-br from-amber-50 to-white",
        monthBorder: "border-amber-100",
        monthIconColor: "text-amber-500",
        monthTextColor: "text-amber-600",
        hoverBg: "hover:bg-amber-50",
        monthEventDotBorder: "border-amber-300"
      }
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-[1800px]">
        {/* Header with Icons */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <Calendar className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Annual Events Calendar</h1>
                <p className="text-gray-600">Community Activities & Ministry Schedule</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Activity className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Info className="w-4 h-4 inline mr-2" />
              View All Events
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Filter by Type
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Export Calendar
            </button>
          </div>
        </header>

        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex-1 space-y-6">
            {quarters.map((q) => (
              <QuarterView
                key={q.id}
                title={q.title}
                subTitle={q.subTitle}
                Icon={q.headerIcon}
                MonthIcon={q.monthIcon}
                months={q.months}
                theme={q.theme}
                events={events}
                onEventSelect={setSelectedEvent}
                selectedEvent={selectedEvent}
              />
            ))}
          </div>

          <EventsKeyPanel
            events={events}
            selectedEvent={selectedEvent}
            onEventSelect={setSelectedEvent}
          />
        </div>
      </div>
    </main>
  );
}

export default App;