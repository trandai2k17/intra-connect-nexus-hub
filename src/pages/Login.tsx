import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import dentalBackground from '@/assets/dental-background.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn đến với hệ thống!",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${dentalBackground})` }}
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-primary/20"></div>
      </div>

      {/* Floating Card */}
      <Card className="relative z-10 w-full max-w-md backdrop-blur-md bg-card/95 border-border/50 shadow-2xl animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-elegant">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Đăng Nhập</CardTitle>
          <CardDescription className="text-muted-foreground">
            Đăng nhập vào hệ thống quản lý nha khoa
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 bg-background/50 border-border/50 focus:border-primary transition-colors pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-11 w-11 p-0 hover:bg-transparent"
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

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-border/50 text-primary focus:ring-primary"
                />
                <Label htmlFor="remember" className="text-muted-foreground cursor-pointer">
                  Ghi nhớ đăng nhập
                </Label>
              </div>
              <Button variant="link" className="p-0 h-auto text-primary hover:text-primary-glow">
                Quên mật khẩu?
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-primary hover:opacity-90 text-white font-medium transition-all duration-300 hover:shadow-glow"
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

            <div className="text-center text-sm text-muted-foreground">
              Chưa có tài khoản?{' '}
              <Button variant="link" className="p-0 h-auto text-primary hover:text-primary-glow">
                Đăng ký ngay
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}