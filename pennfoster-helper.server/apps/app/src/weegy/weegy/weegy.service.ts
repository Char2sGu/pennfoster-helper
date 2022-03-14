import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { load } from 'cheerio';
import { map, Observable } from 'rxjs';

@Injectable()
export class WeegyService {
  constructor(private httpService: HttpService) {}

  search(keywords: string): Observable<WeegyDialog[]> {
    return this.httpService
      .get('https://www.weegy.com/Home.aspx', {
        params: {
          ['Id']: 'ArchivePage',
          ['SpAccountId']: 'DANIELLE',
          ['SpCategory']: '',
          ['SpSubcategory']: '',
          ['SpKeywords']: keywords,
          ['SpPage']: 1,
        },
      })
      .pipe(map((response) => this.parseHtml(response.data)));
  }

  private parseHtml(html: string): WeegyDialog[] {
    const $ = load(html);
    const results: WeegyDialog[] = [];
    for (const $container of $('.ArchiveDiv1')) {
      const title = $('.InlineTitleLink', $container).text();
      let dialogsText = $('.SearchBody', $container).contents().not('a').text(); // `a` refers to the `(More)` element
      dialogsText = `User: ${title} ` + dialogsText; // add back the title question.
      const dialogFragments = dialogsText.split(/User:|Weegy:/).slice(1); // the item at index `0` is an empty string
      const dialogs = dialogFragments.reduce<Partial<WeegyDialog>[]>(
        (dialogs, fragment, index) => {
          fragment = fragment.trim();
          const isQuestion = !(index % 2);
          if (isQuestion) {
            dialogs[index] = { question: fragment };
          } else {
            dialogs[index - 1].answer = fragment;
          }
          return dialogs;
        },
        [],
      );
      results.push(...(dialogs as WeegyDialog[]));
    }
    return results;
  }
}

export interface WeegyDialog {
  question: string;
  answer: string;
}
