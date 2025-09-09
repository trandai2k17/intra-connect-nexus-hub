import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

// Transform data for Chart.js
const transformDataForChart = (data: any[]) => {
  const labels = data.map(item => item.location);
  
  return {
    labels,
    datasets: [
      {
        label: 'New',
        data: data.map(item => item.new),
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        borderWidth: 0,
      },
      {
        label: 'On-going',
        data: data.map(item => item.ongoing),
        backgroundColor: '#f59e0b',
        borderColor: '#f59e0b',
        borderWidth: 0,
      },
      {
        label: 'Complete',
        data: data.map(item => item.complete),
        backgroundColor: '#10b981',
        borderColor: '#10b981',
        borderWidth: 0,
      },
      {
        label: 'Cancel',
        data: data.map(item => item.cancel),
        backgroundColor: '#ef4444',
        borderColor: '#ef4444',
        borderWidth: 0,
      },
    ],
  };
};

// Chart options
const chartOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // We'll use custom legend
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        color: 'hsl(var(--foreground))',
        font: {
          size: 11,
        },
      },
    },
    y: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        color: 'hsl(var(--foreground))',
        font: {
          size: 11,
        },
      },
    },
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
  },
};

// Horizontal Bar Chart Component
const HorizontalBarChart = ({ data, title }: { data: any[], title: string }) => {
  const chartDataFormatted = transformDataForChart(data);

  return (
    <div className="space-y-4">
      <div className="text-center p-3 rounded-lg bg-muted/50">
        <h3 className="text-sm font-semibold">{title} Area Status Distribution</h3>
      </div>
      
      <div className="h-[350px] w-full">
        <Bar data={chartDataFormatted} options={chartOptions} />
      </div>

      {/* Custom Legend */}
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
};

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