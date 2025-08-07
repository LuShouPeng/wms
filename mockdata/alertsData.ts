// 预警报表模拟数据

// 预警数据
export const alertsData = [
  {
    id: 1,
    type: 'low_stock',
    typeName: '库存不足',
    material: 'LED灯珠',
    code: 'LED-001',
    currentStock: 50,
    minStock: 100,
    maxStock: 500,
    severity: 'high',
    severityName: '高',
    location: 'A-01-01',
    lastUpdate: '2024-01-15 09:30',
    status: 'active',
    description: '当前库存低于安全库存，建议立即补货'
  },
  {
    id: 2,
    type: 'overstock',
    typeName: '库存过量',
    material: '电阻器',
    code: 'RES-002',
    currentStock: 2800,
    minStock: 200,
    maxStock: 1000,
    severity: 'medium',
    severityName: '中',
    location: 'B-02-03',
    lastUpdate: '2024-01-15 08:45',
    status: 'active',
    description: '库存超过最大库存量，占用仓储空间'
  },
  {
    id: 3,
    type: 'expired',
    typeName: '即将过期',
    material: '化学试剂A',
    code: 'CHE-003',
    currentStock: 150,
    minStock: 50,
    maxStock: 300,
    severity: 'high',
    severityName: '高',
    location: 'C-01-05',
    lastUpdate: '2024-01-15 07:20',
    status: 'active',
    description: '物料将在7天内过期，需要优先使用或处理'
  },
  {
    id: 4,
    type: 'slow_moving',
    typeName: '呆滞物料',
    material: '旧版芯片',
    code: 'CHIP-004',
    currentStock: 500,
    minStock: 100,
    maxStock: 800,
    severity: 'medium',
    severityName: '中',
    location: 'D-03-02',
    lastUpdate: '2024-01-14 16:30',
    status: 'active',
    description: '90天内无出库记录，建议检查物料状态'
  },
  {
    id: 5,
    type: 'quality',
    typeName: '质量异常',
    material: '精密零件',
    code: 'PRE-005',
    currentStock: 80,
    minStock: 50,
    maxStock: 200,
    severity: 'high',
    severityName: '高',
    location: 'E-01-08',
    lastUpdate: '2024-01-14 14:15',
    status: 'active',
    description: '检测到质量异常，需要隔离检查'
  },
  {
    id: 6,
    type: 'location',
    typeName: '位置异常',
    material: '标准螺丝',
    code: 'SCR-006',
    currentStock: 1200,
    minStock: 500,
    maxStock: 2000,
    severity: 'low',
    severityName: '低',
    location: '位置未知',
    lastUpdate: '2024-01-14 11:20',
    status: 'active',
    description: '物料位置信息不匹配，需要重新定位'
  }
];

// 预警类型统计
export const alertTypeStats = [
  { type: '库存不足', count: 15, percentage: 35 },
  { type: '库存过量', count: 8, percentage: 19 },
  { type: '即将过期', count: 6, percentage: 14 },
  { type: '呆滞物料', count: 7, percentage: 16 },
  { type: '质量异常', count: 4, percentage: 9 },
  { type: '位置异常', count: 3, percentage: 7 }
];

// 预警处理统计
export const alertProcessingStats = {
  averageProcessingTime: '2.3 小时',
  processingSuccessRate: '94.5%',
  monthlyNewAlerts: 28,
  monthlyResolved: 12 // 本月已解决
};

// 预警级别选项
export const severityOptions = [
  { value: 'all', label: '全部级别' },
  { value: 'high', label: '高级预警' },
  { value: 'medium', label: '中级预警' },
  { value: 'low', label: '低级预警' }
];

// 预警类型选项
export const typeOptions = [
  { value: 'all', label: '全部类型' },
  { value: 'low_stock', label: '库存不足' },
  { value: 'overstock', label: '库存过量' },
  { value: 'expired', label: '即将过期' },
  { value: 'slow_moving', label: '呆滞物料' },
  { value: 'quality', label: '质量异常' },
  { value: 'location', label: '位置异常' }
];