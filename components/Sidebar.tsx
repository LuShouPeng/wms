import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';
import { 
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Database,
  Settings,
  Warehouse,
  TrendingUp,
  Users,
  FileText,
  AlertTriangle,
  Building,
  Truck,
  ClipboardList,
  DollarSign
} from 'lucide-react';

const menuItems = [
  {
    id: 'dashboard',
    label: '仪表盘',
    icon: LayoutDashboard,
    description: '数据概览与快捷操作'
  },
  {
    id: 'warehouse',
    label: '仓库管理',
    icon: Warehouse,
    description: '入库/出库/移库/盘点',
    badge: '3',
    subItems: [
      { id: 'inbound', label: '入库管理', icon: TrendingUp },
      { id: 'outbound', label: '出库管理', icon: Package },
      { id: 'transfer', label: '移库调拨', icon: Truck },
      { id: 'inventory', label: '库存盘点', icon: ClipboardList },
      { id: 'damage', label: '报损管理', icon: AlertTriangle }
    ]
  },
  {
    id: 'business',
    label: '业务管理',
    icon: ShoppingCart,
    description: '采购/销售/审批/仓库/报损',
    badge: '5',
    subItems: [
      { id: 'purchase', label: '采购管理', icon: ShoppingCart },
      { id: 'sales', label: '销售管理', icon: DollarSign },
      { id: 'workflow', label: '审批流程', icon: FileText },
      { id: 'business-warehouse', label: '仓库管理', icon: Warehouse },
      { id: 'business-damage', label: '报损管理', icon: AlertTriangle }
    ]
  },
  {
    id: 'reports',
    label: '报表管理',
    icon: BarChart3,
    description: '数据分析与报表生成'
  },
  {
    id: 'basicData',
    label: '基础资料',
    icon: Database,
    description: '仓库/物料/供应商管理',
    subItems: [
      { id: 'warehouses', label: '仓库档案', icon: Building },
      { id: 'materials', label: '物料档案', icon: Package },
      { id: 'suppliers', label: '供应商管理', icon: Users }
    ]
  },
  {
    id: 'settings',
    label: '系统设置',
    icon: Settings,
    description: '用户/权限/系统配置',
    subItems: [
      { id: 'users', label: '用户管理', icon: Users },
      { id: 'roles', label: '角色权限', icon: Settings },
      { id: 'workflows', label: '审批流引擎', icon: FileText }
    ]
  }
];

interface SidebarProps {
  activeModule?: string;
  onModuleChange?: (moduleId: string, subModuleId?: string) => void;
  user?: any;
  collapsed?: boolean;
}

export function Sidebar({ activeModule, onModuleChange, user, collapsed = false }: SidebarProps) {
  const [expandedItems, setExpandedItems] = React.useState(['warehouse', 'business']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const hasPermission = (moduleId: string) => {
    // 这里可以根据用户角色实现权限控制
    if (!user) return false;
    
    // 管理员有所有权限
    if (user.role === '系统管理员') return true;
    
    // 仓库管理员权限
    if (user.role === '仓库管理员') {
      return ['dashboard', 'warehouse', 'basicData', 'reports'].includes(moduleId);
    }
    
    // 业务人员权限
    if (user.role === '业务人员') {
      return ['dashboard', 'business', 'reports'].includes(moduleId);
    }
    
    // 普通用户权限
    return ['dashboard'].includes(moduleId);
  };

  return (
    <div className={`flex flex-col h-full ${collapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-300`}>
      {/* Logo和公司信息 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Warehouse className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">仓储管理</h1>
            <p className="text-xs text-gray-500">物资管理系统</p>
          </div>
        </div>
      </div>

      {/* 用户信息 */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || '用户'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.role || '角色'}
            </p>
          </div>
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const hasAccess = hasPermission(item.id);
          const isActive = activeModule === item.id;
          const isExpanded = expandedItems.includes(item.id);
          const hasSubItems = item.subItems && item.subItems.length > 0;

          if (!hasAccess) return null;

          return (
            <div key={item.id} className="space-y-1">
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-auto p-3",
                  isActive && "bg-primary text-primary-foreground",
                  !isActive && "hover:bg-gray-100"
                )}
                onClick={() => {
                  if (hasSubItems) {
                    toggleExpanded(item.id);
                  } else {
                    onModuleChange?.(item.id);
                  }
                }}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs opacity-70 mt-0.5">{item.description}</p>
                </div>
                {hasSubItems && (
                  <div className={cn(
                    "transition-transform duration-200",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}>
                    <Settings className="h-3 w-3" />
                  </div>
                )}
              </Button>

              {/* 子菜单 */}
              {hasSubItems && isExpanded && (
                <div className="ml-4 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Button
                      key={subItem.id}
                      variant="ghost"
                      className="w-full justify-start gap-3 h-auto p-2 text-sm"
                      onClick={() => onModuleChange?.(item.id, subItem.id)}
                    >
                      <subItem.icon className="h-3 w-3 flex-shrink-0 opacity-70" />
                      <span>{subItem.label}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* 底部信息 */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span>系统版本:</span>
            <span>v1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>最后更新:</span>
            <span>2024-12-19</span>
          </div>
        </div>
      </div>
    </div>
  );
}