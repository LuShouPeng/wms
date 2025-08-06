// mockdata/sidebarData.ts
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
  DollarSign,
  PieChart,
  Activity,
  Bell
} from 'lucide-react';

export const menuItems = [
  {
    id: 'dashboard',
    label: '仪表盘',
    icon: LayoutDashboard,
    description: '数据概览与快捷操作',
    subItems: [
      { id: 'overview', label: '数据概览', icon: LayoutDashboard },
      { id: 'visualization', label: '数据大屏', icon: BarChart3 }
    ]
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
    description: '采购/销售/审批/报损',
    badge: '4',
    subItems: [
      { id: 'purchase', label: '采购管理', icon: ShoppingCart },
      { id: 'sales', label: '销售管理', icon: DollarSign },
      { id: 'workflow', label: '审批流程', icon: FileText },
      { id: 'business-damage', label: '报损管理', icon: AlertTriangle }
    ]
  },
  {
    id: 'reports',
    label: '报表管理',
    icon: BarChart3,
    description: '数据分析与报表生成',
    subItems: [
      { id: 'inventory', label: '库存报表', icon: Package },
      { id: 'financial', label: '财务报表', icon: DollarSign },
      { id: 'analysis', label: '趋势分析', icon: Activity },
      { id: 'alerts', label: '预警报表', icon: Bell }
    ]
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