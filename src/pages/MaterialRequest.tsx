import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, Save, Plus, History, FileText, Eye, ChevronLeft, RotateCcw, Trash2 } from 'lucide-react';
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
  const [viewingOrder, setViewingOrder] = useState<RequestData | null>(null);

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

  const handleViewOrder = (orderData: RequestData) => {
    setViewingOrder(orderData);
  };

  const handleBackToNewRequest = () => {
    setViewingOrder(null);
  };

  const handleNewRequest = () => {
    setRequestData(prev => ({
      ...prev,
      location: '',
      process: '',
      materials: [],
      requestDate: new Date().toISOString().split('T')[0],
      requestId: `REQ-${Date.now()}`
    }));
    setViewingOrder(null);
  };

  const handleDeleteRequest = () => {
    if (confirm('Bạn có chắc chắn muốn xóa phiếu này không?')) {
      // Here you would typically delete from database
      console.log('Deleting request:', requestData.requestId);
      handleNewRequest(); // Reset to new request after delete
      alert('Phiếu đã được xóa thành công!');
    }
  };

  if (showPrint) {
    return <PrintTemplate data={viewingOrder || requestData} onClose={() => setShowPrint(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-fluid px-3 py-4">
        <div className="max-w-full mx-auto">
          {/* Header */}
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-bold text-brand-gradient mb-1">
              Online Material Request
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Hệ thống yêu cầu nguyên vật liệu trực tuyến
            </p>
          </div>

          {!isLoggedIn ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-140px)]">
              {/* Left Sidebar - History Orders */}
              <div className="lg:col-span-1">
                <Card className="bg-glass border-white/20 shadow-xl h-full flex flex-col">
                  <CardHeader className="pb-3 flex-shrink-0">
                    <CardTitle className="text-indigo-600 dark:text-indigo-400 flex items-center gap-2 text-sm">
                      <History className="w-4 h-4" />
                      Lịch sử order
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden">
                    <HistoryOrders 
                      employeeId={requestData.employeeId} 
                      onViewOrder={handleViewOrder}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Main Content - Request Form or Order View */}
              <div className="lg:col-span-3 space-y-4 h-full flex flex-col">
                {/* Employee Info Card with Action Buttons */}
                <Card className="bg-glass border-white/20 shadow-xl flex-shrink-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-blue-600 dark:text-blue-400 flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Thông tin nhân viên
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Mã nhân viên</label>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{requestData.employeeId}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Tên nhân viên</label>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{requestData.employeeName}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Bộ phận</label>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{requestData.department}</p>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 justify-end pt-2 border-t">
                      <Button
                        onClick={handleNewRequest}
                        variant="outline"
                        className="flex items-center gap-2 text-xs h-8"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Re-new
                      </Button>
                      <Button
                        onClick={handleDeleteRequest}
                        variant="destructive"
                        className="flex items-center gap-2 text-xs h-8"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 text-xs h-8"
                      >
                        <Save className="w-3 h-3" />
                        Lưu
                      </Button>
                      <Button
                        onClick={handlePrint}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-xs h-8"
                      >
                        <Printer className="w-3 h-3" />
                        Print
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {viewingOrder ? (
                  /* View Order Details */
                  <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <Button 
                        onClick={handleBackToNewRequest}
                        variant="outline"
                        className="flex items-center gap-2 text-xs h-8"
                      >
                        <ChevronLeft className="w-3 h-3" />
                        Quay lại tạo phiếu mới
                      </Button>
                      <Button
                        onClick={handleNewRequest}
                        variant="outline"
                        className="flex items-center gap-2 text-xs h-8"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Re-new
                      </Button>
                      <Button
                        onClick={handleDeleteRequest}
                        variant="destructive"
                        className="flex items-center gap-2 text-xs h-8"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Chi tiết phiếu: {viewingOrder.requestId}
                      </h2>
                    </div>

                    {/* Location Information - Read Only */}
                    <Card className="bg-glass border-white/20 shadow-xl flex-shrink-0">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-green-600 dark:text-green-400 flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4" />
                          Thông tin đặt hàng
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Location</label>
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg border text-sm">
                            {viewingOrder.location}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Công đoạn</label>
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg border text-sm">
                            {viewingOrder.process}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Material List - Read Only */}
                    <div className="flex-1 overflow-hidden">
                      <MaterialSelector
                        materials={viewingOrder.materials}
                        onMaterialAdd={() => {}}
                        onMaterialUpdate={() => {}}
                        onMaterialRemove={() => {}}
                        readOnly={true}
                      />
                    </div>
                  </div>
                ) : (
                  /* Create New Request */
                  <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Tạo phiếu yêu cầu mới</h2>
                    </div>

                    {/* Location Selection */}
                    <div className="flex-shrink-0">
                      <LocationSelector 
                        onLocationChange={handleLocationChange}
                        selectedLocation={requestData.location}
                        selectedProcess={requestData.process}
                      />
                    </div>

                    {/* Material Selection */}
                    <div className="flex-1 overflow-hidden">
                      <MaterialSelector
                        materials={requestData.materials}
                        onMaterialAdd={handleMaterialAdd}
                        onMaterialUpdate={handleMaterialUpdate}
                        onMaterialRemove={handleMaterialRemove}
                        location={requestData.location}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialRequest;
