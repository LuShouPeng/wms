import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function UserForm() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="username">用户名</Label>
          <Input id="username" placeholder="输入用户名" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">姓名</Label>
          <Input id="name" placeholder="输入姓名" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="role">角色</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择角色" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">超级管理员</SelectItem>
              <SelectItem value="warehouse">仓库管理员</SelectItem>
              <SelectItem value="purchase">采购员</SelectItem>
              <SelectItem value="finance">财务人员</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">部门</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择部门" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="it">信息部</SelectItem>
              <SelectItem value="warehouse">仓储部</SelectItem>
              <SelectItem value="purchase">采购部</SelectItem>
              <SelectItem value="finance">财务部</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input id="email" type="email" placeholder="输入邮箱" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">手机号</Label>
          <Input id="phone" placeholder="输入手机号" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <Input id="password" type="password" placeholder="输入密码" />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button>保存</Button>
      </div>
    </div>
  );
}