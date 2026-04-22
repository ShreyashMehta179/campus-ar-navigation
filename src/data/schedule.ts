// src/data/schedule.ts
// FULLY CORRECTED FOR
// DYPSEM HACKOUTSAV 2026
// 24 Hrs Hackathon
// 24–25 April 2026

export type ScheduleEvent = {
  id: string;
  time: string;       // 24h format
  label: string;      // display format
  title: string;
  description: string;
  venueId: string;
  venueName: string;
  icon: string;
};

export const schedule: ScheduleEvent[] = [
  {
    id: "e1",
    time: "08:00",
    label: "08:00 AM",
    title: "Registration & Breakfast",
    description:
      "Check-in, ID verification, welcome kit, breakfast and team seating.",
    venueId: "registration",
    venueName: "Registration Desk",
    icon: "📝",
  },

  {
    id: "e2",
    time: "09:00",
    label: "09:00 AM",
    title: "Hackathon Coding Begins",
    description:
      "24-hour coding officially starts. Begin development immediately.",
    venueId: "lab-101",
    venueName: "Hackathon Arena",
    icon: "💻",
  },

  {
    id: "e3",
    time: "10:00",
    label: "10:00 AM",
    title: "Inauguration Ceremony",
    description:
      "Welcome speech, rules briefing, themes announcement. Coding continues simultaneously.",
    venueId: "auditorium",
    venueName: "Auditorium",
    icon: "🎤",
  },

  {
    id: "e4",
    time: "11:00",
    label: "11:00 AM",
    title: "Mentoring Round 1",
    description:
      "Idea validation and early-stage technical guidance from mentors.",
    venueId: "lab-110",
    venueName: "Mentor Zone",
    icon: "🧠",
  },

  {
    id: "e5",
    time: "12:00",
    label: "12:00 PM",
    title: "Lunch (Rolling Basis)",
    description:
      "Teams rotate for lunch while development continues.",
    venueId: "food-zone",
    venueName: "Food Zone",
    icon: "🍽️",
  },

  {
    id: "e6",
    time: "14:00",
    label: "02:00 PM",
    title: "Development / Exhibition",
    description:
      "One member explains project while others continue coding.",
    venueId: "auditorium",
    venueName: "Exhibition Hall",
    icon: "🛠️",
  },

  {
    id: "e7",
    time: "17:00",
    label: "05:00 PM",
    title: "Snacks & Tea",
    description:
      "Short refreshment break on rolling basis.",
    venueId: "food-zone",
    venueName: "Food Zone",
    icon: "☕",
  },

  {
    id: "e8",
    time: "18:00",
    label: "06:00 PM",
    title: "Mentoring Round 2 / Evaluation 1",
    description:
      "Judges review progress and provide feedback.",
    venueId: "lab-110",
    venueName: "Evaluation Area",
    icon: "📋",
  },

  {
    id: "e9",
    time: "20:00",
    label: "08:00 PM",
    title: "Dinner (Rolling Basis)",
    description:
      "Dinner break with staggered team rotations.",
    venueId: "food-zone",
    venueName: "Food Zone",
    icon: "🍛",
  },

  {
    id: "e10",
    time: "22:00",
    label: "10:00 PM",
    title: "Continuous Development",
    description:
      "Overnight coding, debugging, testing and feature completion.",
    venueId: "lab-101",
    venueName: "Hackathon Arena",
    icon: "🌙",
  },

  {
    id: "e11",
    time: "02:00",
    label: "02:00 AM",
    title: "Midnight Tea",
    description:
      "Light refreshments while work continues.",
    venueId: "food-zone",
    venueName: "Food Zone",
    icon: "☕",
  },

  {
    id: "e12",
    time: "03:00",
    label: "03:00 AM",
    title: "Final Development Phase",
    description:
      "Final implementation, bug fixing, polishing and testing.",
    venueId: "lab-101",
    venueName: "Hackathon Arena",
    icon: "⚙️",
  },

  {
    id: "e13",
    time: "08:00",
    label: "08:00 AM",
    title: "Evaluation Round 2",
    description:
      "Final judging round begins.",
    venueId: "auditorium",
    venueName: "Judging Hall",
    icon: "🏁",
  },

  {
    id: "e14",
    time: "09:00",
    label: "09:00 AM",
    title: "Hackathon Ends",
    description:
      "24-hour coding closes. Code freeze.",
    venueId: "auditorium",
    venueName: "Main Hall",
    icon: "⏰",
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
  },
];