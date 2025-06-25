
import { 
  Database,
  Package,
  Smartphone,
  Type,
  Users,
  BarChart,
  Shield,
  FileText,
  Globe,
  Building2,
  Calendar,
  MessageSquare,
  Video,
  GraduationCap,
  BookOpen,
  Search
} from "lucide-react";

export const applications = [
  {
    id: 1,
    name: "Unikey",
    description: "Bộ gõ tiếng Việt thông minh và phổ biến nhất",
    icon: Type,
    category: "utility",
    departments: ["all"],
    type: "desktop",
    url: "unikey://launch",
    status: "online",
    users: 1250,
    rating: 4.9,
    version: "v4.3.2",
    lastUpdated: "2025-03-15",
    isNew: false,
    isFavorite: true,
    badge: "success",
    appStyle: {
      gradient: "from-green-500 to-green-600",
      iconBg: "from-green-500/10 to-green-600/10",
      iconColor: "text-green-600"
    }
  },
  {
    id: 2,
    name: "Zalo Desktop",
    description: "Ứng dụng nhắn tin và gọi điện miễn phí",
    icon: MessageSquare,
    category: "communication",
    departments: ["all"],
    type: "desktop",
    url: "zalo://launch",
    status: "online",
    users: 890,
    rating: 4.7,
    version: "v6.2.1",
    lastUpdated: "2025-04-01",
    isNew: false,
    isFavorite: true,
    badge: "success",
    appStyle: {
      gradient: "from-blue-500 to-blue-600",
      iconBg: "from-blue-500/10 to-blue-600/10",
      iconColor: "text-blue-600"
    }
  },
  {
    id: 3,
    name: "Microsoft Teams",
    description: "Nền tảng hợp tác và họp trực tuyến",
    icon: Users,
    category: "communication",
    departments: ["all"],
    type: "desktop",
    url: "msteams://launch",
    status: "online",
    users: 456,
    rating: 4.5,
    version: "v1.6.00",
    lastUpdated: "2025-04-10",
    isNew: false,
    isFavorite: false,
    badge: "info",
    appStyle: {
      gradient: "from-purple-500 to-purple-600",
      iconBg: "from-purple-500/10 to-purple-600/10",
      iconColor: "text-purple-600"
    }
  },
  {
    id: 4,
    name: "Microsoft Excel",
    description: "Ứng dụng bảng tính mạnh mẽ và chuyên nghiệp",
    icon: BarChart,
    category: "office",
    departments: ["all"],
    type: "desktop",
    url: "excel://launch",
    status: "online",
    users: 720,
    rating: 4.8,
    version: "v16.0.1",
    lastUpdated: "2025-04-05",
    isNew: false,
    isFavorite: true,
    badge: "success",
    appStyle: {
      gradient: "from-green-600 to-green-700",
      iconBg: "from-green-600/10 to-green-700/10",
      iconColor: "text-green-700"
    }
  },
  {
    id: 5,
    name: "Microsoft Word",
    description: "Trình soạn thảo văn bản chuyên nghiệp",
    icon: FileText,
    category: "office",
    departments: ["all"],
    type: "desktop",
    url: "word://launch",
    status: "online",
    users: 650,
    rating: 4.7,
    version: "v16.0.1",
    lastUpdated: "2025-04-05",
    isNew: false,
    isFavorite: false,
    badge: "success",
    appStyle: {
      gradient: "from-blue-600 to-blue-700",
      iconBg: "from-blue-600/10 to-blue-700/10",
      iconColor: "text-blue-700"
    }
  },
  {
    id: 6,
    name: "Microsoft PowerPoint",
    description: "Tạo bài thuyết trình ấn tượng và chuyên nghiệp",
    icon: FileText,
    category: "office",
    departments: ["all"],
    type: "desktop",
    url: "powerpoint://launch",
    status: "online",
    users: 420,
    rating: 4.6,
    version: "v16.0.1",
    lastUpdated: "2025-04-05",
    isNew: false,
    isFavorite: false,
    badge: "success",
    appStyle: {
      gradient: "from-orange-500 to-orange-600",
      iconBg: "from-orange-500/10 to-orange-600/10",
      iconColor: "text-orange-600"
    }
  },
  {
    id: 7,
    name: "ERP Report Tools",
    description: "Công cụ báo cáo và phân tích dữ liệu doanh nghiệp",
    icon: Database,
    category: "business",
    departments: ["production", "hr", "purchase"],
    type: "desktop",
    url: "Online-Report-Tool://Hello-app",
    status: "online",
    users: 180,
    rating: 4.4,
    version: "v1.3.5",
    lastUpdated: "2025-03-20",
    isNew: false,
    isFavorite: false,
    badge: "info",
    appStyle: {
      gradient: "from-indigo-500 to-indigo-600",
      iconBg: "from-indigo-500/10 to-indigo-600/10",
      iconColor: "text-indigo-600"
    }
  }
];

