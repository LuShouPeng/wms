// 基础数据页面相关的模拟数据

import { Warehouse, Package, Users } from 'lucide-react';

// 基础数据首页统计数据
export const basicDataHomeStats = [
  {
    title: '今日新增仓库',
    value: '5',
    icon: Warehouse,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: '物料总数',
    value: '890',
    icon: Package,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: '供应商数量',
    value: '15',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  }
];

// 物料页面价格分析数据
export const materialPriceAnalysis = {
  averagePrice: '¥156.8',
  maxPrice: '¥2,500.0',
  minPrice: '¥5.5',
  priceChange: '+5.2%'
};

// 供应商页面合作分析数据
export const supplierCooperationAnalysis = {
  cooperationRate: '85.3%',
  averageCooperationDuration: '2.3年',
  qualityScore: '4.2/5.0',
  onTimeDeliveryRate: '92.6%',
  newSuppliers: '+12'
};