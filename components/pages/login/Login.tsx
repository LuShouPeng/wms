import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { AlertTriangle, Shield, User, Lock, UserCircle } from 'lucide-react';
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
    role: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // 验证角色选择
    if (!formData.role) {
      setError('请选择登录角色');
      setLoading(false);
      return;
    }

    // 模拟登录验证（实际项目中应调用API）
    const user = mockLoginUsers.find(u => 
      u.username === formData.username && u.password === formData.password && u.role === formData.role
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100 flex relative">
      {/* 背景图片层 - 占满整个屏幕 */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-400 via-sky-500 to-cyan-600"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23dbeafe;stop-opacity:1" /><stop offset="50%" style="stop-color:%23bfdbfe;stop-opacity:1" /><stop offset="100%" style="stop-color:%2393c5fd;stop-opacity:1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(%23grad1)"/><circle cx="200" cy="300" r="100" fill="%23ffffff" opacity="0.1"/><circle cx="800" cy="200" r="150" fill="%23ffffff" opacity="0.05"/><circle cx="600" cy="700" r="80" fill="%23ffffff" opacity="0.1"/><path d="M0,400 Q250,300 500,400 T1000,400 L1000,1000 L0,1000 Z" fill="%23ffffff" opacity="0.05"/></svg>')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* 左侧装饰区域 - 占据一半屏幕 */}
      <div className="w-1/2 flex items-center justify-center px-12 relative z-10">
        <div className="max-w-md text-center">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-600 to-sky-700 rounded-full flex items-center justify-center mb-8 shadow-2xl">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">仓储物资管理系统</h1>
          <p className="text-lg text-blue-50 mb-8 drop-shadow">高效、智能、可靠的仓储管理解决方案</p>
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
              <span className="text-blue-50 drop-shadow">实时库存监控与预警</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
              <span className="text-blue-50 drop-shadow">智能采购与调拨管理</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
              <span className="text-blue-50 drop-shadow">多角色权限精细化控制</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 右侧登录区域 - 占据一半屏幕 */}
      <div className="w-1/2 flex items-center justify-center px-8 relative z-10">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-md">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full flex items-center justify-center mb-4 shadow-lg lg:hidden">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">欢迎登录</CardTitle>
              <CardDescription className="text-gray-600">
                请选择角色并输入您的登录凭据
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-gray-700">登录角色</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))} required>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-4 w-4 text-gray-400" />
                        <SelectValue placeholder="请选择您的角色" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="总管理员">总管理员</SelectItem>
                      <SelectItem value="超级管理员">超级管理员</SelectItem>
                      <SelectItem value="仓库管理员">仓库管理员</SelectItem>
                      <SelectItem value="采购员">采购员</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">用户名</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      name="username"
                      placeholder="请输入用户名"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="pl-9 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="请输入密码"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-9 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white font-medium py-2.5 shadow-lg transition-all duration-200" 
                  disabled={loading}
                >
                  {loading ? '登录中...' : '立即登录'}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border border-blue-100">
                <p className="text-sm font-medium text-blue-800 mb-3">💡 测试账户</p>
                <div className="text-xs text-blue-600 space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/60 rounded">
                    <span className="font-medium">总管理员</span>
                    <span className="font-mono">superadmin / super123</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/60 rounded">
                    <span className="font-medium">超级管理员</span>
                    <span className="font-mono">admin / admin123</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/60 rounded">
                    <span className="font-medium">仓库管理员</span>
                    <span className="font-mono">warehouse / wh123</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/60 rounded">
                    <span className="font-medium">采购员</span>
                    <span className="font-mono">purchase / pur123</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}