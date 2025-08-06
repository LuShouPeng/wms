import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  FileText,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Plus,
  Settings,
  Users,
  Workflow
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WorkflowForm } from '../../forms/WorkflowForm';
import { mockWorkflows } from '../../../mockdata';

export function WorkflowManagementPage() {
  const navigate = useNavigate();

  // 待审批的统计数据
  const pendingApprovals = [
    { type: '采购申请', count: 5, urgent: 2 },
    { type: '销售订单', count: 3, urgent: 1 },
    { type: '报损申请', count: 2, urgent: 0 },
    { type: '调拨申请', count: 1, urgent: 1 }
  ];

  // 审批流程模板
  const workflowTemplates = [
    {
      id: 'purchase-approval',
      name: '采购审批流程',
      description: '采购申请的标准审批流程',
      steps: 3,
      active: true,
      usage: 25
    },
    {
      id: 'sales-approval', 
      name: '销售审批流程',
      description: '销售订单的审批流程',
      steps: 2,
      active: true,
      usage: 18
    },
    {
      id: 'damage-approval',
      name: '报损审批流程', 
      description: '物料报损的审批流程',
      steps: 2,
      active: true,
      usage: 12
    }
  ];

  // 审批历史记录
  const approvalHistory = [
    {
      id: 'APP-2024-001',
      type: '采购申请',
      title: 'PO-2024-001 采购申请',
      applicant: '张三',
      status: 'approved',
      completedAt: '2024-01-15 14:30',
      approver: '李经理'
    },
    {
      id: 'APP-2024-002',
      type: '销售订单',
      title: 'SO-2024-015 销售确认',
      applicant: '李四',
      status: 'pending',
      submittedAt: '2024-01-15 16:20',
      currentApprover: '王总监'
    },
    {
      id: 'APP-2024-003',
      type: '报损申请',
      title: 'DMG-2024-005 物料报损',
      applicant: '王五',
      status: 'rejected',
      rejectedAt: '2024-01-14 09:15',
      rejectReason: '信息不完整'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800">已批准</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">待审批</Badge>;
      case 'rejected':
        return <Badge variant="destructive">已拒绝</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/business')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">审批流程管理</h2>
            <p className="text-muted-foreground">
              配置和管理业务审批流程，处理审批事项
            </p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新建流程模板
        </Button>
      </div>

      {/* 待审批统计 */}
      <div className="grid gap-4 md:grid-cols-4">
        {pendingApprovals.map((item) => (
          <Card key={item.type}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.type}</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.count}</div>
              <p className="text-xs text-muted-foreground">
                {item.urgent > 0 ? `${item.urgent} 项紧急` : '无紧急事项'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 流程配置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              流程模板管理
            </CardTitle>
            <CardDescription>
              配置新的审批流程或修改现有流程模板
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflowTemplates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <Workflow className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>{template.steps} 个审批步骤</span>
                        <span>使用次数: {template.usage}</span>
                        {template.active && <Badge variant="outline" className="text-xs">活跃</Badge>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 新建流程表单 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              创建新流程
            </CardTitle>
            <CardDescription>
              配置新的审批流程模板
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WorkflowForm />
          </CardContent>
        </Card>
      </div>

      {/* 审批历史 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            审批历史
          </CardTitle>
          <CardDescription>
            查看最近的审批记录和处理状态
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {approvalHistory.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center">
                    {getStatusIcon(record.status)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{record.title}</h4>
                      {getStatusBadge(record.status)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium">申请人:</span> {record.applicant}
                      {record.status === 'approved' && (
                        <>
                          <span className="mx-2">•</span>
                          <span>批准人: {record.approver}</span>
                          <span className="mx-2">•</span>
                          <span>完成时间: {record.completedAt}</span>
                        </>
                      )}
                      {record.status === 'pending' && (
                        <>
                          <span className="mx-2">•</span>
                          <span>当前审批人: {record.currentApprover}</span>
                          <span className="mx-2">•</span>
                          <span>提交时间: {record.submittedAt}</span>
                        </>
                      )}
                      {record.status === 'rejected' && (
                        <>
                          <span className="mx-2">•</span>
                          <span>拒绝原因: {record.rejectReason}</span>
                          <span className="mx-2">•</span>
                          <span>拒绝时间: {record.rejectedAt}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-3 w-3" />
                  </Button>
                  {record.status === 'pending' && (
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
