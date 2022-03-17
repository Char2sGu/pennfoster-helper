import { Component, OnInit } from '@angular/core';
import { concatMap, of, tap } from 'rxjs';

import { Cache } from '../../core/cache.service';
import { PageContent } from '../../core/page-content.service';
import {
  WeegyArchiveDialog,
  WeegyArchiveService,
} from '../../core/weegy-archive.service';

@Component({
  selector: 'app-popup-archives',
  templateUrl: './popup-archives.component.html',
  styleUrls: ['./popup-archives.component.scss'],
})
export class PopupArchivesComponent implements OnInit {
  loading = true;
  question!: string;
  page = 1;
  archives: WeegyArchiveDialog[] = [];

  get archiveCurrent(): WeegyArchiveDialog | undefined {
    return this.archives[this.page - 1];
  }

  constructor(
    private pageContent: PageContent,
    private cache: Cache,
    private weegyArchiveService: WeegyArchiveService,
  ) {}

  ngOnInit(): void {
    // TODO: handle errors
    // TODO: write cache
    this.pageContent.question$
      .pipe(
        tap((question) => (this.question = question)),
        concatMap(() => this.cache.read(this.question)),
        concatMap((cacheData) =>
          cacheData?.archives?.length
            ? of(cacheData.archives)
            : this.weegyArchiveService.search(this.question),
        ),
        tap((archives) => (this.archives = archives)),
      )
      .subscribe(() => (this.loading = false));
  }
}
