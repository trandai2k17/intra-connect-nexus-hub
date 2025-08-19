// TV Bonus Summary Dashboard JavaScript

// Data structures
const prodlineItems = [
    "CB-DESIGNER",
    "CB-TECHNICIAN", 
    "CB-QUALITY",
    "MILL-OPERATOR",
    "CAST-TECHNICIAN"
];

const locationData = {
    "CB-DESIGNER": ["Location A1", "Location A2", "Location A3"],
    "CB-TECHNICIAN": ["Location B1", "Location B2"], 
    "CB-QUALITY": ["Location C1", "Location C2", "Location C3", "Location C4"],
    "MILL-OPERATOR": ["Location D1", "Location D2", "Location D3"],
    "CAST-TECHNICIAN": ["Location E1", "Location E2", "Location E3", "Location E4", "Location E5"]
};

const locationBonusData = {
    "Location A1": [
        { tech: "John Doe", skillLevel: "Senior", target: 50, unit: "cases", curTarget: 45, downtime: 2, correction: 1, performance: 92 },
        { tech: "Jane Smith", skillLevel: "Mid", target: 40, unit: "cases", curTarget: 38, downtime: 1, correction: 2, performance: 88 },
        { tech: "Mike Johnson", skillLevel: "Junior", target: 30, unit: "cases", curTarget: 32, downtime: 0, correction: 0, performance: 107 },
        { tech: "Sarah Wilson", skillLevel: "Senior", target: 55, unit: "cases", curTarget: 50, downtime: 1, correction: 0, performance: 91 },
        { tech: "Tom Brown", skillLevel: "Mid", target: 45, unit: "cases", curTarget: 42, downtime: 2, correction: 1, performance: 87 },
        { tech: "Lisa Davis", skillLevel: "Junior", target: 35, unit: "cases", curTarget: 38, downtime: 0, correction: 1, performance: 106 },
        { tech: "Bob Miller", skillLevel: "Senior", target: 60, unit: "cases", curTarget: 55, downtime: 1, correction: 2, performance: 88 }
    ],
    "Location A2": [
        { tech: "Alice Green", skillLevel: "Senior", target: 52, unit: "cases", curTarget: 48, downtime: 1, correction: 1, performance: 90 },
        { tech: "Charlie Black", skillLevel: "Mid", target: 42, unit: "cases", curTarget: 40, downtime: 2, correction: 0, performance: 95 }
    ],
    "Location A3": [
        { tech: "David White", skillLevel: "Junior", target: 35, unit: "cases", curTarget: 33, downtime: 1, correction: 1, performance: 89 }
    ]
};

const mockLateCaseData = {
    oneDayCount: 8,
    twoDaysCount: 1,
    threeDaysCount: 0,
    moreThanThreeDaysCount: 1,
    totalCount: 10
};

// State variables
let selectedLocation = "Location A1";
let selectedProdline = "CB-DESIGNER";
let currentPage = 1;
let rotationIndex = 0;
let currentData = locationBonusData["Location A1"] || [];
const rowsPerPage = 5;

// DOM elements
const locationButton = document.getElementById('locationButton');
const locationDropdown = document.getElementById('locationDropdown');
const dropdownIcon = document.getElementById('dropdownIcon');
const selectedLocationSpan = document.getElementById('selectedLocation');
const tableRows = document.getElementById('tableRows');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const paginationInfo = document.getElementById('paginationInfo');
const tablePagination = document.getElementById('tablePagination');

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    updateDate();
    updateLateCases();
    generateLocationDropdown();
    loadLocationData();
    updateTableInfo();
    
    // Set up event listeners
    locationButton.addEventListener('click', toggleLocationDropdown);
    prevButton.addEventListener('click', handlePrevPage);
    nextButton.addEventListener('click', handleNextPage);
    
    // Start timers
    setInterval(updateTime, 1000);
    setInterval(rotateLocation, 5000);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!locationButton.contains(event.target) && !locationDropdown.contains(event.target)) {
            closeLocationDropdown();
        }
    });
});

// Time and date functions
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    document.getElementById('currentTime').textContent = timeString;
    
    // Update shift
    const hour = now.getHours();
    let shift;
    if (hour >= 6 && hour < 14) {
        shift = "S1";
    } else if (hour >= 14 && hour < 22) {
        shift = "S2";
    } else {
        shift = "S3";
    }
    document.getElementById('currentShift').textContent = shift;
}

function updateDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString('vi-VN');
    document.getElementById('currentDate').textContent = dateString;
}

