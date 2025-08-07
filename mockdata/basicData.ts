// 基础资料模拟数据

// 仓库数据
export const mockWarehouses = [
  {
    id: 'WH001',
    name: '主仓库A',
    location: '北京市朝阳区xxx路123号',
    manager: '张经理',
    phone: '010-12345678',
    capacity: '10000',
    utilization: '75%',
    status: 'active'
  },
  {
    id: 'WH002',
    name: '分仓库B',
    location: '北京市海淀区xxx路456号',
    manager: '李经理',
    phone: '010-87654321',
    capacity: '5000',
    utilization: '60%',
    status: 'active'
  },
  {
    id: 'WH003',
    name: '临时仓库C',
    location: '北京市丰台区xxx路789号',
    manager: '王经理',
    phone: '010-11223344',
    capacity: '2000',
    utilization: '30%',
    status: 'maintenance'
  }
];

// 供应商合作分析数据
export const supplierCooperationAnalysis = {
  cooperationRate: '95%',
  averageCooperationDuration: '3.5年',
  qualityScore: '4.8/5',
  onTimeDeliveryRate: '98%',
  newSuppliers: '5家 (本月)'
};

// 物料数据
export const mockMaterials = [
  {
    code: 'M001',
    name: '标准螺丝M6x20',
    category: '五金件',
    unit: '个',
    supplier: '供应商A',
    price: '¥5.00',
    minStock: 200,
    status: 'active'
  },
  {
    code: 'M002',
    name: '电阻100Ω',
    category: '电子元件',
    unit: '个',
    supplier: '供应商B',
    price: '¥2.00',
    minStock: 500,
    status: 'active'
  },
  {
    code: 'M003',
    name: '电容10μF',
    category: '电子元件',
    unit: '个',
    supplier: '供应商C',
    price: '¥10.00',
    minStock: 100,
    status: 'discontinued'
  }
];

// 供应商数据
export const mockSuppliers = [
  {
    id: 'SUP001',
    name: '北京xx电子有限公司',
    contact: '李总',
    phone: '010-12345678',
    email: 'li@example.com',
    address: '北京市朝阳区xxx路123号',
    category: '电子元件',
    status: 'active'
  },
  {
    id: 'SUP002',
    name: '上海xx五金有限公司',
    contact: '王总',
    phone: '021-87654321',
    email: 'wang@example.com',
    address: '上海市浦东新区xxx路456号',
    category: '五金件',
    status: 'active'
  }
];