import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Eye,
  Shield,
  ArrowLeft,
  Users,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getStatusBadge } from '../../../lib/utils';
import { mockRoles } from '../../../mockdata';
import { RoleForm } from '../../forms/RoleForm';

export function RolesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleGoBack = () => {
    navigate('/settings');
  };

  const filteredRoles = mockRoles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUsers = mockRoles.reduce((sum, role) => sum + role.userCount, 0);
  const activeRoles = mockRoles.filter(role => role.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* 页面标题和返回按钮 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            返回系统设置
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">角色权限管理</h2>
            <p className="text-muted-foreground">
              配置用户角色和权限，控制系统功能访问权限
            </p>
          </div>
        </div>
      </div>

      {/* 角色统计概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">角色总数</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRoles.length}</div>
            <p className="text-xs text-muted-foreground">
              系统配置角色
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃角色</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRoles}</div>
            <p className="text-xs text-muted-foreground">
              当前启用状态
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">分配用户</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              已分配角色用户
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">权限模块</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              功能权限模块
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 角色管理主要功能 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            角色列表
          </CardTitle>
          <CardDescription>
            查看和管理所有系统角色及其权限配置
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 搜索和操作栏 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索角色名称或描述..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-80"
                />
              </div>
              {searchTerm && (
                <div className="text-sm text-muted-foreground">
                  找到 {filteredRoles.length} 个角色
                </div>
              )}
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

          {/* 角色列表表格 */}
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
                  <TableHead>创建时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => {
                  const statusInfo = getStatusBadge(role.status);
                  return (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          {role.name}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{role.description}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {role.permissions} 项
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          {role.userCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusInfo.variant}>
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell>2024-01-01</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" title="查看权限详情">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" title="编辑角色">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" title="删除角色">
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

          {/* 空状态 */}
          {filteredRoles.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">未找到匹配的角色</h3>
              <p className="text-muted-foreground mb-4">
                请尝试使用不同的关键词搜索
              </p>
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                清除搜索条件
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 权限模块概览 */}
      <Card>
        <CardHeader>
          <CardTitle>权限模块</CardTitle>
          <CardDescription>
            系统功能模块权限分配概览
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="font-medium">仓库管理</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                入库、出库、移库、盘点等仓库操作权限
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">已分配角色：</span>
                <span className="font-medium">5 个</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-medium">业务管理</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                采购、销售、审批流程等业务操作权限
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">已分配角色：</span>
                <span className="font-medium">4 个</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-purple-600" />
                <span className="font-medium">报表查看</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                各类报表查看和导出权限
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">已分配角色：</span>
                <span className="font-medium">6 个</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-orange-600" />
                <span className="font-medium">基础资料</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                仓库、物料、供应商等基础数据管理权限
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">已分配角色：</span>
                <span className="font-medium">3 个</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-red-600" />
                <span className="font-medium">系统设置</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                用户、角色、系统配置等管理权限
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">已分配角色：</span>
                <span className="font-medium">1 个</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-cyan-600" />
                <span className="font-medium">数据导入导出</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                数据导入导出和备份恢复权限
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">已分配角色：</span>
                <span className="font-medium">2 个</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 批量操作区域 */}
      <Card>
        <CardHeader>
          <CardTitle>批量操作</CardTitle>
          <CardDescription>
            对多个角色执行批量操作
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              批量启用
            </Button>
            <Button variant="outline" size="sm">
              批量禁用
            </Button>
            <Button variant="outline" size="sm">
              权限模板导入
            </Button>
            <Button variant="outline" size="sm">
              权限配置导出
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}