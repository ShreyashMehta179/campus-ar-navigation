import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Navigation, CalendarClock } from "lucide-react";
import MobileFrame from "@/components/layout/MobileFrame";
import { getDestination } from "@/data/destinations";

const Success = () => {
  const { id } = useParams();
  const dest = getDestination(id ?? "");

  return (
    <MobileFrame>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 14 }}
          className="relative"
        >
          <div className="absolute inset-0 -m-6 rounded-full border border-primary/40 animate-pulse-ring" />
          <div className="absolute inset-0 -m-3 rounded-full border border-secondary/40 animate-pulse-ring [animation-delay:600ms]" />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-neon shadow-neon">
            <Check className="h-14 w-14 text-primary-foreground" strokeWidth={3} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 font-display text-3xl font-black"
        >
          You reached
          <br />
          <span className="neon-text">{dest?.name ?? "your destination"}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-3 max-w-[300px] text-sm text-muted-foreground"
        >
          Great! Enjoy the session and check the schedule for what's next.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex w-full max-w-[320px] flex-col gap-3"
        >
          <Link
            to="/schedule"
            className="glass flex items-center justify-center gap-2 rounded-2xl px-5 py-4 font-medium"
          >
            <CalendarClock className="h-5 w-5 text-primary" /> View Schedule
          </Link>
          <Link
            to="/select-destination"
            className="rounded-2xl bg-gradient-neon px-5 py-4 font-display font-bold text-primary-foreground shadow-neon"
          >
            <span className="inline-flex items-center gap-2">
              <Navigation className="h-5 w-5" /> Navigate Again
            </span>
          </Link>
        </motion.div>
      </div>
    </MobileFrame>
  );
};

export default Success;