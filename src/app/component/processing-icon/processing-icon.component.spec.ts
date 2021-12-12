import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingIconComponent } from './processing-icon.component';

describe('ProcessingIconComponent', () => {
  let component: ProcessingIconComponent;
  let fixture: ComponentFixture<ProcessingIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
