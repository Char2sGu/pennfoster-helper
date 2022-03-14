import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { CoreModule } from './core/core.module';
import { WeegyModule } from './weegy/weegy.module';

@Module({
  imports: [CoreModule, WeegyModule],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
