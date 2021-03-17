# Nest-Server 中文文档

>  🇨🇳 [国内用户建议使用 Gitee 访问，效果更佳哦](https://gitee.com/ChoGathK/nest-server#document)

## 项目依赖

> 请确保本地拥有 node.js 环境，以及配置中的连接信息正确无误！

- **node.js 12.16+**
- postgresql 12.0+
- redis 5.0+

## 项目常用命令

``` shell
# 安装项目依赖模块
npm install

# 构建成 js 代码
npm run build

# 本地运行 (执行 ts 代码)
npm run dev:ts

# 本地运行 (先执行编译，再运行js代码)
npm run dev

# eslint 检测
npm run lint

# 正式环境或 CI 工具安装依赖
npm install --production

# 正式环境运行
npm run start
```

## 项目配置

**项目中的常用环境**

- `dev` 开发、本地环境

- `test` 测试、调试环境

- `pre` 仿真、预生产环境

- `prod` 正式、线上环境

**项目中可以外部指定的环境变量**

- `NODE_ENV` 当前环境，外界没有输入则取默认值为 `dev`

- `NODE_PORT` 服务端口，外界没有输入则取默认值为: `3000`

- `NODE_APP_NAME` 服务名，外界没有输入则默认值为: `Nest-Server`

**Configs 模块**

```shell
# src/library/configs/
```

**通用配置**

```shell
# src/library/configs/shared/configs.defaults.ts
```

**不同环境下的配置**

```shell
# src/library/configs/shared/configs.<根据环境设置>.ts
```

**编译并指定环境变量启动**

> 只推荐在本地环境实时编译

```shell
# tsc & NODE_ENV=dev node dist/main.js
npm run dev
```

## 项目日志

**Logger 模块**

```shell
# src/library/logger/
```

**当服务在 dev 环境时，只在控制台输出日志。其他环境正常写入 logs 目录**

> 关于 winston 日志等级，👀 ：https://github.com/winstonjs/winston

```shell
# logs/
# logs/stdout.log # 常规日志，debug 等级以上都会输出到这里 
# logs/stderr.log # 错误和未捕捉的异常日志，只输出 error 等级 
```

## 项目别名配置

**使用了 module-alias 模块转译路径别名**

```shell
# src/main.ts
```

**在 tsconfig.json 中添加配置，以提供编译支持**

```shell
# src/tsconfigs.ts
```

```json
...
"compilerOptions": {
  ...
  "paths": {
    "@core/*": ["src/core/*"],
    "@common/*": ["src/common/*"],
    "@library/*": ["src/library/*"],
    "@modules/*": ["src/modules/*"],
  }
}
```

**项目别名引用规范**

引用 `内部文件`，**强制** 使用 **相对路径**，例如：

```ts
// 在 book service 中引入 book dao
import { BookDao } from './dao';
```

引用 `其他模块` ，**强制** 使用 **@x** 别名路径，例如：

```ts
// 在 book service 中引入 redis
import { RedisProvider } from '@library/redis';
```

**项目别名命名规范**

- **强制** 使用首字母小写，遵循驼峰命名。
  - 好的：`@moduleName`
  - 坏的：`@ModuleName`。

- **强制** 使用 `@` 标识符作为命名前缀。
  - 好的：`@moduleName` 
  - 坏的：`#moduleName` or `!moduleName`。
