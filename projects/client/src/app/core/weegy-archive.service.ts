import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Element, load } from 'cheerio';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeegyArchiveService {
  constructor(private httpClient: HttpClient) {}

  search(keywords: string): Observable<WeegyArchiveDialog[]> {
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
        map((results) => results.sort((a, b) => b.keywords - a.keywords)),
      );
  }

  /**
   * Parse the HTML of Weegy's search result page and extract dialogs that
   * matched the search keywords.
   * @param html
   * @returns
   */
  private parseHtml(html: string): WeegyArchiveDialog[] {
    const $ = load(html);
    const results: WeegyArchiveDialog[] = [];

    for (const $container of $('.ArchiveDiv1')) {
      const $title = $('.InlineTitleLink', $container);
      const $dialogContainer = $('.SearchBody', $container);
      $dialogContainer.prepend('<b>User:</b>', $title.contents()); // normalize the title question

      const dialogsMatchedKeywords: WeegyArchiveDialog[] = [];
      const initDialog = () => ({ question: '', answer: '', keywords: 0 });
      let currentDialog: WeegyArchiveDialog = initDialog();
      let currentDialogKey: 'question' | 'answer' = 'question';
      const collect = () => {
        if (!currentDialog.keywords) return;
        currentDialog.question = currentDialog.question.trim();
        currentDialog.answer = currentDialog.answer.trim();
        if (!currentDialog.answer) return;
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
}

export interface WeegyArchiveDialog {
  question: string;
  answer: string;
  keywords: number;
}
