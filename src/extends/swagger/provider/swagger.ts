import { INestApplication, Injectable } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { HttpResponseBodyBO, HttpResponsePageBO } from '../common';

@Injectable()
export class SwaggerProvider {
  /** 构建 swagger */
  public build(app: INestApplication) {
    const doc = SwaggerModule.createDocument(
      app,
      /** 为 nest.js app 绑定 swagger */
      new DocumentBuilder().build(),
      /** 绑定 http response 通用 BO 业务数据对象 */
      { extraModels: [HttpResponseBodyBO, HttpResponsePageBO] },
    );

    SwaggerModule.setup('/doc', app, doc);
  }
}
