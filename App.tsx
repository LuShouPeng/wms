import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Login } from './components/pages/login/Login';
import { AppLayout } from './components/layouts/AppLayout';
import { AuthGuard } from './components/AuthGuard';
import { Dashboard } from './components/pages/dashboard/Dashboard';
import { WarehouseManagement } from './components/pages/warehouse/WarehouseManagement';
import { WarehouseHomePage } from './components/pages/warehouse/WarehouseHomePage';
import { InboundManagementPage } from './components/pages/warehouse/InboundManagementPage';
import { OutboundManagementPage } from './components/pages/warehouse/OutboundManagementPage';
import { TransferManagementPage } from './components/pages/warehouse/TransferManagementPage';
import { InventoryManagementPage } from './components/pages/warehouse/InventoryManagementPage';
import { BusinessManagement } from './components/pages/business/BusinessManagement';
import { BusinessHomePage } from './components/pages/business/BusinessHomePage';
import { PurchaseManagementPage } from './components/pages/business/PurchaseManagementPage';
import { DepartmentManagementPage } from './components/pages/business/DepartmentManagementPage';
import { WorkflowManagementPage } from './components/pages/business/WorkflowManagementPage';
import { BusinessDamagePage } from './components/pages/business/BusinessDamagePage';
import { ReportsHomePage } from './components/pages/reports/ReportsHomePage';
import { InventoryReportsPage } from './components/pages/reports/InventoryReportsPage';
import { FinancialReportsPage } from './components/pages/reports/FinancialReportsPage';
import { TrendAnalysisPage } from './components/pages/reports/TrendAnalysisPage';
import { AlertsReportsPage } from './components/pages/reports/AlertsReportsPage';
import { BasicData } from './components/pages/basic-data/BasicData';
import { BasicDataHomePage } from './components/pages/basic-data/BasicDataHomePage';
import { WarehousesPage } from './components/pages/basic-data/WarehousesPage';
import { MaterialsPage } from './components/pages/basic-data/MaterialsPage';
import SuppliersPage from './components/pages/basic-data/SuppliersPage';
import { SystemSettings } from './components/pages/system-settings/SystemSettings';
import { SystemSettingsHomePage } from './components/pages/system-settings/SystemSettingsHomePage';
import { UsersPage } from './components/pages/system-settings/UsersPage';
import { RolesPage } from './components/pages/system-settings/RolesPage';
import { WorkflowsPage } from './components/pages/system-settings/WorkflowsPage';
import { DamageManagement } from './components/pages/warehouse/DamageManagement';
import { InventoryPage } from './components/pages/inventory/InventoryPage';
import { WarehouseEditPage } from './components/pages/warehouse/WarehouseEditPage';
import { StandaloneInventoryForm } from './components/pages/inventory/StandaloneInventoryForm';
import EchartsDashboardPage from './components/pages/dashboard/EchartsDashboardPage';
import { Toaster } from './components/ui/sonner';
import { User, UserSession } from './lib/types';

// 获取当前用户信息的函数
const getCurrentUser = () => {
  try {
    const saved = localStorage.getItem('userSession');
    if (saved) {
      const session = JSON.parse(saved);
      return session.user;
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
  return null;
};

// Dashboard包装组件，用于传递必要的props
const DashboardWithProps = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // 从路由参数中获取子模块
  const subModule = params.subModule;
  
  // 处理子模块变化
  const handleSubModuleChange = (newSubModule: string) => {
    console.log('DashboardWithProps: handleSubModuleChange called', { newSubModule });
    if (newSubModule === 'overview') {
      navigate('/dashboard');
    } else {
      navigate(`/dashboard/${newSubModule}`);
    }
  };
  
  console.log('DashboardWithProps rendered', { subModule, pathname: location.pathname });
  
  return (
    <Dashboard
      user={getCurrentUser()}
      activeSubModule={subModule}
      onSubModuleChange={handleSubModuleChange}
    />
  );
};

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
          <Route path="dashboard">
            <Route index element={
              (() => {
                console.log('App: Dashboard index route rendered');
                return <DashboardWithProps />;
              })()
            } />
            <Route path=":subModule" element={
              (() => {
                console.log('App: Dashboard subModule route rendered');
                return <DashboardWithProps />;
              })()
            } />
          </Route>
          
          {/* 仓库管理相关路由 */}
          <Route path="warehouse">
            <Route index element={<WarehouseHomePage />} />
            <Route path="inbound" element={<InboundManagementPage />} />
            <Route path="outbound" element={<OutboundManagementPage />} />
            <Route path="transfer" element={<TransferManagementPage />} />
            <Route path="inventory" element={<InventoryManagementPage />} />
            <Route path="damage" element={<DamageManagement />} />
          </Route>
          <Route path="warehouse-edit/:id" element={<WarehouseEditPage onBack={() => window.history.back()} />} />
          <Route path="inventory/:id" element={<InventoryPage />} />
          
          {/* 业务管理路由 */}
          <Route path="business">
            <Route index element={<BusinessHomePage />} />
            <Route path="purchase" element={<PurchaseManagementPage />} />
            <Route path="department" element={<DepartmentManagementPage />} />
            <Route path="workflow" element={<WorkflowManagementPage />} />
            <Route path="business-damage" element={<BusinessDamagePage />} />
          </Route>
          
          {/* 报表管理路由 */}
          <Route path="reports">
            <Route index element={<ReportsHomePage />} />
            <Route path="inventory" element={<InventoryReportsPage />} />
            <Route path="financial" element={<FinancialReportsPage />} />
            <Route path="analysis" element={<TrendAnalysisPage />} />
            <Route path="alerts" element={<AlertsReportsPage />} />
          </Route>
          
          {/* 基础数据路由 */}
          <Route path="basic-data">
            <Route index element={<BasicDataHomePage />} />
            <Route path="warehouses" element={<WarehousesPage />} />
            <Route path="materials" element={<MaterialsPage />} />
            <Route path="suppliers" element={<SuppliersPage />} />
          </Route>
          
          {/* 系统设置路由 */}
          <Route path="settings">
            <Route index element={<SystemSettingsHomePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="roles" element={<RolesPage />} />
            <Route path="workflows" element={<WorkflowsPage />} />
          </Route>
          
          {/* 其他功能路由 */}
          <Route path="standalone-inventory" element={<StandaloneInventoryForm />} />
          <Route path="damage-management" element={<DamageManagement />} />
          
          {/* 404路由 */}
          <Route path="*" element={
            (() => {
              const currentPath = window.location.pathname;
              console.log('App: Wildcard route triggered, current path:', currentPath);
              
              // 检查是否是基础资料相关的路径，如果是则不应该被通配符路由捕获
              if (currentPath.startsWith('/basic-data')) {
                console.log('App: Basic-data path detected in wildcard route, this should not happen!');
                console.log('App: Path parts:', currentPath.split('/'));
              }
              
              // 检查是否是仪表盘相关的路径，如果是则不应该被通配符路由捕获
              if (currentPath.startsWith('/dashboard')) {
                console.log('App: Dashboard path detected in wildcard route, this should not happen!');
                console.log('App: Path parts:', currentPath.split('/'));
              }
              
              return <Navigate to="/dashboard" replace />;
            })()
          } />
        </Route>
      </Routes>
      
      {/* 全局通知组件 */}
      <Toaster />
    </>
  );
}
