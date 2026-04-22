// src/components/ar/ARScene.tsx
// FULL CORRECTED VERSION
// Google Maps style arrow
// Fixed overlap with image card
// Professional moving direction arrows

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
    steps[
      Math.min(
        stepIndex,
        steps.length - 1
      )
    ];

  const dir =
    step.direction;

  /* ARRIVAL */
  if (dir === "arrive") {
    return (
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={{
              scale: [1, 1.5],
              opacity: [0.8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
            }}
            className="absolute top-10 h-16 w-16 rounded-full border-2 border-cyan-400"
          />

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

          <div className="h-12 w-1 bg-cyan-400/80 rounded-full" />

          <div className="h-4 w-16 rounded-full border border-cyan-400 bg-cyan-400/10" />
        </div>
      </div>
    );
  }

  /* GOOGLE MAP STYLE ARROWS */
  const Arrow = () => {
    if (dir === "left") {
      return (
        <div className="flex items-center">
          <div className="h-3 w-28 bg-cyan-400 rounded-full shadow-[0_0_20px_#00ffff]" />
          <div className="-ml-28 border-y-[16px] border-y-transparent border-r-[28px] border-r-cyan-400" />
        </div>
      );
    }

    if (dir === "right") {
      return (
        <div className="flex items-center">
          <div className="h-3 w-28 bg-cyan-400 rounded-full shadow-[0_0_20px_#00ffff]" />
          <div className="border-y-[16px] border-y-transparent border-l-[28px] border-l-cyan-400" />
        </div>
      );
    }

    if (dir === "down") {
      return (
        <div className="flex flex-col items-center">
          <div className="h-28 w-3 bg-cyan-400 rounded-full shadow-[0_0_20px_#00ffff]" />
          <div className="-mt-1 border-x-[16px] border-x-transparent border-t-[28px] border-t-cyan-400" />
        </div>
      );
    }

    /* UP */
    return (
      <div className="flex flex-col items-center">
        <div className="border-x-[16px] border-x-transparent border-b-[28px] border-b-cyan-400" />
        <div className="-mt-1 h-28 w-3 bg-cyan-400 rounded-full shadow-[0_0_20px_#00ffff]" />
      </div>
    );
  };

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* CENTER LOWER POSITION to avoid image overlap */}
      <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{
            y:
              dir === "up"
                ? [0, -15, 0]
                : dir === "down"
                ? [0, 15, 0]
                : 0,

            x:
              dir === "left"
                ? [0, -15, 0]
                : dir === "right"
                ? [0, 15, 0]
                : 0,
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
          }}
        >
          <Arrow />
        </motion.div>
      </div>
    </div>
  );
};

export default ARScene;