import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PaginatorModule } from '../components/paginator/paginator.module';
import { PopupComponent } from './popup.component';
import { PopupRoutingModule } from './popup-routing.module';

@NgModule({
  declarations: [PopupComponent],
  imports: [
    CommonModule,
    PopupRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    OverlayModule,
    PortalModule,
    PaginatorModule,
  ],
})
export class PopupModule {}
