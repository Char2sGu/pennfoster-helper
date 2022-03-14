import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';

import { WeegyDialog, WeegyService } from './weegy.service';

@Controller('weegy')
export class WeegyController {
  constructor(private weegyService: WeegyService) {}

  @Get()
  search(@Query('keywords') keywords: string): Observable<WeegyDialog[]> {
    return this.weegyService.search(keywords);
  }
}
