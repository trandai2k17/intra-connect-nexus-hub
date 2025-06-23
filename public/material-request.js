
// Language data
const translations = {
    vi: {
        'main-title': 'Online Material Request',
        'main-subtitle': 'Hệ thống yêu cầu nguyên vật liệu trực tuyến',
        'login-title': 'Đăng nhập',
        'employee-id-label': 'Mã nhân viên',
        'employee-name-label': 'Tên nhân viên',
        'department-label': 'Bộ phận',
        'login-btn-text': 'Đăng nhập',
        'history-title': 'Lịch sử order',
        'employee-info-title': 'Thông tin nhân viên',
        'emp-id-label': 'Mã nhân viên',
        'emp-name-label': 'Tên nhân viên',
        'emp-dept-label': 'Bộ phận',
        'renew-text': 'Re-new',
        'delete-text': 'Delete',
        'save-text': 'Lưu',
        'print-text': 'Print',
        'new-request-title': 'Tạo phiếu yêu cầu mới',
        'order-info-title': 'Thông tin đặt hàng',
        'location-label': 'Location',
        'process-label': 'Công đoạn',
        'material-search-title': 'Tìm kiếm nguyên vật liệu',
        'add-material-text': 'Thêm nguyên vật liệu',
        'no-materials-text': 'Chưa có nguyên vật liệu nào được chọn',
        'search-modal-title': 'Tìm kiếm nguyên vật liệu',
        'cancel': 'Hủy',
        'apply': 'Apply'
    },
    en: {
        'main-title': 'Online Material Request',
        'main-subtitle': 'Online material request system',
        'login-title': 'Login',
        'employee-id-label': 'Employee ID',
        'employee-name-label': 'Employee Name',
        'department-label': 'Department',
        'login-btn-text': 'Login',
        'history-title': 'Order History',
        'employee-info-title': 'Employee Information',
        'emp-id-label': 'Employee ID',
        'emp-name-label': 'Employee Name',
        'emp-dept-label': 'Department',
        'renew-text': 'Re-new',
        'delete-text': 'Delete',
        'save-text': 'Save',
        'print-text': 'Print',
        'new-request-title': 'Create New Request',
        'order-info-title': 'Order Information',
        'location-label': 'Location',
        'process-label': 'Process',
        'material-search-title': 'Search Materials',
        'add-material-text': 'Add Material',
        'no-materials-text': 'No materials selected yet',
        'search-modal-title': 'Search Materials',
        'cancel': 'Cancel',
        'apply': 'Apply'
    }
};

// Application state
let currentLanguage = localStorage.getItem('language') || 'vi';
let currentUser = null;
let selectedMaterials = [];
let currentLocation = '';
let currentProcess = '';
let historyOrders = [];

// Material database
const materialDatabase = [
    { itemId: 'MAT001', name: 'Thép tấm dày 10mm', location: 'Nhà máy 1 - Hà Nội', unit: 'Tấm' },
    { itemId: 'MAT002', name: 'Ống thép phi 100', location: 'Nhà máy 1 - Hà Nội', unit: 'Mét' },
    { itemId: 'MAT003', name: 'Đinh ốc M10', location: 'Nhà máy 2 - Hồ Chí Minh', unit: 'Cái' },
    { itemId: 'MAT004', name: 'Sơn chống gỉ', location: 'Nhà máy 2 - Hồ Chí Minh', unit: 'Lít' },
    { itemId: 'MAT005', name: 'Cao su chống rung', location: 'Kho trung tâm - Bình Dương', unit: 'Miếng' },
    { itemId: 'MAT006', name: 'Dầu thủy lực', location: 'Kho trung tâm - Bình Dương', unit: 'Lít' },
    { itemId: 'MAT007', name: 'Vòng bi SKF 6205', location: 'Nhà máy 3 - Đà Nẵng', unit: 'Cái' },
    { itemId: 'MAT008', name: 'Dây curoa', location: 'Nhà máy 3 - Đà Nẵng', unit: 'Mét' },
    { itemId: 'MAT009', name: 'Thép góc L50x50', location: 'Nhà máy 1 - Hà Nội', unit: 'Mét' },
    { itemId: 'MAT010', name: 'Ống nhựa PVC phi 110', location: 'Nhà máy 2 - Hồ Chí Minh', unit: 'Mét' }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeEventListeners();
    generateSampleHistory();
});

// Language functions
function initializeLanguage() {
    updateLanguageButtons();
    updatePageTexts();
}

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLanguage);
    });
}

