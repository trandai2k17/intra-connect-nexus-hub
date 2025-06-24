
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoginFormProps {
  onLogin: (data: { employeeId: string; employeeName: string; department: string; warehouse: string }) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const { t } = useLanguage();
  const [employeeId, setEmployeeId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeId) {
      alert(t('material.login.required'));
      return;
    }

    // Mock data based on employee ID
    const mockData = {
      employeeId,
      employeeName: 'Nguyễn Văn An',
      department: 'CB-Contour',
      warehouse: 'DADL'
    };

    onLogin(mockData);
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
