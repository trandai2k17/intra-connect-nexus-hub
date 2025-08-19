import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RunningTextFooter from '@/components/footer/RunningTextFooter';
import { TVBonusController } from '@/components/tv-bonus/TVBonusController';
import { TVBonusModel, type BonusData, type LateCaseData } from '@/components/tv-bonus/TVBonusModel';
import '../styles/header-section.css';
import '../styles/table-section.css';

export default function TVBonusSummary() {
  // State management with descriptive IDs
  const [currentTimeState, setCurrentTimeState] = useState(new Date());
  const [currentShiftState, setCurrentShiftState] = useState("S2");
  const [selectedLocationState, setSelectedLocationState] = useState("Location A1");
  const [selectedProdlineState, setSelectedProdlineState] = useState("CB-DESIGNER");
  const [isLocationDropdownOpenState, setIsLocationDropdownOpenState] = useState(false);
  const [currentPageState, setCurrentPageState] = useState(1);
  const [bonusDataState, setBonusDataState] = useState<BonusData[]>(TVBonusModel.getDefaultBonusData());
  const [lateCaseDataState] = useState<LateCaseData>(TVBonusModel.MOCK_LATE_CASE_DATA);
  const [rotationIndexState, setRotationIndexState] = useState(0);
  const [locationDisplayTimeState, setLocationDisplayTimeState] = useState(5000);

  // Configuration constants
  const ROWS_PER_PAGE_CONFIG = 5;

  // Effect: Update time every second
  useEffect(() => {
    const timeUpdateTimer = setInterval(() => {
      setCurrentTimeState(new Date());
    }, 1000);
    return () => clearInterval(timeUpdateTimer);
  }, []);

  // Effect: Auto-rotate locations with dynamic timing based on slide count
  useEffect(() => {
    const currentLocationsArray = TVBonusModel.LOCATION_DATA[selectedProdlineState];
    if (currentLocationsArray && currentLocationsArray.length > 1) {
      const locationRotationTimer = setInterval(() => {
        setRotationIndexState(prevIndex => {
          const newIndex = (prevIndex + 1) % currentLocationsArray.length;
          const nextLocation = currentLocationsArray[newIndex];
          setSelectedLocationState(nextLocation);
          
          // Calculate display time for next location
          const nextLocationData = TVBonusModel.getBonusDataByLocation(nextLocation);
          const displayTime = TVBonusController.calculateLocationDisplayTime(nextLocationData.length);
          setLocationDisplayTimeState(displayTime);
          
          return newIndex;
        });
      }, locationDisplayTimeState);
      
      return () => clearInterval(locationRotationTimer);
    }
  }, [selectedProdlineState, rotationIndexState, locationDisplayTimeState]);

  // Effect: Load data when location changes
  useEffect(() => {
    const locationDataLoader = () => {
      const newBonusData = TVBonusModel.getBonusDataByLocation(selectedLocationState);
      setBonusDataState(newBonusData);
      setCurrentPageState(1); // Reset to first page when location changes
    };
    
    locationDataLoader();
  }, [selectedLocationState]);

  // Effect: Determine shift based on current time
  useEffect(() => {
    const shiftDeterminer = () => {
      const currentHour = currentTimeState.getHours();
      const newShift = TVBonusController.getCurrentShift(currentHour);
      setCurrentShiftState(newShift);
    };
    
    shiftDeterminer();
  }, [currentTimeState]);

  // Handler: Location selection with prodline detection
  const handleLocationSelection = useCallback((selectedLocation: string) => {
    const detectedProdline = TVBonusController.findProdlineByLocation(selectedLocation, TVBonusModel.LOCATION_DATA);
    
    if (detectedProdline) {
      setSelectedProdlineState(detectedProdline);
      setSelectedLocationState(selectedLocation);
      
      const locationIndex = TVBonusModel.LOCATION_DATA[detectedProdline].indexOf(selectedLocation);
      setRotationIndexState(locationIndex);
      
      // Set display time for selected location
      const locationData = TVBonusModel.getBonusDataByLocation(selectedLocation);
      const displayTime = TVBonusController.calculateLocationDisplayTime(locationData.length);
      setLocationDisplayTimeState(displayTime);
    }
    setIsLocationDropdownOpenState(false);
  }, []);

  // Handler: Pagination navigation
  const handlePageNavigation = useCallback((direction: 'prev' | 'next') => {
    const { totalPages } = TVBonusController.getPaginationData(currentPageState, bonusDataState.length);
    
    if (direction === 'prev') {
      setCurrentPageState(prevPage => Math.max(prevPage - 1, 1));
    } else {
      setCurrentPageState(prevPage => Math.min(prevPage + 1, totalPages));
    }
  }, [currentPageState, bonusDataState.length]);

  // Computed values using controller logic
  const paginationData = TVBonusController.getPaginationData(currentPageState, bonusDataState.length);
  const { totalPages, startIndex, endIndex } = paginationData;
  const currentTableData = bonusDataState.slice(startIndex, endIndex);

  // Performance styling helpers
  const getPerformanceDisplayClasses = (performance: number) => {
    return TVBonusController.getPerformanceClasses(performance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-2">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-grid">
          {/* Time & Shift */}
          <div className="time-shift-section">
            <div className="time-display">
              {currentTimeState.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })}
            </div>
            <div className="shift-badge">
              {currentShiftState}
            </div>
          </div>

          {/* Late Cases - Enhanced */}
          <div className="late-cases-section">
            <div className="late-cases-container">
              <div className="late-cases-content">
                <div className="late-cases-title">LATE CASES</div>
                <div className="late-cases-stats">
                  <div className="total-count">
                    <div className="total-count-number">{lateCaseDataState.totalCount}</div>
                    <div className="total-count-label">TOTAL</div>
                  </div>
                  <div className="divider"></div>
                  <div className="breakdown-stats">
                    <div className="breakdown-item">
                      <div className="breakdown-number one-day">{lateCaseDataState.oneDayCount}</div>
                      <div className="breakdown-label one-day-label">1D</div>
                    </div>
                    <div className="breakdown-item">
                      <div className="breakdown-number two-day">{lateCaseDataState.twoDaysCount}</div>
                      <div className="breakdown-label two-day-label">2D</div>
                    </div>
                    <div className="breakdown-item">
                      <div className="breakdown-number three-day">{lateCaseDataState.threeDaysCount + lateCaseDataState.moreThanThreeDaysCount}</div>
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
                  onClick={() => setIsLocationDropdownOpenState(!isLocationDropdownOpenState)}
                >
                  <span>{selectedLocationState}</span>
                  <svg 
                    className={`w-4 h-4 prodline-dropdown-icon ${isLocationDropdownOpenState ? 'prodline-dropdown-open' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isLocationDropdownOpenState && (
                  <div className="prodline-dropdown-menu">
                    {TVBonusModel.getAllLocationsByProdline().map(({ prodline, locations }) => (
                      <div key={prodline} className="prodline-group">
                        <div className="prodline-group-header">
                          {prodline}
                        </div>
                        {locations.map((location) => (
                          <div
                            key={location}
                            className="prodline-dropdown-item"
                            onClick={() => handleLocationSelection(location)}
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

          {/* Table Info - Slide display */}
          <div className="header-table-info">
            <div className="header-info-compact">
              <div className="header-info-item">
                <span className="header-info-label">LOCATIONS:</span>
                <span className="header-info-value">{TVBonusModel.LOCATION_DATA[selectedProdlineState]?.length || 0}</span>
              </div>
              <div className="header-info-separator">|</div>
              <div className="header-info-item">
                <span className="header-info-label">SLIDE:</span>
                <span className="header-info-value">{currentPageState}/{totalPages}</span>
              </div>
              <div className="header-info-separator">|</div>
              <div className="header-info-item">
                <span className="header-info-label">ROWS:</span>
                <span className="header-info-value">{bonusDataState.length}</span>
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
                      <span className="pagination-text">S{currentPageState}/{totalPages}</span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Table Content */}
        <div className="table-content">
          <div className="table-rows transition-all duration-500 ease-in-out">
            {currentTableData.map((tableRow, rowIndex) => (
              <div key={rowIndex} className="table-row animate-fade-in" style={{ animationDelay: `${rowIndex * 0.1}s` }}>
                <div className="table-row-grid">
                  {/* Tech Name */}
                  <div className="tech-name-column">
                    <div className="tech-name">{tableRow.tech}</div>
                    <div className="tech-skill">{tableRow.skillLevel}</div>
                  </div>
                  
                  {/* Metrics */}
                  <div className="metrics-column">
                    <div className="metric-item">
                      <div className="metric-value metric-target">{tableRow.target}</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value metric-current">{tableRow.curTarget}</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value metric-downtime">{tableRow.downtime}</div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-value metric-correction">{tableRow.correction}</div>
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="performance-column">
                    <div className={`performance-badge ${getPerformanceDisplayClasses(tableRow.performance).badgeClass}`}>
                      {tableRow.performance}%
                    </div>
                  </div>

                  {/* Position */}
                  <div className="position-column">
                    <div className="position-number">#{startIndex + rowIndex + 1}</div>
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