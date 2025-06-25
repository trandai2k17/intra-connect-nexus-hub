
// IT Portal - Complete JavaScript Implementation
// Enhanced with all modern features and comprehensive functionality

// Global Configuration
const CONFIG = {
    APP_NAME: 'IT Portal',
    VERSION: '2.1.0',
    API_BASE_URL: '/api',
    STORAGE_PREFIX: 'it_portal_',
    TOAST_DURATION: 3000,
    SEARCH_DEBOUNCE: 300,
    ANNOUNCEMENT_INTERVAL: 10000,
    CHART_COLORS: {
        primary: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#06b6d4'
    }
};

// Global State Management
class StateManager {
    constructor() {
        this.state = {
            theme: localStorage.getItem(`${CONFIG.STORAGE_PREFIX}theme`) || 'light',
            language: localStorage.getItem(`${CONFIG.STORAGE_PREFIX}language`) || 'vi',
            viewMode: localStorage.getItem(`${CONFIG.STORAGE_PREFIX}viewMode`) || 'grid',
            favorites: JSON.parse(localStorage.getItem(`${CONFIG.STORAGE_PREFIX}favorites`) || '[]'),
            currentCategory: 'all',
            searchQuery: '',
            notifications: [],
            user: {
                name: 'Nguyễn Văn A',
                role: 'IT Developer',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format'
            }
        };
        this.listeners = {};
    }

    setState(key, value) {
        this.state[key] = value;
        this.saveToStorage(key, value);
        this.notifyListeners(key, value);
    }

    getState(key) {
        return this.state[key];
    }

    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
    }

    notifyListeners(key, value) {
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => callback(value));
        }
    }

    saveToStorage(key, value) {
        if (['theme', 'language', 'viewMode'].includes(key)) {
            localStorage.setItem(`${CONFIG.STORAGE_PREFIX}${key}`, value);
        } else if (key === 'favorites') {
            localStorage.setItem(`${CONFIG.STORAGE_PREFIX}${key}`, JSON.stringify(value));
        }
    }
}

// Initialize State Manager
const stateManager = new StateManager();

// Language Translations
const translations = {
    vi: {
        'nav.subtitle': 'Hệ thống Thông tin Nội bộ',
        'nav.search': 'Tìm kiếm ứng dụng...',
        'nav.notifications': 'Thông báo',
        'nav.profile': 'Hồ sơ',
        'nav.settings': 'Cài đặt',
        'nav.logout': 'Đăng xuất',
        'nav.viewAll': 'Xem tất cả',
        'sidebar.main': 'Điều hướng chính',
        'sidebar.it': 'Công nghệ thông tin',
        'sidebar.production': 'Sản xuất',
        'sidebar.quality': 'Chất lượng',
        'sidebar.hr': 'Nhân sự',
        'sidebar.inventory': 'Kho hàng',
        'sidebar.purchase': 'Mua hàng',
        'sidebar.dashboard': 'Bảng điều khiển',
        'sidebar.quickActions': 'Thao tác nhanh',
        'sidebar.newRequest': 'Yêu cầu mới',
        'sidebar.helpSupport': 'Trợ giúp & Hỗ trợ',
        'sidebar.reportIssue': 'Báo cáo sự cố',
        'banner.category1': 'Sản xuất',
        'banner.title1': 'Triển khai Hệ thống MES Mới',
        'banner.desc1': 'Hệ thống quản lý sản xuất thông minh ra mắt tháng 12/2024',
        'banner.category2': 'Chất lượng',
        'banner.title2': 'Ra mắt Ứng dụng QC Mobile',
        'banner.desc2': 'Ứng dụng kiểm soát chất lượng cho thiết bị di động',
        'banner.category3': 'Bảo mật',
        'banner.title3': 'Cập nhật Chính sách Bảo mật IT',
        'banner.desc3': 'Quy định mới về mật khẩu, 2FA và truy cập VPN',
        'banner.explore': 'Khám phá',
        'widget.maintenance': 'Bảo trì Hệ thống',
        'widget.maintenanceDesc': 'Bảo trì ERP tối nay 22:00-02:00',
        'widget.security': 'Cảnh báo Bảo mật',
        'widget.securityDesc': 'Phát hiện email lừa đảo',
        'widget.training': 'Đào tạo Office 365',
        'widget.trainingDesc': 'Khóa học Teams & SharePoint ngày 2/12',
        'widget.server': 'Máy chủ Mới Sẵn sàng',
        'widget.serverDesc': 'Máy chủ sao lưu được cài đặt thành công',
        'tabs.all': 'Tất cả',
        'tabs.production': 'Sản xuất',
        'tabs.inventory': 'Kho hàng',
        'tabs.purchase': 'Mua hàng',
        'apps.title': 'Ứng dụng & Phần mềm',
        'apps.subtitle': 'Truy cập nhanh các công cụ và hệ thống nội bộ',
        'apps.updated': 'Cập nhật: 29/11/2024',
        'stats.activeApps': 'Ứng dụng Hoạt động',
        'stats.activeUsers': 'Người dùng Hoạt động',
        'stats.uptime': 'Thời gian Hoạt động Hệ thống'
    },
    en: {
        'nav.subtitle': 'Internal Information System',
        'nav.search': 'Search applications...',
        'nav.notifications': 'Notifications',
        'nav.profile': 'Profile',
        'nav.settings': 'Settings',
        'nav.logout': 'Logout',
        'nav.viewAll': 'View All',
        'sidebar.main': 'Main Navigation',
        'sidebar.it': 'Information Technology',
        'sidebar.production': 'Production',
        'sidebar.quality': 'Quality',
        'sidebar.hr': 'Human Resources',
        'sidebar.inventory': 'Inventory',
        'sidebar.purchase': 'Purchase',
        'sidebar.dashboard': 'Dashboard',
        'sidebar.quickActions': 'Quick Actions',
        'sidebar.newRequest': 'New Request',
        'sidebar.helpSupport': 'Help & Support',
        'sidebar.reportIssue': 'Report Issue',
        'banner.category1': 'Production',
        'banner.title1': 'New MES System Deployment',
        'banner.desc1': 'Smart manufacturing management system launching December 2024',
        'banner.category2': 'Quality',
        'banner.title2': 'QC Mobile App Launch',
        'banner.desc2': 'Quality control application for mobile devices',
        'banner.category3': 'Security',
        'banner.title3': 'IT Security Policy Update',
        'banner.desc3': 'New password, 2FA and VPN access regulations',
        'banner.explore': 'Explore',
        'widget.maintenance': 'System Maintenance',
        'widget.maintenanceDesc': 'ERP maintenance tonight 22:00-02:00',
        'widget.security': 'Security Alert',
        'widget.securityDesc': 'Phishing email detected',
        'widget.training': 'Office 365 Training',
        'widget.trainingDesc': 'Teams & SharePoint course Dec 2',
        'widget.server': 'New Server Ready',
        'widget.serverDesc': 'Backup server installed successfully',
        'tabs.all': 'All',
        'tabs.production': 'Production',
        'tabs.inventory': 'Inventory',
        'tabs.purchase': 'Purchase',
        'apps.title': 'Applications & Software',
        'apps.subtitle': 'Quick access to internal tools and systems',
        'apps.updated': 'Updated: 29/11/2024',
        'stats.activeApps': 'Active Applications',
        'stats.activeUsers': 'Active Users',
        'stats.uptime': 'System Uptime'
    }
};

