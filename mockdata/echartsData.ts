// ECharts 图表模拟数据

// 库存趋势图表配置
export const inventoryTrendOption = {
  title: {
    text: '库存趋势分析',
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'normal' as const
    }
  },
  tooltip: {
    trigger: 'axis' as const,
    axisPointer: {
      type: 'cross' as const
    }
  },
  legend: {
    data: ['总库存', '可用库存', '预警库存'],
    top: 30
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category' as const,
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value' as const
  },
  series: [
    {
      name: '总库存',
      type: 'line' as const,
      stack: '总量',
      data: [1200, 1320, 1010, 1340, 1900, 2300, 2100],
      smooth: true,
      lineStyle: {
        width: 3
      },
      itemStyle: {
        color: '#8B5CF6'
      }
    },
    {
      name: '可用库存',
      type: 'line' as const,
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310],
      smooth: true,
      lineStyle: {
        width: 3
      },
      itemStyle: {
        color: '#10B981'
      }
    },
    {
      name: '预警库存',
      type: 'line' as const,
      stack: '总量',
      data: [150, 232, 201, 154, 190, 330, 410],
      smooth: true,
      lineStyle: {
        width: 3
      },
      itemStyle: {
        color: '#F59E0B'
      }
    }
  ]
};

// 仓库分布图表配置
export const warehouseDistributionOption = {
  title: {
    text: '仓库分布情况',
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'normal' as const
    }
  },
  tooltip: {
    trigger: 'item' as const,
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'horizontal' as const,
    bottom: 10,
    data: ['北京仓', '上海仓', '广州仓', '深圳仓', '成都仓']
  },
  series: [
    {
      name: '仓库库存',
      type: 'pie' as const,
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center' as const
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18,
          fontWeight: 'bold' as const
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '北京仓', itemStyle: { color: '#8B5CF6' } },
        { value: 735, name: '上海仓', itemStyle: { color: '#10B981' } },
        { value: 580, name: '广州仓', itemStyle: { color: '#F59E0B' } },
        { value: 484, name: '深圳仓', itemStyle: { color: '#3B82F6' } },
        { value: 300, name: '成都仓', itemStyle: { color: '#EF4444' } }
      ]
    }
  ]
};

// 产品类别图表配置
export const productCategoryOption = {
  title: {
    text: '产品类别分布',
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'normal' as const
    }
  },
  tooltip: {
    trigger: 'axis' as const,
    axisPointer: {
      type: 'shadow' as const
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value' as const,
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category' as const,
    data: ['电子元件', '机械零件', '化工材料', '办公用品', '包装材料']
  },
  series: [
    {
      name: '库存数量',
      type: 'bar' as const,
      data: [1820, 1934, 1290, 1330, 1700],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#8B5CF6' },
            { offset: 1, color: '#3B82F6' }
          ]
        } as any
      }
    }
  ]
};

// 出入库图表配置
export const inboundOutboundOption = {
  title: {
    text: '出入库统计',
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'normal' as const
    }
  },
  tooltip: {
    trigger: 'axis' as const,
    axisPointer: {
      type: 'shadow' as const
    }
  },
  legend: {
    data: ['入库', '出库'],
    top: 30
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category' as const,
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
    type: 'value' as const
  },
  series: [
    {
      name: '入库',
      type: 'bar' as const,
      stack: '总量',
      barWidth: '60%',
      data: [320, 332, 301, 334, 390, 330],
      itemStyle: {
        color: '#10B981'
      }
    },
    {
      name: '出库',
      type: 'bar' as const,
      stack: '总量',
      barWidth: '60%',
      data: [-120, -132, -101, -134, -190, -130],
      itemStyle: {
        color: '#F59E0B'
      }
    }
  ]
};