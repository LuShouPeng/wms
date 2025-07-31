import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

export function RoleForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="roleName">角色名称</Label>
        <Input id="roleName" placeholder="输入角色名称" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="roleDesc">角色描述</Label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md h-20 resize-none"
          placeholder="角色描述..."
        />
      </div>
      <div className="space-y-3">
        <Label>权限设置</Label>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">仓库管理</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">采购管理</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">销售管理</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">报表查看</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">基础资料</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">系统设置</span>
            <Switch />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button>保存</Button>
      </div>
    </div>
  );
}