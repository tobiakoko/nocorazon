import { LucideIcon } from 'lucide-react';

export interface SocialLink {
  name: string;
  url: string;
  icon?: LucideIcon;
  label?: string;
}

export interface StatCardData {
  id: string;
  title: string;
  value: string;
  subtext: string;
  icon?: LucideIcon;
  accentColor?: string;
}

export interface DetailedStatData {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface MusicPlatform {
  name: string;
  url: string;
  icon: LucideIcon;
}