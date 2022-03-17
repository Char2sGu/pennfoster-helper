import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { Bridge } from './bridge.service';

@Injectable({
  providedIn: 'root',
})
export class PageContent {
  question$: Observable<string | undefined>;

  constructor(private bridge: Bridge) {
    this.question$ = this.bridge
      .execute(
        () =>
          document.querySelector<HTMLSpanElement>('span.bordered-content')
            ?.innerText,
      )
      .pipe(shareReplay(1));
  }
}
