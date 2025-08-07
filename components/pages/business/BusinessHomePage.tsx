import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import {
  ShoppingCart,
  DollarSign,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Package
} from 'lucide-react';
import { stats, businessModules, recentActivities } from '../../../mockdata/business';

export function BusinessHomePage() {
  const navigate = useNavigate();

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
