/**
 * ==========================================================
 * DAIP Enterprise V3
 * Executive Advisor Design Tokens
 * ==========================================================
 */

const executiveAdvisorTokens = {

    layout: {
        background: "bg-[#09111D]",
        border: "border border-slate-800/70",
        radius: "rounded-2xl",
        overflow: "overflow-hidden",
        padding: "p-4",
    },

    header: {
        caption:
            "text-[11px] uppercase tracking-[0.22em] text-cyan-400",
    },

    illustration: {
        background:
            "rounded-xl border border-slate-800 bg-[#0D1726]",
        height: "h-40",
    },

    recommendation: {
        label:
            "text-[10px] uppercase tracking-[0.18em] text-cyan-400",

        title:
            "mt-1 text-2xl font-semibold text-white",

        description:
            "mt-3 text-sm leading-6 text-slate-400",
    },

    stats: {
        wrapper:
            "grid grid-cols-3 gap-4 pt-5",

        value:
            "text-3xl font-bold text-emerald-400",

        label:
            "mt-1 text-[11px] uppercase tracking-wide text-slate-500",
    },

    buttons: {

        wrapper:
            "mt-6 grid grid-cols-2 gap-3",

        secondary:
            "rounded-xl border border-slate-700 bg-[#101826] py-3 text-sm font-medium text-slate-300 hover:border-cyan-500/40 hover:text-white transition-all",

        primary:
            "rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-all",
    },

} as const;

export default executiveAdvisorTokens;