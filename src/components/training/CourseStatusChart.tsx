import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

const chartConfig = {
  new: {
    label: "New",
    color: "hsl(var(--chart-1))",
  },
  ongoing: {
    label: "On-going", 
    color: "hsl(var(--chart-2))",
  },
  complete: {
    label: "Complete",
    color: "hsl(var(--chart-3))",
  },
  cancel: {
    label: "Cancel",
    color: "hsl(var(--chart-4))",
  },
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

// Calculate summary data for pie charts
const calculateSummary = (data: any[]) => {
  const summary = data.reduce((acc, item) => {
    acc.new += item.new;
    acc.ongoing += item.ongoing;
    acc.complete += item.complete;
    acc.cancel += item.cancel;
    return acc;
  }, { new: 0, ongoing: 0, complete: 0, cancel: 0 });

  return [
    { name: "New", value: summary.new, fill: chartConfig.new.color },
    { name: "On-going", value: summary.ongoing, fill: chartConfig.ongoing.color },
    { name: "Complete", value: summary.complete, fill: chartConfig.complete.color },
    { name: "Cancel", value: summary.cancel, fill: chartConfig.cancel.color },
  ];
};

export const CourseStatusChart = () => {
  const { t } = useLanguage();

  const renderAreaContent = (data: any[], areaName: string) => (
    <div className="space-y-4">
      {/* Pie Chart Overview */}
      <div className="w-full">
        <div className="text-center mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{areaName} Overview</h3>
        </div>
        <ChartContainer config={chartConfig} className="h-[250px] mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={calculateSummary(data)}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {calculateSummary(data).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {Object.entries(chartConfig).map(([key, config]) => {
            const summary = calculateSummary(data);
            const statusData = summary.find(item => item.name.toLowerCase().replace('-', '') === key);
            return (
              <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="text-xs font-medium">{config.label}</span>
                </div>
                <span className="text-xs font-semibold">{statusData?.value || 0}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Course Status Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rpd" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rpd">RPD</TabsTrigger>
            <TabsTrigger value="ng">NG</TabsTrigger>
            <TabsTrigger value="cb">CB</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rpd" className="mt-6">
            {renderAreaContent(rpdData, "RPD Area")}
          </TabsContent>
          
          <TabsContent value="ng" className="mt-6">
            {renderAreaContent(ngData, "NG Area")}
          </TabsContent>
          
          <TabsContent value="cb" className="mt-6">
            {renderAreaContent(cbData, "CB Area")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};