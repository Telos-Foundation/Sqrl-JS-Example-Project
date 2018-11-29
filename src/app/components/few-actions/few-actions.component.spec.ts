import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FewActionsComponent } from './few-actions.component';

describe('FewActionsComponent', () => {
  let component: FewActionsComponent;
  let fixture: ComponentFixture<FewActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FewActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FewActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
