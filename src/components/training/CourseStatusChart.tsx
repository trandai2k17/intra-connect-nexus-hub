import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const chartConfig = {
  new: {
    label: "New",
    color: "hsl(217 91% 60%)", 
    bgColor: "hsl(217 91% 95%)",
  },
  ongoing: {
    label: "On-going", 
    color: "hsl(43 96% 56%)",
    bgColor: "hsl(43 96% 95%)",
  },
  complete: {
    label: "Complete",
    color: "hsl(142 76% 36%)",
    bgColor: "hsl(142 76% 95%)",
  },
  cancel: {
    label: "Cancel",
    color: "hsl(0 84% 60%)",
    bgColor: "hsl(0 84% 95%)",
  },
};

const tabColors = {
  rpd: { color: "hsl(217 91% 60%)", bgColor: "hsl(217 91% 95%)" },
  ng: { color: "hsl(142 76% 36%)", bgColor: "hsl(142 76% 95%)" },
  cb: { color: "hsl(262 83% 58%)", bgColor: "hsl(262 83% 95%)" },
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
      {/* Chart Header with Tab Color */}
      <div 
        className="text-center p-3 rounded-lg mb-4"
        style={{ 
          backgroundColor: tabColors[tabKey as keyof typeof tabColors].bgColor,
          borderLeft: `4px solid ${tabColors[tabKey as keyof typeof tabColors].color}`
        }}
      >
        <h3 
          className="text-sm font-semibold"
          style={{ color: tabColors[tabKey as keyof typeof tabColors].color }}
        >
          {areaName} Status Distribution
        </h3>
      </div>

      {/* Horizontal Bar Chart */}
      <div className="w-full">
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              layout="horizontal"
              margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
            >
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis 
                type="category"
                dataKey="department" 
                tick={{ fontSize: 10 }}
                width={75}
                tickFormatter={(value) => {
                  const parts = value.split('-');
                  return parts[parts.length - 1];
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="new" stackId="a" fill={chartConfig.new.color} />
              <Bar dataKey="ongoing" stackId="a" fill={chartConfig.ongoing.color} />
              <Bar dataKey="complete" stackId="a" fill={chartConfig.complete.color} />
              <Bar dataKey="cancel" stackId="a" fill={chartConfig.cancel.color} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Enhanced Legend with Status Colors */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {Object.entries(chartConfig).map(([key, config]) => (
            <div 
              key={key} 
              className="flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-md"
              style={{ 
                backgroundColor: config.bgColor,
                borderColor: config.color + "40"
              }}
            >
              <div 
                className="w-4 h-4 rounded-full shadow-sm" 
                style={{ backgroundColor: config.color }}
              />
              <span 
                className="text-sm font-medium"
                style={{ color: config.color }}
              >
                {config.label}
              </span>
            </div>
          ))}
        </div>

        {/* Location Labels with Colors */}
        <div className="mt-4 space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground mb-2">Locations:</h4>
          <div className="flex flex-wrap gap-2">
            {data.map((item, index) => (
              <div
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-all hover:shadow-sm"
                style={{
                  backgroundColor: tabColors[tabKey as keyof typeof tabColors].bgColor,
                  borderColor: tabColors[tabKey as keyof typeof tabColors].color + "60",
                  color: tabColors[tabKey as keyof typeof tabColors].color
                }}
              >
                {item.department.split('-')[1] || item.department}
              </div>
            ))}
          </div>
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
          <TabsList className="grid w-full grid-cols-3 bg-muted/30">
            <TabsTrigger 
              value="rpd"
              className="data-[state=active]:bg-[hsl(217_91%_60%)] data-[state=active]:text-white transition-all data-[state=active]:shadow-md"
            >
              RPD
            </TabsTrigger>
            <TabsTrigger 
              value="ng"
              className="data-[state=active]:bg-[hsl(142_76%_36%)] data-[state=active]:text-white transition-all data-[state=active]:shadow-md"
            >
              NG
            </TabsTrigger>
            <TabsTrigger 
              value="cb"
              className="data-[state=active]:bg-[hsl(262_83%_58%)] data-[state=active]:text-white transition-all data-[state=active]:shadow-md"
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