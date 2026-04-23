import { motion } from "framer-motion";
import type { RouteStep } from "@/data/destinations";

type Props = {
  steps: RouteStep[];
  stepIndex: number;
};

const ARScene = ({ steps, stepIndex }: Props) => {
  const step =
    steps[Math.min(stepIndex, steps.length - 1)];

  const dir = step.direction;

  /* ARRIVAL MARKER */
  if (dir === "arrive") {
    return (
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={{
              scale: [1, 1.7],
              opacity: [0.9, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeOut",
            }}
            className="absolute top-8 h-20 w-20 rounded-full border-2 border-cyan-400"
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
            }}
            className="h-12 w-12 rounded-full bg-cyan-400 shadow-[0_0_35px_#00ffff]"
          />

          <div className="h-14 w-1 rounded-full bg-cyan-400/90" />
          <div className="h-4 w-20 rounded-full border border-cyan-400 bg-cyan-400/10" />
        </div>
      </div>
    );
  }

  const glow =
    "shadow-[0_0_25px_#00ffff]";

  const Arrow = () => {
    if (dir === "left") {
      return (
        <div className="flex items-center">
          <div className="-mr-1 border-y-[18px] border-y-transparent border-r-[30px] border-r-cyan-400" />
          <div className={`h-4 w-32 rounded-full bg-cyan-400 ${glow}`} />
        </div>
      );
    }

    if (dir === "right") {
      return (
        <div className="flex items-center">
          <div className={`h-4 w-32 rounded-full bg-cyan-400 ${glow}`} />
          <div className="-ml-1 border-y-[18px] border-y-transparent border-l-[30px] border-l-cyan-400" />
        </div>
      );
    }

    if (dir === "down") {
      return (
        <div className="flex flex-col items-center">
          <div className={`h-32 w-4 rounded-full bg-cyan-400 ${glow}`} />
          <div className="-mt-1 border-x-[18px] border-x-transparent border-t-[30px] border-t-cyan-400" />
        </div>
      );
    }

    /* UP */
    return (
      <div className="flex flex-col items-center">
        <div className="border-x-[18px] border-x-transparent border-b-[30px] border-b-cyan-400" />
        <div className={`-mt-1 h-32 w-4 rounded-full bg-cyan-400 ${glow}`} />
      </div>
    );
  };

  const motionProps =
    dir === "up"
      ? { y: [0, -18, 0] }
      : dir === "down"
      ? { y: [0, 18, 0] }
      : dir === "left"
      ? { x: [0, -18, 0] }
      : { x: [0, 18, 0] };

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* lower center for camera visibility */}
      <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={motionProps}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <Arrow />
        </motion.div>
      </div>

      {/* Distance pulse floor glow */}
      <motion.div
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.08, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
        }}
        className="absolute left-1/2 top-[72%] h-16 w-40 -translate-x-1/2 rounded-full bg-cyan-400 blur-2xl"
      />
    </div>
  );
};

export default ARScene;