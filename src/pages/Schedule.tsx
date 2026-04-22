import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation, Clock } from "lucide-react";
import MobileFrame from "@/components/layout/MobileFrame";
import PageHeader from "@/components/layout/PageHeader";
import { schedule } from "@/data/schedule";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const Schedule = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const nowMin = now.getHours() * 60 + now.getMinutes();

  const { activeId, nextEvent, countdown } = useMemo(() => {
    let activeId: string | null = null;
    let nextEvent: typeof schedule[number] | null = null;

    for (let i = 0; i < schedule.length; i++) {
      const start = toMinutes(schedule[i].time);
      const end = i + 1 < schedule.length ? toMinutes(schedule[i + 1].time) : start + 60;
      if (nowMin >= start && nowMin < end) activeId = schedule[i].id;
      if (!nextEvent && start > nowMin) nextEvent = schedule[i];
    }

    let countdown = "";
    if (nextEvent) {
      const diffSec = (toMinutes(nextEvent.time) - nowMin) * 60 - now.getSeconds();
      const h = Math.floor(diffSec / 3600);
      const m = Math.floor((diffSec % 3600) / 60);
      const s = diffSec % 60;
      countdown = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    return { activeId, nextEvent, countdown };
  }, [nowMin, now]);

  return (
    <MobileFrame>
      <PageHeader title="Event Schedule" subtitle="Hackoutsav · DYPSEM Kolhapur" back={false} />

      {/* Countdown card */}
      {nextEvent && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-5 mt-2 overflow-hidden rounded-3xl bg-gradient-neon p-[1px] shadow-neon"
        >
          <div className="rounded-3xl bg-background p-5">
            <p className="text-[10px] uppercase tracking-widest text-primary">Next up</p>
            <p className="mt-1 font-display text-xl font-bold">{nextEvent.title}</p>
            <p className="text-xs text-muted-foreground">
              {nextEvent.label} · {nextEvent.venueName}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-display text-3xl font-black neon-text tabular-nums">{countdown}</p>
              <Link
                to={`/ar-navigation/${nextEvent.venueId}`}
                className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-neon"
              >
                <Navigation className="h-4 w-4" /> Navigate
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Timeline */}
      <div className="relative mt-6 px-5 pb-6">
        <div className="absolute bottom-6 left-[34px] top-2 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent" />

        {schedule.map((e, i) => {
          const isActive = e.id === activeId;
          const isPast = toMinutes(e.time) < nowMin && !isActive;
          return (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative mb-4 pl-12"
            >
              <div
                className={`absolute left-0 top-3 flex h-9 w-9 items-center justify-center rounded-full border-2 text-base ${
                  isActive
                    ? "border-primary bg-primary/15 shadow-neon animate-glow"
                    : isPast
                    ? "border-muted bg-muted text-muted-foreground"
                    : "border-secondary/60 bg-background"
                }`}
              >
                {e.icon}
              </div>

              <div
                className={`glass rounded-2xl p-4 ${
                  isActive ? "ring-2 ring-primary/60" : ""
                } ${isPast ? "opacity-60" : ""}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span className="font-medium tabular-nums">{e.label}</span>
                    {isActive && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                        Live
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="mt-1 font-display text-base font-bold">{e.title}</h3>
                <p className="text-xs text-muted-foreground">{e.description}</p>
                <Link
                  to={`/ar-navigation/${e.venueId}`}
                  className="mt-3 flex items-center justify-between rounded-xl bg-background/40 px-3 py-2 text-xs font-medium"
                >
                  <span className="flex items-center gap-1.5">
                    <Navigation className="h-3.5 w-3.5 text-primary" />
                    Navigate to {e.venueName}
                  </span>
                  <span className="text-primary">→</span>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </MobileFrame>
  );
};

export default Schedule;