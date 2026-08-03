import React from "react";
import SearchBar from "./SearchBar";

const TopBarCenter: React.FC = () => {
  return (
    <div
      className="
        flex
        flex-1
        min-w-0
        items-center
        justify-center
      "
    >
      <SearchBar />
    </div>
  );
};

export default TopBarCenter;