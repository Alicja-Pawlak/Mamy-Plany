import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsFormWrapComponent } from './savings-form-wrap.component';

describe('SavingsFormWrapComponent', () => {
  let component: SavingsFormWrapComponent;
  let fixture: ComponentFixture<SavingsFormWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingsFormWrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsFormWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
