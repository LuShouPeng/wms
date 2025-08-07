// 物料相关数据 - 重定向到仓库数据文件，保持向后兼容
export {
  materialCategories,
  materialUnits,
  materialStatusOptions as materialStatuses
} from './warehouse';

// 保持原有的供应商数据格式
export const materialSuppliers = [
  { value: 'sup1', label: '供应商A' },
  { value: 'sup2', label: '供应商B' },
  { value: 'sup3', label: '供应商C' },
  { value: 'sup4', label: '供应商D' },
  { value: 'sup5', label: '供应商E' }
];