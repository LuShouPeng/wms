import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import {
  AlertTriangle,
  Download,
  ArrowLeft,
  Search,
  Filter,
  Clock,
  Package,
  TrendingDown,
  AlertCircle,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AlertsReportsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // 预警数据
  const alertsData = [
    {
      id: 1,
      type: 'low_stock',
      typeName: '库存不足',
      material: 'LED灯珠',
      code: 'LED-001',
      currentStock: 50,
      minStock: 100,
      maxStock: 500,
      severity: 'high',
      severityName: '高',
      location: 'A-01-01',
      lastUpdate: '2024-01-15 09:30',
      status: 'active',
      description: '当前库存低于安全库存，建议立即补货'
    },
    {
      id: 2,
      type: 'overstock',
      typeName: '库存过量',
      material: '电阻器',
      code: 'RES-002',
      currentStock: 2800,
      minStock: 200,
      maxStock: 1000,
      severity: 'medium',
      severityName: '中',
      location: 'B-02-03',
      lastUpdate: '2024-01-15 08:45',
      status: 'active',
      description: '库存超过最大库存量，占用仓储空间'
    },
    {
      id: 3,
      type: 'expired',
      typeName: '即将过期',
      material: '化学试剂A',
      code: 'CHE-003',
      currentStock: 150,
      minStock: 50,
      maxStock: 300,
      severity: 'high',
      severityName: '高',
      location: 'C-01-05',
      lastUpdate: '2024-01-15 07:20',
      status: 'active',
      description: '物料将在7天内过期，需要优先使用或处理'
    },
    {
      id: 4,
      type: 'slow_moving',
      typeName: '呆滞物料',
      material: '旧版芯片',
      code: 'CHIP-004',
      currentStock: 500,
      minStock: 100,
      maxStock: 800,
      severity: 'medium',
      severityName: '中',
      location: 'D-03-02',
      lastUpdate: '2024-01-14 16:30',
      status: 'active',
      description: '90天内无出库记录，建议检查物料状态'
    },
    {
      id: 5,
      type: 'quality',
      typeName: '质量异常',
      material: '精密零件',
      code: 'PRE-005',
      currentStock: 80,
      minStock: 50,
      maxStock: 200,
      severity: 'high',
      severityName: '高',
      location: 'E-01-08',
      lastUpdate: '2024-01-14 14:15',
      status: 'active',
      description: '检测到质量异常，需要隔离检查'
    },
    {
      id: 6,
      type: 'location',
      typeName: '位置异常',
      material: '标准螺丝',
      code: 'SCR-006',
      currentStock: 1200,
      minStock: 500,
      maxStock: 2000,
      severity: 'low',
      severityName: '低',
      location: '位置未知',
      lastUpdate: '2024-01-14 11:20',
      status: 'active',
      description: '物料位置信息不匹配，需要重新定位'
    }
  ];

  // 统计数据
  const alertStats = {
    total: alertsData.length,
    high: alertsData.filter(item => item.severity === 'high').length,
    medium: alertsData.filter(item => item.severity === 'medium').length,
    low: alertsData.filter(item => item.severity === 'low').length,
    resolved: 12 // 本月已解决
  };

  // 预警类型统计
  const alertTypeStats = [
    { type: '库存不足', count: 15, percentage: 35 },
    { type: '库存过量', count: 8, percentage: 19 },
    { type: '即将过期', count: 6, percentage: 14 },
    { type: '呆滞物料', count: 7, percentage: 16 },
    { type: '质量异常', count: 4, percentage: 9 },
    { type: '位置异常', count: 3, percentage: 7 }
  ];

  // 筛选数据
  const filteredAlerts = alertsData.filter(alert => {
    const matchesSearch = alert.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesType = selectedType === 'all' || alert.type === selectedType;
    
    return matchesSearch && matchesSeverity && matchesType;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'low_stock': return <TrendingDown className="h-4 w-4" />;
      case 'overstock': return <Package className="h-4 w-4" />;
      case 'expired': return <Clock className="h-4 w-4" />;
      case 'slow_moving': return <AlertCircle className="h-4 w-4" />;
      case 'quality': return <AlertTriangle className="h-4 w-4" />;
      case 'location': return <Search className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
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
            <h2 className="text-2xl font-bold tracking-tight">预警报表</h2>
            <p className="text-muted-foreground">
              库存预警监控、异常分析和处理建议
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            导出报表
          </Button>
        </div>
      </div>

      {/* 预警统计 */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总预警</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alertStats.total}</div>
            <p className="text-xs text-muted-foreground">
              活跃预警数量
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">高级预警</CardTitle>
            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{alertStats.high}</div>
            <p className="text-xs text-muted-foreground">
              需要立即处理
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">中级预警</CardTitle>
            <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{alertStats.medium}</div>
            <p className="text-xs text-muted-foreground">
              需要关注
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">低级预警</CardTitle>
            <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{alertStats.low}</div>
            <p className="text-xs text-muted-foreground">
              可延后处理
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已解决</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{alertStats.resolved}</div>
            <p className="text-xs text-muted-foreground">
              本月处理数量
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 预警类型分布 */}
      <Card>
        <CardHeader>
          <CardTitle>预警类型分布</CardTitle>
          <CardDescription>各类型预警的数量和占比统计</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertTypeStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium w-20">{stat.type}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{stat.percentage}%</span>
                  <Badge variant="outline">{stat.count}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 筛选和搜索 */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索物料名称或编码..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="预警级别" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部级别</SelectItem>
            <SelectItem value="high">高级预警</SelectItem>
            <SelectItem value="medium">中级预警</SelectItem>
            <SelectItem value="low">低级预警</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="预警类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            <SelectItem value="low_stock">库存不足</SelectItem>
            <SelectItem value="overstock">库存过量</SelectItem>
            <SelectItem value="expired">即将过期</SelectItem>
            <SelectItem value="slow_moving">呆滞物料</SelectItem>
            <SelectItem value="quality">质量异常</SelectItem>
            <SelectItem value="location">位置异常</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 预警列表 */}
      <Card>
        <CardHeader>
          <CardTitle>活跃预警列表</CardTitle>
          <CardDescription>
            当前需要处理的预警信息 ({filteredAlerts.length} 条)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(alert.type)}
                    <div>
                      <div className="font-medium">{alert.material}</div>
                      <div className="text-sm text-muted-foreground">编码: {alert.code}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getSeverityColor(alert.severity) as any}>
                      {alert.severityName}级预警
                    </Badge>
                    <Badge variant="outline">{alert.typeName}</Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">当前库存:</span>
                    <span className="ml-2 font-medium">{alert.currentStock.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">安全库存:</span>
                    <span className="ml-2">{alert.minStock} - {alert.maxStock}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">存放位置:</span>
                    <span className="ml-2">{alert.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {alert.description}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {alert.lastUpdate}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    查看详情
                  </Button>
                  <Button size="sm" variant="outline">
                    处理预警
                  </Button>
                  <Button size="sm" variant="outline">
                    暂时忽略
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <div>没有找到匹配的预警信息</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 处理建议 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>处理优先级建议</CardTitle>
            <CardDescription>基于预警级别和类型的处理建议</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 border-l-4 border-red-500 bg-red-50">
              <div className="font-medium text-red-800">立即处理（高级预警）</div>
              <div className="text-sm text-red-700">
                库存不足、即将过期、质量异常类预警需要立即处理
              </div>
            </div>
            <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
              <div className="font-medium text-orange-800">24小时内处理（中级预警）</div>
              <div className="text-sm text-orange-700">
                库存过量、呆滞物料类预警建议在24小时内处理
              </div>
            </div>
            <div className="p-3 border-l-4 border-gray-500 bg-gray-50">
              <div className="font-medium text-gray-800">3天内处理（低级预警）</div>
              <div className="text-sm text-gray-700">
                位置异常等低级预警可以在3天内处理
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>预警处理统计</CardTitle>
            <CardDescription>最近30天的预警处理情况</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">平均处理时间</span>
              <span className="font-medium">2.3 小时</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">处理成功率</span>
              <span className="font-medium text-green-600">94.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">待处理预警</span>
              <span className="font-medium text-orange-600">{alertStats.total} 条</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">本月新增预警</span>
              <span className="font-medium">28 条</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">本月已解决</span>
              <span className="font-medium text-green-600">{alertStats.resolved} 条</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
