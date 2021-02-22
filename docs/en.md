# Nest-Server

> Nest.js Api

## Project depend on

> For specific dependence, see package.json

**Please do not submit package-lock.json to.gitignore! This affects the NPM version dependencies in the project, which can lead to uncontrollable problems**

## Project commands

``` shell
# install dependencies
npm install

# build
npm run build

# run on dev
npm run dev

# code detection
npm run lint

# install dependencies on production
npm install --production

# run on production
npm run start
```

## Project Structure

- **src/**
  - **common/**
    - **types/** (or **.ts**)
    - **interfaces/** (or **.ts**)
    - **constants/** (or **.ts**)
  - **configs/**
    - base.ts
    - common.ts
    - config.dev.ts
    - config.test.ts
    - config.pre.ts
    - config.prod.ts
    - interface.ts
    - index.ts
  - **entities/**
    - base.ts
    - index.ts
    - **YOUR ENTITY**.ts
  - **lib/**
    - database.ts
    - logger.ts
    - store.ts
    - redis.ts
    - index.ts
  - **modules/**
    - index.ts
    - module
      - **controller/** (or **.ts**)
      - **service/** (or **.ts**)
      - **dao/** (or **.ts**)
      - **dto/** (or **.ts**)
      - index.ts
  - server.ts
  - main.ts
