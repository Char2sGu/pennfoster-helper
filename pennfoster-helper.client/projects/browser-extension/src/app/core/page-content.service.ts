import { Injectable } from '@angular/core';
import { filter, Observable, shareReplay } from 'rxjs';

import { Bridge } from './bridge.service';

@Injectable({
  providedIn: 'root',
})
export class PageContent {
  question$: Observable<string>;

  constructor(private bridge: Bridge) {
    this.question$ = this.bridge
      .execute(
        () =>
          document.querySelector<HTMLSpanElement>('span.bordered-content')
            ?.innerText,
      )
      .pipe(
        filter((v): v is string => !!v),
        shareReplay(1),
      );
  }
}
