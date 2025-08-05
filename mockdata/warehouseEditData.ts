// mockdata/warehouseEditData.ts

// 部门数据
export const editPageDepartments = [
  { value: 'finance', label: '财务部' },
  { value: 'it', label: '信息技术部' },
  { value: 'production', label: '生产部' },
  { value: 'logistics', label: '物流部' },
  { value: 'hr', label: '人力资源中心' },
];

// 仓库类型
export const warehouseTypes = [
  { value: 'product', label: '成品仓' },
  { value: 'raw_material', label: '原材料仓' },
  { value: 'finished_goods', label: '半成品仓' },
  { value: 'spare_parts', label: '备品备件仓' },
  { value: 'temporary', label: '暂存仓' },
];

// 供应商数据
export const editPageSuppliers = [
  {
    value: 'supplier_a',
    label: 'A供应商公司',
    contact: '张三',
    phone: '13800138000',
  },
  {
    value: 'supplier_b',
    label: 'B科技有限公司',
    contact: '李四',
    phone: '13900139000',
  },
  {
    value: 'supplier_c',
    label: 'C集团',
    contact: '王五',
    phone: '13700137000',
  },
];

// 仓库编辑页表单模拟数据
export const mockWarehouseFormData = {
  warehouseName: '主仓库A',
  department: 'logistics',
  warehouseType: 'product',
  leaseTime: '2024-01-01',
  description: '用于存放成品和半成品的主要仓库',
  area: '1000',
  address: '北京市朝阳区xxx路123号',
  contactPerson: '张经理',
  phone: '13800138000',
  supplierId: 'supplier_a',
  supplierName: 'A供应商公司'
};
