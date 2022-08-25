import { toDeepMerge } from '@vodyani/utils';
import { Injectable, INestApplication } from '@nestjs/common';
import { SwaggerDocumentOptions, SwaggerModule, OpenAPIObject, DocumentBuilder } from '@nestjs/swagger';

import { ExtraModelStore } from './struct';

import { ResponseBodyVo, PageVo } from '@/core/vo';

@Injectable()
export class SwaggerProvider {
  public getConfigBuilder() {
    return new DocumentBuilder();
  }

  public setup(
    path: string,
    application: INestApplication,
    config: Omit<OpenAPIObject, 'paths'>,
    options?: SwaggerDocumentOptions,
  ) {
    const extraModels = toDeepMerge([ResponseBodyVo, PageVo], ExtraModelStore.get());
    const document = SwaggerModule.createDocument(application, config, toDeepMerge({ extraModels }, options));

    SwaggerModule.setup(path, application, document);
  }
}
