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
  DollarSign
} from 'lucide-react';

export function Reports({ user }) {
  const [activeTab, setActiveTab] = useState('inventory');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // 模拟库存数据
  const inventoryData = [
    { code: 'M001', name: '标准螺丝M6x20', category: '五金件', stock: 150, unit: '个', value: '¥750', status: 'low' },
    { code: 'M002', name: '电阻100Ω', category: '电子元件', stock: 800, unit: '个', value: '¥1,600', status: 'normal' },
    { code: 'M003', name: '电容10μF', category: '电子元件', stock: 300, unit: '个', value: '¥3,000', status: 'normal' },
    { code: 'M004', name: '集成电路芯片', category: '电子元件', stock: 45, unit: '个', value: '¥4,500', status: 'low' },
    { code: 'M005', name: '导线2.5mm²', category: '电缆线材', stock: 1200, unit: '米', value: '¥6,000', status: 'high' }
  ];

  // 库存趋势数据
  const stockTrendData = [
    { month: '1月', inbound: 2400, outbound: 1800, stock: 4800 },
    { month: '2月', inbound: 1398, outbound: 2200, stock: 4000 },
    { month: '3月', inbound: 9800, outbound: 2800, stock: 11000 },
    { month: '4月', inbound: 3908, outbound: 3200, stock: 11700 },
    { month: '5月', inbound: 4800, outbound: 2600, stock: 13900 },
    { month: '6月', inbound: 3800, outbound: 4100, stock: 13600 }
  ];

  // 物料分类分布数据
  const categoryData = [
    { name: '五金件', value: 30, color: '#0088FE' },
    { name: '电子元件', value: 45, color: '#00C49F' },
    { name: '电缆线材', value: 15, color: '#FFBB28' },
    { name: '机械零件', value: 10, color: '#FF8042' }
  ];

  // 财务数据
  const financialData = [
    { month: '1月', purchase: 45000, sales: 38000, profit: -7000 },
    { month: '2月', purchase: 52000, sales: 42000, profit: -10000 },
    { month: '3月', purchase: 48000, sales: 55000, profit: 7000 },
    { month: '4月', purchase: 61000, sales: 58000, profit: -3000 },
    { month: '5月', purchase: 55000, sales: 62000, profit: 7000 },
    { month: '6月', purchase: 59000, sales: 68000, profit: 9000 }
  ];

  // 预警报表数据
  const alertData = [
    { code: 'M001', name: '标准螺丝M6x20', currentStock: 150, minStock: 200, alertLevel: 'medium' },
    { code: 'M004', name: '集成电路芯片', currentStock: 45, minStock: 100, alertLevel: 'high' },
    { code: 'M007', name: '保险丝5A', currentStock: 20, minStock: 50, alertLevel: 'high' },
    { code: 'M010', name: '继电器12V', currentStock: 80, minStock: 120, alertLevel: 'medium' }
  ];

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
    </div>
  );
}