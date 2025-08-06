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
  Users,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getStatusBadge } from '../../../lib/utils';
import { mockUsers } from '../../../mockdata';
import { UserForm } from '../../forms/UserForm';

export function UsersPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleGoBack = () => {
    navigate('/settings');
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h2 className="text-2xl font-bold tracking-tight">用户管理</h2>
            <p className="text-muted-foreground">
              管理系统用户账户，包括用户信息、状态和权限分配
            </p>
          </div>
        </div>
      </div>

      {/* 用户统计概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总用户数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              系统注册用户
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUsers.filter(user => user.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              当前活跃状态
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日登录</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              今日活跃用户
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">新增用户</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              本月新增
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 用户管理主要功能 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            用户列表
          </CardTitle>
          <CardDescription>
            查看和管理所有系统用户的详细信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 搜索和操作栏 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索用户名、姓名、邮箱或部门..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-80"
                />
              </div>
              {searchTerm && (
                <div className="text-sm text-muted-foreground">
                  找到 {filteredUsers.length} 个用户
                </div>
              )}
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

          {/* 用户列表表格 */}
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
                  <TableHead>手机号</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>最后登录</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const statusInfo = getStatusBadge(user.status);
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Badge variant={statusInfo.variant}>
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" title="查看详情">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" title="编辑用户">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" title="删除用户">
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
          {filteredUsers.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">未找到匹配的用户</h3>
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

      {/* 批量操作区域 */}
      <Card>
        <CardHeader>
          <CardTitle>批量操作</CardTitle>
          <CardDescription>
            对多个用户执行批量操作
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
              导出用户数据
            </Button>
            <Button variant="outline" size="sm">
              导入用户数据
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}