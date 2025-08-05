// 报表模拟数据

// 库存数据
export const inventoryData = [
  { code: 'M001', name: '标准螺丝M6x20', category: '五金件', stock: 150, unit: '个', value: '¥750', status: 'low' },
  { code: 'M002', name: '电阻100Ω', category: '电子元件', stock: 800, unit: '个', value: '¥1,600', status: 'normal' },
  { code: 'M003', name: '电容10μF', category: '电子元件', stock: 300, unit: '个', value: '¥3,000', status: 'normal' },
  { code: 'M004', name: '集成电路芯片', category: '电子元件', stock: 45, unit: '个', value: '¥4,500', status: 'low' },
  { code: 'M005', name: '导线2.5mm²', category: '电缆线材', stock: 1200, unit: '米', value: '¥6,000', status: 'high' }
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

// 预警报表数据
export const alertData = [
  { code: 'M001', name: '标准螺丝M6x20', currentStock: 150, minStock: 200, alertLevel: 'medium' },
  { code: 'M004', name: '集成电路芯片', currentStock: 45, minStock: 100, alertLevel: 'high' },
  { code: 'M007', name: '保险丝5A', currentStock: 20, minStock: 50, alertLevel: 'high' },
  { code: 'M010', name: '继电器12V', currentStock: 80, minStock: 120, alertLevel: 'medium' }
];