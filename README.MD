# Nest-Server

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="public/images/icon.png" alt="Nest Logo" /></a>
</p>
  
<p align="center">
  🚀 可能是最好的 NestJS 服务端（Http）开发脚手架。
</p>

[![](https://img.shields.io/badge/npm-typescript-9cf?style=flat-square)](https://www.npmjs.org/package/typescript)
[![](https://img.shields.io/badge/npm-ts--node-9cf?style=flat-square)](https://www.npmjs.org/package/ts-node)
[![](https://img.shields.io/badge/npm-@nestjs/core-blue?style=flat-square)](https://www.npmjs.org/package/@nestjs/core)
[![](https://img.shields.io/badge/npm-@nestjs/common-blue?style=flat-square)](https://www.npmjs.org/package/@nestjs/common)
[![](https://img.shields.io/badge/npm-@nestjs/swagger-blue?style=flat-square)](https://www.npmjs.org/package/@nestjs/swagger)
[![](https://img.shields.io/badge/npm-class--transformer-orange?style=flat-square)](https://www.npmjs.org/package/class-transformer)
[![](https://img.shields.io/badge/npm-class--validator-orange?style=flat-square)](https://www.npmjs.org/package/class-validator)
[![](https://img.shields.io/badge/npm-reflect--metadata-orange?style=flat-square)](https://www.npmjs.org/package/reflect-metadata)
[![](https://img.shields.io/badge/npm-rxjs-orange?style=flat-square)](https://www.npmjs.org/package/rxjs)
[![](https://img.shields.io/badge/npm-sequelize--typescript-green?style=flat-square)](https://www.npmjs.org/package/sequelize-typescript)
[![](https://img.shields.io/badge/npm-lodash-green?style=flat-square)](https://www.npmjs.org/package/lodash)
[![](https://img.shields.io/badge/npm-winston-green?style=flat-square)](https://www.npmjs.org/package/winston)
[![](https://img.shields.io/badge/npm-eslint-ff69b4?style=flat-square)](https://www.npmjs.org/package/eslint)
[![](https://img.shields.io/badge/npm-module--alias-ff69b4?style=flat-square)](https://www.npmjs.org/package/module-alias)

## 介绍

设计 Nest-Server 的初衷，是希望让 Node.js 开发者也能用上如 Spring 那般威力强大的开发框架。

因为虽然 Node.js存在大量优秀的框架/库/工具，但它们都没有有效地解决主要问题 —— 项目架构与开发约束，直到 [Nest.js](https://github.com/nestjs/nest) 的出现。

Nest-Server 是基于 Nest.js 的功能封装，对后端开发中常用的层级/模块/规范进行了约束，这些模块通过 [Nest-Server 配套工具](#工具与插件) 即可便捷地创建。

使用 Nest-Server 搭建项目，开发者可以体验到清晰的模块组织方式，隔离模块的冗余调用；在各种模块内都涉及不一样的设计模式。

## 项目架构

![Architecture](public/images/server.png)

## 文档

- [📚 快速入门](public/doc/quick-start.md)
- [📚 架构与名词解释](public/doc/architecture.md) `👷 (完善中 ...)`
- [⛰ 如何修改核心模块](public/doc/how-to-use-core.md) `👷 (完善中 ...)`
- [🏭 如何开发业务模块](public/doc/how-to-use-modules.md) `👷 (完善中 ...)`
- [🔩 如何开发拓展模块](public/doc/how-to-use-extends.md) `👷 (完善中 ...)`
- [👪 如何正确使用 Common](public/doc/how-to-use-common.md) `👷 (完善中 ...)`

## 工具与插件

- [Nest-Server-Tools](https://github.com/sophons-space/nest-server-tools)  `“🦁  帮助 nest-server 开发者在 vscode 中快速创建模板/目录/文件。”`

## Todo

- request-id 传递方案
- redis extends
- kafka extends
- grpc extends
- apm extends

## Q&A

- 如果您有好的想法，欢迎您提出宝贵意见 **👉  ✏️** [issues](https://github.com/sophons-space/nest-server/issues)

## License

- [MIT](./LICENSE)
