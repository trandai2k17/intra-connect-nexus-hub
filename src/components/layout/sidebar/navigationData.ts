
import { 
  Home, 
  FileText, 
  BookOpen, 
  Monitor,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  Database,
  FolderKanban,
  GitBranch,
  MessageSquare,
  TrendingUp,
  Book,
  PlusCircle
} from "lucide-react";

interface SubItem {
  title: string;
  url: string;
  icon: any;
  iconColor: string;
}

interface NavigationItem {
  title: string;
  url: string; // Make this required to fix the TypeScript error
  icon: any;
  iconColor: string;
  subItems?: SubItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Trang chủ",
    url: "/",
    icon: Home,
    iconColor: "text-blue-600",
  },
  {
    title: "Ứng dụng",
    url: "/software-application",
    icon: Monitor,
    iconColor: "text-green-600",
  },
  {
    title: "Yêu cầu vật tư",
    url: "/material-request", 
    icon: FileText,
    iconColor: "text-orange-600",
  },
  {
    title: "Từ điển",
    url: "#",
    icon: Book,
    iconColor: "text-indigo-600",
    subItems: [
      {
        title: "Xem từ vựng",
        url: "/dictionary",
        icon: BookOpen,
        iconColor: "text-blue-600",
      },
      {
        title: "Quản lý từ vựng",
        url: "/dictionary-management",
        icon: PlusCircle,
        iconColor: "text-green-600",
      },
    ],
  },
  {
    title: "Thư viện",
    url: "/library",
    icon: BookOpen,
    iconColor: "text-purple-600",
  },
  {
    title: "MIS",
    url: "#",
    icon: Database,
    iconColor: "text-cyan-600",
    subItems: [
      {
        title: "Quản lý Project",
        url: "/mis/project-management",
        icon: FolderKanban,
        iconColor: "text-blue-600",
      },
      {
        title: "Backlog & Stories",
        url: "/mis/backlog",
        icon: GitBranch,
        iconColor: "text-green-600",
      },
      {
        title: "Feedback & Comments",
        url: "/mis/feedback",
        icon: MessageSquare,
        iconColor: "text-orange-600",
      },
      {
        title: "Báo cáo Project",
        url: "/mis/reports",
        icon: TrendingUp,
        iconColor: "text-purple-600",
      },
    ],
  },
  {
    title: "Quản lý",
    url: "#", // Add a placeholder URL
    icon: Settings,
    iconColor: "text-gray-600",
    subItems: [
      {
        title: "Kho hàng",
        url: "/inventory",
        icon: Package,
        iconColor: "text-amber-600",
      },
      {
        title: "Mua hàng", 
        url: "/purchase",
        icon: ShoppingCart,
        iconColor: "text-emerald-600",
      },
      {
        title: "Nhân sự",
        url: "/hr",
        icon: Users,
        iconColor: "text-indigo-600",
      },
      {
        title: "Báo cáo",
        url: "/reports", 
        icon: BarChart3,
        iconColor: "text-red-600",
      },
    ],
  },
];
