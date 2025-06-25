
// IT Portal - Complete JavaScript with Enhanced Features
class ITPortal {
    constructor() {
        this.applications = [];
        this.favorites = [];
        this.recent = [];
        this.currentLanguage = 'en';
        this.currentTheme = 'light';
        this.searchTimeout = null;
        this.currentViewMode = 'grid';
        
        this.init();
    }

    init() {
        this.loadApplications();
        this.loadSettings();
        this.setupEventListeners();
        this.initializeCharts();
        this.hideLoadingScreen();
        this.setupSidebar();
    }

    setupSidebar() {
        // Sidebar toggle functionality
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                if (window.innerWidth >= 992) {
                    // For desktop, toggle main content margin
                    const mainContent = document.querySelector('.main-content');
                    const isCollapsed = mainContent.style.marginLeft === '0px';
                    
                    if (isCollapsed) {
                        mainContent.style.marginLeft = 'var(--sidebar-width)';
                        sidebarToggle.innerHTML = '<i class="bi bi-arrow-left-circle"></i><span>Collapse</span>';
                    } else {
                        mainContent.style.marginLeft = '0';
                        sidebarToggle.innerHTML = '<i class="bi bi-arrow-right-circle"></i><span>Expand</span>';
                    }
                }
            });
        }

        // Setup sidebar navigation
        this.setupSidebarNavigation();
    }

    setupSidebarNavigation() {
        // Handle navigation link clicks
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                if (!link.classList.contains('dropdown-toggle')) {
                    link.classList.add('active');
                }
                
                // Handle dropdown toggles
                if (link.classList.contains('dropdown-toggle')) {
                    e.preventDefault();
                    const target = link.getAttribute('data-bs-target');
                    const submenu = document.querySelector(target);
                    const chevron = link.querySelector('.bi-chevron-down');
                    
                    if (submenu && chevron) {
                        const isExpanded = link.getAttribute('aria-expanded') === 'true';
                        link.setAttribute('aria-expanded', !isExpanded);
                        
                        if (isExpanded) {
                            submenu.classList.remove('show');
                            chevron.style.transform = 'rotate(0deg)';
                        } else {
                            submenu.classList.add('show');
                            chevron.style.transform = 'rotate(180deg)';
                        }
                    }
                }
            });
        });

        // Handle submenu link clicks
        const subLinks = document.querySelectorAll('.nav-link-sub');
        subLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all nav links
                navLinks.forEach(l => l.classList.remove('active'));
                subLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked submenu link
                link.classList.add('active');
                
                // Also add active class to parent dropdown
                const parentDropdown = link.closest('.dropdown-nav').querySelector('.dropdown-toggle');
                if (parentDropdown) {
                    parentDropdown.classList.add('active');
                }
                
                this.showToast('Navigation', `Navigated to ${link.textContent.trim()}`, 'info');
            });
        });
    }

    loadApplications() {
        // Sample application data with categories
        this.applications = [
            // IT Applications
            { id: 1, name: 'Visual Studio Code', description: 'Code editor with debugging support', icon: 'bi-code-slash', color: 'text-blue-500', category: 'productivity', type: 'IT' },
            { id: 2, name: 'GitHub Desktop', description: 'Git repository management', icon: 'bi-github', color: 'text-purple-500', category: 'productivity', type: 'IT' },
            { id: 3, name: 'Docker Desktop', description: 'Container platform', icon: 'bi-boxes', color: 'text-blue-500', category: 'productivity', type: 'IT' },
            { id: 4, name: 'Postman', description: 'API development environment', icon: 'bi-send', color: 'text-orange-500', category: 'productivity', type: 'IT' },
            
            // Production Applications  
            { id: 5, name: 'Production Monitor', description: 'Real-time production monitoring', icon: 'bi-speedometer2', color: 'text-green-500', category: 'productivity', type: 'Production' },
            { id: 6, name: 'Quality Control', description: 'Quality assurance system', icon: 'bi-check-circle', color: 'text-success', category: 'productivity', type: 'Quality' },
            { id: 7, name: 'Inventory Manager', description: 'Stock management system', icon: 'bi-box-seam', color: 'text-indigo-500', category: 'productivity', type: 'Inventory' },
            { id: 8, name: 'HR Portal', description: 'Human resources management', icon: 'bi-people', color: 'text-orange-500', category: 'productivity', type: 'HR' },
            
            // Additional Applications
            { id: 9, name: 'Adobe Photoshop', description: 'Image editing software', icon: 'bi-image', color: 'text-blue-600', category: 'creative', type: 'IT' },
            { id: 10, name: 'Slack', description: 'Team communication', icon: 'bi-chat-dots', color: 'text-purple-600', category: 'communication', type: 'IT' },
            { id: 11, name: 'Figma', description: 'Design collaboration tool', icon: 'bi-palette', color: 'text-pink-500', category: 'creative', type: 'IT' },
            { id: 12, name: 'Microsoft Excel', description: 'Spreadsheet application', icon: 'bi-table', color: 'text-green-600', category: 'productivity', type: 'IT' },
            { id: 13, name: 'Chrome Browser', description: 'Web browser', icon: 'bi-globe', color: 'text-blue-500', category: 'productivity', type: 'IT' },
            { id: 14, name: 'Zoom', description: 'Video conferencing', icon: 'bi-camera-video', color: 'text-blue-500', category: 'communication', type: 'IT' },
            { id: 15, name: 'Notion', description: 'Workspace and note-taking', icon: 'bi-journal-text', color: 'text-gray-600', category: 'productivity', type: 'IT' },
            { id: 16, name: 'Spotify', description: 'Music streaming', icon: 'bi-music-note-beamed', color: 'text-green-500', category: 'entertainment', type: 'IT' },
            { id: 17, name: 'Trello', description: 'Project management', icon: 'bi-kanban', color: 'text-blue-600', category: 'productivity', type: 'IT' },
            { id: 18, name: 'Discord', description: 'Voice and text chat', icon: 'bi-discord', color: 'text-indigo-500', category: 'communication', type: 'IT' },
            { id: 19, name: 'Calculator', description: 'Basic calculator', icon: 'bi-calculator', color: 'text-gray-600', category: 'utility', type: 'IT' },
            { id: 20, name: 'Terminal', description: 'Command line interface', icon: 'bi-terminal', color: 'text-dark', category: 'utility', type: 'IT' },
            { id: 21, name: 'File Manager', description: 'File system explorer', icon: 'bi-folder', color: 'text-yellow-600', category: 'utility', type: 'IT' },
            { id: 22, name: 'Calendar', description: 'Schedule management', icon: 'bi-calendar', color: 'text-red-500', category: 'productivity', type: 'IT' },
            { id: 23, name: 'Notes', description: 'Quick note taking', icon: 'bi-sticky', color: 'text-yellow-500', category: 'productivity', type: 'IT' },
            { id: 24, name: 'Settings', description: 'System preferences', icon: 'bi-gear', color: 'text-gray-500', category: 'utility', type: 'IT' }
        ];

        // Set some applications as recent
        this.recent = this.applications.slice(0, 8);
        
        this.renderApplications();
    }

    loadSettings() {
        // Load theme
        const savedTheme = localStorage.getItem('itportal-theme') || 'light';
        this.setTheme(savedTheme);
        
        // Load language
        const savedLanguage = localStorage.getItem('itportal-language') || 'en';
        this.setLanguage(savedLanguage);
        
        // Load favorites
        const savedFavorites = localStorage.getItem('itportal-favorites');
        if (savedFavorites) {
            this.favorites = JSON.parse(savedFavorites);
        }
        
        // Load view mode
        const savedViewMode = localStorage.getItem('itportal-viewmode') || 'grid';
        this.setViewMode(savedViewMode);
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Language toggle
        const languageLinks = document.querySelectorAll('[data-lang]');
        languageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.setLanguage(link.getAttribute('data-lang'));
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('focus', () => this.showSearchResults());
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) {
                    this.hideSearchResults();
                }
            });
        }

        // Tab switching
        const tabButtons = document.querySelectorAll('#appTabs button[data-bs-toggle="pill"]');
        tabButtons.forEach(button => {
            button.addEventListener('shown.bs.tab', (e) => {
                this.handleTabSwitch(e.target.getAttribute('data-bs-target').replace('#', ''));
            });
        });

        // View mode toggle
        const viewModeInputs = document.querySelectorAll('input[name="viewMode"]');
        viewModeInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.setViewMode(e.target.id.replace('View', ''));
                }
            });
        });

        // Hero carousel auto-scroll on hover pause
        const heroCarousel = document.getElementById('heroCarousel');
        if (heroCarousel) {
            heroCarousel.addEventListener('mouseenter', () => {
                const carousel = bootstrap.Carousel.getInstance(heroCarousel);
                if (carousel) carousel.pause();
            });
            
            heroCarousel.addEventListener('mouseleave', () => {
                const carousel = bootstrap.Carousel.getInstance(heroCarousel);
                if (carousel) carousel.cycle();
            });
        }
    }

    initializeCharts() {
        // Usage Analytics Chart
        const usageCtx = document.getElementById('usageChart');
        if (usageCtx) {
            new Chart(usageCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Application Usage',
                        data: [65, 78, 90, 81, 88, 95, 85],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Performance Chart
        const performanceCtx = document.getElementById('performanceChart');
        if (performanceCtx) {
            new Chart(performanceCtx, {
                type: 'doughnut',
                data: {
                    labels: ['CPU', 'Memory', 'Storage', 'Network'],
                    datasets: [{
                        data: [65, 45, 80, 30],
                        backgroundColor: [
                            '#3b82f6',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
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
        }, 1500);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-bs-theme', theme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'light' ? 'bi bi-moon-stars fs-5' : 'bi bi-sun fs-5';
        }
        
        localStorage.setItem('itportal-theme', theme);
        this.showToast('Theme', `Switched to ${theme} mode`, 'info');
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('itportal-language', lang);
        
        // Update UI text based on language
        this.updateLanguageTexts();
        this.showToast('Language', `Language changed to ${lang === 'en' ? 'English' : 'Tiếng Việt'}`, 'info');
    }

    updateLanguageTexts() {
        const translations = {
            en: {
                'IT Portal': 'IT Portal',
                'Management System': 'Management System',
                'Navigation': 'Navigation',
                'IT': 'IT',
                'Production': 'Production',
                'Quality': 'Quality',
                'HR': 'HR',
                'Inventory': 'Inventory',
                'Purchase': 'Purchase',
                'Component Library': 'Component Library',
                'All': 'All',
                'Favorites': 'Favorites',
                'Recent': 'Recent',
                'Productivity': 'Productivity',
                'Applications': 'Applications'
            },
            vi: {
                'IT Portal': 'Cổng IT',
                'Management System': 'Hệ thống Quản lý',
                'Navigation': 'Điều hướng',
                'IT': 'CNTT',
                'Production': 'Sản xuất',
                'Quality': 'Chất lượng',
                'HR': 'Nhân sự',
                'Inventory': 'Kho bãi',
                'Purchase': 'Mua hàng',
                'Component Library': 'Thư viện Thành phần',
                'All': 'Tất cả',
                'Favorites': 'Yêu thích',
                'Recent': 'Gần đây',
                'Productivity': 'Năng suất',
                'Applications': 'Ứng dụng'
            }
        };

        const texts = translations[this.currentLanguage];
        
        // Update specific elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (texts[key]) {
                element.textContent = texts[key];
            }
        });
    }

    handleSearch(query) {
        clearTimeout(this.searchTimeout);
        
        if (query.length < 2) {
            this.hideSearchResults();
            return;
        }

        this.searchTimeout = setTimeout(() => {
            const results = this.applications.filter(app => 
                app.name.toLowerCase().includes(query.toLowerCase()) ||
                app.description.toLowerCase().includes(query.toLowerCase())
            );
            
            this.showSearchResults(results);
        }, 300);
    }

    showSearchResults(results = []) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="p-3 text-muted">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(app => `
                <div class="search-result-item" data-app-id="${app.id}">
                    <div class="d-flex align-items-center gap-3">
                        <i class="${app.icon} ${app.color}"></i>
                        <div>
                            <div class="fw-medium">${app.name}</div>
                            <small class="text-muted">${app.description}</small>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Add click handlers to search results
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const appId = parseInt(item.getAttribute('data-app-id'));
                    this.launchApplication(appId);
                    this.hideSearchResults();
                });
            });
        }
        
        searchResults.classList.add('show');
    }

    hideSearchResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.classList.remove('show');
        }
    }

    handleTabSwitch(tabId) {
        let appsToShow = [];
        
        switch(tabId) {
            case 'all':
                appsToShow = this.applications;
                break;
            case 'favorites':
                appsToShow = this.applications.filter(app => this.favorites.includes(app.id));
                break;
            case 'recent':
                appsToShow = this.recent;
                break;
            case 'productivity':
                appsToShow = this.applications.filter(app => app.category === 'productivity');
                break;
        }
        
        this.renderApplications(appsToShow, tabId);
    }

    setViewMode(mode) {
        this.currentViewMode = mode;
        localStorage.setItem('itportal-viewmode', mode);
        
        // Update the radio buttons
        document.getElementById(mode + 'View').checked = true;
        
        // Re-render applications with new view mode
        this.renderApplications();
    }

    renderApplications(apps = this.applications, containerId = 'applicationsGrid') {
        const container = document.getElementById(containerId === 'all' ? 'applicationsGrid' : containerId + 'Grid');
        if (!container) return;

        if (apps.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-inbox display-1 text-muted"></i>
                    <h4 class="text-muted mt-3">No applications found</h4>
                    <p class="text-muted">Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        if (this.currentViewMode === 'grid') {
            container.innerHTML = apps.map(app => this.createAppCard(app)).join('');
        } else {
            container.innerHTML = apps.map(app => this.createAppListItem(app)).join('');
        }

        // Add event listeners to favorite buttons and app cards
        this.setupAppInteractions(container);
    }

    createAppCard(app) {
        const isFavorited = this.favorites.includes(app.id);
        
        return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card glass-card app-card h-100" data-app-id="${app.id}">
                    <button class="btn favorite-btn ${isFavorited ? 'favorited' : ''}" data-app-id="${app.id}">
                        <i class="bi ${isFavorited ? 'bi-star-fill' : 'bi-star'}"></i>
                    </button>
                    <div class="card-body text-center">
                        <div class="app-icon mx-auto">
                            <i class="${app.icon} ${app.color}"></i>
                        </div>
                        <h6 class="card-title fw-bold">${app.name}</h6>
                        <p class="card-text text-muted small">${app.description}</p>
                        <span class="badge bg-primary bg-opacity-10 text-primary">${app.type}</span>
                    </div>
                </div>
            </div>
        `;
    }

    createAppListItem(app) {
        const isFavorited = this.favorites.includes(app.id);
        
        return `
            <div class="col-12 mb-3">
                <div class="card glass-card app-card-list" data-app-id="${app.id}">
                    <div class="d-flex align-items-center">
                        <div class="p-3">
                            <i class="${app.icon} ${app.color} fs-3"></i>
                        </div>
                        <div class="flex-grow-1 p-3">
                            <h6 class="mb-1 fw-bold">${app.name}</h6>
                            <p class="mb-1 text-muted small">${app.description}</p>
                            <span class="badge bg-primary bg-opacity-10 text-primary">${app.type}</span>
                        </div>
                        <div class="p-3">
                            <button class="btn favorite-btn ${isFavorited ? 'favorited' : ''}" data-app-id="${app.id}">
                                <i class="bi ${isFavorited ? 'bi-star-fill' : 'bi-star'}"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupAppInteractions(container) {
        // App card clicks
        container.querySelectorAll('.app-card, .app-card-list').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.favorite-btn')) {
                    const appId = parseInt(card.getAttribute('data-app-id'));
                    this.launchApplication(appId);
                }
            });
        });

        // Favorite button clicks
        container.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const appId = parseInt(btn.getAttribute('data-app-id'));
                this.toggleFavorite(appId);
            });
        });
    }

    launchApplication(appId) {
        const app = this.applications.find(a => a.id === appId);
        if (!app) return;

        // Add to recent if not already there
        if (!this.recent.find(a => a.id === appId)) {
            this.recent.unshift(app);
            this.recent = this.recent.slice(0, 8); // Keep only 8 recent items
        }

        // Show loading toast
        this.showToast('Launching', `Opening ${app.name}...`, 'info');
        
        // Simulate app launch
        setTimeout(() => {
            this.showToast('Success', `${app.name} launched successfully!`, 'success');
        }, 1500);
    }

    toggleFavorite(appId) {
        const index = this.favorites.indexOf(appId);
        const app = this.applications.find(a => a.id === appId);
        
        if (index === -1) {
            this.favorites.push(appId);
            this.showToast('Favorite Added', `${app.name} added to favorites`, 'success');
        } else {
            this.favorites.splice(index, 1);
            this.showToast('Favorite Removed', `${app.name} removed from favorites`, 'info');
        }
        
        localStorage.setItem('itportal-favorites', JSON.stringify(this.favorites));
        
        // Update UI
        this.updateFavoriteButtons();
        
        // If currently showing favorites tab, re-render
        const activeTab = document.querySelector('#appTabs .nav-link.active');
        if (activeTab && activeTab.id === 'favorites-tab') {
            this.handleTabSwitch('favorites');
        }
    }

    updateFavoriteButtons() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const appId = parseInt(btn.getAttribute('data-app-id'));
            const isFavorited = this.favorites.includes(appId);
            const icon = btn.querySelector('i');
            
            btn.classList.toggle('favorited', isFavorited);
            icon.className = `bi ${isFavorited ? 'bi-star-fill' : 'bi-star'}`;
        });
    }

    showToast(title, message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toastId = 'toast-' + Date.now();
        const iconClass = {
            success: 'bi-check-circle-fill text-success',
            error: 'bi-exclamation-triangle-fill text-danger',
            warning: 'bi-exclamation-triangle-fill text-warning',
            info: 'bi-info-circle-fill text-info'
        }[type] || 'bi-info-circle-fill text-info';

        const toastHTML = `
            <div id="${toastId}" class="toast align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body d-flex align-items-center gap-2">
                        <i class="${iconClass}"></i>
                        <div>
                            <div class="fw-bold">${title}</div>
                            <div class="text-muted small">${message}</div>
                        </div>
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
        
        // Remove toast element after it's hidden
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }
}

// Initialize the portal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ITPortal();
});

// Prevent context menu on production
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput && document.activeElement === searchInput) {
            searchInput.blur();
        }
    }
});
