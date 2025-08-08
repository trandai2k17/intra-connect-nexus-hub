// Case Design Tracker JavaScript

// Mock data generator
function generateMockCases() {
    const cases = [];
    const patients = ["Nguyễn Văn A", "Lê Thị B", "Trần Minh C", "Phạm Thu D", "Hoàng Văn E", "Đỗ Thị F", "Bùi Minh G", "Vũ Thu H"];
    const doctors = ["Dr. Trần Thị B", "Dr. Phạm Văn D", "Dr. Ngô Thị F", "Dr. Lê Minh H", "Dr. Hoàng Thu I"];
    
    for (let i = 1; i <= 1000; i++) {
        const turnaroundTime = Math.floor(Math.random() * 24) + 1;
        const isLate = turnaroundTime > 12;
        const isUrgent = turnaroundTime > 10 && Math.random() > 0.7;
        const needsTranslation = Math.random() > 0.6;
        const pendingEmail = Math.random() > 0.8;
        
        cases.push({
            id: `CASE${String(i).padStart(3, '0')}`,
            patientName: patients[Math.floor(Math.random() * patients.length)],
            doctorName: doctors[Math.floor(Math.random() * doctors.length)],
            createdDateTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            finished: Math.random() > 0.4,
            threeShapeStatus: ["Completed", "In Progress", "Error", "Pending"][Math.floor(Math.random() * 4)],
            transDate: Math.random() > 0.5 ? new Date().toISOString().split('T')[0] : null,
            shipDate: Math.random() > 0.7 ? new Date().toISOString().split('T')[0] : null,
            status: Math.random() > 0.7 ? 'completed' : Math.random() > 0.8 ? 'error' : 'pending',
            turnaroundTime,
            translated: !needsTranslation,
            pendingEmail,
            urgentDeadline: isUrgent
        });
    }
    return cases;
}

// Global variables
let allCases = generateMockCases();
let filteredCases = [...allCases];
let currentPage = 1;
const itemsPerPage = 20;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    populateUrgentCases();
    populateOverdueCases();
    renderCases();
    setupEventListeners();
    initChart();
});

// Update statistics
function updateStats() {
    const completed = allCases.filter(c => c.status === 'completed').length;
    const pending = allCases.filter(c => c.status === 'pending').length;
    const error = allCases.filter(c => c.status === 'error').length;
    
    document.getElementById('totalCases').textContent = allCases.length;
    document.getElementById('completedCases').textContent = completed;
    document.getElementById('pendingCases').textContent = pending;
    document.getElementById('errorCases').textContent = error;
}

// Populate urgent cases
function populateUrgentCases() {
    const urgentCases = allCases.filter(c => c.urgentDeadline && !c.translated).slice(0, 4);
    const urgentList = document.getElementById('urgentList');
    
    urgentList.innerHTML = urgentCases.map(caseItem => `
        <div class="alert-item" onclick="openCaseModal('${caseItem.id}')">
            <div class="alert-item-header">
                <span class="alert-item-id">${caseItem.id}</span>
                <span class="alert-item-time">${caseItem.turnaroundTime}h</span>
            </div>
            <div class="alert-item-patient">${caseItem.patientName}</div>
        </div>
    `).join('');
}

// Populate overdue cases
function populateOverdueCases() {
    const overdueCases = allCases.filter(c => c.turnaroundTime > 12).slice(0, 4);
    const overdueList = document.getElementById('overdueList');
    
    overdueList.innerHTML = overdueCases.map(caseItem => `
        <div class="alert-item" onclick="openCaseModal('${caseItem.id}')">
            <div class="alert-item-header">
                <span class="alert-item-id">${caseItem.id}</span>
                <span class="alert-item-time">${caseItem.turnaroundTime}h</span>
            </div>
            <div class="alert-item-patient">${caseItem.patientName}</div>
        </div>
    `).join('');
}

// Get stage status
function getStageStatus(stage, caseData) {
    switch(stage) {
        case 'created':
            return caseData.createdDateTime ? 'completed' : 'empty';
        case 'design':
            if (caseData.threeShapeStatus === 'Error') return 'error';
            return caseData.finished ? 'completed' : 'pending';
        case 'translate':
            return caseData.translated ? 'completed' : 'pending';
        case 'sent':
            return caseData.transDate ? 'completed' : 'pending';
        case 'shipping':
            return caseData.shipDate ? 'completed' : 'pending';
        default:
            return 'pending';
    }
}

