import { toDeepConvertProperty } from '@vodyani/utils';
import { camelCase, snakeCase } from 'lodash';

export function toDeepSnakeCase(data: any) {
  return toDeepConvertProperty(data, snakeCase);
}

export function toDeepCamelCase(data: any) {
  return toDeepConvertProperty(data, camelCase);
}
