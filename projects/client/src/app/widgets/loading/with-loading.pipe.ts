import { Pipe, PipeTransform } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';

@Pipe({
  name: 'withLoading',
})
export class WithLoadingPipe implements PipeTransform {
  transform<T>(source: Observable<T>): Observable<WithLoading<T>> {
    return source.pipe(
      map((value) => ({ loading: false, value })),
      startWith({ loading: true } as const),
      catchError(() => of({ loading: false })),
    );
  }
}

export interface WithLoading<T> {
  loading: boolean;
  value?: T;
}
