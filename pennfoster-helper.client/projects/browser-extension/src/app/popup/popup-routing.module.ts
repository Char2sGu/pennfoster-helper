import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PopupComponent } from './popup.component';
import { PopupArchivesComponent } from './popup-archives/popup-archives.component';
import { PopupOnlineComponent } from './popup-online/popup-online.component';

const routes: Routes = [
  {
    path: '',
    component: PopupComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'archives' },
      { path: 'archives', component: PopupArchivesComponent },
      { path: 'online', component: PopupOnlineComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupRoutingModule {}
