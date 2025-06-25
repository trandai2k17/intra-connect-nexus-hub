
// IT Portal - JavaScript Implementation
// Comprehensive script with all features matching React version

// Global state management
let currentTheme = localStorage.getItem('theme') || 'light';
let currentLanguage = localStorage.getItem('language') || 'vi';
let currentViewMode = localStorage.getItem('viewMode') || 'grid';
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
let notifications = [];
let currentCategory = 'all';

// Language translations
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

// Applications data
const applications = [
    { id: 1, name: 'ERP System', description: 'Enterprise Resource Planning', icon: 'bi-building', color: 'primary', category: ['production', 'hr', 'inventory'], url: '#erp' },
    { id: 2, name: 'QC Mobile', description: 'Quality Control App', icon: 'bi-phone', color: 'success', category: ['quality'], url: '#qc' },
    { id: 3, name: 'HR Portal', description: 'Human Resources Management', icon: 'bi-people', color: 'info', category: ['hr'], url: '#hr' },
    { id: 4, name: 'Inventory Manager', description: 'Stock Management System', icon: 'bi-box', color: 'warning', category: ['inventory'], url: '#inventory' },
    { id: 5, name: 'Purchase System', description: 'Procurement Management', icon: 'bi-cart', color: 'danger', category: ['purchase'], url: '#purchase' },
    { id: 6, name: 'IT Service Desk', description: 'IT Support Portal', icon: 'bi-headset', color: 'secondary', category: ['it'], url: '#servicedesk' },
    { id: 7, name: 'Document Manager', description: 'Document Management System', icon: 'bi-file-text', color: 'dark', category: ['it'], url: '#docs' },
    { id: 8, name: 'Time Tracking', description: 'Employee Time Management', icon: 'bi-clock', color: 'primary', category: ['hr'], url: '#timetrack' },
    { id: 9, name: 'Production Dashboard', description: 'Manufacturing Analytics', icon: 'bi-speedometer2', color: 'success', category: ['production'], url: '#dashboard' },
    { id: 10, name: 'Quality Reports', description: 'QA/QC Reporting Tool', icon: 'bi-bar-chart', color: 'info', category: ['quality'], url: '#reports' },
    { id: 11, name: 'Asset Management', description: 'Company Asset Tracking', icon: 'bi-laptop', color: 'warning', category: ['it'], url: '#assets' },
    { id: 12, name: 'Vendor Portal', description: 'Supplier Management', icon: 'bi-truck', color: 'danger', category: ['purchase'], url: '#vendors' }
];

// Announcement messages
const announcements = {
    vi: [
        "🎉 Hệ thống ERP mới đã được cập nhật với nhiều tính năng hữu ích",
        "📢 Bảo trì hệ thống dự kiến vào 22:00 - 02:00 đêm nay",
        "🚀 Ứng dụng mobile QC đã ra mắt trên App Store",
        "💡 Khóa học Excel nâng cao sẽ bắt đầu vào tuần tới",
        "🔒 Cập nhật chính sách bảo mật - vui lòng đổi mật khẩu",
        "📊 Báo cáo tháng 11 đã sẵn sàng để xem"
    ],
    en: [
        "🎉 New ERP system has been updated with many useful features",
        "📢 System maintenance scheduled for 22:00 - 02:00 tonight",
        "🚀 QC mobile app has launched on the App Store",
        "💡 Advanced Excel course will start next week",
        "🔒 Security policy update - please change your password",
        "📊 November reports are ready for review"
    ]
};

// Notification data
const notificationData = [
    {
        id: 1,
        title: 'System Maintenance',
        message: 'ERP system will be down for maintenance from 22:00 to 02:00',
        time: '2 minutes ago',
        type: 'warning',
        unread: true
    },
    {
        id: 2,
        title: 'New App Available',
        message: 'QC Mobile app is now available for download',
        time: '1 hour ago',
        type: 'info',
        unread: true
    },
    {
        id: 3,
        title: 'Security Alert',
        message: 'Suspicious login attempt detected',
        time: '3 hours ago',
        type: 'danger',
        unread: false
    }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('IT Portal initialized');
    
    // Initialize the application
    initializeApp();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load initial data
    loadApplications();
    loadNotifications();
    
    // Start announcement rotation
    startAnnouncementRotation();
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
    
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
});

// Initialize Application
function initializeApp() {
    console.log('Initializing IT Portal...');
    
    // Apply saved theme
    applyTheme(currentTheme);
    
    // Apply saved language
    applyLanguage(currentLanguage);
    
    // Apply saved view mode
    applyViewMode(currentViewMode);
    
    // Update UI elements
    updateLanguageToggle();
    updateThemeToggle();
    updateViewModeToggle();
    
    console.log('IT Portal initialization complete');
}