export const companyWebPages = [
  {
    id: 'web1',
    name: "YouTube",
    description: "Nền tảng chia sẻ video và học tập trực tuyến",
    icon: Video,
    url: "https://www.youtube.com",
    category: "Learning",
    isInternal: false,
    users: 2800,
    rating: 4.8,
    version: "Web",
    lastUpdated: "2025-04-15",
    status: "online",
    badge: "success",
    appStyle: {
      gradient: "from-red-500 to-red-600",
      iconBg: "from-red-500/10 to-red-600/10",
      iconColor: "text-red-600"
    }
  },
  {
    id: 'web2', 
    name: "Coursera",
    description: "Khóa học trực tuyến từ các đại học hàng đầu",
    icon: GraduationCap,
    url: "https://www.coursera.org",
    category: "Education",
    isInternal: false,
    users: 1200,
    rating: 4.9,
    version: "Web",
    lastUpdated: "2025-04-12",
    status: "online",
    badge: "success",
    appStyle: {
      gradient: "from-blue-600 to-blue-700",
      iconBg: "from-blue-600/10 to-blue-700/10",
      iconColor: "text-blue-700"
    }
  },
  {
    id: 'web3',
    name: "Udemy",
    description: "Nền tảng học trực tuyến với hàng nghìn khóa học",
    icon: BookOpen,
    url: "https://www.udemy.com",
    category: "Education",
    isInternal: false,
    users: 980,
    rating: 4.6,
    version: "Web",
    lastUpdated: "2025-04-10",
    status: "online",
    badge: "success",
    appStyle: {
      gradient: "from-purple-600 to-purple-700",
      iconBg: "from-purple-600/10 to-purple-700/10",
      iconColor: "text-purple-700"
    }
  },
  {
    id: 'web4',
    name: "Google Chrome",
    description: "Trình duyệt web nhanh và bảo mật",
    icon: Search,
    url: "https://www.google.com",
    category: "Browser",
    isInternal: false,
    users: 2500,
    rating: 4.7,
    version: "Web",
    lastUpdated: "2025-04-14",
    status: "online",
    badge: "success",
    appStyle: {
      gradient: "from-yellow-500 to-orange-500",
      iconBg: "from-yellow-500/10 to-orange-500/10",
      iconColor: "text-orange-600"
    }
  },
  {
    id: 'web5',
    name: "Company Portal",
    description: "Cổng thông tin nội bộ công ty",
    icon: Building2,
    url: "https://portal.company.com",
    category: "Internal",
    isInternal: true,
    users: 345,
    rating: 4.3,
    version: "v2.1.0",
    lastUpdated: "2025-04-08",
    status: "maintenance",
    badge: "warning",
    appStyle: {
      gradient: "from-gray-500 to-gray-600",
      iconBg: "from-gray-500/10 to-gray-600/10",
      iconColor: "text-gray-600"
    }
  }
];
