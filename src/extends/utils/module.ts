import { Module } from '@nestjs/common';

import { StreamProvider, CryptoProvider } from './provider';

@Module({
  exports: [
    StreamProvider,
    CryptoProvider,
  ],
  providers: [
    StreamProvider,
    CryptoProvider,
  ],
})
export class UtilsModule {}
