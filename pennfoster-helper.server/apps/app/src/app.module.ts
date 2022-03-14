import { Module } from '@nestjs/common';

import { AnswersModule } from './answers/answers.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, AnswersModule],
})
export class AppModule {}
