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
  },
  {
    id: 'U004',
    username: 'finance001',
    name: '王财务',
    role: '财务人员',
    department: '财务部',
    email: 'wang@company.com',
    phone: '13800138003',
    status: 'active',
    lastLogin: '2024-01-14 11:20'
  },
  {
    id: 'U005',
    username: 'warehouse002',
    name: '刘仓管',
    role: '仓库管理员',
    department: '仓储部',
    email: 'liu@company.com',
    phone: '13800138004',
    status: 'active',
    lastLogin: '2024-01-15 08:45'
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
  },
  {
    id: 'R005',
    name: '销售员',
    description: '负责销售业务',
    permissions: 5,
    userCount: 4,
    status: 'active'
  },
  {
    id: 'R006',
    name: '主管',
    description: '部门主管，拥有审批权限',
    permissions: 10,
    userCount: 3,
    status: 'active'
  },
  {
    id: 'R007',
    name: '经理',
    description: '部门经理，拥有高级权限',
    permissions: 12,
    userCount: 2,
    status: 'active'
  },
  {
    id: 'R008',
    name: '观察员',
    description: '只读权限，仅可查看数据',
    permissions: 2,
    userCount: 1,
    status: 'inactive'
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
  },
  {
    id: 'WF004',
    name: '报损审批流程',
    type: '仓库管理',
    steps: 2,
    condition: '报损金额 > 1000',
    status: 'active'
  },
  {
    id: 'WF005',
    name: '销售折扣审批',
    type: '销售管理',
    steps: 2,
    condition: '折扣 > 10%',
    status: 'active'
  },
  {
    id: 'WF006',
    name: '费用报销审批',
    type: '财务管理',
    steps: 3,
    condition: '金额 > 5000',
    status: 'active'
  },
  {
    id: 'WF007',
    name: '人员调动审批',
    type: '人事管理',
    steps: 3,
    condition: '部门调动',
    status: 'active'
  },
  {
    id: 'WF008',
    name: '系统配置变更',
    type: '系统管理',
    steps: 2,
    condition: '重要配置变更',
    status: 'active'
  },
  {
    id: 'WF009',
    name: '价格调整审批',
    type: '销售管理',
    steps: 2,
    condition: '价格变动 > 5%',
    status: 'draft'
  },
  {
    id: 'WF010',
    name: '库存调整审批',
    type: '仓库管理',
    steps: 2,
    condition: '调整数量 > 100',
    status: 'active'
  },
  {
    id: 'WF011',
    name: '合同审批流程',
    type: '合同管理',
    steps: 3,
    condition: '合同金额 > 50000',
    status: 'active'
  },
  {
    id: 'WF012',
    name: '紧急采购审批',
    type: '采购管理',
    steps: 1,
    condition: '紧急采购',
    status: 'active'
  }
];

// 系统统计数据
export const systemStats = {
  totalUsers: 23,
  activeUsers: 21,
  totalRoles: 8,
  activeRoles: 7,
  totalWorkflows: 12,
  activeWorkflows: 10,
  pendingApprovals: 8,
  systemAlerts: 2
};

// 用户统计数据别名
export const userStats = systemStats;