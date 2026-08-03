import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import type { SidebarItemProps } from "./types";

export default function SidebarItem({
    item,
    collapsed,
    active,
    onClick,
}: SidebarItemProps) {
    const Icon = item.icon;

    return (
        <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
                group
                relative
                flex
                w-full
                items-center
                rounded-xl
                transition-all
                duration-200
                px-3
                py-1.5
                ${
                    active
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-400/30 text-cyan-300 shadow-lg shadow-cyan-500/10"
                        : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                }
            `}
        >
            {active && (
                <motion.div
                    layoutId="activeSidebarIndicator"
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-cyan-400"
                />
            )}

            <div
                className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    transition-colors
                    ${
                        active
                            ? "bg-cyan-500/15"
                            : "group-hover:bg-slate-700"
                    }
                `}
            >
                <Icon className="h-[18px] w-[18px]" />
            </div>

            {!collapsed && (
                <>
                    <div className="ml-2.5 flex-1 text-left">
                        <div className="text-[14px] font-medium">
                            {item.title}
                        </div>

                        {item.badge && (
                            <div className="mt-1 text-xs text-cyan-300">
                                {item.badge}
                            </div>
                        )}
                    </div>

                    <ChevronRight
                        className={`
                            h-3.5
                            w-3.5
                            transition-transform
                            ${
                                active
                                    ? "translate-x-0 text-cyan-300"
                                    : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            }
                        `}
                    />
                </>
            )}
        </motion.button>
    );
}