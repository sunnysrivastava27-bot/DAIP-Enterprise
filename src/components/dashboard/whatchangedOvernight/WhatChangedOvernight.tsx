import React from "react";
import {
  ArrowDown,
  ArrowUp,
  Landmark,
  MessageCircle,
  FileText,
  AlertTriangle,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

import ExecutiveCard from "../executive/ExecutiveCard";
import ExecutiveCardHeader from "../executive/ExecutiveCardHeader";
import ExecutiveCardBody from "../executive/ExecutiveCardBody";

interface ChangeRow {
  label: string;
  value: string;
  direction: "up" | "down";
  icon: LucideIcon;
  valueColor: string;
}

const WhatChangedOvernight: React.FC = () => {
  const changes: ChangeRow[] = [
    {
      label: "Revenue Collection",
      value: "+ ₹1.8 Cr",
      direction: "up",
      icon: Landmark,
      valueColor: "text-emerald-400",
    },
    {
      label: "Citizen Complaints",
      value: "- 42",
      direction: "down",
      icon: MessageCircle,
      valueColor: "text-emerald-400",
    },
    {
      label: "Property Registrations",
      value: "+ 18%",
      direction: "up",
      icon: FileText,
      valueColor: "text-emerald-400",
    },
    {
      label: "Encroachments Detected",
      value: "+ 5",
      direction: "up",
      icon: AlertTriangle,
      valueColor: "text-amber-400",
    },
    {
      label: "Project Delays",
      value: "+ 2",
      direction: "up",
      icon: Briefcase,
      valueColor: "text-red-400",
    },
  ];

  return (
    <ExecutiveCard>
      {/* HEADER */}
      <ExecutiveCardHeader
        title="WHAT CHANGED OVERNIGHT"
        icon={ArrowUp}
        color="text-cyan-400"
        bgColor="bg-cyan-500/10"
        borderColor="border-cyan-400/20"
      />

      {/* CONTENT */}
      <ExecutiveCardBody>
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex flex-col">
            {changes.map((change) => {
              const Icon = change.icon;

              const DirectionIcon =
                change.direction === "up" ? ArrowUp : ArrowDown;

              return (
                <div
                  key={change.label}
                  className="
                    flex
                    min-h-[25px]
                    items-center
                    justify-between
                    border-b
                    border-white/5
                  "
                >
                  {/* LEFT */}
                  <div className="flex min-w-0 items-center gap-2">
                    <div
                      className="
                        flex
                        h-[20px]
                        w-[20px]
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-md
                        bg-white/[0.03]
                      "
                    >
                      <Icon
                        size={11}
                        strokeWidth={1.8}
                        className="text-slate-400"
                      />
                    </div>

                    <span
                      className="
                        truncate
                        text-[10px]
                        leading-[14px]
                        text-slate-300
                      "
                    >
                      {change.label}
                    </span>
                  </div>

                  {/* RIGHT */}
                  <div
                    className={`
                      ml-2
                      flex
                      flex-shrink-0
                      items-center
                      gap-1
                      text-[10px]
                      font-medium
                      ${change.valueColor}
                    `}
                  >
                    <span>{change.value}</span>

                    <DirectionIcon
                      size={11}
                      strokeWidth={2}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* VIEW ALL CHANGES */}
          <div className="mt-auto pt-1">
            <button
              type="button"
              className="
                flex
                w-full
                items-center
                justify-center
                gap-1
                text-[10px]
                font-medium
                text-cyan-400
                transition-opacity
                hover:opacity-80
              "
            >
              View All Changes

              <ArrowUp
                size={11}
                className="rotate-90"
              />
            </button>
          </div>
        </div>
      </ExecutiveCardBody>
    </ExecutiveCard>
  );
};

export default WhatChangedOvernight;