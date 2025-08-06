import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import {
  ArrowLeft,
  AlertTriangle,
  FileX,
  TrendingDown,
  Archive,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DamageManagement } from '../warehouse/DamageManagement';

export function BusinessDamagePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* 页面标题和导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/business')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">业务报损管理</h2>
            <p className="text-muted-foreground">
              处理物料损坏、丢失等报损申请
            </p>
          </div>
        </div>
      </div>

      {/* 说明信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            报损管理集成
          </CardTitle>
          <CardDescription>
            在业务管理模块中集成的报损管理功能，处理各类物料报损申请和审批流程
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <FileX className="h-6 w-6 text-red-600" />
              <div>
                <div className="font-medium">报损申请</div>
                <div className="text-sm text-muted-foreground">提交损坏物料</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <TrendingDown className="h-6 w-6 text-orange-600" />
              <div>
                <div className="font-medium">损耗统计</div>
                <div className="text-sm text-muted-foreground">查看损耗情况</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Archive className="h-6 w-6 text-blue-600" />
              <div>
                <div className="font-medium">审批流程</div>
                <div className="text-sm text-muted-foreground">报损审批管理</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <div className="font-medium">处理结果</div>
                <div className="text-sm text-muted-foreground">报损处理记录</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 集成报损管理组件 */}
      <DamageManagement />
    </div>
  );
}
