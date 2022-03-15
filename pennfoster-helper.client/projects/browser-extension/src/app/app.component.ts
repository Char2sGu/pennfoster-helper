import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { Bridge } from './core/bridge.service';
import { Weegy, WeegyDialog } from './core/weegy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  selectedIndex = 0;
  dialogs: WeegyDialog[] = [];
  dialogCurrentIndex = 0;

  @ViewChild('spinner')
  private spinnerTemplateRef!: TemplateRef<unknown>;
  private spinnerTemplatePortal!: TemplatePortal<unknown>;
  private spinnerOverlayRef!: OverlayRef;

  private _loading = true;
  public get loading(): boolean {
    return this._loading;
  }
  public set loading(v: boolean) {
    this._loading = v;
    if (this.loading) this.spinnerOverlayRef.attach(this.spinnerTemplatePortal);
    else this.spinnerOverlayRef.detach();
  }

  get dialogCurrent(): WeegyDialog {
    return this.dialogs[this.dialogCurrentIndex];
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
    private bridge: Bridge,
    private weegy: Weegy,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.spinnerOverlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
    });
    this.spinnerTemplatePortal = new TemplatePortal(
      this.spinnerTemplateRef,
      this.viewContainerRef,
    );

    this.loading = true;
    this.bridge
      .execute(
        () =>
          document.querySelector<HTMLSpanElement>('span.bordered-content')
            ?.innerText,
      )
      .subscribe((question) => {
        if (!question) return; // TODO
        this.weegy.search(question).subscribe((dialogs) => {
          this.dialogs = dialogs;
          this.loading = false;
        });
      });
  }
}
