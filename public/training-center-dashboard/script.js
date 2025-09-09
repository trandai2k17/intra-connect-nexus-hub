// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
  lucide.createIcons();
  
  // Initialize dashboard components
  initializePrograms();
  initializeCharts();
  initializeCoursesTable();
  initializeTVDisplay();
  initializeTabs();
});

// Sample data
const coursesData = [
  { id: "RPD0001", name: "SETUP/FESTOON WAX TRY-IN", startDate: "23-JUL-25", endDate: "22-SEP-25", progress: 75, status: 'ongoing' },
  { id: "RPD0002", name: "CAST FRAME-SCAN/DESIGN", startDate: "24-JUL-25", endDate: "7-SEP-25", progress: 31, status: 'ongoing' },
  { id: "RPD0003", name: "PDNG-BLOCKOUT", startDate: "25-JUL-25", endDate: "7-SEP-25", progress: 31, status: 'ongoing' },
  { id: "RPD0004", name: "ACRYLIC-FIT/POLISH", startDate: "25-JUL-25", endDate: "22-SEP-25", progress: 37, status: 'ongoing' },
  { id: "RPD0005", name: "PRINTED MODEL", startDate: "24-JUL-25", endDate: "7-SEP-25", progress: 50, status: 'ongoing' },
  { id: "RPD0006", name: "CT SCAN", startDate: "23-JUL-25", endDate: "22-SEP-25", progress: 87, status: 'ongoing' },
  { id: "RPD0007", name: "FLEXIBLE PRODUCT", startDate: "25-JUL-25", endDate: "22-SEP-25", progress: 65, status: 'ongoing' },
  { id: "RPD0008", name: "WAX TRY-IN PRODUCT", startDate: "24-JUL-25", endDate: "7-SEP-25", progress: 42, status: 'ongoing' },
  { id: "RPD0009", name: "UPGRADE TRAINING", startDate: "23-JUL-25", endDate: "22-SEP-25", progress: 28, status: 'ongoing' },
  { id: "RPD0010", name: "SKILL LEVEL TRAINING", startDate: "25-JUL-25", endDate: "7-SEP-25", progress: 93, status: 'ongoing' },
  { id: "RPD0011", name: "POLISH GROUP 3", startDate: "24-JUL-25", endDate: "22-SEP-25", progress: 15, status: 'ongoing' },
  { id: "RPD0012", name: "MODEL PRACTICING", startDate: "23-JUL-25", endDate: "7-SEP-25", progress: 79, status: 'ongoing' }
];

// Chart data
const chartData = {
  rpd: [
    { location: "Design", new: 5, ongoing: 12, complete: 8, cancel: 2 },
    { location: "Production", new: 3, ongoing: 15, complete: 22, cancel: 1 },
    { location: "Quality", new: 7, ongoing: 8, complete: 18, cancel: 3 },
    { location: "Planning", new: 4, ongoing: 10, complete: 15, cancel: 2 },
  ],
  ng: [
    { location: "Block out", new: 6, ongoing: 9, complete: 14, cancel: 1 },
    { location: "Final Co", new: 4, ongoing: 11, complete: 16, cancel: 2 },
    { location: "Model", new: 8, ongoing: 7, complete: 12, cancel: 1 },
    { location: "Quality", new: 3, ongoing: 13, complete: 19, cancel: 2 },
  ],
  cb: [
    { location: "Cam", new: 2, ongoing: 8, complete: 25, cancel: 1 },
    { location: "Contour", new: 5, ongoing: 12, complete: 18, cancel: 2 },
    { location: "Design", new: 7, ongoing: 15, complete: 20, cancel: 3 },
    { location: "Final Filter", new: 3, ongoing: 9, complete: 22, cancel: 1 },
    { location: "Metal", new: 4, ongoing: 11, complete: 16, cancel: 2 },
    { location: "Pressing", new: 6, ongoing: 13, complete: 14, cancel: 1 },
  ]
};

// Utility functions
function getProgressClass(progress) {
  if (progress >= 80) return 'high';
  if (progress >= 50) return 'medium';
  if (progress >= 30) return 'low';
  return 'critical';
}

function createCircularProgress(progress, size = 96) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const progressClass = getProgressClass(progress);
  
  return `
    <div class="circular-progress" style="width: ${size}px; height: ${size}px;">
      <svg class="progress-svg" viewBox="0 0 100 100">
        <circle class="progress-bg" cx="50" cy="50" r="${radius}"></circle>
        <circle 
          class="progress-bar ${progressClass}" 
          cx="50" 
          cy="50" 
          r="${radius}"
          style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${strokeDashoffset};"
        ></circle>
      </svg>
      <div class="progress-text ${progressClass}">${progress}%</div>
    </div>
  `;
}

