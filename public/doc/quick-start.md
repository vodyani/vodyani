# 📚 快速入门

## 依赖

- 请确保您的操作系统上安装了 [git](https://git-scm.com/)**（>= 2.24.3）**
- 请确保您的操作系统上安装了 [node.js](http://nodejs.cn/download/)**（>= 10.13.0）**

## 安装

> 使用 Nest-Server 创建新项目非常简单，只要在你的终端中使用以下命令：

> github:

```
git clone https://gitee.com/ChoGathK/nest-server
```

> gitee（推荐 🇨🇳 国内用户使用）:

```
git clone https://gitee.com/ChoGathK/nest-server
```

> 下载成功后，在根目录执行 npm 命令安装：

```
npm install
```

## 运行

> 安装成功后，在根目录执行 script 命令运行：

```
npm run dev
```

> 运行成功后，您将会看到控制台输出：

```JavaScript
[NestFactory] Starting Nest application...
[InstanceLoader] ConfigModule dependencies initialized +30ms
[InstanceLoader] SwaggerModule dependencies initialized +0ms
[InstanceLoader] DefaultModule dependencies initialized +16ms
[InstanceLoader] LoggerModule dependencies initialized +1ms
[InstanceLoader] CoreModule dependencies initialized +0ms
[dev] INFO: DefaultController {}:
[dev] INFO: Mapped {, GET} route
[dev] INFO: Nest application successfully started
[dev] INFO: SERVER START: http://localhost:3000
[dev] INFO: ENAVLE SWAGGER: http://localhost:3000/doc
```

通过访问 `/doc` 路径，您将看到项目对应的 swagger 文档
