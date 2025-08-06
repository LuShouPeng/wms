import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
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
  Edit,
  Trash2,
  Eye,
  ClipboardList
} from 'lucide-react';
import { mockProducts, inventoryOrders, warehouses } from '../mockdata';

export function InventoryManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [inventoryForm, setInventoryForm] = useState({
    warehouse: '',
    remark: '',
    items: mockProducts.map(product => ({ ...product, systemQuantity: 100, actualQuantity: 0, difference: 0 }))
  });

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any }> = {
      completed: { label: '已完成', variant: 'success' },
      pending: { label: '待处理', variant: 'warning' },
      processing: { label: '处理中', variant: 'info' },
      approved: { label: '已审核', variant: 'info' }
    };
    return statusMap[status] || { label: status, variant: 'default' };
  };

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

  const InventoryForm = () => {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">盘点管理</h2>
          <p className="text-muted-foreground">
            管理库存盘点操作和盘点单据
          </p>
        </div>
      </div>

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
}