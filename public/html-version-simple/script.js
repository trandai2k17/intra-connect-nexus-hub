
// Translations
const translations = {
    vi: {
        'header.notifications': 'Thông báo',
        'header.profile': 'Hồ sơ',
        'header.settings': 'Cài đặt',
        'header.logout': 'Đăng xuất',
        'sidebar.title': 'IT Portal',
        'sidebar.copyright': '© 2024 IT Department',
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
        'home.apps.title': 'Ứng dụng & Phần mềm',
        'home.apps.subtitle': 'Truy cập nhanh các công cụ và hệ thống nội bộ',
        'home.stats.apps': 'Ứng dụng đang hoạt động',
        'home.stats.users': 'Người dùng hoạt động',
        'home.stats.uptime': 'Uptime hệ thống',
        'home.updated': 'Cập nhật: 29/11/2024',
        'nav.all': 'Tất cả',
        'banner.news.title1': 'Triển khai hệ thống MES mới cho nhà máy 2',
        'banner.news.desc1': 'Hệ thống quản lý sản xuất thông minh sẽ được triển khai từ tháng 12/2024',
        'banner.news.category1': 'Sản xuất',
        'banner.news.title2': 'Ứng dụng QC Mobile chính thức ra mắt',
        'banner.news.desc2': 'Ứng dụng kiểm tra chất lượng trên thiết bị di động',
        'banner.news.category2': 'Chất lượng',
        'banner.explore': 'Khám phá',
        'banner.window.title1': 'Bảo trì hệ thống ERP',
        'banner.window.content1': 'Hệ thống ERP sẽ bảo trì từ 22:00 hôm nay đến 02:00 ngày mai',
        'banner.window.title2': 'Cảnh báo Phishing',
        'banner.window.content2': 'Phát hiện email giả mạo từ domain hr-company.net',
        'banner.window.title3': 'Đào tạo Office 365',
        'banner.window.content3': 'Khóa đào tạo Teams & SharePoint vào 9:00 ngày 02/12',
        'banner.window.title4': 'Server mới đã sẵn sàng',
        'banner.window.content4': 'Server backup mới đã được cài đặt và test thành công',
    },
    en: {
        'header.notifications': 'Notifications',
        'header.profile': 'Profile',
        'header.settings': 'Settings',
        'header.logout': 'Logout',
        'sidebar.title': 'IT Portal',
        'sidebar.copyright': '© 2024 IT Department',
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
        'home.apps.title': 'Applications & Software',
        'home.apps.subtitle': 'Quick access to internal tools and systems',
        'home.stats.apps': 'Active Applications',
        'home.stats.users': 'Active Users',
        'home.stats.uptime': 'System Uptime',
        'home.updated': 'Updated: 29/11/2024',
        'nav.all': 'All',
        'banner.news.title1': 'Deploy new MES system for Factory 2',
        'banner.news.desc1': 'Smart manufacturing management system will be deployed from December 2024',
        'banner.news.category1': 'Production',
        'banner.news.title2': 'QC Mobile application officially launched',
        'banner.news.desc2': 'Quality control application on mobile devices',
        'banner.news.category2': 'Quality',
        'banner.explore': 'Explore',
        'banner.window.title1': 'ERP System Maintenance',
        'banner.window.content1': 'ERP system will be maintained from 22:00 today to 02:00 tomorrow',
        'banner.window.title2': 'Phishing Alert',
        'banner.window.content2': 'Detected fake email from domain hr-company.net',
        'banner.window.title3': 'Office 365 Training',
        'banner.window.content3': 'Teams & SharePoint training course at 9:00 on December 2nd',
        'banner.window.title4': 'New Server Ready',
        'banner.window.content4': 'New backup server has been installed and tested successfully',
    }
};

