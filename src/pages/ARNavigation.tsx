// src/pages/ARNavigation.tsx
// FULL CORRECTED VERSION
// Smaller UI so camera view is visible properly
// Voice navigation included
// No design changes except compact sizing

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  CornerUpLeft,
  CornerUpRight,
  MapPin,
  X,
} from "lucide-react";

import { getDestination } from "@/data/destinations";
import CameraView from "@/components/ar/CameraView";
import ARScene from "@/components/ar/ARScene";

const dirIcon = (d: string) => {
  switch (d) {
    case "left":
      return <CornerUpLeft className="h-5 w-5" />;
    case "right":
      return <CornerUpRight className="h-5 w-5" />;
    case "down":
      return <ArrowDown className="h-5 w-5" />;
    case "arrive":
      return <MapPin className="h-5 w-5" />;
    default:
      return <ArrowUp className="h-5 w-5" />;
  }
};

const ARNavigation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dest = getDestination(id ?? "");
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!dest) {
      navigate("/select-destination", {
        replace: true,
      });
    }
  }, [dest, navigate]);

  /* VOICE NAVIGATION */
  useEffect(() => {
    if (!dest) return;

    const step = dest.route[stepIndex];

    const speak = (text: string) => {
      window.speechSynthesis.cancel();

      const msg =
        new SpeechSynthesisUtterance(text);

      msg.lang = "en-IN";
      msg.rate = 1;
      msg.pitch = 1;
      msg.volume = 1;

      window.speechSynthesis.speak(msg);
    };

    if (step.direction === "left") {
      speak("Turn left side");
    } else if (
      step.direction === "right"
    ) {
      speak("Turn right side");
    } else if (step.direction === "up") {
      speak("Walk straight");
    } else if (
      step.direction === "down"
    ) {
      speak("Go back");
    } else if (
      step.direction === "arrive"
    ) {
      speak(
        `You are now at ${dest.name}`
      );
    }
  }, [stepIndex, dest]);

  if (!dest) return null;

  const step = dest.route[stepIndex];

  const isArrival =
    step.direction === "arrive";

  const totalSteps =
    dest.route.length;

  const progress =
    ((stepIndex + 1) /
      totalSteps) *
    100;

  const next = () => {
    if (
      stepIndex <
      totalSteps - 1
    ) {
      setStepIndex(
        (i) => i + 1
      );
    } else {
      navigate(
        `/success/${dest.id}`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      {/* CAMERA */}
      <CameraView />

      {/* AR ARROWS */}
      <div className="absolute inset-0">
        <ARScene
          steps={dest.route}
          stepIndex={stepIndex}
        />
      </div>

      {/* HEADER */}
      <div className="absolute inset-x-0 top-0 z-30 p-3">
        <div className="glass-strong flex items-center gap-3 rounded-2xl p-3 shadow-neon">
          <button
            onClick={() =>
              navigate(-1)
            }
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-background/40"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary">
              Navigating To
            </p>

            <p className="truncate text-xl font-black">
              {dest.name}
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/")
            }
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-background/40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* PROGRESS */}
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background/40">
          <motion.div
            className="h-full bg-gradient-neon"
            animate={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-1 text-center text-[11px] text-white/70">
          Step {stepIndex + 1} of{" "}
          {totalSteps}
        </p>
      </div>

      {/* SMALL DESTINATION IMAGE */}
      <div className="absolute left-3 top-28 z-30">
        <div className="glass-strong w-40 rounded-2xl p-2 shadow-neon">
          <img
            src={dest.image}
            alt={dest.name}
            className="h-24 w-full rounded-xl object-cover"
          />

          <div className="mt-2">
            <p className="text-sm font-black text-white">
              {dest.name}
            </p>

            <p className="mt-1 text-[11px] text-white/70">
              {dest.floor}
            </p>

            <p className="mt-1 text-xs font-bold text-cyan-400">
              ETA: {dest.eta}
            </p>
          </div>
        </div>
      </div>

      {/* DISTANCE */}
      {!isArrival &&
        step.distance > 0 && (
          <div className="absolute right-3 top-28 z-30">
            <div className="glass-strong rounded-2xl px-4 py-2 text-center shadow-neon">
              <p className="text-2xl font-black text-cyan-400">
                {step.distance}
              </p>

              <p className="text-[9px] uppercase text-white/70">
                meters
              </p>
            </div>
          </div>
        )}

      {/* BOTTOM CARD */}
      <div className="absolute inset-x-0 bottom-0 z-30 p-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="glass-strong rounded-2xl p-3 shadow-neon"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-neon shadow-neon">
                {dirIcon(
                  step.direction
                )}
              </div>

              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary">
                  {isArrival
                    ? "Destination"
                    : "Next Move"}
                </p>

                <p className="text-base font-bold leading-tight">
                  {
                    step.instruction
                  }
                </p>
              </div>
            </div>

            <button
              onClick={next}
              className="mt-3 w-full rounded-2xl bg-gradient-neon py-3 text-lg font-black text-primary-foreground shadow-neon"
            >
              {isArrival
                ? "I'm Here →"
                : "Next Step →"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ARNavigation;