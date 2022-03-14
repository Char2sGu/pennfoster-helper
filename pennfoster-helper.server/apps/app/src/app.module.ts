import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { AnswersModule } from './answers/answers.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, AnswersModule],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
