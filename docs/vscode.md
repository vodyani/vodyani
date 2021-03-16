# Settings

> .vscode/launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Run Typescript",
      "type": "node",
      "request": "launch",
      "args": [
        "${workspaceRoot}/src/main.ts"
      ],
      "runtimeArgs": [
        "--nolazy",
        "-r",
        "ts-node/register",
      ],
      "sourceMaps": true,
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```