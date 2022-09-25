import { Type } from '@nestjs/common';
import { getArrayResponseVo, getPaginationResponseVo, getResponseVo } from '@vodyani/swagger';

import { PageVo, ResponseBodyVo } from '../vo';

export function ApiResponseVo(Vo?: Type) {
  return getResponseVo(ResponseBodyVo)(Vo);
}

export function ApiArrayResponseVo(Vo?: Type) {
  return getArrayResponseVo(ResponseBodyVo)(Vo);
}

export function ApiPaginationResponseVo(Vo?: Type) {
  return getPaginationResponseVo(ResponseBodyVo, PageVo)(Vo);
}
