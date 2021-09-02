export interface ICacheOptions {
  key: string;
  ttl: number;
  fileds: string[];
  type: 'client' | 'cluster';
}

export interface IMutexOptions {
  key: string;
  ttl: number;
  fileds: string[];
  errorCode?: number;
  errorMessage?: string;
}

export interface IHashCacheOptions {
  key: string;
  fileds: string[];
  hashKey: string;
  hashFileds: string[];
  type: 'client' | 'cluster';
}
