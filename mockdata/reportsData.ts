// 报表模拟数据

// 库存数据
export const inventoryData = [
  { code: 'M001', name: '标准螺丝M6x20', category: '五金件', stock: 150, unit: '个', value: '¥750', status: 'low' },
  { code: 'M002', name: '电阻100Ω', category: '电子元件', stock: 800, unit: '个', value: '¥1,600', status: 'normal' },
  { code: 'M003', name: '电容10μF', category: '电子元件', stock: 300, unit: '个', value: '¥3,000', status: 'normal' },
  { code: 'M004', name: '集成电路芯片', category: '电子元件', stock: 45, unit: '个', value: '¥4,500', status: 'low' },
  { code: 'M005', name: '导线2.5mm²', category: '电缆线材', stock: 1200, unit: '米', value: '¥6,000', status: 'high' },
  { code: 'M006', name: '轴承608ZZ', category: '机械零件', stock: 200, unit: '个', value: '¥2,000', status: 'normal' },
  { code: 'M007', name: '保险丝5A', category: '电子元件', stock: 20, unit: '个', value: '¥100', status: 'low' },
  { code: 'M008', name: '螺母M8', category: '五金件', stock: 500, unit: '个', value: '¥250', status: 'normal' },
  { code: 'M009', name: '电线1.5mm²', category: '电缆线材', stock: 800, unit: '米', value: '¥3,200', status: 'high' },
  { code: 'M010', name: '继电器12V', category: '电子元件', stock: 80, unit: '个', value: '¥1,600', status: 'low' },
  { code: 'M011', name: '齿轮模数2', category: '机械零件', stock: 150, unit: '个', value: '¥1,500', status: 'normal' },
  { code: 'M012', name: '弹簧压缩型', category: '机械零件', stock: 300, unit: '个', value: '¥900', status: 'normal' }
];

// 库存趋势数据
export const stockTrendData = [
  { month: '1月', inbound: 2400, outbound: 1800, stock: 4800 },
  { month: '2月', inbound: 1398, outbound: 2200, stock: 4000 },
  { month: '3月', inbound: 9800, outbound: 2800, stock: 11000 },
  { month: '4月', inbound: 3908, outbound: 3200, stock: 11700 },
  { month: '5月', inbound: 4800, outbound: 2600, stock: 13900 },
  { month: '6月', inbound: 3800, outbound: 4100, stock: 13600 }
];

// 物料分类分布数据
export const categoryData = [
  { name: '五金件', value: 30, color: '#0088FE' },
  { name: '电子元件', value: 45, color: '#00C49F' },
  { name: '电缆线材', value: 15, color: '#FFBB28' },
  { name: '机械零件', value: 10, color: '#FF8042' }
];

// 财务数据
export const financialData = [
  { month: '1月', purchase: 45000, sales: 38000, profit: -7000 },
  { month: '2月', purchase: 52000, sales: 42000, profit: -10000 },
  { month: '3月', purchase: 48000, sales: 55000, profit: 7000 },
  { month: '4月', purchase: 61000, sales: 58000, profit: -3000 },
  { month: '5月', purchase: 55000, sales: 62000, profit: 7000 },
  { month: '6月', purchase: 59000, sales: 68000, profit: 9000 }
];

// 季度财务数据
export const quarterlyData = [
  { quarter: 'Q1', purchase: 145000, sales: 135000, profit: -10000 },
  { quarter: 'Q2', purchase: 175000, sales: 185000, profit: 10000 },
  { quarter: 'Q3', purchase: 160000, sales: 170000, profit: 10000 },
  { quarter: 'Q4', purchase: 180000, sales: 195000, profit: 15000 }
];

// 预警报表数据
export const alertData = [
  { code: 'M001', name: '标准螺丝M6x20', currentStock: 150, minStock: 200, alertLevel: 'medium' },
  { code: 'M004', name: '集成电路芯片', currentStock: 45, minStock: 100, alertLevel: 'high' },
  { code: 'M007', name: '保险丝5A', currentStock: 20, minStock: 50, alertLevel: 'high' },
  { code: 'M010', name: '继电器12V', currentStock: 80, minStock: 120, alertLevel: 'medium' }
];

// 预测数据（基于历史趋势）
export const forecastData = [
  ...stockTrendData,
  { month: '7月', inbound: 4200, outbound: 3800, stock: 14000 },
  { month: '8月', inbound: 3900, outbound: 4200, stock: 13700 },
  { month: '9月', inbound: 4500, outbound: 3600, stock: 14600 }
];

// 库存周转率数据
export const turnoverData = [
  { month: '1月', turnoverRate: 2.1, efficiency: 85 },
  { month: '2月', turnoverRate: 2.3, efficiency: 87 },
  { month: '3月', turnoverRate: 2.0, efficiency: 82 },
  { month: '4月', turnoverRate: 2.5, efficiency: 89 },
  { month: '5月', turnoverRate: 2.4, efficiency: 88 },
  { month: '6月', turnoverRate: 2.6, efficiency: 91 }
];

// 趋势分析洞察数据
export const trendInsights = {
  positive: [
    { title: '库存周转率提升', description: '6月周转率达到2.6，创6个月新高' },
    { title: '运营效率稳步提升', description: '平均效率从85%提升至91%' },
    { title: '出库量保持稳定', description: '月度出库量维持在3800-4100区间' }
  ],
  concerns: [
    { title: '入库量波动较大', description: '3月入库量激增后，4-6月逐步下降' },
    { title: '库存水位偏高', description: '当前库存13,600，建议优化库存结构' },
    { title: '季节性波动明显', description: '需要建立更好的需求预测机制' }
  ],
  recommendations: [
    { title: '优化采购计划', description: '基于历史数据建立更精准的采购预测' },
    { title: '提升库存周转', description: '目标周转率提升到3.0以上' },
    { title: '加强需求管理', description: '建立动态需求预测和库存调整机制' }
  ]
};