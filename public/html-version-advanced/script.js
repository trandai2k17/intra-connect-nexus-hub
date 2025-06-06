
// Advanced version with more features
document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    let currentLanguage = localStorage.getItem('language') || 'vi';
    let currentTheme = localStorage.getItem('theme') || 'light';
    let currentCategory = 'all';
    let sidebarState = localStorage.getItem('sidebarState') || 'expanded'; // expanded, collapsed, hidden
    
    // Translations
    const translations = {
        vi: {
            'header.notifications': 'Thông báo',
            'header.profile': 'Hồ sơ',
            'header.settings': 'Cài đặt',
            'header.logout': 'Đăng xuất',
            'sidebar.title': 'IT Portal',
            'sidebar.subtitle': 'Cổng thông tin nội bộ',
            'sidebar.navigation': 'Điều hướng',
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
            'sidebar.documents': 'Tài liệu',
            'sidebar.support': 'Hỗ trợ',
            'sidebar.faq': 'FAQ',
            'sidebar.security': 'Bảo mật',
            'sidebar.helpdesk': 'Helpdesk',
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
            'banner.news.title3': 'Cập nhật chính sách bảo mật IT 2024',
            'banner.news.desc3': 'Các quy định mới về mật khẩu, 2FA và truy cập VPN',
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
        },
        en: {
            'header.notifications': 'Notifications',
            'header.profile': 'Profile',
            'header.settings': 'Settings',
            'header.logout': 'Logout',
            'sidebar.title': 'IT Portal',
            'sidebar.subtitle': 'Internal information portal',
            'sidebar.navigation': 'Navigation',
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
            'sidebar.documents': 'Documents',
            'sidebar.support': 'Support',
            'sidebar.faq': 'FAQ',
            'sidebar.security': 'Security',
            'sidebar.helpdesk': 'Helpdesk',
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
            'banner.news.title3': 'IT Security Policy Update 2024',
            'banner.news.desc3': 'New regulations on passwords, 2FA and VPN access',
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
        }
    };

    // Applications data
    const applications = [
        { id: 1, name: 'ERP System', icon: 'bi-building', description: 'Enterprise Resource Planning', category: 'production', color: 'primary' },
        { id: 2, name: 'MES', icon: 'bi-gear-wide-connected', description: 'Manufacturing Execution System', category: 'production', color: 'success' },
        { id: 3, name: 'QC Mobile', icon: 'bi-phone', description: 'Quality Control App', category: 'qa', color: 'warning' },
        { id: 4, name: 'Microsoft Teams', icon: 'bi-microsoft-teams', description: 'Team Communication', category: 'it', color: 'info' },
        { id: 5, name: 'SharePoint', icon: 'bi-share', description: 'Document Sharing', category: 'it', color: 'secondary' },
        { id: 6, name: 'Outlook', icon: 'bi-envelope', description: 'Email Client', category: 'it', color: 'primary' },
        { id: 7, name: 'GitLab', icon: 'bi-git', description: 'Source Control', category: 'it', color: 'danger' },
        { id: 8, name: 'Jenkins', icon: 'bi-gear', description: 'CI/CD Pipeline', category: 'it', color: 'success' },
        { id: 9, name: 'Inventory System', icon: 'bi-box', description: 'Stock Management', category: 'inventory', color: 'warning' },
        { id: 10, name: 'Purchase Portal', icon: 'bi-cart', description: 'Procurement System', category: 'purchase', color: 'info' },
        { id: 11, name: 'HR Portal', icon: 'bi-people', description: 'Human Resources', category: 'hr', color: 'secondary' },
        { id: 12, name: 'Payroll System', icon: 'bi-cash', description: 'Salary Management', category: 'hr', color: 'success' },
    ];

    // Navigation items data
    const navigationItems = [
        { id: 1, title: 'sidebar.home', icon: 'bi-house-door', url: '#', active: true },
        { id: 2, title: 'sidebar.apps', icon: 'bi-grid-3x3-gap', url: '#' },
        { id: 3, title: 'sidebar.announcements', icon: 'bi-megaphone', url: '#' },
        { 
            id: 4, 
            title: 'sidebar.it-management', 
            icon: 'bi-gear', 
            subItems: [
                { id: 41, title: 'sidebar.systems', icon: 'bi-server', url: '#' },
                { id: 42, title: 'sidebar.software', icon: 'bi-app', url: '#' },
                { id: 43, title: 'sidebar.devices', icon: 'bi-device-hdd', url: '#' }
            ]
        },
        { id: 5, title: 'sidebar.production', icon: 'bi-building', url: '#' },
        { id: 6, title: 'sidebar.inventory', icon: 'bi-box', url: '#' },
        { id: 7, title: 'sidebar.purchase', icon: 'bi-cart', url: '#' },
        { 
            id: 8, 
            title: 'sidebar.support', 
            icon: 'bi-question-circle', 
            subItems: [
                { id: 81, title: 'sidebar.faq', icon: 'bi-question-lg', url: '#' },
                { id: 82, title: 'sidebar.helpdesk', icon: 'bi-headset', url: '#' }
            ]
        },
        { id: 9, title: 'sidebar.security', icon: 'bi-shield-lock', url: '#' }
    ];

    // Notifications data
    const notifications = [
        {
            id: 1,
            title: 'System Maintenance',
            message: 'ERP system will be maintained from 22:00 today',
            time: '19:00 - 29/11/2024',
            type: 'warning',
            read: false
        },
        {
            id: 2,
            title: 'New Team Member',
            message: 'Nguyen Van B has joined IT Department',
            time: '15:30 - 29/11/2024',
            type: 'info',
            read: true
        },
        {
            id: 3,
            title: 'Security Alert',
            message: 'Multiple login attempts detected from unusual location',
            time: '12:15 - 29/11/2024',
            type: 'danger',
            read: false
        }
    ];

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

    // Initialize page components
    initializeLoading();
    initializeTheme();
    initializeLanguage();
    initializeLayout();
    initializeSidebar();
    initializeNavigation();
    initializeAnnouncementRotation();
    initializeCategoryTabs();
    renderApplications();
    renderNotifications();
    initializeSearch();
    initializeEventListeners();
    initializeAOS();

    // Loading Screen
    function initializeLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;
        
        // Simulate loading time
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after animation completes
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    }

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
        showToast(`${currentTheme === 'dark' ? 'Dark' : 'Light'} mode activated`, 'info');
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
        showToast(`Language switched to ${currentLanguage === 'vi' ? 'Vietnamese' : 'English'}`, 'info');
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
        
        // Re-render components that need full translation
        renderNavigationItems();
        initializeAnnouncementRotation();
        renderNotifications();
    }

    // Layout Management
    function initializeLayout() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        if (!sidebar || !mainContent) return;
        
        if (sidebarState === 'collapsed') {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('sidebar-collapsed');
        } else if (sidebarState === 'hidden') {
            sidebar.classList.add('hidden');
            mainContent.classList.add('sidebar-hidden');
        }
        
        // Update layout on window resize
        window.addEventListener('resize', updateLayoutForScreenSize);
        updateLayoutForScreenSize();
    }

    function updateLayoutForScreenSize() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        if (!sidebar || !mainContent) return;
        
        // On mobile, always hide sidebar
        if (window.innerWidth < 992) {
            sidebar.classList.remove('collapsed');
            sidebar.classList.add('hidden');
            mainContent.classList.remove('sidebar-collapsed');
            mainContent.classList.add('sidebar-hidden');
        } else {
            // On desktop, restore saved state
            if (sidebarState === 'collapsed') {
                sidebar.classList.add('collapsed');
                sidebar.classList.remove('hidden');
                mainContent.classList.add('sidebar-collapsed');
                mainContent.classList.remove('sidebar-hidden');
            } else if (sidebarState === 'expanded') {
                sidebar.classList.remove('collapsed');
                sidebar.classList.remove('hidden');
                mainContent.classList.remove('sidebar-collapsed');
                mainContent.classList.remove('sidebar-hidden');
            } else if (sidebarState === 'hidden') {
                sidebar.classList.remove('collapsed');
                sidebar.classList.add('hidden');
                mainContent.classList.remove('sidebar-collapsed');
                mainContent.classList.add('sidebar-hidden');
            }
        }
    }

    // Sidebar Management
    function initializeSidebar() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebarClose = document.getElementById('sidebarClose');
        const sidebarCollapse = document.getElementById('sidebarCollapse');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', function() {
                if (sidebar.classList.contains('hidden')) {
                    sidebar.classList.remove('hidden');
                    sidebar.classList.add('show');
                } else {
                    sidebar.classList.add('hidden');
                    sidebar.classList.remove('show');
                }
            });
        }
        
        if (sidebarClose) {
            sidebarClose.addEventListener('click', function() {
                sidebar.classList.add('hidden');
                sidebar.classList.remove('show');
            });
        }
        
        if (sidebarCollapse) {
            sidebarCollapse.addEventListener('click', function() {
                if (sidebar.classList.contains('collapsed')) {
                    sidebar.classList.remove('collapsed');
                    mainContent.classList.remove('sidebar-collapsed');
                    sidebarCollapse.innerHTML = '<i class="bi bi-chevron-left"></i>';
                    sidebarState = 'expanded';
                } else {
                    sidebar.classList.add('collapsed');
                    mainContent.classList.add('sidebar-collapsed');
                    sidebarCollapse.innerHTML = '<i class="bi bi-chevron-right"></i>';
                    sidebarState = 'collapsed';
                }
                localStorage.setItem('sidebarState', sidebarState);
            });
        }
        
        // Add click event listener to document to close sidebar on click outside
        document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');
            
            if (window.innerWidth < 992 && 
                sidebar && 
                sidebar.classList.contains('show') && 
                !sidebar.contains(event.target) && 
                (!sidebarToggle || !sidebarToggle.contains(event.target))) {
                sidebar.classList.remove('show');
                sidebar.classList.add('hidden');
            }
        });
    }

    // Navigation Management
    function initializeNavigation() {
        renderNavigationItems();
    }

    function renderNavigationItems(parentElement = null, items = navigationItems) {
        const navElement = parentElement || document.getElementById('sidebarNav');
        if (!navElement) return;
        
        navElement.innerHTML = '';
        
        items.forEach(item => {
            let navItem;
            
            if (item.subItems) {
                // Create dropdown menu for items with subitems
                const itemId = `nav-item-${item.id}`;
                navItem = document.createElement('div');
                navItem.className = 'nav-item mb-1';
                
                const navLink = document.createElement('a');
                navLink.href = '#';
                navLink.className = 'nav-link dropdown-toggle';
                navLink.setAttribute('data-bs-toggle', 'collapse');
                navLink.setAttribute('data-bs-target', `#${itemId}`);
                
                const icon = document.createElement('i');
                icon.className = `${item.icon} me-2`;
                
                const span = document.createElement('span');
                span.textContent = translations[currentLanguage][item.title] || item.title;
                
                navLink.appendChild(icon);
                navLink.appendChild(span);
                navItem.appendChild(navLink);
                
                const subMenu = document.createElement('div');
                subMenu.className = 'collapse';
                subMenu.id = itemId;
                
                const subNav = document.createElement('nav');
                subNav.className = 'nav flex-column ms-3 mt-1';
                
                // Render subitems recursively
                item.subItems.forEach(subItem => {
                    const subNavItem = document.createElement('a');
                    subNavItem.href = subItem.url;
                    subNavItem.className = 'nav-link';
                    subNavItem.onclick = function(e) {
                        e.preventDefault();
                        handleNavigation(subItem.title);
                    };
                    
                    const subIcon = document.createElement('i');
                    subIcon.className = `${subItem.icon} me-2`;
                    
                    const subSpan = document.createElement('span');
                    subSpan.textContent = translations[currentLanguage][subItem.title] || subItem.title;
                    
                    subNavItem.appendChild(subIcon);
                    subNavItem.appendChild(subSpan);
                    subNav.appendChild(subNavItem);
                });
                
                subMenu.appendChild(subNav);
                navItem.appendChild(subMenu);
            } else {
                // Create simple nav link
                navItem = document.createElement('a');
                navItem.href = item.url;
                navItem.className = item.active ? 'nav-link active' : 'nav-link';
                navItem.onclick = function(e) {
                    e.preventDefault();
                    handleNavigation(item.title);
                };
                
                const icon = document.createElement('i');
                icon.className = `${item.icon} me-2`;
                
                const span = document.createElement('span');
                span.textContent = translations[currentLanguage][item.title] || item.title;
                
                navItem.appendChild(icon);
                navItem.appendChild(span);
            }
            
            navElement.appendChild(navItem);
        });
    }

    function handleNavigation(title) {
        showToast(`Navigating to ${translations[currentLanguage][title] || title}... Feature not yet deployed.`, 'info');
    }

    // Announcement Management
    function initializeAnnouncementRotation() {
        let currentIndex = 0;
        const announcementElement = document.getElementById('announcementText');
        
        if (announcementElement) {
            // Clear any existing interval
            if (window.announcementInterval) {
                clearInterval(window.announcementInterval);
            }
            
            announcementElement.textContent = announcements[currentLanguage][currentIndex];
            
            window.announcementInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % announcements[currentLanguage].length;
                fadeOut(announcementElement, function() {
                    announcementElement.textContent = announcements[currentLanguage][currentIndex];
                    fadeIn(announcementElement);
                });
            }, 5000);
        }
    }

    // Fade helpers
    function fadeOut(element, callback) {
        element.style.opacity = '1';
        (function fade() {
            if ((element.style.opacity -= 0.1) < 0) {
                element.style.opacity = '0';
                if (callback) callback();
            } else {
                requestAnimationFrame(fade);
            }
        })();
    }

    function fadeIn(element, callback) {
        element.style.opacity = '0';
        (function fade() {
            var val = parseFloat(element.style.opacity);
            if (!((val += 0.1) > 1)) {
                element.style.opacity = val;
                requestAnimationFrame(fade);
            } else {
                element.style.opacity = '1';
                if (callback) callback();
            }
        })();
    }

    // Category Tabs Management
    function initializeCategoryTabs() {
        const tabButtons = document.querySelectorAll('#categoryTabs .nav-link');
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    const badge = btn.querySelector('.badge');
                    if (badge) {
                        badge.classList.remove('bg-primary');
                        badge.classList.add('bg-secondary');
                    }
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                const badge = this.querySelector('.badge');
                if (badge) {
                    badge.classList.remove('bg-secondary');
                    badge.classList.add('bg-primary');
                }
                
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
        
        grid.innerHTML = '';
        
        filteredApps.forEach((app, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-3 col-sm-6';
            col.setAttribute('data-aos', 'fade-up');
            col.setAttribute('data-aos-delay', `${index * 50}`);
            
            const card = document.createElement('div');
            card.className = `card glass-card app-card bg-gradient-light`;
            card.onclick = () => openApplication(app.name);
            
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            
            const icon = document.createElement('i');
            icon.className = `bi ${app.icon} text-${app.color}`;
            
            const title = document.createElement('h6');
            title.className = 'card-title';
            title.textContent = app.name;
            
            const description = document.createElement('p');
            description.className = 'card-text';
            description.textContent = app.description;
            
            cardBody.appendChild(icon);
            cardBody.appendChild(title);
            cardBody.appendChild(description);
            card.appendChild(cardBody);
            col.appendChild(card);
            
            grid.appendChild(col);
        });
    }

    function openApplication(appName) {
        showToast(`Opening ${appName}...`, 'info');
    }

    // Notifications Management
    function renderNotifications() {
        const notificationList = document.getElementById('notificationList');
        const notificationCount = document.querySelector('.notification-count');
        
        if (!notificationList || !notificationCount) return;
        
        // Count unread notifications
        const unreadCount = notifications.filter(notification => !notification.read).length;
        notificationCount.textContent = unreadCount;
        
        if (unreadCount === 0) {
            notificationCount.style.display = 'none';
        } else {
            notificationCount.style.display = 'inline-block';
        }
        
        // Render notifications
        notificationList.innerHTML = '';
        
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = `notification-item ${notification.read ? '' : 'unread'}`;
            notificationItem.onclick = () => markAsRead(notification.id);
            
            const itemContent = `
                <div class="d-flex justify-content-between align-items-start">
                    <h6 class="mb-1 fw-semibold">${notification.title}</h6>
                    <small class="text-${notification.type}">
                        <i class="bi ${getNotificationIcon(notification.type)}"></i>
                    </small>
                </div>
                <p class="mb-1 text-muted small">${notification.message}</p>
                <small class="text-muted">${notification.time}</small>
            `;
            
            notificationItem.innerHTML = itemContent;
            notificationList.appendChild(notificationItem);
        });
    }

    function getNotificationIcon(type) {
        switch (type) {
            case 'warning': return 'bi-exclamation-triangle';
            case 'danger': return 'bi-shield-exclamation';
            case 'success': return 'bi-check-circle';
            default: return 'bi-info-circle';
        }
    }

    function markAsRead(id) {
        const notification = notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            renderNotifications();
            showToast('Notification marked as read', 'success');
        }
    }

    function markAllAsRead() {
        notifications.forEach(notification => {
            notification.read = true;
        });
        renderNotifications();
        showToast('All notifications marked as read', 'success');
    }

    // Search Management
    function initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        const mobileSearchInput = document.getElementById('mobileSearchInput');
        const searchResults = document.getElementById('searchResults');
        const searchToggle = document.getElementById('searchToggle');
        const mobileSearch = document.getElementById('mobileSearch');
        
        // Show/hide mobile search
        if (searchToggle && mobileSearch) {
            searchToggle.addEventListener('click', function() {
                if (mobileSearch.style.display === 'none') {
                    mobileSearch.style.display = 'block';
                    mobileSearchInput.focus();
                } else {
                    mobileSearch.style.display = 'none';
                }
            });
        }
        
        // Desktop search functionality
        if (searchInput && searchResults) {
            searchInput.addEventListener('input', function() {
                handleSearch(this.value, searchResults);
            });
            
            searchInput.addEventListener('focus', function() {
                searchResults.classList.add('show');
            });
            
            // Handle click outside to close search results
            document.addEventListener('click', function(e) {
                if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                    searchResults.classList.remove('show');
                }
            });
        }
        
        // Mobile search functionality
        if (mobileSearchInput) {
            mobileSearchInput.addEventListener('input', function() {
                performSearch(this.value);
            });
        }
    }

    function handleSearch(query, resultsContainer) {
        if (!query || query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }
        
        const results = applications.filter(app => 
            app.name.toLowerCase().includes(query.toLowerCase()) ||
            app.description.toLowerCase().includes(query.toLowerCase())
        );
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="p-3 text-center">
                    <i class="bi bi-search mb-2 text-muted fs-4"></i>
                    <p class="mb-0">No results found for "${query}"</p>
                </div>
            `;
            return;
        }
        
        resultsContainer.innerHTML = '';
        
        results.slice(0, 5).forEach(app => {
            const resultItem = document.createElement('div');
            resultItem.className = 'p-3 border-bottom search-result-item';
            resultItem.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="me-3">
                        <i class="bi ${app.icon} text-${app.color} fs-4"></i>
                    </div>
                    <div>
                        <h6 class="mb-0">${app.name}</h6>
                        <small class="text-muted">${app.description}</small>
                    </div>
                </div>
            `;
            
            resultItem.addEventListener('click', function() {
                openApplication(app.name);
                resultsContainer.classList.remove('show');
            });
            
            resultsContainer.appendChild(resultItem);
        });
        
        if (results.length > 5) {
            const moreResults = document.createElement('div');
            moreResults.className = 'p-2 text-center';
            moreResults.innerHTML = `<small>Showing 5 of ${results.length} results</small>`;
            resultsContainer.appendChild(moreResults);
        }
    }

    function performSearch(query) {
        if (!query || query.length < 2) {
            return;
        }
        
        const results = applications.filter(app => 
            app.name.toLowerCase().includes(query.toLowerCase()) ||
            app.description.toLowerCase().includes(query.toLowerCase())
        );
        
        showToast(`Found ${results.length} results for "${query}"`, 'info');
    }

    // Toast Notification System
    function showToast(message, type = 'info', duration = 3000) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        
        const toastId = 'toast-' + Date.now();
        const toastElement = document.createElement('div');
        toastElement.className = `toast align-items-center border-0 show bg-${type}`;
        toastElement.id = toastId;
        toastElement.setAttribute('role', 'alert');
        toastElement.setAttribute('aria-live', 'assertive');
        toastElement.setAttribute('aria-atomic', 'true');
        
        const toastContent = `
            <div class="d-flex">
                <div class="toast-body text-white">
                    <i class="bi ${getToastIcon(type)} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        
        toastElement.innerHTML = toastContent;
        toastContainer.appendChild(toastElement);
        
        // Auto hide after duration
        setTimeout(() => {
            const toast = document.getElementById(toastId);
            if (toast) {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }
        }, duration);
        
        // Add click handler for close button
        const closeButton = toastElement.querySelector('.btn-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                toastElement.classList.remove('show');
                setTimeout(() => {
                    toastElement.remove();
                }, 300);
            });
        }
    }

    function getToastIcon(type) {
        switch (type) {
            case 'success': return 'bi-check-circle';
            case 'warning': return 'bi-exclamation-triangle';
            case 'danger': return 'bi-x-circle';
            default: return 'bi-info-circle';
        }
    }

    // Initialize AOS (Animate On Scroll)
    function initializeAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true
        });
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
        const markAllReadBtn = document.getElementById('markAllRead');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent dropdown from closing
                markAllAsRead();
            });
        }
        
        // Tooltips and Popovers
        initializeBootstrapComponents();
    }

    // Initialize Bootstrap Components
    function initializeBootstrapComponents() {
        // Initialize tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Initialize popovers
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }
});
