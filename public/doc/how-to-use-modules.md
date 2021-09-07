# 📚 业务模块使用指南

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

1. ✍️ 优先确定输入和输出（DTO & BO) 
2. 🤔 思考当前模块的依赖关系与资源调用（Extends/Modules/Provider/Common/Shared) 
3. 🤔 设计业务实现（Service/Provider/AOP...) 
4. 🤔 设计控制层实现（Controller/AOP...) 
5. ✍️ 完成模块注册表的定义（module.ts) 
