import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import {
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Download,
  Filter,
  Calendar,
  AlertTriangle,
  Package,
  DollarSign,
  Send
} from 'lucide-react';
import { ReplenishmentDialog } from './ReplenishmentDialog';
import {
  inventoryData,
  stockTrendData,
  categoryData,
  financialData,
  alertData
} from '../mockdata';

export function Reports({ user }) {
  const [activeTab, setActiveTab] = useState('inventory');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [replenishmentDialog, setReplenishmentDialog] = useState({
    open: false,
    productCode: '',
    productName: '',
    currentStock: 0,
    minStock: 0
  });


  const getStockStatusBadge = (status) => {
    const statusMap = {
      low: { label: '库存不足', variant: 'destructive' },
      normal: { label: '正常', variant: 'success' },
      high: { label: '库存充足', variant: 'info' }
    };
    return statusMap[status] || { label: status, variant: 'default' };
  };

  const getAlertLevelBadge = (level) => {
    const levelMap = {
      high: { label: '高风险', variant: 'destructive' },
      medium: { label: '中风险', variant: 'warning' },
      low: { label: '低风险', variant: 'success' }
    };
    return levelMap[level] || { label: level, variant: 'default' };
  };

  const handleReplenishmentRequest = (alert: any) => {
    setReplenishmentDialog({
      open: true,
      productCode: alert.code,
      productName: alert.name,
      currentStock: alert.currentStock,
      minStock: alert.minStock
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">报表管理</h2>
          <p className="text-muted-foreground">
            查看库存、财务、业务等各类统计报表
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
              <SelectItem value="year">本年</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出报表
          </Button>
        </div>
      </div>

      {/* 概览统计 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">库存总价值</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥2,456,789</div>
            <p className="text-xs text-muted-foreground">
              +12.5% 较上月
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月采购</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥320,000</div>
            <p className="text-xs text-muted-foreground">
              +8.2% 较上月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">库存周转率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4</div>
            <p className="text-xs text-muted-foreground">
              较上月持平
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">预警物料</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              需要补货
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 报表主要内容 */}
      <Card>
        <CardHeader>
          <CardTitle>数据报表</CardTitle>
          <CardDescription>
            详细的库存、财务和业务数据分析
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inventory" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                库存报表
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                财务报表
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                趋势分析
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                预警报表
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">库存清单</h3>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  筛选
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>物料编码</TableHead>
                      <TableHead>物料名称</TableHead>
                      <TableHead>分类</TableHead>
                      <TableHead>库存数量</TableHead>
                      <TableHead>单位</TableHead>
                      <TableHead>库存价值</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryData.map((item) => {
                      const statusInfo = getStockStatusBadge(item.status);
                      return (
                        <TableRow key={item.code}>
                          <TableCell className="font-medium">{item.code}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.stock}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{item.value}</TableCell>
                          <TableCell>
                            <Badge variant={statusInfo.variant}>
                              {statusInfo.label}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>财务趋势</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={financialData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="purchase" fill="#8884d8" name="采购金额" />
                        <Bar dataKey="sales" fill="#82ca9d" name="销售金额" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>物料分类分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>库存趋势分析</CardTitle>
                  <CardDescription>
                    入库、出库和库存变化趋势
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={stockTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="inbound" 
                        stroke="#8884d8" 
                        name="入库数量"
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="outbound" 
                        stroke="#82ca9d" 
                        name="出库数量"
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="stock" 
                        stroke="#ffc658" 
                        name="库存数量"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">库存预警</h3>
                <Badge variant="destructive">
                  {alertData.length} 个物料需要关注
                </Badge>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>物料编码</TableHead>
                      <TableHead>物料名称</TableHead>
                      <TableHead>当前库存</TableHead>
                      <TableHead>最低库存</TableHead>
                      <TableHead>缺口数量</TableHead>
                      <TableHead>预警级别</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alertData.map((item) => {
                      const levelInfo = getAlertLevelBadge(item.alertLevel);
                      const shortage = item.minStock - item.currentStock;
                      return (
                        <TableRow key={item.code}>
                          <TableCell className="font-medium">{item.code}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.currentStock}</TableCell>
                          <TableCell>{item.minStock}</TableCell>
                          <TableCell className="text-red-600">
                            {shortage > 0 ? shortage : 0}
                          </TableCell>
                          <TableCell>
                            <Badge variant={levelInfo.variant}>
                              {levelInfo.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              onClick={() => handleReplenishmentRequest(item)}
                            >
                              <Send className="h-3 w-3 mr-1" />
                              发送补货信息
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 补货申请对话框 */}
      <ReplenishmentDialog
        open={replenishmentDialog.open}
        onOpenChange={(open) => setReplenishmentDialog({ ...replenishmentDialog, open })}
        productCode={replenishmentDialog.productCode}
        productName={replenishmentDialog.productName}
        currentStock={replenishmentDialog.currentStock}
        minStock={replenishmentDialog.minStock}
      />
    </div>
  );
}