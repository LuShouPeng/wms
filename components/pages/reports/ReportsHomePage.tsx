import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import {
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Download,
  FileText
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

export function ReportsHomePage() {

  // 统计数据
  const stats = [
    {
      title: '库存总价值',
      value: '¥2,456,789',
      description: '+12.5% 较上月',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: '本月采购',
      value: '¥320,000',
      description: '+8.2% 较上月',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: '库存周转率',
      value: '2.4',
      description: '较上月持平',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: '预警物料',
      value: '12',
      description: '需要补货',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  // 最近生成的报表
  const recentReports = [
    { name: '6月库存汇总报表', type: '库存报表', time: '2小时前', status: '已完成' },
    { name: '财务月报-202406', type: '财务报表', time: '1天前', status: '已完成' },
    { name: '库存趋势分析报告', type: '趋势分析', time: '2天前', status: '已完成' },
    { name: '库存预警日报', type: '预警报表', time: '3小时前', status: '已完成' }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">报表管理</h2>
          <p className="text-muted-foreground">
            查看库存、财务、业务等各类统计报表和数据分析
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
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

      {/* 最近报表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            最近报表
          </CardTitle>
          <CardDescription>
            查看最近生成的报表和统计数据
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{report.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{report.type}</span>
                      <span>•</span>
                      <span>{report.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-600">{report.status}</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
