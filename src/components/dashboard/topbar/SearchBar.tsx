import React from "react";
import { Command, Search } from "lucide-react";

import topBarTokens from "../../../design-tokens/topbar.tokens";

const SearchBar: React.FC = () => {
  return (
    <div
      className={`
        flex
        flex-1
        min-w-0
        items-center

        w-full
        ${topBarTokens.search.width}

        ${topBarTokens.search.height}
        ${topBarTokens.search.radius}
        ${topBarTokens.search.border}
        ${topBarTokens.search.background}
        ${topBarTokens.search.paddingX}

        transition-all
        duration-200
        hover:border-cyan-500/40
        focus-within:border-cyan-400
        focus-within:shadow-[0_0_0_1px_rgba(34,211,238,0.15)]
      `}
    >
      {/* =====================================================
          Search Icon
      ====================================================== */}

      <Search
        size={18}
        className="shrink-0 text-slate-500"
      />

      {/* =====================================================
          Search Input
      ====================================================== */}

      <input
        type="text"
        placeholder="Search files, properties, officers, projects..."
        className={`
          min-w-0
          flex-1
          bg-transparent
          px-3
          ${topBarTokens.typography.input}
          text-white
          placeholder:text-slate-500
          focus:outline-none
        `}
      />

      {/* =====================================================
          Shortcut
      ====================================================== */}

      <div
        className={`
          flex
          shrink-0
          items-center
          ${topBarTokens.search.shortcutGap}
          ${topBarTokens.search.shortcutRadius}
          ${topBarTokens.search.shortcutBorder}
          ${topBarTokens.search.shortcutBackground}
          ${topBarTokens.search.shortcutPadding}
          ${topBarTokens.typography.shortcut}
          text-slate-400
        `}
      >
        <Command size={12} />
        K
      </div>
    </div>
  );
};

export default SearchBar;