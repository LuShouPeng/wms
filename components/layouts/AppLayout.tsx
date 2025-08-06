import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toaster } from '../ui/sonner';
import { User, Module } from '../lib/types';

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('userSession');
      if (saved) {
        const session = JSON.parse(saved);
        return session.user;
      }
      return null;
    } catch (error) {
      console.error('解析用户会话失败:', error);
      return null;
    }
  });
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // 从路径中提取当前活动模块
  const getActiveModuleFromPath = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return 'dashboard';
    if (path.startsWith('/warehouse')) return 'warehouse';
    if (path.startsWith('/business')) return 'business';
    if (path.startsWith('/reports')) return 'reports';
    if (path.startsWith('/basic-data')) return 'basicData';
    if (path.startsWith('/settings')) return 'settings';
    return 'dashboard';
  };
  
  // 从路径中提取当前活动子模块
  const getActiveSubModuleFromPath = () => {
    const path = location.pathname;
    const parts = path.split('/');
    if (parts.length >= 3) {
      return parts[2];
    }
    return null;
  };
  
  const [activeModule, setActiveModule] = useState<Module>(getActiveModuleFromPath());
  const [activeSubModule, setActiveSubModule] = useState<string | null>(getActiveSubModuleFromPath());
  
  // 当路由变化时更新活动模块
  React.useEffect(() => {
    const module = getActiveModuleFromPath();
    const subModule = getActiveSubModuleFromPath();
    
    console.log('AppLayout: Route change detected', {
      pathname: location.pathname,
      detectedModule: module,
      detectedSubModule: subModule,
      previousModule: activeModule,
      previousSubModule: activeSubModule
    });
    
    setActiveModule(module);
    setActiveSubModule(subModule);
  }, [location.pathname]);
  
  // 退出登录处理
  const handleLogout = () => {
    localStorage.removeItem('userSession');
    navigate('/login');
  };

  // 模块切换处理
  const handleModuleChange = (moduleId: string, subModuleId?: string) => {
    console.log('AppLayout: handleModuleChange called', {
      moduleId,
      subModuleId,
      currentPath: location.pathname,
      currentModule: activeModule,
      currentSubModule: activeSubModule
    });
    
    const module = moduleId as Module;
    setActiveModule(module);
    setActiveSubModule(subModuleId || null);
    
    // 根据模块和子模块构建导航路径
    let path = `/${moduleId}`;
    if (subModuleId) {
      path = `${path}/${subModuleId}`;
    }
    
    console.log('AppLayout: Navigating to path', path);
    console.log('AppLayout: Route check - basic-data route exists:', path.startsWith('/basic-data'));
    
    // 特殊处理基础资料模块，确保子模块正确导航
    if (moduleId === 'basicData' && subModuleId) {
      console.log('AppLayout: Special handling for basicData subModule:', subModuleId);
      // 确保路径格式正确
      path = `/basic-data/${subModuleId}`;
    }
    
    // 特殊处理仪表盘模块，确保子模块正确导航
    if (moduleId === 'dashboard' && subModuleId) {
      console.log('AppLayout: Special handling for dashboard subModule:', subModuleId);
      // 确保路径格式正确
      path = `/dashboard/${subModuleId}`;
    }
    
    navigate(path);
  };

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
        <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
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
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* 全局通知组件 */}
      <Toaster />
    </div>
  );
}