import { UrlProvider } from '@/extends/utils';
import { Inject, Injectable } from '@nestjs/common';
import { BaseConfig, ConfigFactoryProvider } from '@/extends/config';

import { BaseHttpClient } from '../common';

/** 普通提供者 */
@Injectable()
export class HttpClientProvider extends BaseHttpClient {
  constructor(
    private readonly utils: UrlProvider,
    @Inject(ConfigFactoryProvider.provide)
    private readonly configs: BaseConfig,
  ) {
    super();
  }

  protected getURL(url: string) {
    return this.utils.joinPath(
      this.configs.get('server').local,
      url
    );
  }
}
