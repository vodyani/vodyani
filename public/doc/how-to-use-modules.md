# 📚 业务模块使用指南

> 完成模块定义后，不要忘记将模块注册到 Core-Module 中

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

1. 优先确定业务边界与输入输出（DTO & BO）
2. 设计依赖注入（Extends/Modules）
3. 设计业务实现（Service/Provider）
4. 完善逻辑控制与路由转发（Controller）
5. 注册到业务模块中（Module）
