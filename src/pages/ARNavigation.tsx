// src/pages/ARNavigation.tsx
// FULLY CORRECTED VERSION
// Fixed image overlap issue
// Bigger image card moved below header
// Added Voice Navigation without changing design

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
      return <CornerUpLeft className="h-7 w-7" />;

    case "right":
      return <CornerUpRight className="h-7 w-7" />;

    case "down":
      return <ArrowDown className="h-7 w-7" />;

    case "arrive":
      return <MapPin className="h-7 w-7" />;

    default:
      return <ArrowUp className="h-7 w-7" />;
  }
};

const ARNavigation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dest = getDestination(id ?? "");
  const [stepIndex, setStepIndex] =
    useState(0);

  useEffect(() => {
    if (!dest) {
      navigate(
        "/select-destination",
        {
          replace: true,
        }
      );
    }
  }, [dest, navigate]);

  /* VOICE NAVIGATION */
  useEffect(() => {
    if (!dest) return;

    const step =
      dest.route[stepIndex];

    const speak = (
      text: string
    ) => {
      window.speechSynthesis.cancel();

      const msg =
        new SpeechSynthesisUtterance(
          text
        );

      msg.lang = "en-IN";
      msg.rate = 1;
      msg.pitch = 1;
      msg.volume = 1;

      window.speechSynthesis.speak(
        msg
      );
    };

    if (
      step.direction ===
      "left"
    ) {
      speak(
        "Turn left side"
      );
    } else if (
      step.direction ===
      "right"
    ) {
      speak(
        "Turn right side"
      );
    } else if (
      step.direction ===
      "up"
    ) {
      speak(
        "Walk straight"
      );
    } else if (
      step.direction ===
      "down"
    ) {
      speak(
        "Go back"
      );
    } else if (
      step.direction ===
      "arrive"
    ) {
      speak(
        `You are now at ${dest.name}`
      );
    }
  }, [stepIndex, dest]);

  if (!dest) return null;

  const step =
    dest.route[stepIndex];

  const isArrival =
    step.direction ===
    "arrive";

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
      <div className="absolute inset-x-0 top-0 z-30 p-4">
        <div className="glass-strong flex items-center gap-3 rounded-3xl p-4 shadow-neon">
          <button
            onClick={() =>
              navigate(-1)
            }
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/40"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-[0.3em] text-primary">
              Navigating To
            </p>

            <p className="truncate text-2xl font-black">
              {dest.name}
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/")
            }
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/40"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-background/40">
          <motion.div
            className="h-full bg-gradient-neon"
            animate={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* STEP TEXT */}
        <p className="mt-2 text-center text-xs text-white/70">
          Step {stepIndex + 1} of{" "}
          {totalSteps}
        </p>
      </div>

      {/* BIG DESTINATION IMAGE */}
      <div className="absolute left-4 top-40 z-30">
        <div className="glass-strong w-56 rounded-3xl p-3 shadow-neon">
          <img
            src={dest.image}
            alt={dest.name}
            className="h-40 w-full rounded-2xl object-cover"
          />

          <div className="mt-3">
            <p className="text-lg font-black text-white">
              {dest.name}
            </p>

            <p className="mt-1 text-xs text-white/70">
              {dest.floor}
            </p>

            <p className="mt-1 text-sm font-bold text-cyan-400">
              ETA: {dest.eta}
            </p>
          </div>
        </div>
      </div>

      {/* DISTANCE */}
      {!isArrival &&
        step.distance >
          0 && (
          <div className="absolute right-4 top-40 z-30">
            <div className="glass-strong rounded-3xl px-5 py-3 text-center shadow-neon">
              <p className="text-4xl font-black text-cyan-400">
                {
                  step.distance
                }
              </p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                meters
              </p>
            </div>
          </div>
        )}

      {/* BOTTOM CARD */}
      <div className="absolute inset-x-0 bottom-0 z-30 p-4">
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
            className="glass-strong rounded-[28px] p-5 shadow-neon"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-neon shadow-neon">
                {dirIcon(
                  step.direction
                )}
              </div>

              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-[0.3em] text-primary">
                  {isArrival
                    ? "Destination"
                    : "Next Move"}
                </p>

                <p className="text-xl font-bold leading-tight">
                  {
                    step.instruction
                  }
                </p>
              </div>
            </div>

            <button
              onClick={next}
              className="mt-5 w-full rounded-3xl bg-gradient-neon py-4 text-xl font-black text-primary-foreground shadow-neon active:scale-[0.98]"
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