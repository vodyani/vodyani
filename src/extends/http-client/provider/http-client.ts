import { Inject, Injectable } from '@nestjs/common';
import { BaseConfig, ConfigFactoryProvider } from '@/extends/config';

import { BaseHttpClient } from '../common';

/** 普通提供者 */
@Injectable()
export class HttpClientProvider extends BaseHttpClient {
  constructor(
    @Inject(ConfigFactoryProvider.provide)
    private readonly configs: BaseConfig,
  ) {
    super();
    this.init({ baseURL: this.configs.get('server').local });
  }
}
