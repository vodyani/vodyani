import { ENV } from '../enum';

export interface ProcessConfig {
  env: ENV;
  name: string;
  port: number;
}
