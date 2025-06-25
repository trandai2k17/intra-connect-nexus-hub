
// Application Data - matching the React TSX version
const applications = [
    {
        id: 1,
        name: "SAP ERP",
        description: "Hệ thống hoạch định tài nguyên doanh nghiệp",
        icon: "bi-diagram-3",
        url: "https://sap.com",
        type: "web",
        status: "online",
        rating: 4.8,
        users: 1250,
        version: "v2.1.0",
        badge: "success",
        lastUpdated: "2 ngày trước",
        departments: ["all", "production", "hr", "purchase"],
        isNew: false
    },
    {
        id: 2,
        name: "Office 365",
        description: "Bộ công cụ văn phòng Microsoft",
        icon: "bi-microsoft",
        url: "https://office.com",
        type: "web",
        status: "online",
        rating: 4.7,
        users: 2100,
        version: "Latest",
        badge: "info",
        lastUpdated: "1 tuần trước",
        departments: ["all", "it", "hr"],
        isNew: false
    },
    {
        id: 3,
        name: "Slack",
        description: "Ứng dụng giao tiếp và cộng tác nhóm",
        icon: "bi-slack",
        url: "https://slack.com",
        type: "web",
        status: "online",
        rating: 4.6,
        users: 890,
        version: "v4.21.0",
        badge: "success",
        lastUpdated: "3 ngày trước",
        departments: ["all", "it", "production"],
        isNew: false
    },
    {
        id: 4,
        name: "Jira",
        description: "Quản lý dự án và theo dõi lỗi",
        icon: "bi-kanban",
        url: "https://jira.com",
        type: "web",
        status: "online",
        rating: 4.4,
        users: 456,
        version: "v8.20.1",
        badge: "warning",
        lastUpdated: "5 ngày trước",
        departments: ["it", "quality"],
        isNew: true
    },
    {
        id: 5,
        name: "AutoCAD",
        description: "Phần mềm thiết kế hỗ trợ máy tính",
        icon: "bi-vector-pen",
        url: "#",
        type: "desktop",
        status: "maintenance",
        rating: 4.5,
        users: 234,
        version: "2024",
        badge: "info",
        lastUpdated: "1 tuần trước",
        departments: ["production", "quality"],
        isNew: false
    },
    {
        id: 6,
        name: "Tableau",
        description: "Phân tích và trực quan hóa dữ liệu",
        icon: "bi-bar-chart-line",
        url: "https://tableau.com",
        type: "web",
        status: "online",
        rating: 4.3,
        users: 178,
        version: "2023.3",
        badge: "success",
        lastUpdated: "2 tuần trước",
        departments: ["quality", "hr"],
        isNew: false
    }
];

const companyWebPages = [
    {
        id: 101,
        name: "Portal Nhân viên",
        description: "Cổng thông tin nội bộ cho nhân viên",
        icon: "bi-person-badge",
        url: "#",
        status: "online",
        rating: 4.2,
        users: 1800
    },
    {
        id: 102,
        name: "Hệ thống Help Desk",
        description: "Hỗ trợ kỹ thuật và giải đáp thắc mắc",
        icon: "bi-headset",
        url: "#",
        status: "online",
        rating: 4.1,
        users: 650
    },
    {
        id: 103,
        name: "Knowledge Base",
        description: "Cơ sở tri thức và tài liệu hướng dẫn",
        icon: "bi-book",
        url: "#",
        status: "online",
        rating: 4.0,
        users: 890
    }
];

// Translation data
const translations = {
    vi: {
        title: "Dental Company",
        subtitle: "Enterprise Portal",
        "search.placeholder": "Tìm kiếm ứng dụng...",
        "nav.menu": "Menu",
        "nav.all": "Tất cả",
        "sidebar.it": "CNTT",
        "sidebar.production": "Sản xuất",
        "sidebar.quality": "Chất lượng",
        "sidebar.hr": "Nhân sự",
        "sidebar.inventory": "Kho hàng",
        "sidebar.purchase": "Mua hàng",
        "stats.users": "Người dùng",
        "stats.apps": "Ứng dụng",
        "stats.uptime": "Thời gian hoạt động",
        "stats.security": "Bảo mật",
        "apps.title": "Ứng dụng & Phần mềm",
        "apps.subtitle": "Quản lý và truy cập các ứng dụng công ty",
        "apps.add": "Thêm ứng dụng",
        "tabs.software": "Phần Mềm",
        "tabs.webpages": "Trang Web",
        "tabs.favorites": "Yêu thích"
    },
    en: {
        title: "Dental Company",
        subtitle: "Enterprise Portal",
        "search.placeholder": "Search applications...",
        "nav.menu": "Menu",
        "nav.all": "All",
        "sidebar.it": "IT",
        "sidebar.production": "Production",
        "sidebar.quality": "Quality",
        "sidebar.hr": "HR",
        "sidebar.inventory": "Inventory",
        "sidebar.purchase": "Purchase",
        "stats.users": "Users",
        "stats.apps": "Applications",
        "stats.uptime": "Uptime",
        "stats.security": "Security",
        "apps.title": "Applications & Software",
        "apps.subtitle": "Manage and access company applications",
        "apps.add": "Add Application",
        "tabs.software": "Software",
        "tabs.webpages": "Web Pages",
        "tabs.favorites": "Favorites"
    }
};

// Global state
let currentLanguage = 'vi';
let currentTheme = 'light';
let currentDepartment = 'all';
let currentViewMode = 'grid';
let favorites = [1, 4, 6];
let searchTerm = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLanguage();
    initializeEventListeners();
    renderApplications();
    updateTranslations();
});

// Theme management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'bi bi-sun' : 'bi bi-moon';
    }
}

function toggleTheme() {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
}

