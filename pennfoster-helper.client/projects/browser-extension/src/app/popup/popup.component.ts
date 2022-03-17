import { Component, OnInit } from '@angular/core';
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
export class PopupComponent implements OnInit {
  selectedIndex = 0;
  dialogs: WeegyArchiveDialog[] = [];
  dialogCurrentIndex = 0;
  loading = true;

  get dialogCurrent(): WeegyArchiveDialog {
    return this.dialogs[this.dialogCurrentIndex];
  }

  constructor(
    private bridge: Bridge,
    private weegyArchive: WeegyArchive,
    private cache: Cache,
  ) {}

  ngOnInit(): void {
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
