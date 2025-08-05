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
import { mockProducts, inboundOrders, outboundOrders, transferOrders, inventoryOrders, suppliers, warehouses, departments } from '../../mockdata';

export function WarehouseManagement({ user, activeSubModule, onSubModuleChange }: { user?: any; activeSubModule?: string; onSubModuleChange?: (module: string) => void }) {
  const [activeTab, setActiveTab] = useState(activeSubModule || 'inbound');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state for inbound management
  const [inboundForm, setInboundForm] = useState({
    supplier: '',
    warehouse: '',
    remark: '',
    items: mockProducts.map(product => ({ ...product, quantity: 0 }))
  });
  
  // Form state for outbound management
  const [outboundForm, setOutboundForm] = useState({
    department: '',
    warehouse: '',
    remark: '',
    items: mockProducts.map(product => ({ ...product, quantity: 0 }))
  });
  
  // Form state for transfer management
  const [transferForm, setTransferForm] = useState({
    fromWarehouse: '',
    toWarehouse: '',
    remark: '',
    items: mockProducts.map(product => ({ ...product, quantity: 0 }))
  });
  
  // Form state for inventory management
  const [inventoryForm, setInventoryForm] = useState({
    warehouse: '',
    remark: '',
    items: mockProducts.map(product => ({ ...product, systemQuantity: 100, actualQuantity: 0, difference: 0 }))
  });

  // 当activeSubModule改变时，更新activeTab
  React.useEffect(() => {
    if (activeSubModule) {
      setActiveTab(activeSubModule);
    }
  }, [activeSubModule]);

  // 当tab改变时，通知父组件
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onSubModuleChange) {
      onSubModuleChange(value);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any }> = {
      completed: { label: '已完成', variant: 'success' },
      pending: { label: '待处理', variant: 'warning' },
      processing: { label: '处理中', variant: 'info' },
      approved: { label: '已审核', variant: 'info' }
    };
    return statusMap[status] || { label: status, variant: 'default' };
  };

  const InboundForm = () => {
    const handleInputChange = (field: string, value: string) => {
      setInboundForm(prev => ({ ...prev, [field]: value }));
    };
    
    const handleItemQuantityChange = (index: number, quantity: number) => {
      setInboundForm(prev => {
        const newItems = [...prev.items];
        newItems[index] = { ...newItems[index], quantity };
        return { ...prev, items: newItems };
      });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Here you would typically send the data to your backend
      console.log('Inbound form submitted:', inboundForm);
      // Reset form or close dialog
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="supplier">供应商</Label>
            <Select value={inboundForm.supplier} onValueChange={(value) => handleInputChange('supplier', value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择供应商" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map(supplier => (
                  <SelectItem key={supplier.value} value={supplier.value}>{supplier.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="warehouse">入库仓库</Label>
            <Select value={inboundForm.warehouse} onValueChange={(value) => handleInputChange('warehouse', value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择仓库" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map(warehouse => (
                  <SelectItem key={warehouse.value} value={warehouse.value}>{warehouse.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* 物料选择表格 */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-16 text-center">#</TableHead>
                <TableHead className="w-24">物料编码</TableHead>
                <TableHead className="w-40">物料名称</TableHead>
                <TableHead className="w-24">类别</TableHead>
                <TableHead className="w-16">单位</TableHead>
                <TableHead className="w-24">数量</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inboundForm.items.map((item, index) => (
                <TableRow key={item.code} className="hover:bg-gray-50">
                  <TableCell className="text-center font-medium">{index + 1}</TableCell>
                  <TableCell className="font-mono">{item.code}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="数量"
                      className="w-full"
                      min="0"
                      value={item.quantity || ''}
                      onChange={(e) => handleItemQuantityChange(index, parseInt(e.target.value) || 0)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="remark">备注</Label>
          <Input
            id="remark"
            placeholder="入库备注信息"
            value={inboundForm.remark}
            onChange={(e) => handleInputChange('remark', e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" className="px-6">取消</Button>
          <Button type="submit" className="px-6">确认入库</Button>
        </div>
      </form>
    );
  };

  const OutboundForm = () => {
    const handleInputChange = (field: string, value: string) => {
      setOutboundForm(prev => ({ ...prev, [field]: value }));
    };
    
    const handleItemQuantityChange = (index: number, quantity: number) => {
      setOutboundForm(prev => {
        const newItems = [...prev.items];
        newItems[index] = { ...newItems[index], quantity };
        return { ...prev, items: newItems };
      });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Here you would typically send the data to your backend
      console.log('Outbound form submitted:', outboundForm);
      // Reset form or close dialog
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="department">领用部门</Label>
            <Select value={outboundForm.department} onValueChange={(value) => handleInputChange('department', value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择领用部门" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(department => (
                  <SelectItem key={department.value} value={department.value}>{department.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="warehouse">出库仓库</Label>
            <Select value={outboundForm.warehouse} onValueChange={(value) => handleInputChange('warehouse', value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择仓库" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map(warehouse => (
                  <SelectItem key={warehouse.value} value={warehouse.value}>{warehouse.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* 物料选择表格 */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-16 text-center">#</TableHead>
                <TableHead className="w-24">物料编码</TableHead>
                <TableHead className="w-40">物料名称</TableHead>
                <TableHead className="w-24">类别</TableHead>
                <TableHead className="w-16">单位</TableHead>
                <TableHead className="w-24">数量</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outboundForm.items.map((item, index) => (
                <TableRow key={item.code} className="hover:bg-gray-50">
                  <TableCell className="text-center font-medium">{index + 1}</TableCell>
                  <TableCell className="font-mono">{item.code}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="数量"
                      className="w-full"
                      min="0"
                      value={item.quantity || ''}
                      onChange={(e) => handleItemQuantityChange(index, parseInt(e.target.value) || 0)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="remark">备注</Label>
          <Input
            id="remark"
            placeholder="出库备注信息"
            value={outboundForm.remark}
            onChange={(e) => handleInputChange('remark', e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" className="px-6">取消</Button>
          <Button type="submit" className="px-6">确认出库</Button>
        </div>
      </form>
    );
  };

  const TransferForm = () => {
    const handleInputChange = (field: string, value: string) => {
      setTransferForm(prev => ({ ...prev, [field]: value }));
    };
    
    const handleItemQuantityChange = (index: number, quantity: number) => {
      setTransferForm(prev => {
        const newItems = [...prev.items];
        newItems[index] = { ...newItems[index], quantity };
        return { ...prev, items: newItems };
      });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Here you would typically send the data to your backend
      console.log('Transfer form submitted:', transferForm);
      // Reset form or close dialog
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fromWarehouse">源仓库</Label>
            <Select value={transferForm.fromWarehouse} onValueChange={(value) => handleInputChange('fromWarehouse', value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择源仓库" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map(warehouse => (
                  <SelectItem key={warehouse.value} value={warehouse.value}>{warehouse.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="toWarehouse">目标仓库</Label>
            <Select value={transferForm.toWarehouse} onValueChange={(value) => handleInputChange('toWarehouse', value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择目标仓库" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map(warehouse => (
                  <SelectItem key={warehouse.value} value={warehouse.value}>{warehouse.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* 物料选择表格 */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-16 text-center">#</TableHead>
                <TableHead className="w-24">物料编码</TableHead>
                <TableHead className="w-40">物料名称</TableHead>
                <TableHead className="w-24">类别</TableHead>
                <TableHead className="w-16">单位</TableHead>
                <TableHead className="w-24">数量</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transferForm.items.map((item, index) => (
                <TableRow key={item.code} className="hover:bg-gray-50">
                  <TableCell className="text-center font-medium">{index + 1}</TableCell>
                  <TableCell className="font-mono">{item.code}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="数量"
                      className="w-full"
                      min="0"
                      value={item.quantity || ''}
                      onChange={(e) => handleItemQuantityChange(index, parseInt(e.target.value) || 0)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="transferRemark">备注</Label>
          <Input
            id="transferRemark"
            placeholder="移库备注信息"
            value={transferForm.remark}
            onChange={(e) => handleInputChange('remark', e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" className="px-6">取消</Button>
          <Button type="submit" className="px-6">确认移库</Button>
        </div>
      </form>
    );
  };

  const InventoryForm = () => {
    const handleInputChange = (field: string, value: string) => {
      setInventoryForm(prev => ({ ...prev, [field]: value }));
    };
    
    const handleItemQuantityChange = (index: number, field: string, value: number) => {
      setInventoryForm(prev => {
        const newItems = [...prev.items];
        newItems[index] = {
          ...newItems[index],
          [field]: value,
          difference: field === 'actualQuantity' ? value - newItems[index].systemQuantity : newItems[index].difference
        };
        return { ...prev, items: newItems };
      });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Here you would typically send the data to your backend
      console.log('Inventory form submitted:', inventoryForm);
      // Reset form or close dialog
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="inventoryWarehouse">盘点仓库</Label>
            <Select value={inventoryForm.warehouse} onValueChange={(value) => handleInputChange('warehouse', value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择仓库" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map(warehouse => (
                  <SelectItem key={warehouse.value} value={warehouse.value}>{warehouse.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* 物料选择表格 */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-16 text-center">#</TableHead>
                <TableHead className="w-24">物料编码</TableHead>
                <TableHead className="w-40">物料名称</TableHead>
                <TableHead className="w-24">类别</TableHead>
                <TableHead className="w-16">单位</TableHead>
                <TableHead className="w-24 text-right">系统数量</TableHead>
                <TableHead className="w-32">实际数量</TableHead>
                <TableHead className="w-20 text-right">差异</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryForm.items.map((item, index) => (
                <TableRow key={item.code} className="hover:bg-gray-50">
                  <TableCell className="text-center font-medium">{index + 1}</TableCell>
                  <TableCell className="font-mono">{item.code}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell className="text-right">{item.systemQuantity}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="实际数量"
                      className="w-full"
                      min="0"
                      value={item.actualQuantity || ''}
                      onChange={(e) => handleItemQuantityChange(index, 'actualQuantity', parseInt(e.target.value) || 0)}
                    />
                  </TableCell>
                  <TableCell className={`text-right font-medium ${item.difference > 0 ? "text-red-600" : item.difference < 0 ? "text-green-600" : "text-gray-500"}`}>
                    {item.difference > 0 ? `+${item.difference}` : item.difference}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="inventoryRemark">备注</Label>
          <Input
            id="inventoryRemark"
            placeholder="盘点备注信息"
            value={inventoryForm.remark}
            onChange={(e) => handleInputChange('remark', e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" className="px-6">取消</Button>
          <Button type="submit" className="px-6">开始盘点</Button>
        </div>
      </form>
    );
  };

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
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
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
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索出库单..."
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
                      新增出库单
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>新增出库单</DialogTitle>
                      <DialogDescription>
                        填写出库信息，系统将自动更新库存
                      </DialogDescription>
                    </DialogHeader>
                    <OutboundForm />
                  </DialogContent>
                </Dialog>
              </div>
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
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索移库单..."
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
                      新增移库单
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>新增移库单</DialogTitle>
                      <DialogDescription>
                        填写移库信息，系统将自动更新库存
                      </DialogDescription>
                    </DialogHeader>
                    <TransferForm />
                  </DialogContent>
                </Dialog>
              </div>
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
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索盘点单..."
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
                      新增盘点单
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>新增盘点单</DialogTitle>
                      <DialogDescription>
                        填写盘点信息，系统将自动更新库存
                      </DialogDescription>
                    </DialogHeader>
                    <InventoryForm />
                  </DialogContent>
                </Dialog>
              </div>
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