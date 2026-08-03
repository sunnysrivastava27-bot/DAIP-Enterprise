export interface HeaderInfoProps {
  formattedDate: string;
  formattedTime: string;
  temperature: number;
  city: string;
}

export interface SearchBarProps {
  placeholder?: string;
}

export interface HeaderActionsProps {
  notificationCount?: number;
  userName: string;
  designation: string;
  avatar: string;
}