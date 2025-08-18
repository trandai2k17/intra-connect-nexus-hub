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
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="bg-white shadow-sm rounded-lg mb-6 p-4">
        <div className="flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-2">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })}
            </h1>
            <Badge className="text-2xl px-4 py-2 bg-blue-500">
              {currentShift}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Late Case Summary */}
        <Card className="shadow-lg">
          <CardHeader className="bg-red-500 text-white text-center">
            <h2 className="text-3xl font-bold">Late Case</h2>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-5 gap-4 text-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-600">1 DAY</h3>
                <p className="text-6xl font-bold text-red-500">{lateCaseData.oneDayCount}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-600">2 DAYS</h3>
                <p className="text-6xl font-bold text-red-500">{lateCaseData.twoDaysCount}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-600">3 DAYS</h3>
                <p className="text-6xl font-bold text-red-500">{lateCaseData.threeDaysCount}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-600">&gt;3 DAYS</h3>
                <p className="text-6xl font-bold text-red-500">{lateCaseData.moreThanThreeDaysCount}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-600">ALL</h3>
                <p className="text-6xl font-bold text-red-600">{lateCaseData.totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prodline Summary */}
        <Card className="shadow-lg">
          <CardHeader className="bg-blue-500 text-white text-center">
            <h2 className="text-3xl font-bold">Prodline Summary</h2>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <h1 className="text-8xl font-bold text-blue-600 mb-8">CB</h1>
            <div className="transition-all duration-1000 ease-in-out">
              <h2 className="text-4xl font-bold text-red-500 animate-fade-in">
                {prodlineItems[currentProdline]}
              </h2>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bonus Summary Table */}
      <Card className="shadow-lg">
        <CardHeader className="bg-green-500 text-white">
          <h2 className="text-3xl font-bold text-center">Bonus Summary</h2>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-xl">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-4 px-6 font-bold">Tech</th>
                  <th className="text-left py-4 px-6 font-bold">Skill Level</th>
                  <th className="text-center py-4 px-6 font-bold">Target</th>
                  <th className="text-center py-4 px-6 font-bold">Unit</th>
                  <th className="text-center py-4 px-6 font-bold">Cur Target</th>
                  <th className="text-center py-4 px-6 font-bold">Downtime</th>
                  <th className="text-center py-4 px-6 font-bold">Correction/Redo</th>
                  <th className="text-center py-4 px-6 font-bold">Performance</th>
                </tr>
              </thead>
              <tbody>
                {bonusData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-6 px-6 font-semibold">{row.tech}</td>
                    <td className="py-6 px-6">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {row.skillLevel}
                      </Badge>
                    </td>
                    <td className="text-center py-6 px-6 font-bold text-2xl">{row.target}</td>
                    <td className="text-center py-6 px-6">{row.unit}</td>
                    <td className="text-center py-6 px-6 font-bold text-2xl">{row.curTarget}</td>
                    <td className="text-center py-6 px-6 font-bold text-2xl text-red-500">{row.downtime}</td>
                    <td className="text-center py-6 px-6 font-bold text-2xl text-orange-500">{row.correction}</td>
                    <td className="text-center py-6 px-6">
                      <Badge className={`text-2xl px-4 py-2 text-white ${getPerformanceBadge(row.performance)}`}>
                        {row.performance}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Running Text Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t shadow-lg">
        <div className="py-4 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-2xl font-bold text-red-600">
            <span className="mx-8">
              Cutoff Time/ Giờ cắt hàng - 13:30 &nbsp;&nbsp;&nbsp; 
              Impression arrival/ Dấu răng về - 22:30 &nbsp;&nbsp;&nbsp;
              Current Shift: {currentShift} &nbsp;&nbsp;&nbsp;
              Live Update: {currentTime.toLocaleString('vi-VN')}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}