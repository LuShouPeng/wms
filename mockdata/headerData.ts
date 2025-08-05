export const mockNotifications = [
  { 
    id: 1, 
    type: 'warning', 
    title: '库存预警',
    message: '物料A001库存不足，当前仅剩15个',
    time: '5分钟前',
    isRead: false,
    module: 'warehouse',
    productCode: 'A001',
    productName: '标准螺丝M6x20',
    currentStock: 15,
    minStock: 50
  },
  { 
    id: 2, 
    type: 'info', 
    title: '待审批', 
    message: '采购单PO-2024-001等待您的审批', 
    time: '10分钟前',
    isRead: false,
    module: 'business'
  },
  { 
    id: 3, 
    type: 'success', 
    title: '入库完成', 
    message: '入库单IN-2024-058已完成处理', 
    time: '1小时前',
    isRead: true,
    module: 'warehouse'
  },
  { 
    id: 4, 
    type: 'info', 
    title: '系统更新', 
    message: '系统将于今晚23:00进行维护更新', 
    time: '2小时前',
    isRead: true,
    module: null
  }
];