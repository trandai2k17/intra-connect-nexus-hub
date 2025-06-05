
import { 
  Home, 
  Globe, 
  Bell, 
  FileText, 
  Users, 
  BarChart3, 
  HelpCircle, 
  Shield, 
  Settings,
  Database,
  Code,
  Monitor,
  Smartphone,
  UserCheck,
  Calendar,
  Mail,
  Phone,
  Building,
  Car,
  ShoppingCart,
  DollarSign,
  Package
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
    title: "Tài chính", 
    icon: DollarSign,
    color: getRandomColor(),
    subItems: [
      { title: "Báo cáo tài chính", url: "/finance/reports", icon: BarChart3, color: getRandomColor() },
      { title: "Ngân sách", url: "/finance/budget", icon: Package, color: getRandomColor() },
      { title: "Thanh toán", url: "/finance/payments", icon: ShoppingCart, color: getRandomColor() },
    ]
  },
  { title: "Tài liệu", url: "/documents", icon: FileText, color: getRandomColor() },
  { title: "Thống kê", url: "/analytics", icon: BarChart3, color: getRandomColor() },
  { 
    title: "Nhân sự", 
    icon: Users,
    color: getRandomColor(),
    subItems: [
      { title: "Nhân viên", url: "/hr/employees", icon: UserCheck, color: getRandomColor() },
      { title: "Lịch làm việc", url: "/hr/schedule", icon: Calendar, color: getRandomColor() },
      { title: "Liên hệ", url: "/hr/contacts", icon: Phone, color: getRandomColor() },
      { 
        title: "Phòng ban", 
        url: "/hr/departments", 
        icon: Building, 
        color: getRandomColor(),
        subItems: [
          { title: "IT Department", url: "/hr/departments/it", icon: Code, color: getRandomColor() },
          { title: "HR Department", url: "/hr/departments/hr", icon: Users, color: getRandomColor() },
          { title: "Sales Department", url: "/hr/departments/sales", icon: ShoppingCart, color: getRandomColor() },
        ]
      },
    ]
  },
  { 
    title: "Logistics", 
    icon: Car,
    color: getRandomColor(),
    subItems: [
      { title: "Vận chuyển", url: "/logistics/shipping", icon: Car, color: getRandomColor() },
      { title: "Kho hàng", url: "/logistics/warehouse", icon: Package, color: getRandomColor() },
    ]
  },
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
