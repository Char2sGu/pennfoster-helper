import { Injectable } from '@angular/core';
import { concatMap, from, map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Bridge {
  private tab$ = from(
    chrome.tabs.query({ active: true, currentWindow: true }),
  ).pipe(
    map((tabs) => tabs[0] as Tab),
    shareReplay(1),
  );

  constructor() {}

  execute<ReturnValue extends Scalar>(
    func: () => ReturnValue,
  ): Observable<ReturnValue> {
    return this.tab$.pipe(
      concatMap((tab) =>
        from(
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func,
          }),
        ),
      ),
      map((results) => results[0].result),
    );
  }
}

type Scalar = string | number | boolean | null | undefined | void;

interface Tab extends chrome.tabs.Tab {
  id: number;
}
