# 📚 整体介绍

## 架构图

![Architecture](../images/server.png)

## 目录

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

## 基本概念

### 模块

> NestJs 中的模块 [Module](https://docs.nestjs.cn/7/modules)

除了 `Core-Module` 外，每个模块都提供对外分享的能力；一旦创建就能被任意模块复用/引用。模块是单例，因此开发者可以轻松地在多个模块之间共享同一个提供者实例。

其中，module.ts 中的模块注册表是具有 `@Module()` 装饰器的类。Nest-Server 将用它来组织逻辑结构以及管理依赖关系。`@Module()` 接受一个描述模块属性的对象，包含以下属性:

- exports	对外导出的`提供者`列表
- imports	外部导入的`模块`列表
- controllers	模块内使用的`控制器`列表
- providers	模块内使用的`提供者`列表

### 约定目录（Common）

> 每个模块中都可以有自己直属的 common 层，用于存放私有定义，`src` 下的 `common` 用于存放全局通用的定义信息，但是他们都包含:

```
* base      —— 定义基类（base class）
* constant  —— 定义常量（object/map/array）
* enum      —— 定义枚举值
* interface —— 定义接口
* type      —— 定义类型
```

### 资源目录（Shared）

> 用于存放模块中的公共资源

多用于存放 Entity/Repository 的定义，例如 sequelize model

### 控制层（Controller）

> NestJs 中的控制器 [Controller](https://docs.nestjs.cn/7/controllers)

控制层负责处理传入的请求和向客户端返回响应。通常，每个控制器有多个路由，不同的路由可以执行不同的操作。

### 业务层/提供者（Service/Provider）

> NestJs 中的提供者 [Controller](https://docs.nestjs.cn/7/providers)

Provider 只是一个用 `@Injectable()` 装饰器注释的类。
Provider 是 Nest-Server 中的基础，根据使用策略/架构分层，可以被分类为:

- Service 业务层
- Provider 基础业务/功能提供者

他们都可以通过 constructor 注入依赖关系。 这意味着对象可以彼此创建各种关系，并且“连接”对象实例的功能在很大程度上可以委托给 Nest-Server `Core-Module`。 

### 切面层 (AOP)

> AOP (Aspect Oriented Programming)，意为：面向切面编程。

AOP 是 OOP 的延续，是软件开发中的一个热点，也是 Nest.js 中的一个重要内容，是函数式编程的一种衍生范型。利用 AOP 可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

#### [* Middleware 中间件](https://docs.nestjs.cn/7/middlewares)

Nest-Server 中间件实际上等价于 Express 中间件。下面是 Express 官方文档中所述的中间件功能：

- 在上下文过程中，执行代码。
- 对请求和响应对象进行更改。
- 调用堆栈中的下一个中间件函数。
- 如果当前的中间件函数没有结束请求-响应周期，它必须调用 next() 将控制传递给下一个中间件函数。否则, 请求将被挂起。

#### [* Decorator 装饰器](https://docs.nestjs.cn/7/customdecorators)

Nest.js 是基于装饰器这种语言特性而创建的。它是许多常用编程语言中众所周知的概念，但在 JavaScript 世界中，这个概念仍然相对较新。所以为了更好地理解装饰器是如何工作的，你应该看看[这篇文章 📚](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)。下面给出一个简单的定义：

`ES2016` 的装饰器是一个可以将目标对象，名称和属性描述符作为参数的返回函数的表达式。你可以通过装饰器前缀 `@` 来使用它，并将其放置在您想要装饰的最顶端。装饰器可以被定义为一个类或是属性。

#### [* Filter 异常过滤器](https://docs.nestjs.cn/7/exceptionfilters)

内置的异常层负责处理整个应用程序中的所有抛出的异常。当捕获到未处理的异常时，最终用户将收到友好的响应。

#### [* Intercetor 拦截器](https://docs.nestjs.cn/7/interceptors)

拦截器应该实现 `NestInterceptor` 接口。

- 在函数执行之前/之后绑定额外的逻辑
- 转换从函数返回的结果
- 转换从函数抛出的异常
- 扩展基本函数行为
- 根据所选条件完全重写函数 (例如, 缓存目的)

#### [* Pipe 管道](https://docs.nestjs.cn/7/pipes)

管道应实现 `PipeTransform` 接口。

管道有两个类型:

- 转换：管道将输入数据转换为所需的数据输出
- 验证：对输入数据进行验证，如果验证成功继续传递; 验证失败则抛出异常;

在这两种情况下, 管道 参数(arguments) 会由 控制器(controllers)的路由处理程序进行处理。

Nest.js 会在调用这个方法之前插入一个管道，管道会先拦截方法的调用参数，进行转换或是验证处理，然后用转换好或是验证好的参数调用原方法。

#### [* Guard 守卫](https://docs.nestjs.cn/7/guards)

守卫应该实现 `CanActivate` 接口。

守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。 这通常称为授权。在传统的 Express 应用程序中，通常由中间件处理授权。中间件是身份验证的良好选择。到目前为止，访问限制逻辑大多在中间件内。这样很好，因为诸如 token 验证或将 request 对象附加属性与特定路由没有强关联。

### 数据传输对象（DTO）

> 数据传输对象（Data Transger Object - DTO）

指服务端请求过程中的数据载体

### 业务数据对象（BO）

> 业务对象（Business Object - BO）

指服务端在业务层处理逻辑后，对外输出的数据