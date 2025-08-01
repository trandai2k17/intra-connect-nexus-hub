import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, User, Package, Truck, CheckCircle, AlertCircle, XCircle, Timer, Mail, AlertTriangle, CalendarDays } from 'lucide-react';

interface CaseData {
  id: string;
  patientName: string;
  doctorName: string;
  createdDateTime?: string;
  finished?: boolean;
  threeShapeStatus?: string;
  transDate?: string;
  shipDate?: string;
  status: 'pending' | 'completed' | 'error';
  turnaroundTime?: number; // in hours
  translated?: boolean;
  pendingEmail?: boolean;
  urgentDeadline?: boolean; // 2h left to complete
}

// Generate more realistic mock data for high-volume tracking
const generateMockCases = (): CaseData[] => {
  const cases: CaseData[] = [];
  const patients = ["Nguyễn Văn A", "Lê Thị B", "Trần Minh C", "Phạm Thu D", "Hoàng Văn E", "Đỗ Thị F", "Bùi Minh G", "Vũ Thu H"];
  const doctors = ["Dr. Trần Thị B", "Dr. Phạm Văn D", "Dr. Ngô Thị F", "Dr. Lê Minh H", "Dr. Hoàng Thu I"];
  
  for (let i = 1; i <= 1000; i++) {
    const turnaroundTime = Math.floor(Math.random() * 24) + 1;
    const isLate = turnaroundTime > 12;
    const isUrgent = turnaroundTime > 10 && Math.random() > 0.7;
    const needsTranslation = Math.random() > 0.6;
    const pendingEmail = Math.random() > 0.8;
    
    cases.push({
      id: `CASE${String(i).padStart(3, '0')}`,
      patientName: patients[Math.floor(Math.random() * patients.length)],
      doctorName: doctors[Math.floor(Math.random() * doctors.length)],
      createdDateTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      finished: Math.random() > 0.4,
      threeShapeStatus: ["Completed", "In Progress", "Error", "Pending"][Math.floor(Math.random() * 4)],
      transDate: Math.random() > 0.5 ? new Date().toISOString().split('T')[0] : undefined,
      shipDate: Math.random() > 0.7 ? new Date().toISOString().split('T')[0] : undefined,
      status: Math.random() > 0.7 ? 'completed' : Math.random() > 0.8 ? 'error' : 'pending',
      turnaroundTime,
      translated: !needsTranslation,
      pendingEmail,
      urgentDeadline: isUrgent
    });
  }
  return cases;
};

const mockCases: CaseData[] = generateMockCases();