// Setup Event Listeners
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Language toggle
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
    
    // View mode toggle
    const viewModeButtons = document.querySelectorAll('#viewModeToggle button');
    viewModeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewMode = this.dataset.view;
            setViewMode(viewMode);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const mobileSearchToggle = document.getElementById('mobileSearchToggle');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('focus', showSearchResults);
        searchInput.addEventListener('blur', hideSearchResults);
    }
    
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', handleSearch);
    }
    
    if (mobileSearchToggle) {
        mobileSearchToggle.addEventListener('click', toggleMobileSearch);
    }
    
    // Category tabs
    const categoryTabs = document.querySelectorAll('#categoryTabs button');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            setActiveCategory(category);
        });
    });
    
    // Sidebar navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.classList.contains('dropdown-toggle')) {
                return; // Let Bootstrap handle dropdown toggles
            }
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Notification management
    const markAllRead = document.getElementById('markAllRead');
    if (markAllRead) {
        markAllRead.addEventListener('click', markAllNotificationsRead);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Window resize handler
    window.addEventListener('resize', handleWindowResize);
    
    // Click outside to close search results
    document.addEventListener('click', function(e) {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer && !searchContainer.contains(e.target)) {
            hideSearchResults();
        }
    });
}

// Theme Management
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeToggle();
    showToast(`Switched to ${currentTheme} theme`, 'info');
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update body class for additional styling
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

function updateThemeToggle() {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        if (currentTheme === 'dark') {
            themeIcon.className = 'bi bi-moon-fill';
        } else {
            themeIcon.className = 'bi bi-sun-fill';
        }
    }
}

// Language Management
function toggleLanguage() {
    currentLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
    applyLanguage(currentLanguage);
    localStorage.setItem('language', currentLanguage);
    updateLanguageToggle();
    showToast(`Language changed to ${currentLanguage.toUpperCase()}`, 'info');
}

function applyLanguage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[language] && translations[language][key]) {
            element.setAttribute('placeholder', translations[language][key]);
        }
    });
}

function updateLanguageToggle() {
    const languageText = document.getElementById('languageText');
    if (languageText) {
        languageText.textContent = currentLanguage.toUpperCase();
    }
}

// View Mode Management
function setViewMode(mode) {
    currentViewMode = mode;
    applyViewMode(mode);
    localStorage.setItem('viewMode', mode);
    updateViewModeToggle();
    loadApplications(); // Reload applications with new view mode
}

function applyViewMode(mode) {
    // This will be handled in loadApplications function
    console.log(`View mode set to: ${mode}`);
}

function updateViewModeToggle() {
    const buttons = document.querySelectorAll('#viewModeToggle button');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.view === currentViewMode) {
            button.classList.add('active');
        }
    });
}

// Search Functionality
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const results = applications.filter(app => 
        app.name.toLowerCase().includes(query) || 
        app.description.toLowerCase().includes(query)
    );
    
    if (query.length > 0) {
        displaySearchResults(results);
    } else {
        hideSearchResults();
    }
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="p-3 text-muted">No applications found</div>';
    } else {
        results.slice(0, 5).forEach(app => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item p-3 d-flex align-items-center';
            resultItem.innerHTML = `
                <i class="bi ${app.icon} text-${app.color} me-3"></i>
                <div>
                    <div class="fw-semibold">${app.name}</div>
                    <small class="text-muted">${app.description}</small>
                </div>
            `;
            
            resultItem.addEventListener('click', () => {
                window.open(app.url, '_blank');
                hideSearchResults();
            });
            
            searchResults.appendChild(resultItem);
        });
    }
    
    searchResults.classList.add('show');
}

function showSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults && searchResults.children.length > 0) {
        searchResults.classList.add('show');
    }
}

function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.classList.remove('show');
    }
}

function toggleMobileSearch() {
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
function setActiveCategory(category) {
    currentCategory = category;
    
    // Update tab active state
    const tabs = document.querySelectorAll('#categoryTabs button');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });
    
    // Reload applications with filter
    loadApplications();
}

// Application Management
function loadApplications() {
    const container = document.getElementById('applicationsContainer');
    if (!container) return;
    
    // Filter applications by category
    let filteredApps = applications;
    if (currentCategory !== 'all') {
        filteredApps = applications.filter(app => 
            app.category.includes(currentCategory)
        );
    }
    
    if (currentViewMode === 'grid') {
        renderGridView(container, filteredApps);
    } else {
        renderListView(container, filteredApps);
    }
}

