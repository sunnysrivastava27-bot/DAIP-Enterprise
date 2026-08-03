import React from "react";
import { motion } from "framer-motion";

import Sidebar from "../dashboard/sidebar/Sidebar";
import TopBar from "../dashboard/TopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#060B14] text-white">

      {/* ==========================================================
          LEFT SIDEBAR
      ========================================================== */}

      <aside
        className="
          hidden
          xl:flex
          h-full
          w-[240px]
          flex-shrink-0
          border-r
          border-slate-800/70
          bg-[#050A13]
        "
      >
        <Sidebar />
      </aside>

      {/* ==========================================================
          MAIN APPLICATION
      ========================================================== */}

      <section
        className="
          flex
          flex-1
          min-w-0
          min-h-0
          flex-col
          overflow-hidden
        "
      >

        {/* ======================================================
            TOP HEADER
        ====================================================== */}

        <header
          className="
            flex-shrink-0
            border-b
            border-slate-800/60
            bg-[#060B14]
            px-6
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1800px]
            "
          >
            <TopBar />
          </div>
        </header>

        {/* ======================================================
            WORKSPACE
        ====================================================== */}

        <motion.main
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.30,
            ease: "easeOut",
          }}
          className="
            flex-1
            overflow-auto
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1800px]
              px-6
              py-5
            "
          >
            {children}
          </div>
        </motion.main>

      </section>

    </div>
  );
};

export default DashboardLayout;
