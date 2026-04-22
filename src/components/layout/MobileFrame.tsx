import { ReactNode } from "react";
import BottomNav from "./BottomNav";

type Props = { children: ReactNode; hideNav?: boolean };

const MobileFrame = ({ children, hideNav }: Props) => {
  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[480px] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      <div className="relative z-10 min-h-screen safe-bottom">{children}</div>
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default MobileFrame;