import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  tabs: TabInfo[] = [
    {
      name: 'Archives',
      icon: 'article',
      description: `Search for related historical conversations from Weegy's archives`,
      commands: ['archives'],
    },
    {
      name: 'Online',
      icon: 'question_answer',
      description: 'Start a new Weegy conversation and ask for answer',
      commands: ['online'],
    },
  ];
  tabActive = this.tabs[0];

  constructor() {}

  ngOnInit(): void {}
}

interface TabInfo {
  name: string;
  icon: string;
  description: string;
  commands: unknown[];
}
