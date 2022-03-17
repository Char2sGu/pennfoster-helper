import { Component, OnInit } from '@angular/core';
import { concatMap, forkJoin, of } from 'rxjs';

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
    const question$ = this.bridge.execute(
      () =>
        document.querySelector<HTMLSpanElement>('span.bordered-content')
          ?.innerText,
    );
    question$.subscribe((question) => {
      if (!question) return; // TODO
      this.question = question;
      forkJoin([
        this.weegy.ask(question),
        this.cache
          .read(question)
          .pipe(
            concatMap((results) =>
              results.length ? of(results) : this.weegyArchive.search(question),
            ),
          ),
      ]).subscribe(([onlineAnswer, archiveDialogs]) => {
        this.onlineAnswer = onlineAnswer;
        this.cache.write(question, archiveDialogs).subscribe();
        this.archiveDialogs = archiveDialogs;
        this.loading = false;
      });
    });
  }
}
