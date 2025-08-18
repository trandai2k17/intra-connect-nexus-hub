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
            
            {/* Modern Late Cases Card */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-xl p-6 border border-red-200/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                  LATE CASES
                </h3>
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-2xl px-4 py-2 font-bold rounded-xl shadow-lg">
                  {lateCaseData.totalCount}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all">
                  <div className="text-3xl font-bold text-orange-600">{lateCaseData.oneDayCount}</div>
                  <div className="text-sm text-orange-500 font-semibold tracking-wide">1 DAY</div>
                </div>
                <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all">
                  <div className="text-3xl font-bold text-red-600">{lateCaseData.twoDaysCount}</div>
                  <div className="text-sm text-red-500 font-semibold tracking-wide">2 DAYS</div>
                </div>
                <div className="bg-gradient-to-br from-red-200 to-red-300 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all">
                  <div className="text-3xl font-bold text-red-700">{lateCaseData.threeDaysCount + lateCaseData.moreThanThreeDaysCount}</div>
                  <div className="text-sm text-red-700 font-semibold tracking-wide">3+ DAYS</div>
                </div>
              </div>
            </div>
              
            {/* Enhanced Prodline Display */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl p-6 border border-blue-200/50 backdrop-blur-sm">
              <div className="text-center">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                  PRODLINE
                </h3>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 shadow-lg">
                  <p className="text-4xl font-bold text-white animate-fade-in tracking-wider drop-shadow-lg">
                    {prodlineItems[currentProdline]}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg text-gray-600">{currentTime.toLocaleDateString('vi-VN')}</p>
          </div>
        </div>
      </header>

      {/* Main Bonus Summary Table - Modern Design */}
      <Card className="shadow-2xl rounded-2xl overflow-hidden border-0">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4">
          <h2 className="text-5xl font-bold text-center tracking-wide drop-shadow-lg">BONUS SUMMARY</h2>
        </CardHeader>
        <CardContent className="p-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="overflow-x-auto">
            <table className="w-full text-2xl">
              <thead>
                <tr className="border-b-4 border-gray-300">
                  <th className="text-left py-8 px-6 font-bold text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200 first:rounded-l-xl">TECH NAME</th>
                  <th className="text-center py-8 px-6 font-bold text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200">SKILL</th>
                  <th className="text-center py-8 px-6 font-bold text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200">TARGET</th>
                  <th className="text-center py-8 px-6 font-bold text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200">CURRENT</th>
                  <th className="text-center py-8 px-6 font-bold text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200">DOWNTIME</th>
                  <th className="text-center py-8 px-6 font-bold text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200">CORRECTION</th>
                  <th className="text-center py-8 px-6 font-bold text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200">PERFORMANCE</th>
                  <th className="text-center py-8 px-6 font-bold text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200 last:rounded-r-xl">POSITION</th>
                </tr>
              </thead>
              <tbody>
                {bonusData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group">
                    <td className="py-10 px-6 font-bold text-3xl bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">{row.tech}</td>
                    <td className="py-10 px-6 text-center">
                      <div className="inline-block bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 text-xl px-6 py-3 font-semibold rounded-xl shadow-md border border-gray-300">
                        {row.skillLevel}
                      </div>
                    </td>
                    <td className="text-center py-10 px-6 font-bold text-3xl text-gray-700">{row.target}</td>
                    <td className="text-center py-10 px-6 font-bold text-3xl text-green-600">{row.curTarget}</td>
                    <td className="text-center py-10 px-6 font-bold text-3xl text-red-500">{row.downtime}</td>
                    <td className="text-center py-10 px-6 font-bold text-3xl text-orange-500">{row.correction}</td>
                    <td className="text-center py-10 px-6">
                      <div className={`inline-block text-3xl px-8 py-4 text-white font-bold rounded-xl shadow-lg ${getPerformanceBadge(row.performance)} bg-gradient-to-r`}>
                        {row.performance}%
                      </div>
                    </td>
                    <td className="text-center py-10 px-6 font-bold text-3xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
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