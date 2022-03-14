import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { WeegyController } from './weegy.controller';
import { WeegyService } from './weegy.service';

@Module({
  imports: [HttpModule],
  providers: [WeegyService],
  exports: [WeegyService],
  controllers: [WeegyController],
})
export class WeegyModule {}
