
// Enhanced JavaScript with more features and better UX

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

// Enhanced Applications data with more details
const applications = [
    { id: 1, name: 'ERP System', icon: 'bi-building', category: 'production', color: 'primary', description: 'Hệ thống quản lý tài nguyên doanh nghiệp', favorite: true, status: 'active' },
    { id: 2, name: 'MES', icon: 'bi-gear-wide-connected', category: 'production', color: 'success', description: 'Hệ thống thực thi sản xuất', favorite: false, status: 'active' },
    { id: 3, name: 'QC Mobile', icon: 'bi-phone', category: 'qa', color: 'warning', description: 'Ứng dụng kiểm tra chất lượng di động', favorite: true, status: 'active' },
    { id: 4, name: 'Microsoft Teams', icon: 'bi-microsoft-teams', category: 'it', color: 'info', description: 'Nền tảng cộng tác và họp trực tuyến', favorite: true, status: 'active' },
    { id: 5, name: 'SharePoint', icon: 'bi-share', category: 'it', color: 'secondary', description: 'Hệ thống quản lý tài liệu', favorite: false, status: 'active' },
    { id: 6, name: 'Outlook', icon: 'bi-envelope', category: 'it', color: 'primary', description: 'Hệ thống email doanh nghiệp', favorite: true, status: 'active' },
    { id: 7, name: 'GitLab', icon: 'bi-git', category: 'it', color: 'danger', description: 'Quản lý mã nguồn và CI/CD', favorite: false, status: 'active' },
    { id: 8, name: 'Jenkins', icon: 'bi-gear', category: 'it', color: 'success', description: 'Tự động hóa build và deploy', favorite: false, status: 'maintenance' },
    { id: 9, name: 'Inventory System', icon: 'bi-box', category: 'inventory', color: 'warning', description: 'Hệ thống quản lý kho', favorite: true, status: 'active' },
    { id: 10, name: 'Purchase Portal', icon: 'bi-cart', category: 'purchase', color: 'info', description: 'Cổng thông tin mua hàng', favorite: false, status: 'active' },
    { id: 11, name: 'HR Portal', icon: 'bi-people', category: 'hr', color: 'secondary', description: 'Cổng thông tin nhân sự', favorite: true, status: 'active' },
    { id: 12, name: 'Payroll System', icon: 'bi-cash', category: 'hr', color: 'success', description: 'Hệ thống tính lương', favorite: false, status: 'active' },
    { id: 13, name: 'Asset Management', icon: 'bi-pc-display', category: 'it', color: 'primary', description: 'Quản lý tài sản IT', favorite: true, status: 'active' },
    { id: 14, name: 'Power BI', icon: 'bi-bar-chart', category: 'it', color: 'warning', description: 'Phân tích và báo cáo dữ liệu', favorite: false, status: 'active' },
    { id: 15, name: 'Service Desk', icon: 'bi-headset', category: 'it', color: 'info', description: 'Hệ thống hỗ trợ kỹ thuật', favorite: true, status: 'active' },
];

// Global variables
let currentLanguage = localStorage.getItem('language') || 'vi';
let currentTheme = localStorage.getItem('theme') || 'light';
let currentCategory = 'all';
let viewMode = localStorage.getItem('viewMode') || 'grid';
let displayedAppsCount = 12;
let filteredApplications = [...applications];

// Announcements
const announcements = {
    vi: [
        "🎉 Hệ thống ERP mới đã được cập nhật với nhiều tính năng hữu ích",
        "📢 Bảo trì hệ thống dự kiến vào 22:00 - 02:00 đêm nay",
        "🚀 Ứng dụng mobile QC đã ra mắt trên App Store",
        "💡 Khóa học Excel nâng cao sẽ bắt đầu vào tuần tới",
        "🔔 Cập nhật chính sách bảo mật mới có hiệu lực từ ngày 01/12",
        "📊 Báo cáo hiệu suất hệ thống tháng 11 đã sẵn sàng"
    ],
    en: [
        "🎉 New ERP system has been updated with many useful features",
        "📢 System maintenance scheduled for 22:00 - 02:00 tonight",
        "🚀 QC mobile app has launched on the App Store",
        "💡 Advanced Excel course will start next week",
        "🔔 New security policy update effective from December 1st",
        "📊 November system performance report is ready"
    ]
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLanguage();
    initializeAnnouncementRotation();
    initializeCategoryTabs();
    initializeViewMode();
    renderApplications();
    initializeEventListeners();
    initializeSearch();
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
    showNotification(`Đã chuyển sang chế độ ${currentTheme === 'light' ? 'sáng' : 'tối'}`, 'success');
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
    showNotification(`Language changed to ${currentLanguage.toUpperCase()}`, 'info');
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

// View Mode Management
function initializeViewMode() {
    updateViewModeIcon();
}

function toggleViewMode() {
    viewMode = viewMode === 'grid' ? 'list' : 'grid';
    localStorage.setItem('viewMode', viewMode);
    updateViewModeIcon();
    renderApplications();
    showNotification(`Đã chuyển sang chế độ ${viewMode === 'grid' ? 'lưới' : 'danh sách'}`, 'info');
}

function updateViewModeIcon() {
    const icons = document.querySelectorAll('#viewModeIcon, #gridViewToggle i');
    icons.forEach(icon => {
        icon.className = viewMode === 'grid' ? 'bi bi-list' : 'bi bi-grid-3x3-gap';
    });
}

// Announcement Management
function initializeAnnouncementRotation() {
    let currentIndex = 0;
    const announcementElement = document.getElementById('announcementText');
    
    if (announcementElement) {
        const rotateAnnouncement = () => {
            announcementElement.style.opacity = '0';
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % announcements[currentLanguage].length;
                announcementElement.textContent = announcements[currentLanguage][currentIndex];
                announcementElement.style.opacity = '1';
            }, 300);
        };
        
        setInterval(rotateAnnouncement, 5000);
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
            displayedAppsCount = 12; // Reset displayed count
            filterAndRenderApplications();
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('#globalSearch, #appSearch');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterAndRenderApplications(searchTerm);
        });
    });
}

