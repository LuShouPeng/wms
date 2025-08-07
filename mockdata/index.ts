// 统一导出所有模拟数据
export * from './systemData';
export * from './productData';
export * from './loginData';
export * from './basicDataPageData';
export * from './dashboard';
export * from './dashboardData';
export * from './echartsData';
export * from './reportsData';
export * from './alertsData';
export * from './headerData';
export * from './replenishmentData';
export * from './sidebarData';
export * from './warehouseManagementData';
export * from './businessData';
export * from './workflowData';
export * from './users';
export * from './materials';
export * from './reports';

// 显式处理有冲突的导出
// 从 basicData.ts 导出
export { mockWarehouses, mockMaterials, mockSuppliers } from './basicData';

// 从 warehouse.ts 导出（避免与 warehouseEditData 和 warehouses 的冲突）
export {
  mockProducts,
  warehouseSuppliers,
  warehouses as warehouseOptions,  // 重命名以避免冲突
  departments as warehouseDepartments,  // 重命名以避免冲突
  inboundOrders,
  outboundOrders,
  transferOrders,
  inventoryOrders,
  warehouseStats,
  warehouseStatusOptions as warehouseStatusOpts,  // 重命名以避免冲突
  warehouseFormPlaceholders as warehouseFormPlaceholdersData,  // 重命名以避免冲突
  materialStatusOptions,
  materialUnits,
  materialCategories,
  editPageDepartments as warehouseEditDepartments,  // 重命名以避免冲突
  warehouseTypes as warehouseTypeOptions,  // 重命名以避免冲突
  editPageSuppliers as warehouseEditSuppliers,  // 重命名以避免冲突
  mockWarehouseFormData
} from './warehouse';

// 从 business.ts 导出（避免 suppliers 命名冲突）
export {
  stats as businessStats,
  businessModules,
  recentActivities,
  suppliers as businessSuppliers,  // 重命名 suppliers 以避免冲突
  customers,
  businessStats as businessPageStats
} from './business';

// 从 damageData.ts 导出（避免与 damages 的冲突）
export {
  mockDamageRecords as damageRecords,
  damageTypes as damageCategoryTypes,
  damageStatusOptions
} from './damageData';

// 从 warehouseEditData.ts 导出特定内容
export {
  editPageDepartments,
  editPageSuppliers,
  mockWarehouseFormData as warehouseFormData,
  warehouseTypes
} from './warehouseEditData';
