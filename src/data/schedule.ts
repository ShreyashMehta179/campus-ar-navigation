// src/data/schedule.ts
// FULL CORRECTED CODE
// Only Change:
// Mentoring Round 2 moved from 6 PM to 8 PM
// Dinner remains same at 8 PM (rolling basis)

export type ScheduleEvent = {
  id: string;
  time: string;
  label: string;
  title: string;
  description: string;
  venueId: string;
  venueName: string;
  icon: string;
  date: string;
  dateTime: string;
};

export const schedule: ScheduleEvent[] = [
  {
    id: "e1",
    time: "08:00",
    label: "08:00 AM",
    title: "Registration & Breakfast",
    description:
      "Check-in, ID verification, welcome kit and breakfast.",
    venueId: "registration",
    venueName: "Registration Desk",
    icon: "📝",
    date: "2026-04-24",
    dateTime: "2026-04-24T08:00:00",
  },

  {
    id: "e2",
    time: "09:00",
    label: "09:00 AM",
    title: "Hackathon Coding Begins",
    description:
      "24-hour hackathon officially starts.",
    venueId: "lab-004",
    venueName: "Hackathon Arena",
    icon: "💻",
    date: "2026-04-24",
    dateTime: "2026-04-24T09:00:00",
  },

  {
    id: "e3",
    time: "10:00",
    label: "10:00 AM",
    title: "Inauguration Ceremony",
    description:
      "Welcome speech, rules and themes introduction.",
    venueId: "auditorium",
    venueName: "Auditorium",
    icon: "🎤",
    date: "2026-04-24",
    dateTime: "2026-04-24T10:00:00",
  },

  {
    id: "e4",
    time: "11:00",
    label: "11:00 AM",
    title: "Mentoring Round 1",
    description:
      "Idea validation and initial guidance.",
    venueId: "mentor-zone",
    venueName: "Mentor Zone",
    icon: "🧠",
    date: "2026-04-24",
    dateTime: "2026-04-24T11:00:00",
  },

  {
    id: "e5",
    time: "12:00",
    label: "12:00 PM",
    title: "Lunch",
    description:
      "Lunch on rolling basis while coding continues.",
    venueId: "food-zone",
    venueName: "Food Zone",
    icon: "🍽️",
    date: "2026-04-24",
    dateTime: "2026-04-24T12:00:00",
  },

  {
    id: "e6",
    time: "14:00",
    label: "02:00 PM",
    title: "Development / Exhibition",
    description:
      "One member explains while others continue coding.",
    venueId: "lab-004",
    venueName: "Hackathon Arena",
    icon: "🛠️",
    date: "2026-04-24",
    dateTime: "2026-04-24T14:00:00",
  },

  {
    id: "e7",
    time: "17:00",
    label: "05:00 PM",
    title: "Snacks & Tea",
    description:
      "Short refreshment break.",
    venueId: "food-zone",
    venueName: "Food Zone",
    icon: "☕",
    date: "2026-04-24",
    dateTime: "2026-04-24T17:00:00",
  },

  /* UPDATED FROM 6 PM TO 8 PM */
  {
    id: "e8",
    time: "20:00",
    label: "6:00 PM to 8:00 PM",
    title: "Mentoring Round 2 / Evaluation",
    description:
      "Progress review and mentor feedback.",
    venueId: "evaluation-zone",
    venueName: "Evaluation Area",
    icon: "📋",
    date: "2026-04-24",
    dateTime: "2026-04-24T20:00:00",
  },

  /* DINNER SAME TIME */
  {
    id: "e9",
    time: "20:00",
    label: "08:00 PM",
    title: "Dinner",
    description:
      "Dinner on rolling basis.",
    venueId: "food-zone",
    venueName: "Food Zone",
    icon: "🍛",
    date: "2026-04-24",
    dateTime: "2026-04-24T20:00:00",
  },

  {
    id: "e10",
    time: "22:00",
    label: "10:00 PM",
    title: "Continuous Development",
    description:
      "Overnight coding, debugging and implementation.",
    venueId: "lab-004",
    venueName: "Hackathon Arena",
    icon: "🌙",
    date: "2026-04-24",
    dateTime: "2026-04-24T22:00:00",
  },

  {
    id: "e11",
    time: "02:00",
    label: "02:00 AM",
    title: "Midnight Tea",
    description:
      "Light refreshments while coding continues.",
    venueId: "food-zone",
    venueName: "Food Zone",
    icon: "☕",
    date: "2026-04-25",
    dateTime: "2026-04-25T02:00:00",
  },

  {
    id: "e12",
    time: "03:00",
    label: "03:00 AM",
    title: "Final Development Phase",
    description:
      "Testing and final polishing.",
    venueId: "lab-004",
    venueName: "Hackathon Arena",
    icon: "⚙️",
    date: "2026-04-25",
    dateTime: "2026-04-25T03:00:00",
  },

  {
    id: "e13",
    time: "08:00",
    label: "08:00 AM",
    title: "Final Evaluation",
    description:
      "Judges begin final review.",
    venueId: "auditorium",
    venueName: "Judging Hall",
    icon: "🏁",
    date: "2026-04-25",
    dateTime: "2026-04-25T08:00:00",
  },

  {
    id: "e14",
    time: "09:00",
    label: "09:00 AM",
    title: "Hackathon Ends",
    description:
      "24-hour coding ends. Code freeze.",
    venueId: "auditorium",
    venueName: "Main Hall",
    icon: "⏰",
    date: "2026-04-25",
    dateTime: "2026-04-25T09:00:00",
  },

  {
    id: "e15",
    time: "10:00",
    label: "10:00 AM",
    title: "Results Declaration",
    description:
      "Winners announced and closing ceremony.",
    venueId: "auditorium",
    venueName: "Auditorium",
    icon: "🏆",
    date: "2026-04-25",
    dateTime: "2026-04-25T10:00:00",
  },
];