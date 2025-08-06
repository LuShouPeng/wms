import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
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
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  FileText
} from 'lucide-react';
// ✅ FIX 1: Integrate utility functions from lib/utils.ts
import { getStatusBadge } from '../../../lib/utils';
// ✅ FIX 2: Integrate form components from forms/ folder
import { WorkflowForm } from '../../forms/WorkflowForm';
import { UserForm } from './forms/UserForm';
import { RoleForm } from './forms/RoleForm';
// ✅ FIX 3: Integrate mock data from constants
import { mockUsers, mockWorkflows, purchaseOrders, salesOrders } from '../../../mockdata';
// ✅ FIX 8: Add cross-component integration
import { DamageManagement } from '../warehouse/DamageManagement';
import { WarehouseManagement } from '../warehouse/WarehouseManagement';

// ✅ FIX 5: Add TypeScript interface for props
interface BusinessManagementProps {
  user?: any;
  activeSubModule?: string;
  onSubModuleChange?: (module: string) => void;
}

export function BusinessManagement({ user, activeSubModule, onSubModuleChange }: BusinessManagementProps) {
  const [activeTab, setActiveTab] = useState(activeSubModule || 'purchase');
  const [searchTerm, setSearchTerm] = useState('');

  // 当activeSubModule改变时，更新activeTab
  React.useEffect(() => {
    if (activeSubModule) {
      // 处理从侧边栏传来的业务管理子模块ID映射
      const moduleMapping: Record<string, string> = {
        'business-damage': 'damage',
        'workflow': 'workflow',
        'purchase': 'purchase',
        'sales': 'sales'
      };
      
      const mappedModule = moduleMapping[activeSubModule] || activeSubModule;
      setActiveTab(mappedModule);
    }
  }, [activeSubModule]);

  // 当tab改变时，通知父组件
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onSubModuleChange) {
      onSubModuleChange(value);
    }
  };


  // ✅ FIX 4: Remove duplicate getStatusBadge function - using the one from utils
  // Now using: import { getStatusBadge } from '../../../lib/utils';

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

  // ✅ FIX 6: Improved PurchaseForm with proper Label components and better structure
  const PurchaseForm = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="supplier">供应商</Label>
          <select
            id="supplier"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          >
            <option>选择供应商</option>
            <option>供应商A</option>
            <option>供应商B</option>
            <option>供应商C</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">预计金额</Label>
          <Input id="amount" placeholder="输入预计金额" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="reason">采购原因</Label>
        <textarea
          id="reason"
          className="w-full px-3 py-2 border border-input rounded-md h-20 resize-none bg-background"
          placeholder="请描述采购原因..."
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">保存草稿</Button>
        <Button>提交审批</Button>
      </div>
    </div>
  );

  // ✅ FIX 7: Improved SalesForm with proper Label components and better structure
  const SalesForm = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="customer">客户</Label>
          <select
            id="customer"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          >
            <option>选择客户</option>
            <option>客户A</option>
            <option>客户B</option>
            <option>客户C</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="salesAmount">销售金额</Label>
          <Input id="salesAmount" placeholder="输入销售金额" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">备注</Label>
        <textarea
          id="notes"
          className="w-full px-3 py-2 border border-input rounded-md h-20 resize-none bg-background"
          placeholder="销售备注信息..."
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button>确认销售</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">业务管理</h2>
          <p className="text-muted-foreground">
            管理采购订单和销售订单，跟踪业务流程
          </p>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月采购</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥105,630</div>
            <p className="text-xs text-muted-foreground">
              +12.5% 较上月
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月销售</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥76,330</div>
            <p className="text-xs text-muted-foreground">
              +8.2% 较上月
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
              采购单待处理
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已完成</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              本月订单
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 业务管理主要功能 */}
      <Card>
        <CardHeader>
          <CardTitle>订单管理</CardTitle>
          <CardDescription>
            管理采购订单和销售订单，跟踪审批流程
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="purchase" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                采购管理
              </TabsTrigger>
              <TabsTrigger value="sales" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                销售管理
              </TabsTrigger>
              <TabsTrigger value="workflow" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                审批流程
              </TabsTrigger>
              <TabsTrigger value="warehouse" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                仓库管理
              </TabsTrigger>
              <TabsTrigger value="damage" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                报损管理
              </TabsTrigger>
            </TabsList>

            <TabsContent value="purchase" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="搜索采购单..."
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
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    导出
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        新增采购单
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>新增采购单</DialogTitle>
                        <DialogDescription>
                          创建新的采购申请，提交后将进入审批流程
                        </DialogDescription>
                      </DialogHeader>
                      <PurchaseForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>采购单号</TableHead>
                      <TableHead>采购日期</TableHead>
                      <TableHead>供应商</TableHead>
                      <TableHead>金额</TableHead>
                      <TableHead>物料数</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>操作员</TableHead>
                      <TableHead>审批人</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseOrders.map((order) => {
                      const statusInfo = getStatusBadge(order.status);
                      const statusIcon = getStatusIcon(order.status);
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.supplier}</TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {statusIcon}
                              <Badge variant={statusInfo.variant}>
                                {statusInfo.label}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>{order.operator}</TableCell>
                          <TableCell>{order.approver}</TableCell>
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

            <TabsContent value="sales" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="搜索销售单..."
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
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    导出
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        新增销售单
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>新增销售单</DialogTitle>
                        <DialogDescription>
                          创建新的销售订单，记录销售信息
                        </DialogDescription>
                      </DialogHeader>
                      <SalesForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>销售单号</TableHead>
                      <TableHead>销售日期</TableHead>
                      <TableHead>客户</TableHead>
                      <TableHead>金额</TableHead>
                      <TableHead>物料数</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>操作员</TableHead>
                      <TableHead>销售员</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesOrders.map((order) => {
                      const statusInfo = getStatusBadge(order.status);
                      const statusIcon = getStatusIcon(order.status);
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {statusIcon}
                              <Badge variant={statusInfo.variant}>
                                {statusInfo.label}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>{order.operator}</TableCell>
                          <TableCell>{order.salesperson}</TableCell>
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

            <TabsContent value="workflow" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">审批流程管理</h3>
                  <p className="text-sm text-muted-foreground">
                    管理业务审批流程，配置审批步骤和权限
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      流程配置
                    </CardTitle>
                    <CardDescription>
                      配置新的审批流程或修改现有流程
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WorkflowForm />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>现有流程</CardTitle>
                    <CardDescription>
                      查看和管理当前配置的审批流程
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockWorkflows.map((workflow) => (
                        <div key={workflow.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{workflow.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {workflow.steps} 个审批步骤
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="warehouse" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">仓库管理集成</h3>
                  <p className="text-sm text-muted-foreground">
                    集成仓库管理功能，包括入库、出库、移库、盘点等操作
                  </p>
                </div>
              </div>
              
              <WarehouseManagement
                user={user}
                activeSubModule="inbound"
                onSubModuleChange={(module: string) => console.log('Warehouse module changed:', module)}
              />
            </TabsContent>

            <TabsContent value="damage" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">报损管理集成</h3>
                  <p className="text-sm text-muted-foreground">
                    集成报损管理功能，处理物料损坏、丢失等报损申请
                  </p>
                </div>
              </div>
              
              <DamageManagement />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}