function updatePageTexts() {
    const texts = translations[currentLanguage];
    Object.keys(texts).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'INPUT' && element.type !== 'button') {
                element.placeholder = texts[key];
            } else {
                element.textContent = texts[key];
            }
        }
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateLanguageButtons();
    updatePageTexts();
}

// Event listeners
function initializeEventListeners() {
    // Language toggle
    document.getElementById('vi-btn').addEventListener('click', () => switchLanguage('vi'));
    document.getElementById('en-btn').addEventListener('click', () => switchLanguage('en'));

    // Login form
    document.getElementById('login-btn').addEventListener('click', handleLogin);

    // Location and process selectors
    document.getElementById('location').addEventListener('change', handleLocationChange);
    document.getElementById('process').addEventListener('change', handleProcessChange);

    // Material search
    document.getElementById('search-btn').addEventListener('click', openSearchModal);
    document.getElementById('add-material-btn').addEventListener('click', openSearchModal);

    // Modal controls
    document.getElementById('close-modal').addEventListener('click', closeSearchModal);
    document.getElementById('cancel-search').addEventListener('click', closeSearchModal);
    document.getElementById('apply-search').addEventListener('click', applySearchResults);

    // Modal search
    document.getElementById('modal-search').addEventListener('input', filterSearchResults);

    // Action buttons
    document.getElementById('renew-btn').addEventListener('click', renewRequest);
    document.getElementById('delete-btn').addEventListener('click', deleteRequest);
    document.getElementById('save-btn').addEventListener('click', saveRequest);
    document.getElementById('print-btn').addEventListener('click', printRequest);

    // Click outside modal to close
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('search-modal');
        if (event.target === modal) {
            closeSearchModal();
        }
    });
}

// Login functionality
function handleLogin() {
    const employeeId = document.getElementById('employee-id').value.trim();
    const employeeName = document.getElementById('employee-name').value.trim();
    const department = document.getElementById('department').value;

    if (!employeeId || !employeeName || !department) {
        alert(currentLanguage === 'vi' ? 'Vui lòng điền đầy đủ thông tin!' : 'Please fill in all information!');
        return;
    }

    currentUser = {
        employeeId,
        employeeName,
        department: getDepartmentText(department)
    };

    // Update employee info display
    document.getElementById('emp-id-value').textContent = employeeId;
    document.getElementById('emp-name-value').textContent = employeeName;
    document.getElementById('emp-dept-value').textContent = currentUser.department;

    // Show main app, hide login form
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';

    // Load history for this employee
    loadEmployeeHistory();
}

function getDepartmentText(value) {
    const departments = {
        'production': currentLanguage === 'vi' ? 'Sản xuất' : 'Production',
        'quality': currentLanguage === 'vi' ? 'Chất lượng' : 'Quality',
        'maintenance': currentLanguage === 'vi' ? 'Bảo trì' : 'Maintenance',
        'warehouse': currentLanguage === 'vi' ? 'Kho bãi' : 'Warehouse'
    };
    return departments[value] || value;
}

// Location and process handlers
function handleLocationChange() {
    currentLocation = document.getElementById('location').value;
    const locationText = document.getElementById('location').options[document.getElementById('location').selectedIndex].text;
    console.log('Location changed:', currentLocation, locationText);
}

function handleProcessChange() {
    currentProcess = document.getElementById('process').value;
    const processText = document.getElementById('process').options[document.getElementById('process').selectedIndex].text;
    console.log('Process changed:', currentProcess, processText);
}

// Material search modal
function openSearchModal() {
    document.getElementById('search-modal').style.display = 'block';
    populateSearchResults();
}

function closeSearchModal() {
    document.getElementById('search-modal').style.display = 'none';
    document.getElementById('modal-search').value = '';
    // Clear all checkboxes
    document.querySelectorAll('.search-result-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
    updateSelectedCount();
}

function populateSearchResults() {
    const searchResults = document.getElementById('search-results');
    const locationFilter = document.getElementById('location').value;
    const locationText = locationFilter ? 
        document.getElementById('location').options[document.getElementById('location').selectedIndex].text : '';

    let filteredMaterials = materialDatabase;
    if (locationFilter && locationText) {
        filteredMaterials = materialDatabase.filter(material => 
            material.location === locationText
        );
    }

    searchResults.innerHTML = filteredMaterials.map(material => `
        <div class="search-result-item">
            <input type="checkbox" class="search-result-checkbox" data-item-id="${material.itemId}">
            <div class="search-result-info">
                <div class="search-result-code">${material.itemId}</div>
                <div class="search-result-name">${material.name}</div>
                <div class="search-result-location">${material.location}</div>
            </div>
        </div>
    `).join('');

    // Add event listeners to checkboxes
    document.querySelectorAll('.search-result-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedCount);
    });
}

