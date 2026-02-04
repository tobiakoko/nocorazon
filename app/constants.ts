import { Users, Headphones, TrendingUp, type LucideIcon } from "lucide-react";

interface OverviewStat {
  id: string;
  title: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
  accentColor: string;
}

interface InstagramMetric {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export const OVERVIEW_STATS: OverviewStat[] = [
  {
    id: "followers",
    title: "Total Followers",
    value: "2.4M",
    subtext: "Across all platforms",
    icon: Users,
    accentColor: "text-brand-pink",
  },
  {
    id: "streams",
    title: "Monthly Streams",
    value: "18M",
    subtext: "Spotify & Apple Music",
    icon: Headphones,
    accentColor: "text-green-400",
  },
  {
    id: "growth",
    title: "Growth Rate",
    value: "+24%",
    subtext: "vs. last month",
    icon: TrendingUp,
    accentColor: "text-blue-400",
  },
];

export const INSTAGRAM_METRICS: InstagramMetric[] = [
  {
    label: "Followers",
    value: "1.2M",
    change: "+12.4% this month",
    isPositive: true,
  },
  {
    label: "Engagement Rate",
    value: "8.7%",
    change: "+2.1% vs avg",
    isPositive: true,
  },
  {
    label: "Avg. Likes",
    value: "89K",
    change: "-3.2% this week",
    isPositive: false,
  },
  {
    label: "Story Views",
    value: "450K",
    change: "+18% this month",
    isPositive: true,
  },
];
