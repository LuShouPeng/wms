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