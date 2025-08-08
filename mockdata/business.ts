import {
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  FileText,
  AlertTriangle,
} from 'lucide-react';

// 统计数据
export const stats = [
  {
    title: '本月采购',
    value: '¥105,630',
    description: '+12.5% 较上月',
    icon: ShoppingCart,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: '本月销售',
    value: '¥76,330',
    description: '+8.2% 较上月',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: '待审批',
    value: '8',
    description: '采购单待处理',
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    title: '已完成',
    value: '25',
    description: '本月订单',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  }
];

// 功能模块
export const businessModules = [
  {
    id: 'purchase',
    title: '采购管理',
    description: '管理采购申请、订单和供应商关系',
    icon: ShoppingCart,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    stats: { pending: 8, completed: 15, total: 23 }
  },
  {
    id: 'department',
    title: '部门管理',
    description: '管理公司部门、员工配置和组织架构',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    stats: { total: 8, active: 7, employees: 156 }
  },
  {
    id: 'workflow',
    title: '审批流程',
    description: '配置和管理业务审批流程',
    icon: FileText,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    stats: { active: 6, templates: 12, total: 18 }
  },
  {
    id: 'business-damage',
    title: '报损管理',
    description: '处理物料损坏、丢失等报损申请',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    stats: { pending: 3, approved: 7, rejected: 2 }
  }
];

// 最近动态数据
export const recentActivities = [
  { type: '采购', content: 'PO-2024-001 已审批通过', time: '10分钟前', status: 'approved' },
  { type: '部门', content: '新增技术部，负责人：张三', time: '30分钟前', status: 'created' },
  { type: '审批', content: '新增采购审批流程模板', time: '1小时前', status: 'created' },
  { type: '报损', content: 'DMG-2024-005 报损申请已提交', time: '2小时前', status: 'pending' }
];

// 供应商列表
export const suppliers = [
  { id: 'sup-001', name: '供应商A' },
  { id: 'sup-002', name: '供应商B' },
  { id: 'sup-003', name: '供应商C' },
];

// 客户列表
export const customers = [
  { id: 'cus-001', name: '客户A' },
  { id: 'cus-002', name: '客户B' },
  { id: 'cus-003', name: '客户C' },
];

// 业务管理页面统计卡片数据
export const businessStats = [
    {
      title: '本月采购',
      value: '¥105,630',
      description: '+12.5% 较上月',
      icon: ShoppingCart,
    },
    {
      title: '部门总数',
      value: '8',
      description: '个部门',
      icon: DollarSign,
    },
    {
      title: '员工总数',
      value: '156',
      description: '名员工',
      icon: Clock,
    },
    {
      title: '活跃部门',
      value: '7',
      description: '个部门活跃',
      icon: CheckCircle,
    }
];

// 部门数据
export const departments = [
    {
      id: 'dept-001',
      name: '技术部',
      code: 'TECH',
      manager: '张三',
      employeeCount: 25,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 'dept-002',
      name: '销售部',
      code: 'SALES',
      manager: '李四',
      employeeCount: 18,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 'dept-003',
      name: '采购部',
      code: 'PURCH',
      manager: '王五',
      employeeCount: 12,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 'dept-004',
      name: '财务部',
      code: 'FIN',
      manager: '赵六',
      employeeCount: 8,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 'dept-005',
      name: '人力资源部',
      code: 'HR',
      manager: '钱七',
      employeeCount: 6,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 'dept-006',
      name: '仓库部',
      code: 'WH',
      manager: '孙八',
      employeeCount: 15,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 'dept-007',
      name: '质量部',
      code: 'QA',
      manager: '周九',
      employeeCount: 10,
      status: 'pending',
      createdAt: '2024-02-01'
    },
    {
      id: 'dept-008',
      name: '行政部',
      code: 'ADMIN',
      manager: '吴十',
      employeeCount: 5,
      status: 'pending',
      createdAt: '2024-02-15'
    }
];
