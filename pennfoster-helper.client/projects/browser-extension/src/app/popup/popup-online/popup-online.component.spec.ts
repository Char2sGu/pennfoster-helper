import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOnlineComponent } from './popup-online.component';

describe('PopupOnlineComponent', () => {
  let component: PopupOnlineComponent;
  let fixture: ComponentFixture<PopupOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupOnlineComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
