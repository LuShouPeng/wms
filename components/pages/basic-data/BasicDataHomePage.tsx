import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Warehouse, Package, Users } from 'lucide-react';

export function BasicDataHomePage() {
  // 示例统计数据
  const stats = [
    {
      title: '今日新增仓库',
      value: '5',
      icon: Warehouse,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: '物料总数',
      value: '890',
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: '供应商数量',
      value: '15',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">基础资料</h2>
        <p className="text-muted-foreground">管理仓库、物料、供应商等基础信息</p>
      </div>

      {/* 统计展示 */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${stat.color}`}>{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
