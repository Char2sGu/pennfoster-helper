import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';

import { Cache } from '../../core/cache.service';
import { PageData } from '../../core/page-data.service';
import { WeegyService } from '../../core/weegy.service';

@Component({
  selector: 'app-popup-online',
  templateUrl: './popup-online.component.html',
  styleUrls: ['./popup-online.component.scss'],
})
export class PopupOnlineComponent implements OnInit {
  question$!: Observable<string>;
  answer$!: Observable<string>;

  constructor(
    private content: PageData,
    private cache: Cache,
    private weegyService: WeegyService,
  ) {}

  ngOnInit(): void {
    this.question$ = this.content.question$;
    // TODO: flatten the mess
    this.answer$ = this.question$.pipe(
      switchMap((question) =>
        this.cache
          .read(question)
          .pipe(
            switchMap((data) =>
              data.answer
                ? of(data.answer)
                : this.weegyService
                    .ask(question)
                    .pipe(
                      tap((answer) => this.cache.write({ ...data, answer })),
                    ),
            ),
          ),
      ),
    );
  }
}
