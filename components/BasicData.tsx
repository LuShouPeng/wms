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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Eye,
  Warehouse,
  Package,
  Users,
  Building,
  MapPin,
  Phone,
  Mail,
  DollarSign
} from 'lucide-react';
import { getStatusBadge } from '../lib/utils';
import { WarehouseEditPage } from './WarehouseEditPage';
import { mockWarehouses, mockMaterials, mockSuppliers } from '../../mockdata';

export function BasicData({ user, activeSubModule, onSubModuleChange }) {
  const [activeTab, setActiveTab] = useState(activeSubModule || 'warehouses');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditPage, setShowEditPage] = useState(false);
  const [editingWarehouseId, setEditingWarehouseId] = useState(null);

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


  // 处理编辑仓库
  const handleEditWarehouse = (warehouseId) => {
    setEditingWarehouseId(warehouseId);
    setShowEditPage(true);
  };

  // 处理新增仓库
  const handleAddWarehouse = () => {
    setEditingWarehouseId(null);
    setShowEditPage(true);
  };

  // 处理返回列表
  const handleBackToList = () => {
    setShowEditPage(false);
    setEditingWarehouseId(null);
  };

  // 处理保存仓库
  const handleSaveWarehouse = (data) => {
    console.log('保存仓库数据:', data);
    // 这里处理保存逻辑，然后返回列表
    setShowEditPage(false);
    setEditingWarehouseId(null);
  };

  // 如果显示编辑页面，渲染编辑组件
  if (showEditPage) {
    return (
      <WarehouseEditPage
        warehouseId={editingWarehouseId}
        onBack={handleBackToList}
        onSave={handleSaveWarehouse}
      />
    );
  }

  const WarehouseForm = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="warehouseId">仓库编号</Label>
          <Input id="warehouseId" placeholder="如：WH004" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="warehouseName">仓库名称</Label>
          <Input id="warehouseName" placeholder="输入仓库名称" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">仓库地址</Label>
        <Input id="location" placeholder="详细地址" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="manager">管理员</Label>
          <Input id="manager" placeholder="管理员姓名" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">联系电话</Label>
          <Input id="phone" placeholder="联系电话" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="capacity">仓库容量</Label>
        <Input id="capacity" placeholder="容量（立方米）" />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button>保存</Button>
      </div>
    </div>
  );

  const MaterialForm = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="materialCode">物料编码</Label>
          <Input id="materialCode" placeholder="如：M004" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="materialName">物料名称</Label>
          <Input id="materialName" placeholder="输入物料名称" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">物料分类</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hardware">五金件</SelectItem>
              <SelectItem value="electronic">电子元件</SelectItem>
              <SelectItem value="cable">电缆线材</SelectItem>
              <SelectItem value="mechanical">机械零件</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">计量单位</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择单位" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="piece">个</SelectItem>
              <SelectItem value="meter">米</SelectItem>
              <SelectItem value="kg">千克</SelectItem>
              <SelectItem value="box">箱</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="supplier">供应商</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择供应商" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sup1">供应商A</SelectItem>
              <SelectItem value="sup2">供应商B</SelectItem>
              <SelectItem value="sup3">供应商C</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">参考价格</Label>
          <Input id="price" placeholder="单价" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="minStock">最低库存</Label>
        <Input id="minStock" placeholder="最低库存数量" />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button>保存</Button>
      </div>
    </div>
  );

  const SupplierForm = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="supplierId">供应商编号</Label>
          <Input id="supplierId" placeholder="如：SUP003" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplierName">供应商名称</Label>
          <Input id="supplierName" placeholder="公司名称" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact">联系人</Label>
          <Input id="contact" placeholder="联系人姓名" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPhone">联系电话</Label>
          <Input id="contactPhone" placeholder="电话号码" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <Input id="email" type="email" placeholder="邮箱地址" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">地址</Label>
        <Input id="address" placeholder="详细地址" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="supplierCategory">主营类别</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="选择主营类别" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hardware">五金件</SelectItem>
            <SelectItem value="electronic">电子元件</SelectItem>
            <SelectItem value="cable">电缆线材</SelectItem>
            <SelectItem value="mechanical">机械零件</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button>保存</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">基础资料</h2>
          <p className="text-muted-foreground">
            管理仓库、物料、供应商等基础数据
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>基础数据管理</CardTitle>
          <CardDescription>
            维护系统的基础数据，包括仓库信息、物料档案和供应商信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="warehouses" className="flex items-center gap-2">
                <Warehouse className="h-4 w-4" />
                仓库管理
              </TabsTrigger>
              <TabsTrigger value="materials" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                物料档案
              </TabsTrigger>
              <TabsTrigger value="suppliers" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                供应商管理
              </TabsTrigger>
            </TabsList>

            <TabsContent value="warehouses" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="搜索仓库..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-80"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        快速新增
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>快速新增仓库</DialogTitle>
                        <DialogDescription>
                          创建新的仓库信息
                        </DialogDescription>
                      </DialogHeader>
                      <WarehouseForm />
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" onClick={handleAddWarehouse}>
                    <Plus className="h-4 w-4 mr-2" />
                    详细新增
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>仓库编号</TableHead>
                      <TableHead>仓库名称</TableHead>
                      <TableHead>地址</TableHead>
                      <TableHead>管理员</TableHead>
                      <TableHead>联系电话</TableHead>
                      <TableHead>容量</TableHead>
                      <TableHead>利用率</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockWarehouses.map((warehouse) => {
                      const statusInfo = getStatusBadge(warehouse.status);
                      return (
                        <TableRow key={warehouse.id}>
                          <TableCell className="font-medium">{warehouse.id}</TableCell>
                          <TableCell>{warehouse.name}</TableCell>
                          <TableCell>{warehouse.location}</TableCell>
                          <TableCell>{warehouse.manager}</TableCell>
                          <TableCell>{warehouse.phone}</TableCell>
                          <TableCell>{warehouse.capacity}㎡</TableCell>
                          <TableCell>{warehouse.utilization}</TableCell>
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
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditWarehouse(warehouse.id)}
                              >
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

            <TabsContent value="materials" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="搜索物料..."
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
                      新增物料
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>新增物料</DialogTitle>
                      <DialogDescription>
                        创建新的物料档案
                      </DialogDescription>
                    </DialogHeader>
                    <MaterialForm />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>物料编码</TableHead>
                      <TableHead>物料名称</TableHead>
                      <TableHead>分类</TableHead>
                      <TableHead>单位</TableHead>
                      <TableHead>供应商</TableHead>
                      <TableHead>参考价格</TableHead>
                      <TableHead>最低库存</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMaterials.map((material) => {
                      const statusInfo = getStatusBadge(material.status);
                      return (
                        <TableRow key={material.code}>
                          <TableCell className="font-medium">{material.code}</TableCell>
                          <TableCell>{material.name}</TableCell>
                          <TableCell>{material.category}</TableCell>
                          <TableCell>{material.unit}</TableCell>
                          <TableCell>{material.supplier}</TableCell>
                          <TableCell>{material.price}</TableCell>
                          <TableCell>{material.minStock}</TableCell>
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

            <TabsContent value="suppliers" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="搜索供应商..."
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
                      新增供应商
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>新增供应商</DialogTitle>
                      <DialogDescription>
                        创建新的供应商信息
                      </DialogDescription>
                    </DialogHeader>
                    <SupplierForm />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>供应商编号</TableHead>
                      <TableHead>供应商名称</TableHead>
                      <TableHead>联系人</TableHead>
                      <TableHead>联系电话</TableHead>
                      <TableHead>邮箱</TableHead>
                      <TableHead>主营类别</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSuppliers.map((supplier) => {
                      const statusInfo = getStatusBadge(supplier.status);
                      return (
                        <TableRow key={supplier.id}>
                          <TableCell className="font-medium">{supplier.id}</TableCell>
                          <TableCell>{supplier.name}</TableCell>
                          <TableCell>{supplier.contact}</TableCell>
                          <TableCell>{supplier.phone}</TableCell>
                          <TableCell>{supplier.email}</TableCell>
                          <TableCell>{supplier.category}</TableCell>
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