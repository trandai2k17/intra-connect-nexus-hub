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
    if (performance >= 100) return "bg-green-500";
    if (performance >= 90) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      {/* Compact Header */}
      <header className="bg-white shadow-sm rounded-lg mb-3 p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </h1>
              <Badge className="text-lg px-3 py-1 bg-blue-500">
                {currentShift}
              </Badge>
            </div>
            {/* Compact Late Case */}
            <div className="flex space-x-8">
              {/* Late Cases with detailed breakdown */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Late Cases</p>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="text-3xl font-bold text-red-600">{lateCaseData.totalCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-orange-500">1D</p>
                    <p className="text-xl font-bold text-orange-500">{lateCaseData.oneDayCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-red-500">2D</p>
                    <p className="text-xl font-bold text-red-500">{lateCaseData.twoDaysCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-red-700">3D+</p>
                    <p className="text-xl font-bold text-red-700">{lateCaseData.threeDaysCount + lateCaseData.moreThanThreeDaysCount}</p>
                  </div>
                </div>
              </div>
              
              {/* Prodline with larger text */}
              <div className="text-center">
                <p className="text-sm text-gray-600">Prodline</p>
                <p className="text-4xl font-bold text-blue-600 animate-fade-in">
                  {prodlineItems[currentProdline]}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg text-gray-600">{currentTime.toLocaleDateString('vi-VN')}</p>
          </div>
        </div>
      </header>

      {/* Main Bonus Summary Table - Full Focus */}
      <Card className="shadow-lg">
        <CardHeader className="bg-green-500 text-white py-3">
          <h2 className="text-4xl font-bold text-center">BONUS SUMMARY</h2>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-2xl">
              <thead>
                <tr className="border-b-3 border-gray-400 bg-gray-50">
                  <th className="text-left py-6 px-4 font-bold text-gray-800">TECH NAME</th>
                  <th className="text-center py-6 px-4 font-bold text-gray-800">SKILL</th>
                  <th className="text-center py-6 px-4 font-bold text-gray-800">TARGET</th>
                  <th className="text-center py-6 px-4 font-bold text-gray-800">CURRENT</th>
                  <th className="text-center py-6 px-4 font-bold text-gray-800">DOWNTIME</th>
                  <th className="text-center py-6 px-4 font-bold text-gray-800">CORRECTION</th>
                  <th className="text-center py-6 px-4 font-bold text-gray-800">PERFORMANCE</th>
                  <th className="text-center py-6 px-4 font-bold text-gray-800">POSITION</th>
                </tr>
              </thead>
              <tbody>
                {bonusData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="py-8 px-4 font-bold text-3xl text-blue-900">{row.tech}</td>
                    <td className="py-8 px-4 text-center">
                      <Badge variant="outline" className="text-xl px-4 py-2 font-semibold">
                        {row.skillLevel}
                      </Badge>
                    </td>
                    <td className="text-center py-8 px-4 font-bold text-3xl text-gray-700">{row.target}</td>
                    <td className="text-center py-8 px-4 font-bold text-3xl text-green-600">{row.curTarget}</td>
                    <td className="text-center py-8 px-4 font-bold text-3xl text-red-500">{row.downtime}</td>
                    <td className="text-center py-8 px-4 font-bold text-3xl text-orange-500">{row.correction}</td>
                    <td className="text-center py-8 px-4">
                      <Badge className={`text-3xl px-6 py-3 text-white font-bold ${getPerformanceBadge(row.performance)}`}>
                        {row.performance}%
                      </Badge>
                    </td>
                    <td className="text-center py-8 px-4 font-bold text-2xl text-purple-600">
                      #{index + 1}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

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