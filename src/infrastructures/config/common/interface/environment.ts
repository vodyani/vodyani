import { ENV } from '../enum';

export interface EnvironmentConfig {
  env: ENV;
  name: string;
  port: number;
}
