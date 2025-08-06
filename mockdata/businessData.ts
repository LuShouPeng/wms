// 业务管理模拟数据

// 采购订单数据
export const purchaseOrders = [
  {
    id: 'PO-2024-001',
    date: '2024-01-15',
    supplier: '供应商A',
    amount: '¥25,680',
    status: 'approved',
    items: 5,
    operator: '张三',
    approver: '李经理'
  },
  {
    id: 'PO-2024-002',
    date: '2024-01-15',
    supplier: '供应商B',
    amount: '¥18,750',
    status: 'pending',
    items: 3,
    operator: '李四',
    approver: '待分配'
  },
  {
    id: 'PO-2024-003',
    date: '2024-01-14',
    supplier: '供应商C',
    amount: '¥52,300',
    status: 'processing',
    items: 8,
    operator: '王五',
    approver: '张总监'
  },
  {
    id: 'PO-2024-004',
    date: '2024-01-14',
    supplier: '供应商D',
    amount: '¥8,900',
    status: 'rejected',
    items: 2,
    operator: '赵六',
    approver: '李经理'
  }
];

// 销售订单数据
export const salesOrders = [
  {
    id: 'SO-2024-001',
    date: '2024-01-15',
    customer: '客户A',
    amount: '¥35,680',
    status: 'completed',
    items: 6,
    operator: '张三',
    salesperson: '王销售'
  },
  {
    id: 'SO-2024-002',
    date: '2024-01-15',
    customer: '客户B',
    amount: '¥22,450',
    status: 'pending',
    items: 4,
    operator: '李四',
    salesperson: '李销售'
  },
  {
    id: 'SO-2024-003',
    date: '2024-01-14',
    customer: '客户C',
    amount: '¥18,200',
    status: 'shipped',
    items: 3,
    operator: '王五',
    salesperson: '张销售'
  }
];