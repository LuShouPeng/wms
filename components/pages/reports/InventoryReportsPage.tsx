import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Input } from '../../ui/input';
import {
  Package,
  Download,
  Filter,
  Search,
  ArrowLeft,
  FileText,
  TrendingUp,
  AlertTriangle,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { inventoryData } from '../../../mockdata/reportsData';

export function InventoryReportsPage() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getStockStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any }> = {
      low: { label: '库存不足', variant: 'destructive' },
      normal: { label: '正常', variant: 'secondary' },
      high: { label: '库存充足', variant: 'default' }
    };
    return statusMap[status] || { label: status, variant: 'outline' };
  };

  // 筛选数据
  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 统计数据
  const totalItems = inventoryData.length;
  const lowStockItems = inventoryData.filter(item => item.status === 'low').length;
  const totalValue = inventoryData.reduce((sum, item) => {
    const value = parseInt(item.value.replace(/[¥,]/g, ''));
    return sum + value;
  }, 0);

  // 分类统计
  const categoryStats = inventoryData.reduce((acc: Record<string, number>, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* 页面标题和导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/reports')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">库存报表</h2>
            <p className="text-muted-foreground">
              详细的库存清单、物料统计和库存分析
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

      {/* 统计概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">库存物料总数</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              {Object.keys(categoryStats).length} 个分类
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">库存总价值</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% 较上月</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">低库存物料</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">需要补货</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">库存周转率</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4</div>
            <p className="text-xs text-muted-foreground">较上月持平</p>
          </CardContent>
        </Card>
      </div>

      {/* 分类统计 */}
      <Card>
        <CardHeader>
          <CardTitle>分类统计</CardTitle>
          <CardDescription>
            各物料分类的库存数量分布
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{category}</p>
                  <p className="text-sm text-muted-foreground">{count} 个物料</p>
                </div>
                <div className="text-lg font-bold text-blue-600">{count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 库存清单 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            库存清单
          </CardTitle>
          <CardDescription>
            详细的库存物料列表和状态信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 搜索和筛选 */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索物料名称或编码..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有分类</SelectItem>
                {Object.keys(categoryStats).map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              高级筛选
            </Button>
          </div>

          {/* 表格 */}
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
                {filteredData.map((item) => {
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

          {/* 结果统计 */}
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>共 {filteredData.length} 条记录</span>
            <div className="flex gap-4">
              <span>低库存: {filteredData.filter(item => item.status === 'low').length}</span>
              <span>正常: {filteredData.filter(item => item.status === 'normal').length}</span>
              <span>充足: {filteredData.filter(item => item.status === 'high').length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
