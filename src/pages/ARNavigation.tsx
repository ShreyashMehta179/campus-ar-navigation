import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowUp, ArrowDown, ArrowLeftCircle, ArrowRightCircle,
  CornerUpLeft, CornerUpRight, MapPin, X,
} from "lucide-react";
import { getDestination } from "@/data/destinations";
import CameraView from "@/components/ar/CameraView";
import ARScene from "@/components/ar/ARScene";

const dirIcon = (d: string) => {
  switch (d) {
    case "left": return <CornerUpLeft className="h-6 w-6" />;
    case "right": return <CornerUpRight className="h-6 w-6" />;
    case "up": return <ArrowUp className="h-6 w-6" />;
    case "down": return <ArrowDown className="h-6 w-6" />;
    case "arrive": return <MapPin className="h-6 w-6" />;
    default: return <ArrowUp className="h-6 w-6" />;
  }
};

const ARNavigation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dest = getDestination(id ?? "");
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!dest) navigate("/select-destination", { replace: true });
  }, [dest, navigate]);

  if (!dest) return null;

  const step = dest.route[stepIndex];
  const isArrival = step?.direction === "arrive";
  const totalSteps = dest.route.length;
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  const next = () => {
    if (stepIndex < totalSteps - 1) setStepIndex((i) => i + 1);
    else navigate(`/success/${dest.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      {/* Camera background */}
      <CameraView />

      {/* AR overlay */}
      <div className="absolute inset-0">
        <ARScene steps={dest.route} stepIndex={stepIndex} />
      </div>

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-20 p-4">
        <div className="glass-strong flex items-center gap-3 rounded-2xl p-3">
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/40"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-widest text-primary">Navigating to</p>
            <p className="truncate font-display font-bold">{dest.name}</p>
          </div>
          <button
            onClick={() => navigate("/")}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background/40">
          <motion.div
            className="h-full bg-gradient-neon"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="mt-1.5 text-center text-[11px] text-foreground/80">
          Step {stepIndex + 1} of {totalSteps}
          {step.landmark && ` · ${step.landmark}`}
        </p>
      </div>

      {/* Distance HUD */}
      {!isArrival && step.distance > 0 && (
        <div className="pointer-events-none absolute right-4 top-32 z-20">
          <div className="glass-strong rounded-2xl px-4 py-2 text-center">
            <p className="font-display text-2xl font-black neon-text leading-none">
              {step.distance}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">meters</p>
          </div>
        </div>
      )}

      {/* Bottom instruction card */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong rounded-3xl p-5"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-neon text-primary-foreground shadow-neon">
                {dirIcon(step.direction)}
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-primary">
                  {isArrival ? "Destination" : "Next move"}
                </p>
                <p className="font-display text-base font-bold leading-tight">
                  {step.instruction}
                </p>
              </div>
            </div>

            <button
              onClick={next}
              className="mt-4 w-full rounded-2xl bg-gradient-neon py-3 font-display font-bold text-primary-foreground shadow-neon active:scale-[0.99]"
            >
              {isArrival ? "I'm Here →" : "Next Step →"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Side direction indicator (left/right turn) */}
      {(step.direction === "left" || step.direction === "right") && !isArrival && (
        <div
          className={`pointer-events-none absolute top-1/2 z-20 -translate-y-1/2 ${
            step.direction === "left" ? "left-3" : "right-3"
          }`}
        >
          <div className="glass-strong flex h-16 w-16 animate-float-y items-center justify-center rounded-full text-primary shadow-neon">
            {step.direction === "left" ? (
              <ArrowLeftCircle className="h-10 w-10" />
            ) : (
              <ArrowRightCircle className="h-10 w-10" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ARNavigation;