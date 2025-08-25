/* ============================================
   PORTAL DASHBOARD - JAVASCRIPT FUNCTIONALITY
   Built with vanilla JavaScript and Bootstrap 5.3
============================================ */

// ============================================
// GLOBAL VARIABLES & CONFIGURATION
// ============================================

const PortalApp = {
    // Application state
    state: {
        tasks: [],
        announcements: [],
        documents: [],
        events: [],
        filters: {
            announcements: 'all',
            tasks: 'all'
        }
    },
    
    // Configuration
    config: {
        autoRefresh: true,
        refreshInterval: 60000, // 1 minute
        animationDuration: 300
    },
    
    // Cache for DOM elements
    elements: {}
};

// ============================================
// INITIALIZATION & DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portal Dashboard initializing...');
    
    // Initialize application
    PortalApp.init();
    
    // Setup event listeners
    PortalApp.setupEventListeners();
    
    // Load initial data
    PortalApp.loadInitialData();
    
    // Setup auto-refresh if enabled
    if (PortalApp.config.autoRefresh) {
        PortalApp.setupAutoRefresh();
    }
    
    console.log('Portal Dashboard initialized successfully!');
});

// ============================================
// APPLICATION INITIALIZATION
// ============================================

PortalApp.init = function() {
    // Cache frequently used DOM elements
    this.cacheElements();
    
    // Initialize Bootstrap components
    this.initializeBootstrapComponents();
    
    // Setup theme handling
    this.setupTheme();
    
    // Initialize tooltips
    this.initializeTooltips();
};

PortalApp.cacheElements = function() {
    this.elements = {
        // Header elements
        sidebarToggle: document.getElementById('sidebarToggle'),
        
        // Task elements
        taskList: document.querySelector('.task-list'),
        taskItems: document.querySelectorAll('.task-item input[type="checkbox"]'),
        
        // Quick links
        quickLinkItems: document.querySelectorAll('.quick-link-item'),
        
        // Documents
        documentItems: document.querySelectorAll('.document-item'),
        
        // Announcements
        announcementItems: document.querySelectorAll('.announcement-item'),
        
        // Calendar
        calendarDays: document.querySelectorAll('.mini-calendar .row > div:not(.text-muted)'),
        eventItems: document.querySelectorAll('.event-item')
    };
};

PortalApp.initializeBootstrapComponents = function() {
    // Initialize all tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize dropdowns
    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl);
    });
};

PortalApp.setupTheme = function() {
    // Auto-detect system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.classList.add('dark-theme');
    }
    
    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });
};

PortalApp.initializeTooltips = function() {
    // Add tooltips to specific elements
    const tooltipElements = [
        { selector: '.quick-link-item', title: 'Click để truy cập nhanh' },
        { selector: '.document-item', title: 'Click để xem tài liệu' },
        { selector: '.task-item', title: 'Click để cập nhật trạng thái' }
    ];
    
    tooltipElements.forEach(item => {
        document.querySelectorAll(item.selector).forEach(el => {
            el.setAttribute('data-bs-toggle', 'tooltip');
            el.setAttribute('title', item.title);
            new bootstrap.Tooltip(el);
        });
    });
};

// ============================================
// EVENT LISTENERS SETUP
// ============================================

PortalApp.setupEventListeners = function() {
    // Sidebar toggle functionality
    if (this.elements.sidebarToggle) {
        this.elements.sidebarToggle.addEventListener('click', this.toggleSidebar);
    }
    
    // Task management
    this.setupTaskListeners();
    
    // Quick links functionality
    this.setupQuickLinkListeners();
    
    // Document interactions
    this.setupDocumentListeners();
    
    // Announcement interactions
    this.setupAnnouncementListeners();
    
    // Calendar interactions
    this.setupCalendarListeners();
    
    // Search functionality
    this.setupSearchListeners();
    
    // Keyboard shortcuts
    this.setupKeyboardShortcuts();
};

// ============================================
// TASK MANAGEMENT FUNCTIONALITY
// ============================================

PortalApp.setupTaskListeners = function() {
    // Task checkbox change events
    this.elements.taskItems.forEach(checkbox => {
        checkbox.addEventListener('change', function(e) {
            PortalApp.toggleTask(e.target);
        });
    });
    
    // Add new task button
    const addTaskBtn = document.querySelector('.btn-outline-primary[data-action="add-task"]');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', this.showAddTaskModal);
    }
};

