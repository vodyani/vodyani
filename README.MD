# Nest-Server

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="http://kamilmysliwiec.com/public/nest-logo.png#1" alt="Nest Logo" /></a>
</p>
  
 <p align="center">🚀 Possibly the best nest.js server development awesome template.
</p>

## Description

## Architecture diagram

![architecture diagram](docs/img/server.png)

**Common**

> Store common information for the Server application

- Type
- constant
- Interface

**Core**

> Manage capability deployment in the Server application

- Server Manager
- **IOC** Module
- **AOP** Handler

**Library**

> Providers used to inject external dependencies

- Configs
- Logger
- Postgresql
- Redis
- Utils

**Modules**

- Health
  - Controller
  - Module
- **Book** (A simple Book example is provided to show the specific module implementation) 
  - Dto
  - Dao
  - Service
  - Controller
  - Module

### Directory comparison

```shell
├── src
│   ├── main.ts
│   ├── common
│   │   ├── index.ts
│   │   ├── type.ts
│   │   ├── constant.ts
│   │   └── interface.ts
│   ├── core
│   │   ├── decorator
│   │   ├── pipe
│   │   ├── filter
│   │   ├── interceptor
│   │   ├── index.ts
│   │   ├── module.ts
│   │   └── manager.ts
│   ├── library
│   │   ├── postgresql
│   │   ├── configs
│   │   ├── logger
│   │   ├── redis
│   │   └── utils
│   └── modules
│       ├── book
│       └── health
├── package-lock.json
├── package.json
└── tsconfig.json
```

## Document

[English Docs](docs/en.md) | [中文文档](docs/cn.md)

## Q&A

### 1. How debugging with vscode breakpoints?

**see 👉  👀**  [.vscode/launch.json](docs/vscode.md) 

## License
[BSD 2-Clause](./LICENSE)