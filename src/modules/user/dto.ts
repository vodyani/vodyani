import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name is not allowed to be null' })
  @ApiProperty({
    name: 'name',
    type: String,
    required: true,
    description: 'user name',
  })
  name: string;

  @IsNotEmpty({ message: 'email is not allowed to be null' })
  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    description: 'user email',
  })
  email: string;

  @IsNotEmpty({ message: 'phone is not allowed to be null' })
  @ApiProperty({
    name: 'phone',
    type: String,
    required: true,
    description: 'user phone',
  })
  phone: string;
}

export class UpdateUserDto extends CreateUserDto {
  @IsNotEmpty({ message: 'id is not allowed to be null' })
  @ApiProperty({
    name: 'id',
    type: Number,
    required: true,
    description: 'user id',
  })
  id: number;
}

export class FindUserDto {
  @IsNotEmpty({ message: 'id is not allowed to be null' })
  @ApiProperty({
    name: 'id',
    type: Number,
    required: true,
    description: 'user id',
  })
  id: number;
}
