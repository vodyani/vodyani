import { ApiTags, ApiFormData, ApiResponse } from '@vodyani/swagger';
import { Controller, Get, StreamableFile, UploadedFiles, Response } from '@vodyani/core';

import { DefaultUploadDto } from './dto';
import { DefaultService } from './service';

import { ApiResponseVo, PostFormData } from '@/core/decorator';

@ApiTags('default')
@Controller('/')
export class DefaultController {
  constructor(
    private readonly service: DefaultService,
  ) {}

  @Get()
  @ApiResponseVo()
  public index() {
    return this.service.index();
  }

  @PostFormData('upload')
  @ApiFormData({ type: DefaultUploadDto })
  @ApiResponse({ description: 'response is avatar streamable file' })
  uploadFile(
    @Response({ passthrough: true }) res: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const avatarFile = files.find(e => e.fieldname === 'avatar');

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${avatarFile.originalname}"`,
    });

    return new StreamableFile(avatarFile.buffer);
  }
}
