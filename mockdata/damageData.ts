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

// 报损类型选项
export const damageTypes = [
  { value: '损坏报损', label: '损坏报损', description: '产品在使用或存储过程中发生物理损坏' },
  { value: '丢失报损', label: '丢失报损', description: '产品丢失或无法找到' },
  { value: '其他报损', label: '其他报损', description: '质量问题、过期等其他原因' }
];