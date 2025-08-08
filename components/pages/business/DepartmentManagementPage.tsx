import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import {
  Plus,
  Search,
  Filter,
  Download,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getStatusBadge } from '../../../lib/utils';
import { departments } from '../../../mockdata/business';

export function DepartmentManagementPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'processing':
      case 'shipped':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'rejected':
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const DepartmentForm = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="departmentName">部门名称</Label>
          <Input id="departmentName" placeholder="输入部门名称" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departmentCode">部门代码</Label>
          <Input id="departmentCode" placeholder="输入部门代码" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="manager">部门负责人</Label>
          <Input id="manager" placeholder="输入部门负责人" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employeeCount">员工数量</Label>
          <Input id="employeeCount" type="number" placeholder="输入员工数量" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">部门描述</Label>
        <textarea
          id="description"
          className="w-full px-3 py-2 border border-input rounded-md h-20 resize-none bg-background"
          placeholder="部门职责描述..."
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button>创建部门</Button>
      </div>
    </div>
  );

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 页面标题和导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/business')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">部门管理</h2>
            <p className="text-muted-foreground">
              管理公司部门、员工配置和组织架构
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新增部门
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>新增部门</DialogTitle>
              <DialogDescription>
                创建新的部门，配置部门信息和负责人
              </DialogDescription>
            </DialogHeader>
            <DepartmentForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* 统计概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">部门总数</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">个部门</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">员工总数</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">名员工</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃部门</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">个部门活跃</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月新增</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">新部门</p>
          </CardContent>
        </Card>
      </div>

      {/* 部门列表 */}
      <Card>
        <CardHeader>
          <CardTitle>部门列表</CardTitle>
          <CardDescription>
            查看和管理所有部门信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 搜索和操作栏 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索部门..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-80"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                筛选
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
          </div>

          {/* 表格 */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>部门名称</TableHead>
                  <TableHead>部门代码</TableHead>
                  <TableHead>部门负责人</TableHead>
                  <TableHead>员工数量</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.map((dept) => {
                  const statusInfo = getStatusBadge(dept.status);
                  const statusIcon = getStatusIcon(dept.status);
                  return (
                    <TableRow key={dept.id}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>{dept.code}</TableCell>
                      <TableCell>{dept.manager}</TableCell>
                      <TableCell>{dept.employeeCount}</TableCell>
                      <TableCell>{dept.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {statusIcon}
                          <Badge variant={statusInfo.variant}>
                            {statusInfo.label}
                          </Badge>
                        </div>
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
        </CardContent>
      </Card>
    </div>
  );
}
