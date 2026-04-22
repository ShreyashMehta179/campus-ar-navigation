import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { destinations } from "@/data/destinations";
import MobileFrame from "@/components/layout/MobileFrame";
import PageHeader from "@/components/layout/PageHeader";
import { ChevronRight, Clock } from "lucide-react";
import { useMemo, useState } from "react";

const categories = ["All", "Lab", "Classroom", "Facility", "Event"] as const;

const SelectDestination = () => {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const list = useMemo(
    () => (filter === "All" ? destinations : destinations.filter((d) => d.category === filter)),
    [filter]
  );

  return (
    <MobileFrame>
      <PageHeader title="Choose Destination" subtitle="Tap a place to start AR navigation" />

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              filter === c
                ? "bg-gradient-neon text-primary-foreground shadow-neon"
                : "glass text-muted-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 px-5 pb-6">
        {list.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to={`/ar-navigation/${d.id}`}
              className="glass flex items-center gap-4 rounded-2xl p-4 transition-transform active:scale-[0.98]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-hero text-2xl">
                {d.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold">{d.name}</h3>
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                    {d.category}
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground">{d.description}</p>
                <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span>{d.floor}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {d.eta}
                  </span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-primary" />
            </Link>
          </motion.div>
        ))}
      </div>
    </MobileFrame>
  );
};

export default SelectDestination;