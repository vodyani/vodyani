import path = require('path');
import { createReadStream } from 'fs';

import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { applyDecorators, Controller, Get, Post as P, HttpCode, StreamableFile, UploadedFiles, UseInterceptors, Response } from '@nestjs/common';

import { DefaultUploadDto } from './dto';

import { HTTP_STATUS } from '@/core/common';
import { DefaultService } from '@/domain/default/service';
import { ApiResponseVo } from '@/infrastructure/swagger/decorator';

@ApiTags('default')
@Controller('/')
export class DefaultController {
  constructor(
    private readonly service: DefaultService,
  ) {}

  @Get()
  @ApiResponseVo()
  public index(@Response({ passthrough: true }) res: any) {
    const f = createReadStream(path.resolve(__dirname, '../../../package.json'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"',
    });
    return new StreamableFile(f);
    // return this.service.index();
  }

  @PostFormData('upload')
  @ApiFormData({ type: DefaultUploadDto })
  uploadFile(@UploadedFiles() files: Express.Multer.File[]): StreamableFile {
    const avatar = files.find(e => e.fieldname === 'avatar');
    return new StreamableFile(avatar.buffer);
  }
}

export function PostFormData(path: string) {
  return applyDecorators(
    P(path),
    HttpCode(HTTP_STATUS.SUCCESS),
    UseInterceptors(AnyFilesInterceptor({})),
  );
}

export function ApiFormData(options: any) {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody(options),
  );
}
