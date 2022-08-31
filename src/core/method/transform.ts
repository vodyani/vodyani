import { camelCase, snakeCase } from 'lodash';
import { toDeepConvertProperty } from '@vodyani/utils';

export function toDeepSnakeCase(data: any) {
  return toDeepConvertProperty(data, snakeCase);
}

export function toDeepCamelCase(data: any) {
  return toDeepConvertProperty(data, camelCase);
}
