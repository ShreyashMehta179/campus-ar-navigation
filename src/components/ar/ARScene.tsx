// src/components/ar/ARScene.tsx
// SIMPLE PROFESSIONAL VERSION
// Clean minimal destination marker

import { motion } from "framer-motion";
import type { RouteStep } from "@/data/destinations";

type Props = {
  steps: RouteStep[];
  stepIndex: number;
};

const ARScene = ({
  steps,
  stepIndex,
}: Props) => {
  const step =
    steps[Math.min(stepIndex, steps.length - 1)];

  const direction =
    step.direction;

  /* ---------------------- */
  /* SIMPLE DESTINATION */
  /* ---------------------- */
  if (direction === "arrive") {
    return (
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Floating Dot */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
            }}
            className="h-10 w-10 rounded-full bg-cyan-400 shadow-[0_0_25px_#00ffff]"
          />

          {/* Line */}
          <div className="h-12 w-1 rounded-full bg-cyan-400/80" />

          {/* Pulse Ring */}
          <motion.div
            animate={{
              scale: [1, 1.5],
              opacity: [0.8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            className="absolute bottom-0 h-12 w-12 rounded-full border-2 border-cyan-400"
          />
        </div>
      </div>
    );
  }

  /* ---------------------- */
  /* ARROWS */
  /* ---------------------- */
  const getArrow = () => {
    switch (direction) {
      case "left":
        return "←";
      case "right":
        return "→";
      case "down":
        return "↓";
      default:
        return "↑";
    }
  };

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.span
          animate={{
            y:
              direction === "up"
                ? [0, -18, 0]
                : direction === "down"
                ? [0, 18, 0]
                : 0,

            x:
              direction === "right"
                ? [0, 18, 0]
                : direction === "left"
                ? [0, -18, 0]
                : 0,
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
          }}
          className="text-cyan-400 text-[130px] font-black leading-none drop-shadow-[0_0_25px_#00ffff]"
        >
          {getArrow()}
        </motion.span>
      </div>
    </div>
  );
};

export default ARScene;