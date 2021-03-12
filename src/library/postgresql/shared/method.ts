import { Order } from './type';
import { FindPaginationOptions, PaginationResult } from './interface';

export async function findPagination<T = any>(
  options: FindPaginationOptions,
)
  : Promise<PaginationResult<T>>
{
  const { pagination } = options;
  const page = pagination && pagination.page ? Number(pagination.page) : 1;
  const order = pagination && pagination.order ? pagination.order : 'id DESC';
  const pageSize = pagination && pagination.pageSize ? Number(pagination.pageSize) : 10;

  options.limit = pageSize;
  options.offset = (page - 1) * pageSize;
  options.order = ([order.split(' ')] as Order);

  const result = { rows: [], pagination: { page, pageSize, pageCount: 0, count: 0 }};
  const data = await this.findAndCountAll(options);

  if (data) {
    result.rows = data.rows;
    result.pagination.count = data.count;
    result.pagination.pageCount = Math.floor((data.count - 1) / pageSize) + 1;
  }
  return result;
}
