# 仓储及物资管理系统 (WMS System)

一个基于 React + TypeScript + Vite 构建的现代化仓储及物资管理系统。

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Radix UI + Tailwind CSS
- **图表库**: ECharts + Recharts
- **表单处理**: React Hook Form + Zod
- **样式方案**: Tailwind CSS + CSS Modules

## 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

## 项目启动

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

启动成功后，在浏览器中访问 `http://localhost:5173` 即可查看应用。

### 3. 其他可用命令

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 代码检查
npm run lint
```

## 项目结构

```
├── components/          # 组件目录
│   ├── ui/             # UI 基础组件
│   ├── forms/          # 表单组件
│   └── figma/          # 设计相关组件
├── lib/                # 工具函数
├── styles/             # 样式文件
├── constants/          # 常量定义
└── guidelines/         # 项目规范
```

## 主要功能模块

- 📊 数据看板 (Dashboard)
- 📦 库存管理 (Inventory Management)
- 🏢 仓库管理 (Warehouse Management)
- 💼 业务管理 (Business Management)
- 📈 报表分析 (Reports)
- ⚙️ 系统设置 (System Settings)

## 开发说明

本项目使用现代化的前端开发技术栈，支持热重载、TypeScript 类型检查等开发特性，确保开发效率和代码质量。