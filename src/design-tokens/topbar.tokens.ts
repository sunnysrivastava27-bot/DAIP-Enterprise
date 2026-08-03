/**
 * ==========================================================
 * DAIP Enterprise
 * TopBar Design Tokens
 * ==========================================================
 *
 * Single source of truth for the entire TopBar module.
 * HeaderInfo
 * SearchBar
 * HeaderActions
 * TopBar
 *
 * No hardcoded sizing, spacing or layout values should exist
 * inside TopBar components unless absolutely necessary.
 */

export const topBarTokens = {
  /* ========================================================
   * HEADER
   * ====================================================== */

  header: {
    height: "h-[90px]",

    // Increased for better breathing space
    paddingX: "px-8",

    background: "bg-[#060B14]",

    border: "border-b border-slate-800/70",

    // Increased width so authority title doesn't feel compressed
    authorityWidth: "w-[280px]",
  },

  /* ========================================================
   * LAYOUT
   * ====================================================== */

  layout: {
    // Better spacing on left information block
    leftGap: "gap-8",

    leftSectionGap: "gap-8",

    // Date ↔ Weather spacing
    inlineGap: "gap-4",

    // Gives search bar more breathing room
    centerPadding: "px-10",

    // Notification ↔ AI ↔ Profile spacing
    rightGap: "gap-5",
  },

  /* ========================================================
   * SEARCH BAR
   * ====================================================== */

  search: {
    fullWidth: "w-full",

    // Slightly wider search field
    width: "max-w-[470px]",

    // Better responsive behaviour
    minWidth: "min-w-0",

    height: "h-12",

    radius: "rounded-2xl",

    paddingX: "px-4",

    border: "border border-slate-700/70",

    background: "bg-[#0B1220]",

    iconGap: "gap-3",

    shortcutGap: "gap-1",

    shortcutRadius: "rounded-lg",

    shortcutPadding: "px-2.5 py-1",

    shortcutBackground: "bg-[#111827]",

    shortcutBorder: "border border-slate-700",
  },

  /* ========================================================
   * BUTTONS
   * ====================================================== */

  button: {
    size: "h-12 w-12",

    radius: "rounded-xl",
  },

  /* ========================================================
   * AI ASSISTANT
   * ====================================================== */

  assistant: {
    height: "h-12",

    radius: "rounded-xl",

    paddingX: "px-4",

    gap: "gap-2",

    border: "border border-cyan-500/30",

    background: "bg-cyan-500/10",

    iconContainer:
      "flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/15",
  },

  /* ========================================================
   * USER PROFILE
   * ====================================================== */

  profile: {
    gap: "gap-3",

    paddingX: "px-1",

    radius: "rounded-xl",
  },

  /* ========================================================
   * AVATAR
   * ====================================================== */

  avatar: {
    size: "h-12 w-12",

    border: "border border-slate-700",

    radius: "rounded-full",
  },

  /* ========================================================
   * STATUS
   * ====================================================== */

  status: {
    dot: "h-2 w-2 rounded-full",
  },

  /* ========================================================
   * TYPOGRAPHY
   * ====================================================== */

  typography: {
    title: "text-sm font-semibold",

    body: "text-sm font-medium leading-none",

    caption: "text-xs",

    status: "text-xs font-medium",

    input: "text-sm",

    shortcut: "text-[11px]",
  },
} as const;

export default topBarTokens;