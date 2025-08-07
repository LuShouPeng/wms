// 工作流管理相关模拟数据

// 待审批的统计数据
export const pendingApprovals = [
  { type: '采购申请', count: 5, urgent: 2 },
  { type: '销售订单', count: 3, urgent: 1 },
  { type: '报损申请', count: 2, urgent: 0 },
  { type: '调拨申请', count: 1, urgent: 1 }
];

// 审批流程模板
export const workflowTemplates = [
  {
    id: 'purchase-approval',
    name: '采购审批流程',
    description: '采购申请的标准审批流程',
    steps: 3,
    active: true,
    usage: 25
  },
  {
    id: 'sales-approval', 
    name: '销售审批流程',
    description: '销售订单的审批流程',
    steps: 2,
    active: true,
    usage: 18
  },
  {
    id: 'damage-approval',
    name: '报损审批流程', 
    description: '物料报损的审批流程',
    steps: 2,
    active: true,
    usage: 12
  }
];

// 审批历史记录
export const approvalHistory = [
  {
    id: 'APP-2024-001',
    type: '采购申请',
    title: 'PO-2024-001 采购申请',
    applicant: '张三',
    status: 'approved',
    completedAt: '2024-01-15 14:30',
    approver: '李经理'
  },
  {
    id: 'APP-2024-002',
    type: '销售订单',
    title: 'SO-2024-015 销售确认',
    applicant: '李四',
    status: 'pending',
    submittedAt: '2024-01-15 16:20',
    currentApprover: '王总监'
  },
  {
    id: 'APP-2024-003',
    type: '报损申请',
    title: 'DMG-2024-005 物料报损',
    applicant: '王五',
    status: 'rejected',
    rejectedAt: '2024-01-14 09:15',
    rejectReason: '信息不完整'
  }
];