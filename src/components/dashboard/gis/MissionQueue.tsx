import {
  ArrowRight,
  MapPinned,
  TriangleAlert,
} from "lucide-react";

const missions = [
  {
    title: "Ring Road Package-II",
    priority: "Critical",
  },
  {
    title: "Sector-5 Encroachment",
    priority: "High",
  },
  {
    title: "Revenue Inspection",
    priority: "Medium",
  },
];

export default function MissionQueue() {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <div className="mb-5 flex items-center gap-3">

        <MapPinned className="text-cyan-400" />

        <div>

          <h3 className="font-semibold text-white">
            Mission Queue
          </h3>

          <p className="text-xs text-slate-400">
            Suggested Field Visits
          </p>

        </div>

      </div>

      <div className="space-y-3">

        {missions.map((mission) => (

          <button
            key={mission.title}
            className="flex w-full items-center justify-between rounded-xl bg-slate-800 p-4 hover:bg-slate-700"
          >

            <div className="text-left">

              <p className="font-medium text-white">
                {mission.title}
              </p>

              <div className="mt-1 flex items-center gap-2">

                <TriangleAlert
                  size={14}
                  className="text-red-400"
                />

                <span className="text-xs text-slate-400">
                  {mission.priority}
                </span>

              </div>

            </div>

            <ArrowRight size={18} />

          </button>

        ))}

      </div>

    </div>

  );

}