function filterAndRenderApplications(searchTerm = '') {
    filteredApplications = applications.filter(app => {
        const matchesSearch = !searchTerm || 
            app.name.toLowerCase().includes(searchTerm) ||
            app.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = currentCategory === 'all' || 
            (currentCategory === 'favorites' && app.favorite) ||
            app.category === currentCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    renderApplications();
}

// Applications Management
function renderApplications() {
    const grid = document.getElementById('applicationsGrid');
    if (!grid) return;
    
    const appsToShow = filteredApplications.slice(0, displayedAppsCount);
    const loadMoreBtn = document.getElementById('loadMoreApps');
    
    if (viewMode === 'grid') {
        grid.className = 'row g-3';
        grid.innerHTML = appsToShow.map(app => `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6">
                <div class="card glass-card app-card h-100" onclick="openApplication('${app.name}', ${app.id})" data-app-id="${app.id}">
                    <div class="card-body p-3 text-center">
                        <div class="position-relative mb-3">
                            <i class="bi ${app.icon} text-${app.color} fs-1"></i>
                            ${app.favorite ? '<i class="bi bi-star-fill text-warning position-absolute top-0 end-0" style="font-size: 0.7rem;"></i>' : ''}
                            ${app.status === 'maintenance' ? '<span class="position-absolute top-0 start-0 badge bg-warning" style="font-size: 0.6rem;">Bảo trì</span>' : ''}
                        </div>
                        <h6 class="card-title mb-2" style="font-size: 0.85rem;">${app.name}</h6>
                        <p class="card-text small text-muted" style="font-size: 0.7rem; line-height: 1.2;">${app.description}</p>
                        <div class="mt-2">
                            <button class="btn btn-sm btn-outline-${app.color}" onclick="event.stopPropagation(); toggleFavorite(${app.id})">
                                <i class="bi ${app.favorite ? 'bi-star-fill' : 'bi-star'}"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        grid.className = 'list-group';
        grid.innerHTML = appsToShow.map(app => `
            <div class="list-group-item glass-card border-0 mb-2" onclick="openApplication('${app.name}', ${app.id})" style="cursor: pointer;">
                <div class="d-flex align-items-center">
                    <div class="me-3">
                        <i class="bi ${app.icon} text-${app.color} fs-3"></i>
                    </div>
                    <div class="flex-grow-1">
                        <div class="d-flex align-items-center justify-content-between">
                            <h6 class="mb-1">${app.name}</h6>
                            <div>
                                ${app.favorite ? '<i class="bi bi-star-fill text-warning me-2"></i>' : ''}
                                ${app.status === 'maintenance' ? '<span class="badge bg-warning me-2">Bảo trì</span>' : ''}
                                <span class="badge bg-${app.color}">${app.category}</span>
                            </div>
                        </div>
                        <p class="mb-1 text-muted">${app.description}</p>
                        <small class="text-muted">Lần cuối sử dụng: 2 giờ trước</small>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Show/hide load more button
    if (loadMoreBtn) {
        loadMoreBtn.style.display = filteredApplications.length > displayedAppsCount ? 'block' : 'none';
    }
}

function loadMoreApps() {
    displayedAppsCount += 12;
    renderApplications();
}

function toggleFavorite(appId) {
    const app = applications.find(a => a.id === appId);
    if (app) {
        app.favorite = !app.favorite;
        filterAndRenderApplications();
        showNotification(`${app.name} đã ${app.favorite ? 'thêm vào' : 'xóa khỏi'} danh sách yêu thích`, 'success');
    }
}

function openApplication(appName, appId) {
    const app = applications.find(a => a.id === appId);
    if (app && app.status === 'maintenance') {
        showNotification(`${appName} đang trong quá trình bảo trì`, 'warning');
        return;
    }
    
    showNotification(`Đang mở ${appName}...`, 'info');
    
    // Simulate app opening
    setTimeout(() => {
        // Add some opening animation or redirect logic here
        console.log(`Opening application: ${appName}`);
    }, 1000);
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
    
    // View mode toggles
    const viewModeToggles = document.querySelectorAll('#viewModeToggle, #gridViewToggle');
    viewModeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleViewMode);
    });
    
    // Load more apps
    const loadMoreBtn = document.getElementById('loadMoreApps');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreApps);
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link[href="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (!this.classList.contains('dropdown-toggle') && !this.classList.contains('collapse')) {
                showNotification('Tính năng đang được phát triển', 'info');
            }
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    document.getElementById('globalSearch')?.focus();
                    break;
                case 't':
                    e.preventDefault();
                    toggleTheme();
                    break;
                case 'l':
                    e.preventDefault();
                    toggleLanguage();
                    break;
            }
        }
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
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
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Export functions for global access
window.openApplication = openApplication;
window.toggleFavorite = toggleFavorite;
window.loadMoreApps = loadMoreApps;
