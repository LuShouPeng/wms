import { Package, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

export const reportStats = [
  {
    title: '库存总价值',
    value: '¥2,456,789',
    description: '+12.5% 较上月',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: '本月采购',
    value: '¥320,000',
    description: '+8.2% 较上月',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: '库存周转率',
    value: '2.4',
    description: '较上月持平',
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    title: '预警物料',
    value: '12',
    description: '需要补货',
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
];

// 最近生成的报表
export const recentReports = [
  { name: '6月库存汇总报表', type: '库存报表', time: '2小时前', status: '已完成' },
  { name: '财务月报-202406', type: '财务报表', time: '1天前', status: '已完成' },
  { name: '库存趋势分析报告', type: '趋势分析', time: '2天前', status: '已完成' },
  { name: '库存预警日报', type: '预警报表', time: '3小时前', status: '已完成' }
];