import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

const chartConfig = {
  new: {
    label: "New",
    color: "#3b82f6", 
  },
  ongoing: {
    label: "On-going", 
    color: "#f59e0b",
  },
  complete: {
    label: "Complete",
    color: "#10b981",
  },
  cancel: {
    label: "Cancel",
    color: "#ef4444",
  },
};

const tabColors = {
  rpd: "#3b82f6",
  ng: "#10b981", 
  cb: "#8b5cf6",
};

// Sample data for each area
const rpdData = [
  { department: "RPD-Design", new: 5, ongoing: 12, complete: 8, cancel: 2 },
  { department: "RPD-Production", new: 3, ongoing: 15, complete: 22, cancel: 1 },
  { department: "RPD-Quality", new: 7, ongoing: 8, complete: 18, cancel: 3 },
  { department: "RPD-Planning", new: 4, ongoing: 10, complete: 15, cancel: 2 },
];

const ngData = [
  { department: "NG-Block out", new: 6, ongoing: 9, complete: 14, cancel: 1 },
  { department: "NG-Final Co", new: 4, ongoing: 11, complete: 16, cancel: 2 },
  { department: "NG-Model", new: 8, ongoing: 7, complete: 12, cancel: 1 },
  { department: "NG-Quality", new: 3, ongoing: 13, complete: 19, cancel: 2 },
];

const cbData = [
  { department: "CB-Cam", new: 2, ongoing: 8, complete: 25, cancel: 1 },
  { department: "CB-Contour", new: 5, ongoing: 12, complete: 18, cancel: 2 },
  { department: "CB-Design", new: 7, ongoing: 15, complete: 20, cancel: 3 },
  { department: "CB-Final Filter", new: 3, ongoing: 9, complete: 22, cancel: 1 },
  { department: "CB-Metal", new: 4, ongoing: 11, complete: 16, cancel: 2 },
  { department: "CB-Pressing", new: 6, ongoing: 13, complete: 14, cancel: 1 },
];


export const CourseStatusChart = () => {
  const { t } = useLanguage();

  const renderAreaContent = (data: any[], areaName: string, tabKey: string) => (
    <div className="space-y-4">
      {/* Chart Header */}
      <div className="text-center p-3 rounded-lg mb-4 bg-muted/50">
        <h3 className="text-sm font-semibold text-foreground">
          {areaName} Status Distribution
        </h3>
      </div>

      {/* Horizontal Bar Chart */}
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="horizontal"
            margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
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
              dataKey="department" 
              tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }}
              width={110}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value.split('-')[1] || value}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ fill: 'hsl(var(--muted) / 0.1)' }}
            />
            <Bar 
              dataKey="new" 
              stackId="status" 
              fill={chartConfig.new.color}
              name={chartConfig.new.label}
            />
            <Bar 
              dataKey="ongoing" 
              stackId="status" 
              fill={chartConfig.ongoing.color}
              name={chartConfig.ongoing.label}
            />
            <Bar 
              dataKey="complete" 
              stackId="status" 
              fill={chartConfig.complete.color}
              name={chartConfig.complete.label}
            />
            <Bar 
              dataKey="cancel" 
              stackId="status" 
              fill={chartConfig.cancel.color}
              name={chartConfig.cancel.label}
            />
          </BarChart>
        </ResponsiveContainer>
        
        {/* Status Legend */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {Object.entries(chartConfig).map(([key, config]) => (
            <div 
              key={key} 
              className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: config.color }}
              />
              <span className="text-xs font-medium text-foreground">
                {config.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
            {renderAreaContent(rpdData, "RPD Area", "rpd")}
          </TabsContent>
          
          <TabsContent value="ng" className="mt-6">
            {renderAreaContent(ngData, "NG Area", "ng")}
          </TabsContent>
          
          <TabsContent value="cb" className="mt-6">
            {renderAreaContent(cbData, "CB Area", "cb")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};