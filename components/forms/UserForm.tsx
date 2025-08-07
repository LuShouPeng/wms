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
import { userRoles, userDepartments, userFormPlaceholders } from '../../mockdata/users';

export function UserForm() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="username">用户名</Label>
          <Input id="username" placeholder={userFormPlaceholders.username} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">姓名</Label>
          <Input id="name" placeholder={userFormPlaceholders.name} />
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
              {userRoles.map(role => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
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
              {userDepartments.map(dept => (
                <SelectItem key={dept.value} value={dept.value}>
                  {dept.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input id="email" type="email" placeholder={userFormPlaceholders.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">手机号</Label>
          <Input id="phone" placeholder={userFormPlaceholders.phone} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <Input id="password" type="password" placeholder={userFormPlaceholders.password} />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button>保存</Button>
      </div>
    </div>
  );
}
