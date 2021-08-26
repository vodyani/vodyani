import * as Form from 'form-data';
import * as Agent from 'agentkeepalive';

import { Stream } from 'stream';
import { AgentOptions } from 'http';
import { defaultsDeep } from 'lodash';
import { writeFileSync, existsSync } from 'fs';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export class BaseHttpClient {
  /** axios 客户端实例 */
  private client: AxiosInstance;

  /** Init AxiosInstance */
  public init(config: AxiosRequestConfig, agentOption?: AgentOptions) {
    config.timeout = config.timeout ? config.timeout : 15000;
    if (agentOption) config.httpAgent = new Agent(agentOption);
    this.client = axios.create(config);
  }

  /** Method GET */
  public get(url: string, config?: AxiosRequestConfig) {
    return this.client.get(url, config);
  }

  /** Method POST */
  public post(url: string, config?: AxiosRequestConfig) {
    return this.client.post(url, config);
  }

  /** Method PUT */
  public put(url: string, config?: AxiosRequestConfig) {
    return this.client.put(url, config);
  }

  /** Method Delete */
  public delete(url: string, config?: AxiosRequestConfig) {
    return this.client.delete(url, config);
  }

  /** Method Options */
  public options(url: string, config?: AxiosRequestConfig) {
    return this.client.options(url, config);
  }

  /** (GET) 发起请求，并获取 response body 中的指定参数，默认是 `data` */
  public async getData(url: string, config?: AxiosRequestConfig, key = 'data') {
    const response = await this.get(url, config);
    return response.data && response.data[key] ? response.data[key] : null;
  }

  /** (POST) 发起请求，并获取 response body 中的指定参数，默认是 `data` */
  public async postData(url: string, config?: AxiosRequestConfig, key = 'data') {
    const response = await this.post(url, config);
    return response.data && response.data[key] ? response.data[key] : null;
  }

  /** (PUT) 发起请求，并获取 response body 中的指定参数，默认是 `data` */
  public async putData(url: string, config?: AxiosRequestConfig, key = 'data') {
    const response = await this.put(url, config);
    return response.data && response.data[key] ? response.data[key] : null;
  }

  /** (POST) 发起表单请求 */
  public async formData(url: string, data: Record<string, any>, config: AxiosRequestConfig) {
    const form = new Form();

    const configs = defaultsDeep({ headers: form.getHeaders() }, config);

    Object.keys(data).forEach((key) => form.append(key, data[key]));

    const response = await this.client.post(url, form, configs);

    return response;
  }

  /** (GET) 发起请求, 将返回数据转换为 buffer */
  public async buffer(url: string, config?: AxiosRequestConfig) {
    const response = await this.get(
      url,
      defaultsDeep({ responseType: 'arraybuffer' }, config)
    );

    return response.data as Buffer;
  }

  /** (GET) 发起请求, 将返回数据转换为 stream */
  public async stream(url: string, config?: AxiosRequestConfig) {
    const response = await this.get(
      url,
      defaultsDeep({ responseType: 'stream' }, config)
    );

    return response.data as Stream;
  }

  /** (GET) 发起请求, 将返回数据转换为 base64 格式的字符串 */
  public async base64(url: string, config?: AxiosRequestConfig) {
    const data = await this.buffer(url, config);
    return data.toString('base64');
  }

  /** (GET) 发起请求，下载文件并存储到指定的路径下 */
  public async download(url: string, path: string, config?: AxiosRequestConfig) {
    if (!existsSync(path)) {
      throw new Error(`${path} 该路径不存在`);
    }

    const buffer = await this.buffer(url, config);
    writeFileSync(path, buffer, 'binary');
    return path;
  }
}
