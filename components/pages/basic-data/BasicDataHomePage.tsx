import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { basicDataHomeStats } from '../../../mockdata';

export function BasicDataHomePage() {

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">基础资料</h2>
        <p className="text-muted-foreground">管理仓库、物料、供应商等基础信息</p>
      </div>

      {/* 统计展示 */}
      <div className="grid gap-4 md:grid-cols-3">
        {basicDataHomeStats.map(stat => (
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
