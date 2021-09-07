# 📚 快速入门

## 依赖

- 请确保您的操作系统上安装了 [git](https://git-scm.com/)**（>= 2.24.3 ) **
- 请确保您的操作系统上安装了 [node.js](http://nodejs.cn/download/)**（>= 10.13.0 ) **

## 安装

> 使用 Nest-Server 创建新项目非常简单，只要在你的终端中使用以下命令：

> github:

```
git clone https://github.com/ChoGathK/nest-server.git
```

> gitee（推荐 🇨🇳 国内用户使用 ) :

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

通过访问 `/doc` 路径，您将看到项目对应的 swagger 文档

```JavaScript
[Nest] [NestFactory] Starting Nest application...
[Nest] [InstanceLoader] ConfigModule dependencies initialized +34ms
[Nest] [InstanceLoader] SwaggerModule dependencies initialized +4ms
[Nest] [InstanceLoader] DefaultModule dependencies initialized +37ms
[Nest] [InstanceLoader] LoggerModule dependencies initialized +2ms
[Nest] [InstanceLoader] CoreModule dependencies initialized +1ms
[Nest-Server] [dev] INFO: {"trace":"DefaultController {}:","meta":"RoutesResolver","type":"LOG"}
[Nest-Server] [dev] INFO: {"trace":"Mapped {, GET} route","meta":"RouterExplorer","type":"LOG"}
[Nest-Server] [dev] INFO: {"trace":"Nest application successfully started","meta":"NestApplication","type":"LOG"}
[Nest-Server] [dev] INFO: "SERVER START: http://localhost:3000"
[Nest-Server] [dev] INFO: "ENAVLE SWAGGER: http://localhost:3000/doc"
```
