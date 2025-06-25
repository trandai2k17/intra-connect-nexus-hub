
import { 
  Home, 
  FileText, 
  BookOpen, 
  Monitor,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3
} from "lucide-react";

export const navigationItems = [
  {
    title: "Trang chủ",
    url: "/",
    icon: Home,
  },
  {
    title: "Ứng dụng",
    url: "/software-application",
    icon: Monitor,
  },
  {
    title: "Yêu cầu vật tư",
    url: "/material-request", 
    icon: FileText,
  },
  {
    title: "Thư viện",
    url: "/library",
    icon: BookOpen,
  },
  {
    title: "Quản lý",
    icon: Settings,
    subItems: [
      {
        title: "Kho hàng",
        url: "/inventory",
        icon: Package,
      },
      {
        title: "Mua hàng", 
        url: "/purchase",
        icon: ShoppingCart,
      },
      {
        title: "Nhân sự",
        url: "/hr",
        icon: Users,
      },
      {
        title: "Báo cáo",
        url: "/reports", 
        icon: BarChart3,
      },
    ],
  },
];
