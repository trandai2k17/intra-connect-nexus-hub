
// IT Portal - Complete JavaScript with Modern Features
class ITPortal {
    constructor() {
        this.currentLanguage = 'vi';
        this.currentTheme = 'light';
        this.currentDeptTab = 'all';
        this.currentAppTab = 'software';
        this.viewMode = 'grid';
        this.favorites = JSON.parse(localStorage.getItem('itportal_favorites') || '[1, 4, 6, 7]');
        this.currentSlide = 0;
        this.totalSlides = 3;
        
        this.translations = {
            vi: {
                'nav.home': 'Trang chủ',
                'nav.it': 'Công nghệ thông tin',
                'nav.production': 'Sản xuất',
                'nav.quality': 'Chất lượng',
                'nav.hr': 'Nhân sự',
                'nav.software': 'Phần mềm',
                'nav.webpage': 'Trang web',
                'nav.document': 'Tài liệu',
                'tab.all': 'Tất cả',
                'tab.it': 'Công nghệ thông tin',
                'tab.production': 'Sản xuất',
                'tab.quality': 'Chất lượng',
                'tab.hr': 'Nhân sự',
                'app.software': 'Phần mềm',
                'app.webpage': 'Trang web',
                'notification.title': 'Thông báo',
                'notification.viewAll': 'Xem tất cả thông báo',
                'copyright': '© 2024 IT Department'
            },
            en: {
                'nav.home': 'Home',
                'nav.it': 'Information Technology',
                'nav.production': 'Production',
                'nav.quality': 'Quality',
                'nav.hr': 'Human Resources',
                'nav.software': 'Software',
                'nav.webpage': 'Web Page',
                'nav.document': 'Document',
                'tab.all': 'All',
                'tab.it': 'Information Technology',
                'tab.production': 'Production',
                'tab.quality': 'Quality',
                'tab.hr': 'Human Resources',
                'app.software': 'Software',
                'app.webpage': 'Web Page',
                'notification.title': 'Notifications',
                'notification.viewAll': 'View all notifications',
                'copyright': '© 2024 IT Department'
            }
        };

        this.applications = [
            {
                id: 1,
                name: 'ERP System',
                description: 'Enterprise Resource Planning',
                departments: ['it', 'production'],
                category: 'software',
                iconColor: '#4c4cff'
            },
            {
                id: 2,
                name: 'CRM Platform',
                description: 'Customer Relationship Management',
                departments: ['hr', 'it'],
                category: 'software',
                iconColor: '#10b981'
            },
            {
                id: 3,
                name: 'QC Mobile',
                description: 'Quality Control App',
                departments: ['quality'],
                category: 'software',
                iconColor: '#8b5cf6'
            },
            {
                id: 4,
                name: 'Inventory System',
                description: 'Stock Management',
                departments: ['production'],
                category: 'software',
                iconColor: '#f59e0b'
            },
            {
                id: 5,
                name: 'HR Portal',
                description: 'Human Resources Management',
                departments: ['hr'],
                category: 'software',
                iconColor: '#ef4444'
            },
            {
                id: 6,
                name: 'Purchase Portal',
                description: 'Procurement System',
                departments: ['hr'],
                category: 'software',
                iconColor: '#6366f1'
            },
            {
                id: 7,
                name: 'MES System',
                description: 'Manufacturing Execution',
                departments: ['production'],
                category: 'software',
                iconColor: '#06b6d4'
            },
            {
                id: 8,
                name: 'Company Website',
                description: 'Corporate Portal',
                departments: ['it'],
                category: 'webpage',
                iconColor: '#3b82f6'
            }
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
        this.loadSavedPreferences();
        this.initializeEventListeners();
        this.renderApplications();
        this.startAnnouncementRotation();
        this.startCarousel();
        this.updateTranslations();
        
        // Initialize intersection observer for animations
        this.initializeAnimations();
    }

    loadSavedPreferences() {
        // Load saved theme
        const savedTheme = localStorage.getItem('itportal_theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            this.updateThemeIcon();
        }

        // Load saved language
        const savedLanguage = localStorage.getItem('itportal_language');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage;
            document.getElementById('languageText').textContent = this.currentLanguage.toUpperCase();
        }

        // Load saved view mode
        const savedViewMode = localStorage.getItem('itportal_viewMode');
        if (savedViewMode) {
            this.viewMode = savedViewMode;
            this.updateViewModeIcon();
        }
    }

    initializeEventListeners() {
        // Sidebar toggles
        const sidebarToggle = document.getElementById('sidebarToggle');
        const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }
        
