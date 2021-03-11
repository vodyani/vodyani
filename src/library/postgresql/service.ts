import { Order } from '@entity';
import { ConfigService } from '@library/configs';
import { Sequelize } from 'sequelize-typescript';

export class PostgresqlService {

  public static local = 'localPostgresql';

  public static getProviders() {
    return [
      {
        provide: this.local,
        inject: [ConfigService],

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
