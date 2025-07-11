
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  vi: {
    // Header
    'header.title': 'Cổng Thông Tin Nội Bộ',
    'header.login': 'Đăng nhập',
    'header.register': 'Đăng ký',
    'header.notifications': 'Thông báo',
    'header.profile': 'Hồ sơ',
    'header.settings': 'Cài đặt',
    'header.logout': 'Đăng xuất',
    
    // Sidebar
    'sidebar.title': 'IT Portal',
    'sidebar.subtitle': 'Cổng thông tin nội bộ',
    'sidebar.expand': 'Mở rộng',
    'sidebar.collapse': 'Thu gọn',
    'sidebar.copyright': '© 2024 IT Department',
    'sidebar.navigation': 'Điều hướng',
    
    // Sidebar Menu Items
    'sidebar.dashboard': 'Trang chủ',
    'sidebar.home': 'Trang chủ',
    'sidebar.apps': 'Ứng dụng',
    'sidebar.announcements': 'Thông báo',
    'sidebar.it-management': 'Quản lý IT',
    'sidebar.systems': 'Hệ thống',
    'sidebar.software': 'Phần mềm',
    'sidebar.devices': 'Thiết bị',
    'sidebar.production': 'Sản xuất',
    'sidebar.inventory': 'Kho bãi',
    'sidebar.purchase': 'Mua hàng',
    'sidebar.documents': 'Tài liệu',
    'sidebar.support': 'Hỗ trợ',
    'sidebar.faq': 'FAQ',
    'sidebar.contact-it': 'Liên hệ IT',
    'sidebar.security': 'Bảo mật',
    'sidebar.settings': 'Cài đặt',
    'sidebar.erp': 'Hệ thống ERP',
    'sidebar.mes': 'MES',
    'sidebar.planning': 'Lập kế hoạch',
    'sidebar.quality': 'Chất lượng',
    'sidebar.qc': 'QC Mobile',
    'sidebar.inspection': 'Kiểm tra',
    'sidebar.communication': 'Giao tiếp',
    'sidebar.teams': 'Microsoft Teams',
    'sidebar.outlook': 'Outlook',
    'sidebar.sharepoint': 'SharePoint',
    'sidebar.development': 'Phát triển',
    'sidebar.gitlab': 'GitLab',
    'sidebar.jenkins': 'Jenkins',
    'sidebar.monitoring': 'Giám sát',
    'sidebar.hr': 'Nhân sự',
    'sidebar.leave': 'Nghỉ phép',
    'sidebar.payroll': 'Lương',
    'sidebar.training': 'Đào tạo',
    'sidebar.finance': 'Tài chính',
    'sidebar.accounting': 'Kế toán',
    'sidebar.budget': 'Ngân sách',
    'sidebar.reports': 'Báo cáo',
    'sidebar.it': 'IT',
    'sidebar.helpdesk': 'Helpdesk',
    'sidebar.assets': 'Tài sản',
    
    // Home page
    'home.hero.title': 'Chào mừng đến với Cổng Thông Tin IT',
    'home.hero.subtitle': 'Truy cập nhanh các ứng dụng và dịch vụ nội bộ',
    'home.apps.title': 'Ứng dụng & Phần mềm',
    'home.apps.subtitle': 'Truy cập nhanh các công cụ và hệ thống nội bộ',
    'home.stats.apps': 'Ứng dụng đang hoạt động',
    'home.stats.users': 'Người dùng hoạt động',
    'home.stats.uptime': 'Uptime hệ thống',
    'home.updated': 'Cập nhật: 29/11/2024',
    
    // Navigation
    'nav.all': 'Tất cả',
    'nav.productivity': 'Năng suất',
    'nav.communication': 'Giao tiếp',
    'nav.development': 'Phát triển',
    'nav.hr': 'Nhân sự',
    'nav.finance': 'Tài chính',
    
    // Banner
    'banner.news.title1': 'Triển khai hệ thống MES mới cho nhà máy 2',
    'banner.news.desc1': 'Hệ thống quản lý sản xuất thông minh sẽ được triển khai từ tháng 12/2024, giúp tối ưu hóa quy trình sản xuất và theo dõi real-time.',
    'banner.news.category1': 'Sản xuất',
    'banner.news.title2': 'Ứng dụng QC Mobile chính thức ra mắt',
    'banner.news.desc2': 'Ứng dụng kiểm tra chất lượng trên thiết bị di động giúp QC team thực hiện kiểm tra nhanh chóng và cập nhật kết quả real-time.',
    'banner.news.category2': 'Chất lượng',
    'banner.news.title3': 'Cập nhật chính sách bảo mật IT 2024',
    'banner.news.desc3': 'Các quy định mới về mật khẩu, 2FA và truy cập VPN. Tất cả nhân viên cần đọc và tuân thủ để đảm bảo an toàn thông tin.',
    'banner.news.category3': 'Bảo mật',
    'banner.explore': 'Khám phá',
    'banner.window.title1': 'Bảo trì hệ thống ERP',
    'banner.window.content1': 'Hệ thống ERP sẽ bảo trì từ 22:00 hôm nay đến 02:00 ngày mai',
    'banner.window.title2': 'Cảnh báo Phishing',
    'banner.window.content2': 'Phát hiện email giả mạo từ domain hr-company.net',
    'banner.window.title3': 'Đào tạo Office 365',
    'banner.window.content3': 'Khóa đào tạo Teams & SharePoint vào 9:00 ngày 02/12',
    'banner.window.title4': 'Server mới đã sẵn sàng',
    'banner.window.content4': 'Server backup mới đã được cài đặt và test thành công',

    // Material Request translations
    'material.title': 'Online Material Request',
    'material.subtitle': 'Hệ thống yêu cầu nguyên vật liệu trực tuyến',
    'material.employee.info': 'Thông tin nhân viên',
    'material.employee.id': 'Mã nhân viên',
    'material.employee.name': 'Tên nhân viên',
    'material.department': 'Bộ phận',
    'material.warehouse': 'Kho',
    'material.location': 'Location',
    'material.using.location': 'Using Location',
    'material.process': 'Công đoạn',
    'material.history': 'Lịch sử order',
    'material.new.request': 'Tạo phiếu yêu cầu mới',
    'material.order.info': 'Thông tin đặt hàng',
    'material.order.detail': 'Chi tiết phiếu',
    'material.back.new': 'Quay lại tạo phiếu m ới',
    'material.renew': 'Làm mới',
    'material.delete': 'Xóa',
    'material.save': 'Lưu',
    'material.print': 'In',
    'material.login': 'Đăng nhập',
    'material.login.employee.id': 'Nhập mã nhân viên',
    'material.login.employee.name': 'Nhập tên nhân viên',
    'material.login.required': 'Vui lòng điền đầy đủ thông tin!',
    'material.select.warehouse': 'Chọn kho',
    'material.select.department': 'Chọn bộ phận',
    'material.select.location': 'Chọn location',
    'material.select.using.location': 'Chọn using location',
    'material.select.date': 'Chọn ngày',
    'material.filter.date': 'Lọc theo ngày',
    'material.reload.data': 'Tải lại',
    'material.loading.data': 'Đang tải dữ liệu...',
    'material.clear.filter': 'Xóa bộ lọc',
    'material.orders.today': 'Đơn trong ngày',
    'material.orders.recent': 'Top 10 gần nhất',
    'material.no.orders': 'Không có đơn hàng',
    'material.items': 'vật phẩm',
    'material.view': 'Xem',
    'material.search': 'Tìm kiếm nguyên vật liệu',
    'material.add': 'Thêm nguyên vật liệu',
    'material.quantity': 'Số lượng',
    'material.unit': 'Đơn vị',
    'material.notes': 'Ghi chú',
    'material.remove': 'Xóa',
    'material.no.materials': 'Chưa có nguyên vật liệu nào được chọn',
    'material.confirm.delete': 'Bạn có chắc chắn muốn xóa phiếu này không?',
    'material.save.success': 'Phiếu đã được lưu thành công!',
    'material.delete.success': 'Phiếu đã được xóa thành công!'
  },
  en: {
    // Header
    'header.title': 'Internal Information Portal',
    'header.login': 'Login',
    'header.register': 'Register',
    'header.notifications': 'Notifications',
    'header.profile': 'Profile',
    'header.settings': 'Settings',
    'header.logout': 'Logout',
    
    // Sidebar
    'sidebar.title': 'IT Portal',
    'sidebar.subtitle': 'Internal information portal',
    'sidebar.expand': 'Expand',
    'sidebar.collapse': 'Collapse',
    'sidebar.copyright': '© 2024 IT Department',
    'sidebar.navigation': 'Navigation',
    
    // Sidebar Menu Items
    'sidebar.dashboard': 'Dashboard',
    'sidebar.home': 'Home',
    'sidebar.apps': 'Applications',
    'sidebar.announcements': 'Announcements',
    'sidebar.it-management': 'IT Management',
    'sidebar.systems': 'Systems',
    'sidebar.software': 'Software',
    'sidebar.devices': 'Devices',
    'sidebar.production': 'Production',
    'sidebar.inventory': 'Inventory',
    'sidebar.purchase': 'Purchase',
    'sidebar.documents': 'Documents',
    'sidebar.support': 'Support',
    'sidebar.faq': 'FAQ',
    'sidebar.contact-it': 'Contact IT',
    'sidebar.security': 'Security',
    'sidebar.settings': 'Settings',
    'sidebar.erp': 'ERP System',
    'sidebar.mes': 'MES',
    'sidebar.planning': 'Planning',
    'sidebar.quality': 'Quality',
    'sidebar.qc': 'QC Mobile',
    'sidebar.inspection': 'Inspection',
    'sidebar.communication': 'Communication',
    'sidebar.teams': 'Microsoft Teams',
    'sidebar.outlook': 'Outlook',
    'sidebar.sharepoint': 'SharePoint',
    'sidebar.development': 'Development',
    'sidebar.gitlab': 'GitLab',
    'sidebar.jenkins': 'Jenkins',
    'sidebar.monitoring': 'Monitoring',
    'sidebar.hr': 'HR',
    'sidebar.leave': 'Leave',
    'sidebar.payroll': 'Payroll',
    'sidebar.training': 'Training',
    'sidebar.finance': 'Finance',
    'sidebar.accounting': 'Accounting',
    'sidebar.budget': 'Budget',
    'sidebar.reports': 'Reports',
    'sidebar.it': 'IT',
    'sidebar.helpdesk': 'Helpdesk',
    'sidebar.assets': 'Assets',
    
    // Home page
    'home.hero.title': 'Welcome to IT Information Portal',
    'home.hero.subtitle': 'Quick access to internal applications and services',
    'home.apps.title': 'Applications & Software',
    'home.apps.subtitle': 'Quick access to internal tools and systems',
    'home.stats.apps': 'Active Applications',
    'home.stats.users': 'Active Users',
    'home.stats.uptime': 'System Uptime',
    'home.updated': 'Updated: 29/11/2024',
    
    // Navigation
    'nav.all': 'All',
    'nav.productivity': 'Productivity',
    'nav.communication': 'Communication',
    'nav.development': 'Development',
    'nav.hr': 'HR',
    'nav.finance': 'Finance',
    
    // Banner
    'banner.news.title1': 'Deploy new MES system for Factory 2',
    'banner.news.desc1': 'Smart manufacturing management system will be deployed from December 2024, helping optimize production processes and real-time monitoring.',
    'banner.news.category1': 'Production',
    'banner.news.title2': 'QC Mobile application officially launched',
    'banner.news.desc2': 'Quality control application on mobile devices helps QC team perform quick inspections and update results in real-time.',
    'banner.news.category2': 'Quality',
    'banner.news.title3': 'IT Security Policy Update 2024',
    'banner.news.desc3': 'New regulations on passwords, 2FA and VPN access. All employees need to read and comply to ensure information security.',
    'banner.news.category3': 'Security',
    'banner.explore': 'Explore',
    'banner.window.title1': 'ERP System Maintenance',
    'banner.window.content1': 'ERP system will be maintained from 22:00 today to 02:00 tomorrow',
    'banner.window.title2': 'Phishing Alert',
    'banner.window.content2': 'Detected fake email from domain hr-company.net',
    'banner.window.title3': 'Office 365 Training',
    'banner.window.content3': 'Teams & SharePoint training course at 9:00 on December 2nd',
    'banner.window.title4': 'New Server Ready',
    'banner.window.content4': 'New backup server has been installed and tested successfully',

    // Material Request translations
    'material.title': 'Online Material Request',
    'material.subtitle': 'Online material request system',
    'material.employee.info': 'Employee Information',
    'material.employee.id': 'Employee ID',
    'material.employee.name': 'Employee Name',
    'material.department': 'Department',
    'material.warehouse': 'Warehouse',
    'material.location': 'Location',
    'material.using.location': 'Using Location',
    'material.process': 'Process',
    'material.history': 'Order History',
    'material.new.request': 'Create New Request',
    'material.order.info': 'Order Information',
    'material.order.detail': 'Order Details',
    'material.back.new': 'Back to New Request',
    'material.renew': 'Renew',
    'material.delete': 'Delete',
    'material.save': 'Save',
    'material.print': 'Print',
    'material.login': 'Login',
    'material.login.employee.id': 'Enter employee ID',
    'material.login.employee.name': 'Enter employee name',
    'material.login.required': 'Please fill in all information!',
    'material.select.warehouse': 'Select warehouse',
    'material.select.department': 'Select department',
    'material.select.location': 'Select location',
    'material.select.using.location': 'Select using location',
    'material.select.date': 'Select date',
    'material.filter.date': 'Filter by date',
    'material.reload.data': 'Reload',
    'material.loading.data': 'Loading data...',
    'material.clear.filter': 'Clear filter',
    'material.orders.today': 'Today\'s Orders',
    'material.orders.recent': 'Top 10 Recent',
    'material.no.orders': 'No orders found',
    'material.items': 'items',
    'material.view': 'View',
    'material.search': 'Search Materials',
    'material.add': 'Add Material',
    'material.quantity': 'Quantity',
    'material.unit': 'Unit',
    'material.notes': 'Notes',
    'material.remove': 'Remove',
    'material.no.materials': 'No materials selected yet',
    'material.confirm.delete': 'Are you sure you want to delete this request?',
    'material.save.success': 'Request saved successfully!',
    'material.delete.success': 'Request deleted successfully!'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'vi';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
