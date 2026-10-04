import React from "react";
import { motion } from "framer-motion";
import {
  type LucideIcon,
  FolderOpen,
  Building2,
  Users,
  FileText,
  IndianRupee,
  Map,
  ShieldCheck,
  Brain,
  ArrowRight,
} from "lucide-react";

interface WorkspaceAction {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

const actions: WorkspaceAction[] = [
  {
    title: "Projects",
    subtitle: "186 Active",
    icon: Building2,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Citizens",
    subtitle: "Service Requests",
    icon: Users,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Files",
    subtitle: "Pending Approvals",
    icon: FileText,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    title: "Revenue",
    subtitle: "Financial Dashboard",
    icon: IndianRupee,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    title: "GIS Map",
    subtitle: "City Intelligence",
    icon: Map,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    title: "Compliance",
    subtitle: "Audit Status",
    icon: ShieldCheck,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
];

const QuickLaunchWorkspace: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border border-slate-800/70 bg-[#09111D]"
    >
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between border-b border-slate-800/70 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">

            <FolderOpen
              size={22}
              className="text-cyan-400"
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-[1.2px] text-cyan-400">
              Executive Workspace
            </p>

            <h2 className="text-lg font-semibold text-white">
              Quick Launch Workspace
            </h2>

          </div>

        </div>

        <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1">

          <span className="text-xs font-semibold text-cyan-400">
            6 Modules
          </span>

        </div>

      </div>

      {/* ================= GRID ================= */}

      <div className="grid grid-cols-2 gap-5 p-6">

        {actions.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.title}
              className="group rounded-2xl border border-slate-700 bg-slate-900/40 p-5 text-left transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-900/70"
            >

              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}
              >

                <Icon
                  size={24}
                  className={item.color}
                />

              </div>

              <h3 className="text-base font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {item.subtitle}
              </p>

            </button>

          );

        })}

      </div>

      {/* ================= AI SHORTCUT ================= */}

      <div className="mx-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

        <div className="flex items-start gap-4">

          <div className="rounded-xl bg-cyan-500/10 p-3">

            <Brain
              size={22}
              className="text-cyan-400"
            />

          </div>

          <div className="flex-1">

            <h3 className="font-semibold text-white">
              AI Workspace Assistant
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Ask AI to open any department, generate executive reports,
              prepare meeting briefs, or navigate directly to any module.
            </p>

          </div>

        </div>

      </div>

      {/* ================= FOOTER ================= */}

      <div className="border-t border-slate-800/70 p-6">

        <button
          className="flex w-full items-center justify-center rounded-2xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >

          Open Executive Workspace

          <ArrowRight
            size={18}
            className="ml-2"
          />

        </button>

      </div>

    </motion.section>
  );
};

export default QuickLaunchWorkspace;