
import { 
  Home, 
  Globe, 
  Bell, 
  FileText, 
  BarChart3, 
  HelpCircle, 
  Shield, 
  Settings,
  Database,
  Code,
  Monitor,
  Smartphone,
  Calendar,
  Mail,
  Building,
  Package,
  ShoppingCart
} from "lucide-react";

const iconColors = [
  'text-blue-500',
  'text-green-500', 
  'text-purple-500',
  'text-red-500',
  'text-yellow-500',
  'text-indigo-500',
  'text-pink-500',
  'text-teal-500',
  'text-orange-500',
  'text-cyan-500'
];

const getRandomColor = () => iconColors[Math.floor(Math.random() * iconColors.length)];

export const navigationItems = [
  { title: "Trang chủ", url: "/", icon: Home, color: getRandomColor() },
  { title: "Ứng dụng", url: "/apps", icon: Globe, color: getRandomColor() },
  { title: "Thông báo", url: "/announcements", icon: Bell, color: getRandomColor() },
  { 
    title: "Quản lý IT", 
    icon: Monitor,
    color: getRandomColor(),
    subItems: [
      { title: "Hệ thống", url: "/it/systems", icon: Database, color: getRandomColor() },
      { title: "Phần mềm", url: "/it/software", icon: Code, color: getRandomColor() },
      { title: "Thiết bị", url: "/it/devices", icon: Smartphone, color: getRandomColor() },
    ]
  },
  { 
    title: "Sản xuất", 
    icon: Building,
    color: getRandomColor(),
    subItems: [
      { title: "Kho bãi", url: "/production/inventory", icon: Package, color: getRandomColor() },
      { title: "Mua hàng", url: "/production/purchase", icon: ShoppingCart, color: getRandomColor() },
    ]
  },
  { title: "Tài liệu", url: "/documents", icon: FileText, color: getRandomColor() },
  { 
    title: "Hỗ trợ", 
    icon: HelpCircle,
    color: getRandomColor(),
    subItems: [
      { title: "FAQ", url: "/support/faq", icon: HelpCircle, color: getRandomColor() },
      { title: "Liên hệ IT", url: "/support/contact", icon: Mail, color: getRandomColor() },
    ]
  },
  { title: "Bảo mật", url: "/security", icon: Shield, color: getRandomColor() },
  { title: "Cài đặt", url: "/settings", icon: Settings, color: getRandomColor() },
];
