import React from "react";
import { CalendarDays, CloudSun } from "lucide-react";

interface TopBarLeftProps {
  formattedDate: string;
  formattedTime: string;
  temperature: number;
  city: string;
}

const TopBarLeft: React.FC<TopBarLeftProps> = ({
  formattedDate,
  formattedTime,
  temperature,
  city,
}) => {
  return (
    <div
      className="
flex
items-center
min-w-0
"
    >
      {/* ======================================================
          AUTHORITY
      ====================================================== */}

      <div
        className="
          flex
          flex-col
          justify-center
          whitespace-nowrap
          pr-8
        "
      >
        <span
          className="
            text-[12px]
            font-medium
            tracking-[0.06em]
            uppercase
            text-white
            leading-none
          "
        >
          Kanpur Development Authority
        </span>

        <div
          className="
            mt-1
            flex
            items-center
            gap-2
          "
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span
            className="
              text-[11px]
              text-emerald-400
            "
          >
            System Healthy
          </span>
        </div>
      </div>

      {/* ======================================================
          DATE
      ====================================================== */}

      <div
        className="
          flex
          items-center
          pr-6
        "
      >
        <CalendarDays
          size={16}
          className="mr-3 text-cyan-400"
        />

        <div className="leading-tight">
          <div
            className="
              whitespace-nowrap
              text-[13px]
              text-white
            "
          >
            {formattedDate}
          </div>

          <div
            className="
              mt-0.5
              text-[12px]
              text-slate-400
            "
          >
            {formattedTime}
          </div>
        </div>
      </div>

      {/* ======================================================
          WEATHER
      ====================================================== */}

      <div
        className="
          flex
          items-center
        "
      >
        <CloudSun
          size={17}
          className="mr-3 text-amber-400"
        />

        <div className="leading-tight">
          <div
            className="
              text-[13px]
              text-white
            "
          >
            {temperature}°C
          </div>

          <div
            className="
              mt-0.5
              text-[12px]
              text-slate-400
            "
          >
            {city}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBarLeft;