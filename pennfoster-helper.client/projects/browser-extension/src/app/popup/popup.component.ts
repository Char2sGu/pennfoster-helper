import { Component, OnInit } from '@angular/core';
import { concatMap, forkJoin, of, tap } from 'rxjs';

import { Cache } from '../core/cache.service';
import { PageContent } from '../core/page-content.service';
import { WeegyService } from '../core/weegy.service';
import {
  WeegyArchiveDialog,
  WeegyArchiveService,
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
    private content: PageContent,
    private weegy: WeegyService,
    private weegyArchive: WeegyArchiveService,
    private cache: Cache,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.content.question$
      .pipe(
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
