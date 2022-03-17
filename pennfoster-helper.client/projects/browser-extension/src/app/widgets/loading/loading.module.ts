import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WithLoadingPipe } from './with-loading.pipe';

@NgModule({
  declarations: [WithLoadingPipe],
  imports: [CommonModule],
  exports: [WithLoadingPipe],
})
export class LoadingModule {}
