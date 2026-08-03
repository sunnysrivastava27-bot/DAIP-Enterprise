import SidebarItem from "./SidebarItem";
import { SIDEBAR_SECTIONS } from "./constants";

import type { SidebarNavigationProps } from "./types";

export default function SidebarNavigation({
    collapsed,
    activeMenu,
    onMenuSelect,
}: SidebarNavigationProps) {
    return (
        <nav className="flex-1 overflow-y-auto px-3 py-2">
            <div className="space-y-6">
                {SIDEBAR_SECTIONS.map((section) => (
                    <div key={section.id}>
                        {/* Hidden for now to match the DAIP Enterprise design.
                            Keep this block for future use if section headings
                            are needed again.

                        {!collapsed && (
                            <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                {section.title}
                            </div>
                        )}
                        */}

                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <SidebarItem
                                    key={item.id}
                                    item={item}
                                    collapsed={collapsed}
                                    active={activeMenu === item.id}
                                    onClick={() => onMenuSelect(item.id)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </nav>
    );
}