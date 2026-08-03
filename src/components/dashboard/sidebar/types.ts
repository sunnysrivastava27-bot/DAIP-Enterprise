import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
    id: string;
    title: string;
    icon: LucideIcon;
    badge?: string | number;
    disabled?: boolean;
}

export interface SidebarSection {
    id: string;
    title: string;
    items: SidebarItem[];
}

export interface SidebarProps {
    collapsed: boolean;
    activeMenu: string;
    onMenuSelect: (menuId: string) => void;
    onToggleCollapse: () => void;
}

export interface SidebarHeaderProps {
    collapsed: boolean;
}

export interface SidebarNavigationProps {
    collapsed: boolean;
    activeMenu: string;
    onMenuSelect: (menuId: string) => void;
}

export interface SidebarItemProps {
    item: SidebarItem;
    collapsed: boolean;
    active: boolean;
    onClick: () => void;
}

export interface SidebarFooterProps {
    collapsed: boolean;
    onToggleCollapse: () => void;
}