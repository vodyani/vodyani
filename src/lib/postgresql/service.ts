import { Order } from '@entity';
import { ConfigService } from '@lib/configs';
import { Sequelize } from 'sequelize-typescript';

export class PostgresqlService {

  public static local = 'local';

  public static getProviders() {
    return [
      {
        inject: [ConfigService],
        provide: this.local,

        useFactory: async (configs: ConfigService) => {
          const postgresql = new Sequelize(configs.info.database);
          postgresql.addModels([Order]);
          await postgresql.sync(); // It is not recommended to enable it in production
          return postgresql;
        },
      },
    ];
  }
}
