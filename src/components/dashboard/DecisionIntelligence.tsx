import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Cpu,
  Eye,
  Gauge,
  Landmark,
  Radar,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface CriticalDecision {
  title: string;
  department: string;
  priority: "Critical" | "High" | "Medium";
  risk: number;
}

interface IntelligenceMetric {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  color: string;
}

const metrics: IntelligenceMetric[] = [
  {
    title: "AI Confidence",
    value: "98.4%",
    subtitle: "Decision Engine Accuracy",
    icon: BrainCircuit,
    color: "text-cyan-400",
  },
  {
    title: "Risk Index",
    value: "12%",
    subtitle: "Overall Operational Risk",
    icon: AlertTriangle,
    color: "text-orange-400",
  },
  {
    title: "Forecast Reliability",
    value: "96%",
    subtitle: "Prediction Confidence",
    icon: TrendingUp,
    color: "text-emerald-400",
  },
  {
    title: "Departments Monitored",
    value: "18",
    subtitle: "Live Connected Systems",
    icon: Radar,
    color: "text-purple-400",
  },
];

const criticalDecisions: CriticalDecision[] = [
  {
    title: "Ring Road Package-II",
    department: "Engineering",
    priority: "Critical",
    risk: 89,
  },
  {
    title: "Sector-7 Building Approval",
    department: "Town Planning",
    priority: "High",
    risk: 64,
  },
  {
    title: "Contractor Payment Release",
    department: "Finance",
    priority: "Medium",
    risk: 38,
  },
];

