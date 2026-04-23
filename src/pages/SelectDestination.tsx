// src/pages/SelectDestination.tsx
// FULL CORRECTED VERSION
// Added search
// Added destination photos
// Better mobile UI
// Smooth animations
// Works with your destinations.ts

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { destinations } from "@/data/destinations";
import MobileFrame from "@/components/layout/MobileFrame";
import PageHeader from "@/components/layout/PageHeader";
import {
  ChevronRight,
  Clock,
  Search,
  MapPin,
} from "lucide-react";
import { useMemo, useState } from "react";

const categories = [
  "All",
  "Lab",
  "Classroom",
  "Facility",
  "Event",
  "Room",
] as const;

const SelectDestination = () => {
  const [filter, setFilter] =
    useState<(typeof categories)[number]>("All");

  const [search, setSearch] =
    useState("");

  const filteredList = useMemo(() => {
    return destinations.filter((item) => {
      const matchCategory =
        filter === "All"
          ? true
          : item.category === filter;

      const matchSearch =
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchCategory &&
        matchSearch
      );
    });
  }, [filter, search]);

  return (
    <MobileFrame>
      <PageHeader
        title="Choose Destination"
        subtitle="Tap any place to start smart AR navigation"
      />

      {/* SEARCH */}
      <div className="px-5 pb-4">
        <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
          <Search className="h-4 w-4 text-primary" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search lab, washroom, canteen..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* FILTER */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setFilter(cat)
            }
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${
              filter === cat
                ? "bg-gradient-neon text-primary-foreground shadow-neon"
                : "glass text-muted-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* DESTINATIONS */}
      <div className="flex flex-col gap-4 px-5 pb-8">
        {filteredList.length === 0 && (
          <div className="glass rounded-2xl p-5 text-center text-sm text-muted-foreground">
            No destination found
          </div>
        )}

        {filteredList.map(
          (item, index) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index * 0.05,
              }}
            >
              <Link
                to={`/ar-navigation/${item.id}`}
                className="glass block overflow-hidden rounded-3xl active:scale-[0.98] transition-transform"
              >
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={
                      item.image
                    }
                    alt={
                      item.name
                    }
                    className="h-36 w-full object-cover"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {
                          item.icon
                        }
                      </span>

                      <div>
                        <h3 className="font-display text-lg font-black text-white">
                          {
                            item.name
                          }
                        </h3>

                        <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300">
                          {
                            item.category
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {
                      item.description
                    }
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {
                          item.floor
                        }
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {
                          item.eta
                        }
                      </span>
                    </div>

                    <ChevronRight className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        )}
      </div>
    </MobileFrame>
  );
};

export default SelectDestination;