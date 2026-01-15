// Calendar events data
export const events = [
    {
        id: 1,
        title: "New Year Service",
        description: "First service of the year with special prayers",
        month: 1,
        day: 1,
        type: "worship",
        category: "presentation"
    },
    {
        id: 2,
        title: "Youth Retreat",
        description: "Annual youth camp and spiritual retreat",
        month: 1,
        day: 15,
        type: "youth",
        category: "mission"
    },
    {
        id: 3,
        title: "Men's Conference",
        description: "Conference focusing on men's spiritual growth",
        month: 2,
        day: 10,
        type: "conference",
        category: "practice"
    },
    {
        id: 4,
        title: "Women's Day Celebration",
        description: "Special service celebrating women",
        month: 3,
        day: 8,
        type: "celebration",
        category: "presentation"
    },
    {
        id: 5,
        title: "Easter Service",
        description: "Resurrection Sunday celebration",
        month: 4,
        day: 20,
        type: "worship",
        category: "presentation"
    },
    {
        id: 6,
        title: "Mission Trip Planning",
        description: "Planning session for summer mission trips",
        month: 5,
        day: 5,
        type: "planning",
        category: "mission"
    },
    {
        id: 7,
        title: "Vacation Bible School",
        description: "Summer kids program and Bible lessons",
        month: 6,
        day: 15,
        type: "kids",
        category: "practice"
    },
    {
        id: 8,
        title: "Summer Camp",
        description: "Youth summer camp activities",
        month: 7,
        day: 10,
        type: "youth",
        category: "practice"
    },
    {
        id: 9,
        title: "Pastor's Anniversary",
        description: "Celebrating pastor's years of service",
        month: 8,
        day: 25,
        type: "celebration",
        category: "presentation"
    },
    {
        id: 10,
        title: "Back to School Blessing",
        description: "Prayer service for students and teachers",
        month: 9,
        day: 1,
        type: "worship",
        category: "presentation"
    },
    {
        id: 11,
        title: "Harvest Festival",
        description: "Fall harvest celebration and food drive",
        month: 10,
        day: 15,
        type: "community",
        category: "visit"
    },
    {
        id: 12,
        title: "Thanksgiving Service",
        description: "Giving thanks for God's blessings",
        month: 11,
        day: 28,
        type: "worship",
        category: "presentation"
    },
    {
        id: 13,
        title: "Christmas Concert",
        description: "Christmas carols and musical performance",
        month: 12,
        day: 15,
        type: "music",
        category: "presentation"
    },
    {
        id: 14,
        title: "Christmas Eve Service",
        description: "Candlelight service on Christmas Eve",
        month: 12,
        day: 24,
        type: "worship",
        category: "presentation"
    },
    {
        id: 15,
        title: "New Year's Eve Watch Night",
        description: "Prayer service to welcome the new year",
        month: 12,
        day: 31,
        type: "worship",
        category: "presentation"
    }
];

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