function filterSearchResults() {
    const searchTerm = document.getElementById('modal-search').value.toLowerCase();
    const items = document.querySelectorAll('.search-result-item');

    items.forEach(item => {
        const code = item.querySelector('.search-result-code').textContent.toLowerCase();
        const name = item.querySelector('.search-result-name').textContent.toLowerCase();
        const visible = code.includes(searchTerm) || name.includes(searchTerm);
        item.style.display = visible ? 'flex' : 'none';
    });
}

function updateSelectedCount() {
    const selectedCheckboxes = document.querySelectorAll('.search-result-checkbox:checked');
    document.getElementById('selected-count').textContent = selectedCheckboxes.length;
    document.getElementById('apply-search').disabled = selectedCheckboxes.length === 0;
}

function applySearchResults() {
    const selectedCheckboxes = document.querySelectorAll('.search-result-checkbox:checked');
    
    selectedCheckboxes.forEach(checkbox => {
        const itemId = checkbox.dataset.itemId;
        const material = materialDatabase.find(m => m.itemId === itemId);
        
        if (material && !selectedMaterials.find(m => m.code === material.itemId)) {
            selectedMaterials.push({
                id: Date.now().toString() + Math.random(),
                code: material.itemId,
                name: material.name,
                unit: material.unit,
                quantity: 1,
                notes: ''
            });
        }
    });

    updateMaterialsList();
    closeSearchModal();
}

// Materials list management
function updateMaterialsList() {
    const materialsList = document.getElementById('materials-list');
    const noMaterials = document.getElementById('no-materials');

    if (selectedMaterials.length === 0) {
        noMaterials.style.display = 'block';
        // Clear any existing material items
        const existingItems = materialsList.querySelectorAll('.material-item');
        existingItems.forEach(item => item.remove());
        return;
    }

    noMaterials.style.display = 'none';
    
    // Clear existing items
    const existingItems = materialsList.querySelectorAll('.material-item');
    existingItems.forEach(item => item.remove());

    // Add material items
    selectedMaterials.forEach(material => {
        const materialItem = createMaterialItem(material);
        materialsList.appendChild(materialItem);
    });
}

