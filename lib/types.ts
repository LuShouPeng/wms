// 用户类型定义
export interface User {
  name?: string;
  role?: string;
  email?: string;
  id?: string;
  [key: string]: any; // 允许其他属性
}

// 模块类型定义
export type Module = 'dashboard' | 'warehouse' | 'business' | 'reports' | 'basicData' | 'settings';

// 子模块类型定义
export type SubModule = string | null;

// 会话类型定义
export interface UserSession {
  user: User;
  loginTime: string;
  lastActivity: string;
}