// Get status badge HTML
function getStatusBadge(status) {
    const variants = {
        completed: 'badge-default',
        pending: 'badge-secondary',
        error: 'badge-destructive'
    };
    
    const labels = {
        completed: 'Completed',
        pending: 'Pending', 
        error: 'Error'
    };
    
    return `<span class="status-badge ${variants[status] || 'badge-secondary'}">${labels[status] || 'Unknown'}</span>`;
}

// Generate timeline HTML
function generateTimeline(caseData) {
    const stages = [
        { key: 'created', label: 'Created', icon: 'fas fa-calendar', date: caseData.createdDateTime },
        { key: 'design', label: 'Design', icon: 'fas fa-cube', date: caseData.finished ? caseData.createdDateTime : null },
        { key: 'translate', label: 'Translate', icon: 'fas fa-language', date: caseData.translated ? caseData.transDate : null },
        { key: 'sent', label: 'Sent', icon: 'fas fa-truck', date: caseData.transDate },
        { key: 'shipping', label: 'Ship', icon: 'fas fa-check-circle', date: caseData.shipDate }
    ];
    
    return stages.map((stage, index) => {
        const status = getStageStatus(stage.key, caseData);
        const statusClass = `timeline-${status}`;
        const connectorClass = status === 'completed' ? 'connector-completed' : 'connector-empty';
        
        return `
            <div class="timeline-stage">
                <div class="timeline-step">
                    <div class="timeline-icon ${statusClass}">
                        <i class="${stage.icon}"></i>
                    </div>
                    <span class="timeline-label">${stage.label}</span>
                    ${stage.date ? `<div class="timeline-tooltip">${stage.date}</div>` : ''}
                </div>
                ${index < stages.length - 1 ? `<div class="timeline-connector ${connectorClass}"></div>` : ''}
            </div>
        `;
    }).join('');
}

