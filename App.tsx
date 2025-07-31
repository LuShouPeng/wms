import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { WarehouseManagement } from './components/WarehouseManagement';
import { BusinessManagement } from './components/BusinessManagement';
import { Reports } from './components/Reports';
import { BasicData } from './components/BasicData';
import { SystemSettings } from './components/SystemSettings';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [activeSubModule, setActiveSubModule] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 检查用户会话
  useEffect(() => {
    const checkUserSession = () => {
      try {
        const saved = localStorage.getItem('userSession');
        if (saved) {
          const session = JSON.parse(saved);
          if (session.user && session.loginTime) {
            const loginTime = new Date(session.loginTime);
            const now = new Date();
            const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
            
            // 会话有效期8小时
            if (hoursDiff > 8) {
              localStorage.removeItem('userSession');
              setIsLoggedIn(false);
              setCurrentUser(null);
            } else {
              setIsLoggedIn(true);
              setCurrentUser(session.user);
              // 更新最后活动时间
              session.lastActivity = new Date().toISOString();
              localStorage.setItem('userSession', JSON.stringify(session));
            }
          }
        }
      } catch (error) {
        console.error('Failed to parse user session:', error);
        localStorage.removeItem('userSession');
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  // 登录处理
  const handleLogin = (user) => {
    const session = {
      user,
      loginTime: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    
    setIsLoggedIn(true);
    setCurrentUser(user);
    localStorage.setItem('userSession', JSON.stringify(session));
    setActiveModule('dashboard');
    setActiveSubModule(null);
  };

  // 退出登录处理
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('userSession');
    setActiveModule('dashboard');
    setActiveSubModule(null);
  };

  // 模块切换处理
  const handleModuleChange = (module, subModule = null) => {
    setActiveModule(module);
    setActiveSubModule(subModule);
  };

  // 渲染当前模块
  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <Dashboard
            user={currentUser}
            activeSubModule={activeSubModule || undefined}
            onSubModuleChange={(subModule) => setActiveSubModule(subModule)}
          />
        );
      
      case 'warehouse':
        return (
          <WarehouseManagement 
            user={currentUser} 
            activeSubModule={activeSubModule || undefined}
            onSubModuleChange={(subModule) => setActiveSubModule(subModule)}
          />
        );
      
      case 'business':
        return (
          <BusinessManagement 
            user={currentUser}
            activeSubModule={activeSubModule || undefined}
            onSubModuleChange={(subModule) => setActiveSubModule(subModule)}
          />
        );
      
      case 'reports':
        return <Reports user={currentUser} />;
      
      case 'basicData':
        return (
          <BasicData 
            user={currentUser}
            activeSubModule={activeSubModule}
            onSubModuleChange={(subModule) => setActiveSubModule(subModule)}
          />
        );
      
      case 'settings':
        return (
          <SystemSettings 
            user={currentUser}
            activeSubModule={activeSubModule}
            onSubModuleChange={(subModule) => setActiveSubModule(subModule)}
          />
        );
      
      default:
        return (
          <Dashboard
            user={currentUser}
            activeSubModule={activeSubModule || undefined}
            onSubModuleChange={(subModule) => setActiveSubModule(subModule)}
          />
        );
    }
  };

  // 加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">系统加载中...</p>
        </div>
      </div>
    );
  }

  // 未登录状态 - 显示登录页面
  if (!isLoggedIn) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  // 已登录状态 - 显示主应用界面
  return (
    <div className="min-h-screen bg-background">
      {/* 主布局容器 */}
      <div className="flex h-screen">
        {/* 侧边栏 */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 flex-shrink-0`}>
          <Sidebar 
            activeModule={activeModule}
            onModuleChange={handleModuleChange}
            user={currentUser}
            collapsed={sidebarCollapsed}
          />
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 顶部导航栏 */}
          <Header 
            user={currentUser}
            onLogout={handleLogout}
            activeModule={activeModule}
            onModuleChange={handleModuleChange}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          {/* 主内容区 */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {renderActiveModule()}
            </div>
          </main>
        </div>
      </div>

      {/* 全局通知组件 */}
      <Toaster />
    </div>
  );
}