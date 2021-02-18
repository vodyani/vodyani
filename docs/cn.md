# Nest-Server

> Nest.js Api

## 项目依赖

> 具体依赖见 package.json

**请不要将 package-lock.json 提交到 .gitignore 中！这会影响项目中的 NPM 版本依赖错乱，从而导致不可控的问题**

## 常用命令

``` shell
# 安装依赖
npm install

# 本地运行
npm run dev

# 代码检测
npm run lint

# 线上安装依赖
npm install --production

# 线上构建
npm run build

# 线上运行
npm run start
```

## 项目结构

- **src/**
  - **lib/** `工具模块`
  - **common/** `通用模块`
  - **modules/** `IOC 容器模块`
    - module `某业务模块`
      - **controller/** (or **.ts**) `路由控制层`
      - **service/** (or **.ts**) `业务处理层`
      - **dao/** (or **.ts**) `数据库交互处理层`
      - **dto/** (or **.ts**) `业务参数处理层`
      - index.ts `业务模块声明`
    - index.ts `IOC 容器模块声明`
  - alias.ts `配置别名`
  - app.ts `项目声明`
  - main.ts `项目启动目录`
