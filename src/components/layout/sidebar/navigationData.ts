
import { 
  Monitor, 
  Building2, 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart,
  Code,
  Laptop,
  Globe,
  FileText,
  Cog,
  Wrench,
  CheckCircle,
  BarChart,
  TrendingUp,
  UserCheck,
  Calendar,
  DollarSign,
  Box,
  Truck,
  ShoppingBag
} from 'lucide-react';

export const navigationItems = [
  {
    title: 'sidebar.it',
    url: '/it',
    icon: Monitor,
    iconColor: 'text-blue-500',
    borderColor: 'border-t-blue-400',
    subItems: [
      {
        title: 'Software',
        url: '/it/software',
        icon: Laptop,
        iconColor: 'text-blue-400'
      },
      {
        title: 'Web Page',
        url: '/it/webpage',
        icon: Globe,
        iconColor: 'text-blue-600'
      },
      {
        title: 'Document',
        url: '/it/document',
        icon: FileText,
        iconColor: 'text-blue-700'
      }
    ]
  },
  {
    title: 'sidebar.production',
    url: '/production',
    icon: Building2,
    iconColor: 'text-green-500',
    borderColor: 'border-t-green-400',
    subItems: [
      {
        title: 'Manufacturing',
        url: '/production/manufacturing',
        icon: Cog,
        iconColor: 'text-green-400'
      },
      {
        title: 'Maintenance',
        url: '/production/maintenance',
        icon: Wrench,
        iconColor: 'text-green-600'
      }
    ]
  },
  {
    title: 'sidebar.quality',
    url: '/quality',
    icon: BarChart3,
    iconColor: 'text-purple-500',
    borderColor: 'border-t-purple-400',
    subItems: [
      {
        title: 'Quality Control',
        url: '/quality/control',
        icon: CheckCircle,
        iconColor: 'text-purple-400'
      },
      {
        title: 'Reports',
        url: '/quality/reports',
        icon: BarChart,
        iconColor: 'text-purple-600'
      },
      {
        title: 'Analytics',
        url: '/quality/analytics',
        icon: TrendingUp,
        iconColor: 'text-purple-700'
      }
    ]
  },
  {
    title: 'sidebar.hr',
    url: '/hr',
    icon: Users,
    iconColor: 'text-orange-500',
    borderColor: 'border-t-orange-400',
    subItems: [
      {
        title: 'Employee Management',
        url: '/hr/employees',
        icon: UserCheck,
        iconColor: 'text-orange-400'
      },
      {
        title: 'Schedule',
        url: '/hr/schedule',
        icon: Calendar,
        iconColor: 'text-orange-600'
      },
      {
        title: 'Payroll',
        url: '/hr/payroll',
        icon: DollarSign,
        iconColor: 'text-orange-700'
      }
    ]
  },
  {
    title: 'sidebar.inventory',
    url: '/inventory',
    icon: Package,
    iconColor: 'text-indigo-500',
    borderColor: 'border-t-indigo-400',
    subItems: [
      {
        title: 'Stock Management',
        url: '/inventory/stock',
        icon: Box,
        iconColor: 'text-indigo-400'
      },
      {
        title: 'Warehouse',
        url: '/inventory/warehouse',
        icon: Truck,
        iconColor: 'text-indigo-600'
      }
    ]
  },
  {
    title: 'sidebar.purchase',
    url: '/purchase',
    icon: ShoppingCart,
    iconColor: 'text-red-500',
    borderColor: 'border-t-red-400',
    subItems: [
      {
        title: 'Purchase Orders',
        url: '/purchase/orders',
        icon: ShoppingBag,
        iconColor: 'text-red-400'
      },
      {
        title: 'Vendors',
        url: '/purchase/vendors',
        icon: Users,
        iconColor: 'text-red-600'
      }
    ]
  },
  {
    title: 'Component Library',
    url: '/library',
    icon: Code,
    iconColor: 'text-cyan-500',
    borderColor: 'border-t-cyan-400',
  },
];
