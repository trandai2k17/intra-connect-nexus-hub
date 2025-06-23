
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, User } from 'lucide-react';

interface LoginFormProps {
  onLogin: (data: { employeeId: string; employeeName: string; department: string }) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [employeeId, setEmployeeId] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock employee data - in real app this would come from API
  const mockEmployees = {
    'EMP001': { name: 'Nguyễn Văn An', department: 'Sản xuất A' },
    'EMP002': { name: 'Trần Thị Bình', department: 'Sản xuất B' },
    'EMP003': { name: 'Lê Văn Cường', department: 'Kỹ thuật' },
    'EMP004': { name: 'Phạm Thị Dung', department: 'Kiểm tra chất lượng' },
    'EMP005': { name: 'Hoàng Văn Em', department: 'Kho vận' }
  };

  const handleLogin = async () => {
    if (!employeeId.trim()) {
      alert('Vui lòng nhập mã nhân viên');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const employee = mockEmployees[employeeId as keyof typeof mockEmployees];
      
      if (employee) {
        onLogin({
          employeeId,
          employeeName: employee.name,
          department: employee.department
        });
      } else {
        alert('Mã nhân viên không tồn tại. Thử: EMP001, EMP002, EMP003, EMP004, EMP005');
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md bg-glass border-white/20 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Đăng nhập hệ thống
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="employeeId" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Mã nhân viên
            </Label>
            <Input
              id="employeeId"
              type="text"
              placeholder="Nhập mã nhân viên (VD: EMP001)"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
            />
          </div>

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-brand-gradient hover:shadow-lg text-white py-3 rounded-lg font-medium transition-all duration-300"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Đang xử lý...
              </div>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Đăng nhập
              </>
            )}
          </Button>

          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <p>Mã nhân viên mẫu: EMP001, EMP002, EMP003, EMP004, EMP005</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
