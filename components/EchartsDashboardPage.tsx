import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RefreshCw, ArrowLeft, Maximize, Home } from 'lucide-react';
import {
  inventoryTrendOption,
  warehouseDistributionOption,
  productCategoryOption,
  inboundOutboundOption
} from '../../mockdata';

interface EchartsDashboardPageProps {
  user?: any;
  onNavigateBack?: () => void;
}

const EchartsDashboardPage: React.FC<EchartsDashboardPageProps> = ({ 
  user, 
  onNavigateBack 
}) => {
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
      {/* Full-screen header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-4">
          {onNavigateBack && (
            <Button variant="outline" size="sm" onClick={onNavigateBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回仪表盘
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">数据可视化大屏</h1>
            <p className="text-gray-600 mt-1">多维度库存数据分析与实时监控</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={timeRange === '7d' ? 'default' : 'ghost'}
              size="sm"
              className="h-8"
              onClick={() => handleTimeRangeChange('7d')}
            >
              7天
            </Button>
            <Button
              variant={timeRange === '30d' ? 'default' : 'ghost'}
              size="sm"
              className="h-8"
              onClick={() => handleTimeRangeChange('30d')}
            >
              30天
            </Button>
            <Button
              variant={timeRange === '90d' ? 'default' : 'ghost'}
              size="sm"
              className="h-8"
              onClick={() => handleTimeRangeChange('90d')}
            >
              90天
            </Button>
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

      {/* Real-time Data Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-sm opacity-90 mb-2">总库存</div>
          <div className="text-3xl font-bold mb-1">1,256</div>
          <div className="text-xs opacity-75">+12% 同比增长</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-sm opacity-90 mb-2">可用库存</div>
          <div className="text-3xl font-bold mb-1">892</div>
          <div className="text-xs opacity-75">+8% 同比增长</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-sm opacity-90 mb-2">预警库存</div>
          <div className="text-3xl font-bold mb-1">23</div>
          <div className="text-xs opacity-75">-5% 同比下降</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-sm opacity-90 mb-2">周转率</div>
          <div className="text-3xl font-bold mb-1">85%</div>
          <div className="text-xs opacity-75">健康水平</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Inventory Trend Chart */}
        <Card className="col-span-1 xl:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">库存趋势分析</CardTitle>
            <CardDescription>总库存、可用库存和预警库存的变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts 
              option={inventoryTrendOption} 
              style={{ height: '400px', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </CardContent>
        </Card>

        {/* Warehouse Distribution Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">仓库分布情况</CardTitle>
            <CardDescription>各仓库库存占比分析</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts 
              option={warehouseDistributionOption} 
              style={{ height: '400px', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </CardContent>
        </Card>

        {/* Product Category Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">产品类别分布</CardTitle>
            <CardDescription>不同类别产品的库存数量</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts 
              option={productCategoryOption} 
              style={{ height: '400px', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </CardContent>
        </Card>

        {/* Inbound/Outbound Chart */}
        <Card className="col-span-1 xl:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">出入库统计</CardTitle>
            <CardDescription>月度入库和出库数量对比</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts 
              option={inboundOutboundOption} 
              style={{ height: '400px', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EchartsDashboardPage;