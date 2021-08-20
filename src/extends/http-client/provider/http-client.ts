import * as fs from 'fs';
import * as Http from 'http';
import * as Form from 'form-data';

import { Stream } from 'stream';
import { defaultsDeep } from 'lodash';
import { stringify } from 'querystring';
import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { IRequestOption, IRequestFormOption } from '../common';

@Injectable()
export class HttpClientProvider {
  private agent: Http.Agent;

  constructor() {
    this.agent = new Http.Agent({ keepAlive: true });
  }

  public getAgent() {
    return this.agent;
  }

  /** 将 query 对象进行序列化 */
  public transformQuery(url: string, query: Record<string, any>) {
    if (!query) return url;

    const baseUrl = url && !url.includes('?') ? `${url}?` : `${url}&`;

    return `${baseUrl}${stringify(query)}`;
  }

  /** 发起请求 */
  public async request <T = any>(option: IRequestOption) {
    if (!option || !option.url) return null;

    const response: AxiosResponse<T> = await axios({
      ...option,
      url: this.transformQuery(option.url, option.query),
    });

    return response;
  }

  /** 发起 POST FORM DATA 请求 */
  public async formRequest <T = any>(option: IRequestFormOption) {
    if (!option || !option.url || !option.data) return null;

    const form = new Form();

    const { url, query, data, config } = option;

    Object.keys(data).forEach((key) => form.append(key, data[key]));

    const response: AxiosResponse<T> = await axios.post(
      this.transformQuery(url, query),
      form,
      defaultsDeep({ headers: form.getHeaders() }, config)
    );

    return response;
  }

  /** 发起请求, 将返回数据转换为 buffer */
  public async bufferRequest(url: string, config?: AxiosRequestConfig) {
    if (!url) return null;

    const response: AxiosResponse<Buffer> = await axios({
      ...config,
      responseType: 'arraybuffer',
      url,
    });

    return response.data;
  }

  /** 发起请求, 将返回数据转换为可读写 stream */
  public async streamRequest(url: string, config?: AxiosRequestConfig) {
    if (!url) return null;
    const response: AxiosResponse<Stream> = await axios({
      ...config,
      responseType: 'stream',
      url,
    });

    return response.data;
  }

  /** 发起下载请求，并存储到指定的绝对路径 */
  public async downloadRequest(
    url: string,
    path: string,
    isStream = false,
    config?: AxiosRequestConfig,
  ) {
    if (!url || !path) return null;

    /** 流式传输 */
    if (isStream) {
      const stream = await this.streamRequest(url, config);

      await new Promise((resolve, reject) => {
        const writeStream = stream.pipe(fs.createWriteStream(path));
        writeStream.on('error', (error) => reject(error));
        writeStream.on('finish', () => resolve(null));
      });
    }

    /** buffer 写入 */
    else {
      const buffer = await this.bufferRequest(url, config);
      fs.writeFileSync(path, buffer, 'binary');
    }

    return path;
  }
}
