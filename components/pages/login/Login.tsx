import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { AlertTriangle, Shield, User, Lock, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '../../ui/alert';
import { mockLoginUsers } from '../../../mockdata';
import { User as UserType } from '../lib/types';

interface LoginProps {
  onLogin?: (user: UserType) => void;
}

export function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captcha: ''
  });
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // 模拟验证码验证
    if (formData.captcha.toUpperCase() !== captchaCode) {
      setError('验证码错误');
      setLoading(false);
      return;
    }

    // 模拟登录验证（实际项目中应调用API）
    const user = mockLoginUsers.find(u => 
      u.username === formData.username && u.password === formData.password
    );

    setTimeout(() => {
      if (user) {
        // 记录登录日志（模拟）
        const loginLog = {
          userId: user.id,
          username: user.username,
          loginTime: new Date().toISOString(),
          ip: '192.168.1.100', // 模拟IP
          userAgent: navigator.userAgent
        };
        console.log('登录日志:', loginLog);
        
        // 如果有onLogin回调则调用，否则使用路由导航
        if (onLogin) {
          onLogin(user);
        } else {
          // 创建用户会话
          const session = {
            user,
            loginTime: new Date().toISOString(),
            lastActivity: new Date().toISOString()
          };
          
          // 保存到本地存储
          localStorage.setItem('userSession', JSON.stringify(session));
          
          // 导航到仪表盘
          navigate('/dashboard');
        }
      } else {
        setError('用户名或密码错误');
      }
      setLoading(false);
    }, 1000);
  };

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setFormData(prev => ({ ...prev, captcha: '' }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">仓储物资管理系统</CardTitle>
          <CardDescription>
            请使用您的账户登录系统
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  name="username"
                  placeholder="请输入用户名"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="请输入密码"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="captcha">验证码</Label>
              <div className="flex gap-2">
                <Input
                  id="captcha"
                  name="captcha"
                  placeholder="请输入验证码"
                  value={formData.captcha}
                  onChange={handleInputChange}
                  className="flex-1"
                  required
                />
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 px-3 py-2 rounded border text-center min-w-[80px] font-mono tracking-wider">
                    {captchaCode}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={refreshCaptcha}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '登录中...' : '登录'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 mb-2">测试账户：</p>
            <div className="text-xs text-blue-600 space-y-1">
              <div>管理员: admin / admin123</div>
              <div>仓库员: warehouse / wh123</div>
              <div>采购员: purchase / pur123</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}