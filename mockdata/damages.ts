export const damageTypes = [
  {
    value: '损坏报损',
    label: '损坏报损',
    description: '物料因物理损坏、变质等原因报损',
    className: 'bg-red-100 text-red-800',
  },
  {
    value: '丢失报损',
    label: '丢失报损',
    description: '物料因丢失、被盗等原因报损',
    className: 'bg-yellow-100 text-yellow-800',
  },
  {
    value: '其他报损',
    label: '其他报损',
    description: '其他未分类的报损原因',
    className: 'bg-gray-100 text-gray-800',
  },
];

export const damageStatusOptions = [
  { value: 'all', label: '全部状态' },
  { value: 'pending', label: '待审核' },
  { value: 'approved', label: '审核成功' },
  { value: 'rejected', label: '审核失败' },
];

// Import mockProducts from warehouse data to avoid conflicts
export { mockProducts } from './warehouse';

export const mockDamageRecords = [
  {
    id: 'DMG-2023001',
    productName: '标准螺丝M6x20',
    productCode: 'M001',
    quantity: 2,
    damageType: '损坏报损',
    reason: '运输过程中包装破损，导致部分螺丝生锈，无法使用。',
    damageTime: '2023-10-26 10:30',
    operator: '张三',
    status: 'approved',
    attachments: ['damage-photo-1.jpg', 'damage-photo-2.jpg'],
    reviewComment: '情况属实，批准报损。',
    reviewer: '李四',
    reviewTime: '2023-10-26 14:00',
  },
  {
    id: 'DMG-2023002',
    productName: '电阻100Ω',
    productCode: 'M002',
    quantity: 1,
    damageType: '丢失报损',
    reason: '在仓库盘点时发现丢失电阻，具体原因不明。',
    damageTime: '2023-10-25 15:00',
    operator: '王五',
    status: 'pending',
    attachments: [],
    reviewComment: null,
    reviewer: null,
    reviewTime: null,
  },
  {
    id: 'DMG-2023003',
    productName: '电机轴承',
    productCode: 'M008',
    quantity: 5,
    damageType: '其他报损',
    reason: '一批轴承已过保质期，按规定需要报废处理。',
    damageTime: '2023-10-24 09:00',
    operator: '张三',
    status: 'rejected',
    attachments: ['quality-report.pdf'],
    reviewComment: '过期报废应走另一流程，非报损流程。已驳回。',
    reviewer: '李四',
    reviewTime: '2023-10-24 11:30',
  },
];