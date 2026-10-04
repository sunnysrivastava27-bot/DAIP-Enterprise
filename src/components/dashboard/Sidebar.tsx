import React from "react";
import {
  LayoutDashboard,
  IndianRupee,
  Building2,
  Cuboid,
  Users,
  Landmark,
  Layers3,
  Map,
  ClipboardCheck,
  BarChart3,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MenuItem {
  title: string;
  icon: LucideIcon;
  active?: boolean;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Revenue Intelligence",
    icon: IndianRupee,
  },
  {
    title: "Projects Intelligence",
    icon: Building2,
  },
  {
    title: "Digital Twin",
    icon: Cuboid,
  },
  {
    title: "Citizen Intelligence",
    icon: Users,
  },
  {
    title: "Finance Intelligence",
    icon: Landmark,
  },
  {
    title: "Assets Management",
    icon: Layers3,
  },
  {
    title: "Land Bank",
    icon: Map,
  },
  {
    title: "Meetings & Approvals",
    icon: ClipboardCheck,
  },
  {
    title: "Reports & Analytics",
    icon: BarChart3,
  },
  {
    title: "Administration",
    icon: ShieldCheck,
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside
      className="
        flex
        h-full
        w-full
        flex-col
        bg-red-600
        overflow-hidden
        outline
        outline-2
        outline-green-500
      "
    >
      {/* ======================================================
          LOGO
      ======================================================= */}

      <div
        className="
          flex
          h-[82px]
          items-center
          justify-center
          border-b
          border-slate-800/70
          px-4
        "
      >
        <img
          src="/logos/daip-logo.png"
          alt="DAIP"
          className="h-[58px] w-auto object-contain"
        />
      </div>

      {/* ======================================================
          NAVIGATION
      ======================================================= */}

      <nav
        className="
          flex-1
          min-h-0
          overflow-y-auto
          overflow-x-hidden
          px-3
          py-1
          outline
          outline-2
          outline-blue-500
        "
      >
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                className={`
                  flex
                  w-full
                  items-center
                  gap-2.5
                  rounded-xl
                  px-3
                  py-1.5
                  text-left
                  transition-all
                  ${
                    item.active
                      ? "bg-cyan-500/10 border border-cyan-500/40 text-cyan-300"
                      : "border border-transparent text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  }
                `}
              >
                <Icon
                  size={17}
                  className="shrink-0"
                />

                <span className="text-[14px] font-medium leading-5">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ======================================================
          FOOTER
      ======================================================= */}

      <div className="border-t border-slate-800/70 px-3 py-1.5">
        <button
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            py-2.5
            text-sm
            font-medium
            text-slate-300
            transition
            hover:border-cyan-500/40
            hover:bg-slate-800
          "
        >
          <ChevronLeft size={16} />

          Collapse
        </button>

        <p className="mt-3 text-center text-[11px] text-slate-500">
          Enterprise v2.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;