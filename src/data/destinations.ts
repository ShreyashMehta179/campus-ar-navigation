// src/data/destinations.ts
// UPDATED ROUTES WITH MULTI-STEP DIRECTIONS
// GOOGLE MAP STYLE STEP BY STEP
// ALL DISTANCES IN METERS
// ALL IMAGES .jpeg

export type Direction =
  | "up"
  | "left"
  | "right"
  | "down"
  | "arrive";

export type RouteStep = {
  instruction: string;
  direction: Direction;
  distance: number;
  image?: string;
};

export type Destination = {
  id: string;
  name: string;
  category:
    | "Lab"
    | "Facility"
    | "Event"
    | "Room";
  icon: string;
  floor: string;
  eta: string;
  description: string;
  image: string;
  route: RouteStep[];
};

export const destinations: Destination[] = [
  {
    id: "help-desk",
    name: "Help Desk",
    category: "Facility",
    icon: "🛟",
    floor: "Ground Floor",
    eta: "1 min",
    description: "Support Desk",
    image: "/images/helpdesk.jpeg",
    route: [
      {
        instruction:
          "Walk straight from Entry Gate",
        direction: "up",
        distance: 33.7,
        image:
          "/images/path-gate-helpdesk.jpeg",
      },
      {
        instruction:
          "Reached Help Desk",
        direction:
          "arrive",
        distance: 0,
        image:
          "/images/helpdesk.jpeg",
      },
    ],
  },

  {
    id: "lab-004",
    name: "Hackathon Lab",
    category: "Lab",
    icon: "💻",
    floor: "Ground Floor",
    eta: "2 min",
    description:
      "Hackathon Main Venue",
    image:
      "/images/lab004.jpeg",
    route: [
      {
        instruction:
          "Walk straight from Entry Gate to Help Desk",
        direction: "up",
        distance: 33.7,
        image:
          "/images/path-gate-helpdesk.jpeg",
      },
      {
        instruction:
          "After corridor turn left",
        direction:
          "left",
        distance: 6,
        image:
          "/images/corridor.jpeg",
      },
      {
        instruction:
          "Reached Hackathon Lab",
        direction:
          "arrive",
        distance: 0,
        image:
          "/images/lab004.jpeg",
      },
    ],
  },

  {
    id: "washroom",
    name: "Washroom",
    category: "Facility",
    icon: "🚻",
    floor: "Ground Floor",
    eta: "2 min",
    description:
      "Washroom beside labs",
    image:
      "/images/washroom.jpeg",
    route: [
      {
        instruction:
          "Walk straight from Entry Gate to Help Desk",
        direction: "up",
        distance: 33.7,
        image:
          "/images/path-gate-helpdesk.jpeg",
      },
      {
        instruction:
          "After corridor turn left toward lab side",
        direction:
          "left",
        distance: 6,
        image:
          "/images/corridor.jpeg",
      },
      {
        instruction:
          "Walk straight from lab side",
        direction: "up",
        distance: 8,
        image:
          "/images/corridor.jpeg",
      },
      {
        instruction:
          "Washroom is on your right side",
        direction:
          "right",
        distance: 2,
        image:
          "/images/washroom.jpeg",
      },
      {
        instruction:
          "Reached Washroom",
        direction:
          "arrive",
        distance: 0,
        image:
          "/images/washroom.jpeg",
      },
    ],
  },

  {
    id: "girls-common-room",
    name: "Girls Common Room",
    category: "Room",
    icon: "🚺",
    floor: "Ground Floor",
    eta: "3 min",
    description:
      "Girls Rest Area",
    image:
      "/images/girlsroom.jpeg",
    route: [
      {
        instruction:
          "Walk straight from Entry Gate to Help Desk",
        direction: "up",
        distance: 33.7,
        image:
          "/images/path-gate-helpdesk.jpeg",
      },
      {
        instruction:
          "Turn left at corridor toward labs",
        direction:
          "left",
        distance: 6,
        image:
          "/images/corridor.jpeg",
      },
      {
        instruction:
          "Walk straight",
        direction: "up",
        distance: 12,
        image:
          "/images/corridor.jpeg",
      },
      {
        instruction:
          "Girls Common Room is on your left side",
        direction:
          "left",
        distance: 2,
        image:
          "/images/girlsroom.jpeg",
      },
      {
        instruction:
          "Reached Girls Common Room",
        direction:
          "arrive",
        distance: 0,
        image:
          "/images/girlsroom.jpeg",
      },
    ],
  },

  {
    id: "canteen",
    name: "Canteen",
    category: "Facility",
    icon: "🍽️",
    floor: "Ground Floor",
    eta: "4 min",
    description:
      "College Canteen",
    image:
      "/images/canteen.jpeg",
    route: [
      {
        instruction:
          "Walk straight from Entry Gate to Help Desk",
        direction: "up",
        distance: 33.7,
        image:
          "/images/path-gate-helpdesk.jpeg",
      },
      {
        instruction:
          "Turn left at corridor",
        direction:
          "left",
        distance: 6,
        image:
          "/images/corridor.jpeg",
      },
      {
        instruction:
          "Walk straight passing labs",
        direction: "up",
        distance: 60,
        image:
          "/images/path-canteen.jpeg",
      },
      {
        instruction:
          "Reached Canteen",
        direction:
          "arrive",
        distance: 0,
        image:
          "/images/canteen.jpeg",
      },
    ],
  },
];

export const getDestination = (
  id: string
) =>
  destinations.find(
    (item) =>
      item.id === id
  );