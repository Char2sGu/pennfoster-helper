import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Element, load } from 'cheerio';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeegyService {
  constructor(private httpClient: HttpClient) {}

  search(keywords: string): Observable<WeegyDialog[]> {
    return this.httpClient
      .get('https://www.weegy.com/Home.aspx', {
        params: {
          ['Id']: 'ArchivePage',
          ['SpAccountId']: 'DANIELLE',
          ['SpCategory']: '',
          ['SpSubcategory']: '',
          ['SpKeywords']: keywords,
          ['SpPage']: 1,
        },
        responseType: 'text',
      })
      .pipe(
        map((html) => this.parseHtml(html)),
        map((results) => this.refineDialogs(results, 5)),
      );
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
      for (const el of $dialogContainer.contents().not('a')) {
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

  /**
   * Filter the dialogs and reserve only the best matched ones.
   * @param dialogs
   * @param size
   * @returns
   */
  private refineDialogs(dialogs: WeegyDialog[], size: number): WeegyDialog[] {
    const map = new Map<number, WeegyDialog[]>();
    dialogs.forEach((dialog) => {
      const listRaw = map.get(dialog.keywords);
      const list = listRaw ?? [];
      list.push(dialog);
      if (!listRaw) map.set(dialog.keywords, list);
    });
    const levels = [...map.keys()].sort().reverse(); // large -> small

    const results: WeegyDialog[] = [];
    for (const level of levels) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dialogs = map.get(level)!;
      results.push(...dialogs);
      if (results.length >= size) {
        results.length = size;
        break;
      }
    }
    return results;
  }
}

export interface WeegyDialog {
  question: string;
  answer: string;
  keywords: number;
}
