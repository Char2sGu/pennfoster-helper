import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Element, load } from 'cheerio';
import { readFileSync } from 'fs';
import { map, Observable } from 'rxjs';

@Injectable()
export class WeegyService {
  constructor(private httpService: HttpService) {
    this.parseHtml(readFileSync('weegy.html', { encoding: 'utf8' }));
  }

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

  /**
   * Parse the HTML of Weegy's search result page and extract dialogs that
   * matched the search keywords.
   * @param html
   * @returns
   */
  private parseHtml(html: string): WeegyDialog[] {
    const $ = load(html);
    const results: WeegyDialog[] = [];

    for (const $container of $('.ArchiveDiv1')) {
      const $title = $('.InlineTitleLink', $container);
      const $dialogContainer = $('.SearchBody', $container);
      $dialogContainer.prepend('<b>User:</b>', $title.contents()); // normalize the title question

      const dialogsMatchedKeywords: WeegyDialog[] = [];
      const initDialog = () => ({ question: '', answer: '', keywords: 0 });
      let currentDialog: WeegyDialog = initDialog();
      let currentDialogKey: 'question' | 'answer' = 'question';
      const collect = () => {
        if (!currentDialog.keywords) return;
        currentDialog.question = currentDialog.question.trim();
        currentDialog.answer = currentDialog.answer.trim();
        dialogsMatchedKeywords.push(currentDialog);
      };
      for (const el of $dialogContainer.contents()) {
        const $fragment = $(el as Element);
        const isStarter = $fragment[0].tagName == 'b';
        if (isStarter) {
          if ($fragment.text() == 'User:') {
            currentDialogKey = 'question';
            collect();
            currentDialog = initDialog();
          } else {
            currentDialogKey = 'answer';
          }
        } else {
          const isHighlighted = $fragment[0].tagName == 'span';
          if (currentDialogKey == 'question' && isHighlighted)
            currentDialog.keywords++;
          currentDialog[currentDialogKey] += $fragment.text();
        }
      }
      collect();

      results.push(...dialogsMatchedKeywords);
    }

    return results;
  }
}

export interface WeegyDialog {
  question: string;
  answer: string;
  keywords: number;
}
