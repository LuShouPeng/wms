import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Eye,
  Building,
  ArrowLeft,
  MapPin,
  Phone,
  Users,
  Download,
  Upload
} from 'lucide-react';
import { getStatusBadge } from '../../../lib/utils';
import { WarehouseEditPage } from '../warehouse/WarehouseEditPage';
import { mockWarehouses } from '../../../mockdata';

export function WarehousesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditPage, setShowEditPage] = useState(false);
  const [editingWarehouseId, setEditingWarehouseId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('all');

  // 处理编辑仓库
  const handleEditWarehouse = (warehouseId: string) => {
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
  const handleSaveWarehouse = (data: any) => {
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

  // 筛选数据
  const filteredWarehouses = mockWarehouses.filter(warehouse => {
    const matchesSearch = warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warehouse.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warehouse.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || warehouse.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // 统计数据
  const totalWarehouses = mockWarehouses.length;
  const activeWarehouses = mockWarehouses.filter(w => w.status === 'active').length;
  const maintenanceWarehouses = mockWarehouses.filter(w => w.status === 'maintenance').length;
  const totalCapacity = mockWarehouses.reduce((sum, w) => sum + parseFloat(w.capacity), 0);

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

  return (
    <div className="space-y-6">
      {/* 页面标题和导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/basic-data')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">仓库档案</h2>
            <p className="text-muted-foreground">
              管理仓库基本信息、容量配置和使用情况
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            导入
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">仓库总数</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWarehouses}</div>
            <p className="text-xs text-muted-foreground">
              已配置仓库数量
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">运行中</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeWarehouses}</div>
            <p className="text-xs text-muted-foreground">
              正常运营状态
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">维护中</CardTitle>
            <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{maintenanceWarehouses}</div>
            <p className="text-xs text-muted-foreground">
              需要维护检修
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总容量</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              立方米存储空间
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和操作 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            仓库列表
          </CardTitle>
          <CardDescription>
            查看和管理所有仓库的基本信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
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
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="active">运行中</SelectItem>
                  <SelectItem value="maintenance">维护中</SelectItem>
                  <SelectItem value="inactive">停用</SelectItem>
                </SelectContent>
              </Select>
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
                {filteredWarehouses.map((warehouse) => {
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
                        <Badge variant={statusInfo.variant as any}>
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

          {filteredWarehouses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <div>没有找到匹配的仓库信息</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
