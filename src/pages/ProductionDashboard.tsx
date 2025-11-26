import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, TrendingUp, Target, AlertCircle } from "lucide-react";

// Mock data from the specification
const dashboardData = {
  METADATA: {
    ReportDate: "25-11-2025",
    DataTimestamp: "2025-11-25T14:30:00Z",
    UpdateFrequency: "5-10 minutes",
    ReportingPeriod: "01-Nov to 30-Nov",
    DaysInMonth: 30,
    DaysRemaining: 5,
  },
  SUMMARY_TOTAL: {
    TotalTargetMonthly: 134500,
    TotalTargetMTD_25Nov: 4511,
    TotalActualShipout: 2763,
    TotalShipoutAchieved: "61.2%",
  },
  AREAS: [
    {
      AreaName: "C&S",
      Priority: 1,
      Metrics: {
        Target_ShippedOut_Month: 94700,
        Target_Until_MTD_Units: 3151,
        Target_OTD_Display: "100%",
        Target_ExternalRemarks: "<= 4.0%",
        Actual_Shipout_Units: 2000,
        Actual_Shipout_Achieved_Percent: 63,
        Actual_OTD_by_Cases: 88,
        Actual_ExternalRemarks_by_Units: 4.0,
      },
      Status_Color: {
        Shipout_Color: "Red",
        OTD_Color: "Red",
        Remarks_Color: "Yellow",
      },
      Bonus_Eligibility_Status: "Pending (Not Met Shipout/OTD Thresholds)",
    },
    {
      AreaName: "RPD",
      Priority: 2,
      Metrics: {
        Target_ShippedOut_Month: 24100,
        Target_Until_MTD_Units: 803,
        Target_OTD_Display: "100%",
        Target_ExternalRemarks: "<= 4.0%",
        Actual_Shipout_Units: 700,
        Actual_Shipout_Achieved_Percent: 87,
        Actual_OTD_by_Cases: 89,
        Actual_ExternalRemarks_by_Units: 4.0,
      },
      Status_Color: {
        Shipout_Color: "Red",
        OTD_Color: "Red",
        Remarks_Color: "Yellow",
      },
      Bonus_Eligibility_Status: "Pending (Not Met Shipout/OTD Thresholds)",
    },
    {
      AreaName: "NG",
      Priority: 3,
      Metrics: {
        Target_ShippedOut_Month: 15700,
        Target_Until_MTD_Units: 557,
        Target_OTD_Display: "100%",
        Target_ExternalRemarks: "<= 4.0%",
        Actual_Shipout_Units: 63,
        Actual_Shipout_Achieved_Percent: 6,
        Actual_OTD_by_Cases: 88,
        Actual_ExternalRemarks_by_Units: 4.0,
      },
      Status_Color: {
        Shipout_Color: "Red",
        OTD_Color: "Red",
        Remarks_Color: "Yellow",
      },
      Bonus_Eligibility_Status: "Pending (Not Met Shipout/OTD Thresholds)",
    },
  ],
};

const getStatusColor = (color: string) => {
  switch (color.toLowerCase()) {
    case "green":
      return "text-green-500 bg-green-500/10 border-green-500/20";
    case "yellow":
      return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    case "red":
      return "text-red-500 bg-red-500/10 border-red-500/20";
    default:
      return "text-muted-foreground bg-muted border-border";
  }
};

const getProgressColor = (percent: number) => {
  if (percent >= 100) return "bg-green-500";
  if (percent >= 80) return "bg-yellow-500";
  return "bg-red-500";
};

