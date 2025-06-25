
// IT Portal - Complete JavaScript with enhanced features
class ITPortal {
    constructor() {
        this.currentLanguage = 'vi';
        this.currentTheme = 'light';
        this.sidebarCollapsed = false;
        this.currentTab = 'all';
        this.currentAppTab = 'software';
        this.favorites = JSON.parse(localStorage.getItem('favorites') || '[1, 4, 6, 7]');
        this.viewMode = 'grid';
        this.searchTerm = '';
        
        this.translations = {
            vi: {
                'sidebar.navigation': 'ĐIỀU HƯỚNG',
                'sidebar.it': 'Công nghệ thông tin',
                'sidebar.production': 'Sản xuất',
                'sidebar.quality': 'Chất lượng',
                'sidebar.hr': 'Nhân sự',
                'sidebar.inventory': 'Kho bãi',
                'sidebar.purchase': 'Mua hàng',
                'sidebar.copyright': '© 2024 Phòng IT',
                'header.notifications': 'Thông báo',
                'nav.all': 'Tất cả',
                'home.apps.title': 'Ứng dụng & Phần mềm',
                'home.apps.subtitle': 'Truy cập nhanh các công cụ và hệ thống nội bộ'
            },
            en: {
                'sidebar.navigation': 'NAVIGATION',
                'sidebar.it': 'Information Technology',
                'sidebar.production': 'Production',
                'sidebar.quality': 'Quality',
                'sidebar.hr': 'Human Resources',
                'sidebar.inventory': 'Inventory',
                'sidebar.purchase': 'Purchase',
                'sidebar.copyright': '© 2024 IT Department',
                'header.notifications': 'Notifications',
                'nav.all': 'All',
                'home.apps.title': 'Applications & Software',
                'home.apps.subtitle': 'Quick access to internal tools and systems'
            }
        };

        this.navigationItems = [
            {
                title: 'sidebar.it',
                url: '/it',
                icon: 'bi-monitor',
                iconColor: 'text-blue-500',
                subItems: [
                    { title: 'Software', url: '/it/software', icon: 'bi-laptop', iconColor: 'text-blue-500' },
                    { title: 'Web Page', url: '/it/webpage', icon: 'bi-globe', iconColor: 'text-blue-600' },
                    { title: 'Document', url: '/it/document', icon: 'bi-file-text', iconColor: 'text-blue-700' }
                ]
            },
            {
                title: 'sidebar.production',
                url: '/production',
                icon: 'bi-building',
                iconColor: 'text-green-500',
                subItems: [
                    { title: 'Manufacturing', url: '/production/manufacturing', icon: 'bi-gear', iconColor: 'text-green-500' },
                    { title: 'Maintenance', url: '/production/maintenance', icon: 'bi-wrench', iconColor: 'text-green-600' }
                ]
            },
            {
                title: 'sidebar.quality',
                url: '/quality',
                icon: 'bi-bar-chart',
                iconColor: 'text-purple-500',
                subItems: [
                    { title: 'Quality Control', url: '/quality/control', icon: 'bi-check-circle', iconColor: 'text-purple-500' },
                    { title: 'Reports', url: '/quality/reports', icon: 'bi-graph-up', iconColor: 'text-purple-600' },
                    { title: 'Analytics', url: '/quality/analytics', icon: 'bi-activity', iconColor: 'text-purple-700' }
                ]
            },
            {
                title: 'sidebar.hr',
                url: '/hr',
                icon: 'bi-people',
                iconColor: 'text-orange-500',
                subItems: [
                    { title: 'Employee Management', url: '/hr/employees', icon: 'bi-person-check', iconColor: 'text-orange-500' },
                    { title: 'Schedule', url: '/hr/schedule', icon: 'bi-calendar', iconColor: 'text-orange-600' },
                    { title: 'Payroll', url: '/hr/payroll', icon: 'bi-currency-dollar', iconColor: 'text-orange-700' }
                ]
            },
            {
                title: 'sidebar.inventory',
                url: '/inventory',
                icon: 'bi-box',
                iconColor: 'text-indigo-500',
                subItems: [
                    { title: 'Stock Management', url: '/inventory/stock', icon: 'bi-boxes', iconColor: 'text-indigo-500' },
                    { title: 'Warehouse', url: '/inventory/warehouse', icon: 'bi-truck', iconColor: 'text-indigo-600' }
                ]
            },
            {
                title: 'sidebar.purchase',
                url: '/purchase',
                icon: 'bi-cart',
                iconColor: 'text-red-500',
                subItems: [
                    { title: 'Purchase Orders', url: '/purchase/orders', icon: 'bi-bag', iconColor: 'text-red-500' },
                    { title: 'Vendors', url: '/purchase/vendors', icon: 'bi-people', iconColor: 'text-red-600' }
                ]
            }
        ];

        this.departmentTabs = [
            { id: 'all', labelKey: 'nav.all', icon: 'bi-grid-3x3-gap', count: 42 },
            { id: 'it', labelKey: 'sidebar.it', icon: 'bi-laptop', count: 12 },
            { id: 'production', labelKey: 'sidebar.production', icon: 'bi-building', count: 8 },
            { id: 'quality', labelKey: 'sidebar.quality', icon: 'bi-bar-chart', count: 6 },
            { id: 'hr', labelKey: 'sidebar.hr', icon: 'bi-people', count: 5 },
            { id: 'inventory', labelKey: 'sidebar.inventory', icon: 'bi-box', count: 7 },
            { id: 'purchase', labelKey: 'sidebar.purchase', icon: 'bi-cart', count: 4 }
        ];

        this.applications = [
            { id: 1, name: 'ERP System', description: 'Enterprise Resource Planning', icon: 'bi-grid-3x3-gap', iconColor: 'text-blue-500', departments: ['it', 'production'], category: 'software' },
            { id: 2, name: 'CRM Platform', description: 'Customer Relationship Management', icon: 'bi-people', iconColor: 'text-green-500', departments: ['hr', 'it'], category: 'software' },
            { id: 3, name: 'QC Mobile', description: 'Quality Control App', icon: 'bi-phone', iconColor: 'text-purple-500', departments: ['quality'], category: 'software' },
            { id: 4, name: 'Inventory System', description: 'Stock Management', icon: 'bi-box', iconColor: 'text-orange-500', departments: ['inventory'], category: 'software' },
            { id: 5, name: 'HR Portal', description: 'Human Resources Management', icon: 'bi-person-badge', iconColor: 'text-red-500', departments: ['hr'], category: 'software' },
            { id: 6, name: 'Purchase Portal', description: 'Procurement System', icon: 'bi-cart', iconColor: 'text-indigo-500', departments: ['purchase'], category: 'software' },
            { id: 7, name: 'MES System', description: 'Manufacturing Execution', icon: 'bi-gear', iconColor: 'text-cyan-500', departments: ['production'], category: 'software' },
            { id: 8, name: 'Company Website', description: 'Corporate Portal', icon: 'bi-globe', iconColor: 'text-blue-600', departments: ['it'], category: 'webpage' }
        ];

        this.announcements = {
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

        this.init();
    }

    init() {
        this.hideLoadingScreen();
        this.initializeEventListeners();
        this.renderSidebarNavigation();
        this.renderDepartmentTabs();
        this.renderApplicationTabs();
        this.renderApplications();
        this.startAnnouncementRotation();
        this.initializeNotifications();
        this.updateTranslations();
        
        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 600,
                easing: 'ease-out-cubic',
                once: true
            });
        }
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1000);
    }

    initializeEventListeners() {
        // Sidebar toggle
        document.getElementById('sidebarToggle')?.addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Sidebar collapse
        document.getElementById('sidebarCollapse')?.addEventListener('click', () => {
            this.toggleSidebarCollapse();
        });

        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Language toggle
        document.getElementById('languageToggle')?.addEventListener('click', () => {
            this.toggleLanguage();
        });

        // View mode toggle
        document.getElementById('viewModeToggle')?.addEventListener('click', () => {
            this.toggleViewMode();
        });

        // Click outside sidebar to close
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');
            
            if (sidebar && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                if (window.innerWidth < 992 && !sidebar.classList.contains('hidden')) {
                    this.closeSidebar();
                }
            }
        });

        // Responsive handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        if (window.innerWidth < 992) {
            // Mobile behavior
            sidebar.classList.toggle('show');
        } else {
            // Desktop behavior
            this.toggleSidebarCollapse();
        }
    }

    toggleSidebarCollapse() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        this.sidebarCollapsed = !this.sidebarCollapsed;
        
        if (this.sidebarCollapsed) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('sidebar-collapsed');
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('sidebar-collapsed');
        }
        
        // Update collapse icon
        const collapseIcon = document.querySelector('#sidebarCollapse i');
        if (collapseIcon) {
            collapseIcon.className = this.sidebarCollapsed ? 'bi bi-chevron-right' : 'bi bi-chevron-left';
        }
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('show');
    }

    handleResize() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        if (window.innerWidth >= 992) {
            sidebar.classList.remove('show');
            if (this.sidebarCollapsed) {
                mainContent.classList.add('sidebar-collapsed');
            } else {
                mainContent.classList.remove('sidebar-collapsed');
            }
        } else {
            mainContent.classList.remove('sidebar-collapsed');
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
        
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.className = this.currentTheme === 'light' ? 'bi bi-sun-fill fs-5 text-gray-700' : 'bi bi-moon-fill fs-5 text-gray-300';
        }
        
        localStorage.setItem('theme', this.currentTheme);
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'vi' ? 'en' : 'vi';
        document.getElementById('languageText').textContent = this.currentLanguage.toUpperCase();
        this.updateTranslations();
        localStorage.setItem('language', this.currentLanguage);
    }

    toggleViewMode() {
        this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
        const toggleIcon = document.querySelector('#viewModeToggle i');
        if (toggleIcon) {
            toggleIcon.className = this.viewMode === 'grid' ? 'bi bi-grid-3x3-gap' : 'bi bi-list';
        }
        this.renderApplications();
    }

    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    updateTranslations() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = this.t(key);
        });
        
        // Re-render components that need translation
        this.renderSidebarNavigation();
        this.renderDepartmentTabs();
    }

    renderSidebarNavigation() {
        const sidebarNav = document.getElementById('sidebarNav');
        if (!sidebarNav) return;

        sidebarNav.innerHTML = this.navigationItems.map(item => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = false; // You can track expanded state if needed
            
            return `
                <div class="nav-item">
                    <a class="nav-link d-flex align-items-center ${hasSubItems ? 'dropdown-toggle' : ''}" 
                       href="${item.url}" 
                       ${hasSubItems ? `data-bs-toggle="collapse" data-bs-target="#submenu-${item.title}" aria-expanded="${isExpanded}"` : ''}>
                        <i class="${item.icon} ${item.iconColor}"></i>
                        <span class="nav-text ms-2">${this.t(item.title)}</span>
                        ${hasSubItems ? `<i class="bi bi-chevron-down ms-auto"></i>` : ''}
                    </a>
                    ${hasSubItems ? `
                        <div class="collapse nav-submenu" id="submenu-${item.title}">
                            ${item.subItems.map(subItem => `
                                <a class="nav-link nav-link-sub" href="${subItem.url}">
                                    <i class="${subItem.icon} ${subItem.iconColor}"></i>
                                    <span class="nav-text ms-2">${subItem.title}</span>
                                </a>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }

    renderDepartmentTabs() {
        const tabsContainer = document.getElementById('departmentTabs');
        if (!tabsContainer) return;

        tabsContainer.innerHTML = this.departmentTabs.map(tab => {
            const isActive = this.currentTab === tab.id;
            return `
                <button class="btn dept-tab ${isActive ? 'active' : ''}" 
                        data-category="${tab.id}"
                        onclick="itPortal.setActiveTab('${tab.id}')">
                    <i class="${tab.icon}"></i>
                    <span>${this.t(tab.labelKey)}</span>
                    <span class="badge">${tab.count}</span>
                </button>
            `;
        }).join('');
    }

    renderApplicationTabs() {
        const tabsContainer = document.getElementById('applicationTabs');
        if (!tabsContainer) return;

        const tabs = [
            { id: 'software', label: 'Phần mềm', icon: 'bi-laptop', count: 6 },
            { id: 'webpage', label: 'Trang web', icon: 'bi-globe', count: 2 }
        ];

        tabsContainer.innerHTML = tabs.map(tab => {
            const isActive = this.currentAppTab === tab.id;
            return `
                <li class="nav-item">
                    <button class="nav-link ${isActive ? 'active' : ''}" 
                            onclick="itPortal.setActiveAppTab('${tab.id}')">
                        <i class="${tab.icon}"></i>
                        <span>${tab.label}</span>
                        <span class="badge">${tab.count}</span>
                    </button>
                </li>
            `;
        }).join('');
    }

    renderApplications() {
        const container = document.getElementById('applicationsGrid');
        if (!container) return;

        const filteredApps = this.applications.filter(app => {
            const matchesDept = this.currentTab === 'all' || app.departments.includes(this.currentTab);
            const matchesAppTab = app.category === this.currentAppTab;
            const matchesSearch = !this.searchTerm || 
                app.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                app.description.toLowerCase().includes(this.searchTerm.toLowerCase());
            
            return matchesDept && matchesAppTab && matchesSearch;
        });

        if (this.viewMode === 'grid') {
            container.innerHTML = filteredApps.map(app => {
                const isFavorited = this.favorites.includes(app.id);
                return `
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card app-card glass-card position-relative">
                            <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" 
                                    onclick="itPortal.toggleFavorite(${app.id})">
                                <i class="bi ${isFavorited ? 'bi-star-fill' : 'bi-star'}"></i>
                            </button>
                            <div class="card-body text-center">
                                <div class="app-icon mb-3">
                                    <i class="${app.icon} ${app.iconColor}"></i>
                                </div>
                                <h6 class="card-title">${app.name}</h6>
                                <p class="card-text small text-muted">${app.description}</p>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            container.innerHTML = `
                <div class="col-12">
                    ${filteredApps.map(app => {
                        const isFavorited = this.favorites.includes(app.id);
                        return `
                            <div class="card app-card-list glass-card mb-3">
                                <div class="card-body d-flex align-items-center">
                                    <div class="app-icon me-3">
                                        <i class="${app.icon} ${app.iconColor}"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <h6 class="card-title mb-1">${app.name}</h6>
                                        <p class="card-text text-muted mb-0">${app.description}</p>
                                    </div>
                                    <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" 
                                            onclick="itPortal.toggleFavorite(${app.id})">
                                        <i class="bi ${isFavorited ? 'bi-star-fill' : 'bi-star'}"></i>
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
    }

    setActiveTab(tabId) {
        this.currentTab = tabId;
        this.renderDepartmentTabs();
        this.renderApplications();
    }

    setActiveAppTab(tabId) {
        this.currentAppTab = tabId;
        this.renderApplicationTabs();
        this.renderApplications();
    }

    toggleFavorite(appId) {
        const index = this.favorites.indexOf(appId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(appId);
        }
        
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.renderApplications();
        this.showToast('Đã cập nhật danh sách yêu thích');
    }

    startAnnouncementRotation() {
        const announcementText = document.getElementById('announcementText');
        if (!announcementText) return;

        let currentIndex = 0;
        const announcements = this.announcements[this.currentLanguage];

        setInterval(() => {
            announcementText.style.opacity = '0';
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % announcements.length;
                announcementText.textContent = announcements[currentIndex];
                announcementText.style.opacity = '1';
            }, 500);
        }, 15000);
    }

    initializeNotifications() {
        const notifications = [
            {
                id: 1,
                title: 'Cập nhật hệ thống ERP',
                message: 'Hệ thống sẽ bảo trì từ 22:00 - 02:00',
                time: '2 phút trước',
                unread: true
            },
            {
                id: 2,
                title: 'Ứng dụng QC Mobile',
                message: 'Phiên bản mới đã có sẵn',
                time: '1 giờ trước',
                unread: true
            },
            {
                id: 3,
                title: 'Khóa đào tạo Excel',
                message: 'Đăng ký mở từ 9:00 ngày mai',
                time: '3 giờ trước',
                unread: false
            }
        ];

        const notificationList = document.getElementById('notificationList');
        if (notificationList) {
            notificationList.innerHTML = notifications.map(notif => `
                <div class="notification-item ${notif.unread ? 'unread' : ''}" 
                     onclick="itPortal.markAsRead(${notif.id})">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="flex-grow-1">
                            <h6 class="mb-1 text-gray-800">${notif.title}</h6>
                            <p class="mb-1 text-muted small">${notif.message}</p>
                            <small class="text-blue-600">${notif.time}</small>
                        </div>
                        ${notif.unread ? '<div class="badge bg-primary rounded-pill ms-2"></div>' : ''}
                    </div>
                </div>
            `).join('');
        }
    }

    markAsRead(notificationId) {
        // Implementation for marking notification as read
        this.showToast('Đã đánh dấu là đã đọc');
    }

    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toastId = 'toast-' + Date.now();
        const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info';
        
        const toastHTML = `
            <div id="${toastId}" class="toast" role="alert">
                <div class="toast-header ${bgClass} text-white">
                    <i class="bi bi-check-circle me-2"></i>
                    <strong class="me-auto">Thông báo</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">${message}</div>
            </div>
        `;
        
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toast = new bootstrap.Toast(document.getElementById(toastId));
        toast.show();
        
        // Remove toast element after it's hidden
        document.getElementById(toastId).addEventListener('hidden.bs.toast', function() {
            this.remove();
        });
    }
}

// Initialize the portal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.itPortal = new ITPortal();
});

// Global utility functions for onclick handlers
function setActiveTab(tabId) {
    if (window.itPortal) {
        window.itPortal.setActiveTab(tabId);
    }
}

function setActiveAppTab(tabId) {
    if (window.itPortal) {
        window.itPortal.setActiveAppTab(tabId);
    }
}

function toggleFavorite(appId) {
    if (window.itPortal) {
        window.itPortal.toggleFavorite(appId);
    }
}
