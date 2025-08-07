import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
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
  ResponsiveContainer
} from 'recharts';
import {
  DollarSign,
  Download,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  PieChart as PieChartIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { financialData, categoryData, quarterlyData } from '../../../mockdata/reportsData';

export function FinancialReportsPage() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // 计算财务统计
  const currentMonth = financialData[financialData.length - 1];
  const previousMonth = financialData[financialData.length - 2];
  
  const totalPurchase = financialData.reduce((sum, item) => sum + item.purchase, 0);
  const totalSales = financialData.reduce((sum, item) => sum + item.sales, 0);
  const totalProfit = financialData.reduce((sum, item) => sum + item.profit, 0);
  
  const purchaseChange = previousMonth ? ((currentMonth.purchase - previousMonth.purchase) / previousMonth.purchase * 100) : 0;
  const salesChange = previousMonth ? ((currentMonth.sales - previousMonth.sales) / previousMonth.sales * 100) : 0;
  const profitChange = previousMonth && previousMonth.profit !== 0 ? ((currentMonth.profit - previousMonth.profit) / Math.abs(previousMonth.profit) * 100) : 0;

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };


  return (
    <div className="space-y-6">
      {/* 页面标题和导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/reports')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">财务报表</h2>
            <p className="text-muted-foreground">
              采购、销售、成本和利润分析报表
            </p>
          </div>
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
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            导出报表
          </Button>
        </div>
      </div>

      {/* 财务概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总采购金额</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{totalPurchase.toLocaleString()}</div>
            <div className={`flex items-center gap-1 text-xs ${getTrendColor(purchaseChange)}`}>
              {getTrendIcon(purchaseChange)}
              {Math.abs(purchaseChange).toFixed(1)}% 较上月
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总销售金额</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{totalSales.toLocaleString()}</div>
            <div className={`flex items-center gap-1 text-xs ${getTrendColor(salesChange)}`}>
              {getTrendIcon(salesChange)}
              {Math.abs(salesChange).toFixed(1)}% 较上月
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总利润</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ¥{totalProfit.toLocaleString()}
            </div>
            <div className={`flex items-center gap-1 text-xs ${getTrendColor(profitChange)}`}>
              {getTrendIcon(profitChange)}
              {Math.abs(profitChange).toFixed(1)}% 较上月
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">利润率</CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : '0.0'}%
            </div>
            <p className="text-xs text-muted-foreground">
              {totalProfit >= 0 ? '盈利' : '亏损'}状态
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 图表区域 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 月度财务趋势 */}
        <Card>
          <CardHeader>
            <CardTitle>月度财务趋势</CardTitle>
            <CardDescription>
              采购、销售和利润的月度变化趋势
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`¥${value.toLocaleString()}`, '']} />
                <Legend />
                <Bar dataKey="purchase" fill="#ef4444" name="采购金额" />
                <Bar dataKey="sales" fill="#10b981" name="销售金额" />
                <Bar dataKey="profit" fill="#3b82f6" name="利润" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 物料分类分布 */}
        <Card>
          <CardHeader>
            <CardTitle>物料分类分布</CardTitle>
            <CardDescription>
              按物料分类的价值分布情况
            </CardDescription>
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

      {/* 季度对比分析 */}
      <Card>
        <CardHeader>
          <CardTitle>季度对比分析</CardTitle>
          <CardDescription>
            各季度的财务表现对比
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`¥${value.toLocaleString()}`, '']} />
              <Legend />
              <Bar dataKey="purchase" fill="#ef4444" name="采购金额" />
              <Bar dataKey="sales" fill="#10b981" name="销售金额" />
              <Bar dataKey="profit" fill="#3b82f6" name="利润" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 财务指标明细 */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>成本分析</CardTitle>
            <CardDescription>主要成本构成分析</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">物料成本</span>
              <span className="font-medium">¥{(totalPurchase * 0.7).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">运营成本</span>
              <span className="font-medium">¥{(totalPurchase * 0.2).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">管理费用</span>
              <span className="font-medium">¥{(totalPurchase * 0.1).toLocaleString()}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center font-semibold">
                <span>总成本</span>
                <span>¥{totalPurchase.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>收入分析</CardTitle>
            <CardDescription>主要收入来源分析</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">产品销售</span>
              <span className="font-medium">¥{(totalSales * 0.8).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">服务收入</span>
              <span className="font-medium">¥{(totalSales * 0.15).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">其他收入</span>
              <span className="font-medium">¥{(totalSales * 0.05).toLocaleString()}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center font-semibold">
                <span>总收入</span>
                <span>¥{totalSales.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>关键指标</CardTitle>
            <CardDescription>重要财务指标汇总</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">毛利率</span>
              <span className="font-medium">
                {totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : '0.0'}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">成本控制率</span>
              <span className="font-medium">
                {totalSales > 0 ? ((totalPurchase / totalSales) * 100).toFixed(1) : '0.0'}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">月均增长率</span>
              <span className="font-medium">
                {salesChange > 0 ? '+' : ''}{salesChange.toFixed(1)}%
              </span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center font-semibold">
                <span>财务健康度</span>
                <span className={totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {totalProfit >= 0 ? '良好' : '需改善'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
