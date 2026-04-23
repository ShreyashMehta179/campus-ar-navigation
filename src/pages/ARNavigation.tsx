import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  CornerUpLeft,
  CornerUpRight,
  MapPin,
  X,
  Volume2,
} from "lucide-react";

import { getDestination } from "@/data/destinations";
import CameraView from "@/components/ar/CameraView";
import ARScene from "@/components/ar/ARScene";

const dirIcon = (d: string) => {
  switch (d) {
    case "left":
      return <CornerUpLeft className="h-6 w-6" />;
    case "right":
      return <CornerUpRight className="h-6 w-6" />;
    case "down":
      return <ArrowDown className="h-6 w-6" />;
    case "arrive":
      return <MapPin className="h-6 w-6" />;
    default:
      return <ArrowUp className="h-6 w-6" />;
  }
};

const ARNavigation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const destination = getDestination(id ?? "");

  const [stepIndex, setStepIndex] = useState(0);
  const [voiceOn, setVoiceOn] = useState(true);

  useEffect(() => {
    if (!destination) {
      navigate("/select-destination", { replace: true });
    }
  }, [destination, navigate]);

  const step = destination?.route[stepIndex];

  const totalDistance = useMemo(() => {
    if (!destination) return 0;
    return destination.route.reduce(
      (sum, item) => sum + item.distance,
      0
    );
  }, [destination]);

  const walkedDistance = useMemo(() => {
    if (!destination) return 0;
    return destination.route
      .slice(0, stepIndex)
      .reduce((sum, item) => sum + item.distance, 0);
  }, [destination, stepIndex]);

  const remainingDistance = Math.max(
    totalDistance - walkedDistance,
    0
  );

  useEffect(() => {
    if (!voiceOn || !step || !destination) return;

    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(
      step.instruction
    );
    msg.lang = "en-IN";
    msg.rate = 1;
    msg.pitch = 1;
    msg.volume = 1;

    window.speechSynthesis.speak(msg);
  }, [stepIndex, voiceOn, step, destination]);

  if (!destination || !step) return null;

  const isArrival = step.direction === "arrive";

  const progress =
    ((stepIndex + 1) / destination.route.length) * 100;

  const nextStep = () => {
    if (stepIndex < destination.route.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      navigate(`/success/${destination.id}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* CAMERA */}
      <CameraView />

      {/* AR OVERLAY */}
      <div className="absolute inset-0 z-10">
        <ARScene
          steps={destination.route}
          stepIndex={stepIndex}
        />
      </div>

      {/* TOP BAR */}
      <div className="absolute inset-x-0 top-0 z-30 p-3">
        <div className="glass-strong rounded-2xl p-3 flex items-center gap-3 shadow-neon">
          <button
            onClick={() => navigate(-1)}
            className="h-11 w-11 rounded-xl bg-background/40 flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary">
              Navigating To
            </p>

            <p className="truncate text-xl font-black text-white">
              {destination.name}
            </p>
          </div>

          <button
            onClick={() => setVoiceOn(!voiceOn)}
            className="h-11 w-11 rounded-xl bg-background/40 flex items-center justify-center"
          >
            <Volume2
              className={`h-5 w-5 ${
                voiceOn ? "text-cyan-400" : "text-white/40"
              }`}
            />
          </button>

          <button
            onClick={() => navigate("/")}
            className="h-11 w-11 rounded-xl bg-background/40 flex items-center justify-center"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-neon"
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* DESTINATION CARD */}
      <div className="absolute left-3 top-28 z-30">
        <div className="glass-strong w-44 rounded-2xl p-2 shadow-neon">
          <img
            src={step.image || destination.image}
            alt={destination.name}
            className="h-28 w-full rounded-xl object-cover"
          />

          <div className="mt-2">
            <p className="font-black text-white text-sm">
              {destination.name}
            </p>
            <p className="text-[11px] text-white/70">
              {destination.floor}
            </p>
            <p className="text-xs font-bold text-cyan-400 mt-1">
              ETA: {destination.eta}
            </p>
          </div>
        </div>
      </div>

      {/* DISTANCE CARD */}
      <div className="absolute right-3 top-28 z-30">
        <div className="glass-strong rounded-2xl px-4 py-3 text-center shadow-neon min-w-[92px]">
          <p className="text-2xl font-black text-cyan-400">
            {remainingDistance.toFixed(1)}
          </p>
          <p className="text-[10px] uppercase text-white/60">
            meters left
          </p>
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="absolute inset-x-0 bottom-0 z-30 p-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-strong rounded-3xl p-4 shadow-neon"
          >
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-gradient-neon flex items-center justify-center shadow-neon">
                {dirIcon(step.direction)}
              </div>

              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary">
                  {isArrival ? "Destination" : "Next Step"}
                </p>

                <p className="text-base font-bold text-white leading-tight">
                  {step.instruction}
                </p>

                {!isArrival && (
                  <p className="text-sm text-white/70 mt-1">
                    {step.distance} m
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={nextStep}
              className="mt-4 w-full rounded-2xl bg-gradient-neon py-3 text-lg font-black text-primary-foreground shadow-neon"
            >
              {isArrival ? "I'm Here →" : "Next Step →"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ARNavigation;