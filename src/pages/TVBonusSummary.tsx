import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    if (performance >= 100) return "from-green-500 to-green-600";
    if (performance >= 90) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-2">
      {/* Compact Smart Header - All in one row */}
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl mb-2 p-4 border border-white/20">
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Time & Shift - 2 cols */}
          <div className="col-span-2 text-center">
            <div className="text-3xl font-bold text-gray-800">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })}
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm px-3 py-1 rounded-lg font-bold mt-1">
              {currentShift}
            </div>
          </div>

          {/* Late Cases - Horizontal Layout - 6 cols */}
          <div className="col-span-6">
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-3 border border-red-200/50">
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-red-700">LATE CASES</div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{lateCaseData.totalCount}</div>
                    <div className="text-xs text-red-500 font-medium">TOTAL</div>
                  </div>
                  <div className="h-8 w-px bg-red-300"></div>
                  <div className="flex space-x-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{lateCaseData.oneDayCount}</div>
                      <div className="text-xs text-orange-500">1D</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600">{lateCaseData.twoDaysCount}</div>
                      <div className="text-xs text-red-500">2D</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-700">{lateCaseData.threeDaysCount + lateCaseData.moreThanThreeDaysCount}</div>
                      <div className="text-xs text-red-700">3D+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prodline - 2 cols */}
          <div className="col-span-2">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 text-center border border-blue-200/50">
              <div className="text-sm font-bold text-blue-700 mb-1">PRODLINE</div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-2">
                <div className="text-2xl font-bold text-white animate-fade-in tracking-wider">
                  {prodlineItems[currentProdline]}
                </div>
              </div>
            </div>
          </div>

          {/* Date - 2 cols */}
          <div className="col-span-2 text-right">
            <div className="text-lg text-gray-600">{currentTime.toLocaleDateString('vi-VN')}</div>
          </div>
        </div>
      </div>

      {/* Smart Bonus Table - No Header, Direct Content */}
      <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-white/20">
        {/* Title Bar Only */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6">
          <h2 className="text-4xl font-bold text-center tracking-wide drop-shadow-lg">BONUS SUMMARY</h2>
        </div>
        
        {/* Direct Table Content - No redundant headers */}
        <div className="p-4">
          <div className="space-y-3">
            {bonusData.map((row, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Tech Name - 3 cols */}
                  <div className="col-span-3">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                      {row.tech}
                    </div>
                    <div className="text-sm bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1 rounded-lg font-medium inline-block mt-1">
                      {row.skillLevel}
                    </div>
                  </div>
                  
                  {/* Metrics Grid - 6 cols */}
                  <div className="col-span-6 grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">TARGET</div>
                      <div className="text-xl font-bold text-gray-700">{row.target}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">CURRENT</div>
                      <div className="text-xl font-bold text-green-600">{row.curTarget}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">DOWNTIME</div>
                      <div className="text-xl font-bold text-red-500">{row.downtime}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">CORRECTION</div>
                      <div className="text-xl font-bold text-orange-500">{row.correction}</div>
                    </div>
                  </div>

                  {/* Performance - 2 cols */}
                  <div className="col-span-2 text-center">
                    <div className={`inline-block text-2xl px-6 py-3 text-white font-bold rounded-xl shadow-lg bg-gradient-to-r ${getPerformanceBadge(row.performance)}`}>
                      {row.performance}%
                    </div>
                  </div>

                  {/* Position - 1 col */}
                  <div className="col-span-1 text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                      #{index + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Running Text Footer - Two Rows */}
      <footer className="fixed bottom-0 left-0 right-0 shadow-lg">
        {/* Cutoff Time Row */}
        <div className="bg-red-500/30 border-t border-red-400 h-12 overflow-hidden flex items-center">
          <div className="animate-marquee whitespace-nowrap text-2xl font-bold text-red-800">
            <span className="inline-block">
              🚨 Cutoff Time / Giờ cắt hàng - 13:30 🚨&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              🚨 Cutoff Time / Giờ cắt hàng - 13:30 🚨&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              🚨 Cutoff Time / Giờ cắt hàng - 13:30 🚨&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              🚨 Cutoff Time / Giờ cắt hàng - 13:30 🚨&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>
        
        {/* Impression Arrival Row */}
        <div className="bg-blue-500/30 border-t border-blue-400 h-12 overflow-hidden flex items-center">
          <div className="animate-marquee whitespace-nowrap text-2xl font-bold text-blue-800">
            <span className="inline-block">
              📦 Impression arrival / Dấu răng về - 22:30 📦&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              📦 Impression arrival / Dấu răng về - 22:30 📦&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              📦 Impression arrival / Dấu răng về - 22:30 📦&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              📦 Impression arrival / Dấu răng về - 22:30 📦&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}