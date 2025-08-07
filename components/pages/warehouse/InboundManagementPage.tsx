import React, { useState } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
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
  Filter, 
  Download, 
  Edit,
  Trash2,
  Eye,
  PackageCheck
} from 'lucide-react';
import { mockProducts, inboundOrders, warehouseSuppliers as suppliers, warehouseOptions as warehouses } from '../../../mockdata/warehouse';

export function InboundManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [inboundForm, setInboundForm] = useState({
    supplier: '',
    warehouse: '',
    remark: '',
    items: mockProducts.map(product => ({ ...product, quantity: 0 }))
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

  const InboundForm = () => {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">入库管理</h2>
          <p className="text-muted-foreground">
            管理物料入库操作和入库单据
          </p>
        </div>
      </div>

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
}