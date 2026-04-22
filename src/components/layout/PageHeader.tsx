import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = { title: string; subtitle?: string; back?: boolean };

const PageHeader = ({ title, subtitle, back = true }: Props) => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center gap-3 px-5 pb-3 pt-6">
      {back && (
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="glass flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-transform active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}
      <div className="min-w-0">
        <h1 className="font-display text-xl font-bold tracking-wide text-foreground">{title}</h1>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </header>
  );
};

export default PageHeader;