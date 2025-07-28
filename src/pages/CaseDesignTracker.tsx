import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, User, Package, Truck, CheckCircle, AlertCircle, XCircle, Timer, Mail, AlertTriangle } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
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
    const matchesSearch = 
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || caseItem.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 px-6">
        <div className="container-fluid mx-auto">
          <h1 className="text-4xl font-bold mb-4">Case Design Tracker</h1>
          <p className="text-xl opacity-90">Monitor and track your dental case progress</p>
        </div>
      </div>

      <div className="container-fluid mx-auto px-6 py-8">
        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Cases</p>
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{cases.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Completed</p>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                    {cases.filter(c => c.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Pending</p>
                  <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">
                    {cases.filter(c => c.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">Errors</p>
                  <p className="text-3xl font-bold text-red-700 dark:text-red-300">
                    {cases.filter(c => c.status === 'error').length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Critical Metrics Mini Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Late Cases (>12h) */}
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Timer className="h-5 w-5 text-orange-500" />
                Late Cases (&gt;12h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {cases.filter(c => (c.turnaroundTime || 0) > 12).length}
                  </span>
                  <span className="text-sm text-orange-600 dark:text-orange-400">cases</span>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-orange-200 dark:border-orange-800">
                        <th className="text-left py-1 text-orange-600 dark:text-orange-400">Case ID</th>
                        <th className="text-left py-1 text-orange-600 dark:text-orange-400">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cases.filter(c => (c.turnaroundTime || 0) > 12).slice(0, 5).map(c => (
                        <tr key={c.id} className="hover:bg-orange-50 dark:hover:bg-orange-900/20">
                          <td className="py-1">{c.id}</td>
                          <td className="py-1">{c.turnaroundTime}h</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Urgent Cases (2h left) */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-purple-500" />
                Urgent (2h left)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {cases.filter(c => c.urgentDeadline && !c.translated).length}
                  </span>
                  <span className="text-sm text-purple-600 dark:text-purple-400">cases</span>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-purple-200 dark:border-purple-800">
                        <th className="text-left py-1 text-purple-600 dark:text-purple-400">Case ID</th>
                        <th className="text-left py-1 text-purple-600 dark:text-purple-400">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cases.filter(c => c.urgentDeadline && !c.translated).slice(0, 5).map(c => (
                        <tr key={c.id} className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
                          <td className="py-1">{c.id}</td>
                          <td className="py-1">Not translated</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Email */}
          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-5 w-5 text-indigo-500" />
                Pending Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                    {cases.filter(c => c.pendingEmail).length}
                  </span>
                  <span className="text-sm text-indigo-600 dark:text-indigo-400">cases</span>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-indigo-200 dark:border-indigo-800">
                        <th className="text-left py-1 text-indigo-600 dark:text-indigo-400">Case ID</th>
                        <th className="text-left py-1 text-indigo-600 dark:text-indigo-400">DateTime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cases.filter(c => c.pendingEmail).slice(0, 5).map(c => (
                        <tr key={c.id} className="hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                          <td className="py-1">{c.id}</td>
                          <td className="py-1">{c.createdDateTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart - Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Case Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
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
            </CardContent>
          </Card>

          {/* Line Chart - Weekly Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      name="Completed"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="pending" 
                      stroke="#eab308" 
                      strokeWidth={2}
                      name="Pending"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="error" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Error"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by case ID, patient name, or doctor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Cases Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Cases Overview ({filteredCases.length} cases)</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paginatedCases.map((caseItem) => (
                <Card key={caseItem.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedCase(caseItem)}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-semibold text-lg">{caseItem.id}</h3>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <p className="text-muted-foreground">Patient: {caseItem.patientName}</p>
                        <p className="text-muted-foreground">Doctor: {caseItem.doctorName}</p>
                        <p className="text-muted-foreground">3Shape: {caseItem.threeShapeStatus}</p>
                        <p className="text-muted-foreground">
                          Translation: {caseItem.translated ? 'Done' : 'Pending'}
                        </p>
                      </div>
                      {caseItem.createdDateTime && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Created: {new Date(caseItem.createdDateTime).toLocaleDateString()} 
                          {caseItem.transDate && ` • Transferred: ${new Date(caseItem.transDate).toLocaleDateString()}`}
                          {caseItem.shipDate && ` • Shipped: ${new Date(caseItem.shipDate).toLocaleDateString()}`}
                        </p>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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