import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManyActionsComponent } from './many-actions.component';

describe('ManyActionsComponent', () => {
  let component: ManyActionsComponent;
  let fixture: ComponentFixture<ManyActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManyActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManyActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
