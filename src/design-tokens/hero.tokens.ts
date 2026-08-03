import theme from "../design-system/theme";

export const heroTokens = {
  layout: {
    height: "h-[360px]",

    grid: "grid-cols-[420px_minmax(0,1fr)_340px]",

    wrapper: "overflow-hidden rounded-3xl",

    padding: "p-8",
  },

  panel: {
    background: `bg-[${theme.colors.background.panel}]`,

    border: "border border-slate-800/70",

    divider: "border-slate-800/40",

    radius: "rounded-3xl",
  },

  greeting: {
    padding: "px-8 py-8",
  },

  twin: {
    padding: "p-8",
  },

  brief: {
    padding: "px-8 py-8",
  },
};

export default heroTokens;