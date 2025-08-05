import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Login } from './components/Login';
import { AppLayout } from './components/AppLayout';
import { AuthGuard } from './components/AuthGuard';
import { Dashboard } from './components/Dashboard';
import { WarehouseManagement } from './components/WarehouseManagement';
import { BusinessManagement } from './components/BusinessManagement';
import { Reports } from './components/Reports';
import { BasicData } from './components/BasicData';
import { SystemSettings } from './components/SystemSettings';
import { DamageManagement } from './components/DamageManagement';
import { InventoryPage } from './components/InventoryPage';
import { WarehouseEditPage } from './components/WarehouseEditPage';
import { StandaloneInventoryForm } from './components/StandaloneInventoryForm';
import EchartsDashboardPage from './components/EchartsDashboardPage';
import { Toaster } from './components/ui/sonner';
import { User, UserSession } from './lib/types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
              navigate('/login');
            } else {
              // 更新最后活动时间
              session.lastActivity = new Date().toISOString();
              localStorage.setItem('userSession', JSON.stringify(session));
            }
          }
        }
      } catch (error) {
        console.error('解析用户会话失败:', error);
        localStorage.removeItem('userSession');
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, [navigate]);

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

  return (
    <>
      <Routes>
        {/* 公开路由 */}
        <Route path="/login" element={<Login />} />
        
        {/* 需要身份验证的路由 */}
        <Route path="/" element={<AuthGuard><AppLayout /></AuthGuard>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="echarts-dashboard" element={<EchartsDashboardPage />} />
          
          {/* 仓库管理相关路由 */}
          <Route path="warehouse">
            <Route index element={<WarehouseManagement />} />
            <Route path=":subModule" element={<WarehouseManagement />} />
          </Route>
          <Route path="warehouse-edit/:id" element={<WarehouseEditPage />} />
          <Route path="inventory/:id" element={<InventoryPage />} />
          
          {/* 业务管理路由 */}
          <Route path="business" element={<BusinessManagement />} />
          
          {/* 报表管理路由 */}
          <Route path="reports" element={<Reports />} />
          
          {/* 基础数据路由 */}
          <Route path="basic-data">
            <Route index element={<BasicData />} />
            <Route path=":subModule" element={<BasicData />} />
          </Route>
          
          {/* 系统设置路由 */}
          <Route path="settings" element={<SystemSettings />} />
          
          {/* 其他功能路由 */}
          <Route path="standalone-inventory" element={<StandaloneInventoryForm />} />
          <Route path="damage-management" element={<DamageManagement />} />
          
          {/* 404路由 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
      
      {/* 全局通知组件 */}
      <Toaster />
    </>
  );
}
