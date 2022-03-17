import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  tabs: TabInfo[] = [
    { name: 'Archives', icon: 'article', commands: ['archives'] },
    { name: 'Online', icon: 'question_answer', commands: ['online'] },
  ];
  tabActive = this.tabs[0];

  constructor() {}

  ngOnInit(): void {}
}

interface TabInfo {
  name: string;
  icon: string;
  commands: unknown[];
}
