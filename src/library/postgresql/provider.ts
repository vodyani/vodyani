import { Order } from '@entity';
import { ConfigProvider } from '@library/configs';
import { Sequelize } from 'sequelize-typescript';

export class PostgresqlProvider {

  public static local = 'localPostgresql';

  public static getProviders() {
    return [
      {
        provide: this.local,
        inject: [ConfigProvider],

        useFactory: async (configs: ConfigProvider) => {
          const postgresql = new Sequelize(configs.info.database);
          postgresql.addModels([Order]);
          await postgresql.sync(); // It is not recommended to enable it in production
          return postgresql;
        },
      },
    ];
  }
}