export default function ProductionDashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Auto-rotate slides every 10 seconds (600000ms = 10 minutes for production)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 10000); // 10 seconds for demo, change to 600000 for production

    return () => clearInterval(slideInterval);
  }, []);

  // Update clock every second
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-8">
      {/* Header with Clock and Countdown */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-primary" />
            <div>
              <div className="text-4xl font-bold text-foreground">
                {formatTime(currentTime)}
              </div>
              <div className="text-sm text-muted-foreground">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-2 justify-end mb-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              {dashboardData.METADATA.DaysRemaining} Days Remaining
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Until End of Month
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-3 mb-6">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index
                ? "w-12 bg-primary"
                : "w-2 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Slide 1: Overview */}
      {currentSlide === 0 && (
        <div className="animate-fade-in">
          <Card className="bg-card/50 backdrop-blur-sm border-2 mb-6">
            <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-8">
              <h1 className="text-5xl font-bold text-foreground mb-2">
                TARGET vs ACTUAL PERFORMANCE
              </h1>
              <p className="text-xl text-muted-foreground">
                Dashboard C&S, RPD, NG - Monthly Overview
              </p>
            </div>
          </Card>

          {/* Key Targets */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 p-8">
              <div className="flex items-center gap-4 mb-4">
                <TrendingUp className="h-10 w-10 text-primary" />
                <div className="text-xl text-muted-foreground">
                  Target Shipped Out/Month
                </div>
              </div>
              <div className="text-6xl font-bold text-foreground">
                {dashboardData.SUMMARY_TOTAL.TotalTargetMonthly.toLocaleString()}
              </div>
              <div className="text-2xl text-muted-foreground mt-2">Units</div>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-2 border-green-500/20 p-8">
              <div className="flex items-center gap-4 mb-4">
                <Target className="h-10 w-10 text-green-500" />
                <div className="text-xl text-muted-foreground">OTD Target</div>
              </div>
              <div className="text-6xl font-bold text-green-500">100%</div>
              <div className="text-2xl text-muted-foreground mt-2">
                On-Time Delivery
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-2 border-blue-500/20 p-8">
              <div className="flex items-center gap-4 mb-4">
                <AlertCircle className="h-10 w-10 text-blue-500" />
                <div className="text-xl text-muted-foreground">
                  External Remarks
                </div>
              </div>
              <div className="text-6xl font-bold text-blue-500">≤ 4.0%</div>
              <div className="text-2xl text-muted-foreground mt-2">Target</div>
            </Card>
          </div>

          {/* Actual Summary */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Current Actual Performance
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {dashboardData.AREAS.map((area) => (
                <div
                  key={area.AreaName}
                  className={`p-6 rounded-lg border-2 ${getStatusColor(
                    area.Status_Color.Shipout_Color
                  )}`}
                >
                  <div className="text-3xl font-bold mb-2">{area.AreaName}</div>
                  <div className="text-5xl font-bold mb-2">
                    {area.Metrics.Actual_Shipout_Units.toLocaleString()}
                  </div>
                  <div className="text-xl text-muted-foreground">
                    Units Shipped
                  </div>
                  <Badge
                    className={`mt-4 ${getStatusColor(
                      area.Status_Color.Shipout_Color
                    )}`}
                  >
                    {area.Metrics.Actual_Shipout_Achieved_Percent}% Achieved
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Slide 2: Ship-out Progress */}
      {currentSlide === 1 && (
        <div className="animate-fade-in">
          <Card className="bg-card/50 backdrop-blur-sm border-2 mb-6">
            <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-8">
              <h1 className="text-5xl font-bold text-foreground mb-2">
                TIẾN ĐỘ XUẤT KHO HÔM NAY
              </h1>
              <p className="text-xl text-muted-foreground">
                Ship-out Progress - Real-time Tracking
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            {/* C&S - Takes 2x width */}
            <Card className="col-span-2 bg-card/50 backdrop-blur-sm border-2 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-bold text-foreground">
                  {dashboardData.AREAS[0].AreaName}
                </h2>
                <Badge
                  className={`text-2xl px-6 py-2 ${getStatusColor(
                    dashboardData.AREAS[0].Status_Color.Shipout_Color
                  )}`}
                >
                  {dashboardData.AREAS[0].Metrics.Actual_Shipout_Achieved_Percent}%
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <div className="text-xl text-muted-foreground mb-2">
                    Target MTD (Until Today)
                  </div>
                  <div className="text-5xl font-bold text-foreground">
                    {dashboardData.AREAS[0].Metrics.Target_Until_MTD_Units.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xl text-muted-foreground mb-2">
                    Actual Shipout
                  </div>
                  <div className="text-5xl font-bold text-foreground">
                    {dashboardData.AREAS[0].Metrics.Actual_Shipout_Units.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-bold text-foreground">
                    {dashboardData.AREAS[0].Metrics.Actual_Shipout_Units} /{" "}
                    {dashboardData.AREAS[0].Metrics.Target_Until_MTD_Units} Units
                  </span>
                </div>
                <div className="relative">
                  <Progress
                    value={dashboardData.AREAS[0].Metrics.Actual_Shipout_Achieved_Percent}
                    className="h-8"
                  />
                  <div
                    className={`absolute inset-0 h-8 rounded-full transition-all ${getProgressColor(
                      dashboardData.AREAS[0].Metrics.Actual_Shipout_Achieved_Percent
                    )}`}
                    style={{
                      width: `${Math.min(
                        dashboardData.AREAS[0].Metrics.Actual_Shipout_Achieved_Percent,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </Card>

            {/* RPD */}
            <Card className="bg-card/50 backdrop-blur-sm border-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-foreground">
                  {dashboardData.AREAS[1].AreaName}
                </h2>
                <Badge
                  className={`text-xl px-4 py-1 ${getStatusColor(
                    dashboardData.AREAS[1].Status_Color.Shipout_Color
                  )}`}
                >
                  {dashboardData.AREAS[1].Metrics.Actual_Shipout_Achieved_Percent}%
                </Badge>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-sm text-muted-foreground">Target MTD</div>
                  <div className="text-3xl font-bold text-foreground">
                    {dashboardData.AREAS[1].Metrics.Target_Until_MTD_Units.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Actual</div>
                  <div className="text-3xl font-bold text-foreground">
                    {dashboardData.AREAS[1].Metrics.Actual_Shipout_Units.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="relative">
                <Progress
                  value={dashboardData.AREAS[1].Metrics.Actual_Shipout_Achieved_Percent}
                  className="h-6"
                />
                <div
                  className={`absolute inset-0 h-6 rounded-full transition-all ${getProgressColor(
                    dashboardData.AREAS[1].Metrics.Actual_Shipout_Achieved_Percent
                  )}`}
                  style={{
                    width: `${Math.min(
                      dashboardData.AREAS[1].Metrics.Actual_Shipout_Achieved_Percent,
                      100
                    )}%`,
                  }}
                />
              </div>
            </Card>

            {/* NG */}
            <Card className="bg-card/50 backdrop-blur-sm border-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-foreground">
                  {dashboardData.AREAS[2].AreaName}
                </h2>
                <Badge
                  className={`text-xl px-4 py-1 ${getStatusColor(
                    dashboardData.AREAS[2].Status_Color.Shipout_Color
                  )}`}
                >
                  {dashboardData.AREAS[2].Metrics.Actual_Shipout_Achieved_Percent}%
                </Badge>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-sm text-muted-foreground">Target MTD</div>
                  <div className="text-3xl font-bold text-foreground">
                    {dashboardData.AREAS[2].Metrics.Target_Until_MTD_Units.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Actual</div>
                  <div className="text-3xl font-bold text-foreground">
                    {dashboardData.AREAS[2].Metrics.Actual_Shipout_Units.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="relative">
                <Progress
                  value={dashboardData.AREAS[2].Metrics.Actual_Shipout_Achieved_Percent}
                  className="h-6"
                />
                <div
                  className={`absolute inset-0 h-6 rounded-full transition-all ${getProgressColor(
                    dashboardData.AREAS[2].Metrics.Actual_Shipout_Achieved_Percent
                  )}`}
                  style={{
                    width: `${Math.min(
                      dashboardData.AREAS[2].Metrics.Actual_Shipout_Achieved_Percent,
                      100
                    )}%`,
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Slide 3: Quality & Bonus */}
      {currentSlide === 2 && (
        <div className="animate-fade-in">
          <Card className="bg-card/50 backdrop-blur-sm border-2 mb-6">
            <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-8">
              <h1 className="text-5xl font-bold text-foreground mb-2">
                CHẤT LƯỢNG VÀ TIẾN ĐỘ THƯỞNG
              </h1>
              <p className="text-xl text-muted-foreground">
                Quality Metrics & Bonus Tracker
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {dashboardData.AREAS.map((area) => (
              <Card
                key={area.AreaName}
                className="bg-card/50 backdrop-blur-sm border-2 p-6"
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {area.AreaName}
                </h2>

                {/* OTD */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg text-muted-foreground">
                      OTD (by cases)
                    </span>
                    <Badge
                      className={`${getStatusColor(area.Status_Color.OTD_Color)}`}
                    >
                      {area.Metrics.Actual_OTD_by_Cases}%
                    </Badge>
                  </div>
                  <div className="text-4xl font-bold text-foreground">
                    {area.Metrics.Actual_OTD_by_Cases}%
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Target: {area.Metrics.Target_OTD_Display}
                  </div>
                </div>

                {/* External Remarks */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg text-muted-foreground">
                      External Remarks
                    </span>
                    <Badge
                      className={`${getStatusColor(
                        area.Status_Color.Remarks_Color
                      )}`}
                    >
                      {area.Metrics.Actual_ExternalRemarks_by_Units}%
                    </Badge>
                  </div>
                  <div className="text-4xl font-bold text-foreground">
                    {area.Metrics.Actual_ExternalRemarks_by_Units}%
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Target: {area.Metrics.Target_ExternalRemarks}
                  </div>
                </div>

                {/* Bonus Status */}
                <div className="pt-4 border-t border-border">
                  <div className="text-sm font-semibold text-muted-foreground mb-2">
                    Bonus Status
                  </div>
                  <Badge className="text-xs bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                    Pending Confirmation
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Bonus Eligibility Notice */}
          <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-2 border-yellow-500/20 p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-10 w-10 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Bonus Matrix Confirmation Pending
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Final bonus calculation matrix and payout percentages are
                  awaiting HR/Finance confirmation (Deadline: November 29, 2025).
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">
                      Ship-out Threshold
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      ≥ 100%
                    </div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">
                      OTD Threshold
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      90-95%
                    </div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">
                      Remarks Threshold
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      ≤ 4.0%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Footer with motivational message */}
      <div className="mt-8 text-center">
        <p className="text-2xl font-semibold text-primary animate-pulse">
          🎯 Keep Pushing Forward - Excellence in Every Shipment! 🎯
        </p>
      </div>
    </div>
  );
}
