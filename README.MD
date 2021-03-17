# Nest-Server

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="http://kamilmysliwiec.com/public/nest-logo.png#1" alt="Nest Logo" /></a>
</p>
  
<p align="center">
  🚀 Possibly the best nest.js server development template.
</p>

## Description

[![](https://img.shields.io/badge/npm-typescript-9cf?style=flat-square)](https://www.npmjs.org/package/typescript)
[![](https://img.shields.io/badge/npm-ts--node-9cf?style=flat-square)](https://www.npmjs.org/package/ts-node)
[![](https://img.shields.io/badge/npm-@nestjs/core-blue?style=flat-square)](https://www.npmjs.org/package/@nestjs/core)
[![](https://img.shields.io/badge/npm-@nestjs/common-blue?style=flat-square)](https://www.npmjs.org/package/@nestjs/common)
[![](https://img.shields.io/badge/npm-@nestjs/swagger-blue?style=flat-square)](https://www.npmjs.org/package/@nestjs/swagger)
[![](https://img.shields.io/badge/npm-@sophons/redis-success?style=flat-square)](https://www.npmjs.org/package/@sophons/redis)
[![](https://img.shields.io/badge/npm-@sophons/request-success?style=flat-square)](https://www.npmjs.org/package/@sophons/request)
[![](https://img.shields.io/badge/npm-swagger--ui--express-green?style=flat-square)](https://www.npmjs.org/package/swagger-ui-express)
[![](https://img.shields.io/badge/npm-class--transformer-yellowgreen?style=flat-square)](https://www.npmjs.org/package/class-transformer)
[![](https://img.shields.io/badge/npm-eslint-blueviolet?style=flat-square)](https://www.npmjs.org/package/eslint)
[![](https://img.shields.io/badge/npm-class--validator-green?style=flat-square)](https://www.npmjs.org/package/class-validator)
[![](https://img.shields.io/badge/npm-reflect--metadata-orange?style=flat-square)](https://www.npmjs.org/package/reflect-metadata)
[![](https://img.shields.io/badge/npm-module--alias-ff69b4?style=flat-square)](https://www.npmjs.org/package/module-alias)
[![](https://img.shields.io/badge/npm-rimraf-yellowgreen?style=flat-square)](https://www.npmjs.org/package/rimraf)
[![](https://img.shields.io/badge/npm-rxjs-orange?style=flat-square)](https://www.npmjs.org/package/rxjs)
[![](https://img.shields.io/badge/npm-sequelize--typescript-green?style=flat-square)](https://www.npmjs.org/package/sequelize-typescript)
[![](https://img.shields.io/badge/npm-sequelize-yellowgreen?style=flat-square)](https://www.npmjs.org/package/sequelize)
[![](https://img.shields.io/badge/npm-crypto--js-green?style=flat-square)](https://www.npmjs.org/package/crypto-js)
[![](https://img.shields.io/badge/npm-helmet-orange?style=flat-square)](https://www.npmjs.org/package/helmet)
[![](https://img.shields.io/badge/npm-jsonwebtoken-green?style=flat-square)](https://www.npmjs.org/package/jsonwebtoken)
[![](https://img.shields.io/badge/npm-lodash-orange?style=flat-square)](https://www.npmjs.org/package/lodash)
[![](https://img.shields.io/badge/npm-moment-green?style=flat-square)](https://www.npmjs.org/package/moment)
[![](https://img.shields.io/badge/npm-pg-yellowgreen?style=flat-square)](https://www.npmjs.org/package/pg)
[![](https://img.shields.io/badge/npm-winston-green?style=flat-square)](https://www.npmjs.org/package/winston)

## Architecture

![Architecture](docs/img/server.png)

## Directory

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

1. How to use vscode to debug breakpoints? **👉  👀** [.vscode/launch.json](docs/vscode.md) 
2. If you have good ideas, you are more than welcome to ask questions! **👉  ✏️** [issues](https://github.com/sophons-space/nest-server/issues)

## License

[BSD 2-Clause](./LICENSE)
