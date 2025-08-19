import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RunningTextFooter from '@/components/footer/RunningTextFooter';
import '../styles/header-section.css';
import '../styles/table-section.css';

interface BonusData {
  tech: string;
  skillLevel: string;
  target: number;
  unit: string;
  curTarget: number;
  downtime: number;
  correction: number;
  performance: number;
}

interface LateCaseData {
  oneDayCount: number;
  twoDaysCount: number;
  threeDaysCount: number;
  moreThanThreeDaysCount: number;
  totalCount: number;
}

const mockBonusData: BonusData[] = [
  {
    tech: "John Doe",
    skillLevel: "Senior",
    target: 50,
    unit: "cases",
    curTarget: 45,
    downtime: 2,
    correction: 1,
    performance: 92
  },
  {
    tech: "Jane Smith",
    skillLevel: "Mid",
    target: 40,
    unit: "cases", 
    curTarget: 38,
    downtime: 1,
    correction: 2,
    performance: 88
  },
  {
    tech: "Mike Johnson",
    skillLevel: "Junior",
    target: 30,
    unit: "cases",
    curTarget: 32,
    downtime: 0,
    correction: 0,
    performance: 107
  }
];

const mockLateCaseData: LateCaseData = {
  oneDayCount: 8,
  twoDaysCount: 1,
  threeDaysCount: 0,
  moreThanThreeDaysCount: 1,
  totalCount: 10
};

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

// Mock data for different locations
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
  ]
};

