/**
 * ==========================================================
 * DAIP Enterprise V3
 * Right Rail Design Tokens
 * ==========================================================
 *
 * Single Source of Truth
 *
 * LiveFeeds
 * UpcomingMeetings
 * ViewCalendar
 * VoiceCommand
 *
 * No hardcoded spacing or sizing inside components.
 */

const rightRailTokens = {
  /* ======================================================
     LAYOUT
  ====================================================== */

  layout: {
    gap: "gap-3",

    sectionRadius: "rounded-2xl",

    sectionBorder: "border border-slate-800/70",

    sectionBackground: "bg-[#09111D]",

    overflow: "overflow-hidden",
  },

  /* ======================================================
     HEADER
  ====================================================== */

  header: {
    padding: "px-4 py-3",

    border: "border-b border-slate-800/70",

    title: "text-sm font-semibold text-white",

    caption:
      "text-[11px] uppercase tracking-[0.22em] text-cyan-400",

    icon: "text-cyan-400",

    iconSize: 18,
  },

  /* ======================================================
     CARD
  ====================================================== */

  card: {
    padding: "p-3",

    gap: "space-y-2",

    radius: "rounded-xl",

    border: "border border-slate-800/70",

    background: "bg-[#0D1726]",

    hover:
      "hover:border-cyan-500/40 hover:bg-[#111E30] transition-all duration-300",
  },

  /* ======================================================
     LIVE FEEDS
  ====================================================== */

  liveFeed: {
    dotSize: "h-2.5 w-2.5",

    title:
      "text-sm font-semibold text-white",

    status:
      "text-xs leading-5 text-slate-400",
  },

  /* ======================================================
     MEETINGS
  ====================================================== */

  meetings: {
    time:
      "text-sm font-semibold text-white",

    title:
      "text-xs leading-5 text-slate-400",
  },

  /* ======================================================
     VIEW CALENDAR
  ====================================================== */

  calendar: {
    padding: "px-4 py-3",

    title:
      "text-sm font-semibold text-cyan-400",

    hover:
      "hover:text-cyan-300 transition-colors",
  },

  /* ======================================================
     VOICE COMMAND
  ====================================================== */

  voice: {
    padding: "p-4",

    orbSize: "h-24 w-24",

    orbBackground: "bg-cyan-500/10",

    orbBorder: "border border-cyan-500/30",

    innerRing:
      "absolute inset-2 rounded-full border border-cyan-400/20",

    title:
      "text-sm font-semibold text-white",

    description:
      "text-xs leading-5 text-slate-400 text-center",

    button:
      "mt-5 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-colors",

    footer:
      "text-[11px] text-slate-500 text-center mt-3",
  },

  /* ======================================================
     TYPOGRAPHY
  ====================================================== */

  typography: {
    title: "text-sm font-semibold",

    body: "text-sm",

    caption: "text-xs",

    micro: "text-[11px]",
  },
} as const;

export default rightRailTokens;