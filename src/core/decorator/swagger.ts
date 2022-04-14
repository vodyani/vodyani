import {
  getApiResponseVo,
  getApiArrayResponseVo,
  getApiPaginationResponseVo,
} from '@vodyani/swagger';
import { Type } from '@nestjs/common';

import { PaginationResultVo, ResponseBodyVo } from '../vo';

export function ApiResponseVo<T extends Type<any>>(swaggerVo?: T) {
  return getApiResponseVo(ResponseBodyVo)(swaggerVo);
}

export function ApiArrayResponseVo<T extends Type<any>>(swaggerVo?: T) {
  return getApiArrayResponseVo(ResponseBodyVo)(swaggerVo);
}

export function ApiPaginationResponseVo<T extends Type<any>>(swaggerVo?: T) {
  return getApiPaginationResponseVo(ResponseBodyVo, PaginationResultVo)(swaggerVo);
}