        if (mobileSidebarToggle) {
            mobileSidebarToggle.addEventListener('click', () => this.toggleMobileSidebar());
        }
        
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', () => this.closeMobileSidebar());
        }

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
        const viewModeToggle = document.getElementById('viewModeToggle');
        if (viewModeToggle) {
            viewModeToggle.addEventListener('click', () => this.toggleViewMode());
        }

        // Notification dropdown
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationDropdown = document.getElementById('notificationDropdown');
        
        if (notificationBtn && notificationDropdown) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationDropdown.classList.toggle('show');
            });
            
            document.addEventListener('click', () => {
                notificationDropdown.classList.remove('show');
            });
            
            notificationDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Department tabs
        document.addEventListener('click', (e) => {
            if (e.target.closest('.dept-tab')) {
                const tab = e.target.closest('.dept-tab');
                const tabId = tab.getAttribute('data-tab');
                this.setDepartmentTab(tabId);
            }
        });

        // App tabs
        document.addEventListener('click', (e) => {
            if (e.target.closest('.app-tab')) {
                const tab = e.target.closest('.app-tab');
                const tabId = tab.getAttribute('data-app-tab');
                this.setAppTab(tabId);
            }
        });

        // Carousel controls
        const carouselPrev = document.getElementById('carouselPrev');
        const carouselNext = document.getElementById('carouselNext');
        
        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => this.prevSlide());
        }
        
        if (carouselNext) {
            carouselNext.addEventListener('click', () => this.nextSlide());
        }

        // Carousel indicators
        document.addEventListener('click', (e) => {
            if (e.target.closest('.indicator')) {
                const indicator = e.target.closest('.indicator');
                const slideIndex = parseInt(indicator.getAttribute('data-slide'));
                this.goToSlide(slideIndex);
            }
        });

        // Sidebar navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-link.expandable')) {
                e.preventDefault();
                const link = e.target.closest('.nav-link.expandable');
                const target = link.getAttribute('data-target');
                this.toggleSubmenu(target);
            }
        });

        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'b':
                        e.preventDefault();
                        this.toggleSidebar();
                        break;
                    case 'd':
                        e.preventDefault();
                        this.toggleTheme();
                        break;
                }
            }
        });
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('itportal_sidebarCollapsed', sidebar.classList.contains('collapsed'));
        }
    }

    toggleMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (sidebar && overlay) {
            sidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (sidebar && overlay) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
        localStorage.setItem('itportal_theme', this.currentTheme);
        this.showToast(`Đã chuyển sang chế độ ${this.currentTheme === 'light' ? 'sáng' : 'tối'}`, 'success');
    }

    updateThemeIcon() {
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            if (this.currentTheme === 'light') {
                themeIcon.innerHTML = `
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                `;
            } else {
                themeIcon.innerHTML = `
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                `;
            }
        }
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'vi' ? 'en' : 'vi';
        document.getElementById('languageText').textContent = this.currentLanguage.toUpperCase();
        this.updateTranslations();
        localStorage.setItem('itportal_language', this.currentLanguage);
        this.showToast(`Language changed to ${this.currentLanguage.toUpperCase()}`, 'success');
    }

    toggleViewMode() {
        this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
        this.updateViewModeIcon();
        this.renderApplications();
        localStorage.setItem('itportal_viewMode', this.viewMode);
    }

    updateViewModeIcon() {
        const viewModeIcon = document.getElementById('viewModeIcon');
        if (viewModeIcon) {
            if (this.viewMode === 'grid') {
                viewModeIcon.innerHTML = `
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                `;
            } else {
                viewModeIcon.innerHTML = `
                    <line x1="8" y1="6" x2="21" y2="6"/>
                    <line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/>
                    <line x1="3" y1="18" x2="3.01" y2="18"/>
                `;
            }
        }
    }

    setDepartmentTab(tabId) {
        this.currentDeptTab = tabId;
        
        // Update active tab
        document.querySelectorAll('.dept-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        this.renderApplications();
    }

    setAppTab(tabId) {
        this.currentAppTab = tabId;
        
        // Update active tab
        document.querySelectorAll('.app-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-app-tab="${tabId}"]`).classList.add('active');
        
        this.renderApplications();
    }

    renderApplications() {
        const container = document.getElementById('applicationsGrid');
        if (!container) return;

        // Filter applications
        const filteredApps = this.applications.filter(app => {
            const matchesDept = this.currentDeptTab === 'all' || app.departments.includes(this.currentDeptTab);
            const matchesAppTab = app.category === this.currentAppTab;
            return matchesDept && matchesAppTab;
        });

        // Update view mode class
        container.className = `applications-grid ${this.viewMode === 'list' ? 'list-view' : ''}`;

        // Render applications
        container.innerHTML = filteredApps.map(app => {
            const isFavorited = this.favorites.includes(app.id);
            
            if (this.viewMode === 'list') {
                return `
                    <div class="app-card" data-app-id="${app.id}">
                        <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" onclick="itPortal.toggleFavorite(${app.id})">
                            <svg viewBox="0 0 24 24" fill="${isFavorited ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                            </svg>
                        </button>
                        <div class="app-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="${app.iconColor}" stroke-width="2">
                                <rect x="4" y="4" width="16" height="12" rx="2"/>
                                <path d="M8 12h.01"/>
                                <path d="M16 12h.01"/>
                                <path d="M12 12h.01"/>
                            </svg>
                        </div>
                        <div class="app-content">
                            <h6>${app.name}</h6>
                            <p>${app.description}</p>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="app-card" data-app-id="${app.id}">
                        <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" onclick="itPortal.toggleFavorite(${app.id})">
                            <svg viewBox="0 0 24 24" fill="${isFavorited ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                            </svg>
                        </button>
                        <div class="app-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="${app.iconColor}" stroke-width="2">
                                <rect x="4" y="4" width="16" height="12" rx="2"/>
                                <path d="M8 12h.01"/>
                                <path d="M16 12h.01"/>
                                <path d="M12 12h.01"/>
                            </svg>
                        </div>
                        <h6>${app.name}</h6>
                        <p>${app.description}</p>
                    </div>
                `;
            }
        }).join('');

        // Add click handlers for app cards
        container.querySelectorAll('.app-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.favorite-btn')) {
                    const appId = parseInt(card.getAttribute('data-app-id'));
                    this.openApplication(appId);
                }
            });
        });
    }

    toggleFavorite(appId) {
        const index = this.favorites.indexOf(appId);
        if (index > -1) {
            this.favorites.splice(index, 1);
            this.showToast('Đã xóa khỏi danh sách yêu thích', 'success');
        } else {
            this.favorites.push(appId);
            this.showToast('Đã thêm vào danh sách yêu thích', 'success');
        }
        
        localStorage.setItem('itportal_favorites', JSON.stringify(this.favorites));
        this.renderApplications();
    }

    openApplication(appId) {
        const app = this.applications.find(a => a.id === appId);
        if (app) {
            this.showToast(`Đang mở ${app.name}...`, 'info');
            // Simulate opening application
            setTimeout(() => {
                this.showToast(`${app.name} đã được mở`, 'success');
            }, 1000);
        }
    }

    // Carousel functionality
    startCarousel() {
        setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    updateCarousel() {
        const track = document.getElementById('carouselTrack');
        const indicators = document.querySelectorAll('.indicator');
        
        if (track) {
            track.style.transform = `translateX(-${this.currentSlide * 33.333}%)`;
        }
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    // Announcement rotation
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
        }, 8000);
    }

    // Submenu toggle
    toggleSubmenu(targetId) {
        const submenu = document.getElementById(targetId);
        const link = document.querySelector(`[data-target="${targetId}"]`);
        
        if (submenu && link) {
            const isExpanded = submenu.classList.contains('expanded');
            
            // Close all other submenus
            document.querySelectorAll('.nav-submenu').forEach(menu => {
                menu.classList.remove('expanded');
            });
            document.querySelectorAll('.nav-link.expandable').forEach(navLink => {
                navLink.classList.remove('expanded');
            });
            
            if (!isExpanded) {
                submenu.classList.add('expanded');
                link.classList.add('expanded');
            }
        }
    }

    // Translation helper
    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    updateTranslations() {
        // Update navigation texts
        const navTexts = document.querySelectorAll('[data-translate]');
        navTexts.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.t(key);
            if (translation !== key) {
                element.textContent = translation;
            }
        });
    }

    // Animation observer
    initializeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, observerOptions);

        // Observe animated elements
        document.querySelectorAll('.hero-section, .tab-navigation-section, .stats-section').forEach(el => {
            observer.observe(el);
        });
    }

    // Responsive handler
    handleResize() {
        const isMobile = window.innerWidth < 1024;
        
        if (isMobile) {
            this.closeMobileSidebar();
        }
    }

    // Toast notifications
    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toastId = 'toast-' + Date.now();
        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">
                    ${this.getToastIcon(type)}
                </div>
                <div class="toast-message">${message}</div>
                <button class="toast-close" onclick="itPortal.closeToast('${toastId}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            this.closeToast(toastId);
        }, 3000);
    }

    getToastIcon(type) {
        switch (type) {
            case 'success':
                return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>`;
            case 'error':
                return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>`;
            case 'info':
                return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                </svg>`;
            default:
                return '';
        }
    }

    closeToast(toastId) {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }
}

// Global functions for onclick handlers
window.itPortal = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.itPortal = new ITPortal();
});

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast {
        margin-bottom: 0.5rem;
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .toast-icon {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
    }
    
    .toast-icon svg {
        width: 100%;
        height: 100%;
    }
    
    .toast.success .toast-icon {
        color: #10b981;
    }
    
    .toast.error .toast-icon {
        color: #ef4444;
    }
    
    .toast.info .toast-icon {
        color: #06b6d4;
    }
    
    .toast-message {
        flex: 1;
        font-weight: 500;
        color: var(--text-primary);
    }
    
    .toast-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: background-color 0.2s;
        color: var(--text-muted);
    }
    
    .toast-close:hover {
        background: rgba(0, 0, 0, 0.1);
        color: var(--text-primary);
    }
    
    .toast-close svg {
        width: 16px;
        height: 16px;
    }
`;

document.head.appendChild(style);
