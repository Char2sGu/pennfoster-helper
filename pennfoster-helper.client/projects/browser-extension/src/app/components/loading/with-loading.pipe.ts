import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';

@Pipe({
  name: 'withLoading',
})
export class WithLoadingPipe implements PipeTransform {
  transform<T>(source: Observable<T>): Observable<WithLoading<T>> {
    return source.pipe(
      map((value) => ({ loading: false, value })),
      startWith({ loading: true } as const),
    );
  }
}

export interface WithLoading<T> {
  loading: boolean;
  value?: T;
}
