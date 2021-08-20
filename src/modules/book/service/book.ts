/**
 * 业务逻辑处理层（Service）
 */

import { Injectable } from '@nestjs/common';

/**
 * 建议引入 Entity (ORM) 中定义的实体类来实现数据持久化
 * 可以是 sequelize/mongoose/typeorm/或者其他提前定义好的拓展模块。
 */
import { Book } from '@/extends/sequelize';

import { CreateBookDTO, FindBookDTO, PaginatedBookDTO, UpdateBookDTO } from '../dto';

@Injectable()
export class BookService {
  /** 单条查询 */
  public async findOne(dto: FindBookDTO) {
    const { condition } = Book.getConditionByDTO(dto);
    const result = await Book.findOne({ where: condition });
    return result;
  }

  /** 多条查询 */
  public async findAll(dto: FindBookDTO) {
    const { condition } = Book.getConditionByDTO(dto);
    const result = await Book.findAll({ where: condition });
    return result;
  }

  /** 分页查询 */
  public async paginated(dto: PaginatedBookDTO) {
    const { condition, page } = Book.getConditionByDTO(dto);
    const result = await Book.paginated({ page, where: condition });
    return result;
  }

  /** 创建 */
  public async create(dto: CreateBookDTO) {
    const { entity } = Book.getEntityByDTO(dto);
    const result = await Book.create(entity);
    return result;
  }

  /** 更新 */
  public async update(id: string, dto: UpdateBookDTO) {
    const { entity } = Book.getEntityByDTO(dto);
    await Book.update(entity, { where: { id }});
  }

  /** 按主键ID删除 */
  public async delete(id: string) {
    await Book.destroy({ where: { id }});
  }
}