PortalApp.toggleTask = function(checkbox) {
    const taskItem = checkbox.closest('.task-item');
    const label = taskItem.querySelector('label');
    const badge = taskItem.querySelector('.badge');
    
    if (checkbox.checked) {
        // Mark as completed
        label.classList.add('text-decoration-line-through', 'text-muted');
        badge.textContent = 'Xong';
        badge.className = 'badge bg-success';
        
        // Add completion animation
        taskItem.style.animation = 'slideUp 0.3s ease-out';
        
        // Show success toast
        this.showToast('Đã hoàn thành công việc!', 'success');
    } else {
        // Mark as incomplete
        label.classList.remove('text-decoration-line-through', 'text-muted');
        badge.textContent = 'Đang thực hiện';
        badge.className = 'badge bg-warning';
        
        this.showToast('Đã cập nhật trạng thái công việc', 'info');
    }
    
    // Update task count
    this.updateTaskCount();
};

PortalApp.updateTaskCount = function() {
    const completedTasks = document.querySelectorAll('.task-item input[type="checkbox"]:checked').length;
    const totalTasks = document.querySelectorAll('.task-item input[type="checkbox"]').length;
    const pendingTasks = totalTasks - completedTasks;
    
    const taskBadge = document.querySelector('.card-title .badge');
    if (taskBadge) {
        taskBadge.textContent = pendingTasks;
        taskBadge.className = pendingTasks > 0 ? 'badge bg-primary' : 'badge bg-success';
    }
};

// ============================================
// QUICK LINKS FUNCTIONALITY
// ============================================

PortalApp.setupQuickLinkListeners = function() {
    this.elements.quickLinkItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            PortalApp.handleQuickLinkClick(this);
        });
    });
};

PortalApp.handleQuickLinkClick = function(linkElement) {
    const title = linkElement.querySelector('h6').textContent;
    
    // Add click animation
    linkElement.style.transform = 'translateX(10px)';
    setTimeout(() => {
        linkElement.style.transform = '';
    }, 200);
    
    // Show action toast
    this.showToast(`Đang chuyển hướng đến ${title}`, 'info');
    
    // Simulate navigation delay
    setTimeout(() => {
        console.log(`Navigating to: ${title}`);
        // Here you would implement actual navigation
    }, 500);
};

// ============================================
// DOCUMENT MANAGEMENT FUNCTIONALITY
// ============================================

PortalApp.setupDocumentListeners = function() {
    this.elements.documentItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            PortalApp.handleDocumentClick(this);
        });
        
        // Heart icon toggle
        const heartIcon = item.querySelector('.bi-heart-fill');
        if (heartIcon) {
            heartIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                PortalApp.toggleDocumentFavorite(this);
            });
        }
    });
};

PortalApp.handleDocumentClick = function(documentElement) {
    const title = documentElement.querySelector('h6').textContent;
    
    // Add loading state
    documentElement.classList.add('loading');
    
    // Simulate document loading
    setTimeout(() => {
        documentElement.classList.remove('loading');
        this.showToast(`Đang mở tài liệu: ${title}`, 'info');
        console.log(`Opening document: ${title}`);
    }, 800);
};

PortalApp.toggleDocumentFavorite = function(heartIcon) {
    heartIcon.classList.toggle('text-danger');
    heartIcon.classList.toggle('text-muted');
    
    const isFavorited = heartIcon.classList.contains('text-danger');
    const message = isFavorited ? 'Đã thêm vào yêu thích' : 'Đã bỏ khỏi yêu thích';
    
    this.showToast(message, isFavorited ? 'success' : 'info');
};

// ============================================
// ANNOUNCEMENTS FUNCTIONALITY
// ============================================

PortalApp.setupAnnouncementListeners = function() {
    this.elements.announcementItems.forEach(item => {
        item.addEventListener('click', function(e) {
            PortalApp.handleAnnouncementClick(this);
        });
    });
};

PortalApp.handleAnnouncementClick = function(announcementElement) {
    const title = announcementElement.querySelector('h6').textContent;
    
    // Mark as read (visual indicator)
    announcementElement.style.opacity = '0.8';
    
    this.showToast(`Đang xem: ${title}`, 'info');
    console.log(`Reading announcement: ${title}`);
};

// ============================================
// CALENDAR FUNCTIONALITY
// ============================================

PortalApp.setupCalendarListeners = function() {
    // Calendar day clicks
    this.elements.calendarDays.forEach(day => {
        day.addEventListener('click', function(e) {
            PortalApp.handleCalendarDayClick(this);
        });
    });
    
    // Event item clicks
    this.elements.eventItems.forEach(event => {
        event.addEventListener('click', function(e) {
            PortalApp.handleEventClick(this);
        });
    });
};

