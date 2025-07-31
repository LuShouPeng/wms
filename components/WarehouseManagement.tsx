import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
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
  Filter, 
  Download, 
  Upload,
  PackageCheck,
  PackageX,
  Truck,
  ClipboardList,
  AlertTriangle,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { DamageManagement } from './DamageManagement';

export function WarehouseManagement({ user, activeSubModule, onSubModuleChange }) {
  const [activeTab, setActiveTab] = useState(activeSubModule || 'inbound');
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

  // 模拟数据
  const inboundOrders = [
    {
      id: 'IN-2024-001',
      date: '2024-01-15',
      supplier: '供应商A',
      materials: 5,
      totalValue: '¥12,580',
      status: 'completed',
      operator: '张三'
    },
    {
      id: 'IN-2024-002', 
      date: '2024-01-15',
      supplier: '供应商B',
      materials: 3,
      totalValue: '¥8,750',
      status: 'pending',
      operator: '李四'
    },
    {
      id: 'IN-2024-003',
      date: '2024-01-14',
      supplier: '供应商C',
      materials: 8,
      totalValue: '¥25,600',
      status: 'processing',
      operator: '王五'
    }
  ];

  const outboundOrders = [
    {
      id: 'OUT-2024-001',
      date: '2024-01-15',
      department: '生产部',
      materials: 4,
      totalValue: '¥6,800',
      status: 'completed',
      operator: '张三'
    },
    {
      id: 'OUT-2024-002',
      date: '2024-01-15', 
      department: '维修部',
      materials: 2,
      totalValue: '¥3,200',
      status: 'approved',
      operator: '李四'
    }
  ];

  const transferOrders = [
    {
      id: 'TR-2024-001',
      date: '2024-01-15',
      fromWarehouse: '仓库A',
      toWarehouse: '仓库B',
      materials: 3,
      status: 'completed',
      operator: '王五'
    }
  ];

  const inventoryOrders = [
    {
      id: 'IV-2024-001',
      date: '2024-01-15',
      warehouse: '仓库A',
      materials: 156,
      differences: 3,
      status: 'completed',
      operator: '张三'
    }
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      completed: { label: '已完成', variant: 'success' },
      pending: { label: '待处理', variant: 'warning' },
      processing: { label: '处理中', variant: 'info' },
      approved: { label: '已审核', variant: 'info' }
    };
    return statusMap[status] || { label: status, variant: 'default' };
  };

  const InboundForm = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="supplier">供应商</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择供应商" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="supplier1">供应商A</SelectItem>
              <SelectItem value="supplier2">供应商B</SelectItem>
              <SelectItem value="supplier3">供应商C</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="warehouse">入库仓库</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择仓库" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warehouse1">仓库A</SelectItem>
              <SelectItem value="warehouse2">仓库B</SelectItem>
              <SelectItem value="warehouse3">仓库C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="remark">备注</Label>
        <Input id="remark" placeholder="入库备注信息" />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button>确认入库</Button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inbound':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索入库单..."
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
                      新增入库单
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>新增入库单</DialogTitle>
                      <DialogDescription>
                        填写入库信息，系统将自动更新库存
                      </DialogDescription>
                    </DialogHeader>
                    <InboundForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>入库单号</TableHead>
                    <TableHead>入库日期</TableHead>
                    <TableHead>供应商</TableHead>
                    <TableHead>物料数</TableHead>
                    <TableHead>总价值</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>操作员</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inboundOrders.map((order) => {
                    const statusInfo = getStatusBadge(order.status);
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.supplier}</TableCell>
                        <TableCell>{order.materials}</TableCell>
                        <TableCell>{order.totalValue}</TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant}>
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.operator}</TableCell>
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
            </Card>
          </div>
        );

      case 'outbound':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">出库管理</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                新增出库单
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>出库单号</TableHead>
                    <TableHead>出库日期</TableHead>
                    <TableHead>领用部门</TableHead>
                    <TableHead>物料数</TableHead>
                    <TableHead>总价值</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>操作员</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outboundOrders.map((order) => {
                    const statusInfo = getStatusBadge(order.status);
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.department}</TableCell>
                        <TableCell>{order.materials}</TableCell>
                        <TableCell>{order.totalValue}</TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant}>
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.operator}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </div>
        );

      case 'transfer':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">移库管理</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                新增移库单
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>移库单号</TableHead>
                    <TableHead>移库日期</TableHead>
                    <TableHead>源仓库</TableHead>
                    <TableHead>目标仓库</TableHead>
                    <TableHead>物料数</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>操作员</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transferOrders.map((order) => {
                    const statusInfo = getStatusBadge(order.status);
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.fromWarehouse}</TableCell>
                        <TableCell>{order.toWarehouse}</TableCell>
                        <TableCell>{order.materials}</TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant}>
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.operator}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </div>
        );

      case 'inventory':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">盘点管理</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                新增盘点单
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>盘点单号</TableHead>
                    <TableHead>盘点日期</TableHead>
                    <TableHead>盘点仓库</TableHead>
                    <TableHead>盘点物料数</TableHead>
                    <TableHead>差异数量</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>操作员</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryOrders.map((order) => {
                    const statusInfo = getStatusBadge(order.status);
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.warehouse}</TableCell>
                        <TableCell>{order.materials}</TableCell>
                        <TableCell>
                          {order.differences > 0 ? (
                            <span className="text-red-600">+{order.differences}</span>
                          ) : (
                            <span className="text-green-600">{order.differences}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant}>
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.operator}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </div>
        );

      case 'damage':
        return <DamageManagement />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">仓库管理</h2>
          <p className="text-muted-foreground">
            管理入库、出库、移库、盘点、报损等仓储操作
          </p>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日入库</CardTitle>
            <PackageCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +3 从昨日
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日出库</CardTitle>
            <PackageX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              -2 从昨日
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">移库操作</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              +1 从昨日
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">报损记录</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              本月新增
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">异常提醒</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              需要处理
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 主要功能区域 */}
      <Card>
        <CardHeader>
          <CardTitle>仓库操作管理</CardTitle>
          <CardDescription>
            管理所有仓库相关操作，包括入库、出库、移库、盘点和报损
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="inbound" className="flex items-center gap-2">
                <PackageCheck className="h-4 w-4" />
                入库管理
              </TabsTrigger>
              <TabsTrigger value="outbound" className="flex items-center gap-2">
                <PackageX className="h-4 w-4" />
                出库管理
              </TabsTrigger>
              <TabsTrigger value="transfer" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                移库管理
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                盘点管理
              </TabsTrigger>
              <TabsTrigger value="damage" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                报损管理
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              {renderTabContent()}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}