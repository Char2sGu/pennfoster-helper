import { Component, OnInit } from '@angular/core';

import { Bridge } from './core/bridge.service';
import { Weegy, WeegyDialog } from './core/weegy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  dialogs: WeegyDialog[] = [];

  constructor(private bridge: Bridge, private weegy: Weegy) {}

  ngOnInit(): void {
    this.bridge
      .execute(
        () =>
          document.querySelector<HTMLSpanElement>('span.bordered-content')
            ?.innerText,
      )
      .subscribe((question) => {
        if (question)
          this.weegy
            .search(question)
            .subscribe((dialogs) => (this.dialogs = dialogs));
      });
  }
}