// Applications data
const applications = [
    { id: 1, name: 'ERP System', icon: 'bi-building', category: 'production', color: 'primary' },
    { id: 2, name: 'MES', icon: 'bi-gear-wide-connected', category: 'production', color: 'success' },
    { id: 3, name: 'QC Mobile', icon: 'bi-phone', category: 'qa', color: 'warning' },
    { id: 4, name: 'Microsoft Teams', icon: 'bi-microsoft-teams', category: 'it', color: 'info' },
    { id: 5, name: 'SharePoint', icon: 'bi-share', category: 'it', color: 'secondary' },
    { id: 6, name: 'Outlook', icon: 'bi-envelope', category: 'it', color: 'primary' },
    { id: 7, name: 'GitLab', icon: 'bi-git', category: 'it', color: 'danger' },
    { id: 8, name: 'Jenkins', icon: 'bi-gear', category: 'it', color: 'success' },
    { id: 9, name: 'Inventory System', icon: 'bi-box', category: 'inventory', color: 'warning' },
    { id: 10, name: 'Purchase Portal', icon: 'bi-cart', category: 'purchase', color: 'info' },
    { id: 11, name: 'HR Portal', icon: 'bi-people', category: 'hr', color: 'secondary' },
    { id: 12, name: 'Payroll System', icon: 'bi-cash', category: 'hr', color: 'success' },
];

// Global variables
let currentLanguage = localStorage.getItem('language') || 'vi';
let currentTheme = localStorage.getItem('theme') || 'light';
let currentCategory = 'all';

// Announcements
const announcements = {
    vi: [
        "🎉 Hệ thống ERP mới đã được cập nhật với nhiều tính năng hữu ích",
        "📢 Bảo trì hệ thống dự kiến vào 22:00 - 02:00 đêm nay",
        "🚀 Ứng dụng mobile QC đã ra mắt trên App Store",
        "💡 Khóa học Excel nâng cao sẽ bắt đầu vào tuần tới"
    ],
    en: [
        "🎉 New ERP system has been updated with many useful features",
        "📢 System maintenance scheduled for 22:00 - 02:00 tonight",
        "🚀 QC mobile app has launched on the App Store",
        "💡 Advanced Excel course will start next week"
    ]
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLanguage();
    initializeAnnouncementRotation();
    initializeCategoryTabs();
    renderApplications();
    initializeEventListeners();
});

// Theme Management
function initializeTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.className = currentTheme === 'light' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
    }
}

// Language Management
function initializeLanguage() {
    document.documentElement.lang = currentLanguage;
    updateLanguageButton();
    translatePage();
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
    document.documentElement.lang = currentLanguage;
    localStorage.setItem('language', currentLanguage);
    updateLanguageButton();
    translatePage();
}

function updateLanguageButton() {
    const languageText = document.getElementById('languageText');
    if (languageText) {
        languageText.textContent = currentLanguage.toUpperCase();
    }
}

function translatePage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Announcement Management
function initializeAnnouncementRotation() {
    let currentIndex = 0;
    const announcementElement = document.getElementById('announcementText');
    
    if (announcementElement) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % announcements[currentLanguage].length;
            announcementElement.textContent = announcements[currentLanguage][currentIndex];
        }, 5000);
    }
}

// Category Tabs Management
function initializeCategoryTabs() {
    const tabButtons = document.querySelectorAll('#categoryTabs .nav-link');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.querySelector('.badge').classList.remove('bg-primary');
                btn.querySelector('.badge').classList.add('bg-secondary');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.querySelector('.badge').classList.remove('bg-secondary');
            this.querySelector('.badge').classList.add('bg-primary');
            
            // Update current category
            currentCategory = this.getAttribute('data-category');
            renderApplications();
        });
    });
}

// Applications Management
function renderApplications() {
    const grid = document.getElementById('applicationsGrid');
    if (!grid) return;
    
    const filteredApps = currentCategory === 'all' 
        ? applications 
        : applications.filter(app => app.category === currentCategory);
    
    grid.innerHTML = filteredApps.map(app => `
        <div class="col-md-3 col-sm-6">
            <div class="card glass-card app-card" onclick="openApplication('${app.name}')">
                <div class="card-body">
                    <i class="bi ${app.icon} text-${app.color}"></i>
                    <h6 class="card-title">${app.name}</h6>
                </div>
            </div>
        </div>
    `).join('');
}

function openApplication(appName) {
    alert(`Opening ${appName}...`);
}

// Event Listeners
function initializeEventListeners() {
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
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link[href="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (!this.classList.contains('dropdown-toggle')) {
                alert('Feature not yet deployed');
            }
        });
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize Bootstrap components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize all popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});
