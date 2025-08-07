export const realTimeData = [
  {
    label: '总库存',
    value: '1,256',
    change: '+12% 同比增长',
    style: {
      bg: 'from-purple-50 to-purple-100',
      text: 'text-purple-600',
      value: 'text-purple-900',
      change: 'text-purple-500',
    },
  },
  {
    label: '可用库存',
    value: '892',
    change: '+8% 同比增长',
    style: {
      bg: 'from-green-50 to-green-100',
      text: 'text-green-600',
      value: 'text-green-900',
      change: 'text-green-500',
    },
  },
  {
    label: '预警库存',
    value: '23',
    change: '-5% 同比下降',
    style: {
      bg: 'from-yellow-50 to-yellow-100',
      text: 'text-yellow-600',
      value: 'text-yellow-900',
      change: 'text-yellow-500',
    },
  },
  {
    label: '周转率',
    value: '85%',
    change: '健康水平',
    style: {
      bg: 'from-blue-50 to-blue-100',
      text: 'text-blue-600',
      value: 'text-blue-900',
      change: 'text-blue-500',
    },
  },
];

export const userStats = {
  todayLogin: 15,
  newUsersThisMonth: 3,
};

export const timeRangeOptions = [
  { value: '7d', label: '7天' },
  { value: '30d', label: '30天' },
  { value: '90d', label: '90天' },
];
