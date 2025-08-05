// Dashboard 模拟数据
export const mockDashboardData = {
  overview: {
    totalProducts: 1256,
    totalWarehouses: 8,
    lowStockItems: 23,
    pendingOrders: 15,
    todayInbound: 45,
    todayOutbound: 38,
    monthlyRevenue: 285000,
    monthlyGrowth: 12.5
  },
  recentActivities: [
    { id: 1, type: 'inbound', description: '物料A001入库', quantity: 100, time: '10分钟前', operator: '张三' },
    { id: 2, type: 'outbound', description: '产品B002出库', quantity: 50, time: '25分钟前', operator: '李四' },
    { id: 3, type: 'transfer', description: '库存调拨', quantity: 75, time: '1小时前', operator: '王五' },
    { id: 4, type: 'damage', description: '物料损坏报告', quantity: 5, time: '2小时前', operator: '赵六' }
  ],
  lowStockAlerts: [
    { id: 1, productCode: 'A001', productName: '标准螺丝M6x20', currentStock: 15, minStock: 50, status: 'critical' },
    { id: 2, productCode: 'B002', productName: '电阻100Ω', currentStock: 25, minStock: 30, status: 'warning' },
    { id: 3, productCode: 'C003', productName: '电容10μF', currentStock: 8, minStock: 20, status: 'critical' }
  ],
  pendingApprovals: [
    { id: 1, type: 'purchase', title: '采购申请PO-2024-001', applicant: '采购部', time: '2小时前' },
    { id: 2, type: 'damage', title: '报损审批DR-2024-015', applicant: '仓管员', time: '4小时前' },
    { id: 3, type: 'transfer', title: '调拨申请TR-2024-008', applicant: '生产部', time: '1天前' }
  ]
};