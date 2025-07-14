import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Heart, Smile, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import dentalBackground from '@/assets/dental-background.jpg';
import * as THREE from 'three';

// 3D Floating Elements Component
function FloatingElements() {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-4, 2, -2]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.2} />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[4, -1, -1]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.2} />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[2, 3, -3]}>
          <octahedronGeometry args={[0.25]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.4}>
        <mesh position={[-3, -2, -2]}>
          <tetrahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

// 3D Background Scene
function Background3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
        
        <Environment preset="city" backgroundBlurriness={0.8} />
        <FloatingElements />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

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
        title: "🎉 Đăng nhập thành công!",
        description: "Chào mừng bạn đến với hệ thống nha khoa hiện đại!",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      <Background3D />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-400/15 to-green-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-30 min-h-screen flex items-center justify-center p-4">
        {/* Floating Card with 3D Effect */}
        <div className="group perspective-1000">
          <Card className="w-full max-w-md backdrop-blur-xl bg-card/90 border-border/30 shadow-2xl transform transition-all duration-700 hover:scale-105 hover:rotate-y-12 hover:shadow-elegant animate-fade-in group-hover:shadow-glow">
            <CardHeader className="text-center space-y-6 pb-8">
              {/* Animated Logo */}
              <div className="mx-auto relative">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant animate-scale-in group-hover:animate-pulse">
                  <Heart className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Star className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Chào Mừng! 
                </CardTitle>
                <div className="flex items-center justify-center space-x-2">
                  <Smile className="w-5 h-5 text-primary animate-bounce" />
                  <CardDescription className="text-muted-foreground text-lg">
                    Hệ thống nha khoa thông minh
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-foreground flex items-center space-x-2">
                    <span>📧</span>
                    <span>Email của bạn</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-semibold text-foreground flex items-center space-x-2">
                    <span>🔐</span>
                    <span>Mật khẩu</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-10 w-10 rounded-lg hover:bg-primary/10 transition-colors"
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 rounded border-border/50 text-primary focus:ring-primary/20 focus:ring-2"
                    />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                      Ghi nhớ tôi
                    </Label>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-primary hover:text-primary-glow transition-colors">
                    Quên mật khẩu? 🤔
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-primary hover:opacity-90 text-white font-semibold transition-all duration-300 hover:shadow-glow hover:scale-105 rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Đang đăng nhập... ✨</span>
                    </div>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <span>Đăng Nhập</span>
                      <span>🚀</span>
                    </span>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Chưa có tài khoản?{' '}
                    <Button variant="link" className="p-0 h-auto text-primary hover:text-primary-glow font-semibold">
                      Đăng ký ngay 🎯
                    </Button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}