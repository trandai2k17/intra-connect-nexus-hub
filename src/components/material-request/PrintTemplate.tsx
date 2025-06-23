
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Printer } from 'lucide-react';

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

interface PrintTemplateProps {
  data: RequestData;
  onClose: () => void;
}

const PrintTemplate = ({ data, onClose }: PrintTemplateProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      <style>
        {`
          @media print {
            .no-print { display: none !important; }
            body { margin: 0; }
            .print-content { margin: 0; padding: 20px; }
          }
        `}
      </style>
      
      {/* Print Controls */}
      <div className="no-print fixed top-4 right-4 flex gap-2 z-50">
        <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
          <Printer className="w-4 h-4 mr-2" />
          In phiếu
        </Button>
        <Button onClick={onClose} variant="outline">
          <X className="w-4 h-4 mr-2" />
          Đóng
        </Button>
      </div>

      {/* Print Content */}
      <div className="print-content max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            PHIẾU YÊU CẦU NGUYÊN VẬT LIỆU
          </h1>
          <p className="text-lg text-gray-600">MATERIAL REQUEST FORM</p>
          <div className="mt-4 text-right">
            <p className="text-sm text-gray-500">Mã phiếu: {data.requestId}</p>
            <p className="text-sm text-gray-500">Ngày tạo: {new Date(data.requestDate).toLocaleDateString('vi-VN')}</p>
          </div>
        </div>

        {/* Employee Information */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Thông tin nhân viên
            </h3>
            <div className="space-y-3">
              <div className="flex">
                <span className="font-medium text-gray-700 w-32">Mã nhân viên:</span>
                <span className="text-gray-900">{data.employeeId}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-32">Tên nhân viên:</span>
                <span className="text-gray-900">{data.employeeName}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-32">Bộ phận:</span>
                <span className="text-gray-900">{data.department}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Thông tin đặt hàng
            </h3>
            <div className="space-y-3">
              <div className="flex">
                <span className="font-medium text-gray-700 w-32">Location:</span>
                <span className="text-gray-900">{data.location}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-32">Công đoạn:</span>
                <span className="text-gray-900">{data.process}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Material List */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Danh sách nguyên vật liệu
          </h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">STT</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">Mã NVL</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">Tên nguyên vật liệu</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">Đơn vị</th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-900">Số lượng</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {data.materials.map((material, index) => (
                <tr key={material.id}>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 font-medium">
                    {material.code}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900">
                    {material.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900">
                    {material.unit}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-900 font-medium">
                    {material.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900">
                    {material.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <p className="font-semibold text-gray-900 mb-16">Người yêu cầu</p>
            <div className="border-b border-gray-400 mb-2"></div>
            <p className="text-sm text-gray-600">Ký tên, ghi rõ họ tên</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900 mb-16">Phụ trách bộ phận</p>
            <div className="border-b border-gray-400 mb-2"></div>
            <p className="text-sm text-gray-600">Ký tên, ghi rõ họ tên</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900 mb-16">Kho vận</p>
            <div className="border-b border-gray-400 mb-2"></div>
            <p className="text-sm text-gray-600">Ký tên, ghi rõ họ tên</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2024 Online Material Request System</p>
        </div>
      </div>
    </div>
  );
};

export default PrintTemplate;