// Late cases update
function updateLateCases() {
    document.getElementById('totalCount').textContent = mockLateCaseData.totalCount;
    document.getElementById('oneDayCount').textContent = mockLateCaseData.oneDayCount;
    document.getElementById('twoDaysCount').textContent = mockLateCaseData.twoDaysCount;
    document.getElementById('threeDaysCount').textContent = 
        mockLateCaseData.threeDaysCount + mockLateCaseData.moreThanThreeDaysCount;
}

// Location dropdown functions
function generateLocationDropdown() {
    locationDropdown.innerHTML = '';
    
    Object.entries(locationData).forEach(([prodline, locations]) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'prodline-group';
        
        const headerDiv = document.createElement('div');
        headerDiv.className = 'prodline-group-header';
        headerDiv.textContent = prodline;
        groupDiv.appendChild(headerDiv);
        
        locations.forEach(location => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'prodline-dropdown-item';
            itemDiv.textContent = location;
            itemDiv.addEventListener('click', () => handleLocationSelect(location));
            groupDiv.appendChild(itemDiv);
        });
        
        locationDropdown.appendChild(groupDiv);
    });
}

function toggleLocationDropdown() {
    const isOpen = locationDropdown.style.display === 'block';
    if (isOpen) {
        closeLocationDropdown();
    } else {
        openLocationDropdown();
    }
}

function openLocationDropdown() {
    locationDropdown.style.display = 'block';
    dropdownIcon.style.transform = 'rotate(180deg)';
}

function closeLocationDropdown() {
    locationDropdown.style.display = 'none';
    dropdownIcon.style.transform = 'rotate(0deg)';
}

function handleLocationSelect(location) {
    // Find which prodline this location belongs to
    const prodline = Object.keys(locationData).find(key => 
        locationData[key].includes(location)
    );
    
    if (prodline) {
        selectedProdline = prodline;
        selectedLocation = location;
        rotationIndex = locationData[prodline].indexOf(location);
        
        selectedLocationSpan.textContent = location;
        loadLocationData();
        updateTableInfo();
    }
    closeLocationDropdown();
}

// Location rotation
function rotateLocation() {
    const currentLocations = locationData[selectedProdline];
    if (currentLocations && currentLocations.length > 1) {
        rotationIndex = (rotationIndex + 1) % currentLocations.length;
        selectedLocation = currentLocations[rotationIndex];
        selectedLocationSpan.textContent = selectedLocation;
        loadLocationData();
        updateTableInfo();
    }
}

// Data loading
function loadLocationData() {
    currentData = locationBonusData[selectedLocation] || [];
    currentPage = 1;
    renderTable();
    updatePagination();
}

// Table rendering
function renderTable() {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageData = currentData.slice(startIndex, endIndex);
    
    tableRows.innerHTML = '';
    
    pageData.forEach((row, index) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'table-row';
        
        const performanceClass = getPerformanceClass(row.performance);
        
        rowDiv.innerHTML = `
            <div class="table-row-grid">
                <div class="tech-name-column">
                    <div class="tech-name">${row.tech}</div>
                    <div class="tech-skill">${row.skillLevel}</div>
                </div>
                
                <div class="metrics-column">
                    <div class="metric-item">
                        <div class="metric-value metric-target">${row.target}</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value metric-current">${row.curTarget}</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value metric-downtime">${row.downtime}</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value metric-correction">${row.correction}</div>
                    </div>
                </div>

                <div class="performance-column">
                    <div class="performance-badge ${performanceClass}">
                        ${row.performance}%
                    </div>
                </div>

                <div class="position-column">
                    <div class="position-number">#${startIndex + index + 1}</div>
                </div>
            </div>
        `;
        
        tableRows.appendChild(rowDiv);
    });
}

function getPerformanceClass(performance) {
    if (performance >= 100) return "performance-excellent";
    if (performance >= 90) return "performance-good";
    return "performance-poor";
}

// Pagination
function updatePagination() {
    const totalPages = Math.ceil(currentData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, currentData.length);
    
    if (totalPages > 1) {
        tablePagination.style.display = 'flex';
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
        paginationInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${currentData.length} rows`;
    } else {
        tablePagination.style.display = 'none';
    }
}

function handlePrevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
        updatePagination();
        updateTableInfo();
    }
}

function handleNextPage() {
    const totalPages = Math.ceil(currentData.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
        updatePagination();
        updateTableInfo();
    }
}

// Table info update
function updateTableInfo() {
    const totalPages = Math.ceil(currentData.length / rowsPerPage);
    
    document.getElementById('currentProdline').textContent = selectedProdline;
    document.getElementById('locationCount').textContent = locationData[selectedProdline]?.length || 0;
    document.getElementById('totalRows').textContent = currentData.length;
    document.getElementById('footerLocation').textContent = selectedLocation;
    document.getElementById('footerPaginationInfo').textContent = `Page ${currentPage} of ${totalPages}`;
}