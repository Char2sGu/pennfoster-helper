import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { load } from 'cheerio';
import { map, Observable } from 'rxjs';

@Injectable()
export class WeegyService {
  constructor(private httpService: HttpService) {}

  search(question: string): Observable<WeegySearchResult[]> {
    return this.httpService
      .get('https://www.weegy.com/Home.aspx', {
        params: {
          ['Id']: 'ArchivePage',
          ['SpAccountId']: 'DANIELLE',
          ['SpCategory']: '',
          ['SpSubcategory']: '',
          ['SpKeywords']: question,
          ['SpPage']: 1,
        },
      })
      .pipe(map((response) => this.resolveHtml(response.data)));
  }

  private resolveHtml(html: string): WeegySearchResult[] {
    const $ = load(html);
    const results: WeegySearchResult[] = [];
    for (const $container of $('.ArchiveDiv1')) {
      const question = $('.InlineTitleLink', $container).text();
      let answer = '';
      for (const $fragment of $('.SearchBody', $container)
        .contents()
        // skip the `Weegy:` prefix and remove the `(More)` suffix
        .slice(1, -1)) {
        const text = $($fragment).text();
        if (text == 'User:') break; // ignore the user's extra questions
        answer += text;
      }
      answer = answer.trim();
      results.push({ question, answer });
    }
    return results;
  }
}

export interface WeegySearchResult {
  question: string;
  answer: string;
}
