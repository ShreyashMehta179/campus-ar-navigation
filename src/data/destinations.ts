// src/data/destinations.ts
// FULL CORRECTED VERSION
// Added ENTRY GATE of college
// Add image: /public/images/entrygate.jpg

export type RouteStep = {
  instruction: string;
  direction:
    | "up"
    | "left"
    | "right"
    | "down"
    | "arrive";
  distance: number;
  landmark?: string;
};

export type Destination = {
  id: string;
  name: string;
  category:
    | "Lab"
    | "Classroom"
    | "Facility"
    | "Event";
  icon: string;
  floor: string;
  eta: string;
  description: string;
  image: string;
  route: RouteStep[];
};

export const destinations: Destination[] = [
  /* ENTRY GATE */
  {
    id: "entry-gate",
    name: "Entry Gate",
    category: "Facility",
    icon: "🏫",
    floor: "Ground Floor",
    eta: "0 min",
    description:
      "Main Entrance of DYPSEM College",
    image:
      "/images/entrygate.jpg",
    route: [
      {
        instruction:
          "You are at Entry Gate",
        direction:
          "arrive",
        distance: 0,
      },
    ],
  },

  /* LAB 101 */
  {
    id: "lab-101",
    name: "Lab 101",
    category: "Lab",
    icon: "💻",
    floor: "Ground Floor",
    eta: "2 min",
    description:
      "Computer Coding Round Venue",
    image:
      "/images/lab101.jpg",
    route: [
      {
        instruction:
          "Walk straight from Entry Gate",
        direction: "up",
        distance: 15,
      },
      {
        instruction:
          "Turn right at Corridor A",
        direction:
          "right",
        distance: 8,
      },
      {
        instruction:
          "Continue straight",
        direction: "up",
        distance: 6,
      },
      {
        instruction:
          "Reached Lab 101",
        direction:
          "arrive",
        distance: 0,
      },
    ],
  },

  /* REGISTRATION */
  {
    id: "registration",
    name: "Registration Desk",
    category: "Facility",
    icon: "📝",
    floor: "Ground Floor",
    eta: "1 min",
    description:
      "Check-in & Welcome Kit",
    image:
      "/images/registration.jpg",
    route: [
      {
        instruction:
          "Walk straight from Entry Gate",
        direction: "up",
        distance: 8,
      },
      {
        instruction:
          "Desk on left side",
        direction:
          "left",
        distance: 2,
      },
      {
        instruction:
          "Reached Registration",
        direction:
          "arrive",
        distance: 0,
      },
    ],
  },

  /* FOOD ZONE */
  {
    id: "food-zone",
    name: "Food Zone",
    category: "Facility",
    icon: "🍽️",
    floor: "Ground Floor",
    eta: "3 min",
    description:
      "Snacks & Lunch Area",
    image:
      "/images/foodzone.jpg",
    route: [
      {
        instruction:
          "Turn right from Entry Gate",
        direction:
          "right",
        distance: 10,
      },
      {
        instruction:
          "Walk straight",
        direction: "up",
        distance: 15,
      },
      {
        instruction:
          "Reached Food Zone",
        direction:
          "arrive",
        distance: 0,
      },
    ],
  },

  /* AUDITORIUM */
  {
    id: "auditorium",
    name: "Auditorium",
    category: "Event",
    icon: "🎤",
    floor: "Ground Floor",
    eta: "4 min",
    description:
      "Opening Ceremony Hall",
    image:
      "/images/auditorium.jpg",
    route: [
      {
        instruction:
          "Walk straight from Entry Gate",
        direction: "up",
        distance: 20,
      },
      {
        instruction:
          "Turn left",
        direction:
          "left",
        distance: 10,
      },
      {
        instruction:
          "Reached Auditorium",
        direction:
          "arrive",
        distance: 0,
      },
    ],
  },

  /* TOILET */
  {
    id: "toilet",
    name: "Toilet",
    category: "Facility",
    icon: "🚻",
    floor: "Ground Floor",
    eta: "2 min",
    description:
      "Restroom Area",
    image:
      "/images/toilet.jpg",
    route: [
      {
        instruction:
          "Walk straight",
        direction: "up",
        distance: 10,
      },
      {
        instruction:
          "Turn left",
        direction:
          "left",
        distance: 5,
      },
      {
        instruction:
          "Reached Toilet",
        direction:
          "arrive",
        distance: 0,
      },
    ],
  },

  /* HELP DESK */
  {
    id: "help-desk",
    name: "Help Desk",
    category: "Facility",
    icon: "🛟",
    floor: "Ground Floor",
    eta: "1 min",
    description:
      "Volunteer Support",
    image:
      "/images/helpdesk.jpg",
    route: [
      {
        instruction:
          "Near Entry Gate",
        direction: "up",
        distance: 4,
      },
      {
        instruction:
          "Reached Help Desk",
        direction:
          "arrive",
        distance: 0,
      },
    ],
  },

  /* EXIT GATE */
  {
    id: "exit-gate",
    name: "Exit Gate",
    category: "Facility",
    icon: "🚪",
    floor: "Ground Floor",
    eta: "2 min",
    description:
      "College Exit",
    image:
      "/images/gate.jpg",
    route: [
      {
        instruction:
          "Walk straight",
        direction: "up",
        distance: 12,
      },
      {
        instruction:
          "Turn right",
        direction:
          "right",
        distance: 6,
      },
      {
        instruction:
          "Exited Campus",
        direction:
          "arrive",
        distance: 0,
      },
    ],
  },
];

export const getDestination = (
  id: string
) =>
  destinations.find(
    (d) => d.id === id
  );