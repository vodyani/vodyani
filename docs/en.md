# Nest-Server Chinese documentation

## Project dependency

> Please ensure that the local node.js environment and the connection information in the configuration are correct!

- **node.js 12.16**
- postgresql 12.0
- redis 5.0

## Common Command

```shell
# Installation project dependency module
npm install

# Construction js Code
npm run build

# local run (execute ts code)
npm run dev:ts

# Local run (compile first, then js code)
npm run dev

# eslint testing
npm run lint

# Formal environment or CI tool installation dependency
npm install --production

# Formal environmental operation
npm run start
```

## Project configuration

### Common environment in projects

- `dev` development, local environment

- `test` testing and commissioning environment

- `pre` simulation, pre-production environment

- `prod` formal, online environment


### Environment variables that can be specified externally in project

- `NODE_ENV` Service env, default value is: `dev`

- `NODE_PORT` Service port, the default value is: `3000`

- `NODE_APP_NAME` Service name, default value is: `Nest-Server`

**Configs module**

```shell
# src/library/configs/
```

**defaults**

```shell
# src/library/configs/shared/configs.defaults.ts
```

**according to environment**

```shell
# src/library/configs/shared/configs.<according to environment>. ts
```

**Compile and specify environment variables to start**

> only real-time compilation in local environments is recommended

```shell
# tsc & NODE_ENV=dev node dist/main.js
npm run dev
```

## Project log

**Logger module**

```shell
# src/library/logger/
```

**When the service is in a dev environment, the log is output only on the console. Additional environments are normally included in the logs directory**

> on winston log levels ,👀: https://github.com/winstonjs/winston

```shell
# logs/
# logs/stdout.log # regular logs, debug levels and above are output here
# logs/stderr.log # Error and Uncaptured exception logs, output only error levels
```

## Project alias configuration

**Translation path alias using the module-alias module**

```shell
# src/main.ts
```

**Add configuration to the tsconfig.json to provide compilation support**

```shell
# src/tsconfigs.ts
```

```json
...
"compilerOptions": {
  ...
  "paths":{
    "@core/*": ["src/core/*"],
    "@common/*": ["src/common/*"],
    "@library/*": ["src/library/*"],
    "@modules/*": ["src/modules/*"],
  }
}
```

**project alias reference specification**

Citing `internal documents`, **forcing** to use **relative paths**, for example:

```ts
// Introduction of book dao in book service
import { BookDao } from './dao';
```

Reference `other module `, **Forcing** to use **@ x** alias path, for example:

```ts
// Introduction of redis in book service
import { RedisProvider } from '@library/redis';
```

**project alias naming specification**

- **force** to use lowercase initials and follow hump naming.
  - Okay: `@moduleName`
  - Bad: `@ModuleName`.

- **force** to use the `@` identifier as the named prefix.
  - Okay: `@moduleName`
  - Bad: `#moduleName`or `!moduleName`.