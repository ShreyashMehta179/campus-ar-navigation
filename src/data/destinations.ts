// EDIT THIS FILE to add / rename destinations.
// Each destination has a route — an ordered list of steps shown in AR.

export type RouteStep = {
  instruction: string;       // e.g. "Walk straight through the corridor"
  direction: "forward" | "left" | "right" | "up" | "down" | "arrive";
  distance: number;          // in meters
  landmark?: string;         // optional checkpoint label
};

export type Destination = {
  id: string;
  name: string;
  category: "Lab" | "Classroom" | "Facility" | "Event";
  icon: string;              // emoji for quick visual
  floor: string;
  eta: string;               // walking time
  description: string;
  route: RouteStep[];
};

export const destinations: Destination[] = [
  {
    id: "lab-101",
    name: "Lab 101",
    category: "Lab",
    icon: "🧪",
    floor: "Ground Floor",
    eta: "2 min",
    description: "Computer Lab — Coding Round Venue",
    route: [
      { instruction: "Walk straight from Main Gate", direction: "forward", distance: 15, landmark: "Main Gate" },
      { instruction: "Turn right at the corridor", direction: "right", distance: 8, landmark: "Corridor A" },
      { instruction: "Continue forward", direction: "forward", distance: 6 },
      { instruction: "You have reached Lab 101", direction: "arrive", distance: 0, landmark: "Lab 101" },
    ],
  },
  {
    id: "lab-102",
    name: "Lab 102",
    category: "Lab",
    icon: "🧪",
    floor: "Ground Floor",
    eta: "3 min",
    description: "Hardware & IoT Lab",
    route: [
      { instruction: "Walk straight from Main Gate", direction: "forward", distance: 15, landmark: "Main Gate" },
      { instruction: "Turn right at the corridor", direction: "right", distance: 12 },
      { instruction: "Lab 102 on your left", direction: "left", distance: 3 },
      { instruction: "You have reached Lab 102", direction: "arrive", distance: 0 },
    ],
  },
  {
    id: "lab-110",
    name: "Lab 110",
    category: "Lab",
    icon: "💻",
    floor: "First Floor",
    eta: "4 min",
    description: "AI / ML Lab — Mentoring Sessions",
    route: [
      { instruction: "Walk straight from Main Gate", direction: "forward", distance: 15, landmark: "Main Gate" },
      { instruction: "Take the stairs up", direction: "up", distance: 10, landmark: "Staircase" },
      { instruction: "Turn left on First Floor", direction: "left", distance: 8 },
      { instruction: "Continue to the end", direction: "forward", distance: 12 },
      { instruction: "You have reached Lab 110", direction: "arrive", distance: 0 },
    ],
  },
  {
    id: "classroom-a",
    name: "Classroom A",
    category: "Classroom",
    icon: "📚",
    floor: "First Floor",
    eta: "3 min",
    description: "Workshop & Briefing Room",
    route: [
      { instruction: "Enter from Main Gate", direction: "forward", distance: 10 },
      { instruction: "Take stairs up", direction: "up", distance: 10 },
      { instruction: "Turn right", direction: "right", distance: 6 },
      { instruction: "Reached Classroom A", direction: "arrive", distance: 0 },
    ],
  },
  {
    id: "classroom-b",
    name: "Classroom B",
    category: "Classroom",
    icon: "📚",
    floor: "First Floor",
    eta: "4 min",
    description: "Pitch Practice Room",
    route: [
      { instruction: "Enter from Main Gate", direction: "forward", distance: 10 },
      { instruction: "Take stairs up", direction: "up", distance: 10 },
      { instruction: "Turn right then left", direction: "right", distance: 10 },
      { instruction: "Reached Classroom B", direction: "arrive", distance: 0 },
    ],
  },
  {
    id: "registration",
    name: "Registration Desk",
    category: "Facility",
    icon: "📝",
    floor: "Ground Floor",
    eta: "1 min",
    description: "Check-in & Welcome Kit",
    route: [
      { instruction: "From Main Gate, walk forward", direction: "forward", distance: 6 },
      { instruction: "Desk on your left", direction: "left", distance: 2 },
      { instruction: "Reached Registration Desk", direction: "arrive", distance: 0 },
    ],
  },
  {
    id: "toilet",
    name: "Toilet",
    category: "Facility",
    icon: "🚻",
    floor: "Ground Floor",
    eta: "2 min",
    description: "Restrooms — Near Staircase",
    route: [
      { instruction: "Walk to corridor", direction: "forward", distance: 12 },
      { instruction: "Turn left near staircase", direction: "left", distance: 5 },
      { instruction: "Reached Restrooms", direction: "arrive", distance: 0 },
    ],
  },
  {
    id: "food-zone",
    name: "Food Zone",
    category: "Facility",
    icon: "🍽️",
    floor: "Ground Floor",
    eta: "3 min",
    description: "Snacks, Lunch & Beverages",
    route: [
      { instruction: "Exit lobby through right door", direction: "right", distance: 10 },
      { instruction: "Walk through open courtyard", direction: "forward", distance: 18 },
      { instruction: "Reached Food Zone", direction: "arrive", distance: 0 },
    ],
  },
  {
    id: "help-desk",
    name: "Help Desk",
    category: "Facility",
    icon: "🛟",
    floor: "Ground Floor",
    eta: "1 min",
    description: "Volunteers & Information",
    route: [
      { instruction: "Near the Main Gate entrance", direction: "forward", distance: 4 },
      { instruction: "Reached Help Desk", direction: "arrive", distance: 0 },
    ],
  },
  {
    id: "auditorium",
    name: "Auditorium",
    category: "Event",
    icon: "🎤",
    floor: "Ground Floor",
    eta: "4 min",
    description: "Opening Ceremony & Final Pitch",
    route: [
      { instruction: "Walk straight from Main Gate", direction: "forward", distance: 20 },
      { instruction: "Turn left at junction", direction: "left", distance: 10 },
      { instruction: "Enter through double doors", direction: "forward", distance: 6 },
      { instruction: "Reached Auditorium", direction: "arrive", distance: 0 },
    ],
  },
  {
    id: "exit-gate",
    name: "Exit Gate",
    category: "Facility",
    icon: "🚪",
    floor: "Ground Floor",
    eta: "2 min",
    description: "Campus Exit",
    route: [
      { instruction: "Walk towards main lobby", direction: "forward", distance: 12 },
      { instruction: "Turn right to exit", direction: "right", distance: 6 },
      { instruction: "You have exited the campus", direction: "arrive", distance: 0 },
    ],
  },
];

export const getDestination = (id: string) =>
  destinations.find((d) => d.id === id);