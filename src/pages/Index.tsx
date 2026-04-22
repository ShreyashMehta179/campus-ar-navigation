import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation, MapPin, CalendarClock, Sparkles } from "lucide-react";
import MobileFrame from "@/components/layout/MobileFrame";

const Index = () => {
  return (
    <MobileFrame>
      <div className="px-5 pb-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">DYPSEM · Kolhapur</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Hackathon AR Companion</p>
          </div>
          <div className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-[11px] font-medium">LIVE</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 font-display text-[40px] font-black leading-[1.05] tracking-tight"
        >
          Hackoutsav
          <br />
          <span className="neon-text">AR Navigation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 max-w-[320px] text-sm text-muted-foreground"
        >
          Find your lab with live camera directions. Floating arrows guide you through the campus in real time.
        </motion.p>

        {/* Hero visual — placeholder, easy to replace with a real campus photo later */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-7 overflow-hidden rounded-3xl glass relative aspect-[4/3]"
        >
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 grid-bg opacity-60" />
          {/* Decorative AR-like overlays */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 -m-4 rounded-full border border-primary/40 animate-pulse-ring" />
              <div className="absolute inset-0 -m-2 rounded-full border border-secondary/40 animate-pulse-ring [animation-delay:600ms]" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-neon shadow-neon">
                <Navigation className="h-9 w-9 text-primary-foreground" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <div className="absolute left-4 top-4 glass rounded-xl px-3 py-1.5 text-[11px] font-medium">
            <span className="text-primary">●</span> Camera ready
          </div>
          <div className="absolute right-4 top-4 glass rounded-xl px-3 py-1.5 text-[11px]">
            Lab 110 · 20 m
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass rounded-xl px-3 py-1.5 text-[11px]">
            ↑ Walk straight
          </div>
        </motion.div>

        <div className="mt-7 flex flex-col gap-3">
          <Link
            to="/select-destination"
            className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-neon p-[1px]"
          >
            <span className="flex w-full items-center justify-between rounded-2xl bg-background px-5 py-4 transition-colors group-active:bg-background/70">
              <span className="flex items-center gap-3">
                <Navigation className="h-5 w-5 text-primary" />
                <span className="font-display font-bold">Start Navigation</span>
              </span>
              <span className="text-xs text-muted-foreground">→</span>
            </span>
          </Link>

          <Link
            to="/select-destination"
            className="glass flex items-center justify-between rounded-2xl px-5 py-4"
          >
            <span className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-secondary" />
              <span className="font-medium">Choose Destination</span>
            </span>
            <span className="text-xs text-muted-foreground">11 places</span>
          </Link>

          <Link
            to="/schedule"
            className="glass flex items-center justify-between rounded-2xl px-5 py-4"
          >
            <span className="flex items-center gap-3">
              <CalendarClock className="h-5 w-5 text-accent" />
              <span className="font-medium">View Schedule</span>
            </span>
            <span className="text-xs text-muted-foreground">7 events</span>
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-2 text-[11px] text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          <span>Best on Chrome (Android) — point camera ahead.</span>
        </div>
      </div>
    </MobileFrame>
  );
};

export default Index;