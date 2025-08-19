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

export default function TVBonusSummary() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentShift, setCurrentShift] = useState("S2");
  const [currentProdline, setCurrentProdline] = useState(0);
  const [bonusData] = useState<BonusData[]>(mockBonusData);
  const [lateCaseData] = useState<LateCaseData>(mockLateCaseData);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotate prodline display every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProdline((prev) => (prev + 1) % prodlineItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

          {/* Prodline - Enhanced */}
          <div className="prodline-section">
            <div className="prodline-container">
              <div className="prodline-title">PRODLINE</div>
              <div className="prodline-display">
                <div className="prodline-text">
                  {prodlineItems[currentProdline]}
                </div>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="date-section">
            <div className="date-display">{currentTime.toLocaleDateString('vi-VN')}</div>
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
            <div className="header-position">POS</div>
          </div>
        </div>
        
        {/* Table Content */}
        <div className="table-content">
          <div className="table-rows">
            {bonusData.map((row, index) => (
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
                    <div className="position-number">#{index + 1}</div>
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