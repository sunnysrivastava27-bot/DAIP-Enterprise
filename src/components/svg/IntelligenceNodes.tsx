import { motion } from "framer-motion";

const nodes = [
  {
    title: "Town Planning",
    value: "Connected",
    top: "16%",
    left: "47%",
    color: "#22D3EE",
  },
  {
    title: "Engineering",
    value: "Live",
    top: "34%",
    left: "18%",
    color: "#34D399",
  },
  {
    title: "Finance",
    value: "Synced",
    top: "34%",
    right: "18%",
    color: "#A78BFA",
  },
  {
    title: "Property",
    value: "Online",
    bottom: "18%",
    left: "24%",
    color: "#FB923C",
  },
  {
    title: "Citizen",
    value: "Active",
    bottom: "18%",
    right: "24%",
    color: "#F472B6",
  },
];

export default function IntelligenceNodes() {
  return (
    <>
      {nodes.map((node) => (
        <motion.div
          key={node.title}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: [0.75, 1, 0.75],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute z-30"
          style={{
            top: node.top,
            left: node.left,
            right: node.right,
            bottom: node.bottom,
          }}
        >
          {/* Pulse */}

          <motion.div
            animate={{
              scale: [1, 1.8],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute left-3 top-3 h-3 w-3 rounded-full"
            style={{
              background: node.color,
            }}
          />

          {/* Card */}

          <div className="rounded-xl border border-slate-700/70 bg-slate-900/90 px-4 py-3 shadow-2xl backdrop-blur-md">

            <div className="flex items-center gap-3">

              <div
                className="h-3 w-3 rounded-full"
                style={{
                  background: node.color,
                }}
              />

              <div>

                <h4 className="text-sm font-semibold text-white">

                  {node.title}

                </h4>

                <p className="text-xs text-slate-400">

                  {node.value}

                </p>

              </div>

            </div>

          </div>

        </motion.div>
      ))}
    </>
  );
}