function renderGridView(container, apps) {
    container.innerHTML = `
        <div class="row g-4">
            ${apps.map(app => `
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card app-card h-100 position-relative" data-aos="zoom-in" data-aos-delay="${apps.indexOf(app) * 100}">
                        <button class="btn favorite-btn ${favorites.includes(app.id) ? 'favorited' : ''}" onclick="toggleFavorite(${app.id})">
                            <i class="bi ${favorites.includes(app.id) ? 'bi-star-fill' : 'bi-star'}"></i>
                        </button>
                        <div class="card-body text-center">
                            <div class="app-icon bg-${app.color} bg-opacity-10 text-${app.color} mb-3">
                                <i class="bi ${app.icon}"></i>
                            </div>
                            <h5 class="card-title">${app.name}</h5>
                            <p class="card-text text-muted">${app.description}</p>
                            <a href="${app.url}" class="btn btn-${app.color} btn-sm">
                                <i class="bi bi-box-arrow-up-right me-1"></i>
                                Open
                            </a>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderListView(container, apps) {
    container.innerHTML = `
        <div class="list-group">
            ${apps.map(app => `
                <div class="list-group-item app-card-list d-flex align-items-center" data-aos="fade-up" data-aos-delay="${apps.indexOf(app) * 50}">
                    <div class="app-icon bg-${app.color} bg-opacity-10 text-${app.color} me-3">
                        <i class="bi ${app.icon}"></i>
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${app.name}</h6>
                        <p class="mb-0 text-muted small">${app.description}</p>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-link favorite-btn p-1 ${favorites.includes(app.id) ? 'favorited' : ''}" onclick="toggleFavorite(${app.id})">
                            <i class="bi ${favorites.includes(app.id) ? 'bi-star-fill' : 'bi-star'}"></i>
                        </button>
                        <a href="${app.url}" class="btn btn-${app.color} btn-sm">
                            <i class="bi bi-box-arrow-up-right"></i>
                        </a>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Favorites Management
function toggleFavorite(appId) {
    const index = favorites.indexOf(appId);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Removed from favorites', 'info');
    } else {
        favorites.push(appId);
        showToast('Added to favorites', 'success');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadApplications(); // Reload to update star icons
}

// Notification Management
function loadNotifications() {
    notifications = [...notificationData];
    renderNotifications();
    updateNotificationBadge();
}

function renderNotifications() {
    const container = document.getElementById('notificationList');
    if (!container) return;
    
    container.innerHTML = notifications.map(notification => `
        <div class="notification-item ${notification.unread ? 'unread' : ''}" data-id="${notification.id}">
            <div class="d-flex align-items-start">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${notification.title}</h6>
                    <p class="mb-1 small">${notification.message}</p>
                    <small class="text-muted">${notification.time}</small>
                </div>
                <div class="text-${notification.type}">
                    <i class="bi bi-${getNotificationIcon(notification.type)}"></i>
                </div>
            </div>
        </div>
    `).join('');
}

function getNotificationIcon(type) {
    switch (type) {
        case 'warning': return 'exclamation-triangle';
        case 'danger': return 'exclamation-circle';
        case 'info': return 'info-circle';
        case 'success': return 'check-circle';
        default: return 'bell';
    }
}

function markAllNotificationsRead() {
    notifications.forEach(notification => {
        notification.unread = false;
    });
    
    renderNotifications();
    updateNotificationBadge();
    showToast('All notifications marked as read', 'success');
}

function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    const unreadCount = notifications.filter(n => n.unread).length;
    
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'block' : 'none';
    }
}

// Announcement Management
function startAnnouncementRotation() {
    const announcementText = document.getElementById('announcementText');
    if (!announcementText) return;
    
    const messages = announcements[currentLanguage];
    let currentIndex = 0;
    
    function rotateAnnouncement() {
        announcementText.style.opacity = '0';
        
        setTimeout(() => {
            announcementText.textContent = messages[currentIndex];
            announcementText.style.opacity = '1';
            currentIndex = (currentIndex + 1) % messages.length;
        }, 500);
    }
    
    // Initial announcement
    announcementText.textContent = messages[0];
    
    // Rotate every 10 seconds
    setInterval(rotateAnnouncement, 10000);
}

// Keyboard Shortcuts
function handleKeyboardShortcuts(e) {
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
            const bsOffcanvas = new bootstrap.Offcanvas(sidebar);
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
        hideSearchResults();
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

// Utility Functions
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white bg-${type} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });
    
    toast.show();
    
    // Remove from DOM after hiding
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

function handleWindowResize() {
    // Handle responsive behavior
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth >= 992) {
        // Desktop - ensure sidebar is shown
        if (sidebar) {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebar);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        }
    }
}

// Animation utilities
function animateElement(element, animation) {
    element.classList.add('animate__animated', `animate__${animation}`);
    
    element.addEventListener('animationend', () => {
        element.classList.remove('animate__animated', `animate__${animation}`);
    }, { once: true });
}

// Export functions for global access
window.toggleFavorite = toggleFavorite;
window.showToast = showToast;

// Performance monitoring
console.log('IT Portal script loaded successfully');
