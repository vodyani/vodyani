import { Injectable } from '@nestjs/common';

/** Url 提供者 */
@Injectable()
export class UrlProvider {
  /**
   * 添加协议头 并移除尾部的 `/` 符号
   * @param url
   *
   * @example addProtocol('127.0.0.1:3000')         -> http://127.0.0.1:3000
   * @example addProtocol('some.domain.com')         -> http://some.domain.com
   * @example addProtocol('http://some.domain.com') -> http://some.domain.com
   * @example addProtocol('https://some.domain.com/') -> https://some.domain.com
   */
  public addProtocol(url: string) {
    return this.removeBorder(url.replace(/^(http(s)?:\/\/)?/, 'http$2://'));
  }

  /**
   * 移除前后的 `/`
   * @param url
   *
   * @example removeBorderSlash('/a/b')   -> 'a/b'
   * @example removeBorderSlash('/a/b/')  -> 'a/b'
   * @example removeBorderSlash('a/b')    -> 'a/b'
   */
  public removeBorder(url: string) {
    return url.replace(/^\/|\/$/g, '');
  }

  /**
   * 合并多段 URL
   * @param  {...any} path
   *
   * @example joinUrlPath('http://baidu.com/', '/a/b')  -> 'http://baidu.com/a/b'
   * @example joinUrlPath('http://baidu.com/', 'a/b/')  -> 'http://baidu.com/a/b'
   * @example joinUrlPath('http://baidu.com', 'a/b')    -> 'http://baidu.com/a/b'
   * @example joinUrlPath(['http://baidu.com', 'a/b'])  -> 'http://baidu.com/a/b'
   */
  public joinPath(...path: string[]) {
    return [].concat(...path).map(this.removeBorder).join('/');
  }

  /**
   * 按 `:` 切割 path 获取对应的 host & port
   * @param url
   *
   * @example splitPath('127.0.0.1:3000') -> { host: '127.0.0.1', port: 3000 }
   */
  public splitPath(path: string) {
    if (!path) return { host: path, port: 0 };
    if (!path.includes(':')) return { host: path, port: 0 };

    const [host, port] = path.split(':');

    return {
      host: host || '',
      port: port && Number(port) > 0 ? Number(port) : 0,
    };
  }
}
