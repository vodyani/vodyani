# Nest-Server

> 🚀 probably the best scaffolding for nest.js server-side development

## Docs

[English Docs](docs/en.md) | [中文文档](docs/cn.md)

## Architecture diagram

![architecture diagram](docs/img/server.png)

## Structure

- **src/**
  - **common/**
    - **types/** (or **.ts**)
    - **interfaces/** (or **.ts**)
    - **constants/** (or **.ts**)
  - **configs/**
  - **entities/**
  - **lib/**
  - **modules/**
    - **YOUR MODULE/**
      - **controller/** (or **.ts**)
      - **service/** (or **.ts**)
      - **dao/** (or **.ts**)
      - **dto/** (or **.ts**)
  - server.ts
  - main.ts