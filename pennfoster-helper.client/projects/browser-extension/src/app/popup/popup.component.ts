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
import { concatMap, of } from 'rxjs';

import { Bridge } from '../core/bridge.service';
import { Cache } from '../core/cache.service';
import {
  WeegyArchive,
  WeegyArchiveDialog,
} from '../core/weegy-archive.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit, AfterViewInit {
  selectedIndex = 0;
  dialogs: WeegyArchiveDialog[] = [];
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

  get dialogCurrent(): WeegyArchiveDialog {
    return this.dialogs[this.dialogCurrentIndex];
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
    private bridge: Bridge,
    private weegyArchive: WeegyArchive,
    private cache: Cache,
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
    const question$ = this.bridge.execute(
      () =>
        document.querySelector<HTMLSpanElement>('span.bordered-content')
          ?.innerText,
    );
    question$.subscribe((question) => {
      if (!question) return; // TODO
      const $dialogs = this.cache
        .read(question)
        .pipe(
          concatMap((results) =>
            results.length ? of(results) : this.weegyArchive.search(question),
          ),
        );
      $dialogs.subscribe((dialogs) => {
        this.cache.write(question, dialogs).subscribe();
        this.dialogs = dialogs;
        this.loading = false;
      });
    });
  }
}
