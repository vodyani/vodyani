import { Module } from '@nestjs/common';
import { SwaggerModule } from '@vodyani/swagger';

import { ConfigModule } from '@/infrastructures/config/module';
import { ConvertorModule } from '@/infrastructures/convertor/module';
import { LoggerModule } from '@/infrastructures/logger/module';
import { ValidatorModule } from '@/infrastructures/validator/module';
import { DefaultModule } from '@/modules/default/module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    ConvertorModule,
    ValidatorModule,
    SwaggerModule,
    DefaultModule,
  ],
})
export class Container {}
