import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  tabs: TabInfo[] = [
    { name: 'Archives', commands: ['archives'] },
    { name: 'Online', commands: ['online'] },
  ];
  tabActive = this.tabs[0];

  constructor() {}

  ngOnInit(): void {}
}

interface TabInfo {
  name: string;
  commands: unknown[];
}
