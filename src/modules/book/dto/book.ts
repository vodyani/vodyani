/**
 * 数据传输对象（Data Transger Object - DTO）
 * 指服务端请求过程中的数据载体
 */

import { IsNotEmpty } from 'class-validator';
import { HttpRequestPageDTO } from '@/extends/swagger';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

/**
 * 建议引入 Entity (ORM) 中定义的接口
 * 可以是 sequelize/mongoose/typeorm/或者其他提前定义好的拓展模块。
 */
import { IBook } from '@/extends/sequelize';

/** 分页查询 */
export class PaginatedBookDTO
  extends HttpRequestPageDTO
  implements IBook
{
  @ApiProperty({ name: 'name', type: String, required: false, example: 'chogath', description: '名字' })
  name?: string;
}

/** 单条/多条查询 */
export class FindBookDTO
  extends OmitType(
    PaginatedBookDTO,
    ['index', 'size', 'orderBy', 'orderRule'],
  )
  implements IBook
{}

/** 创建 */
export class CreateBookDTO
implements IBook
{
  @IsNotEmpty()
  @ApiProperty({ name: 'name', type: String, required: true, example: 'chogath', description: '名字' })
  name: string;
}

/** 更新 */
export class UpdateBookDTO
  extends PartialType(CreateBookDTO)
  implements IBook
{}
