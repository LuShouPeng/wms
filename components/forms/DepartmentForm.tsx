import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function DepartmentForm() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="departmentName">部门名称</Label>
          <Input id="departmentName" placeholder="输入部门名称" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departmentCode">部门代码</Label>
          <Input id="departmentCode" placeholder="输入部门代码" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="manager">部门负责人</Label>
          <Input id="manager" placeholder="输入部门负责人" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employeeCount">员工数量</Label>
          <Input id="employeeCount" type="number" placeholder="输入员工数量" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">部门状态</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="选择部门状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">活跃</SelectItem>
            <SelectItem value="pending">待激活</SelectItem>
            <SelectItem value="inactive">停用</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">部门描述</Label>
        <Textarea
          id="description"
          className="h-20 resize-none"
          placeholder="部门职责描述..."
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button>创建部门</Button>
      </div>
    </div>
  );
}