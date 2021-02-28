import { Module } from '@nestjs/common';

import { OrderController } from './controller';
import { OrderService } from './service';
import { OrderDao } from './dao';

const controllers = [OrderController];
const services = [OrderService];
const daos = [OrderDao];

@Module({
  controllers,
  providers: [...services, ...daos],
})
export class OrderModule {}
