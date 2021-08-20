/**
 * 业务对象（Business Object - BO）
 * 指服务端在 Service 层处理逻辑后，对外输出的数据
 */

import { ApiProperty } from '@nestjs/swagger';

/**
 * 建议引入 Entity (ORM) 中定义的接口
 * 可以是 sequelize/mongoose/typeorm/或者其他提前定义好的拓展模块。
 */
import { IBook } from '@/extends/sequelize';

export class BookBO
implements IBook
{
  @ApiProperty({ name: 'name', type: String, required: true, example: 'chogath', description: '名字' })
  name: string;
}
