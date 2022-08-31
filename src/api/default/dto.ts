import { ApiProperty } from '@vodyani/swagger';

export class DefaultUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  public avatar?: Express.Multer.File;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }})
  public background?: Express.Multer.File[];
}
