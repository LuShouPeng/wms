import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';
import {
  inventoryTrendOption,
  warehouseDistributionOption,
  productCategoryOption,
  inboundOutboundOption
} from '../mockdata';
import { realTimeData, timeRangeOptions } from '../mockdata/dashboard';

const EchartsDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');

  // Refresh all charts with new data
  const refreshCharts = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real application, you would fetch new data here
      setIsLoading(false);
    }, 1000);
  };

  // Handle time range change
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    // In a real application, you would fetch data for the selected time range
    refreshCharts();
  };

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">数据可视化大屏</h2>
          <p className="text-muted-foreground">多维度库存数据分析与实时监控</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex bg-muted rounded-lg p-1">
            {timeRangeOptions.map(option => (
              <Button
                key={option.value}
                variant={timeRange === option.value ? 'default' : 'ghost'}
                size="sm"
                className="h-8"
                onClick={() => handleTimeRangeChange(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshCharts}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? '刷新中...' : '刷新数据'}
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Trend Chart */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>库存趋势分析</CardTitle>
            <CardDescription>总库存、可用库存和预警库存的变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts 
              option={inventoryTrendOption} 
              style={{ height: '320px', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </CardContent>
        </Card>

        {/* Warehouse Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>仓库分布情况</CardTitle>
            <CardDescription>各仓库库存占比分析</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts 
              option={warehouseDistributionOption} 
              style={{ height: '320px', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </CardContent>
        </Card>

        {/* Product Category Chart */}
        <Card>
          <CardHeader>
            <CardTitle>产品类别分布</CardTitle>
            <CardDescription>不同类别产品的库存数量</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts 
              option={productCategoryOption} 
              style={{ height: '320px', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </CardContent>
        </Card>

        {/* Inbound/Outbound Chart */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>出入库统计</CardTitle>
            <CardDescription>月度入库和出库数量对比</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts 
              option={inboundOutboundOption} 
              style={{ height: '320px', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Real-time Data Panel */}
      <Card>
        <CardHeader>
          <CardTitle>实时数据监控</CardTitle>
          <CardDescription>关键指标实时更新</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {realTimeData.map((item, index) => (
              <div key={index} className={`p-4 bg-gradient-to-br ${item.style.bg} rounded-lg`}>
                <div className={`text-sm ${item.style.text} font-medium`}>{item.label}</div>
                <div className={`text-2xl font-bold ${item.style.value}`}>{item.value}</div>
                <div className={`text-xs ${item.style.change}`}>{item.change}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EchartsDashboard;