function createMaterialItem(material) {
    const div = document.createElement('div');
    div.className = 'material-item';
    div.innerHTML = `
        <div class="material-info">
            <div class="material-code">${material.code}</div>
            <div class="material-name">${material.name}</div>
        </div>
        <div class="material-controls">
            <input type="number" class="quantity-input" value="${material.quantity}" min="1" data-id="${material.id}">
            <span class="unit">${material.unit}</span>
            <button class="remove-btn" data-id="${material.id}">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add event listeners
    const quantityInput = div.querySelector('.quantity-input');
    quantityInput.addEventListener('change', function() {
        updateMaterialQuantity(material.id, parseInt(this.value) || 1);
    });

    const removeBtn = div.querySelector('.remove-btn');
    removeBtn.addEventListener('click', function() {
        removeMaterial(material.id);
    });

    return div;
}

function updateMaterialQuantity(id, quantity) {
    const material = selectedMaterials.find(m => m.id === id);
    if (material) {
        material.quantity = quantity;
    }
}

function removeMaterial(id) {
    selectedMaterials = selectedMaterials.filter(m => m.id !== id);
    updateMaterialsList();
}

// Action buttons
function renewRequest() {
    if (confirm(currentLanguage === 'vi' ? 
        'Bạn có chắc chắn muốn tạo phiếu mới? Tất cả dữ liệu hiện tại sẽ bị xóa.' :
        'Are you sure you want to create a new request? All current data will be cleared.')) {
        
        // Reset form
        selectedMaterials = [];
        currentLocation = '';
        currentProcess = '';
        document.getElementById('location').value = '';
        document.getElementById('process').value = '';
        updateMaterialsList();
        
        alert(currentLanguage === 'vi' ? 'Đã tạo phiếu mới!' : 'New request created!');
    }
}

function deleteRequest() {
    if (confirm(currentLanguage === 'vi' ? 
        'Bạn có chắc chắn muốn xóa phiếu này không?' :
        'Are you sure you want to delete this request?')) {
        
        // Reset everything
        renewRequest();
        alert(currentLanguage === 'vi' ? 'Phiếu đã được xóa thành công!' : 'Request deleted successfully!');
    }
}

function saveRequest() {
    if (!currentLocation || !currentProcess) {
        alert(currentLanguage === 'vi' ? 
            'Vui lòng chọn location và công đoạn!' :
            'Please select location and process!');
        return;
    }

    if (selectedMaterials.length === 0) {
        alert(currentLanguage === 'vi' ? 
            'Vui lòng chọn ít nhất một nguyên vật liệu!' :
            'Please select at least one material!');
        return;
    }

    // Create new order
    const newOrder = {
        id: `REQ-${Date.now()}`,
        employeeId: currentUser.employeeId,
        employeeName: currentUser.employeeName,
        department: currentUser.department,
        location: document.getElementById('location').options[document.getElementById('location').selectedIndex].text,
        process: document.getElementById('process').options[document.getElementById('process').selectedIndex].text,
        materials: [...selectedMaterials],
        date: new Date().toLocaleDateString('vi-VN'),
        status: 'Pending'
    };

    // Add to history
    historyOrders.unshift(newOrder);
    updateHistoryDisplay();

    alert(currentLanguage === 'vi' ? 'Phiếu đã được lưu thành công!' : 'Request saved successfully!');
    console.log('Saved order:', newOrder);
}

function printRequest() {
    if (selectedMaterials.length === 0) {
        alert(currentLanguage === 'vi' ? 
            'Không có dữ liệu để in!' :
            'No data to print!');
        return;
    }

    // Create print content
    const printContent = generatePrintContent();
    
    // Open print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

function generatePrintContent() {
    const locationText = document.getElementById('location').options[document.getElementById('location').selectedIndex].text;
    const processText = document.getElementById('process').options[document.getElementById('process').selectedIndex].text;

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Material Request - ${currentUser.employeeId}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .info-section { margin-bottom: 20px; }
                .info-row { display: flex; margin-bottom: 10px; }
                .info-label { font-weight: bold; width: 150px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .footer { margin-top: 30px; text-align: right; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>MATERIAL REQUEST</h1>
                <p>Date: ${new Date().toLocaleDateString('vi-VN')}</p>
            </div>
            
            <div class="info-section">
                <div class="info-row"><span class="info-label">Employee ID:</span> ${currentUser.employeeId}</div>
                <div class="info-row"><span class="info-label">Employee Name:</span> ${currentUser.employeeName}</div>
                <div class="info-row"><span class="info-label">Department:</span> ${currentUser.department}</div>
                <div class="info-row"><span class="info-label">Location:</span> ${locationText || 'N/A'}</div>
                <div class="info-row"><span class="info-label">Process:</span> ${processText || 'N/A'}</div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Item Code</th>
                        <th>Material Name</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    ${selectedMaterials.map((material, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${material.code}</td>
                            <td>${material.name}</td>
                            <td>${material.quantity}</td>
                            <td>${material.unit}</td>
                            <td>${material.notes || ''}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="footer">
                <p>Total Items: ${selectedMaterials.length}</p>
                <p>Request ID: REQ-${Date.now()}</p>
            </div>
        </body>
        </html>
    `;
}

// History management
function generateSampleHistory() {
    // Generate some sample history orders
    const sampleOrders = [
        {
            id: 'REQ-001',
            date: '2024-01-15',
            materials: 3,
            status: 'Completed'
        },
        {
            id: 'REQ-002',
            date: '2024-01-10',
            materials: 5,
            status: 'Pending'
        },
        {
            id: 'REQ-003',
            date: '2024-01-05',
            materials: 2,
            status: 'Completed'
        }
    ];

    historyOrders = sampleOrders;
    updateHistoryDisplay();
}

function loadEmployeeHistory() {
    // In a real application, this would load from a database
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    
    if (historyOrders.length === 0) {
        historyList.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #6b7280;">
                <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 10px; opacity: 0.5;"></i>
                <p>${currentLanguage === 'vi' ? 'Chưa có lịch sử đặt hàng' : 'No order history'}</p>
            </div>
        `;
        return;
    }

    historyList.innerHTML = historyOrders.map(order => `
        <div class="history-item" onclick="viewHistoryOrder('${order.id}')">
            <div class="history-item-id">${order.id}</div>
            <div class="history-item-date">${order.date}</div>
            <div style="font-size: 0.625rem; color: #6b7280; margin-top: 4px;">
                ${order.materials} ${currentLanguage === 'vi' ? 'vật phẩm' : 'items'} - ${order.status}
            </div>
        </div>
    `).join('');
}

function viewHistoryOrder(orderId) {
    const order = historyOrders.find(o => o.id === orderId);
    if (order) {
        console.log('Viewing order:', order);
        alert(`${currentLanguage === 'vi' ? 'Xem chi tiết đơn hàng' : 'View order details'}: ${orderId}`);
    }
}

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('vi-VN');
}

console.log('Material Request System Initialized');
