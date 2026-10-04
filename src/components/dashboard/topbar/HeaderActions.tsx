import React from "react";
import { Bell, Bot, ChevronDown } from "lucide-react";
import type { HeaderActionsProps } from "./types";


const HeaderActions: React.FC<HeaderActionsProps> = ({
  notificationCount = 8,
  userName,
  designation,
  avatar,
}) => {
  return (
    <div className="flex items-center gap-3 flex-shrink-0">

      {/* ================= Notifications ================= */}

      <button
        className="
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          border
          border-slate-700
          bg-[#0B1220]
          transition-all
          hover:border-cyan-500/40
          hover:bg-slate-800
        "
      >
        <Bell
          size={18}
          className="text-white"
        />

        <span
          className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-red-500
            text-[10px]
            font-semibold
            text-white
          "
        >
          {notificationCount}
        </span>
      </button>

      {/* ================= AI Assistant ================= */}

      <button
        className="
          flex
          h-12
          items-center
          gap-2
          rounded-xl
          border
          border-cyan-500/30
          bg-cyan-500/10
          px-4
          transition-all
          hover:border-cyan-400
          hover:bg-cyan-500/20
        "
      >
        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-cyan-500/15
          "
        >
          <Bot
            size={18}
            className="text-cyan-300"
          />
        </div>

        <span
          className="
            whitespace-nowrap
            text-[14px]
            font-medium
            text-white
          "
        >
          AI Assistant
        </span>
      </button>

      {/* ================= User ================= */}

      <button
        className="
          flex
          items-center
          gap-3
          rounded-xl
          px-1
          transition-all
          hover:bg-slate-800/40
        "
      >
        <img
          src={avatar}
          alt={userName}
          className="
            h-12
            w-12
            rounded-full
            border
            border-slate-700
          "
        />

        <div className="text-left">

          <div
            className="
              whitespace-nowrap
              text-[14px]
              font-medium
              text-white
            "
          >
            {userName}
          </div>

          <div
            className="
              whitespace-nowrap
              text-[12px]
              text-slate-400
            "
          >
            {designation}
          </div>

        </div>

        <ChevronDown
          size={18}
          className="text-slate-500"
        />

      </button>

    </div>
  );
};

export default HeaderActions;