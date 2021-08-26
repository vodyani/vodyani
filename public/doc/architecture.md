# 📚 架构与名词解释


## Nest.js 中的基础概念

- [* Module 模块](https://docs.nestjs.cn/7/modules)
- [* Controller 控制器](https://docs.nestjs.cn/7/controllers)
- [* Provider 提供者](https://docs.nestjs.cn/7/providers)
- [* Middleware 中间件](https://docs.nestjs.cn/7/middlewares)
- [* Decorator 装饰器](https://docs.nestjs.cn/7/customdecorators)
- [* Filter 异常过滤器](https://docs.nestjs.cn/7/exceptionfilters)
- [* Intercetor 拦截器](https://docs.nestjs.cn/7/interceptors)
- [* Pipe 管道](https://docs.nestjs.cn/7/pipes)
- [* Guard 守卫](https://docs.nestjs.cn/7/guards)

## Nest-Server 架构

> 原则：将不同的功能/逻辑封装为独立的模块，模块间通过 IOC 容器管理依赖注入。

### 架构图

![Architecture](../images/server.png)

### 目录

```
.
├── src
│   ├── common
│   │   ├── constant.ts
│   │   ├── enum.ts
│   │   ├── interface.ts
│   │   └── type.ts
│   ├── core
│   │   ├── app.ts
│   │   ├── module.ts
│   │   ├── decorator
│   │   ├── filter
│   │   ├── intercetor
│   │   └── pipe
│   ├── extends
│   │   ├── config
│   │   ├── http-client
│   │   ├── logger
│   │   ├── sequelize
│   │   ├── swagger
│   │   └── utils
│   ├── modules
│   │   └── default
│   └── main.ts
```

### 架构层级：Common —— 公共约定目录

> PS：每个模块中都可以有自己直属的 common 层，用于存放私有定义 

最外层的 Common 用于存放全局通用的定义信息，包含:

```
* base      —— 定义基类（base class）
* constant  —— 定义常量（object/map/array）
* enum      —— 定义枚举值
* interface —— 定义接口
* type      —— 定义类型
```

### 架构层级：Core —— IOC 容器目录

> 对服务需要使用的模块进行注册，用于管理模块间的依赖注入。

```
* app.ts      —— 用于初始化 IOC 容器并创建服务
* module.ts   —— IOC 容器注册表
```

> Core 目录将托管全局生效的 AOP 执行器（提供者）

默认的 AOP 执行器（提供者）

```
* decorator   —— 可供全局使用的装饰器
* filter      —— 可供全局使用的异常过滤器
* intercetor  —— 可供全局使用的拦截器
* pipe        —— 可供全局使用的管道
```

可选的 AOP 执行器（提供者）

```
guard           —— (可选) 可供全局使用的守卫
middleware      —— (可选) 可供全局使用的中间件
```

### 架构层级：Extends —— 拓展模块目录

> 用于在 Nest-Server 中定义第三方/自定义模块，并向其他模块提供通用功能，例如：日志/配置 等等 ...

目前提供的功能：

```
* config      —— 配置模块
* http-client —— Http 客户端模块
* logger      —— 日志模块
* sequelize   —— 数据库 ORM 工具模块
* swagger     —— Swagger 模块
* utils       —— 工具模块
  * crypto    —— 加解密工具模块
  * stream    —— 流处理工具模块
```

通用组成：

```
* common      —— 拓展模块内公共约定
* shared      —— 拓展模块内的公共资源（例如 内部 Entity 定义/ 内部资源文件）
* provider    —— 拓展提供者
* module      —— 拓展模块注册表
```

### 架构层级：Modules —— 业务模块目录

通用组成：

```
* common      —— 业务模块内公共约定
* shared      —— 业务模块内的公共资源（例如 内部 Entity 定义/ 内部资源文件）
* dto         —— 数据传输对象，指服务端请求过程中输入的数据载体（客户端 ➡️ 服务端）
* controller  —— 业务逻辑控制层
* service     —— 业务逻辑处理层
* provider    —— 业务逻辑提供者（一般指 service-manager 用于聚合复杂逻辑/调用）
* bo          —— 业务对象，指业务逻辑处理后，对外输出的数据（服务端 ➡️ 客户端）
* module      —— 业务模块注册表
```

### 服务入口：main

用于结合 tsconfig.json 内的配置，完成初始化别名，并启动服务

### 简化引用：index

桶文件 `index.ts` 将使当前目录内聚，且可以结合一些插件完成引用管理（如 vscode `ts-barrelr`）