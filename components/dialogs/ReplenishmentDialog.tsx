import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import { 
  Package, 
  Send, 
  AlertTriangle, 
  Calendar,
  User,
  Building,
  Phone
} from 'lucide-react';
import { toast } from 'sonner';
import { suggestedSuppliers } from '../../mockdata';

interface ReplenishmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productCode?: string;
  productName?: string;
  currentStock?: number;
  minStock?: number;
}

export function ReplenishmentDialog({
  open,
  onOpenChange,
  productCode = '',
  productName = '',
  currentStock = 0,
  minStock = 0
}: ReplenishmentDialogProps) {
  const [formData, setFormData] = useState({
    urgencyLevel: '',
    requestedQuantity: '',
    expectedDate: '',
    supplier: '',
    contactPerson: '',
    contactPhone: '',
    remarks: ''
  });

  const shortage = Math.max(0, minStock - currentStock);
  const recommendedQuantity = shortage + Math.ceil(minStock * 0.2); // 建议补货量 = 缺口 + 20%安全库存

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 模拟发送补货信息
    const replenishmentRequest = {
      productCode,
      productName,
      currentStock,
      minStock,
      shortage,
      requestedQuantity: parseInt(formData.requestedQuantity) || recommendedQuantity,
      urgencyLevel: formData.urgencyLevel,
      expectedDate: formData.expectedDate,
      supplier: formData.supplier,
      contactPerson: formData.contactPerson,
      contactPhone: formData.contactPhone,
      remarks: formData.remarks,
      requestDate: new Date().toISOString(),
      requestedBy: '当前用户', // 可以从用户上下文获取
      status: 'pending'
    };

    console.log('补货申请:', replenishmentRequest);
    
    // 显示成功消息
    toast.success('补货申请已发送', {
      description: `物料 ${productCode} 的补货申请已成功提交，申请数量：${formData.requestedQuantity || recommendedQuantity}`,
    });

    // 重置表单并关闭对话框
    setFormData({
      urgencyLevel: '',
      requestedQuantity: '',
      expectedDate: '',
      supplier: '',
      contactPerson: '',
      contactPhone: '',
      remarks: ''
    });
    
    onOpenChange(false);
  };

  const getUrgencyBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge variant="destructive">紧急</Badge>;
      case 'medium':
        return <Badge variant="secondary">一般</Badge>;
      case 'low':
        return <Badge variant="outline">不急</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            发送补货信息
          </DialogTitle>
          <DialogDescription>
            为库存不足的物料发送补货申请
          </DialogDescription>
        </DialogHeader>

        {/* 物料信息概览 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-yellow-800 mb-2">库存预警信息</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">物料编码:</span>
                  <span className="font-medium ml-2">{productCode}</span>
                </div>
                <div>
                  <span className="text-gray-600">物料名称:</span>
                  <span className="font-medium ml-2">{productName}</span>
                </div>
                <div>
                  <span className="text-gray-600">当前库存:</span>
                  <span className="font-medium ml-2 text-red-600">{currentStock}</span>
                </div>
                <div>
                  <span className="text-gray-600">最低库存:</span>
                  <span className="font-medium ml-2">{minStock}</span>
                </div>
                <div>
                  <span className="text-gray-600">缺口数量:</span>
                  <span className="font-medium ml-2 text-red-600">{shortage}</span>
                </div>
                <div>
                  <span className="text-gray-600">建议补货:</span>
                  <span className="font-medium ml-2 text-blue-600">{recommendedQuantity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 补货申请表单 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="urgency">紧急程度 *</Label>
              <Select
                value={formData.urgencyLevel}
                onValueChange={(value) => setFormData({ ...formData, urgencyLevel: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择紧急程度" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">紧急 - 立即处理</SelectItem>
                  <SelectItem value="medium">一般 - 本周内处理</SelectItem>
                  <SelectItem value="low">不急 - 本月内处理</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">申请数量 *</Label>
              <Input
                id="quantity"
                type="number"
                placeholder={`建议: ${recommendedQuantity}`}
                value={formData.requestedQuantity}
                onChange={(e) => setFormData({ ...formData, requestedQuantity: e.target.value })}
                required
                min="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expectedDate">期望到货日期</Label>
              <Input
                id="expectedDate"
                type="date"
                value={formData.expectedDate}
                onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">建议供应商</Label>
              <Select
                value={formData.supplier}
                onValueChange={(value) => setFormData({ ...formData, supplier: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择供应商" />
                </SelectTrigger>
                <SelectContent>
                  {suggestedSuppliers.map((supplier) => (
                    <SelectItem key={supplier.value} value={supplier.value}>
                      {supplier.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPerson">联系人</Label>
              <Input
                id="contactPerson"
                placeholder="联系人姓名"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">联系电话</Label>
              <Input
                id="contactPhone"
                placeholder="联系电话"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">备注说明</Label>
            <Textarea
              id="remarks"
              placeholder="请输入补货的详细要求、规格说明或其他特殊要求..."
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              {formData.urgencyLevel && getUrgencyBadge(formData.urgencyLevel)}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                取消
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                发送补货申请
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}