import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';

import { WeegyDialog } from './weegy.service';

@Injectable({
  providedIn: 'root',
})
export class Cache {
  private readonly key = 'cache';

  constructor() {}

  read(question: string): Observable<WeegyDialog[]> {
    return from(chrome.storage.local.get(this.key)).pipe(
      map((results) => results[this.key] as CacheData | undefined),
      map((data) => (data && data.question == question ? data.dialogs : [])),
    );
  }

  write(question: string, dialogs: WeegyDialog[]): Observable<void> {
    const data: CacheData = { question, dialogs };
    return from(chrome.storage.local.set({ [this.key]: data }));
  }
}

interface CacheData {
  question: string;
  dialogs: WeegyDialog[];
}