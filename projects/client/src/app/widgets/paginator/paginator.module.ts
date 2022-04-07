import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