PortalApp.handleCalendarDayClick = function(dayElement) {
    // Remove previous selection
    document.querySelectorAll('.mini-calendar .bg-primary').forEach(el => {
        el.classList.remove('bg-primary', 'text-white');
    });
    
    // Add selection to clicked day
    dayElement.classList.add('bg-primary', 'text-white');
    
    const day = dayElement.textContent;
    this.showToast(`Đã chọn ngày ${day}`, 'info');
};

PortalApp.handleEventClick = function(eventElement) {
    const title = eventElement.querySelector('h6').textContent;
    const time = eventElement.querySelector('small').textContent;
    
    this.showToast(`Sự kiện: ${title} - ${time}`, 'info');
};

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

PortalApp.setupSearchListeners = function() {
    const searchInputs = document.querySelectorAll('input[type="search"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            PortalApp.handleSearch(e.target.value, e.target);
        });
    });
};

PortalApp.handleSearch = function(query, inputElement) {
    if (query.length < 2) return;
    
    // Simulate search functionality
    console.log(`Searching for: ${query}`);
    
    // Add search animation to input
    inputElement.style.borderColor = '#0d6efd';
    setTimeout(() => {
        inputElement.style.borderColor = '';
    }, 1000);
};

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

PortalApp.setupKeyboardShortcuts = function() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
                PortalApp.showToast('Chế độ tìm kiếm được kích hoạt', 'info');
            }
        }
        
        // Ctrl/Cmd + N for new task
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            PortalApp.showAddTaskModal();
        }
        
        // ESC to clear focus
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

PortalApp.showToast = function(message, type = 'info') {
    // Create toast element
    const toastContainer = this.getOrCreateToastContainer();
    
    const toastId = 'toast-' + Date.now();
    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-bg-${type} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    // Initialize and show toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });
    
    toast.show();
    
    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
};

PortalApp.getOrCreateToastContainer = function() {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        container.style.zIndex = '1055';
        document.body.appendChild(container);
    }
    return container;
};

PortalApp.showAddTaskModal = function() {
    // Create simple prompt for demo
    const taskTitle = prompt('Nhập tên công việc mới:');
    if (taskTitle && taskTitle.trim()) {
        PortalApp.addNewTask(taskTitle.trim());
    }
};

PortalApp.addNewTask = function(title) {
    const taskList = document.querySelector('.task-list');
    const taskId = 'task-' + Date.now();
    
    const taskHtml = `
        <div class="task-item d-flex align-items-center p-2 rounded mb-2">
            <input type="checkbox" class="form-check-input me-3" id="${taskId}">
            <div class="flex-grow-1">
                <label for="${taskId}" class="form-check-label fw-medium">
                    ${title}
                </label>
                <div class="small text-muted">Vừa tạo</div>
            </div>
            <span class="badge bg-info">Mới</span>
        </div>
    `;
    
    taskList.insertAdjacentHTML('beforeend', taskHtml);
    
    // Setup event listener for new task
    const newTaskCheckbox = document.getElementById(taskId);
    newTaskCheckbox.addEventListener('change', function(e) {
        PortalApp.toggleTask(e.target);
    });
    
    // Update task count
    this.updateTaskCount();
    
    this.showToast(`Đã thêm công việc: ${title}`, 'success');
};

PortalApp.toggleSidebar = function() {
    // This would integrate with your sidebar component
    console.log('Toggling sidebar...');
    PortalApp.showToast('Chức năng sidebar đang được phát triển', 'info');
};

// ============================================
// DATA LOADING & AUTO-REFRESH
// ============================================

PortalApp.loadInitialData = function() {
    // Simulate loading data from API
    console.log('Loading initial data...');
    
    // Initialize task count
    this.updateTaskCount();
    
    // Add fade-in animation to cards
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
};

PortalApp.setupAutoRefresh = function() {
    setInterval(() => {
        console.log('Auto-refreshing data...');
        // Here you would fetch updated data from your API
        this.refreshData();
    }, this.config.refreshInterval);
};

PortalApp.refreshData = function() {
    // Simulate data refresh
    const timestamp = new Date().toLocaleTimeString();
    console.log(`Data refreshed at ${timestamp}`);
    
    // You could update timestamps, counts, etc. here
    // this.updateTaskCount();
    // this.updateAnnouncementCount();
};

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', function(e) {
    console.error('Portal Dashboard Error:', e.error);
    PortalApp.showToast('Đã xảy ra lỗi. Vui lòng thử lại.', 'danger');
});

// ============================================
// EXPORT FOR DEBUGGING (Development only)
// ============================================

if (typeof window !== 'undefined') {
    window.PortalApp = PortalApp;
}