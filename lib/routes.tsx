import React from 'react';
import { Dashboard } from '../components/Dashboard';
import { WarehouseManagement } from '../components/WarehouseManagement';
import { BusinessManagement } from '../components/BusinessManagement';
import { Reports } from '../components/Reports';
import { BasicData } from '../components/BasicData';
import { SystemSettings } from '../components/SystemSettings';
import { DamageManagement } from '../components/DamageManagement';
import { InventoryPage } from '../components/InventoryPage';
import { WarehouseEditPage } from '../components/WarehouseEditPage';
import { StandaloneInventoryForm } from '../components/StandaloneInventoryForm';
import { EchartsDashboardPage } from '../components/EchartsDashboardPage';

// 路由配置
export const routes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    title: '仪表盘',
    requireAuth: true,
  },
  {
    path: '/echarts-dashboard',
    element: <EchartsDashboardPage />,
    title: '图表仪表盘',
    requireAuth: true,
  },
  {
    path: '/warehouse',
    element: <WarehouseManagement />,
    title: '仓库管理',
    requireAuth: true,
    subRoutes: [
      {
        path: 'inbound',
        title: '入库管理',
      },
      {
        path: 'outbound',
        title: '出库管理',
      },
      {
        path: 'transfer',
        title: '移库管理',
      },
      {
        path: 'inventory',
        title: '盘点管理',
      },
      {
        path: 'damage',
        title: '报损管理',
      }
    ]
  },
  {
    path: '/warehouse-edit/:id',
    element: <WarehouseEditPage />,
    title: '编辑仓库',
    requireAuth: true,
  },
  {
    path: '/inventory/:id',
    element: <InventoryPage />,
    title: '库存管理',
    requireAuth: true,
  },
  {
    path: '/business',
    element: <BusinessManagement />,
    title: '业务管理',
    requireAuth: true,
  },
  {
    path: '/reports',
    element: <Reports />,
    title: '报表管理',
    requireAuth: true,
  },
  {
    path: '/basic-data',
    element: <BasicData />,
    title: '基础数据',
    requireAuth: true,
    subRoutes: [
      {
        path: 'warehouses',
        title: '仓库管理',
      },
      {
        path: 'materials',
        title: '物料档案',
      },
      {
        path: 'suppliers',
        title: '供应商管理',
      }
    ]
  },
  {
    path: '/settings',
    element: <SystemSettings />,
    title: '系统设置',
    requireAuth: true,
  },
  {
    path: '/standalone-inventory',
    element: <StandaloneInventoryForm />,
    title: '独立盘点',
    requireAuth: true,
  },
  {
    path: '/damage-management',
    element: <DamageManagement />,
    title: '报损管理',
    requireAuth: true,
  }
];

// 获取所有需要身份验证的路由
export const getAuthRoutes = () => {
  return routes.filter(route => route.requireAuth);
};

// 获取所有公开路由
export const getPublicRoutes = () => {
  return routes.filter(route => !route.requireAuth);
};

// 根据路径获取路由标题
export const getRouteTitle = (pathname: string) => {
  const route = routes.find(r => r.path === pathname);
  return route ? route.title : '未知页面';
};

// 根据路径获取子路由
export const getSubRoutes = (pathname: string) => {
  const route = routes.find(r => r.path === pathname);
  return route?.subRoutes || [];
};