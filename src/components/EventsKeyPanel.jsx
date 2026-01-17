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
  Share2,
  Eye,
  EyeOff,
  X,
  ChevronRight
} from 'react-feather';

function EventsKeyPanel({ events, selectedEvent, onEventSelect }) {
  const eventTypes = [
    { type: 'presentation', color: 'bg-red-500', icon: <AlertCircle className="w-3 h-3" />, label: 'Church Presentation' },
    { type: 'mission', color: 'bg-cyan-500', icon: <MapPin className="w-3 h-3" />, label: 'Mission' },
    { type: 'practice', color: 'bg-green-500', icon: <CheckCircle className="w-3 h-3" />, label: 'Choir Practice' },
    { type: 'visit', color: 'bg-sky-500', icon: <Users className="w-3 h-3" />, label: 'Visit' },
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
            <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
              <span className="text-sm text-gray-700">Q2 Events</span>
              <span className="font-bold text-rose-600">{events.filter(e => e.month >= 5 && e.month <= 8).length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
              <span className="text-sm text-gray-700">Q3 Events</span>
              <span className="font-bold text-pink-600">{events.filter(e => e.month >= 9 && e.month <= 12).length}</span>
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

export default EventsKeyPanel;
