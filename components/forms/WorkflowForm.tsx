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
import { Plus } from 'lucide-react';

export function WorkflowForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="workflowName">流程名称</Label>
        <Input id="workflowName" placeholder="输入流程名称" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="workflowType">流程类型</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="选择流程类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="purchase">采购管理</SelectItem>
            <SelectItem value="warehouse">仓库管理</SelectItem>
            <SelectItem value="sales">销售管理</SelectItem>
            <SelectItem value="basic">基础资料</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="condition">触发条件</Label>
        <Input id="condition" placeholder="如：金额 > 10000" />
      </div>
      <div className="space-y-2">
        <Label>审批步骤</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm w-12">步骤1:</span>
            <Select>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="选择审批人" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">部门经理</SelectItem>
                <SelectItem value="director">部门总监</SelectItem>
                <SelectItem value="ceo">总经理</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">删除</Button>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            添加步骤
          </Button>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button>保存</Button>
      </div>
    </div>
  );
}