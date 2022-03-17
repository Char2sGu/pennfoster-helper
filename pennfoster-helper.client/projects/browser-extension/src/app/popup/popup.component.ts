import { Component, OnInit } from '@angular/core';
import { concatMap, filter, forkJoin, of, tap } from 'rxjs';

import { Bridge } from '../core/bridge.service';
import { Cache } from '../core/cache.service';
import { Weegy } from '../core/weegy.service';
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
  question!: string;
  onlineAnswer!: string;
  archiveDialogs: WeegyArchiveDialog[] = [];
  archiveDialogCurrentIndex = 0;
  loading = true;

  get archiveDialogCurrent(): WeegyArchiveDialog {
    return this.archiveDialogs[this.archiveDialogCurrentIndex];
  }

  constructor(
    private bridge: Bridge,
    private weegy: Weegy,
    private weegyArchive: WeegyArchive,
    private cache: Cache,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.bridge
      .execute(
        () =>
          document.querySelector<HTMLSpanElement>('span.bordered-content')
            ?.innerText,
      )
      .pipe(
        filter((question): question is string => !!question),
        tap((question) => (this.question = question)),
        concatMap(() => this.cache.read(this.question)),
        concatMap((cacheData) =>
          cacheData
            ? of([cacheData.answer, cacheData.archives] as const)
            : forkJoin([
                this.weegy.ask(this.question),
                this.weegyArchive.search(this.question),
              ]),
        ),
      )
      .subscribe(([answer, archives]) => {
        this.cache.write({ question: this.question, answer, archives });
        this.onlineAnswer = answer;
        this.archiveDialogs = archives;
        this.loading = false;
      });
  }
}
