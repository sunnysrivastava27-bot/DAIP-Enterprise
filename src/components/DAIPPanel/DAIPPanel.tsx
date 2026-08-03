import type { DAIPPanelProps } from "./types";
import clsx from "clsx";

const paddingMap = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

const variantMap = {
  default: "bg-slate-800 border border-slate-700",
  glass:
    "bg-slate-800/60 backdrop-blur-md border border-slate-700/50",
  outlined: "bg-transparent border border-slate-700",
};

export default function DAIPPanel({
  title,
  subtitle,
  actions,
  children,
  className,
  variant = "default",
  padding = "md",
  loading = false,
}: DAIPPanelProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl shadow-lg transition-all duration-300",
        variantMap[variant],
        className
      )}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-white">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="text-sm text-slate-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}

      <div className={paddingMap[padding]}>
        {loading ? (
          <div className="text-slate-400">Loading...</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}