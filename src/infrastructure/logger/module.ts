import { DynamicModule } from '@vodyani/core';

import { LoggerManager } from './manager';

export class LoggerInfrastructure {
  static forRoot(): DynamicModule {
    const manager = new LoggerManager().create();

    return {
      global: true,
      exports: [manager],
      providers: [manager],
      module: LoggerInfrastructure,
    };
  }
}