export default function TVBonusSummary() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentShift, setCurrentShift] = useState("S2");
  const [selectedLocation, setSelectedLocation] = useState("Location A1");
  const [selectedProdline, setSelectedProdline] = useState("CB-DESIGNER");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bonusData, setBonusData] = useState<BonusData[]>(locationBonusData["Location A1"] || mockBonusData);
  const [lateCaseData] = useState<LateCaseData>(mockLateCaseData);
  const [rotationIndex, setRotationIndex] = useState(0);
  
  const rowsPerPage = 5;

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotate location every 5 seconds within the same prodline group
  useEffect(() => {
    const timer = setInterval(() => {
      const currentLocations = locationData[selectedProdline];
      if (currentLocations && currentLocations.length > 1) {
        setRotationIndex(prev => (prev + 1) % currentLocations.length);
        setSelectedLocation(currentLocations[(rotationIndex + 1) % currentLocations.length]);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [selectedProdline, rotationIndex]);

  // Load data when location changes
  useEffect(() => {
    const data = locationBonusData[selectedLocation] || mockBonusData;
    setBonusData(data);
    setCurrentPage(1); // Reset to first page when location changes
  }, [selectedLocation]);

  // Determine shift based on time
  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 14) {
      setCurrentShift("S1");
    } else if (hour >= 14 && hour < 22) {
      setCurrentShift("S2");
    } else {
      setCurrentShift("S3");
    }
  }, [currentTime]);

  // Handle location selection
  const handleLocationSelect = (location: string) => {
    // Find which prodline this location belongs to
    const prodline = Object.keys(locationData).find(key => 
      locationData[key].includes(location)
    );
    
    if (prodline) {
      setSelectedProdline(prodline);
      setSelectedLocation(location);
      setRotationIndex(locationData[prodline].indexOf(location));
    }
    setIsLocationDropdownOpen(false);
  };

  // Get all locations grouped by prodline
  const getAllLocations = () => {
    return Object.entries(locationData).map(([prodline, locations]) => ({
      prodline,
      locations
    }));
  };

  // Pagination logic
  const totalPages = Math.ceil(bonusData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = bonusData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 100) return "text-green-500";
    if (performance >= 90) return "text-yellow-500";
    return "text-red-500";
  };

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 100) return "performance-excellent";
    if (performance >= 90) return "performance-good";
    return "performance-poor";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-2">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-grid">
          {/* Time & Shift */}
          <div className="time-shift-section">
            <div className="time-display">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })}
            </div>
            <div className="shift-badge">
              {currentShift}
            </div>
          </div>

          {/* Late Cases - Enhanced */}
          <div className="late-cases-section">
            <div className="late-cases-container">
              <div className="late-cases-content">
                <div className="late-cases-title">LATE CASES</div>
                <div className="late-cases-stats">
                  <div className="total-count">
                    <div className="total-count-number">{lateCaseData.totalCount}</div>
                    <div className="total-count-label">TOTAL</div>
                  </div>
                  <div className="divider"></div>
                  <div className="breakdown-stats">
                    <div className="breakdown-item">
                      <div className="breakdown-number one-day">{lateCaseData.oneDayCount}</div>
                      <div className="breakdown-label one-day-label">1D</div>
                    </div>
                    <div className="breakdown-item">
                      <div className="breakdown-number two-day">{lateCaseData.twoDaysCount}</div>
                      <div className="breakdown-label two-day-label">2D</div>
                    </div>
                    <div className="breakdown-item">
                      <div className="breakdown-number three-day">{lateCaseData.threeDaysCount + lateCaseData.moreThanThreeDaysCount}</div>
                      <div className="breakdown-label three-day-label">3D+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Dropdown - Enhanced */}
          <div className="prodline-section">
            <div className="prodline-container">
              <div className="prodline-title">LOCATION</div>
              <div className="prodline-dropdown">
                <button 
                  className="prodline-button"
                  onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                >
                  <span>{selectedLocation}</span>
                  <svg 
                    className={`w-4 h-4 prodline-dropdown-icon ${isLocationDropdownOpen ? 'prodline-dropdown-open' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isLocationDropdownOpen && (
                  <div className="prodline-dropdown-menu">
                    {getAllLocations().map(({ prodline, locations }) => (
                      <div key={prodline} className="prodline-group">
                        <div className="prodline-group-header">
                          {prodline}
                        </div>
                        {locations.map((location) => (
                          <div
                            key={location}
                            className="prodline-dropdown-item"
                            onClick={() => handleLocationSelect(location)}
                          >
                            {location}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table Info - Compact display */}
          <div className="header-table-info">
            <div className="header-info-compact">
              <div className="header-info-item">
                <span className="header-info-label">PRODLINE:</span>
                <span className="header-info-value">{selectedProdline}</span>
              </div>
              <div className="header-info-separator">|</div>
              <div className="header-info-item">
                <span className="header-info-label">LOCATIONS:</span>
                <span className="header-info-value">{locationData[selectedProdline]?.length || 0}</span>
              </div>
              <div className="header-info-separator">|</div>
              <div className="header-info-item">
                <span className="header-info-label">ROWS:</span>
                <span className="header-info-value">{bonusData.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-section">
        {/* Table Header */}
        <div className="table-header">
          <div className="table-header-grid">
            <div className="header-technician">TECHNICIAN</div>
            <div className="header-metrics">
              <div className="header-metric">TARGET</div>
              <div className="header-metric">CURRENT</div>
              <div className="header-metric">DOWNTIME</div>
              <div className="header-metric">CORRECTION</div>
            </div>
            <div className="header-performance">PERFORMANCE</div>
            <div className="header-position">
              <div className="position-header-content">
                <span>POS</span>
                {totalPages > 1 && (
                  <div className="mini-pagination">
                    <span className="pagination-text">{currentPage}/{totalPages}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Table Content */}
        <div className="table-content">
          <div className="table-rows">
            {currentData.map((row, index) => (
              <div key={index} className="table-row">
                <div className="table-row-grid">
                  {/* Tech Name */}
                  <div className="tech-name-column">
                    <div className="tech-name">{row.tech}</div>
                    <div className="tech-skill">{row.skillLevel}</div>
                  </div>
                  
                  {/* Metrics */}
                  <div className="metrics-column">
                    <div className="metric-item">
                      <div className="metric-value metric-target">{row.target}</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value metric-current">{row.curTarget}</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value metric-downtime">{row.downtime}</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value metric-correction">{row.correction}</div>
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="performance-column">
                    <div className={`performance-badge ${getPerformanceBadge(row.performance)}`}>
                      {row.performance}%
                    </div>
                  </div>

                  {/* Position */}
                  <div className="position-column">
                    <div className="position-number">#{startIndex + index + 1}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <RunningTextFooter cutoffTime="13:30" arrivalTime="22:30" />
    </div>
  );
}