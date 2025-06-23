
import { 
  Monitor, 
  Building2, 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart,
  Code
} from 'lucide-react';

export const navigationItems = [
  {
    title: 'sidebar.it',
    url: '/it',
    icon: Monitor,
    iconColor: 'text-blue-500',
    borderColor: 'border-t-blue-400',
  },
  {
    title: 'sidebar.production',
    url: '/production',
    icon: Building2,
    iconColor: 'text-green-500',
    borderColor: 'border-t-green-400',
  },
  {
    title: 'sidebar.quality',
    url: '/quality',
    icon: BarChart3,
    iconColor: 'text-purple-500',
    borderColor: 'border-t-purple-400',
  },
  {
    title: 'sidebar.hr',
    url: '/hr',
    icon: Users,
    iconColor: 'text-orange-500',
    borderColor: 'border-t-orange-400',
  },
  {
    title: 'sidebar.inventory',
    url: '/inventory',
    icon: Package,
    iconColor: 'text-indigo-500',
    borderColor: 'border-t-indigo-400',
  },
  {
    title: 'sidebar.purchase',
    url: '/purchase',
    icon: ShoppingCart,
    iconColor: 'text-red-500',
    borderColor: 'border-t-red-400',
  },
  {
    title: 'Component Library',
    url: '/library',
    icon: Code,
    iconColor: 'text-cyan-500',
    borderColor: 'border-t-cyan-400',
  },
];
