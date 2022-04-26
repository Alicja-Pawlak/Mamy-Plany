import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnFormComponent } from './learn-form.component';

describe('LearnFormComponent', () => {
  let component: LearnFormComponent;
  let fixture: ComponentFixture<LearnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