// Applications Database
const applications = [
    { 
        id: 1, 
        name: 'ERP System', 
        description: 'Enterprise Resource Planning', 
        icon: 'bi-building', 
        color: 'primary', 
        category: ['production', 'hr', 'inventory'], 
        url: '#erp',
        status: 'active',
        version: '2.1.0',
        lastUpdated: '2024-11-29'
    },
    { 
        id: 2, 
        name: 'QC Mobile', 
        description: 'Quality Control App', 
        icon: 'bi-phone', 
        color: 'success', 
        category: ['quality'], 
        url: '#qc',
        status: 'active',
        version: '1.5.2',
        lastUpdated: '2024-11-28'
    },
    { 
        id: 3, 
        name: 'HR Portal', 
        description: 'Human Resources Management', 
        icon: 'bi-people', 
        color: 'info', 
        category: ['hr'], 
        url: '#hr',
        status: 'active',
        version: '3.0.1',
        lastUpdated: '2024-11-27'
    },
    { 
        id: 4, 
        name: 'Inventory Manager', 
        description: 'Stock Management System', 
        icon: 'bi-box', 
        color: 'warning', 
        category: ['inventory'], 
        url: '#inventory',
        status: 'active',
        version: '2.3.0',
        lastUpdated: '2024-11-26'
    },
    { 
        id: 5, 
        name: 'Purchase System', 
        description: 'Procurement Management', 
        icon: 'bi-cart', 
        color: 'danger', 
        category: ['purchase'], 
        url: '#purchase',
        status: 'active',
        version: '1.8.5',
        lastUpdated: '2024-11-25'
    },
    { 
        id: 6, 
        name: 'IT Service Desk', 
        description: 'IT Support Portal', 
        icon: 'bi-headset', 
        color: 'secondary', 
        category: ['it'], 
        url: '#servicedesk',
        status: 'active',
        version: '2.0.0',
        lastUpdated: '2024-11-24'
    },
    { 
        id: 7, 
        name: 'Document Manager', 
        description: 'Document Management System', 
        icon: 'bi-file-text', 
        color: 'dark', 
        category: ['it'], 
        url: '#docs',
        status: 'maintenance',
        version: '1.9.2',
        lastUpdated: '2024-11-23'
    },
    { 
        id: 8, 
        name: 'Time Tracking', 
        description: 'Employee Time Management', 
        icon: 'bi-clock', 
        color: 'primary', 
        category: ['hr'], 
        url: '#timetrack',
        status: 'active',
        version: '2.2.1',
        lastUpdated: '2024-11-22'
    },
    { 
        id: 9, 
        name: 'Production Dashboard', 
        description: 'Manufacturing Analytics', 
        icon: 'bi-speedometer2', 
        color: 'success', 
        category: ['production'], 
        url: '#dashboard',
        status: 'active',
        version: '3.1.0',
        lastUpdated: '2024-11-21'
    },
    { 
        id: 10, 
        name: 'Quality Reports', 
        description: 'QA/QC Reporting Tool', 
        icon: 'bi-bar-chart', 
        color: 'info', 
        category: ['quality'], 
        url: '#reports',
        status: 'active',
        version: '1.6.3',
        lastUpdated: '2024-11-20'
    },
    { 
        id: 11, 
        name: 'Asset Management', 
        description: 'Company Asset Tracking', 
        icon: 'bi-laptop', 
        color: 'warning', 
        category: ['it'], 
        url: '#assets',
        status: 'active',
        version: '2.4.0',
        lastUpdated: '2024-11-19'
    },
    { 
        id: 12, 
        name: 'Vendor Portal', 
        description: 'Supplier Management', 
        icon: 'bi-truck', 
        color: 'danger', 
        category: ['purchase'], 
        url: '#vendors',
        status: 'beta',
        version: '0.9.1',
        lastUpdated: '2024-11-18'
    }
];

