import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { WeegyService } from './weegy/weegy.service';

@Module({
  imports: [HttpModule],
  providers: [WeegyService],
  exports: [WeegyService],
})
export class WeegyModule {}
