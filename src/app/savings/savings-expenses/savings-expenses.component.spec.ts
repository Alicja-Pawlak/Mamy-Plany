import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsExpensesComponent } from './savings-expenses.component';

describe('SavingsExpensesComponent', () => {
  let component: SavingsExpensesComponent;
  let fixture: ComponentFixture<SavingsExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingsExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
