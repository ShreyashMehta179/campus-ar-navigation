// EDIT THIS FILE to update event timings and venues.
// `time` uses 24h "HH:mm" so countdown logic works correctly.

export type ScheduleEvent = {
  id: string;
  time: string;        // "HH:mm" 24-hour
  label: string;       // 12h display
  title: string;
  description: string;
  venueId: string;     // must match a destination id
  venueName: string;
  icon: string;
};

export const schedule: ScheduleEvent[] = [
  { id: "e1", time: "08:00", label: "08:00 AM", title: "Registration", description: "Check-in, ID badges & welcome kit.", venueId: "registration", venueName: "Registration Desk", icon: "📝" },
  { id: "e2", time: "09:00", label: "09:00 AM", title: "Opening Ceremony", description: "Inaugural address & rules briefing.", venueId: "auditorium", venueName: "Auditorium", icon: "🎤" },
  { id: "e3", time: "10:00", label: "10:00 AM", title: "Coding Round Starts", description: "Hackathon kicks off — build your idea.", venueId: "lab-101", venueName: "Lab 101", icon: "💻" },
  { id: "e4", time: "13:00", label: "01:00 PM", title: "Lunch Break", description: "Refuel at the food zone.", venueId: "food-zone", venueName: "Food Zone", icon: "🍽️" },
  { id: "e5", time: "14:00", label: "02:00 PM", title: "Mentoring Session", description: "1-on-1 with industry mentors.", venueId: "lab-110", venueName: "Lab 110", icon: "🧠" },
  { id: "e6", time: "17:00", label: "05:00 PM", title: "Final Pitch", description: "Present your prototype to the jury.", venueId: "auditorium", venueName: "Auditorium", icon: "🚀" },
  { id: "e7", time: "19:00", label: "07:00 PM", title: "Prize Distribution", description: "Winners announced & awarded.", venueId: "auditorium", venueName: "Auditorium", icon: "🏆" },
];