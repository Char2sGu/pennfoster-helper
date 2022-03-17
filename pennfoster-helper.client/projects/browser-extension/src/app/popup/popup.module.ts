import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MtxLoaderModule } from '@ng-matero/extensions/loader';

import { PaginatorModule } from '../components/paginator/paginator.module';
import { PopupComponent } from './popup.component';
import { PopupArchivesComponent } from './popup-archives/popup-archives.component';
import { PopupOnlineComponent } from './popup-online/popup-online.component';
import { PopupRoutingModule } from './popup-routing.module';

@NgModule({
  declarations: [PopupComponent, PopupArchivesComponent, PopupOnlineComponent],
  imports: [
    CommonModule,
    PopupRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MtxLoaderModule,
    PaginatorModule,
  ],
})
export class PopupModule {}
