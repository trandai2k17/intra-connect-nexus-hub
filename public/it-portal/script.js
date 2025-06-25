
// IT Portal - Enhanced JavaScript with Bootstrap Integration
document.addEventListener('DOMContentLoaded', function() {
    // Global State Management
    const AppState = {
        currentLanguage: localStorage.getItem('language') || 'vi',
        currentTheme: localStorage.getItem('theme') || 'light',
        currentCategory: 'all',
        viewMode: localStorage.getItem('viewMode') || 'grid',
        favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
        searchCache: new Map(),
        isLoading: true
    };

    // Translation Data
    const translations = {
        vi: {
            'nav.subtitle': 'Hệ thống thông tin nội bộ',
            'nav.search': 'Tìm kiếm ứng dụng...',
            'nav.notifications': 'Thông báo',
            'nav.viewAll': 'Xem tất cả',
            'nav.profile': 'Hồ sơ',
            'nav.settings': 'Cài đặt',
            'nav.logout': 'Đăng xuất',
            'sidebar.main': 'Chính',
            'sidebar.applications': 'Ứng dụng',
            'sidebar.support': 'Hỗ trợ',
            'sidebar.home': 'Trang chủ',
            'sidebar.dashboard': 'Bảng điều khiển',
            'sidebar.analytics': 'Phân tích',
            'sidebar.reports': 'Báo cáo',
            'sidebar.erp': 'Hệ thống ERP',
            'sidebar.mes': 'Hệ thống MES',
            'sidebar.qc': 'Kiểm soát chất lượng',
            'sidebar.inventory': 'Quản lý kho',
            'sidebar.helpdesk': 'Trợ giúp IT',
            'sidebar.documentation': 'Tài liệu',
            'banner.category1': 'Sản xuất',
            'banner.title1': 'Triển khai hệ thống MES mới',
            'banner.desc1': 'Hệ thống quản lý sản xuất thông minh sẽ ra mắt tháng 12/2024',
            'banner.category2': 'Chất lượng',
            'banner.title2': 'Ra mắt ứng dụng QC Mobile',
            'banner.desc2': 'Ứng dụng kiểm soát chất lượng trên thiết bị di động',
            'banner.category3': 'Bảo mật',
            'banner.title3': 'Cập nhật chính sách bảo mật IT',
            'banner.desc3': 'Quy định mới về mật khẩu, 2FA và truy cập VPN',
            'banner.explore': 'Khám phá',
            'widget.maintenance': 'Bảo trì hệ thống',
            'widget.maintenanceDesc': 'Bảo trì ERP tối nay 22:00-02:00',
            'widget.security': 'Cảnh báo bảo mật',
            'widget.securityDesc': 'Phát hiện email lừa đảo',
            'widget.training': 'Đào tạo Office 365',
            'widget.trainingDesc': 'Khóa học Teams & SharePoint ngày 2/12',
            'widget.server': 'Máy chủ mới sẵn sàng',
            'widget.serverDesc': 'Máy chủ sao lưu đã cài đặt thành công',
            'tabs.all': 'Tất cả',
            'tabs.production': 'Sản xuất',
            'tabs.inventory': 'Kho bãi',
            'tabs.purchase': 'Mua hàng',
            'apps.title': 'Ứng dụng & Phần mềm',
            'apps.subtitle': 'Truy cập nhanh các công cụ và hệ thống nội bộ',
            'apps.updated': 'Cập nhật: 29/11/2024',
            'stats.activeApps': 'Ứng dụng hoạt động',
            'stats.activeUsers': 'Người dùng hoạt động',
            'stats.uptime': 'Thời gian hoạt động'
        },
        en: {
            'nav.subtitle': 'Internal Information System',
            'nav.search': 'Search applications...',
            'nav.notifications': 'Notifications',
            'nav.viewAll': 'View All',
            'nav.profile': 'Profile',
            'nav.settings': 'Settings',
            'nav.logout': 'Logout',
            'sidebar.main': 'Main',
            'sidebar.applications': 'Applications',
            'sidebar.support': 'Support',
            'sidebar.home': 'Home',
            'sidebar.dashboard': 'Dashboard',
            'sidebar.analytics': 'Analytics',
            'sidebar.reports': 'Reports',
            'sidebar.erp': 'ERP System',
            'sidebar.mes': 'MES System',
            'sidebar.qc': 'Quality Control',
            'sidebar.inventory': 'Inventory Management',
            'sidebar.helpdesk': 'IT Helpdesk',
            'sidebar.documentation': 'Documentation',
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

    // Application Data
    const applications = [
        { id: 1, name: 'ERP System', icon: 'bi-building', description: 'Enterprise Resource Planning', category: 'production', color: 'primary', url: '#erp' },
        { id: 2, name: 'MES Manufacturing', icon: 'bi-gear-wide-connected', description: 'Manufacturing Execution System', category: 'production', color: 'success', url: '#mes' },
        { id: 3, name: 'QC Mobile', icon: 'bi-phone', description: 'Quality Control Mobile App', category: 'qa', color: 'warning', url: '#qc-mobile' },
        { id: 4, name: 'Microsoft Teams', icon: 'bi-microsoft-teams', description: 'Team Communication & Collaboration', category: 'it', color: 'info', url: 'https://teams.microsoft.com' },
        { id: 5, name: 'SharePoint', icon: 'bi-share', description: 'Document Management & Sharing', category: 'it', color: 'secondary', url: 'https://sharepoint.com' },
        { id: 6, name: 'Outlook', icon: 'bi-envelope', description: 'Email & Calendar Management', category: 'it', color: 'primary', url: 'https://outlook.com' },
        { id: 7, name: 'GitLab', icon: 'bi-git', description: 'Source Code Management', category: 'it', color: 'danger', url: '#gitlab' },
        { id: 8, name: 'Jenkins CI/CD', icon: 'bi-gear', description: 'Continuous Integration Pipeline', category: 'it', color: 'success', url: '#jenkins' },
        { id: 9, name: 'Inventory System', icon: 'bi-box', description: 'Stock & Warehouse Management', category: 'inventory', color: 'warning', url: '#inventory' },
        { id: 10, name: 'Purchase Portal', icon: 'bi-cart', description: 'Procurement & Purchasing', category: 'purchase', color: 'info', url: '#purchase' },
        { id: 11, name: 'HR Portal', icon: 'bi-people', description: 'Human Resources Management', category: 'hr', color: 'secondary', url: '#hr' },
        { id: 12, name: 'Payroll System', icon: 'bi-cash-stack', description: 'Salary & Benefits Management', category: 'hr', color: 'success', url: '#payroll' }
    ];

    // Navigation Data
    const navigationData = {
        main: [
            { id: 'home', title: 'sidebar.home', icon: 'bi-house-door', url: '#home', active: true },
            { id: 'dashboard', title: 'sidebar.dashboard', icon: 'bi-speedometer2', url: '#dashboard' },
            { id: 'analytics', title: 'sidebar.analytics', icon: 'bi-graph-up', url: '#analytics' },
            { id: 'reports', title: 'sidebar.reports', icon: 'bi-file-earmark-text', url: '#reports' }
        ],
        applications: [
            { id: 'erp', title: 'sidebar.erp', icon: 'bi-building', url: '#erp' },
            { id: 'mes', title: 'sidebar.mes', icon: 'bi-gear-wide-connected', url: '#mes' },
            { id: 'qc', title: 'sidebar.qc', icon: 'bi-shield-check', url: '#qc' },
            { id: 'inventory', title: 'sidebar.inventory', icon: 'bi-box', url: '#inventory' }
        ],
        support: [
            { id: 'helpdesk', title: 'sidebar.helpdesk', icon: 'bi-headset', url: '#helpdesk' },
            { id: 'documentation', title: 'sidebar.documentation', icon: 'bi-book', url: '#documentation' }
        ]
    };

    // Notification Data
    const notifications = [
        {
            id: 1,
            title: 'System Maintenance Scheduled',
            message: 'ERP system will be maintained from 22:00 today to 02:00 tomorrow',
            time: '19:00 - 29/11/2024',
            type: 'warning',
            read: false,
            icon: 'bi-exclamation-triangle'
        },
        {
            id: 2,
            title: 'Security Alert',
            message: 'Multiple login attempts detected from unusual location',
            time: '15:30 - 29/11/2024',
            type: 'danger',
            read: false,
            icon: 'bi-shield-exclamation'
        },
        {
            id: 3,
            title: 'New Team Member',
            message: 'Nguyen Van B has joined the IT Department',
            time: '12:15 - 29/11/2024',
            type: 'info',
            read: true,
            icon: 'bi-person-plus'
        }
    ];

    // Announcement Data
    const announcements = {
        vi: [
            '🎉 Chào mừng đến với IT Portal - Cổng thông tin hệ thống nội bộ',
            '📢 Bảo trì hệ thống ERP dự kiến từ 22:00 đêm nay đến 02:00 sáng mai',
            '🚀 Ứng dụng QC Mobile mới đã có sẵn trên App Store và Google Play',
            '💡 Khóa học Excel nâng cao sẽ bắt đầu vào tuần tới - Đăng ký ngay!',
            '🔐 Chính sách bảo mật mới: Tất cả tài khoản phải kích hoạt 2FA trước 31/12'
        ],
        en: [
            '🎉 Welcome to IT Portal - Your gateway to internal systems',
            '📢 ERP system maintenance scheduled from 22:00 tonight to 02:00 tomorrow',
            '🚀 New QC Mobile app is now available on App Store and Google Play',
            '💡 Advanced Excel course starting next week - Register now!',
            '🔐 New security policy: All accounts must enable 2FA before 31/12'
        ]
    };

    // Initialize Application
    initializeApp();

    function initializeApp() {
        showLoadingScreen();
        
        // Initialize core features
        initializeTheme();
        initializeLanguage();
        initializeNavigation();
        initializeEventListeners();
        initializeKeyboardShortcuts();
        
        // Render components
        renderNotifications();
        renderApplications();
        startAnnouncementRotation();
        
        // Initialize animations
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100
            });
        }
        
        // Hide loading screen
        setTimeout(() => {
            hideLoadingScreen();
            AppState.isLoading = false;
        }, 1500);
    }

    // Loading Screen Management
    function showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // Theme Management
    function initializeTheme() {
        document.documentElement.setAttribute('data-theme', AppState.currentTheme);
        updateThemeIcon();
    }

    function toggleTheme() {
        AppState.currentTheme = AppState.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', AppState.currentTheme);
        localStorage.setItem('theme', AppState.currentTheme);
        updateThemeIcon();
        
        showToast(
            `${AppState.currentTheme === 'dark' ? 'Dark' : 'Light'} mode activated`,
            'info'
        );
    }

    function updateThemeIcon() {
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.className = AppState.currentTheme === 'light' 
                ? 'bi bi-moon-stars-fill' 
                : 'bi bi-sun-fill';
        }
    }

    // Language Management
    function initializeLanguage() {
        document.documentElement.lang = AppState.currentLanguage;
        updateLanguageButton();
        translatePage();
    }

    function toggleLanguage() {
        AppState.currentLanguage = AppState.currentLanguage === 'vi' ? 'en' : 'vi';
        document.documentElement.lang = AppState.currentLanguage;
        localStorage.setItem('language', AppState.currentLanguage);
        updateLanguageButton();
        translatePage();
        
        showToast(
            `Language switched to ${AppState.currentLanguage === 'vi' ? 'Vietnamese' : 'English'}`,
            'info'
        );
    }

    function updateLanguageButton() {
        const languageText = document.getElementById('languageText');
        if (languageText) {
            languageText.textContent = AppState.currentLanguage.toUpperCase();
        }
    }

    function translatePage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = translations[AppState.currentLanguage]?.[key];
            if (translation) {
                element.textContent = translation;
            }
        });

        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const translation = translations[AppState.currentLanguage]?.[key];
            if (translation) {
                element.placeholder = translation;
            }
        });

        // Re-render dynamic content
        renderNavigationItems();
        startAnnouncementRotation();
    }

    // Navigation Management
    function initializeNavigation() {
        renderNavigationItems();
        initializeCategoryTabs();
        initializeViewModeToggle();
    }

    function renderNavigationItems() {
        Object.keys(navigationData).forEach(section => {
            const container = document.getElementById(`${section}Navigation`);
            if (!container) return;

            container.innerHTML = '';
            
            navigationData[section].forEach(item => {
                const navItem = document.createElement('a');
                navItem.href = item.url;
                navItem.className = `nav-link ${item.active ? 'active' : ''}`;
                navItem.onclick = (e) => {
                    e.preventDefault();
                    handleNavigation(item.id, item.title);
                };

                const icon = document.createElement('i');
                icon.className = `${item.icon} me-2`;

                const text = document.createElement('span');
                text.textContent = translations[AppState.currentLanguage][item.title] || item.title;

                navItem.appendChild(icon);
                navItem.appendChild(text);
                container.appendChild(navItem);
            });
        });
    }

    function handleNavigation(id, titleKey) {
        // Update active states
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        event.target.closest('.nav-link').classList.add('active');
        
        const title = translations[AppState.currentLanguage][titleKey] || titleKey;
        showToast(`Navigating to ${title}...`, 'info');
        
        // Close sidebar on mobile
        if (window.innerWidth < 992) {
            const sidebar = document.getElementById('sidebar');
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebar);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        }
    }

    // Category Tabs Management
    function initializeCategoryTabs() {
        const categoryTabs = document.querySelectorAll('#categoryTabs .nav-link');
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active states
                categoryTabs.forEach(t => {
                    t.classList.remove('active');
                    const badge = t.querySelector('.badge');
                    if (badge) {
                        badge.classList.remove('bg-primary');
                        badge.classList.add('bg-secondary');
                    }
                });

                this.classList.add('active');
                const badge = this.querySelector('.badge');
                if (badge) {
                    badge.classList.remove('bg-secondary');
                    badge.classList.add('bg-primary');
                }

                AppState.currentCategory = this.getAttribute('data-category');
                renderApplications();
            });
        });
    }

    // View Mode Management
    function initializeViewModeToggle() {
        const viewModeButtons = document.querySelectorAll('#viewModeToggle .btn');
        viewModeButtons.forEach(button => {
            button.addEventListener('click', function() {
                viewModeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                AppState.viewMode = this.getAttribute('data-view');
                localStorage.setItem('viewMode', AppState.viewMode);
                renderApplications();
            });
        });

        // Set initial state
        const currentViewButton = document.querySelector(`#viewModeToggle [data-view="${AppState.viewMode}"]`);
        if (currentViewButton) {
            viewModeButtons.forEach(btn => btn.classList.remove('active'));
            currentViewButton.classList.add('active');
        }
    }

    // Application Management
    function renderApplications() {
        const container = document.getElementById('applicationsContainer');
        if (!container) return;

        const filteredApps = AppState.currentCategory === 'all' 
            ? applications 
            : applications.filter(app => app.category === AppState.currentCategory);

        container.innerHTML = '';

        if (AppState.viewMode === 'grid') {
            renderGridView(container, filteredApps);
        } else {
            renderListView(container, filteredApps);
        }
    }

    function renderGridView(container, apps) {
        const row = document.createElement('div');
        row.className = 'row g-3';

        apps.forEach((app, index) => {
            const col = document.createElement('div');
            col.className = 'col-lg-3 col-md-4 col-sm-6';
            col.setAttribute('data-aos', 'fade-up');
            col.setAttribute('data-aos-delay', `${index * 50}`);

            const card = createAppCard(app);
            col.appendChild(card);
            row.appendChild(col);
        });

        container.appendChild(row);
    }

    function renderListView(container, apps) {
        const list = document.createElement('div');
        list.className = 'list-group list-group-flush';

        apps.forEach((app, index) => {
            const item = document.createElement('div');
            item.className = 'list-group-item app-card-list glass-card';
            item.setAttribute('data-aos', 'fade-right');
            item.setAttribute('data-aos-delay', `${index * 30}`);
            
            item.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="app-icon me-3">
                        <i class="bi ${app.icon} text-${app.color}"></i>
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${app.name}</h6>
                        <p class="text-muted mb-0 small">${app.description}</p>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-sm favorite-btn ${AppState.favorites.includes(app.id) ? 'favorited' : ''}" 
                                onclick="toggleFavorite(${app.id})" title="Add to favorites">
                            <i class="bi ${AppState.favorites.includes(app.id) ? 'bi-star-fill' : 'bi-star'}"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-primary" onclick="openApplication(${app.id})">
                            <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            `;

            list.appendChild(item);
        });

        container.appendChild(list);
    }

    function createAppCard(app) {
        const card = document.createElement('div');
        card.className = 'card glass-card app-card h-100';
        card.onclick = () => openApplication(app.id);

        card.innerHTML = `
            <button class="btn favorite-btn ${AppState.favorites.includes(app.id) ? 'favorited' : ''}" 
                    onclick="event.stopPropagation(); toggleFavorite(${app.id})" title="Add to favorites">
                <i class="bi ${AppState.favorites.includes(app.id) ? 'bi-star-fill' : 'bi-star'}"></i>
            </button>
            <div class="card-body">
                <div class="app-icon">
                    <i class="bi ${app.icon} text-${app.color}"></i>
                </div>
                <h6 class="card-title">${app.name}</h6>
                <p class="card-text text-muted small">${app.description}</p>
            </div>
        `;

        return card;
    }

    // Application Actions
    window.openApplication = function(appId) {
        const app = applications.find(a => a.id === appId);
        if (!app) return;

        if (app.url.startsWith('http')) {
            window.open(app.url, '_blank');
        } else {
            showToast(`Opening ${app.name}...`, 'info');
        }
    };

    window.toggleFavorite = function(appId) {
        const index = AppState.favorites.indexOf(appId);
        if (index > -1) {
            AppState.favorites.splice(index, 1);
            showToast('Removed from favorites', 'info');
        } else {
            AppState.favorites.push(appId);
            showToast('Added to favorites', 'success');
        }
        
        localStorage.setItem('favorites', JSON.stringify(AppState.favorites));
        renderApplications();
    };

    // Search Management
    function initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        const mobileSearchInput = document.getElementById('mobileSearchInput');
        const searchResults = document.getElementById('searchResults');
        const mobileSearchToggle = document.getElementById('mobileSearchToggle');
        const mobileSearchContainer = document.getElementById('mobileSearchContainer');

        // Desktop search
        if (searchInput && searchResults) {
            searchInput.addEventListener('input', debounce((e) => {
                handleSearch(e.target.value, searchResults);
            }, 300));

            searchInput.addEventListener('focus', () => {
                if (searchInput.value.trim()) {
                    searchResults.classList.add('show');
                }
            });

            // Close search results when clicking outside
            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                    searchResults.classList.remove('show');
                }
            });
        }

        // Mobile search toggle
        if (mobileSearchToggle && mobileSearchContainer) {
            mobileSearchToggle.addEventListener('click', () => {
                const isVisible = mobileSearchContainer.style.display !== 'none';
                mobileSearchContainer.style.display = isVisible ? 'none' : 'block';
                
                if (!isVisible && mobileSearchInput) {
                    setTimeout(() => mobileSearchInput.focus(), 100);
                }
            });
        }

        // Mobile search
        if (mobileSearchInput) {
            mobileSearchInput.addEventListener('input', debounce((e) => {
                performMobileSearch(e.target.value);
            }, 300));
        }
    }

    function handleSearch(query, resultsContainer) {
        if (!query || query.length < 2) {
            resultsContainer.innerHTML = '';
            resultsContainer.classList.remove('show');
            return;
        }

        // Check cache first
        if (AppState.searchCache.has(query)) {
            displaySearchResults(AppState.searchCache.get(query), resultsContainer);
            return;
        }

        const results = applications.filter(app => 
            app.name.toLowerCase().includes(query.toLowerCase()) ||
            app.description.toLowerCase().includes(query.toLowerCase()) ||
            app.category.toLowerCase().includes(query.toLowerCase())
        );

        // Cache results
        AppState.searchCache.set(query, results);
        displaySearchResults(results, resultsContainer);
    }

    function displaySearchResults(results, resultsContainer) {
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="p-3 text-center">
                    <i class="bi bi-search mb-2 text-muted fs-4 d-block"></i>
                    <p class="mb-0 text-muted">No applications found</p>
                </div>
            `;
            resultsContainer.classList.add('show');
            return;
        }

        results.slice(0, 6).forEach(app => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="app-icon me-3" style="width: 40px; height: 40px;">
                        <i class="bi ${app.icon} text-${app.color}"></i>
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${app.name}</h6>
                        <small class="text-muted">${app.description}</small>
                    </div>
                    <i class="bi bi-arrow-right text-muted"></i>
                </div>
            `;

            resultItem.addEventListener('click', () => {
                openApplication(app.id);
                resultsContainer.classList.remove('show');
                document.getElementById('searchInput').value = '';
            });

            resultsContainer.appendChild(resultItem);
        });

        if (results.length > 6) {
            const moreResults = document.createElement('div');
            moreResults.className = 'p-2 text-center border-top';
            moreResults.innerHTML = `<small class="text-muted">Showing 6 of ${results.length} results</small>`;
            resultsContainer.appendChild(moreResults);
        }

        resultsContainer.classList.add('show');
    }

    function performMobileSearch(query) {
        if (!query || query.length < 2) return;

        const results = applications.filter(app => 
            app.name.toLowerCase().includes(query.toLowerCase()) ||
            app.description.toLowerCase().includes(query.toLowerCase())
        );

        showToast(`Found ${results.length} applications`, 'info');
    }

    // Notification Management
    function renderNotifications() {
        const notificationList = document.getElementById('notificationList');
        const notificationBadge = document.querySelector('.notification-badge');
        
        if (!notificationList) return;

        const unreadCount = notifications.filter(n => !n.read).length;
        
        if (notificationBadge) {
            notificationBadge.textContent = unreadCount;
            notificationBadge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
        }

        notificationList.innerHTML = '';
        
        notifications.forEach(notification => {
            const item = document.createElement('div');
            item.className = `notification-item ${notification.read ? '' : 'unread'}`;
            item.onclick = () => markNotificationAsRead(notification.id);

            item.innerHTML = `
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="mb-0 fw-semibold">${notification.title}</h6>
                    <small class="text-${notification.type}">
                        <i class="bi ${notification.icon}"></i>
                    </small>
                </div>
                <p class="mb-1 text-muted small">${notification.message}</p>
                <small class="text-muted">${notification.time}</small>
            `;

            notificationList.appendChild(item);
        });
    }

    function markNotificationAsRead(id) {
        const notification = notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            notification.read = true;
            renderNotifications();
            showToast('Notification marked as read', 'success');
        }
    }

    function markAllNotificationsAsRead() {
        notifications.forEach(notification => {
            notification.read = true;
        });
        renderNotifications();
        showToast('All notifications marked as read', 'success');
    }

    // Announcement Management
    function startAnnouncementRotation() {
        let currentIndex = 0;
        const announcementElement = document.getElementById('announcementText');
        
        if (!announcementElement) return;

        const announceList = announcements[AppState.currentLanguage];
        
        // Clear existing interval
        if (window.announcementInterval) {
            clearInterval(window.announcementInterval);
        }

        // Set initial announcement
        announcementElement.textContent = announceList[currentIndex];

        // Rotate announcements
        window.announcementInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % announceList.length;
            
            // Fade out
            announcementElement.style.opacity = '0';
            
            setTimeout(() => {
                announcementElement.textContent = announceList[currentIndex];
                announcementElement.style.opacity = '1';
            }, 300);
        }, 5000);
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

        // Mark all notifications as read
        const markAllRead = document.getElementById('markAllRead');
        if (markAllRead) {
            markAllRead.addEventListener('click', (e) => {
                e.stopPropagation();
                markAllNotificationsAsRead();
            });
        }

        // Initialize search
        initializeSearch();

        // Initialize tooltips
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach(tooltip => {
            new bootstrap.Tooltip(tooltip);
        });

        // Window resize handler
        window.addEventListener('resize', debounce(() => {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 250));
    }

    // Keyboard Shortcuts
    function initializeKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+K or Cmd+K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                }
            }

            // Ctrl+B or Cmd+B for sidebar toggle
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                const sidebar = document.getElementById('sidebar');
                const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(sidebar);
                bsOffcanvas.toggle();
            }

            // Ctrl+/ or Cmd+/ for shortcuts modal
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                const shortcutsModal = new bootstrap.Modal(document.getElementById('shortcutsModal'));
                shortcutsModal.show();
            }

            // Escape to close modals and dropdowns
            if (e.key === 'Escape') {
                const searchResults = document.getElementById('searchResults');
                if (searchResults) {
                    searchResults.classList.remove('show');
                }
            }
        });
    }

    // Toast Notification System
    function showToast(message, type = 'info', duration = 3000) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toastId = 'toast-' + Date.now();
        const toastElement = document.createElement('div');
        toastElement.className = `toast align-items-center border-0 show`;
        toastElement.id = toastId;
        toastElement.setAttribute('role', 'alert');

        const bgClass = {
            'success': 'bg-success',
            'warning': 'bg-warning',
            'danger': 'bg-danger',
            'info': 'bg-info'
        }[type] || 'bg-info';

        const iconClass = {
            'success': 'bi-check-circle',
            'warning': 'bi-exclamation-triangle',
            'danger': 'bi-x-circle',
            'info': 'bi-info-circle'
        }[type] || 'bi-info-circle';

        toastElement.classList.add(bgClass);
        toastElement.innerHTML = `
            <div class="d-flex">
                <div class="toast-body text-white">
                    <i class="bi ${iconClass} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        toastContainer.appendChild(toastElement);

        // Auto hide
        setTimeout(() => {
            const toast = document.getElementById(toastId);
            if (toast) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }
        }, duration);
    }

    // Utility Functions
    function debounce(func, wait) {
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

    // Global functions for window object
    window.AppState = AppState;
    window.showToast = showToast;
    window.toggleTheme = toggleTheme;
    window.toggleLanguage = toggleLanguage;

    // Log initialization
    console.log('🚀 IT Portal initialized successfully');
    console.log('📊 Application State:', AppState);
});
