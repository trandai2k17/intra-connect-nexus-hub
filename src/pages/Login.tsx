import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Đăng nhập thành công!",
        description: "Chào mừng bạn trở lại.",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/30">
      {/* Breathing Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-breathe"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-breathe" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-breathe" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md backdrop-blur-xl bg-glass-bg border border-glass-border shadow-glass rounded-2xl overflow-hidden group transition-all duration-700 ease-out hover:backdrop-blur-2xl hover:bg-glass-bg/70 hover:shadow-[0_20px_40px_-8px_rgba(0,87,179,0.4),0_8px_16px_-8px_rgba(0,123,255,0.3)] hover:scale-[1.03] hover:border-primary/40 hover:-translate-y-3 hover:rotate-[0.5deg]">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-glass rounded-2xl"></div>
          
          <div className="relative z-10">
            <CardHeader className="text-center space-y-4 pb-8 pt-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant">
                <Lock className="w-7 h-7 text-white" />
              </div>
              
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-primary">
                  Đăng Nhập
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Vui lòng đăng nhập để tiếp tục
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-foreground">
                    Tên đăng nhập
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Nhập tên đăng nhập"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="pl-10 h-12 bg-white/10 border-white/20 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 pr-12 h-12 bg-white/10 border-white/20 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-10 w-10 rounded-lg hover:bg-white/10 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary hover:text-secondary transition-colors text-sm"
                  >
                    Quên mật khẩu?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-primary hover:opacity-90 text-white font-medium transition-all duration-300 hover:shadow-elegant hover:scale-[1.02] rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Đang đăng nhập...</span>
                    </div>
                  ) : (
                    'Đăng Nhập'
                  )}
                </Button>
              </form>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}