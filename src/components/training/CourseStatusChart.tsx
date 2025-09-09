import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
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


export const CourseStatusChart = () => {
  const { t } = useLanguage();

  const renderAreaContent = (data: any[], areaName: string) => (
    <div className="space-y-4">
      {/* Column Chart */}
      <div className="w-full">
        <div className="text-center mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{areaName} Status Distribution</h3>
        </div>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <XAxis 
                dataKey="department" 
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="new" stackId="a" fill={chartConfig.new.color} />
              <Bar dataKey="ongoing" stackId="a" fill={chartConfig.ongoing.color} />
              <Bar dataKey="complete" stackId="a" fill={chartConfig.complete.color} />
              <Bar dataKey="cancel" stackId="a" fill={chartConfig.cancel.color} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {Object.entries(chartConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: config.color }}
              />
              <span className="text-xs font-medium">{config.label}</span>
            </div>
          ))}
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