// Announcement Messages
const announcements = {
    vi: [
        "🎉 Hệ thống ERP mới đã được cập nhật với nhiều tính năng hữu ích",
        "📢 Bảo trì hệ thống dự kiến vào 22:00 - 02:00 đêm nay", 
        "🚀 Ứng dụng mobile QC đã ra mắt trên App Store",
        "💡 Khóa học Excel nâng cao sẽ bắt đầu vào tuần tới",
        "🔒 Cập nhật chính sách bảo mật - vui lòng đổi mật khẩu",
        "📊 Báo cáo tháng 11 đã sẵn sàng để xem",
        "🌟 Portal mới với giao diện hiện đại đã ra mắt",
        "⚡ Tốc độ hệ thống được cải thiện 40% sau cập nhật"
    ],
    en: [
        "🎉 New ERP system has been updated with many useful features",
        "📢 System maintenance scheduled for 22:00 - 02:00 tonight",
        "🚀 QC mobile app has launched on the App Store", 
        "💡 Advanced Excel course will start next week",
        "🔒 Security policy update - please change your password",
        "📊 November reports are ready for review",
        "🌟 New portal with modern interface has launched",
        "⚡ System speed improved by 40% after update"
    ]
};

// Notification Data
const notificationData = [
    {
        id: 1,
        title: 'Bảo trì Hệ thống',
        message: 'Hệ thống ERP sẽ được bảo trì từ 22:00 đến 02:00',
        time: '2 phút trước',
        type: 'warning',
        unread: true,
        icon: 'bi-exclamation-triangle'
    },
    {
        id: 2,
        title: 'Ứng dụng Mới',
        message: 'Ứng dụng QC Mobile đã có sẵn để tải xuống',
        time: '1 giờ trước',
        type: 'info',
        unread: true,
        icon: 'bi-info-circle'
    },
    {
        id: 3,
        title: 'Cảnh báo Bảo mật',
        message: 'Phát hiện nỗ lực đăng nhập khả nghi',
        time: '3 giờ trước',
        type: 'danger',
        unread: false,
        icon: 'bi-shield-exclamation'
    },
    {
        id: 4,
        title: 'Cập nhật Thành công',
        message: 'Hệ thống đã được cập nhật lên phiên bản mới',
        time: '1 ngày trước',
        type: 'success',
        unread: false,
        icon: 'bi-check-circle'
    }
];