export default function CaseDesignTracker() {
  const { t } = useLanguage();
  const [cases, setCases] = useState<CaseData[]>(mockCases);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [chartIndex, setChartIndex] = useState(0);
  const itemsPerPage = 20;

  const getStageStatus = (stage: string, caseData: CaseData) => {
    switch(stage) {
      case 'created':
        return caseData.createdDateTime ? 'completed' : 'empty';
      case 'design':
        if (caseData.threeShapeStatus === 'Error') return 'error';
        return caseData.finished ? 'completed' : 'pending';
      case 'sent':
        return caseData.transDate ? 'completed' : 'pending';
      case 'transfer':
        return caseData.transDate ? 'completed' : 'pending';
      case 'shipping':
        return caseData.shipDate ? 'completed' : 'pending';
      default:
        return 'pending';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-300" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      pending: 'secondary',
      error: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status === 'completed' ? 'Completed' : 
         status === 'pending' ? 'Pending' : 
         status === 'error' ? 'Error' : 'Unknown'}
      </Badge>
    );
  };

  const renderCompactTimeline = (caseData: CaseData) => {
    const stages = [
      { key: 'created', label: 'Create', icon: User },
      { key: 'design', label: 'Design', icon: Package },
      { key: 'sent', label: 'Sent', icon: Calendar },
      { key: 'transfer', label: 'Transfer', icon: Package },
      { key: 'shipping', label: 'Shipping', icon: Truck }
    ];

    return (
      <div className="flex items-center justify-between w-full mt-3">
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.key, caseData);
          const Icon = stage.icon;
          
          return (
            <div key={stage.key} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300
                  ${status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                    status === 'error' ? 'bg-red-500 border-red-500 text-white' :
                    status === 'pending' ? 'bg-yellow-500 border-yellow-500 text-white' :
                    'bg-gray-200 border-gray-300 text-gray-400'}
                `}>
                  <Icon className="h-3 w-3" />
                </div>
                <span className="text-xs font-medium mt-1 text-center">
                  {stage.label}
                </span>
              </div>
              
              {index < stages.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-2 transition-all duration-300
                  ${getStageStatus(stages[index + 1].key, caseData) !== 'empty' ? 
                    'bg-green-500' : 'bg-gray-300'}
                `} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderTimeline = (caseData: CaseData) => {
    const stages = [
      { key: 'created', label: 'Create', icon: User },
      { key: 'design', label: 'Design', icon: Package },
      { key: 'sent', label: 'Sent', icon: Calendar },
      { key: 'transfer', label: 'Transfer', icon: Package },
      { key: 'shipping', label: 'Shipping', icon: Truck }
    ];

    return (
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto mt-6">
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.key, caseData);
          const Icon = stage.icon;
          
          return (
            <div key={stage.key} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                    status === 'error' ? 'bg-red-500 border-red-500 text-white' :
                    status === 'pending' ? 'bg-yellow-500 border-yellow-500 text-white' :
                    'bg-gray-200 border-gray-300 text-gray-400'}
                `}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium mt-2 text-center">
                  {stage.label}
                </span>
              </div>
              
              {index < stages.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-4 transition-all duration-300
                  ${getStageStatus(stages[index + 1].key, caseData) !== 'empty' ? 
                    'bg-green-500' : 'bg-gray-300'}
                `} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const filteredCases = cases.filter(caseItem => {
    // Apply date filter if dates are selected
    if (dateFrom && caseItem.createdDateTime) {
      if (new Date(caseItem.createdDateTime) < new Date(dateFrom)) return false;
    }
    if (dateTo && caseItem.createdDateTime) {
      if (new Date(caseItem.createdDateTime) > new Date(dateTo)) return false;
    }
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCases = filteredCases.slice(startIndex, startIndex + itemsPerPage);

  // Chart data
  const statusData = [
    { name: 'Completed', value: cases.filter(c => c.status === 'completed').length, color: '#22c55e' },
    { name: 'Pending', value: cases.filter(c => c.status === 'pending').length, color: '#eab308' },
    { name: 'Error', value: cases.filter(c => c.status === 'error').length, color: '#ef4444' }
  ];

  const performanceData = [
    { name: 'Mon', completed: 120, pending: 80, error: 10 },
    { name: 'Tue', completed: 140, pending: 60, error: 15 },
    { name: 'Wed', completed: 110, pending: 90, error: 8 },
    { name: 'Thu', completed: 160, pending: 70, error: 12 },
    { name: 'Fri', completed: 130, pending: 85, error: 18 },
    { name: 'Sat', completed: 90, pending: 40, error: 5 },
    { name: 'Sun', completed: 70, pending: 30, error: 3 }
  ];

  // Auto-rotate chart every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setChartIndex(prev => prev === 0 ? 1 : 0);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container-fluid mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Compact Top Row: Stats + Date Filter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4 mb-4">
          {/* Main Stats - Mobile 2x2 grid, then responsive */}
          <Card className="col-span-1 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
            <CardContent className="p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                <div>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Total</p>
                  <p className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-300">{cases.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200">
            <CardContent className="p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                <div>
                  <p className="text-xs font-medium text-green-600 dark:text-green-400">Done</p>
                  <p className="text-lg sm:text-xl font-bold text-green-700 dark:text-green-300">
                    {cases.filter(c => c.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200">
            <CardContent className="p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                <div>
                  <p className="text-xs font-medium text-yellow-600 dark:text-yellow-400">Pending</p>
                  <p className="text-lg sm:text-xl font-bold text-yellow-700 dark:text-yellow-300">
                    {cases.filter(c => c.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200">
            <CardContent className="p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                <div>
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">Errors</p>
                  <p className="text-lg sm:text-xl font-bold text-red-700 dark:text-red-300">
                    {cases.filter(c => c.status === 'error').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Filter Section - Full width on mobile */}
          <Card className="col-span-2 xl:col-span-2">
            <CardContent className="p-2 sm:p-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                <div className="flex items-center gap-2 flex-1 w-full">
                  <Input
                    type="date"
                    placeholder="From"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="text-xs h-8 flex-1"
                  />
                  <span className="text-xs text-muted-foreground">to</span>
                  <Input
                    type="date"
                    placeholder="To"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="text-xs h-8 flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compact Critical Metrics + Charts in responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4 mb-4">
          {/* Priority Action Items - Elegant and Prominent */}
          
          {/* URGENT - Critical Cases Need Translation */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-red-50/80 to-rose-50/80 dark:from-red-900/10 dark:to-rose-900/10 border border-red-200/60 dark:border-red-800/30 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">Urgent Translation</p>
                  <p className="text-2xl sm:text-3xl font-bold text-red-800 dark:text-red-200">
                    {cases.filter(c => c.urgentDeadline && !c.translated).length}
                  </p>
                </div>
              </div>
              <div className="max-h-20 sm:max-h-24 overflow-y-auto space-y-2">
                {cases.filter(c => c.urgentDeadline && !c.translated).slice(0, 4).map(c => (
                  <div key={c.id} className="bg-white/70 dark:bg-red-950/20 p-2.5 rounded-md border-l-3 border-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/10 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-red-900 dark:text-red-100">{c.id}</span>
                      <span className="text-red-600 dark:text-red-400 text-sm font-medium">{c.turnaroundTime}h</span>
                    </div>
                    <div className="text-sm text-red-700 dark:text-red-300 mt-0.5">{c.patientName}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* LATE CASES - High Priority */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-900/10 dark:to-amber-900/10 border border-orange-200/60 dark:border-orange-800/30 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                  <Timer className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-700 dark:text-orange-300 uppercase tracking-wide">Overdue Cases</p>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-800 dark:text-orange-200">
                    {cases.filter(c => (c.turnaroundTime || 0) > 12).length}
                  </p>
                </div>
              </div>
              <div className="max-h-20 sm:max-h-24 overflow-y-auto space-y-2">
                {cases.filter(c => (c.turnaroundTime || 0) > 12).slice(0, 4).map(c => (
                  <div key={c.id} className="bg-white/70 dark:bg-orange-950/20 p-2.5 rounded-md border-l-3 border-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-orange-900 dark:text-orange-100">{c.id}</span>
                      <span className="text-orange-600 dark:text-orange-400 text-sm font-medium">{c.turnaroundTime}h</span>
                    </div>
                    <div className="text-sm text-orange-700 dark:text-orange-300 mt-0.5">{c.patientName}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Email Follow-ups */}
          <Card className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-200/60 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">Email Pending</p>
                  <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
                    {cases.filter(c => c.pendingEmail).length}
                  </p>
                </div>
              </div>
              <div className="max-h-16 sm:max-h-20 overflow-y-auto space-y-1">
                {cases.filter(c => c.pendingEmail).slice(0, 3).map(c => (
                  <div key={c.id} className="bg-white/70 dark:bg-blue-950/20 p-2 rounded border-l-2 border-blue-300 text-sm hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                    <span className="font-medium text-blue-900 dark:text-blue-100">{c.id}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chart Carousel with Flip Animation */}
          <Card className="sm:col-span-2 lg:col-span-2 relative overflow-hidden">
            <CardContent className="p-2 sm:p-3">
              <div className="h-32 sm:h-40 relative">
                {/* Chart transition container */}
                <div className="absolute inset-0 transition-transform duration-700 ease-in-out"
                     style={{ 
                       transform: chartIndex === 0 ? 'rotateY(0deg)' : 'rotateY(180deg)',
                       transformStyle: 'preserve-3d'
                     }}>
                  {/* Front side - Pie Chart */}
                  <div className="absolute inset-0 backface-hidden"
                       style={{ backfaceVisibility: 'hidden' }}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs sm:text-sm font-medium">Status Distribution</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setChartIndex(1)}
                        className="h-5 w-5 sm:h-6 sm:w-6 p-0 text-xs"
                      >
                        ↻
                      </Button>
                    </div>
                    <ResponsiveContainer width="100%" height="85%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={window.innerWidth < 640 ? 30 : 45}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Back side - Line Chart */}
                  <div className="absolute inset-0 backface-hidden"
                       style={{ 
                         backfaceVisibility: 'hidden',
                         transform: 'rotateY(180deg)'
                       }}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs sm:text-sm font-medium">Weekly Trend</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setChartIndex(0)}
                        className="h-5 w-5 sm:h-6 sm:w-6 p-0 text-xs"
                      >
                        ↻
                      </Button>
                    </div>
                    <ResponsiveContainer width="100%" height="85%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" fontSize={8} />
                        <YAxis fontSize={8} />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="completed" 
                          stroke="#22c55e" 
                          strokeWidth={1.5}
                          name="Completed"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="pending" 
                          stroke="#eab308" 
                          strokeWidth={1.5}
                          name="Pending"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="error" 
                          stroke="#ef4444" 
                          strokeWidth={1.5}
                          name="Error"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cases Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <CardTitle className="text-base sm:text-lg">Cases Overview ({filteredCases.length})</CardTitle>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="space-y-2 sm:space-y-4">
              {paginatedCases.map((caseItem) => (
                <Card key={caseItem.id} className="p-2 sm:p-3 hover:shadow-md transition-shadow">
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-3">
                        <h3 className="font-semibold text-base sm:text-lg">{caseItem.id}</h3>
                        {getStatusBadge(caseItem.status)}
                        {(caseItem.turnaroundTime || 0) > 12 && (
                          <Badge variant="destructive" className="text-xs">
                            Late ({caseItem.turnaroundTime}h)
                          </Badge>
                        )}
                        {caseItem.urgentDeadline && (
                          <Badge variant="outline" className="text-xs border-purple-500 text-purple-600">
                            Urgent
                          </Badge>
                        )}
                        {caseItem.pendingEmail && (
                          <Badge variant="outline" className="text-xs border-indigo-500 text-indigo-600">
                            Email
                          </Badge>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCase(caseItem)}
                        className="text-xs h-7 sm:h-8"
                      >
                        Details
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs sm:text-sm">
                      <div>
                        <span className="text-muted-foreground">Patient:</span>
                        <p className="font-medium truncate">{caseItem.patientName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Doctor:</span>
                        <p className="font-medium truncate">{caseItem.doctorName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">3Shape:</span>
                        <p className="font-medium">{caseItem.threeShapeStatus}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Translation:</span>
                        <p className="font-medium">{caseItem.translated ? 'Done' : 'Pending'}</p>
                      </div>
                    </div>
                    
                    {caseItem.createdDateTime && (
                      <div className="text-xs text-muted-foreground">
                        Created: {new Date(caseItem.createdDateTime).toLocaleDateString()} 
                        {caseItem.transDate && ` • Trans: ${new Date(caseItem.transDate).toLocaleDateString()}`}
                        {caseItem.shipDate && ` • Ship: ${new Date(caseItem.shipDate).toLocaleDateString()}`}
                      </div>
                    )}
                    
                    {/* Compact Timeline - smaller on mobile */}
                    <div className="mt-2">
                      {renderCompactTimeline(caseItem)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="px-2">...</span>
                      <Button
                        variant={currentPage === totalPages ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Case Detail Modal */}
        {selectedCase && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
               onClick={() => setSelectedCase(null)}>
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Case Details: {selectedCase.id}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCase(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Patient Name:</p>
                      <p className="text-muted-foreground">{selectedCase.patientName}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Doctor Name:</p>
                      <p className="text-muted-foreground">{selectedCase.doctorName}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Status:</p>
                      {getStatusBadge(selectedCase.status)}
                    </div>
                    <div>
                      <p className="font-semibold">3Shape Status:</p>
                      <p className="text-muted-foreground">{selectedCase.threeShapeStatus || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Progress Timeline</h3>
                    {renderTimeline(selectedCase)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}