// 系统设置模拟数据
export const mockUsers = [
  {
    id: 'U001',
    username: 'admin',
    name: '系统管理员',
    role: '超级管理员',
    department: '信息部',
    email: 'admin@company.com',
    phone: '13800138000',
    status: 'active',
    lastLogin: '2024-01-15 10:30'
  },
  {
    id: 'U002',
    username: 'warehouse001',
    name: '张仓管',
    role: '仓库管理员',
    department: '仓储部',
    email: 'zhang@company.com',
    phone: '13800138001',
    status: 'active',
    lastLogin: '2024-01-15 09:15'
  },
  {
    id: 'U003',
    username: 'purchase001',
    name: '李采购',
    role: '采购员',
    department: '采购部',
    email: 'li@company.com',
    phone: '13800138002',
    status: 'inactive',
    lastLogin: '2024-01-10 16:45'
  }
];

export const mockRoles = [
  {
    id: 'R001',
    name: '超级管理员',
    description: '拥有系统所有权限',
    permissions: 15,
    userCount: 1,
    status: 'active'
  },
  {
    id: 'R002',
    name: '仓库管理员',
    description: '管理仓库相关业务',
    permissions: 8,
    userCount: 5,
    status: 'active'
  },
  {
    id: 'R003',
    name: '采购员',
    description: '负责采购业务',
    permissions: 6,
    userCount: 3,
    status: 'active'
  },
  {
    id: 'R004',
    name: '财务人员',
    description: '处理财务相关业务',
    permissions: 4,
    userCount: 2,
    status: 'active'
  }
];

export const mockWorkflows = [
  {
    id: 'WF001',
    name: '采购审批流程',
    type: '采购管理',
    steps: 3,
    condition: '金额 > 10000',
    status: 'active'
  },
  {
    id: 'WF002',
    name: '大额出库审批',
    type: '仓库管理',
    steps: 2,
    condition: '价值 > 5000',
    status: 'active'
  },
  {
    id: 'WF003',
    name: '新供应商审批',
    type: '基础资料',
    steps: 4,
    condition: '新供应商',
    status: 'draft'
  }
];

// 报损记录模拟数据
export const mockDamageRecords = [
  {
    id: 'DMG-2024-001',
    damageType: '损坏报损',
    productName: '标准螺丝M6x20',
    productCode: 'M001',
    quantity: 50,
    reason: '运输过程中包装破损，导致螺丝变形，无法正常使用',
    damageTime: '2024-01-15 14:30',
    operator: '张三',
    status: 'pending',
    attachments: ['damage_photo_1.jpg', 'package_damage.jpg'],
    reviewComment: '',
    reviewer: '',
    reviewTime: ''
  },
  {
    id: 'DMG-2024-002',
    damageType: '丢失报损',
    productName: '电阻100Ω',
    productCode: 'M002',
    quantity: 200,
    reason: '月度盘点时发现物料短缺，经查找后确认丢失',
    damageTime: '2024-01-14 16:45',
    operator: '李四',
    status: 'approved',
    attachments: ['inventory_report.pdf'],
    reviewComment: '已核实确认丢失，库存记录与实物不符，同意报损处理',
    reviewer: '王经理',
    reviewTime: '2024-01-15 09:30'
  },
  {
    id: 'DMG-2024-003',
    damageType: '其他报损',
    productName: '电容10μF',
    productCode: 'M003',
    quantity: 30,
    reason: '质量检测发现电容参数异常，无法正常使用',
    damageTime: '2024-01-13 11:20',
    operator: '王五',
    status: 'rejected',
    attachments: ['quality_test_report.pdf', 'test_data.xlsx'],
    reviewComment: '需要联系供应商进行质量分析，暂不同意报损，建议退货处理',
    reviewer: '李经理',
    reviewTime: '2024-01-14 10:15'
  },
  {
    id: 'DMG-2024-004',
    damageType: '损坏报损',
    productName: '集成电路芯片',
    productCode: 'M004',
    quantity: 5,
    reason: '静电放电导致芯片损坏，功能测试失败',
    damageTime: '2024-01-12 09:15',
    operator: '赵六',
    status: 'pending',
    attachments: ['chip_damage.jpg', 'test_result.pdf', 'esd_report.doc'],
    reviewComment: '',
    reviewer: '',
    reviewTime: ''
  },
  {
    id: 'DMG-2024-005',
    damageType: '损坏报损',
    productName: '导线2.5mm²',
    productCode: 'M005',
    quantity: 100,
    reason: '仓储过程中受潮导致绝缘层老化破损',
    damageTime: '2024-01-11 15:30',
    operator: '钱七',
    status: 'approved',
    attachments: ['humidity_damage.jpg'],
    reviewComment: '确认为仓储环境问题导致，同意报损，需改善仓储条件',
    reviewer: '张主管',
    reviewTime: '2024-01-12 11:20'
  },
  {
    id: 'DMG-2024-006',
    damageType: '丢失报损',
    productName: '保险丝5A',
    productCode: 'M006',
    quantity: 80,
    reason: '盘点发现库存数量与系统记录不符，疑似丢失',
    damageTime: '2024-01-10 13:45',
    operator: '孙八',
    status: 'pending',
    attachments: [],
    reviewComment: '',
    reviewer: '',
    reviewTime: ''
  }
];

// 产品选项数据
export const mockProducts = [
  { code: 'M001', name: '标准螺丝M6x20', category: '五金件', unit: '个' },
  { code: 'M002', name: '电阻100Ω', category: '电子元件', unit: '个' },
  { code: 'M003', name: '电容10μF', category: '电子元件', unit: '个' },
  { code: 'M004', name: '集成电路芯片', category: '电子元件', unit: '个' },
  { code: 'M005', name: '导线2.5mm²', category: '电缆线材', unit: '米' },
  { code: 'M006', name: '保险丝5A', category: '电子元件', unit: '个' },
  { code: 'M007', name: '继电器12V', category: '电子元件', unit: '个' },
  { code: 'M008', name: '电机轴承', category: '机械零件', unit: '个' }
];

// 报损类型选项
export const damageTypes = [
  { value: '损坏报损', label: '损坏报损', description: '产品在使用或存储过程中发生物理损坏' },
  { value: '丢失报损', label: '丢失报损', description: '产品丢失或无法找到' },
  { value: '其他报损', label: '其他报损', description: '质量问题、过期等其他原因' }
];