export default function DecisionIntelligence() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-cyan-500/20 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl"
    >
      {/* ===========================================
          HEADER
      ============================================ */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/10 p-3">

            <BrainCircuit className="h-7 w-7 text-cyan-400" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Decision Intelligence
            </h2>

            <p className="text-sm text-slate-400">
              Live AI Decision Support Engine
            </p>

          </div>

        </div>

        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">

          <div className="flex items-center gap-2">

            <Sparkles className="h-4 w-4 text-emerald-400" />

            <span className="text-xs font-semibold tracking-wider text-emerald-400">
              AI ONLINE
            </span>

          </div>

        </div>

      </div>

      {/* ===========================================
          AI STATUS
      ============================================ */}

      <div className="mt-7 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-slate-800 p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-widest text-cyan-400">
              AI ENGINE STATUS
            </p>

            <h3 className="mt-2 text-xl font-bold text-white">
              All Intelligence Services Operational
            </h3>

          </div>

          <Cpu className="h-8 w-8 text-cyan-400" />

        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">

          {metrics.map((metric) => {

            const Icon = metric.icon;

            return (

              <div
                key={metric.title}
                className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4"
              >

                <div className="flex items-center justify-between">

                  <Icon className={`h-6 w-6 ${metric.color}`} />

                  <span className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}
                  </span>

                </div>

                <h4 className="mt-4 font-semibold text-white">
                  {metric.title}
                </h4>

                <p className="mt-1 text-xs text-slate-400">
                  {metric.subtitle}
                </p>

              </div>

            );

          })}

        </div>

      </div>
	        {/* ===========================================
          CRITICAL DECISION QUEUE
      ============================================ */}

      <div className="mt-7">

        <div className="mb-4 flex items-center gap-2">

          <AlertTriangle className="h-5 w-5 text-orange-400" />

          <h3 className="text-lg font-semibold text-white">
            Critical Decision Queue
          </h3>

        </div>

        <div className="space-y-4">

          {criticalDecisions.map((decision) => (

            <motion.div
              key={decision.title}
              whileHover={{
                x: 4,
              }}
              transition={{
                duration: 0.2,
              }}
              className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5"
            >

              <div className="flex items-start justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <h4 className="font-semibold text-white">
                      {decision.title}
                    </h4>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold
                      ${
                        decision.priority === "Critical"
                          ? "bg-red-500/10 text-red-400"
                          : decision.priority === "High"
                          ? "bg-orange-500/10 text-orange-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {decision.priority}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    {decision.department}
                  </p>

                </div>

                <ArrowRight className="h-5 w-5 text-cyan-400" />

              </div>

              <div className="mt-5">

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-xs uppercase tracking-wide text-slate-500">
                    Risk Probability
                  </span>

                  <span className="font-semibold text-orange-400">
                    {decision.risk}%
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-700">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${decision.risk}%`,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className={`h-full
                      ${
                        decision.risk >= 80
                          ? "bg-red-500"
                          : decision.risk >= 60
                          ? "bg-orange-500"
                          : "bg-yellow-500"
                      }`}
                  />

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

      {/* ===========================================
          RISK ASSESSMENT
      ============================================ */}

      <div className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">

        <div className="flex items-center gap-3">

          <Gauge className="h-6 w-6 text-orange-400" />

          <div>

            <h3 className="font-semibold text-white">
              Operational Risk Assessment
            </h3>

            <p className="text-sm text-slate-400">
              AI continuously evaluates operational indicators across all
              connected departments.
            </p>

          </div>

        </div>

        <div className="mt-6 space-y-5">

          <div>

            <div className="mb-2 flex justify-between">

              <span className="text-sm text-slate-300">
                Infrastructure Projects
              </span>

              <span className="font-semibold text-red-400">
                High Risk
              </span>

            </div>

            <div className="h-2 rounded-full bg-slate-700">

              <div className="h-full w-[84%] rounded-full bg-red-500" />

            </div>

          </div>

          <div>

            <div className="mb-2 flex justify-between">

              <span className="text-sm text-slate-300">
                Revenue Collection
              </span>

              <span className="font-semibold text-emerald-400">
                Stable
              </span>

            </div>

            <div className="h-2 rounded-full bg-slate-700">

              <div className="h-full w-[28%] rounded-full bg-emerald-500" />

            </div>

          </div>

          <div>

            <div className="mb-2 flex justify-between">

              <span className="text-sm text-slate-300">
                Citizen Services
              </span>

              <span className="font-semibold text-cyan-400">
                Excellent
              </span>

            </div>

            <div className="h-2 rounded-full bg-slate-700">

              <div className="h-full w-[18%] rounded-full bg-cyan-500" />

            </div>

          </div>

        </div>

      </div>
	        {/* ===========================================
          PREDICTIVE ANALYTICS
      ============================================ */}

      <div className="mt-8">

        <div className="mb-4 flex items-center gap-2">

          <TrendingUp className="h-5 w-5 text-cyan-400" />

          <h3 className="text-lg font-semibold text-white">
            Predictive Analytics
          </h3>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <motion.div
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5"
          >

            <Landmark className="h-7 w-7 text-emerald-400" />

            <p className="mt-5 text-xs uppercase tracking-wide text-slate-500">
              Revenue Forecast
            </p>

            <h2 className="mt-2 text-3xl font-bold text-emerald-400">
              ₹4.82 Cr
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Expected revenue by month-end based on current collection trends.
            </p>

          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5"
          >

            <BarChart3 className="h-7 w-7 text-cyan-400" />

            <p className="mt-5 text-xs uppercase tracking-wide text-slate-500">
              Project Completion
            </p>

            <h2 className="mt-2 text-3xl font-bold text-cyan-400">
              93%
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Predicted completion rate if current execution continues.
            </p>

          </motion.div>

        </div>

      </div>

      {/* ===========================================
          LIVE AI MONITORING
      ============================================ */}

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-800/60 p-5">

        <div className="mb-5 flex items-center gap-2">

          <Eye className="h-5 w-5 text-cyan-400" />

          <h3 className="text-lg font-semibold text-white">
            Live Monitoring Feed
          </h3>

        </div>

        <div className="space-y-4">

          {[
            {
              title: "Revenue collection exceeded today's target.",
              time: "2 min ago",
            },
            {
              title: "Engineering Department uploaded new DPR.",
              time: "6 min ago",
            },
            {
              title: "Citizen grievance backlog reduced by 8%.",
              time: "11 min ago",
            },
            {
              title: "Finance department released payment batch.",
              time: "19 min ago",
            },
          ].map((item) => (

            <motion.div
              key={item.title}
              whileHover={{ x: 3 }}
              className="flex items-start justify-between rounded-xl border border-slate-700 bg-slate-900/50 p-4"
            >

              <div>

                <p className="font-medium text-white">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {item.time}
                </p>

              </div>

              <Activity className="h-5 w-5 text-emerald-400" />

            </motion.div>

          ))}

        </div>

      </div>

      {/* ===========================================
          AI RECOMMENDATIONS
      ============================================ */}

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

        <div className="flex items-center gap-2">

          <BrainCircuit className="h-5 w-5 text-cyan-400" />

          <h3 className="text-lg font-semibold text-white">
            AI Recommended Actions
          </h3>

        </div>

        <div className="mt-5 space-y-3">

          {[
            "Approve Ring Road Package-II within 24 hours.",
            "Review pending building approvals in Sector-7.",
            "Allocate additional budget for drainage works.",
            "Schedule legal review for Zone-3 land dispute.",
          ].map((item) => (

            <motion.div
              key={item}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between rounded-xl border border-cyan-500/10 bg-slate-900/50 p-4"
            >

              <span className="text-sm text-cyan-100">
                {item}
              </span>

              <ArrowRight className="h-4 w-4 text-cyan-400" />

            </motion.div>

          ))}

        </div>

      </div>
	        {/* ===========================================
          DECISION CONFIDENCE
      ============================================ */}

      <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-widest text-slate-400">
              Decision Confidence
            </p>

            <h3 className="mt-2 text-4xl font-bold text-emerald-400">
              98.4%
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Based on real-time project progress, financial analytics,
              citizen services, GIS intelligence and historical trends.
            </p>

          </div>

          <ShieldCheck className="h-12 w-12 text-emerald-400" />

        </div>

      </div>

      {/* ===========================================
          AI ENGINE HEALTH
      ============================================ */}

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-800/60 p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-widest text-slate-500">
              AI ENGINE HEALTH
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              Operational Status
            </h3>

          </div>

          <div className="rounded-full bg-emerald-500/10 px-4 py-2">

            <span className="text-xs font-bold tracking-wider text-emerald-400">
              ALL SYSTEMS ACTIVE
            </span>

          </div>

        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">

          <div>

            <p className="text-xs text-slate-500">
              AI Models
            </p>

            <p className="mt-2 text-lg font-bold text-white">
              18
            </p>

          </div>

          <div>

            <p className="text-xs text-slate-500">
              Live Predictions
            </p>

            <p className="mt-2 text-lg font-bold text-cyan-400">
              264
            </p>

          </div>

          <div>

            <p className="text-xs text-slate-500">
              Accuracy
            </p>

            <p className="mt-2 text-lg font-bold text-emerald-400">
              98.4%
            </p>

          </div>

        </div>

      </div>

      {/* ===========================================
          FOOTER
      ============================================ */}

      <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-5">

        <div className="flex items-center gap-2 text-xs text-slate-500">

          <Activity className="h-4 w-4" />

          Last synchronized 30 seconds ago

        </div>

        <div className="flex items-center gap-2 text-xs text-cyan-400">

          <BrainCircuit className="h-4 w-4" />

          Powered by DAIP Decision Intelligence Engine

        </div>

      </div>

    </motion.div>

  );
}
