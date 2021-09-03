import { Injectable } from '@nestjs/common';

/** 普通提供者 */
@Injectable()
export class RedisUtilsProvider {
  /**
   * 根据给定的规则和数据来源，拼接成完整的 key 值
   * @param key 匹配规则，需要匹配的参数使用 `{id}` 封装
   * @param data 匹配数据来源，通常是 `Object` 类型
   * @example matchKey('demo:{id}', { id: 1 }) => demo:1
   */
  public matchKey(key: string, data: Record<string, any>) {
    if (!key) return null;

    let result = null;
    const list = [] as string [];
    const match = key.match(/\{(.+?)\}/g);

    // 必须有匹配结果，否则则认为匹配失败，缺少参数值
    if (!match) return result;

    // 匹配数据源中，是否有指定的参数
    match.forEach(e => {
      const key = e.replace('{', '').replace('}', '');
      if (data[key]) list.push(key);
    });

    // 指定的参数, 必须全部匹配到，否则则认为匹配失败，缺少参数值
    if (list.length !== match.length) return result;

    // 将参数拼接到原有规则中
    list.forEach(item => {
      result = key.replace(item, data[item]);
    });

    // 去掉规则中的 `{}`，返回完整 key 值
    return result.replace('{', '').replace('}', '');
  }
}
