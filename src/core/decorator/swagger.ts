import { Type } from '@nestjs/common';
import { getArrayResponseVO, getPaginationResponseVO, getResponseVO } from '@vodyani/swagger';

import { ResponseBodyVO, ResponsePageVO } from '../struct';

export function ApiResponseVO(VO?: Type) {
  return getResponseVO(ResponseBodyVO)(VO);
}

export function ApiArrayResponseVO(VO?: Type) {
  return getArrayResponseVO(ResponseBodyVO)(VO);
}

export function ApiPaginationResponseVO(VO?: Type) {
  return getPaginationResponseVO(ResponseBodyVO, ResponsePageVO)(VO);
}
