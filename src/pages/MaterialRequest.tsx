
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, Save, Plus, History, FileText, Eye, ChevronLeft, RotateCcw, Trash2 } from 'lucide-react';
import LoginForm from '@/components/material-request/LoginForm';
import LocationSelector from '@/components/material-request/LocationSelector';
import MaterialSelector from '@/components/material-request/MaterialSelector';
import PrintTemplate from '@/components/material-request/PrintTemplate';
import HistoryOrders from '@/components/material-request/HistoryOrders';
import { MaterialLanguageToggle } from '@/components/material-request/MaterialLanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

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
  warehouse: string;
  location: string;
  usingLocation: string;
  process: string;
  materials: MaterialItem[];
  requestDate: string;
  requestId: string;
}

const MaterialRequest = () => {
  const { t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [requestData, setRequestData] = useState<RequestData>({
    employeeId: '',
    employeeName: '',
    department: '',
    warehouse: '',
    location: '',
    usingLocation: '',
    process: '',
    materials: [],
    requestDate: new Date().toISOString().split('T')[0],
    requestId: `REQ-${Date.now()}`
  });
  const [showPrint, setShowPrint] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<RequestData | null>(null);

  const handleLogin = (data: { employeeId: string; employeeName: string; department: string; warehouse: string }) => {
    setRequestData(prev => ({
      ...prev,
      ...data
    }));
    setIsLoggedIn(true);
  };

  const handleLocationChange = (location: string, usingLocation: string) => {
    setRequestData(prev => ({
      ...prev,
      location,
      usingLocation
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
    alert(t('material.save.success'));
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
      usingLocation: '',
      process: '',
      materials: [],
      requestDate: new Date().toISOString().split('T')[0],
      requestId: `REQ-${Date.now()}`
    }));
    setViewingOrder(null);
  };

  const handleDeleteRequest = () => {
    if (confirm(t('material.confirm.delete'))) {
      console.log('Deleting request:', requestData.requestId);
      handleNewRequest();
      alert(t('material.delete.success'));
    }
  };

  if (showPrint) {
    return <PrintTemplate data={viewingOrder || requestData} onClose={() => setShowPrint(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <MaterialLanguageToggle />
      <div className="container-fluid px-3 py-4">
        <div className="max-w-full mx-auto">
          {/* Header */}
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-bold text-brand-gradient mb-1">
              {t('material.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('material.subtitle')}
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
                      {t('material.history')}
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

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-4 h-full flex flex-col">
                {/* Employee Info and Order Info - Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-shrink-0">
                  {/* Employee Info Card */}
                  <Card className="bg-glass border-white/20 shadow-xl">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-blue-600 dark:text-blue-400 flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {t('material.employee.info')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{t('material.employee.id')}</label>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{requestData.employeeId}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{t('material.employee.name')}</label>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{requestData.employeeName}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{t('material.warehouse')}</label>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{requestData.warehouse}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{t('material.department')}</label>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{requestData.department}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Info Card */}
                  <Card className="bg-glass border-white/20 shadow-xl">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-green-600 dark:text-green-400 flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4" />
                        {t('material.order.info')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 py-2">
                      <LocationSelector 
                        onLocationChange={handleLocationChange}
                        selectedLocation={requestData.location}
                        selectedUsingLocation={requestData.usingLocation}
                        readOnly={viewingOrder !== null}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <Card className="bg-glass border-white/20 shadow-xl flex-shrink-0">
                  <CardContent className="py-3">
                    <div className="flex gap-2 justify-end">
                      <Button
                        onClick={handleNewRequest}
                        variant="outline"
                        className="flex items-center gap-2 text-xs h-8"
                      >
                        <RotateCcw className="w-3 h-3" />
                        {t('material.renew')}
                      </Button>
                      <Button
                        onClick={handleDeleteRequest}
                        variant="destructive"
                        className="flex items-center gap-2 text-xs h-8"
                      >
                        <Trash2 className="w-3 h-3" />
                        {t('material.delete')}
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 text-xs h-8"
                      >
                        <Save className="w-3 h-3" />
                        {t('material.save')}
                      </Button>
                      <Button
                        onClick={handlePrint}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-xs h-8"
                      >
                        <Printer className="w-3 h-3" />
                        {t('material.print')}
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
                        {t('material.back.new')}
                      </Button>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {t('material.order.detail')}: {viewingOrder.requestId}
                      </h2>
                    </div>

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
                  /* Create New Request - Material Selection */
                  <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t('material.new.request')}</h2>
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
