
# 后端技术方案 (现代化单体架构)

## 1. 核心理念：务实的现代化单体

针对百人以内公司内部系统的特点，我们选择“现代化单体”架构。此方案旨在实现快速开发、简便运维和未来可扩展性三者之间的最佳平衡，避免过度设计。

核心思想是：**在一个代码仓库中，构建一个结构清晰、模块化、易于维护和部署的 Spring Boot 应用。**

## 2. 技术选型 (Tech Stack)

*   **核心框架:** Spring Boot (Java)
*   **数据库:** MySQL
*   **数据访问:** MyBatis
*   **构建工具:** Maven
*   **认证授权:** Spring Security + JSON Web Tokens (JWT)
*   **API 文档:** SpringDoc (自动生成 OpenAPI/Swagger UI)
*   **容器化技术:** **Docker** & **Docker Compose** (此为关键实践)
*   **持续集成:** 推荐使用 GitHub Actions 或 Jenkins

## 3. 架构与项目结构 (Modular Monolith)

我们将采用模块化的方式组织代码，即便所有功能都在一个应用中。这极大地增强了代码的可读性和可维护性，并为未来可能的微服务拆分奠定基础。

项目结构将按 **业务领域 (Business Domain)** 划分，而非按技术分层 (`controller`, `service`) 划分。

```
src
└── main
    ├── java
    │   └── com
    │       └── yourcompany
    │           └── wms
    │               ├── WmsApplication.java
    │               ├── config              // 全局配置 (Security, CORS, etc.)
    │               ├── common              // 通用工具类、常量、基础实体等
    │               ├── exception           // 全局异常处理
    │               |
    │               ├── **inventory**         // 库存模块 (核心)
    │               │   ├── InventoryController.java
    │               │   ├── InventoryService.java
    │               │   ├── Inventory.java (Entity)
    │               │   └── InventoryMapper.java/xml
    │               |
    │               ├── **product**           // 商品模块
    │               │   ├── ProductController.java
    │               │   └── ...
    │               |
    │               ├── **order**             // 订单模块
    │               │   ├── PurchaseOrderController.java
    │               │   └── ...
    │               |
    │               └── **user**              // 用户与认证模块
    │                   ├── UserController.java
    │                   └── ...
    │
    └── resources
        ├── application.yml         // 主配置文件
        ├── application-dev.yml     // 开发环境配置
        ├── application-prod.yml    // 生产环境配置
        ├── db/migration            // (可选) 数据库脚本，如 Flyway/Liquibase
        └── mybatis/mapper/         // MyBatis XML 文件存放处
```

## 4. 部署方案 (Deployment)

我们将全面采用容器化部署，这是现代化实践的关键。

1.  **Dockerfile:** 为 Spring Boot 应用编写一个 `Dockerfile`，用于将其打包成一个标准的 Docker 镜像。
2.  **Docker Compose:** 提供一个 `docker-compose.yml` 文件。开发者或服务器只需执行 `docker-compose up -d` 命令，即可一键启动整个 WMS 系统所需的所有服务（例如：WMS 应用本身、MySQL 数据库）。

这种方式极大地简化了环境配置和应用部署的复杂度。

## 5. 推荐的下一步

建议查阅我们为您制定的 `PROJECT_SPECIFICATION.md` 文件，它包含了详细的开发规范，将帮助您的团队从第一行代码开始就保持一致和高效。

