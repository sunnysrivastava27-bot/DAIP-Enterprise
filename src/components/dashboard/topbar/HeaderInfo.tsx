import React from "react";
import { CalendarDays, CloudSun } from "lucide-react";
import topBarTokens from "../../../design-tokens/topbar.tokens";

interface HeaderInfoProps {
  formattedDate: string;
  formattedTime: string;
  temperature: number;
  city: string;
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({
  formattedDate,
  formattedTime,
  temperature,
  city,
}) => {
  return (
    <div
      className={`
        flex
        items-center
        ${topBarTokens.layout.leftSectionGap}
        flex-shrink-0
      `}
    >
      {/* ==========================================================
          AUTHORITY
      ========================================================== */}

      <div
        className={`
          ${topBarTokens.header.authorityWidth}
          flex-shrink-0
        `}
      >
        <h1
          className={`
            text-sm
            font-medium
            tracking-normal
            text-white
          `}
        >
          KANPUR DEVELOPMENT AUTHORITY
        </h1>

        <div
          className={`
            mt-1
            flex
            items-center
            ${topBarTokens.layout.inlineGap}
          `}
        >
          <span
            className={`
              ${topBarTokens.status.dot}
              bg-emerald-500
            `}
          />

          <span
            className={`
              ${topBarTokens.typography.status}
              text-emerald-400
            `}
          >
            System Healthy
          </span>
        </div>
      </div>

      {/* ==========================================================
          DATE
      ========================================================== */}

      <div
        className={`
          flex
          items-center
          ${topBarTokens.layout.inlineGap}
        `}
      >
        <CalendarDays
          size={18}
          className="text-cyan-400 flex-shrink-0"
        />

        <div>
          <div
            className={`
              ${topBarTokens.typography.body}
              text-white
            `}
          >
            {formattedDate}
          </div>

          <div
            className={`
              mt-1
              ${topBarTokens.typography.caption}
              text-slate-400
            `}
          >
            {formattedTime}
          </div>
        </div>
      </div>

      {/* ==========================================================
          WEATHER
      ========================================================== */}

      <div
        className={`
          flex
          items-center
          ${topBarTokens.layout.inlineGap}
        `}
      >
        <CloudSun
          size={20}
          className="text-amber-400 flex-shrink-0"
        />

        <div>
          <div
            className={`
              ${topBarTokens.typography.body}
              text-white
            `}
          >
            {temperature}°C
          </div>

          <div
            className={`
              mt-1
              ${topBarTokens.typography.caption}
              text-slate-400
            `}
          >
            {city}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;