import {
    LayoutDashboard,
    IndianRupee,
    Building2,
    Cuboid,
    Users,
    Landmark,
    Layers3,
    Map,
    ClipboardCheck,
    BarChart3,
    ShieldCheck,
} from "lucide-react";

import type { SidebarSection } from "./types";

export const BRAND = {
    shortName: "DAIP",
    fullName: "Digital Administration & Intelligence Platform",
    title: "Digital Administration",
    subtitle: "Intelligence Platform",
    version: "Enterprise v2.0",
};

export const SIDEBAR_SECTIONS: SidebarSection[] = [
    {
        id: "main",
        title: "",
        items: [
            {
                id: "dashboard",
                title: "Dashboard",
                icon: LayoutDashboard,
            },
            {
                id: "revenue",
                title: "Revenue Intelligence",
                icon: IndianRupee,
            },
            {
                id: "projects",
                title: "Projects Intelligence",
                icon: Building2,
            },
            {
                id: "digitalTwin",
                title: "Digital Twin",
                icon: Cuboid,
            },
            {
                id: "citizen",
                title: "Citizen Intelligence",
                icon: Users,
            },
            {
                id: "finance",
                title: "Finance Intelligence",
                icon: Landmark,
            },
            {
                id: "assets",
                title: "Assets Management",
                icon: Layers3,
            },
            {
                id: "landbank",
                title: "Land Bank",
                icon: Map,
            },
            {
                id: "meetings",
                title: "Meetings & Approvals",
                icon: ClipboardCheck,
            },
            {
                id: "reports",
                title: "Reports & Analytics",
                icon: BarChart3,
            },
            {
                id: "administration",
                title: "Administration",
                icon: ShieldCheck,
            },
        ],
    },
];