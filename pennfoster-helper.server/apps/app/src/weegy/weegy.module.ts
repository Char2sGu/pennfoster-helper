import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { WeegyService } from './weegy.service';
import { WeegyController } from './weegy.controller';

@Module({
  imports: [HttpModule],
  providers: [WeegyService],
  exports: [WeegyService],
  controllers: [WeegyController],
})
export class WeegyModule {}
