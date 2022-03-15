import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Bridge {
  private tab!: Tab;

  constructor() {}

  async execute<ReturnValue extends Scalar>(
    func: () => ReturnValue,
  ): Promise<ReturnValue> {
    await this.init();
    return await chrome.scripting
      .executeScript({ target: { tabId: this.tab.id }, func })
      .then(([result]) => result.result);
  }

  private async init(): Promise<void> {
    if (this.tab) return;
    const tab = await chrome.tabs.query({ active: true }).then(([tab]) => tab);
    this.tab = tab as Tab;
  }
}

type Scalar = string | number | boolean | null | undefined | void;

interface Tab extends chrome.tabs.Tab {
  id: number;
}
