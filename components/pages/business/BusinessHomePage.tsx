import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import {
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  FileText,
  Warehouse,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Users,
  Package
} from 'lucide-react';

export function BusinessHomePage() {
  const navigate = useNavigate();

  // 统计数据
  const stats = [
    {
      title: '本月采购',
      value: '¥105,630',
      description: '+12.5% 较上月',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: '本月销售',
      value: '¥76,330',
      description: '+8.2% 较上月',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: '待审批',
      value: '8',
      description: '采购单待处理',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: '已完成',
      value: '25',
      description: '本月订单',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  // 功能模块
  const businessModules = [
    {
      id: 'purchase',
      title: '采购管理',
      description: '管理采购申请、订单和供应商关系',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      stats: { pending: 8, completed: 15, total: 23 }
    },
    {
      id: 'sales',
      title: '销售管理',
      description: '管理销售订单、客户关系和销售流程',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      stats: { pending: 5, completed: 18, total: 23 }
    },
    {
      id: 'workflow',
      title: '审批流程',
      description: '配置和管理业务审批流程',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      stats: { active: 6, templates: 12, total: 18 }
    },
    {
      id: 'business-damage',
      title: '报损管理',
      description: '处理物料损坏、丢失等报损申请',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      stats: { pending: 3, approved: 7, rejected: 2 }
    }
  ];

  // 最近动态数据
  const recentActivities = [
    { type: '采购', content: 'PO-2024-001 已审批通过', time: '10分钟前', status: 'approved' },
    { type: '销售', content: 'SO-2024-015 已完成发货', time: '30分钟前', status: 'shipped' },
    { type: '审批', content: '新增采购审批流程模板', time: '1小时前', status: 'created' },
    { type: '报损', content: 'DMG-2024-005 报损申请已提交', time: '2小时前', status: 'pending' }
  ];

  const handleNavigateToModule = (moduleId: string) => {
    navigate(`/business/${moduleId}`);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">业务管理</h2>
          <p className="text-muted-foreground">
            统一管理采购、销售、审批等业务流程
          </p>
        </div>
        <Button variant="outline">
          <TrendingUp className="h-4 w-4 mr-2" />
          业务报表
        </Button>
      </div>

      {/* 统计概览 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-md ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 功能模块导航 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {businessModules.map((module) => (
          <Card 
            key={module.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${module.borderColor} hover:border-primary/50`}
            onClick={() => handleNavigateToModule(module.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg ${module.bgColor}`}>
                  <module.icon className={`h-6 w-6 ${module.color}`} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-lg">{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                {module.id === 'purchase' && (
                  <>
                    <span className="text-muted-foreground">待审批: {module.stats.pending}</span>
                    <span className="text-muted-foreground">已完成: {module.stats.completed}</span>
                  </>
                )}
                {module.id === 'sales' && (
                  <>
                    <span className="text-muted-foreground">待处理: {module.stats.pending}</span>
                    <span className="text-muted-foreground">已完成: {module.stats.completed}</span>
                  </>
                )}
                {module.id === 'workflow' && (
                  <>
                    <span className="text-muted-foreground">活跃流程: {module.stats.active}</span>
                    <span className="text-muted-foreground">模板数: {module.stats.templates}</span>
                  </>
                )}
                {module.id === 'business-damage' && (
                  <>
                    <span className="text-muted-foreground">待处理: {module.stats.pending}</span>
                    <span className="text-muted-foreground">已批准: {module.stats.approved}</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 最近动态和快捷操作 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 最近动态 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              最近动态
            </CardTitle>
            <CardDescription>
              查看最近的业务活动和变更
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">[{activity.type}]</span> {activity.content}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 快捷操作 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              快捷操作
            </CardTitle>
            <CardDescription>
              常用业务操作的快捷入口
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Button 
                variant="outline" 
                className="justify-start gap-2 h-auto p-3"
                onClick={() => handleNavigateToModule('purchase')}
              >
                <ShoppingCart className="h-4 w-4" />
                <div className="text-left">
                  <div className="text-sm font-medium">新建采购单</div>
                  <div className="text-xs text-muted-foreground">创建新的采购申请</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start gap-2 h-auto p-3"
                onClick={() => handleNavigateToModule('sales')}
              >
                <DollarSign className="h-4 w-4" />
                <div className="text-left">
                  <div className="text-sm font-medium">新建销售单</div>
                  <div className="text-xs text-muted-foreground">记录新的销售订单</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start gap-2 h-auto p-3"
                onClick={() => handleNavigateToModule('workflow')}
              >
                <FileText className="h-4 w-4" />
                <div className="text-left">
                  <div className="text-sm font-medium">审批管理</div>
                  <div className="text-xs text-muted-foreground">处理待审批事项</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start gap-2 h-auto p-3"
                onClick={() => handleNavigateToModule('business-damage')}
              >
                <AlertTriangle className="h-4 w-4" />
                <div className="text-left">
                  <div className="text-sm font-medium">报损申请</div>
                  <div className="text-xs text-muted-foreground">提交物料报损申请</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
