// 仓库管理相关模拟数据

// 物料产品数据
export const mockProducts = [
  { code: 'M001', name: '标准螺丝M6x20', category: '五金件', unit: '个' },
  { code: 'M002', name: '电阻100Ω', category: '电子元件', unit: '个' },
  { code: 'M003', name: '电容10μF', category: '电子元件', unit: '个' },
  { code: 'M004', name: '集成电路芯片', category: '电子元件', unit: '个' },
  { code: 'M005', name: '导线2.5mm²', category: '电缆线材', unit: '米' },
  { code: 'M006', name: '保险丝5A', category: '电子元件', unit: '个' },
  { code: 'M007', name: '继电器12V', category: '电子元件', unit: '个' },
  { code: 'M008', name: '电机轴承', category: '机械零件', unit: '个' },
  { code: 'M009', name: '轴承座', category: '机械零件', unit: '个' },
  { code: 'M010', name: '密封圈', category: '机械零件', unit: '个' },
  { code: 'M011', name: '连接器', category: '电子元件', unit: '个' },
  { code: 'M012', name: '开关按钮', category: '电子元件', unit: '个' }
];

// 供应商数据
export const warehouseSuppliers = [
  { value: 'supplier1', label: '供应商A' },
  { value: 'supplier2', label: '供应商B' },
  { value: 'supplier3', label: '供应商C' },
  { value: 'supplier4', label: '供应商D' },
  { value: 'supplier5', label: '供应商E' }
];

// 仓库数据
export const warehouses = [
  { 
    id: 'WH001', 
    name: '主仓库', 
    location: '北京市朝阳区xxx路123号', 
    status: 'active',
    value: 'warehouse1', 
    label: '主仓库' 
  },
  { 
    id: 'WH002', 
    name: '分仓库A', 
    location: '北京市海淀区xxx路456号', 
    status: 'active',
    value: 'warehouse2', 
    label: '分仓库A' 
  },
  { 
    id: 'WH003', 
    name: '分仓库B', 
    location: '北京市丰台区xxx路789号', 
    status: 'maintenance',
    value: 'warehouse3', 
    label: '分仓库B' 
  },
  { 
    id: 'WH004', 
    name: '原材料仓', 
    location: '北京市通州区xxx路321号', 
    status: 'active',
    value: 'warehouse4', 
    label: '原材料仓' 
  },
  { 
    id: 'WH005', 
    name: '成品仓', 
    location: '北京市昌平区xxx路654号', 
    status: 'inactive',
    value: 'warehouse5', 
    label: '成品仓' 
  }
];

// 部门数据
export const departments = [
  { value: 'production', label: '生产部' },
  { value: 'maintenance', label: '维修部' },
  { value: 'quality', label: '质检部' },
  { value: 'logistics', label: '物流部' },
  { value: 'administration', label: '行政部' }
];

// 入库单数据
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
  },
  {
    id: 'IN-2024-004',
    date: '2024-01-13',
    supplier: '供应商D',
    materials: 12,
    totalValue: '¥32,100',
    status: 'completed',
    operator: '赵六'
  },
  {
    id: 'IN-2024-005',
    date: '2024-01-12',
    supplier: '供应商A',
    materials: 6,
    totalValue: '¥15,300',
    status: 'approved',
    operator: '孙七'
  }
];

// 出库单数据
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
  },
  {
    id: 'OUT-2024-003',
    date: '2024-01-14',
    department: '质检部',
    materials: 8,
    totalValue: '¥12,400',
    status: 'processing',
    operator: '王五'
  },
  {
    id: 'OUT-2024-004',
    date: '2024-01-13',
    department: '物流部',
    materials: 3,
    totalValue: '¥5,600',
    status: 'completed',
    operator: '赵六'
  },
  {
    id: 'OUT-2024-005',
    date: '2024-01-12',
    department: '行政部',
    materials: 5,
    totalValue: '¥8,900',
    status: 'pending',
    operator: '孙七'
  }
];

// 移库单数据
export const transferOrders = [
  {
    id: 'TR-2024-001',
    date: '2024-01-15',
    fromWarehouse: '主仓库',
    toWarehouse: '分仓库A',
    materials: 3,
    status: 'completed',
    operator: '王五'
  },
  {
    id: 'TR-2024-002',
    date: '2024-01-14',
    fromWarehouse: '原材料仓',
    toWarehouse: '主仓库',
    materials: 8,
    status: 'processing',
    operator: '张三'
  },
  {
    id: 'TR-2024-003',
    date: '2024-01-13',
    fromWarehouse: '分仓库B',
    toWarehouse: '成品仓',
    materials: 5,
    status: 'completed',
    operator: '李四'
  },
  {
    id: 'TR-2024-004',
    date: '2024-01-12',
    fromWarehouse: '主仓库',
    toWarehouse: '原材料仓',
    materials: 2,
    status: 'pending',
    operator: '赵六'
  }
];

