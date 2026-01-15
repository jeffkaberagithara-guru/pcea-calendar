// Get month data for calendar display
export function getMonthData(year, monthIndex) {
  const date = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startDay = date.getDay(); // 0 = Sunday
  
  return {
    daysInMonth,
    startDay
  };
}

// Get color for event type
export function getEventTypeColor(eventType) {
  const colorMap = {
    presentation: 'bg-red-600',
    mission: 'bg-purple-600',
    practice: 'bg-green-600',
    visit: 'bg-orange-600',
    worship: 'bg-blue-600',
    youth: 'bg-teal-600',
    conference: 'bg-indigo-600',
    celebration: 'bg-pink-600',
    planning: 'bg-cyan-600',
    kids: 'bg-lime-600',
    community: 'bg-amber-600',
    music: 'bg-rose-600',
    default: 'bg-gray-500'
  };
  
  return colorMap[eventType] || colorMap.default;
}

// Get event type label
export function getEventTypeLabel(eventType) {
  const labelMap = {
    presentation: 'Presentation',
    mission: 'Mission',
    practice: 'Practice',
    visit: 'Visit',
    worship: 'Worship Service',
    youth: 'Youth Event',
    conference: 'Conference',
    celebration: 'Celebration',
    planning: 'Planning',
    kids: "Kids' Event",
    community: 'Community Event',
    music: 'Music Event'
  };
  
  return labelMap[eventType] || eventType;
}
