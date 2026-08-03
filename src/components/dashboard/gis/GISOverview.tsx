import {
  FolderKanban,
  CircleDollarSign,
  TriangleAlert,
  Users,
  Activity,
} from "lucide-react";

const stats = [
  {
    title: "Projects",
    value: "148",
    icon: FolderKanban,
    color: "text-cyan-400",
  },
  {
    title: "Revenue",
    value: "₹42.8Cr",
    icon: CircleDollarSign,
    color: "text-green-400",
  },
  {
    title: "Complaints",
    value: "286",
    icon: Users,
    color: "text-yellow-400",
  },
  {
    title: "Critical",
    value: "34",
    icon: TriangleAlert,
    color: "text-red-400",
  },
];

export default function GISOverview() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <div className="mb-5 flex items-center justify-between">

        <div>
          <h3 className="text-lg font-semibold text-white">
            Today's Overview
          </h3>

          <p className="text-xs text-slate-400">
            Live Authority Status
          </p>

        </div>

        <Activity className="text-green-400" />

      </div>

      <div className="space-y-3">

        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
            >

              <div className="flex items-center gap-3">

                <Icon className={item.color} size={20} />

                <span className="text-sm text-slate-300">
                  {item.title}
                </span>

              </div>

              <span className="text-lg font-bold text-white">
                {item.value}
              </span>

            </div>

          );

        })}

      </div>

      <div className="mt-auto rounded-xl bg-green-500/10 p-4">

        <p className="text-xs text-green-400">
          SYSTEM STATUS
        </p>

        <h4 className="mt-1 font-semibold text-white">
          All Critical Services Online
        </h4>

      </div>

    </div>
  );
}