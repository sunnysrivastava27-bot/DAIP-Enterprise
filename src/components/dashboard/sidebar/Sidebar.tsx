import { useState } from "react";

import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState("dashboard");

    return (
        <aside
            className="
                h-full
                w-full
                border-r
                border-slate-800
                bg-[#050A13]
            "
        >
            <div className="flex h-full flex-col">
                <SidebarHeader />

                <SidebarNavigation
                    collapsed={collapsed}
                    activeMenu={activeMenu}
                    onMenuSelect={setActiveMenu}
                />

                <SidebarFooter
                    collapsed={collapsed}
                    onToggleCollapse={() =>
                        setCollapsed((prev) => !prev)
                    }
                />
            </div>
        </aside>
    );
}