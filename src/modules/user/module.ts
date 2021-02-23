import { Module } from '@nestjs/common';

import { UserController } from './controller';
import { UserService } from './service';
import { UserDao } from './dao';

const controllers = [UserController];
const services = [UserService];
const daos = [UserDao];

@Module({
  controllers,
  providers: [...services, ...daos],
})
export class UserModule {}
