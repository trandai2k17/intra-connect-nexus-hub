import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  
  for (let i = 1; i <= 50; i++) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Case Design Tracker</h1>
          <p className="text-xl opacity-90">Monitor and track your dental case progress</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
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
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {cases.filter(c => (c.turnaroundTime || 0) > 12).length}
                  </span>
                  <span className="text-sm text-orange-600 dark:text-orange-400">cases</span>
                </div>
                <div className="max-h-24 overflow-y-auto space-y-1">
                  {cases.filter(c => (c.turnaroundTime || 0) > 12).slice(0, 3).map(c => (
                    <div key={c.id} className="text-xs bg-orange-100 dark:bg-orange-900/30 p-2 rounded">
                      {c.id} - {c.turnaroundTime}h
                    </div>
                  ))}
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
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {cases.filter(c => c.urgentDeadline && !c.translated).length}
                  </span>
                  <span className="text-sm text-purple-600 dark:text-purple-400">cases</span>
                </div>
                <div className="max-h-24 overflow-y-auto space-y-1">
                  {cases.filter(c => c.urgentDeadline && !c.translated).slice(0, 3).map(c => (
                    <div key={c.id} className="text-xs bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                      {c.id} - Not translated
                    </div>
                  ))}
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
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                    {cases.filter(c => c.pendingEmail).length}
                  </span>
                  <span className="text-sm text-indigo-600 dark:text-indigo-400">cases</span>
                </div>
                <div className="max-h-24 overflow-y-auto space-y-1">
                  {cases.filter(c => c.pendingEmail).slice(0, 3).map(c => (
                    <div key={c.id} className="text-xs bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded">
                      {c.id} - Awaiting response
                    </div>
                  ))}
                </div>
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
            <CardTitle>Cases Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCases.map((caseItem) => (
                <Card key={caseItem.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedCase(caseItem)}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-semibold text-lg">{caseItem.id}</h3>
                        {getStatusBadge(caseItem.status)}
                      </div>
                      <p className="text-muted-foreground">Patient: {caseItem.patientName}</p>
                      <p className="text-muted-foreground">Doctor: {caseItem.doctorName}</p>
                      {caseItem.createdDateTime && (
                        <p className="text-sm text-muted-foreground">
                          Created: {new Date(caseItem.createdDateTime).toLocaleDateString()}
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