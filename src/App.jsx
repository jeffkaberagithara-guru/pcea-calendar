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
  Target
} from 'react-feather';
import QuarterView from './components/QuarterView';
import EventsKeyPanel from './components/EventsKeyPanel';
import { events } from './events';

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