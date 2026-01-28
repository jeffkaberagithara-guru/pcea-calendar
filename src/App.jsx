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

  // Filter events based on selection
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

  const clearFilters = () => {
    setFilterType('all');
    setShowFilters(false);
  };

  // Scroll to events panel when an event is selected
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    if (event) {
      setFilterType(event.category);
      setTimeout(() => {
        const detailsPanel = document.getElementById('selected-event-details');
        const mainPanel = document.getElementById('events-panel');
        (detailsPanel || mainPanel)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

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


          </div>

          <div className="flex flex-wrap gap-2 mb-4 relative">
            <button
              onClick={() => {
                document.getElementById('events-panel')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100 flex items-center gap-2 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
              <Info className="w-4 h-4" />
              <span>View All Events</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 border rounded-lg transition-all active:scale-95 flex items-center gap-2 ${filterType !== 'all' ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-medium" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"}`}
              >
                Filter by: {filterType === 'all' ? 'Type' : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>

              {showFilters && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Select Category</div>
                  {['all', 'presentation', 'mission', 'practice', 'visit', 'worship', 'youth'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilterType(type);
                        setShowFilters(false);
                      }}
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
              className={`px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg transition-all active:scale-95 ${isExporting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 hover:border-gray-400"}`}
            >
              {isExporting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  Exporting...
                </span>
              ) : "Export Calendar"}
            </button>
            {filterType !== 'all' && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-indigo-600 text-sm font-medium hover:text-indigo-800 underline-offset-4 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <QuarterOne
              events={filteredEvents}
              onEventSelect={handleEventSelect}
              selectedEvent={selectedEvent}
            />
            <QuarterTwo
              events={filteredEvents}
              onEventSelect={handleEventSelect}
              selectedEvent={selectedEvent}
            />
            <QuarterThree
              events={filteredEvents}
              onEventSelect={handleEventSelect}
              selectedEvent={selectedEvent}
            />
          </div>

          <div id="events-panel" className="scroll-mt-8 lg:sticky lg:top-8 lg:h-fit">
            <EventsKeyPanel
              events={events}
              selectedEvent={selectedEvent}
              onEventSelect={handleEventSelect}
              filterType={filterType}
              onFilterChange={setFilterType}
            />
          </div>
        </div>
      </div>
      {/* Toast Notification */}
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

      {/* Back to Top Button */}
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