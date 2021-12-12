import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostermovieComponent } from './postermovie.component';

describe('PostermovieComponent', () => {
  let component: PostermovieComponent;
  let fixture: ComponentFixture<PostermovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostermovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostermovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
