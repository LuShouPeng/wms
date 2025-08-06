import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  PackageCheck,
  PackageX,
  Truck,
  ClipboardList,
  AlertTriangle
} from 'lucide-react';

export function WarehouseHomePage() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(`/warehouse/${path}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">仓库管理</h2>
          <p className="text-muted-foreground">
            管理入库、出库、移库、盘点、报损等仓储操作
          </p>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日入库</CardTitle>
            <PackageCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +3 从昨日
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日出库</CardTitle>
            <PackageX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              -2 从昨日
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">移库操作</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              +1 从昨日
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">报损记录</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              本月新增
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">异常提醒</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              需要处理
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 主要功能区域 */}
      <Card>
        <CardHeader>
          <CardTitle>仓库操作管理</CardTitle>
          <CardDescription>
            管理所有仓库相关操作，包括入库、出库、移库、盘点和报损
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <Button 
              variant="outline" 
              className="h-32 flex flex-col gap-2"
              onClick={() => handleNavigate('inbound')}
            >
              <PackageCheck className="h-8 w-8" />
              <span>入库管理</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-32 flex flex-col gap-2"
              onClick={() => handleNavigate('outbound')}
            >
              <PackageX className="h-8 w-8" />
              <span>出库管理</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-32 flex flex-col gap-2"
              onClick={() => handleNavigate('transfer')}
            >
              <Truck className="h-8 w-8" />
              <span>移库管理</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-32 flex flex-col gap-2"
              onClick={() => handleNavigate('inventory')}
            >
              <ClipboardList className="h-8 w-8" />
              <span>盘点管理</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-32 flex flex-col gap-2"
              onClick={() => handleNavigate('damage')}
            >
              <AlertTriangle className="h-8 w-8" />
              <span>报损管理</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}