// Language management
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'vi';
    setLanguage(savedLanguage);
}

function setLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('language', language);
    
    const langText = document.getElementById('langText');
    if (langText) {
        langText.textContent = language.toUpperCase();
    }
    
    updateTranslations();
}

function toggleLanguage() {
    setLanguage(currentLanguage === 'vi' ? 'en' : 'vi');
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });

    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
}

// Event listeners
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

    // Department navigation
    const navLinks = document.querySelectorAll('.nav-link[data-tab]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const department = this.getAttribute('data-tab');
            setActiveDepartment(department);
        });
    });

    // View mode toggle
    const viewModeToggle = document.getElementById('viewModeToggle');
    if (viewModeToggle) {
        viewModeToggle.addEventListener('click', toggleViewMode);
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchTerm = this.value.toLowerCase();
            renderApplications();
        });
    }
}

// Department management
function setActiveDepartment(department) {
    currentDepartment = department;
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link[data-tab]');
    navLinks.forEach(link => {
        if (link.getAttribute('data-tab') === department) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    renderApplications();
}

// View mode management
function toggleViewMode() {
    currentViewMode = currentViewMode === 'grid' ? 'list' : 'grid';
    const viewIcon = document.getElementById('viewIcon');
    if (viewIcon) {
        viewIcon.className = currentViewMode === 'grid' ? 'bi bi-grid-3x3' : 'bi bi-list';
    }
    renderApplications();
}

// Application rendering
function renderApplications() {
    renderSoftware();
    renderWebPages();
    renderFavorites();
}

function renderSoftware() {
    const container = document.getElementById('softwareGrid');
    if (!container) return;

    const filteredApps = applications.filter(app => {
        const matchesSearch = !searchTerm || 
            app.name.toLowerCase().includes(searchTerm) || 
            app.description.toLowerCase().includes(searchTerm);
        const matchesDept = currentDepartment === 'all' || 
            app.departments.includes(currentDepartment);
        return matchesSearch && matchesDept;
    });

    container.innerHTML = filteredApps.map(app => createAppCard(app)).join('');
}

function renderWebPages() {
    const container = document.getElementById('webpagesGrid');
    if (!container) return;

    const filteredPages = companyWebPages.filter(page => {
        return !searchTerm || 
            page.name.toLowerCase().includes(searchTerm) || 
            page.description.toLowerCase().includes(searchTerm);
    });

    container.innerHTML = filteredPages.map(page => createAppCard(page)).join('');
}

function renderFavorites() {
    const container = document.getElementById('favoritesGrid');
    if (!container) return;

    const favoriteApps = applications.filter(app => favorites.includes(app.id));
    container.innerHTML = favoriteApps.map(app => createAppCard(app)).join('');
}

function createAppCard(app) {
    const isFavorited = favorites.includes(app.id);
    const statusBadge = getStatusBadge(app.status);
    const colClass = currentViewMode === 'grid' ? 'col-md-6 col-lg-4 col-xl-3' : 'col-12';
    
    return `
        <div class="${colClass}">
            <div class="card app-card h-100 ${currentViewMode === 'list' ? 'app-card-list' : ''}">
                <div class="card-body">
                    ${currentViewMode === 'grid' ? `
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            ${statusBadge}
                            <button class="btn btn-sm btn-outline-warning favorite-btn ${isFavorited ? 'favorited' : ''}" 
                                    onclick="toggleFavorite(${app.id})">
                                <i class="bi bi-star${isFavorited ? '-fill' : ''}"></i>
                            </button>
                        </div>
                        <div class="d-flex align-items-start mb-3">
                            <div class="app-icon me-3">
                                <i class="${app.icon} text-primary"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="card-title mb-1">${app.name}</h6>
                                <p class="card-text text-muted small">${app.description}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2 text-muted small">
                            <span><i class="bi bi-people me-1"></i>${app.users}</span>
                            <span><i class="bi bi-star-fill text-warning me-1"></i>${app.rating}</span>
                        </div>
                        <button class="btn btn-primary btn-sm w-100" onclick="openApp('${app.url}')">
                            <i class="bi bi-arrow-right-circle me-1"></i>
                            ${currentLanguage === 'vi' ? 'Mở ứng dụng' : 'Open App'}
                        </button>
                    ` : `
                        <div class="d-flex align-items-center">
                            <div class="app-icon me-3">
                                <i class="${app.icon} text-primary"></i>
                            </div>
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 class="mb-1">${app.name}</h6>
                                        <p class="text-muted small mb-0">${app.description}</p>
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        ${statusBadge}
                                        <button class="btn btn-sm btn-outline-warning favorite-btn ${isFavorited ? 'favorited' : ''}" 
                                                onclick="toggleFavorite(${app.id})">
                                            <i class="bi bi-star${isFavorited ? '-fill' : ''}"></i>
                                        </button>
                                        <button class="btn btn-primary btn-sm" onclick="openApp('${app.url}')">
                                            <i class="bi bi-arrow-right-circle"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
}

function getStatusBadge(status) {
    const badges = {
        online: '<span class="badge bg-success">Online</span>',
        maintenance: '<span class="badge bg-warning">Maintenance</span>',
        offline: '<span class="badge bg-danger">Offline</span>'
    };
    return badges[status] || badges.online;
}

// Application interactions
function toggleFavorite(appId) {
    const index = favorites.indexOf(appId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(appId);
    }
    renderApplications();
}

function openApp(url) {
    if (url && url !== '#') {
        window.open(url, '_blank');
    } else {
        alert(currentLanguage === 'vi' ? 'Ứng dụng chưa có sẵn' : 'Application not available');
    }
}

// Loading state
function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'k':
                e.preventDefault();
                document.querySelector('.search-input').focus();
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
