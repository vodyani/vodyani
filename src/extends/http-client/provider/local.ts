import { Inject, Injectable } from '@nestjs/common';
import { BaseConfig, ConfigFactoryProvider } from '@/extends/config';

import { BaseHttpClient } from '../common';

@Injectable()
export class LocalClientProvider extends BaseHttpClient {
  constructor(
    @Inject(ConfigFactoryProvider.provide)
    private readonly configs: BaseConfig,
  ) {
    super();
    this.init({ baseURL: this.configs.get('server').local });
  }
}
