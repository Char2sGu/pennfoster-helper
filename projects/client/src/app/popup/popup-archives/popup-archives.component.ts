import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';

import { Cache } from '../../core/cache.service';
import { PageData } from '../../core/page-data.service';
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
  archives$!: Observable<WeegyArchiveDialog[]>;
  page = 1;

  constructor(
    private content: PageData,
    private cache: Cache,
    private weegyArchiveService: WeegyArchiveService,
  ) {}

  ngOnInit(): void {
    // TODO: flatten these shits
    this.archives$ = this.content.question$.pipe(
      switchMap((question) =>
        this.cache
          .read(question)
          .pipe(
            switchMap((data) =>
              data.archives?.length
                ? of(data.archives)
                : this.weegyArchiveService
                    .search(question)
                    .pipe(
                      tap((archives) =>
                        this.cache.write({ ...data, archives }),
                      ),
                    ),
            ),
          ),
      ),
    );
  }
}
