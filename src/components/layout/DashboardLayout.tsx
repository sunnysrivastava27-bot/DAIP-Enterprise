import React from "react";
import { motion } from "framer-motion";

import Sidebar from "../dashboard/sidebar/Sidebar";
import TopBar from "../dashboard/TopBar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

/* ==========================================================
   DAIP ENTERPRISE V3
   APPLICATION LAYOUT
========================================================== */

const SIDEBAR_WIDTH = 220;


const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
}) => {

    return (

        <div
            className="
                flex
                h-screen
                w-screen
                overflow-hidden
                bg-[#060B14]
                text-white
            "
        >

            {/* ==========================================
                SIDEBAR
            =========================================== */}

            <aside
  className="
    hidden
    xl:flex
    flex-shrink-0
    border-r
    border-slate-800/70
    bg-[#050A13]
  "
  style={{
      width: SIDEBAR_WIDTH,
  }}
>
                <Sidebar />
            </aside>

            {/* ==========================================
                APPLICATION
            =========================================== */}

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

                {/* ======================================
                    TOP BAR
                ======================================= */}

               <div className="flex-shrink-0">
    <TopBar />
</div>

                {/* ======================================
                    WORKSPACE
                ======================================= */}

                <motion.main
                    initial={{
                        opacity: 0,
                        y: 6,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.30,
                        ease: "easeOut",
                    }}
                    className="
                        flex-1
                        min-h-0
                        min-w-0
                        overflow-hidden
                    "
                >
				                    <div
                        className="
                            h-full
                            min-h-0
                            w-full
                            overflow-hidden
                            px-2
                            py-1
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
