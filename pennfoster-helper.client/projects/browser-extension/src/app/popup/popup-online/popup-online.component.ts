import { Component, OnInit } from '@angular/core';
import { concatMap, of, tap } from 'rxjs';

import { Cache } from '../../core/cache.service';
import { PageContent } from '../../core/page-content.service';
import { WeegyService } from '../../core/weegy.service';

@Component({
  selector: 'app-popup-online',
  templateUrl: './popup-online.component.html',
  styleUrls: ['./popup-online.component.scss'],
})
export class PopupOnlineComponent implements OnInit {
  loading = true;
  question!: string;
  answer!: string;

  constructor(
    private pageContent: PageContent,
    private cache: Cache,
    private weegyService: WeegyService,
  ) {}

  ngOnInit(): void {
    // TODO: handle errors
    // TODO: write cache
    this.pageContent.question$
      .pipe(
        tap((question) => (this.question = question)),
        concatMap(() => this.cache.read(this.question)),
        concatMap((cache) =>
          cache?.answer
            ? of(cache.answer)
            : this.weegyService.ask(this.question),
        ),
        tap((answer) => (this.answer = answer)),
      )
      .subscribe(() => (this.loading = false));
  }
}
