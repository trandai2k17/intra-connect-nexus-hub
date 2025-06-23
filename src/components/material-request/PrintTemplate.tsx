
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer } from 'lucide-react';

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
      {/* Print controls - hidden when printing */}
      <div className="no-print fixed top-4 left-4 right-4 z-10 flex justify-between items-center bg-white shadow-lg rounded-lg p-4">
        <Button onClick={onClose} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>
        <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Printer className="w-4 h-4 mr-2" />
          In phiếu
        </Button>
      </div>

      {/* Print content */}
      <div className="max-w-4xl mx-auto p-8 mt-20 print:mt-0">
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            PHIẾU YÊU CẦU NGUYÊN VẬT LIỆU
          </h1>
          <h2 className="text-xl text-gray-600">MATERIAL REQUEST FORM</h2>
          <div className="mt-4 text-lg">
            <strong>Số phiếu: {data.requestId}</strong>
          </div>
        </div>

        {/* Request Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex">
              <span className="font-semibold w-32">Mã nhân viên:</span>
              <span className="border-b border-gray-300 flex-1 px-2">{data.employeeId}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Tên nhân viên:</span>
              <span className="border-b border-gray-300 flex-1 px-2">{data.employeeName}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Bộ phận:</span>
              <span className="border-b border-gray-300 flex-1 px-2">{data.department}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex">
              <span className="font-semibold w-32">Ngày yêu cầu:</span>
              <span className="border-b border-gray-300 flex-1 px-2">{data.requestDate}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Location:</span>
              <span className="border-b border-gray-300 flex-1 px-2">{data.location}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Công đoạn:</span>
              <span className="border-b border-gray-300 flex-1 px-2">{data.process}</span>
            </div>
          </div>
        </div>

        {/* Materials Table */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">CHI TIẾT NGUYÊN VẬT LIỆU</h3>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-4 py-2 text-left">STT</th>
                <th className="border border-gray-400 px-4 py-2 text-left">Mã NVL</th>
                <th className="border border-gray-400 px-4 py-2 text-left">Tên nguyên vật liệu</th>
                <th className="border border-gray-400 px-4 py-2 text-center">Đơn vị</th>
                <th className="border border-gray-400 px-4 py-2 text-center">Số lượng</th>
                <th className="border border-gray-400 px-4 py-2 text-left">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {data.materials.map((material, index) => (
                <tr key={material.id}>
                  <td className="border border-gray-400 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-400 px-4 py-2">{material.code}</td>
                  <td className="border border-gray-400 px-4 py-2">{material.name}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">{material.unit}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">{material.quantity}</td>
                  <td className="border border-gray-400 px-4 py-2">{material.notes}</td>
                </tr>
              ))}
              {/* Empty rows for manual addition */}
              {Array.from({ length: Math.max(0, 10 - data.materials.length) }).map((_, index) => (
                <tr key={`empty-${index}`}>
                  <td className="border border-gray-400 px-4 py-2 text-center h-8"></td>
                  <td className="border border-gray-400 px-4 py-2"></td>
                  <td className="border border-gray-400 px-4 py-2"></td>
                  <td className="border border-gray-400 px-4 py-2"></td>
                  <td className="border border-gray-400 px-4 py-2"></td>
                  <td className="border border-gray-400 px-4 py-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="font-semibold mb-16">Người yêu cầu</div>
            <div className="border-t border-gray-400 pt-2">
              <div>Ký tên:</div>
              <div className="text-sm text-gray-600 mt-1">{data.employeeName}</div>
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold mb-16">Trưởng bộ phận</div>
            <div className="border-t border-gray-400 pt-2">
              <div>Ký tên:</div>
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold mb-16">Thủ kho</div>
            <div className="border-t border-gray-400 pt-2">
              <div>Ký tên:</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Phiếu này có hiệu lực khi có đầy đủ chữ ký của các bên liên quan</p>
          <p className="mt-2">Được tạo từ hệ thống Online Material Request - {new Date().toLocaleString('vi-VN')}</p>
        </div>
      </div>

      {/* Print styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
          
          .print\\:mt-0 {
            margin-top: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintTemplate;
