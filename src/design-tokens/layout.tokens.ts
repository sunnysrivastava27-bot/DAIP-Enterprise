/**
 * ==========================================================
 * DAIP Enterprise
 * Global Layout Tokens
 * ==========================================================
 *
 * Single source of truth for the application shell.
 *
 * Used by:
 * - DashboardLayout
 * - Sidebar
 * - TopBar
 * - ChairmanDashboardV3
 * - Future dashboards
 */

export const layoutTokens = {
  /* ======================================================
   * APPLICATION SHELL
   * ==================================================== */

  shell: {
    headerHeight: 80,

    sidebarWidth: 220,

    rightRailWidth: 220,
  },

  /* ======================================================
   * PAGE
   * ==================================================== */

  page: {
    padding: 6,

    columnGap: 16,

    rowGap: 12,
  },

  /* ======================================================
   * SIDEBAR
   * ==================================================== */

  sidebar: {
    headerHeight: 80,

    footerHeight: 74,

    navigationPaddingY: 4,

    navigationPaddingX: 12,

    itemGap: 4,
  },

  /* ======================================================
   * HERO LAYOUT
   * ==================================================== */

  dashboard: {
    heroRatio: 0.39,

    executiveRatio: 0.16,

    operationsRatio: 0.16,
  },
} as const;

export default layoutTokens;