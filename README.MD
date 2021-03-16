# Nest-Server

> 🚀 probably the best scaffolding for nest.js server-side development

## Architecture diagram

![architecture diagram](docs/img/server.png)

## Project directory

```shell
├── src
│   ├── common
│   │   ├── constant.ts
│   │   ├── index.ts
│   │   ├── interface.ts
│   │   └── type.ts
│   ├── core
│   │   ├── decorator
│   │   ├── filter
│   │   ├── index.ts
│   │   ├── interceptor
│   │   ├── manager.ts
│   │   ├── module.ts
│   │   └── pipe
│   ├── library
│   │   ├── configs
│   │   ├── logger
│   │   ├── postgresql
│   │   ├── redis
│   │   └── utils
│   ├── main.ts
│   └── modules
│       ├── book
│       └── health
├── package-lock.json
├── package.json
└── tsconfig.json
```

## Docs

[English Docs](docs/en.md) | [中文文档](docs/cn.md)

## How Debugging with VS Code breakpoints

[setting: .vscode/launch.json](docs/vscode.md) 👀