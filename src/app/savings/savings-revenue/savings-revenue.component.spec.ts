import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsRevenueComponent } from './savings-revenue.component';

describe('SavingsRevenueComponent', () => {
  let component: SavingsRevenueComponent;
  let fixture: ComponentFixture<SavingsRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingsRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
