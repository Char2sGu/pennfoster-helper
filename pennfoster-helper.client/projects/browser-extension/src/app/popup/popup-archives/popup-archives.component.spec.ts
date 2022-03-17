import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupArchivesComponent } from './popup-archives.component';

describe('PopupArchivesComponent', () => {
  let component: PopupArchivesComponent;
  let fixture: ComponentFixture<PopupArchivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupArchivesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
