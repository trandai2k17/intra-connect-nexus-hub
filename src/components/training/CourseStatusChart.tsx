import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

// Status colors configuration
const statusColors = {
  new: "#3b82f6",      // Blue
  ongoing: "#f59e0b",  // Orange
  complete: "#10b981", // Green
  cancel: "#ef4444"    // Red
};

// Sample data for each area
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

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-foreground">
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Status legend component
const StatusLegend = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors.new }} />
      <span className="text-xs font-medium text-foreground">New</span>
    </div>
    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors.ongoing }} />
      <span className="text-xs font-medium text-foreground">On-going</span>
    </div>
    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors.complete }} />
      <span className="text-xs font-medium text-foreground">Complete</span>
    </div>
    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors.cancel }} />
      <span className="text-xs font-medium text-foreground">Cancel</span>
    </div>
  </div>
);

// Horizontal chart component
const HorizontalChart = ({ data, areaName }: { data: any[], areaName: string }) => (
  <div className="space-y-4">
    {/* Chart Header */}
    <div className="text-center p-3 rounded-lg mb-4 bg-muted/50">
      <h3 className="text-sm font-semibold text-foreground">
        {areaName} Area Status Distribution
      </h3>
    </div>

    {/* Chart */}
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="horizontal"
          margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          barCategoryGap="20%"
        >
          <XAxis 
            type="number" 
            tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
            axisLine={false}
            tickLine={false}
            domain={[0, 'dataMax + 5']}
          />
          <YAxis 
            type="category" 
            dataKey="location"
            tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }}
            width={90}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Stacked bars for each status */}
          <Bar 
            dataKey="new" 
            stackId="a" 
            fill={statusColors.new}
            name="New"
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="ongoing" 
            stackId="a" 
            fill={statusColors.ongoing}
            name="On-going"
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="complete" 
            stackId="a" 
            fill={statusColors.complete}
            name="Complete"
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="cancel" 
            stackId="a" 
            fill={statusColors.cancel}
            name="Cancel"
            radius={[0, 2, 2, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Legend */}
    <StatusLegend />
  </div>
);

export const CourseStatusChart = () => {
  const { t } = useLanguage();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Course Status Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rpd" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger 
              value="rpd"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              RPD
            </TabsTrigger>
            <TabsTrigger 
              value="ng"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              NG
            </TabsTrigger>
            <TabsTrigger 
              value="cb"
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              CB
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="rpd" className="mt-6">
            <HorizontalChart data={chartData.rpd} areaName="RPD" />
          </TabsContent>
          
          <TabsContent value="ng" className="mt-6">
            <HorizontalChart data={chartData.ng} areaName="NG" />
          </TabsContent>
          
          <TabsContent value="cb" className="mt-6">
            <HorizontalChart data={chartData.cb} areaName="CB" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};