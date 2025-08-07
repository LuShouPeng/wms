import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { businessSuppliers as suppliers } from '../../mockdata';

export function PurchaseForm() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="supplier">供应商</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择供应商" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">预计金额</Label>
          <Input id="amount" placeholder="输入预计金额" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="reason">采购原因</Label>
        <Textarea
          id="reason"
          className="h-20 resize-none"
          placeholder="请描述采购原因..."
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">保存草稿</Button>
        <Button>提交审批</Button>
      </div>
    </div>
  );
}