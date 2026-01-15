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
            <QuarterOne
              events={events}
              onEventSelect={setSelectedEvent}
              selectedEvent={selectedEvent}
            />
            <QuarterTwo
              events={events}
              onEventSelect={setSelectedEvent}
              selectedEvent={selectedEvent}
            />
            <QuarterThree
              events={events}
              onEventSelect={setSelectedEvent}
              selectedEvent={selectedEvent}
            />
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