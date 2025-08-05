# 模拟数据文件夹

本文件夹包含了WMS仓储物资管理系统的所有模拟数据文件，用于开发和测试。

## 文件结构

```
mockdata/
├── README.md          # 说明文档
├── index.ts           # 统一导出文件
├── systemData.ts      # 系统设置相关数据（用户、角色、工作流）
├── damageData.ts      # 报损管理相关数据
├── productData.ts     # 产品基础数据
├── loginData.ts       # 登录用户数据
└── basicData.ts       # 基础资料数据（仓库、物料、供应商）
```

## 数据说明

### systemData.ts
- `mockUsers`: 系统用户数据
- `mockRoles`: 用户角色数据
- `mockWorkflows`: 工作流程数据

### damageData.ts
- `mockDamageRecords`: 报损记录数据
- `damageTypes`: 报损类型选项

### productData.ts
- `mockProducts`: 产品基础信息数据

### loginData.ts
- `mockLoginUsers`: 登录验证用户数据

### basicData.ts
- `mockWarehouses`: 仓库信息数据
- `mockMaterials`: 物料档案数据
- `mockSuppliers`: 供应商信息数据

## 使用方式

```typescript
// 导入所有数据
import { mockUsers, mockProducts, mockDamageRecords } from '../mockdata';

// 或者导入特定文件的数据
import { mockUsers } from '../mockdata/systemData';
```

## 注意事项

1. 所有模拟数据仅用于开发和测试环境
2. 生产环境应替换为真实的API调用
3. 修改数据时请保持数据结构的一致性
4. 新增数据类型时请在index.ts中添加相应的导出