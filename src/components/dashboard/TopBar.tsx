import React, { useEffect, useState } from "react";

import TopBarLeft from "./topbar/TopBarLeft";
import TopBarCenter from "./topbar/TopBarCenter";
import TopBarRight from "./topbar/TopBarRight";

import topBarTokens from "../../design-tokens/topbar.tokens";

const TopBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [weather] = useState({
    temperature: 28,
    city: "Kanpur",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <header
      className={`
        flex
        items-center
        w-full
        ${topBarTokens.header.height}
        ${topBarTokens.header.paddingX}
        ${topBarTokens.header.background}
        ${topBarTokens.header.border}
      `}
    >
      {/* LEFT */}

      <div className="flex shrink-0">
        <TopBarLeft
          formattedDate={formattedDate}
          formattedTime={formattedTime}
          temperature={weather.temperature}
          city={weather.city}
        />
      </div>

      {/* CENTER */}

      <div className="flex min-w-0 flex-1 items-center justify-center px-6">
        <TopBarCenter />
      </div>

      {/* RIGHT */}

      <div className="flex shrink-0 justify-end">
        <TopBarRight
          notificationCount={8}
          userName="Rajesh Kumar"
          designation="Vice Chairman"
          avatar="https://i.pravatar.cc/80"
        />
      </div>
    </header>
  );
};

export default TopBar;