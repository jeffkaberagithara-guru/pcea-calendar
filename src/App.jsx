import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Activity,
  Info,
  Settings,
  Bell,
  ArrowUp
} from 'react-feather';
import QuarterOne from './components/QuarterOne';
import QuarterTwo from './components/QuarterTwo';
import QuarterThree from './components/QuarterThree';
import EventsKeyPanel from './components/EventsKeyPanel';
import { events } from './events';

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [notificationCount, setNotificationCount] = useState(3);
  const [isExporting, setIsExporting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredEvents = filterType === 'all'
    ? events
    : events.filter(e => e.category === filterType);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast("Calendar exported successfully as PDF!", "success");
    }, 2000);
  };

  const handleFilterUpdate = (type) => {
    setFilterType(type);
    setShowFilters(false);

    if (type !== 'all') {
      const virtualEvent = {
        id: `filter-summary-${type}`,
        title: type.charAt(0).toUpperCase() + type.slice(1) + (type === 'presentation' || type === 'practice' ? '' : ' Event'),
        description: type === 'presentation'
          ? "Special presentations by church groups and ministries during Sunday services."
          : type === 'practice'
            ? "Regular weekly rehearsals for the church choir and worship team preparation."
            : `Viewing all scheduled ${type} activities on the calendar.`,
        category: type,
        type: type,
        time: "Scheduled Times",
        month: "2026",
        day: "Recurring"
      };

      setSelectedEvent(virtualEvent);

      setTimeout(() => {
        const detailsPanel = document.getElementById('selected-event-details') || document.getElementById('event-details-placeholder');
        if (detailsPanel) {
          detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } else {
      setSelectedEvent(null);
    }
  };

  const clearFilters = () => {
    handleFilterUpdate('all');
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    if (event) {
      if (event.category) {
        setFilterType(event.category);
      }

      setTimeout(() => {
        const detailsPanel = document.getElementById('selected-event-details') || document.getElementById('event-details-placeholder');
        if (detailsPanel) {
          detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full max-w-[1800px] mx-auto flex flex-col min-h-screen">
        <header className="p-4 md:p-8 pb-3 shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-indigo-100 rounded-2xl shadow-sm shadow-indigo-50">
                <Calendar className="w-9 h-9 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">Annual Events Calendar</h1>
                <p className="text-sm sm:text-lg text-gray-500 font-medium">Community Activities & Ministry Schedule</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 relative pb-4 border-b border-gray-100">
            <button
              onClick={() => {
                document.getElementById('events-panel')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-indigo-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100 flex items-center gap-2 group relative overflow-hidden shrink-0"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
              <Info className="w-4 h-4" />
              <span>Event Details</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-5 py-2.5 border rounded-xl text-sm sm:text-base font-semibold transition-all active:scale-95 flex items-center gap-2 ${filterType !== 'all' ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"}`}
              >
                Category: {filterType === 'all' ? 'All' : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>

              {showFilters && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Select Category</div>
                  {['all', 'presentation', 'mission', 'practice', 'visit', 'worship', 'youth'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleFilterUpdate(type)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${filterType === type ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-50"}`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className={`px-3 sm:px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm sm:text-base rounded-lg transition-all active:scale-95 ${isExporting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 hover:border-gray-400"}`}
            >
              {isExporting ? (
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  ...
                </span>
              ) : "Export"}
            </button>
            {filterType !== 'all' && (
              <button
                onClick={clearFilters}
                className="px-2 py-2 text-indigo-600 text-xs sm:text-sm font-medium hover:text-indigo-800 underline-offset-4 hover:underline"
              >
                Reset
              </button>
            )}
          </div>
        </header>

        <div className="flex flex-col-reverse md:grid md:grid-cols-4 gap-6 flex-1 px-4 md:px-8 pb-8">
          <div id="calendar-view" className="md:col-span-3 space-y-6">
            <QuarterOne
              events={filteredEvents}
              onEventSelect={handleEventSelect}
              selectedEvent={selectedEvent}
              filterType={filterType}
            />
            <QuarterTwo
              events={filteredEvents}
              onEventSelect={handleEventSelect}
              selectedEvent={selectedEvent}
              filterType={filterType}
            />
            <QuarterThree
              events={filteredEvents}
              onEventSelect={handleEventSelect}
              selectedEvent={selectedEvent}
              filterType={filterType}
            />
          </div>

          <div className="md:col-span-1">
            <div id="events-panel" className="sticky top-6 self-start pl-1">
              <EventsKeyPanel
                events={events}
                selectedEvent={selectedEvent}
                onEventSelect={handleEventSelect}
                filterType={filterType}
                onFilterChange={handleFilterUpdate}
              />
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className={`fixed bottom-8 right-8 px-5 py-3 rounded-2xl shadow-2xl z-[100] animate-in fade-in slide-in-from-right-4 duration-300 flex items-center gap-3 backdrop-blur-md border border-white/20 ${toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'
          }`}>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            {toast.type === 'success' ? <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" /> : <Info className="w-4 h-4 text-white" />}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight">{toast.type === 'success' ? 'Success' : 'Notice'}</span>
            <span className="text-xs opacity-90">{toast.message}</span>
          </div>
        </div>
      )}

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 p-3 bg-white text-gray-900 rounded-full shadow-2xl border border-gray-100 hover:bg-gray-50 transition-all active:scale-90 z-[90] animate-in fade-in zoom-in duration-300"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </main>
  );
}

export default App;