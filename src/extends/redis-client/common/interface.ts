export interface ICacheOptions {
  key: string;
  ttl: number;
}

export interface IMutexOptions {
  key: string;
  ttl: number;
  errorCode?: number;
  errorMessage?: string;
}

export interface IHashCacheOptions {
  key: string;
  hkey: string;
}
