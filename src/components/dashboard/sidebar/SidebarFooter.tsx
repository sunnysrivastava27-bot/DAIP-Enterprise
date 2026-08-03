import { ChevronLeft, ChevronRight } from "lucide-react";

import { BRAND } from "./constants";

import type { SidebarFooterProps } from "./types";

export default function SidebarFooter({
    collapsed,
    onToggleCollapse,
}: SidebarFooterProps) {
    return (
        <footer className="border-t border-slate-800 p-3">
            <button
                onClick={onToggleCollapse}
                className="
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-900
                    px-3
                    py-2.5
                    transition-all
                    duration-200
                    hover:border-cyan-500/40
                    hover:bg-slate-800
                "
            >
                {collapsed ? (
                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-cyan-300" />
                ) : (
                    <>
                        <ChevronLeft className="mr-2 h-5 w-5 text-slate-300 group-hover:text-cyan-300" />

                        <span className="text-sm font-medium text-slate-300 group-hover:text-white">
                            Collapse
                        </span>
                    </>
                )}
            </button>

            {!collapsed && (
                <div className="mt-3 text-center">
                    <div className="text-[11px] text-slate-500">
                        {BRAND.version}
                    </div>
                </div>
            )}
        </footer>
    );
}