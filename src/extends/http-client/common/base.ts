import * as Form from 'form-data';
import * as Agent from 'agentkeepalive';

import { Stream } from 'stream';
import { AgentOptions } from 'http';
import { defaultsDeep } from 'lodash';
import { writeFileSync, existsSync } from 'fs';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

export abstract class BaseHttpClient {
  private client: AxiosInstance;

  /** 动态地根据配置信息拼接 URL */
  protected abstract getURL(url: string): string

  /** Init AxiosInstance */
  public constructor(config?: AxiosRequestConfig, agentOption?: AgentOptions) {
    const setting: AxiosRequestConfig = {
      timeout: config && config.timeout ? config.timeout : 15000,
    };

    if (agentOption) config.httpAgent = new Agent(agentOption);

    this.client = axios.create(setting);
  }

  /** Method GET */
  public async get(url: string, config?: AxiosRequestConfig) {
    try {
      const result = await this.client.get(this.getURL(url), config);
      return result;
    } catch (error) {
      if (error.isAxiosError) {
        return error.response as AxiosResponse<any>;
      } else {
        return null;
      }
    }
  }

  /** Method POST */
  public async post(url: string, config?: AxiosRequestConfig) {
    try {
      const result = await this.client.post(this.getURL(url), config);
      return result;
    } catch (error) {
      if (error.isAxiosError) {
        return error.response as AxiosResponse<any>;
      } else {
        return null;
      }
    }
  }

  /** Method PUT */
  public async put(url: string, config?: AxiosRequestConfig) {
    try {
      const result = await this.client.put(this.getURL(url), config);
      return result;
    } catch (error) {
      if (error.isAxiosError) {
        return error.response as AxiosResponse<any>;
      } else {
        return null;
      }
    }
  }

  /** Method Delete */
  public async delete(url: string, config?: AxiosRequestConfig) {
    try {
      const result = await this.client.delete(this.getURL(url), config);
      return result;
    } catch (error) {
      if (error.isAxiosError) {
        return error.response as AxiosResponse<any>;
      } else {
        return null;
      }
    }
  }

  /** Method Options */
  public async options(url: string, config?: AxiosRequestConfig) {
    try {
      const result = await this.client.options(this.getURL(url), config);
      return result;
    } catch (error) {
      if (error.isAxiosError) {
        return error.response as AxiosResponse<any>;
      } else {
        return null;
      }
    }
  }

  /** (GET) 发起请求，并获取 response body 中的指定参数，默认是 `data` */
  public async getData(url: string, config?: AxiosRequestConfig, key = 'data') {
    const response = await this.get(this.getURL(url), config);
    return response && response.data && response.data[key] ? response.data[key] : null;
  }

  /** (POST) 发起请求，并获取 response body 中的指定参数，默认是 `data` */
  public async postData(url: string, config?: AxiosRequestConfig, key = 'data') {
    const response = await this.post(this.getURL(url), config);
    return response && response.data && response.data[key] ? response.data[key] : null;
  }

  /** (PUT) 发起请求，并获取 response body 中的指定参数，默认是 `data` */
  public async putData(url: string, config?: AxiosRequestConfig, key = 'data') {
    const response = await this.put(this.getURL(url), config);
    return response && response.data && response.data[key] ? response.data[key] : null;
  }

  /** (POST) 发起表单请求 */
  public async formData(url: string, data: Record<string, any>, config: AxiosRequestConfig) {
    const form = new Form();

    const configs = defaultsDeep({ headers: form.getHeaders() }, config);
    Object.keys(data).forEach((key) => form.append(key, data[key]));

    const response = await this.client.post(this.getURL(url), form, configs);
    return response;
  }

  /** (GET) 发起请求, 将返回数据转换为 buffer */
  public async buffer(url: string, config?: AxiosRequestConfig) {
    const response = await this.get(
      url,
      defaultsDeep({ responseType: 'arraybuffer' }, config)
    );

    if (!response) return null;
    return response.data as Buffer;
  }

  /** (GET) 发起请求, 将返回数据转换为 stream */
  public async stream(url: string, config?: AxiosRequestConfig) {
    const response = await this.get(
      url,
      defaultsDeep({ responseType: 'stream' }, config)
    );

    if (!response) return null;
    return response.data as Stream;
  }

  /** (GET) 发起请求, 将返回数据转换为 base64 格式的字符串 */
  public async base64(url: string, config?: AxiosRequestConfig) {
    const data = await this.buffer(this.getURL(url), config);

    if (!data) return null;
    return data.toString('base64');
  }

  /** (GET) 发起请求，下载文件并存储到指定的路径下 */
  public async download(url: string, path: string, config?: AxiosRequestConfig) {
    if (!existsSync(path)) {
      throw new Error(`${path} 该路径不存在`);
    }

    const buffer = await this.buffer(this.getURL(url), config);

    if (!buffer) return null;

    writeFileSync(path, buffer, 'binary');
    return path;
  }
}
