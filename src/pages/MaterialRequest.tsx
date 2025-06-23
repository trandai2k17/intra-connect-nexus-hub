
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Printer, Save, Plus, History, FileText } from 'lucide-react';
import LoginForm from '@/components/material-request/LoginForm';
import LocationSelector from '@/components/material-request/LocationSelector';
import MaterialSelector from '@/components/material-request/MaterialSelector';
import PrintTemplate from '@/components/material-request/PrintTemplate';
import HistoryOrders from '@/components/material-request/HistoryOrders';

interface MaterialItem {
  id: string;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  notes: string;
  isFavorite: boolean;
}

interface RequestData {
  employeeId: string;
  employeeName: string;
  department: string;
  location: string;
  process: string;
  materials: MaterialItem[];
  requestDate: string;
  requestId: string;
}

const MaterialRequest = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('new-request');
  const [requestData, setRequestData] = useState<RequestData>({
    employeeId: '',
    employeeName: '',
    department: '',
    location: '',
    process: '',
    materials: [],
    requestDate: new Date().toISOString().split('T')[0],
    requestId: `REQ-${Date.now()}`
  });
  const [showPrint, setShowPrint] = useState(false);

  const handleLogin = (data: { employeeId: string; employeeName: string; department: string }) => {
    setRequestData(prev => ({
      ...prev,
      ...data
    }));
    setIsLoggedIn(true);
  };

  const handleLocationChange = (location: string, process: string) => {
    setRequestData(prev => ({
      ...prev,
      location,
      process
    }));
  };

  const handleMaterialAdd = (material: MaterialItem) => {
    setRequestData(prev => ({
      ...prev,
      materials: [...prev.materials, material]
    }));
  };

  const handleMaterialUpdate = (id: string, updates: Partial<MaterialItem>) => {
    setRequestData(prev => ({
      ...prev,
      materials: prev.materials.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  };

  const handleMaterialRemove = (id: string) => {
    setRequestData(prev => ({
      ...prev,
      materials: prev.materials.filter(item => item.id !== id)
    }));
  };

  const handleSave = () => {
    console.log('Saving request:', requestData);
    // Here you would typically save to database
    alert('Phiếu đã được lưu thành công!');
  };

  const handlePrint = () => {
    setShowPrint(true);
  };

  if (showPrint) {
    return <PrintTemplate data={requestData} onClose={() => setShowPrint(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-brand-gradient mb-2">
              Online Material Request
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Hệ thống yêu cầu nguyên vật liệu trực tuyến
            </p>
          </div>

          {!isLoggedIn ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <div className="space-y-6">
              {/* Employee Info Card */}
              <Card className="bg-glass border-white/20 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Thông tin nhân viên
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mã nhân viên</label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{requestData.employeeId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tên nhân viên</label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{requestData.employeeName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bộ phận</label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{requestData.department}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Main Content Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="new-request" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Tạo phiếu mới
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center gap-2">
                    <History className="w-4 h-4" />
                    Lịch sử order
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="new-request" className="space-y-6 mt-6">
                  {/* Location Selection */}
                  <LocationSelector 
                    onLocationChange={handleLocationChange}
                    selectedLocation={requestData.location}
                    selectedProcess={requestData.process}
                  />

                  {/* Material Selection */}
                  <MaterialSelector
                    materials={requestData.materials}
                    onMaterialAdd={handleMaterialAdd}
                    onMaterialUpdate={handleMaterialUpdate}
                    onMaterialRemove={handleMaterialRemove}
                  />

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-end">
                    <Button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Lưu phiếu
                    </Button>
                    <Button
                      onClick={handlePrint}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      In phiếu
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-6">
                  <HistoryOrders employeeId={requestData.employeeId} />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialRequest;
