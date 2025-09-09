import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

// Data for each area
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

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: entry.color }} />
            <span>{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Horizontal Bar Chart Component
const HorizontalBarChart = ({ data, title }: { data: any[], title: string }) => (
  <div className="space-y-4">
    <div className="text-center p-3 rounded-lg bg-muted/50">
      <h3 className="text-sm font-semibold">{title} Area Status Distribution</h3>
    </div>
    
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="horizontal"
          margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
        >
          <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis 
            type="category" 
            dataKey="location" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11 }}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} />
          
          <Bar dataKey="new" stackId="a" fill="#3b82f6" name="New" />
          <Bar dataKey="ongoing" stackId="a" fill="#f59e0b" name="On-going" />
          <Bar dataKey="complete" stackId="a" fill="#10b981" name="Complete" />
          <Bar dataKey="cancel" stackId="a" fill="#ef4444" name="Cancel" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Legend */}
    <div className="grid grid-cols-4 gap-2 mt-4">
      <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
        <div className="w-3 h-3 rounded bg-blue-500" />
        <span className="text-xs font-medium">New</span>
      </div>
      <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
        <div className="w-3 h-3 rounded bg-orange-500" />
        <span className="text-xs font-medium">On-going</span>
      </div>
      <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
        <div className="w-3 h-3 rounded bg-green-500" />
        <span className="text-xs font-medium">Complete</span>
      </div>
      <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
        <div className="w-3 h-3 rounded bg-red-500" />
        <span className="text-xs font-medium">Cancel</span>
      </div>
    </div>
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
            <HorizontalBarChart data={chartData.rpd} title="RPD" />
          </TabsContent>
          
          <TabsContent value="ng" className="mt-6">
            <HorizontalBarChart data={chartData.ng} title="NG" />
          </TabsContent>
          
          <TabsContent value="cb" className="mt-6">
            <HorizontalBarChart data={chartData.cb} title="CB" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};