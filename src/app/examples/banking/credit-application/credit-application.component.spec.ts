import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditApplicationComponent } from './credit-application.component';

describe('CreditApplicationComponent', () => {
  let component: CreditApplicationComponent;
  let fixture: ComponentFixture<CreditApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
