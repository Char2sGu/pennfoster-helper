import { Injectable } from '@angular/core';
import { concatMapTo, from, map, Observable } from 'rxjs';

import { WeegyArchiveDialog } from './weegy-archive.service';

// actually the hash of the previous commit :]
const VERSION = 'e928811013709ccdb7d7adf41cd19bd851a3e599';

@Injectable({
  providedIn: 'root',
})
export class Cache {
  private readonly key = 'cache';
  private readonly initialize$: Observable<void>;

  constructor() {
    this.initialize$ = from(
      chrome.storage.local
        .get('version')
        .then(({ version }) => {
          if (version != VERSION) chrome.storage.local.clear();
        })
        .then(() => chrome.storage.local.set({ version: VERSION })),
    );
  }

  read(question: string): Observable<CacheData> {
    return this.initialize$.pipe(
      concatMapTo(from(chrome.storage.local.get(this.key))),
      map((results) => (results[this.key] as CacheData) ?? undefined),
      map((data) => (data?.question == question ? data : { question })),
    );
  }

  write(data: CacheData): Observable<void> {
    return this.initialize$.pipe(
      concatMapTo(from(chrome.storage.local.set({ [this.key]: data }))),
    );
  }
}

interface CacheData {
  question: string;
  answer?: string;
  archives?: WeegyArchiveDialog[];
}