// 盘点单数据
export const inventoryOrders = [
  {
    id: 'IV-2024-001',
    date: '2024-01-15',
    warehouse: '主仓库',
    materials: 156,
    differences: 3,
    status: 'completed',
    operator: '张三'
  },
  {
    id: 'IV-2024-002',
    date: '2024-01-14',
    warehouse: '分仓库A',
    materials: 89,
    differences: -2,
    status: 'processing',
    operator: '李四'
  },
  {
    id: 'IV-2024-003',
    date: '2024-01-13',
    warehouse: '原材料仓',
    materials: 234,
    differences: 5,
    status: 'completed',
    operator: '王五'
  },
  {
    id: 'IV-2024-004',
    date: '2024-01-12',
    warehouse: '成品仓',
    materials: 67,
    differences: -1,
    status: 'pending',
    operator: '赵六'
  }
];

// 仓库统计数据
export const warehouseStats = {
  todayInbound: 23,
  todayOutbound: 18,
  transferOperations: 5,
  damageRecords: 8,
  alerts: 3,
  totalWarehouses: 5,
  activeWarehouses: 4,
  totalProducts: 156,
  lowStockProducts: 12
};

// 仓库状态选项
export const warehouseStatusOptions = [
  { value: 'all', label: '全部状态' },
  { value: 'active', label: '运行中' },
  { value: 'maintenance', label: '维护中' },
  { value: 'inactive', label: '停用' },
];

// 仓库表单占位符
export const warehouseFormPlaceholders = {
  id: '如：WH004',
  name: '输入仓库名称',
  location: '详细地址',
  manager: '管理员姓名',
  phone: '联系电话',
  capacity: '容量（立方米）',
};

// 仓库选项别名
export const warehouseOptions = warehouses;

// 仓库部门别名
export const warehouseDepartments = departments;

// 仓库数据别名
export const mockWarehouses = warehouses;

// 物料状态选项
export const materialStatusOptions = [
  { value: 'active', label: '正常' },
  { value: 'inactive', label: '停用' },
  { value: 'discontinued', label: '停产' },
];

// 物料单位选项
export const materialUnits = [
  { value: 'piece', label: '个' },
  { value: 'meter', label: '米' },
  { value: 'kg', label: '千克' },
  { value: 'box', label: '箱' },
  { value: 'set', label: '套' },
];

// 物料类别选项
export const materialCategories = [
  '五金件',
  '电子元件',
  '电缆线材',
  '机械零件',
  '化工原料',
  '包装材料'
];

// 仓库编辑页面数据
export const editPageDepartments = [
  { value: 'finance', label: '财务部' },
  { value: 'it', label: '信息技术部' },
  { value: 'production', label: '生产部' },
  { value: 'logistics', label: '物流部' },
  { value: 'hr', label: '人力资源中心' },
];

// 仓库类型
export const warehouseTypes = [
  { value: 'product', label: '成品仓' },
  { value: 'raw_material', label: '原材料仓' },
  { value: 'finished_goods', label: '半成品仓' },
  { value: 'spare_parts', label: '备品备件仓' },
  { value: 'temporary', label: '暂存仓' },
];

// 编辑页面供应商数据
export const editPageSuppliers = [
  {
    value: 'supplier_a',
    label: 'A供应商公司',
    contact: '张三',
    phone: '13800138000',
  },
  {
    value: 'supplier_b',
    label: 'B科技有限公司',
    contact: '李四',
    phone: '13900139000',
  },
  {
    value: 'supplier_c',
    label: 'C集团',
    contact: '王五',
    phone: '13700137000',
  },
];

// 仓库编辑页表单模拟数据
export const mockWarehouseFormData = {
  warehouseName: '主仓库A',
  department: 'logistics',
  warehouseType: 'product',
  leaseTime: '2024-01-01',
  description: '用于存放成品和半成品的主要仓库',
  area: '1000',
  address: '北京市朝阳区xxx路123号',
  contactPerson: '张经理',
  phone: '13800138000',
  supplierId: 'supplier_a',
  supplierName: 'A供应商公司'
};