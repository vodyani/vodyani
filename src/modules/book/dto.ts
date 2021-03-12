import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class BookDto {
  @ApiProperty({ name: 'title', type: String, required: false, description: 'title' })
  title?: string;

  @ApiProperty({ name: 'auther', type: String, required: false, description: 'auther' })
  auther?: string;
}

export class FindBookDto extends BookDto {
  @ApiProperty({ name: 'id', type: String, required: false, description: 'id' })
  id?: string;
}

export class FindBookPaginationDto extends BookDto {
  @ApiProperty({ name: 'id', type: String, required: false, description: 'id' })
  id?: string;

  @ApiProperty({ name: 'order', type: String, required: false, description: 'order' })
  order?: string;

  @ApiProperty({ name: 'page', type: String, required: false, description: 'page' })
  page?: string;

  @ApiProperty({ name: 'pageSize', type: String, required: false, description: 'pageSize' })
  pageSize?: string;
}

export class UpdateBookDto extends BookDto {
  @ApiProperty({ name: 'details', type: String, required: false, description: 'details' })
  details?: string;

  @IsNotEmpty({ message: 'id is not allowed to be null' })
  @ApiProperty({ name: 'id', type: Number, required: true, description: 'id' })
  id: number;
}

export class CreateBookDto {
  @IsNotEmpty({ message: 'title is not allowed to be null' })
  @ApiProperty({ name: 'title', type: String, required: true, description: 'title' })
  title: string;

  @IsNotEmpty({ message: 'auther is not allowed to be null' })
  @ApiProperty({ name: 'auther', type: String, required: true, description: 'auther' })
  auther: string;

  @IsNotEmpty({ message: 'details is not allowed to be null' })
  @ApiProperty({ name: 'details', type: String, required: true, description: 'details' })
  details: string;
}
