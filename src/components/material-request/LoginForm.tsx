
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogIn } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoginFormProps {
  onLogin: (data: { employeeId: string; employeeName: string; department: string; warehouse: string }) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const { t } = useLanguage();
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [department, setDepartment] = useState('');
  const [warehouse, setWarehouse] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeId || !employeeName || !department || !warehouse) {
      alert(t('material.login.required'));
      return;
    }

    onLogin({ employeeId, employeeName, department, warehouse });
  };

  return (
    <Card className="max-w-md mx-auto bg-glass border-white/20 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2">
          <LogIn className="w-5 h-5" />
          {t('material.login')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId">{t('material.employee.id')}</Label>
            <Input
              id="employeeId"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder={t('material.login.employee.id')}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="employeeName">{t('material.employee.name')}</Label>
            <Input
              id="employeeName"
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder={t('material.login.employee.name')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="warehouse">{t('material.warehouse')}</Label>
            <Select value={warehouse} onValueChange={setWarehouse}>
              <SelectTrigger>
                <SelectValue placeholder={t('material.select.warehouse')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DADL">DADL</SelectItem>
                <SelectItem value="HNCM">HNCM</SelectItem>
                <SelectItem value="SGCM">SGCM</SelectItem>
                <SelectItem value="DNCM">DNCM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">{t('material.department')}</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder={t('material.select.department')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CB-Contour">CB-Contour</SelectItem>
                <SelectItem value="CB-Assembly">CB-Assembly</SelectItem>
                <SelectItem value="CB-Quality">CB-Quality</SelectItem>
                <SelectItem value="CB-Maintenance">CB-Maintenance</SelectItem>
                <SelectItem value="CB-Warehouse">CB-Warehouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full">
            <LogIn className="w-4 h-4 mr-2" />
            {t('material.login')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
