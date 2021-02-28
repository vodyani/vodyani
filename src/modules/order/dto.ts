import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'source is not allowed to be null' })
  @ApiProperty({
    name: 'source',
    type: String,
    required: true,
    description: 'source',
  })
  source: string;

  @IsNotEmpty({ message: 'code is not allowed to be null' })
  @ApiProperty({
    name: 'code',
    type: String,
    required: true,
    description: 'code',
  })
  code: string;
}

export class UpdateOrderDto extends CreateOrderDto {
  @IsNotEmpty({ message: 'id is not allowed to be null' })
  @ApiProperty({
    name: 'id',
    type: Number,
    required: true,
    description: 'id',
  })
  id: number;
}

export class FindOrderDto {
  @IsNotEmpty({ message: 'id is not allowed to be null' })
  @ApiProperty({
    name: 'id',
    type: Number,
    required: true,
    description: 'id',
  })
  id: number;
}