// Initialize Active Training Programs
function initializePrograms() {
  const programsGrid = document.getElementById('programsGrid');
  if (!programsGrid) return;

  programsGrid.innerHTML = coursesData.map(course => {
    const progressClass = getProgressClass(course.progress);
    return `
      <div class="program-card ${progressClass}">
        <div class="program-content">
          <h3 class="program-name">${course.name}</h3>
          ${createCircularProgress(course.progress)}
          <div class="program-dates">
            <div class="date-item">
              <i data-lucide="calendar" class="date-icon start"></i>
              <span>${course.startDate}</span>
            </div>
            <div class="date-item">
              <i data-lucide="clock" class="date-icon end"></i>
              <span>${course.endDate}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

// Initialize Charts
let charts = {};

function initializeCharts() {
  // Create charts for each tab
  Object.keys(chartData).forEach(key => {
    createChart(key);
  });
}

function createChart(area) {
  const canvas = document.getElementById(`${area}Chart`);
  if (!canvas) return;

  const data = chartData[area];
  const labels = data.map(item => item.location);
  
  const chartConfig = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'New',
          data: data.map(item => item.new),
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          borderWidth: 0,
        },
        {
          label: 'On-going',
          data: data.map(item => item.ongoing),
          backgroundColor: '#f59e0b',
          borderColor: '#f59e0b',
          borderWidth: 0,
        },
        {
          label: 'Complete',
          data: data.map(item => item.complete),
          backgroundColor: '#10b981',
          borderColor: '#10b981',
          borderWidth: 0,
        },
        {
          label: 'Cancel',
          data: data.map(item => item.cancel),
          backgroundColor: '#ef4444',
          borderColor: '#ef4444',
          borderWidth: 0,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: '#64748b',
            font: {
              size: 11,
            },
          },
        },
        y: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: '#64748b',
            font: {
              size: 11,
            },
          },
        },
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      },
    },
  };

  if (charts[area]) {
    charts[area].destroy();
  }
  
  charts[area] = new Chart(canvas, chartConfig);
}

// Initialize Courses Table
function initializeCoursesTable() {
  const tableBody = document.getElementById('coursesTableBody');
  if (!tableBody) return;

  const sortedCourses = [...coursesData].sort((a, b) => b.progress - a.progress);
  
  tableBody.innerHTML = sortedCourses.slice(0, 6).map(course => {
    const progressClass = getProgressClass(course.progress);
    return `
      <tr>
        <td>
          <div class="course-name line-clamp-2">${course.name}</div>
        </td>
        <td class="course-date">${course.startDate}</td>
        <td class="course-date">${course.endDate}</td>
        <td>
          <div class="progress-container">
            <div class="progress-bar-container">
              <div class="progress-fill ${progressClass}" style="width: ${course.progress}%"></div>
            </div>
            <span class="progress-value">${course.progress}%</span>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Initialize TV Display
function initializeTVDisplay() {
  const tvGrid = document.getElementById('tvCoursesGrid');
  if (!tvGrid) return;

  tvGrid.innerHTML = coursesData.map(course => {
    const progressClass = getProgressClass(course.progress);
    return `
      <div class="tv-course-card ${progressClass}">
        <div class="tv-course-content">
          <h3 class="tv-course-name line-clamp-2">${course.name}</h3>
          <div class="tv-circular-progress">
            ${createCircularProgress(course.progress, 64)}
          </div>
          <div class="tv-course-dates">
            <div class="tv-date-item">Start: ${course.startDate}</div>
            <div class="tv-date-item">End: ${course.endDate}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Initialize Tabs
function initializeTabs() {
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabContents = document.querySelectorAll('.tab-content');

  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all triggers and contents
      tabTriggers.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked trigger and corresponding content
      this.classList.add('active');
      document.getElementById(`${tabId}-content`).classList.add('active');
      
      // Update tab colors based on selection
      updateTabColors(tabId);
    });
  });
}

function updateTabColors(activeTab) {
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  
  tabTriggers.forEach(trigger => {
    const tabId = trigger.getAttribute('data-tab');
    trigger.classList.remove('active');
    
    if (tabId === activeTab) {
      trigger.classList.add('active');
      
      // Apply specific colors based on tab
      if (tabId === 'rpd') {
        trigger.style.backgroundColor = '#3b82f6';
      } else if (tabId === 'ng') {
        trigger.style.backgroundColor = '#10b981';
      } else if (tabId === 'cb') {
        trigger.style.backgroundColor = '#8b5cf6';
      }
    } else {
      trigger.style.backgroundColor = '';
    }
  });
}

// Add smooth animations when elements come into view
function addScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe all main sections
  document.querySelectorAll('.dashboard-header, .metrics-container, .active-programs, .quick-status-row, .courses-table, .tv-display').forEach(section => {
    observer.observe(section);
  });
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', addScrollAnimations);