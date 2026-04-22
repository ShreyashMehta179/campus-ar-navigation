import { NavLink } from "react-router-dom";
import { Home, Navigation, CalendarClock } from "lucide-react";

const items = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/select-destination", icon: Navigation, label: "Navigate" },
  { to: "/schedule", icon: CalendarClock, label: "Schedule" },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-3 left-1/2 z-50 w-[92%] max-w-[460px] -translate-x-1/2">
      <div className="glass-strong flex items-center justify-around rounded-2xl px-2 py-2">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[11px] font-medium transition-all ${
                isActive
                  ? "bg-primary/15 text-primary shadow-neon"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <Icon className="h-5 w-5" strokeWidth={2.2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;