// mockdata/warehouseManagementData.ts

export const inboundOrders = [
  {
    id: 'IN-2024-001',
    date: '2024-01-15',
    supplier: '供应商A',
    materials: 5,
    totalValue: '¥12,580',
    status: 'completed',
    operator: '张三'
  },
  {
    id: 'IN-2024-002', 
    date: '2024-01-15',
    supplier: '供应商B',
    materials: 3,
    totalValue: '¥8,750',
    status: 'pending',
    operator: '李四'
  },
  {
    id: 'IN-2024-003',
    date: '2024-01-14',
    supplier: '供应商C',
    materials: 8,
    totalValue: '¥25,600',
    status: 'processing',
    operator: '王五'
  }
];

export const outboundOrders = [
  {
    id: 'OUT-2024-001',
    date: '2024-01-15',
    department: '生产部',
    materials: 4,
    totalValue: '¥6,800',
    status: 'completed',
    operator: '张三'
  },
  {
    id: 'OUT-2024-002',
    date: '2024-01-15', 
    department: '维修部',
    materials: 2,
    totalValue: '¥3,200',
    status: 'approved',
    operator: '李四'
  }
];

export const transferOrders = [
  {
    id: 'TR-2024-001',
    date: '2024-01-15',
    fromWarehouse: '仓库A',
    toWarehouse: '仓库B',
    materials: 3,
    status: 'completed',
    operator: '王五'
  }
];

export const inventoryOrders = [
  {
    id: 'IV-2024-001',
    date: '2024-01-15',
    warehouse: '仓库A',
    materials: 156,
    differences: 3,
    status: 'completed',
    operator: '张三'
  }
];

export const suppliers = [
    { value: "supplier1", label: "供应商A" },
    { value: "supplier2", label: "供应商B" },
    { value: "supplier3", label: "供应商C" },
];

export const warehouses = [
    { value: "warehouse1", label: "仓库A" },
    { value: "warehouse2", label: "仓库B" },
    { value: "warehouse3", label: "仓库C" },
];

export const departments = [
    { value: "production", label: "生产部" },
    { value: "maintenance", label: "维修部" },
    { value: "quality", label: "质检部" },
];