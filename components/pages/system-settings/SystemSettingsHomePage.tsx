import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { 
  Users,
  Shield,
  GitBranch,
  AlertCircle,
  ArrowRight,
  Settings,
  UserCheck,
  Workflow
} from 'lucide-react';
import { systemStats } from '../../../mockdata/systemData';

export function SystemSettingsHomePage() {
  const navigate = useNavigate();

  const handleNavigateToSubPage = (subPage: string) => {
    navigate(`/settings/${subPage}`);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">系统设置</h2>
          <p className="text-muted-foreground">
            管理用户、角色、权限和系统配置
          </p>
        </div>
      </div>

      {/* 系统状态概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              共 {systemStats.totalUsers} 个用户
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">角色数量</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalRoles}</div>
            <p className="text-xs text-muted-foreground">
              权限分配完善
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">审批流程</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.activeWorkflows}</div>
            <p className="text-xs text-muted-foreground">
              运行正常
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">系统告警</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.alerts}</div>
            <p className="text-xs text-muted-foreground">
              需要关注
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 功能导航区域 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* 用户管理 */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleNavigateToSubPage('users')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              用户管理
            </CardTitle>
            <CardDescription>
              管理系统用户账户，包括用户信息、状态和权限分配
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">总用户数</span>
                <span className="font-medium">{systemStats.totalUsers}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">活跃用户</span>
                <span className="font-medium text-green-600">{systemStats.activeUsers}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">今日登录</span>
                <span className="font-medium">{systemStats.todayLogins}</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full mt-4 justify-between"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToSubPage('users');
              }}
            >
              进入用户管理
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* 角色权限 */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleNavigateToSubPage('roles')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              角色权限
            </CardTitle>
            <CardDescription>
              配置用户角色和权限，控制系统功能访问权限
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">角色总数</span>
                <span className="font-medium">{systemStats.totalRoles}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">自定义角色</span>
                <span className="font-medium text-blue-600">{systemStats.customRoles}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">权限模块</span>
                <span className="font-medium">{systemStats.permissionModules}</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full mt-4 justify-between"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToSubPage('roles');
              }}
            >
              进入角色管理
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* 审批流程 */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleNavigateToSubPage('workflows')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-purple-600" />
              审批流程
            </CardTitle>
            <CardDescription>
              配置和管理业务审批流程，自动化业务流程控制
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">流程总数</span>
                <span className="font-medium">{systemStats.totalWorkflows}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">运行中</span>
                <span className="font-medium text-green-600">{systemStats.activeWorkflows}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">待审批</span>
                <span className="font-medium text-orange-600">{systemStats.pendingApprovals}</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full mt-4 justify-between"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToSubPage('workflows');
              }}
            >
              进入流程管理
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 快捷操作区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            常用操作
          </CardTitle>
          <CardDescription>
            快速执行常用的系统管理操作
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => handleNavigateToSubPage('users')}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">新增用户</div>
                  <div className="text-sm text-muted-foreground">创建新的系统用户</div>
                </div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => handleNavigateToSubPage('roles')}
            >
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">配置权限</div>
                  <div className="text-sm text-muted-foreground">设置角色权限</div>
                </div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => handleNavigateToSubPage('workflows')}
            >
              <div className="flex items-center gap-3">
                <Workflow className="h-5 w-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium">创建流程</div>
                  <div className="text-sm text-muted-foreground">新建审批流程</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 系统信息 */}
      <Card>
        <CardHeader>
          <CardTitle>系统信息</CardTitle>
          <CardDescription>
            当前系统运行状态和基本信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">系统版本</span>
                <span className="font-medium">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">数据库状态</span>
                <span className="font-medium text-green-600">正常</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">最后备份</span>
                <span className="font-medium">2024-01-15 02:00</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">在线用户</span>
                <span className="font-medium">15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">系统负载</span>
                <span className="font-medium text-green-600">正常</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">存储使用</span>
                <span className="font-medium">68%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
