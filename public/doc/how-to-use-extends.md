# 📚 拓展模块使用指南

> 完成模块注册表（module.ts ) 的定义后，不要忘记将模块引入到 IOC 容器（CoreModule ) 中。

```ts
// src/core/module.ts
@Module({
  /** 声明服务模块 */
  imports: [
    ConfigModule,
    LoggerModule,
    SwaggerModule,
    DefaultModule,
    // YOUR MODULE
    ...
```

## Config 模块

> 服务通常在不同的环境中运行，根据环境的不同，应该使用不同的配置设置。

> 由于配置变量会更改，而且可能会存储在远端配置中心，所以需要提供异步加载配置信息的能力。

- common 配置约定
  - base 配置基类
  - constant 本地配置常量
  - interface 配置信息接口
- provider 配置提供者
  - config 异步提供者（工厂模式 ) 

> 如何修改配置信息？

1. 修改 common - interface
2. 修改 common - constant
3. 如果需要新增启动环境配置，修改 common - base
4. 如果需要引入配置中心/异步加载配置，修改 provider - config

## Http-Client 模块

> 服务端间的相互调用多建立于 http 请求的基础上，所以需要提供异步请求数据的能力。

- common Http 客户端约定
  - base Http 客户端基类
- provider Http 客户端提供者
  - local 提供者（请求本地8080端口 ) 

## Logger 模块

> 日志，可以是有价值的信息宝库，也可以是毫无价值的数据泥潭。

- provider 日志提供者
  - winston 提供者

## Sequelize 模块

> Sequelize 是一个用 JavaScript 编写的对象关系映射器( ORM )，在 Nest-Server 中，使用的是 Sequelize-TypeScript，它为基本 Sequelize 提供了一组装饰器和其他附加功能。

- common Sequelize 约定
  - base Sequelize 基类
    - `BaseEntity`
    - `BaseEntityUtils`
- decorator Sequelize 装饰器
  - sequelize 装饰器方法
- provider Sequelize 提供者
  - sequelize 异步提供者（工厂模式 ) ，在这里定义需要加载的数据库

## OPENAPI (Swagger) 模块

> [OPENAPI (Swagger)](https://swagger.io/specification/) 规范是一种用于描述 RESTful API 的强大定义格式。 Nest-Server 提供了一系列方案来提高编写效率。

- common 公共约定
  - base Swagger 基类
- decorator Swagger 装饰器
  - swagger 装饰器方法
- provider Swagger 提供者
  - swagger 构建提供者

## Utils 模块

> 服务端常用的工具提供者，目前封装了常用的：

- provider
  - crypto 加解密提供者
  - stream 流数据提供者