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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  Download,
  ArrowLeft,
  BarChart3,
  Activity,
  Target,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { stockTrendData, forecastData, turnoverData, trendInsights } from '../../../mockdata/reportsData';

export function TrendAnalysisPage() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('stock');

  
  // 计算趋势统计
  const currentMonth = stockTrendData[stockTrendData.length - 1];
  const previousMonth = stockTrendData[stockTrendData.length - 2];
  
  const inboundChange = previousMonth ? ((currentMonth.inbound - previousMonth.inbound) / previousMonth.inbound * 100) : 0;
  const outboundChange = previousMonth ? ((currentMonth.outbound - previousMonth.outbound) / previousMonth.outbound * 100) : 0;
  const stockChange = previousMonth ? ((currentMonth.stock - previousMonth.stock) / previousMonth.stock * 100) : 0;
  
  const avgTurnover = turnoverData.reduce((sum, item) => sum + item.turnoverRate, 0) / turnoverData.length;
  const avgEfficiency = turnoverData.reduce((sum, item) => sum + item.efficiency, 0) / turnoverData.length;

  return (
    <div className="space-y-6">
      {/* 页面标题和导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/reports')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">趋势分析</h2>
            <p className="text-muted-foreground">
              库存变化趋势、入出库分析和预测报告
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
            导出分析
          </Button>
        </div>
      </div>

      {/* 趋势概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">当前库存</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonth.stock.toLocaleString()}</div>
            <div className={`text-xs ${stockChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stockChange >= 0 ? '+' : ''}{stockChange.toFixed(1)}% 较上月
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月入库</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonth.inbound.toLocaleString()}</div>
            <div className={`text-xs ${inboundChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {inboundChange >= 0 ? '+' : ''}{inboundChange.toFixed(1)}% 较上月
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月出库</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonth.outbound.toLocaleString()}</div>
            <div className={`text-xs ${outboundChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {outboundChange >= 0 ? '+' : ''}{outboundChange.toFixed(1)}% 较上月
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均周转率</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgTurnover.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              效率 {avgEfficiency.toFixed(0)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 主要趋势图表 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>库存趋势分析</CardTitle>
              <CardDescription>
                入库、出库和库存变化的历史趋势及预测
              </CardDescription>
            </div>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stock">库存数量</SelectItem>
                <SelectItem value="inbound">入库数量</SelectItem>
                <SelectItem value="outbound">出库数量</SelectItem>
                <SelectItem value="all">全部指标</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => [value.toLocaleString(), '']} />
              <Legend />
              {(selectedMetric === 'inbound' || selectedMetric === 'all') && (
                <Line
                  type="monotone"
                  dataKey="inbound"
                  stroke="#8884d8"
                  name="入库数量"
                  strokeWidth={2}
                  strokeDasharray={forecastData.indexOf(forecastData.find(d => d.month === '7月')!) !== -1 ? "5 5" : "0"}
                />
              )}
              {(selectedMetric === 'outbound' || selectedMetric === 'all') && (
                <Line
                  type="monotone"
                  dataKey="outbound"
                  stroke="#82ca9d"
                  name="出库数量"
                  strokeWidth={2}
                />
              )}
              {(selectedMetric === 'stock' || selectedMetric === 'all') && (
                <Line
                  type="monotone"
                  dataKey="stock"
                  stroke="#ffc658"
                  name="库存数量"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-xs text-muted-foreground">
            <span className="inline-block w-2 h-2 bg-gray-300 mr-1"></span>
            7-9月数据为基于历史趋势的预测值
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 库存周转率趋势 */}
        <Card>
          <CardHeader>
            <CardTitle>库存周转率趋势</CardTitle>
            <CardDescription>
              库存周转效率的月度变化
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={turnoverData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="turnoverRate"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                  name="周转率"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 运营效率分析 */}
        <Card>
          <CardHeader>
            <CardTitle>运营效率分析</CardTitle>
            <CardDescription>
              仓储运营效率指标趋势
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={turnoverData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[75, 95]} />
                <Tooltip formatter={(value: any) => [`${value}%`, '效率']} />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="运营效率"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 分析洞察 */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              正面趋势
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendInsights.positive.map((insight, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium">{insight.title}</div>
                <div className="text-muted-foreground">{insight.description}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              需要关注
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendInsights.concerns.map((insight, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium">{insight.title}</div>
                <div className="text-muted-foreground">{insight.description}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              建议措施
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendInsights.recommendations.map((insight, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium">{insight.title}</div>
                <div className="text-muted-foreground">{insight.description}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 预测摘要 */}
      <Card>
        <CardHeader>
          <CardTitle>未来3个月预测</CardTitle>
          <CardDescription>
            基于历史趋势的预测分析（仅供参考）
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">7月</div>
              <div className="space-y-1 text-sm">
                <div>预计入库: 4,200</div>
                <div>预计出库: 3,800</div>
                <div>预计库存: 14,000</div>
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">8月</div>
              <div className="space-y-1 text-sm">
                <div>预计入库: 3,900</div>
                <div>预计出库: 4,200</div>
                <div>预计库存: 13,700</div>
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">9月</div>
              <div className="space-y-1 text-sm">
                <div>预计入库: 4,500</div>
                <div>预计出库: 3,600</div>
                <div>预计库存: 14,600</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
