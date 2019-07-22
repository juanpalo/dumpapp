import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatJobComponent } from './creat-job.component';

describe('CreatJobComponent', () => {
  let component: CreatJobComponent;
  let fixture: ComponentFixture<CreatJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
