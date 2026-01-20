import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Activity,
  Info,
  Settings,
  Bell
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

  // Filter events based on selection
  const filteredEvents = filterType === 'all'
    ? events
    : events.filter(e => e.category === filterType);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Calendar exported successfully as PDF!");
    }, 1500);
  };

  const clearFilters = () => {
    setFilterType('all');
    setShowFilters(false);
  };

  // Note: Quarters configuration is now handled within individual components
  // QuarterOne, QuarterTwo, QuarterThree

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
              <button
                onClick={() => {
                  setNotificationCount(0);
                  alert("You have no new notifications.");
                }}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all active:scale-95 relative"
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>
              <button
                onClick={() => alert("Activity Feed coming soon!")}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
              >
                <Activity className="w-5 h-5" />
              </button>
              <button
                onClick={() => alert("Settings panel opened.")}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
              >
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

          <div className="flex flex-wrap gap-2 mb-4 relative">
            <button
              onClick={() => {
                document.getElementById('events-panel')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all active:scale-95 shadow-sm"
            >
              <Info className="w-4 h-4 inline mr-2" />
              View All Events
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

        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <QuarterOne
              events={filteredEvents}
              onEventSelect={setSelectedEvent}
              selectedEvent={selectedEvent}
            />
            <QuarterTwo
              events={filteredEvents}
              onEventSelect={setSelectedEvent}
              selectedEvent={selectedEvent}
            />
            <QuarterThree
              events={filteredEvents}
              onEventSelect={setSelectedEvent}
              selectedEvent={selectedEvent}
            />
          </div>

          <div id="events-panel" className="scroll-mt-8">
            <EventsKeyPanel
              events={events}
              selectedEvent={selectedEvent}
              onEventSelect={setSelectedEvent}
              filterType={filterType}
              onFilterChange={setFilterType}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;