// Utility Functions
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static formatDate(date) {
        return new Date(date).toLocaleDateString('vi-VN');
    }

    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    static animateElement(element, animation, duration = 600) {
        return new Promise(resolve => {
            element.style.animation = `${animation} ${duration}ms ease-out`;
            element.addEventListener('animationend', () => {
                element.style.animation = '';
                resolve();
            }, { once: true });
        });
    }

    static copyToClipboard(text) {
        return navigator.clipboard.writeText(text);
    }

    static downloadFile(data, filename, type = 'text/plain') {
        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Toast Notification System
class ToastManager {
    constructor() {
        this.container = document.getElementById('toastContainer');
        this.toasts = new Map();
    }

    show(message, type = 'info', duration = CONFIG.TOAST_DURATION) {
        const toastId = Utils.generateId();
        const toast = this.createToast(toastId, message, type);
        
        this.container.appendChild(toast);
        this.toasts.set(toastId, toast);

        // Initialize Bootstrap toast
        const bsToast = new bootstrap.Toast(toast, {
            autohide: true,
            delay: duration
        });

        // Show toast
        bsToast.show();

        // Remove from DOM after hiding
        toast.addEventListener('hidden.bs.toast', () => {
            this.toasts.delete(toastId);
            toast.remove();
        });

        return toastId;
    }

    createToast(id, message, type) {
        const toast = document.createElement('div');
        toast.id = id;
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');

        const iconMap = {
            success: 'bi-check-circle',
            danger: 'bi-exclamation-circle',
            warning: 'bi-exclamation-triangle',
            info: 'bi-info-circle'
        };

        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body d-flex align-items-center">
                    <i class="bi ${iconMap[type] || 'bi-info-circle'} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        return toast;
    }

    hide(toastId) {
        const toast = this.toasts.get(toastId);
        if (toast) {
            const bsToast = bootstrap.Toast.getInstance(toast);
            if (bsToast) {
                bsToast.hide();
            }
        }
    }

    clear() {
        this.toasts.forEach(toast => {
            const bsToast = bootstrap.Toast.getInstance(toast);
            if (bsToast) {
                bsToast.hide();
            }
        });
    }
}

// Initialize Toast Manager
const toastManager = new ToastManager();

// Main Application Class
class ITPortalApp {
    constructor() {
        this.searchDebounce = Utils.debounce(this.handleSearch.bind(this), CONFIG.SEARCH_DEBOUNCE);
        this.currentAnnouncementIndex = 0;
        this.charts = {};
        this.init();
    }

    async init() {
        console.log('Initializing IT Portal...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        try {
            // Apply saved settings
            this.applyTheme(stateManager.getState('theme'));
            this.applyLanguage(stateManager.getState('language'));
            this.applyViewMode(stateManager.getState('viewMode'));

            // Setup event listeners
            this.setupEventListeners();

            // Load initial data
            this.loadApplications();
            this.loadNotifications();
            this.startAnnouncementRotation();
            
            // Initialize charts
            this.initializeCharts();

            // Initialize AOS animations
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    once: true,
                    offset: 100
                });
            }

            // Update UI elements
            this.updateUI();

            // Hide loading screen
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 1500);

            console.log('IT Portal initialized successfully');
            toastManager.show('IT Portal đã sẵn sàng!', 'success');

        } catch (error) {
            console.error('Error initializing IT Portal:', error);
            toastManager.show('Lỗi khởi tạo ứng dụng', 'danger');
        }
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Language toggle
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => this.toggleLanguage());
        }

        // View mode toggle
        const viewModeButtons = document.querySelectorAll('#viewModeToggle button');
        viewModeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const viewMode = button.dataset.view;
                this.setViewMode(viewMode);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const mobileSearchInput = document.getElementById('mobileSearchInput');
        const mobileSearchToggle = document.getElementById('mobileSearchToggle');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.searchDebounce(e.target.value));
            searchInput.addEventListener('focus', () => this.showSearchResults());
            searchInput.addEventListener('blur', () => setTimeout(() => this.hideSearchResults(), 150));
        }

        if (mobileSearchInput) {
            mobileSearchInput.addEventListener('input', (e) => this.searchDebounce(e.target.value));
        }

        if (mobileSearchToggle) {
            mobileSearchToggle.addEventListener('click', () => this.toggleMobileSearch());
        }

        // Category tabs
        const categoryTabs = document.querySelectorAll('#categoryTabs button');
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                this.setActiveCategory(category);
            });
        });

        // Sidebar navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e, link));
        });

        // Notification management
        const markAllRead = document.getElementById('markAllRead');
        if (markAllRead) {
            markAllRead.addEventListener('click', () => this.markAllNotificationsRead());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Window events
        window.addEventListener('resize', () => this.handleWindowResize());
        window.addEventListener('beforeunload', () => this.saveAppState());

        // Click outside handlers
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // State change subscriptions
        stateManager.subscribe('theme', (theme) => this.applyTheme(theme));
        stateManager.subscribe('language', (language) => this.applyLanguage(language));
        stateManager.subscribe('viewMode', (viewMode) => this.applyViewMode(viewMode));
        stateManager.subscribe('favorites', () => this.loadApplications());
    }

    // Theme Management
    toggleTheme() {
        const currentTheme = stateManager.getState('theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        stateManager.setState('theme', newTheme);
        toastManager.show(`Đã chuyển sang giao diện ${newTheme === 'dark' ? 'tối' : 'sáng'}`, 'info');
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.classList.toggle('dark-theme', theme === 'dark');
        
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
        }

        // Update charts colors for theme
        this.updateChartsTheme(theme);
    }

    // Language Management
    toggleLanguage() {
        const currentLanguage = stateManager.getState('language');
        const newLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
        stateManager.setState('language', newLanguage);
        toastManager.show(`Đã chuyển sang ${newLanguage === 'vi' ? 'Tiếng Việt' : 'English'}`, 'info');
    }

    applyLanguage(language) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language] && translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });

        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[language] && translations[language][key]) {
                element.setAttribute('placeholder', translations[language][key]);
            }
        });

        const languageText = document.getElementById('languageText');
        if (languageText) {
            languageText.textContent = language.toUpperCase();
        }

        // Update announcements
        this.startAnnouncementRotation();
    }

    // View Mode Management
    setViewMode(mode) {
        stateManager.setState('viewMode', mode);
        this.updateViewModeButtons();
        this.loadApplications();
    }

    applyViewMode(mode) {
        this.updateViewModeButtons();
    }

    updateViewModeButtons() {
        const buttons = document.querySelectorAll('#viewModeToggle button');
        const currentMode = stateManager.getState('viewMode');
        
        buttons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.view === currentMode) {
                button.classList.add('active');
            }
        });
    }

    // Search Functionality
    handleSearch(query) {
        stateManager.setState('searchQuery', query);
        
        if (!query.trim()) {
            this.hideSearchResults();
            return;
        }

        const results = applications.filter(app => 
            app.name.toLowerCase().includes(query.toLowerCase()) || 
            app.description.toLowerCase().includes(query.toLowerCase()) ||
            app.category.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
        );

        this.displaySearchResults(results);
    }

    displaySearchResults(results) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        searchResults.innerHTML = '';

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="p-3 text-muted">Không tìm thấy ứng dụng nào</div>';
        } else {
            results.slice(0, 8).forEach(app => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item d-flex align-items-center';
                resultItem.innerHTML = `
                    <div class="app-icon bg-${app.color} bg-opacity-10 text-${app.color} me-3" style="width: 32px; height: 32px; min-width: 32px;">
                        <i class="bi ${app.icon}" style="font-size: 1rem;"></i>
                    </div>
                    <div class="flex-grow-1">
                        <div class="fw-semibold">${app.name}</div>
                        <small class="text-muted">${app.description}</small>
                    </div>
                    <div class="text-end">
                        <span class="badge bg-${app.color} bg-opacity-10 text-${app.color}">${app.status}</span>
                    </div>
                `;

                resultItem.addEventListener('click', () => {
                    this.openApplication(app);
                    this.hideSearchResults();
                });

                searchResults.appendChild(resultItem);
            });
        }

        searchResults.classList.add('show');
    }

    showSearchResults() {
        const searchResults = document.getElementById('searchResults');
        const query = stateManager.getState('searchQuery');
        
        if (searchResults && searchResults.children.length > 0 && query) {
            searchResults.classList.add('show');
        }
    }

    hideSearchResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.classList.remove('show');
        }
    }

    toggleMobileSearch() {
        const container = document.getElementById('mobileSearchContainer');
        if (container) {
            const isVisible = container.style.display !== 'none';
            container.style.display = isVisible ? 'none' : 'block';
            
            if (!isVisible) {
                const input = document.getElementById('mobileSearchInput');
                if (input) {
                    setTimeout(() => input.focus(), 100);
                }
            }
        }
    }

    // Category Management
    setActiveCategory(category) {
        stateManager.setState('currentCategory', category);
        
        const tabs = document.querySelectorAll('#categoryTabs button');
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            }
        });

        this.loadApplications();
    }

    // Application Management
    loadApplications() {
        const container = document.getElementById('applicationsContainer');
        if (!container) return;

        const currentCategory = stateManager.getState('currentCategory');
        const viewMode = stateManager.getState('viewMode');
        
        let filteredApps = applications;
        if (currentCategory !== 'all') {
            filteredApps = applications.filter(app => 
                app.category.includes(currentCategory)
            );
        }

        if (viewMode === 'grid') {
            this.renderGridView(container, filteredApps);
        } else {
            this.renderListView(container, filteredApps);
        }

        // Update category counts
        this.updateCategoryCounts();
    }

    renderGridView(container, apps) {
        const favorites = stateManager.getState('favorites');
        
        container.innerHTML = `
            <div class="row g-4">
                ${apps.map((app, index) => `
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card app-card h-100 position-relative" data-aos="zoom-in" data-aos-delay="${index * 50}">
                            <button class="btn favorite-btn ${favorites.includes(app.id) ? 'favorited' : ''}" onclick="app.toggleFavorite(${app.id})">
                                <i class="bi ${favorites.includes(app.id) ? 'bi-star-fill' : 'bi-star'}"></i>
                            </button>
                            <div class="card-body text-center">
                                <div class="app-icon bg-${app.color} bg-opacity-10 text-${app.color} mb-3">
                                    <i class="bi ${app.icon}"></i>
                                </div>
                                <h5 class="card-title">${app.name}</h5>
                                <p class="card-text text-muted">${app.description}</p>
                                <div class="d-flex justify-content-center gap-2">
                                    <button class="btn btn-${app.color} btn-sm" onclick="app.openApplication(${JSON.stringify(app).replace(/"/g, '&quot;')})">
                                        <i class="bi bi-box-arrow-up-right me-1"></i>
                                        Mở
                                    </button>
                                    <button class="btn btn-outline-secondary btn-sm" onclick="app.showApplicationDetail(${JSON.stringify(app).replace(/"/g, '&quot;')})">
                                        <i class="bi bi-info-circle"></i>
                                    </button>
                                </div>
                                <div class="mt-2">
                                    <small class="text-muted">v${app.version}</small>
                                    ${this.getStatusBadge(app.status)}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderListView(container, apps) {
        const favorites = stateManager.getState('favorites');
        
        container.innerHTML = `
            <div class="list-group">
                ${apps.map((app, index) => `
                    <div class="list-group-item app-card-list d-flex align-items-center" data-aos="fade-up" data-aos-delay="${index * 30}">
                        <div class="app-icon bg-${app.color} bg-opacity-10 text-${app.color} me-3">
                            <i class="bi ${app.icon}"></i>
                        </div>
                        <div class="flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 class="mb-1">${app.name}</h6>
                                    <p class="mb-0 text-muted small">${app.description}</p>
                                </div>
                                <div class="text-end">
                                    <small class="text-muted">v${app.version}</small>
                                    ${this.getStatusBadge(app.status)}
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2 ms-3">
                            <button class="btn btn-link favorite-btn p-1 ${favorites.includes(app.id) ? 'favorited' : ''}" onclick="app.toggleFavorite(${app.id})">
                                <i class="bi ${favorites.includes(app.id) ? 'bi-star-fill' : 'bi-star'}"></i>
                            </button>
                            <button class="btn btn-outline-secondary btn-sm" onclick="app.showApplicationDetail(${JSON.stringify(app).replace(/"/g, '&quot;')})">
                                <i class="bi bi-info-circle"></i>
                            </button>
                            <button class="btn btn-${app.color} btn-sm" onclick="app.openApplication(${JSON.stringify(app).replace(/"/g, '&quot;')})">
                                <i class="bi bi-box-arrow-up-right"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getStatusBadge(status) {
        const statusConfig = {
            active: { class: 'success', text: 'Hoạt động' },
            maintenance: { class: 'warning', text: 'Bảo trì' },
            beta: { class: 'info', text: 'Beta' },
            inactive: { class: 'secondary', text: 'Không hoạt động' }
        };
        
        const config = statusConfig[status] || statusConfig.active;
        return `<span class="badge bg-${config.class} ms-2">${config.text}</span>`;
    }

    updateCategoryCounts() {
        const categoryCounts = {
            all: applications.length,
            it: applications.filter(app => app.category.includes('it')).length,
            production: applications.filter(app => app.category.includes('production')).length,
            quality: applications.filter(app => app.category.includes('quality')).length,
            hr: applications.filter(app => app.category.includes('hr')).length,
            inventory: applications.filter(app => app.category.includes('inventory')).length,
            purchase: applications.filter(app => app.category.includes('purchase')).length
        };

        Object.entries(categoryCounts).forEach(([category, count]) => {
            const tab = document.querySelector(`#categoryTabs button[data-category="${category}"] .badge`);
            if (tab) {
                tab.textContent = count;
            }
        });
    }

    // Application Actions
    openApplication(appData) {
        const app = typeof appData === 'string' ? JSON.parse(appData) : appData;
        
        if (app.status === 'maintenance') {
            toastManager.show(`${app.name} đang trong quá trình bảo trì`, 'warning');
            return;
        }

        // Simulate opening application
        toastManager.show(`Đang mở ${app.name}...`, 'info');
        
        // In a real application, this would navigate to the actual app
        setTimeout(() => {
            window.open(app.url, '_blank');
        }, 500);
    }

    showApplicationDetail(appData) {
        const app = typeof appData === 'string' ? JSON.parse(appData) : appData;
        
        const modal = document.getElementById('appDetailModal');
        const modalTitle = document.getElementById('appModalTitle');
        const modalBody = document.getElementById('appModalBody');
        const launchButton = document.getElementById('appModalLaunch');

        if (modal && modalTitle && modalBody && launchButton) {
            modalTitle.textContent = app.name;
            
            modalBody.innerHTML = `
                <div class="row">
                    <div class="col-md-4 text-center">
                        <div class="app-icon bg-${app.color} bg-opacity-10 text-${app.color} mb-3" style="width: 80px; height: 80px; margin: 0 auto;">
                            <i class="bi ${app.icon}" style="font-size: 2rem;"></i>
                        </div>
                        ${this.getStatusBadge(app.status)}
                    </div>
                    <div class="col-md-8">
                        <h5>${app.name}</h5>
                        <p class="text-muted">${app.description}</p>
                        <hr>
                        <div class="row">
                            <div class="col-6">
                                <strong>Phiên bản:</strong><br>
                                <span class="text-muted">${app.version}</span>
                            </div>
                            <div class="col-6">
                                <strong>Cập nhật cuối:</strong><br>
                                <span class="text-muted">${Utils.formatDate(app.lastUpdated)}</span>
                            </div>
                        </div>
                        <div class="mt-3">
                            <strong>Danh mục:</strong><br>
                            ${app.category.map(cat => `<span class="badge bg-secondary me-1">${cat}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;

            launchButton.onclick = () => {
                this.openApplication(app);
                bootstrap.Modal.getInstance(modal).hide();
            };

            new bootstrap.Modal(modal).show();
        }
    }

    toggleFavorite(appId) {
        const favorites = stateManager.getState('favorites');
        const index = favorites.indexOf(appId);
        
        if (index > -1) {
            favorites.splice(index, 1);
            toastManager.show('Đã xóa khỏi danh sách yêu thích', 'info');
        } else {
            favorites.push(appId);
            toastManager.show('Đã thêm vào danh sách yêu thích', 'success');
        }
        
        stateManager.setState('favorites', favorites);
    }

    // Notification Management
    loadNotifications() {
        stateManager.setState('notifications', [...notificationData]);
        this.renderNotifications();
        this.updateNotificationBadge();
    }

    renderNotifications() {
        const container = document.getElementById('notificationList');
        const notifications = stateManager.getState('notifications');
        
        if (!container) return;

        container.innerHTML = notifications.map(notification => `
            <div class="notification-item ${notification.unread ? 'unread' : ''}" data-id="${notification.id}">
                <div class="d-flex align-items-start">
                    <div class="text-${notification.type} me-3">
                        <i class="bi ${notification.icon}"></i>
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${notification.title}</h6>
                        <p class="mb-1 small">${notification.message}</p>
                        <small class="text-muted">${notification.time}</small>
                    </div>
                    ${notification.unread ? '<div class="badge bg-primary rounded-pill">Mới</div>' : ''}
                </div>
            </div>
        `).join('');

        // Add click handlers
        container.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.markNotificationRead(id);
            });
        });
    }

    markNotificationRead(notificationId) {
        const notifications = stateManager.getState('notifications');
        const notification = notifications.find(n => n.id === notificationId);
        
        if (notification && notification.unread) {
            notification.unread = false;
            stateManager.setState('notifications', notifications);
            this.renderNotifications();
            this.updateNotificationBadge();
        }
    }

    markAllNotificationsRead() {
        const notifications = stateManager.getState('notifications');
        const hasUnread = notifications.some(n => n.unread);
        
        if (hasUnread) {
            notifications.forEach(notification => {
                notification.unread = false;
            });
            
            stateManager.setState('notifications', notifications);
            this.renderNotifications();
            this.updateNotificationBadge();
            toastManager.show('Đã đánh dấu tất cả thông báo là đã đọc', 'success');
        }
    }

    updateNotificationBadge() {
        const badge = document.querySelector('.notification-badge');
        const notifications = stateManager.getState('notifications');
        const unreadCount = notifications.filter(n => n.unread).length;
        
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    }

    // Announcement Management
    startAnnouncementRotation() {
        const announcementText = document.getElementById('announcementText');
        if (!announcementText) return;

        const language = stateManager.getState('language');
        const messages = announcements[language] || announcements.vi;
        
        const rotateAnnouncement = () => {
            announcementText.style.opacity = '0';
            
            setTimeout(() => {
                announcementText.textContent = messages[this.currentAnnouncementIndex];
                announcementText.style.opacity = '1';
                this.currentAnnouncementIndex = (this.currentAnnouncementIndex + 1) % messages.length;
            }, 500);
        };

        // Initial announcement
        announcementText.textContent = messages[0];
        
        // Clear existing interval
        if (this.announcementInterval) {
            clearInterval(this.announcementInterval);
        }
        
        // Start new interval
        this.announcementInterval = setInterval(rotateAnnouncement, CONFIG.ANNOUNCEMENT_INTERVAL);
    }

    // Navigation Management
    handleNavigation(e, link) {
        if (link.classList.contains('dropdown-toggle')) {
            return; // Let Bootstrap handle dropdown toggles
        }
        
        e.preventDefault();
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Handle routing
        const route = link.dataset.route;
        if (route) {
            this.navigateToRoute(route);
        }
    }

    navigateToRoute(route) {
        // Simulate routing
        console.log(`Navigating to: ${route}`);
        toastManager.show(`Đang chuyển đến ${route}`, 'info');
        
        // In a real application, this would handle actual routing
        // For now, we'll just update the URL hash
        window.location.hash = route;
    }

    // Chart Management
    initializeCharts() {
        this.initUsageChart();
        this.initUserChart();
    }

    initUsageChart() {
        const canvas = document.getElementById('usageChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        this.charts.usage = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
                datasets: [{
                    label: 'Lượt truy cập',
                    data: [1200, 1350, 1100, 1400, 1250, 900, 800],
                    borderColor: CONFIG.CHART_COLORS.primary,
                    backgroundColor: CONFIG.CHART_COLORS.primary + '20',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                }
            }
        });
    }

    initUserChart() {
        const canvas = document.getElementById('userChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        this.charts.user = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['IT', 'Sản xuất', 'Chất lượng', 'Nhân sự'],
                datasets: [{
                    data: [30, 25, 20, 25],
                    backgroundColor: [
                        CONFIG.CHART_COLORS.primary,
                        CONFIG.CHART_COLORS.success,
                        CONFIG.CHART_COLORS.warning,
                        CONFIG.CHART_COLORS.info
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    updateChartsTheme(theme) {
        const textColor = theme === 'dark' ? '#f1f5f9' : '#1e293b';
        const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

        Object.values(this.charts).forEach(chart => {
            if (chart.options.scales) {
                if (chart.options.scales.x) {
                    chart.options.scales.x.ticks = { color: textColor };
                    chart.options.scales.x.grid = { color: gridColor };
                }
                if (chart.options.scales.y) {
                    chart.options.scales.y.ticks = { color: textColor };
                    chart.options.scales.y.grid = { color: gridColor };
                }
            }
            
            if (chart.options.plugins && chart.options.plugins.legend) {
                chart.options.plugins.legend.labels.color = textColor;
            }
            
            chart.update();
        });
    }

    // Event Handlers
    handleKeyboardShortcuts(e) {
        // Ctrl + K for search
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Ctrl + B for sidebar toggle (mobile)
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            const sidebar = document.getElementById('sidebar');
            if (sidebar && window.innerWidth < 992) {
                const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(sidebar);
                bsOffcanvas.toggle();
            }
        }
        
        // Ctrl + / for shortcuts modal
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            const shortcutsModal = new bootstrap.Modal(document.getElementById('shortcutsModal'));
            shortcutsModal.show();
        }
        
        // Escape to close modals and search
        if (e.key === 'Escape') {
            this.hideSearchResults();
            
            // Close any open Bootstrap modals
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) {
                    bsModal.hide();
                }
            });
        }
    }

    handleWindowResize() {
        // Handle responsive behavior
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth >= 992) {
            // Desktop - ensure sidebar is hidden as offcanvas
            if (sidebar) {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebar);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            }
        }

        // Update charts
        Object.values(this.charts).forEach(chart => {
            chart.resize();
        });
    }

    handleOutsideClick(e) {
        // Close search results when clicking outside
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer && !searchContainer.contains(e.target)) {
            this.hideSearchResults();
        }
    }

    // State Management
    saveAppState() {
        // Save any unsaved state before page unload
        console.log('Saving application state...');
    }

    updateUI() {
        this.updateViewModeButtons();
        this.updateNotificationBadge();
        this.updateCategoryCounts();
        
        // Update statistics
        this.updateStatistics();
    }

    updateStatistics() {
        // Simulate real-time statistics updates
        const activeAppsCount = document.getElementById('activeAppsCount');
        const activeUsersCount = document.getElementById('activeUsersCount');
        const systemUptime = document.getElementById('systemUptime');

        if (activeAppsCount) {
            const count = applications.filter(app => app.status === 'active').length;
            activeAppsCount.textContent = count;
        }

        if (activeUsersCount) {
            // Simulate user count with some variation
            const baseCount = 1247;
            const variation = Math.floor(Math.random() * 20) - 10;
            activeUsersCount.textContent = (baseCount + variation).toLocaleString();
        }

        if (systemUptime) {
            // Simulate uptime percentage
            const uptime = (99.5 + Math.random() * 0.8).toFixed(1);
            systemUptime.textContent = uptime + '%';
        }
    }

    // Cleanup
    destroy() {
        // Clear intervals
        if (this.announcementInterval) {
            clearInterval(this.announcementInterval);
        }

        // Destroy charts
        Object.values(this.charts).forEach(chart => {
            chart.destroy();
        });

        // Clear toasts
        toastManager.clear();

        console.log('IT Portal destroyed');
    }
}

// Global functions for HTML onclick handlers
window.app = {
    toggleFavorite: (appId) => itPortalApp.toggleFavorite(appId),
    openApplication: (appData) => itPortalApp.openApplication(appData),
    showApplicationDetail: (appData) => itPortalApp.showApplicationDetail(appData)
};

// Global utility functions
window.showToast = (message, type = 'info') => toastManager.show(message, type);

// Initialize the application
let itPortalApp;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing IT Portal...');
    itPortalApp = new ITPortalApp();
});

// Handle page unload
window.addEventListener('beforeunload', function() {
    if (itPortalApp) {
        itPortalApp.destroy();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ITPortalApp, StateManager, Utils, ToastManager };
}

console.log('IT Portal script loaded successfully');
