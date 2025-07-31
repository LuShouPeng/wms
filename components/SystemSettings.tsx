import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Eye,
  Users,
  Shield,
  GitBranch,
  AlertCircle
} from 'lucide-react';
import { getStatusBadge } from '../lib/utils';
import { mockUsers, mockRoles, mockWorkflows } from '../constants/mockData';
import { UserForm } from './forms/UserForm';
import { RoleForm } from './forms/RoleForm';
import { WorkflowForm } from './forms/WorkflowForm';

export function SystemSettings({ user, activeSubModule, onSubModuleChange }) {
  const [activeTab, setActiveTab] = useState(activeSubModule || 'users');
  const [searchTerm, setSearchTerm] = useState('');

  // 当activeSubModule改变时，更新activeTab
  React.useEffect(() => {
    if (activeSubModule) {
      setActiveTab(activeSubModule);
    }
  }, [activeSubModule]);

  // 当tab改变时，通知父组件
  const handleTabChange = (value) => {
    setActiveTab(value);
    if (onSubModuleChange) {
      onSubModuleChange(value);
    }
  };

  return (
    <div className="space-y-6">
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
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              共 28 个用户
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">角色数量</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
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
            <div className="text-2xl font-bold">12</div>
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
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              需要关注
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 系统设置主要功能 */}
      <Card>
        <CardHeader>
          <CardTitle>系统配置</CardTitle>
          <CardDescription>
            管理用户账户、角色权限和审批流程
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                用户管理
              </TabsTrigger>
              <TabsTrigger value="roles" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                角色权限
              </TabsTrigger>
              <TabsTrigger value="workflows" className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                审批流程
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="搜索用户..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-80"
                    />
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      新增用户
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>新增用户</DialogTitle>
                      <DialogDescription>
                        创建新的系统用户账户
                      </DialogDescription>
                    </DialogHeader>
                    <UserForm />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>用户ID</TableHead>
                      <TableHead>用户名</TableHead>
                      <TableHead>姓名</TableHead>
                      <TableHead>角色</TableHead>
                      <TableHead>部门</TableHead>
                      <TableHead>邮箱</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>最后登录</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => {
                      const statusInfo = getStatusBadge(user.status);
                      return (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={statusInfo.variant}>
                              {statusInfo.label}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="搜索角色..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-80"
                    />
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      新增角色
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>新增角色</DialogTitle>
                      <DialogDescription>
                        创建新的用户角色并分配权限
                      </DialogDescription>
                    </DialogHeader>
                    <RoleForm />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>角色ID</TableHead>
                      <TableHead>角色名称</TableHead>
                      <TableHead>角色描述</TableHead>
                      <TableHead>权限数量</TableHead>
                      <TableHead>用户数量</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRoles.map((role) => {
                      const statusInfo = getStatusBadge(role.status);
                      return (
                        <TableRow key={role.id}>
                          <TableCell className="font-medium">{role.id}</TableCell>
                          <TableCell>{role.name}</TableCell>
                          <TableCell>{role.description}</TableCell>
                          <TableCell>{role.permissions}</TableCell>
                          <TableCell>{role.userCount}</TableCell>
                          <TableCell>
                            <Badge variant={statusInfo.variant}>
                              {statusInfo.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="workflows" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="搜索审批流程..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-80"
                    />
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      新增流程
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>新增审批流程</DialogTitle>
                      <DialogDescription>
                        创建新的审批流程配置
                      </DialogDescription>
                    </DialogHeader>
                    <WorkflowForm />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>流程ID</TableHead>
                      <TableHead>流程名称</TableHead>
                      <TableHead>业务类型</TableHead>
                      <TableHead>审批步骤</TableHead>
                      <TableHead>触发条件</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockWorkflows.map((workflow) => {
                      const statusInfo = getStatusBadge(workflow.status);
                      return (
                        <TableRow key={workflow.id}>
                          <TableCell className="font-medium">{workflow.id}</TableCell>
                          <TableCell>{workflow.name}</TableCell>
                          <TableCell>{workflow.type}</TableCell>
                          <TableCell>{workflow.steps} 步</TableCell>
                          <TableCell>{workflow.condition}</TableCell>
                          <TableCell>
                            <Badge variant={statusInfo.variant}>
                              {statusInfo.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}