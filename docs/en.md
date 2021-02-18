# Nest-Server

> Nest.js Api

## Project depend on

> For specific dependence, see package.json

**Please do not submit package-lock.json to.gitignore! This affects the NPM version dependencies in the project, which can lead to uncontrollable problems**

## Project commands

``` shell
npm install

npm run dev

npm run lint

npm install --production

npm run build

npm run start
```

## Project structure

- **src/**
  - **lib/**
  - **common/**
  - **modules/**
    - module
      - **controller/** (or **.ts**)
      - **service/** (or **.ts**)
      - **dao/** (or **.ts**)
      - **dto/** (or **.ts**)
      - index.ts
    - index.ts
  - alias.ts
  - app.ts
  - main.ts
