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
  GitBranch,
  ArrowLeft,
  Play,
  Pause,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getStatusBadge } from '../../../lib/utils';
import { mockWorkflows } from '../../../mockdata';
import { WorkflowForm } from '../../forms/WorkflowForm';

export function WorkflowsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleGoBack = () => {
    navigate('/settings');
  };

  const filteredWorkflows = mockWorkflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeWorkflows = mockWorkflows.filter(workflow => workflow.status === 'active').length;
  const totalSteps = mockWorkflows.reduce((sum, workflow) => sum + workflow.steps, 0);

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
            <h2 className="text-2xl font-bold tracking-tight">审批流程管理</h2>
            <p className="text-muted-foreground">
              配置和管理业务审批流程，自动化业务流程控制
            </p>
          </div>
        </div>
      </div>

      {/* 流程统计概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">流程总数</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockWorkflows.length}</div>
            <p className="text-xs text-muted-foreground">
              已配置流程
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">运行中</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeWorkflows}</div>
            <p className="text-xs text-muted-foreground">
              当前活跃流程
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待审批</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              等待处理
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">审批步骤</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSteps}</div>
            <p className="text-xs text-muted-foreground">
              总审批节点
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 流程管理主要功能 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            审批流程列表
          </CardTitle>
          <CardDescription>
            查看和管理所有业务审批流程配置
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 搜索和操作栏 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索流程名称、业务类型或触发条件..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-80"
                />
              </div>
              {searchTerm && (
                <div className="text-sm text-muted-foreground">
                  找到 {filteredWorkflows.length} 个流程
                </div>
              )}
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

          {/* 流程列表表格 */}
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
                  <TableHead>创建时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkflows.map((workflow) => {
                  const statusInfo = getStatusBadge(workflow.status);
                  return (
                    <TableRow key={workflow.id}>
                      <TableCell className="font-medium">{workflow.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <GitBranch className="h-4 w-4 text-muted-foreground" />
                          {workflow.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {workflow.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-muted-foreground" />
                          {workflow.steps} 步
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {workflow.condition}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusInfo.variant}>
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell>2024-01-01</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" title="查看流程详情">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" title="编辑流程">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" title="删除流程">
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
          {filteredWorkflows.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <GitBranch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">未找到匹配的流程</h3>
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

      {/* 流程类型概览 */}
      <Card>
        <CardHeader>
          <CardTitle>业务流程类型</CardTitle>
          <CardDescription>
            不同业务类型的审批流程配置概览
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="h-4 w-4 text-blue-600" />
                <span className="font-medium">采购审批</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                采购申请、采购订单等采购相关审批流程
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">流程数量：</span>
                <span className="font-medium">4 个</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">待审批：</span>
                <span className="font-medium text-orange-600">3 个</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="h-4 w-4 text-green-600" />
                <span className="font-medium">销售审批</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                销售订单、价格调整等销售相关审批流程
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">流程数量：</span>
                <span className="font-medium">3 个</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">待审批：</span>
                <span className="font-medium text-orange-600">2 个</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="h-4 w-4 text-purple-600" />
                <span className="font-medium">库存调整</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                库存盘点、报损报溢等库存调整审批流程
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">流程数量：</span>
                <span className="font-medium">2 个</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">待审批：</span>
                <span className="font-medium text-orange-600">1 个</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="h-4 w-4 text-red-600" />
                <span className="font-medium">财务审批</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                付款申请、费用报销等财务相关审批流程
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">流程数量：</span>
                <span className="font-medium">2 个</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">待审批：</span>
                <span className="font-medium text-orange-600">2 个</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="h-4 w-4 text-cyan-600" />
                <span className="font-medium">系统变更</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                系统配置变更、权限调整等系统管理审批流程
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">流程数量：</span>
                <span className="font-medium">1 个</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">待审批：</span>
                <span className="font-medium text-green-600">0 个</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 流程监控 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            流程监控
          </CardTitle>
          <CardDescription>
            实时监控审批流程运行状态和异常情况
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <div className="font-medium">超时提醒</div>
                  <div className="text-sm text-muted-foreground">
                    有 2 个审批流程超过预期处理时间
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                查看详情
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">今日完成</div>
                  <div className="text-sm text-muted-foreground">
                    今日已完成 12 个审批流程
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                查看报告
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Play className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">流程效率</div>
                  <div className="text-sm text-muted-foreground">
                    平均审批时长：2.5 小时，比上月提升 15%
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                查看分析
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 批量操作区域 */}
      <Card>
        <CardHeader>
          <CardTitle>批量操作</CardTitle>
          <CardDescription>
            对多个审批流程执行批量操作
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              <Play className="h-3 w-3 mr-1" />
              批量启用
            </Button>
            <Button variant="outline" size="sm">
              <Pause className="h-3 w-3 mr-1" />
              批量暂停
            </Button>
            <Button variant="outline" size="sm">
              流程模板导入
            </Button>
            <Button variant="outline" size="sm">
              流程配置导出
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}