// Render cases
function renderCases() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCases = filteredCases.slice(startIndex, endIndex);
    
    const casesContainer = document.getElementById('casesContainer');
    
    casesContainer.innerHTML = paginatedCases.map(caseItem => {
        const cardClass = caseItem.urgentDeadline ? 'case-card urgent' : 
                         caseItem.turnaroundTime > 12 ? 'case-card overdue' : 'case-card';
        
        const turnaroundClass = caseItem.turnaroundTime > 12 ? 'turnaround-danger' :
                               caseItem.turnaroundTime > 8 ? 'turnaround-warning' : 'turnaround-normal';
        
        return `
            <div class="${cardClass}" onclick="openCaseModal('${caseItem.id}')">
                <!-- Row 1: Case Header + Status + Created + Turnaround + Final Status -->
                <div class="case-header">
                    <div class="case-header-left">
                        <div class="case-id-section">
                            <span class="case-id">${caseItem.id}</span>
                            ${caseItem.urgentDeadline ? '<span class="urgent-badge"><i class="fas fa-exclamation-triangle"></i> URGENT</span>' : ''}
                        </div>
                        
                        <div class="status-badges">
                            <span class="status-badge ${caseItem.doctorName ? 'badge-default' : 'badge-secondary'}">
                                <i class="fas fa-user"></i> Doctor
                            </span>
                            <span class="status-badge ${caseItem.threeShapeStatus === 'Completed' ? 'badge-default' : 
                                                       caseItem.threeShapeStatus === 'Error' ? 'badge-destructive' : 'badge-secondary'}">
                                <i class="fas fa-cube"></i> 3Shape
                            </span>
                            <span class="status-badge ${caseItem.translated ? 'badge-default' : 'badge-secondary'}">
                                <i class="fas fa-language"></i> Translate
                            </span>
                        </div>
                    </div>
                    
                    <div class="case-header-right">
                        <div class="case-info-item">
                            <p class="case-info-label">Created</p>
                            <p class="case-info-value">${caseItem.createdDateTime || 'N/A'}</p>
                        </div>
                        <div class="case-info-item">
                            <p class="case-info-label">Turnaround</p>
                            <p class="case-info-value ${turnaroundClass}">${caseItem.turnaroundTime}h</p>
                        </div>
                        ${getStatusBadge(caseItem.status)}
                    </div>
                </div>
                
                <!-- Row 2: Patient (col-2) + Doctor (col-2) + Timeline (col-8) -->
                <div class="case-content">
                    <div class="case-info-section">
                        <i class="fas fa-user case-info-icon"></i>
                        <div>
                            <p class="case-section-label">Patient</p>
                            <p class="case-section-value">${caseItem.patientName}</p>
                        </div>
                    </div>
                    
                    <div class="case-info-section">
                        <div>
                            <p class="case-section-label">Doctor</p>
                            <p class="case-section-value">${caseItem.doctorName}</p>
                        </div>
                    </div>
                    
                    <div class="timeline">
                        ${generateTimeline(caseItem)}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    updatePagination();
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
    
    document.getElementById('casesCount').textContent = filteredCases.length;
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;
    
    // Update pagination buttons
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
    
    // Generate page numbers
    const paginationPages = document.getElementById('paginationPages');
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);
    
    if (endPage - startPage + 1 < maxPages) {
        startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    paginationPages.innerHTML = '';
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('span');
        pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => goToPage(i);
        paginationPages.appendChild(pageBtn);
    }
}

// Change page
function changePage(direction) {
    const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderCases();
    }
}

// Go to specific page
function goToPage(page) {
    currentPage = page;
    renderCases();
}

// Filter cases by date
function filterCases() {
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    
    filteredCases = allCases.filter(caseItem => {
        if (dateFrom && caseItem.createdDateTime) {
            if (new Date(caseItem.createdDateTime) < new Date(dateFrom)) return false;
        }
        if (dateTo && caseItem.createdDateTime) {
            if (new Date(caseItem.createdDateTime) > new Date(dateTo)) return false;
        }
        return true;
    });
    
    currentPage = 1;
    renderCases();
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('dateFrom').addEventListener('change', filterCases);
    document.getElementById('dateTo').addEventListener('change', filterCases);
}

// Open case modal
function openCaseModal(caseId) {
    const caseData = allCases.find(c => c.id === caseId);
    if (!caseData) return;
    
    const modal = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `Case Details - ${caseData.id}`;
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
            <div>
                <h4 style="margin-bottom: 1rem; font-weight: 600;">Basic Information</h4>
                <p><strong>Patient:</strong> ${caseData.patientName}</p>
                <p><strong>Doctor:</strong> ${caseData.doctorName}</p>
                <p><strong>Created:</strong> ${caseData.createdDateTime || 'N/A'}</p>
                <p><strong>Status:</strong> ${caseData.status}</p>
            </div>
            <div>
                <h4 style="margin-bottom: 1rem; font-weight: 600;">Progress Information</h4>
                <p><strong>3Shape Status:</strong> ${caseData.threeShapeStatus}</p>
                <p><strong>Translated:</strong> ${caseData.translated ? 'Yes' : 'No'}</p>
                <p><strong>Turnaround Time:</strong> ${caseData.turnaroundTime}h</p>
                <p><strong>Urgent:</strong> ${caseData.urgentDeadline ? 'Yes' : 'No'}</p>
            </div>
        </div>
        <div>
            <h4 style="margin-bottom: 1rem; font-weight: 600;">Timeline</h4>
            <div class="timeline" style="margin-top: 1rem;">
                ${generateTimeline(caseData)}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
}

// Initialize chart (placeholder)
function initChart() {
    const canvas = document.getElementById('performanceChart');
    const ctx = canvas.getContext('2d');
    
    // Simple chart drawing (you can replace with Chart.js or similar)
    const data = [
        { label: 'Mon', completed: 120, pending: 80, error: 10 },
        { label: 'Tue', completed: 140, pending: 60, error: 15 },
        { label: 'Wed', completed: 110, pending: 90, error: 8 },
        { label: 'Thu', completed: 160, pending: 70, error: 12 },
        { label: 'Fri', completed: 130, pending: 85, error: 18 },
        { label: 'Sat', completed: 90, pending: 40, error: 5 },
        { label: 'Sun', completed: 70, pending: 30, error: 3 }
    ];
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Draw simple bar chart
    const barWidth = canvas.width / data.length;
    const maxValue = Math.max(...data.map(d => d.completed + d.pending + d.error));
    
    data.forEach((item, index) => {
        const x = index * barWidth;
        const completedHeight = (item.completed / maxValue) * (canvas.height - 40);
        const pendingHeight = (item.pending / maxValue) * (canvas.height - 40);
        const errorHeight = (item.error / maxValue) * (canvas.height - 40);
        
        // Draw completed
        ctx.fillStyle = '#10b981';
        ctx.fillRect(x + 10, canvas.height - completedHeight - 20, barWidth - 20, completedHeight);
        
        // Draw pending
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(x + 10, canvas.height - completedHeight - pendingHeight - 20, barWidth - 20, pendingHeight);
        
        // Draw error
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x + 10, canvas.height - completedHeight - pendingHeight - errorHeight - 20, barWidth - 20, errorHeight);
        
        // Draw label
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, x + barWidth/2, canvas.height - 5);
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    setTimeout(initChart, 100);
});