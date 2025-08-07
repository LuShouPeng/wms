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
    id: 'sales',
    title: '销售管理',
    description: '管理销售订单、客户关系和销售流程',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    stats: { pending: 5, completed: 18, total: 23 }
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
  { type: '销售', content: 'SO-2024-015 已完成发货', time: '30分钟前', status: 'shipped' },
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
      title: '本月销售',
      value: '¥76,330',
      description: '+8.2% 较上月',
      icon: DollarSign,
    },
    {
      title: '待审批',
      value: '8',
      description: '采购单待处理',
      icon: Clock,
    },
    {
      title: '已完成',
      value: '25',
      description: '本月订单',
      icon: CheckCircle,
    }
];
