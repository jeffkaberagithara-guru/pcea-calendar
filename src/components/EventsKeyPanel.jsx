import React from 'react';
import { getEventTypeColor, getEventTypeLabel } from '../events';
import {
  Calendar,
  Info,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  MapPin,
  Star,
  TrendingUp,
  BarChart,
  Filter,
  Download,
  Eye,
  EyeOff,
  X,
  ChevronRight
} from 'react-feather';

function EventsKeyPanel({ events, selectedEvent, onEventSelect, filterType, onFilterChange }) {
  const eventTypes = [
    { type: 'presentation', color: 'bg-red-600', icon: <AlertCircle className="w-3 h-3" />, label: 'Church Presentation', description: 'Special presentations by church groups and ministries during services.' },
    { type: 'mission', color: 'bg-indigo-500', icon: <MapPin className="w-3 h-3" />, label: 'Mission', description: 'Outreach programs, field work, and mission trips to spread the gospel.' },
    { type: 'practice', color: 'bg-emerald-500', icon: <CheckCircle className="w-3 h-3" />, label: 'Choir Practice', description: 'Regular weekly rehearsals for the church choir and worship team preparation.' },
    { type: 'visit', color: 'bg-amber-500', icon: <Users className="w-3 h-3" />, label: 'Visit', description: 'Pastoral visits, home fellowships, and community outreach events.' },
    { type: 'worship', color: 'bg-blue-600', icon: <Star className="w-3 h-3" />, label: 'Worship', description: 'Regular Sunday services, prayer meetings, and special worship gatherings.' },
    { type: 'youth', color: 'bg-violet-600', icon: <TrendingUp className="w-3 h-3" />, label: 'Youth', description: 'Activities, retreats, and fellowship events specifically for the youth ministry.' },
  ];

  // Count events by type
  const eventCounts = {};
  events.forEach(event => {
    eventCounts[event.category] = (eventCounts[event.category] || 0) + 1;
  });

  // Get events for this week, respecting active filters
  const thisWeekEvents = events.filter(event => {
    const eventDate = new Date(2026, event.month - 1, event.day);
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    // Filter by date AND category if filtering is active
    const isThisWeek = eventDate >= today && eventDate <= nextWeek;
    const matchesFilter = filterType === 'all' || event.category === filterType;

    return isThisWeek && matchesFilter;
  }).slice(0, 5);

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Selected Event Details */}
      {selectedEvent ? (
        <div id="selected-event-details" className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm scroll-mt-24 ring-2 ring-indigo-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-500" />
              Event Details
            </h3>
            <button
              onClick={() => onFilterChange('all')}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
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
              <h4 className="text-lg sm:text-xl font-black text-gray-900 mb-2 leading-tight">{selectedEvent.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{selectedEvent.description}</p>
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
                <span className="text-gray-700 font-medium">
                  {selectedEvent.time || "All Day"}
                </span>
              </div>
            </div>


          </div>
        </div>
      ) : (
        <div id="event-details-placeholder" className="rounded-xl border border-gray-200 border-dashed bg-gray-50 p-6 flex flex-col items-center justify-center text-center opacity-70">
          <div className="p-3 bg-white rounded-full mb-3 shadow-sm">
            <Info className="w-6 h-6 text-gray-300" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-1">No Selection</h3>
          <p className="text-gray-500 text-xs max-w-[180px]">
            Tap a date to see what's happening
          </p>
        </div>
      )}

      {/* Event Key */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-500" />
            Event Legend
          </h3>
          <button
            onClick={() => {
              onFilterChange(filterType === 'all' ? 'none' : 'all');
              onEventSelect(null);
            }}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors active:scale-90"
            title={filterType === 'all' ? "Hide all" : "Show all"}
          >
            {filterType === 'all' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
          {eventTypes.map((eventType) => (
            <button
              key={eventType.type}
              onClick={() => {
                const newFilter = filterType === eventType.type ? 'all' : eventType.type;
                onFilterChange(newFilter);
                if (newFilter !== 'all') {
                  onEventSelect({
                    id: `legend-${eventType.type}`,
                    title: eventType.label,
                    description: eventType.description,
                    category: eventType.type,
                    type: eventType.type,
                    time: "Various Times",
                    month: "2026",
                    day: "Year-round"
                  });
                } else {
                  onEventSelect(null);
                }
              }}
              className={`w-full flex items-center justify-between group p-2 rounded-lg transition-all active:scale-[0.98] border ${filterType === eventType.type ? "bg-indigo-50 border-indigo-200 shadow-sm" : "bg-white border-transparent hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${eventType.color} text-white shadow-sm shrink-0`}>
                  {eventType.icon}
                </div>
                <span className={`text-xs sm:text-sm font-semibold ${filterType === eventType.type ? "text-indigo-700" : "text-gray-700"}`}>{eventType.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filterType === eventType.type ? "bg-indigo-100 text-indigo-700 font-bold" : "bg-gray-100 text-gray-400"}`}>
                  {eventCounts[eventType.type] || 0}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${filterType === eventType.type ? "text-indigo-400 translate-x-1" : "text-gray-300 group-hover:text-gray-400"}`} />
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={(e) => {
              const btn = e.currentTarget;
              const originalText = btn.innerHTML;
              btn.innerHTML = '<div class="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div> PDF Exporting...';
              btn.disabled = true;
              setTimeout(() => {
                btn.innerHTML = '✓ Legend Exported';
                btn.classList.add('bg-emerald-50', 'text-emerald-700');
                setTimeout(() => {
                  btn.innerHTML = originalText;
                  btn.classList.remove('bg-emerald-50', 'text-emerald-700');
                  btn.disabled = false;
                }, 2000);
              }, 1500);
            }}
            className="w-full py-2 bg-gray-50 text-gray-700 text-sm rounded-lg hover:bg-gray-100 transition-all active:scale-95 flex items-center justify-center gap-2 font-bold"
          >
            <Download className="w-4 h-4" />
            Export Legend
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div id="upcoming-events" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm scroll-mt-24">
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
          <button
            onClick={() => {
              const topEl = document.getElementById('quarter-one');
              if (topEl) {
                topEl.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="w-full py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all active:scale-95 font-medium"
          >
            View All Upcoming Events
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventsKeyPanel;
