import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import {
  Package,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Building,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Activity,
  Plus,
  RefreshCw,
  Eye,
  Edit,
  Download
} from 'lucide-react';
import EchartsDashboardPage from './EchartsDashboardPage';

export function Dashboard({ user, activeSubModule, onSubModuleChange }: {
  user: any;
  activeSubModule?: string;
  onSubModuleChange?: (subModule: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);

  // 模拟数据加载
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDashboardData({
        overview: {
          totalProducts: 1256,
          totalWarehouses: 8,
          lowStockItems: 23,
          pendingOrders: 15,
          todayInbound: 45,
          todayOutbound: 38,
          monthlyRevenue: 285000,
          monthlyGrowth: 12.5
        },
        recentActivities: [
          { id: 1, type: 'inbound', description: '物料A001入库', quantity: 100, time: '10分钟前', operator: '张三' },
          { id: 2, type: 'outbound', description: '产品B002出库', quantity: 50, time: '25分钟前', operator: '李四' },
          { id: 3, type: 'transfer', description: '库存调拨', quantity: 75, time: '1小时前', operator: '王五' },
          { id: 4, type: 'damage', description: '物料损坏报告', quantity: 5, time: '2小时前', operator: '赵六' }
        ],
        lowStockAlerts: [
          { id: 1, productCode: 'A001', productName: '标准螺丝M6x20', currentStock: 15, minStock: 50, status: 'critical' },
          { id: 2, productCode: 'B002', productName: '电阻100Ω', currentStock: 25, minStock: 30, status: 'warning' },
          { id: 3, productCode: 'C003', productName: '电容10μF', currentStock: 8, minStock: 20, status: 'critical' }
        ],
        pendingApprovals: [
          { id: 1, type: 'purchase', title: '采购申请PO-2024-001', applicant: '采购部', time: '2小时前' },
          { id: 2, type: 'damage', title: '报损审批DR-2024-015', applicant: '仓管员', time: '4小时前' },
          { id: 3, type: 'transfer', title: '调拨申请TR-2024-008', applicant: '生产部', time: '1天前' }
        ]
      });
      
      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'inbound': return <ArrowUpDown className="h-4 w-4 text-green-600" />;
      case 'outbound': return <ArrowUpDown className="h-4 w-4 text-blue-600" />;
      case 'transfer': return <ArrowUpDown className="h-4 w-4 text-purple-600" />;
      case 'damage': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge variant="destructive">严重不足</Badge>;
      case 'warning':
        return <Badge variant="secondary">库存偏低</Badge>;
      default:
        return <Badge variant="secondary">正常</Badge>;
    }
  };

  const quickActions = [
    { label: '快速入库', icon: Plus, color: 'text-green-500', module: 'warehouse', action: 'inbound' },
    { label: '快速出库', icon: ArrowUpDown, color: 'text-blue-500', module: 'warehouse', action: 'outbound' },
    { label: '库存盘点', icon: Package, color: 'text-purple-500', module: 'warehouse', action: 'inventory' },
    { label: '采购申请', icon: ShoppingCart, color: 'text-orange-500', module: 'business', action: 'purchase' },
  ];

  // Handle submodule navigation
  if (activeSubModule === 'visualization') {
    return (
      <EchartsDashboardPage
        user={user}
        onNavigateBack={() => onSubModuleChange?.('overview')}
      />
    );
  }

  // Diagnostic logging for quick actions
  console.log('Quick Actions:', quickActions);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">仪表盘</h2>
            <p className="text-muted-foreground">欢迎回来，{user?.name}</p>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和快捷操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">仪表盘</h2>
          <p className="text-muted-foreground">
            欢迎回来，{user?.name} | {user?.role}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新数据
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出报表
          </Button>
        </div>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总产品数量</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.overview.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              +12 个新产品本月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">仓库数量</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.overview.totalWarehouses}</div>
            <p className="text-xs text-muted-foreground">
              覆盖3个城市
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">库存预警</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{dashboardData?.overview.lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              需要及时补货
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待处理订单</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.overview.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              平均处理时间2小时
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 今日数据和趋势 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              今日入库
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{dashboardData?.overview.todayInbound}</div>
            <p className="text-xs text-muted-foreground">比昨日增长8%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-blue-600" />
              今日出库
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{dashboardData?.overview.todayOutbound}</div>
            <p className="text-xs text-muted-foreground">比昨日减少3%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              月度营收
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{dashboardData?.overview.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600">+{dashboardData?.overview.monthlyGrowth}% 同比增长</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-orange-600" />
              库存周转率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">健康水平</p>
          </CardContent>
        </Card>
      </div>

      {/* 快捷操作按钮 */}
      <Card>
        <CardHeader>
          <CardTitle>快捷操作</CardTitle>
          <CardDescription>常用功能快速入口</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-12 flex flex-row items-center gap-2 px-4"
                onClick={() => {
                  // 这里可以实现快捷操作的跳转逻辑
                  console.log(`Quick action: ${action.label}`);
                }}
              >
                <action.icon className={`h-5 w-5 ${action.color}`} />
                <span className="text-sm whitespace-nowrap">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 详细信息标签页 */}
      <Tabs defaultValue="activities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activities">最近活动</TabsTrigger>
          <TabsTrigger value="alerts">库存预警</TabsTrigger>
          <TabsTrigger value="approvals">待审批</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>最近活动</CardTitle>
              <CardDescription>系统最近的操作记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.recentActivities.map((activity: any) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getActivityIcon(activity.type)}
                      <div>
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-gray-500">
                          操作人: {activity.operator} | 数量: {activity.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>库存预警</CardTitle>
              <CardDescription>需要关注的低库存商品</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.lowStockAlerts.map((alert: any) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium">{alert.productName}</p>
                        {getStockStatusBadge(alert.status)}
                      </div>
                      <p className="text-sm text-gray-500">编码: {alert.productCode}</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>当前库存: {alert.currentStock}</span>
                          <span>最低库存: {alert.minStock}</span>
                        </div>
                        <Progress 
                          value={(alert.currentStock / alert.minStock) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm">
                        <Plus className="h-3 w-3 mr-1" />
                        补货
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>待审批事项</CardTitle>
              <CardDescription>需要您处理的审批申请</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.pendingApprovals.map((approval: any) => (
                  <div key={approval.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{approval.title}</p>
                      <p className="text-sm text-gray-500">
                        申请人: {approval.applicant} | {approval.time}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        查看
                      </Button>
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        审批
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}