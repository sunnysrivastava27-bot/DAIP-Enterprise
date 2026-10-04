import React from "react";
import { Bell, Bot, ChevronDown } from "lucide-react";

interface TopBarRightProps {
  notificationCount: number;
  userName: string;
  designation: string;
  avatar: string;
}

const TopBarRight: React.FC<TopBarRightProps> = ({
  notificationCount,
  userName,
  designation,
  avatar,
}) => {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        shrink-0
      "
    >
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
          duration-200
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
            -top-1
            -right-1
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
          duration-200
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
          px-2
          py-1
          transition-all
          duration-200
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
            object-cover
          "
        />

        <div
          className="
            flex
            min-w-0
            flex-col
            text-left
          "
        >
          <span
            className="
              whitespace-nowrap
              text-[14px]
              font-medium
              leading-none
              text-white
            "
          >
            {userName}
          </span>

          <span
            className="
text-[14px]
font-medium
truncate
text-white
"
          >
            {designation}
          </span>
        </div>

        <ChevronDown
          size={18}
          className="
text-[14px]
font-medium
truncate
text-white
"
        />
      </button>
    </div>
  );
};

export default TopBarRight;