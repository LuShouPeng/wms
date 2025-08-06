
# WMS 后端项目开发规范

## 1. 概述

本规范旨在为 WMS 后端项目提供一套统一的开发标准，确保代码质量、提升协作效率、降低维护成本。所有项目成员均需严格遵守此规范。

## 2. Git 工作流规范 (Git Flow)

采用简化的 Git Flow 模型：

*   **`main` 分支:** 对应生产环境，代码必须是稳定且可发布的。只接受来自 `develop` 分支的合并（Merge）。
*   **`develop` 分支:** 主开发分支，包含了所有已完成并测试的功能。所有功能分支从这里创建。
*   **`feature/` 分支 (例如 `feature/add-product-crud`):**
    *   用于开发新功能，分支名应清晰描述功能点。
    *   从 `develop` 分支创建。
    *   完成后，发起一个 **Pull Request (PR)** 合并回 `develop` 分支。
*   **`fix/` 分支 (例如 `fix/login-bug`):** 用于修复 `develop` 分支中的 Bug。

**核心规则:**
1.  严禁直接向 `main` 和 `develop` 分支提交代码。
2.  所有合并到 `develop` 分支的代码都必须经过 **Code Review**。
3.  Commit Message 必须清晰、有意义，建议格式：`feat: Add user login functionality` 或 `fix: Correct calculation error in inventory`。

## 3. 编码规范 (Coding Style)

*   **代码格式化:**
    *   遵循 [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)。
    *   强烈建议在 IDE (IntelliJ IDEA) 中安装 `CheckStyle` 或 `SonarLint` 插件，并配置统一的规则文件，实现自动格式化和静态代码检查。
*   **命名约定:**
    *   **类名:** `UpperCamelCase` (例如 `ProductService`)
    *   **方法名/变量名:** `lowerCamelCase` (例如 `getProductById`)
    *   **常量:** `UPPER_SNAKE_CASE` (例如 `MAX_RETRY_TIMES`)
    *   **Entity (实体类):** 直接对应数据库表名，采用单数形式 (例如 `Product` 对应 `products` 表)。
    *   **DTO (数据传输对象):** 使用后缀 `DTO` (例如 `ProductDTO`)
    *   **Controller 方法:** 动词或动宾短语 (例如 `createProduct`, `listProducts`)
*   **注释:**
    *   所有 `public` 方法和复杂的业务逻辑代码块都必须有 Javadoc 注释。
    *   注释应解释 **“为什么” (Why)**，而不是 **“做什么” (What)**。代码本身应该能清晰地说明它在做什么。
    *   避免使用 `@author` 标签，Git 历史会记录作者信息。

## 4. API 设计规范 (RESTful)

*   **URL 命名:**
    *   使用名词复数表示资源集合 (例如 `/api/products`, `/api/orders`)。
    *   URL 路径使用小写字母和连字符 `-`。
    *   版本号放在 URL 的最前面 (例如 `/api/v1/products`)。
*   **HTTP 方法:**
    *   `GET`: 查询资源
    *   `POST`: 创建资源
    *   `PUT`: 更新整个资源
    *   `PATCH`: 更新部分资源
    *   `DELETE`: 删除资源
*   **请求/响应体:**
    *   统一使用 JSON 格式 (`application/json`)。
*   **响应结构:**
    *   设计一个统一的响应体结构，方便前端处理。
    ```json
    {
      "success": true,         // true 或 false
      "code": 200,             // 业务状态码 (非 HTTP 状态码)
      "message": "操作成功",
      "data": { ... }           // 实际的响应数据
    }
    ```
*   **错误处理:**
    *   利用 Spring 的 `@RestControllerAdvice` 创建全局异常处理器。
    *   捕获不同类型的异常，并返回统一结构、带有错误信息的响应体。

## 5. DTO (数据传输对象) 使用规范

*   **严格隔离:** Entity (实体) 严禁直接暴露给前端。Controller 的所有输入和输出都必须是 DTO。
*   **职责单一:**
    *   `XxxCreateDTO`: 用于创建资源时接收数据。
    *   `XxxUpdateDTO`: 用于更新资源时接收数据。
    *   `XxxVO` (View Object) 或 `XxxResponseDTO`: 用于向前端返回数据。
*   **转换:** 使用 `BeanUtils.copyProperties` 或 MapStruct 等工具在 Service 层完成 Entity 和 DTO 之间的转换。

## 6. 配置管理

*   使用 `application.yml` 进行配置。
*   通过 Spring Profiles (`application-dev.yml`, `application-prod.yml`) 区分不同环境的配置。
*   **严禁** 将任何敏感信息 (如数据库密码, JWT 密钥) 硬编码在代码或配置文件中。应使用环境变量或配置中心来管理。

