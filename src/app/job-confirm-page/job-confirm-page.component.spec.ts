import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobConfirmPageComponent } from './job-confirm-page.component';

describe('JobConfirmPageComponent', () => {
  let component: JobConfirmPageComponent;
  let fixture: ComponentFixture<JobConfirmPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobConfirmPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobConfirmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
