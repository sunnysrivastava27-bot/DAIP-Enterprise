import {
  CheckCircle2,
  Clock3,
  AlertTriangle,
  TrendingUp,
  IndianRupee,
  FolderKanban,
} from "lucide-react";

const projects = [
  {
    title: "Smart City Road Expansion",
    progress: 82,
    status: "On Track",
    color: "bg-emerald-500",
  },
  {
    title: "Affordable Housing Scheme",
    progress: 61,
    status: "Needs Attention",
    color: "bg-amber-500",
  },
  {
    title: "Drainage Improvement",
    progress: 34,
    status: "Delayed",
    color: "bg-red-500",
  },
];

const stats = [
  {
    title: "Active Projects",
    value: "126",
    icon: FolderKanban,
    color: "text-cyan-400",
  },
  {
    title: "Completed",
    value: "89",
    icon: CheckCircle2,
    color: "text-emerald-400",
  },
  {
    title: "Delayed",
    value: "11",
    icon: Clock3,
    color: "text-amber-400",
  },
  {
    title: "Critical",
    value: "4",
    icon: AlertTriangle,
    color: "text-red-400",
  },
];

export default function ProjectStatus() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B1E33] p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-semibold text-white">
            Project Status & Analytics
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Real-time monitoring of development projects
          </p>
        </div>

        <div className="rounded-xl bg-cyan-500/10 px-4 py-2 border border-cyan-400/20">
          <span className="text-cyan-300 text-sm font-medium">
            Live Dashboard
          </span>
        </div>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-slate-900/40 p-4"
            >
              <div className="flex items-center justify-between">

                <Icon className={`h-6 w-6 ${item.color}`} />

                <span className="text-2xl font-bold text-white">
                  {item.value}
                </span>

              </div>

              <div className="mt-3 text-sm text-slate-400">
                {item.title}
              </div>

            </div>
          );
        })}
      </div>

      {/* Projects */}

      <div className="space-y-5">

        {projects.map((project) => (
          <div
            key={project.title}
            className="rounded-xl border border-white/10 bg-slate-900/30 p-4"
          >
            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-white font-medium">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  {project.status}
                </p>

              </div>

              <span className="text-cyan-300 font-semibold">
                {project.progress}%
              </span>

            </div>

            <div className="mt-4 h-2 rounded-full bg-slate-700 overflow-hidden">

              <div
                className={`${project.color} h-full rounded-full`}
                style={{
                  width: `${project.progress}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

      {/* Bottom Analytics */}

      <div className="grid grid-cols-2 gap-5 mt-6">

        <div className="rounded-xl bg-slate-900/40 border border-white/10 p-5">

          <div className="flex items-center gap-3">

            <IndianRupee className="text-emerald-400" />

            <h3 className="text-white font-medium">
              Budget Utilization
            </h3>

          </div>

          <div className="mt-4 text-3xl font-bold text-white">
            ₹842 Cr
          </div>

          <div className="text-sm text-slate-400 mt-2">
            76% of approved budget utilized.
          </div>

        </div>

        <div className="rounded-xl bg-slate-900/40 border border-white/10 p-5">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-cyan-400" />

            <h3 className="text-white font-medium">
              AI Executive Insight
            </h3>

          </div>

          <p className="text-sm text-slate-300 leading-6 mt-4">
            Overall execution is healthy. Housing and Drainage
            projects require executive review due to schedule
            variance exceeding 15%. Recommended focus on
            contractor performance and fund utilization.
          </p>

        </div>

      </div>

    </div>
  );
}