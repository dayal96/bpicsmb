import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizableFrameComponent } from './resizable-frame.component';

describe('ResizableFrameComponent', () => {
  let component: ResizableFrameComponent;
  let fixture: ComponentFixture<ResizableFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResizableFrameComponent]
    });
    fixture = TestBed.createComponent(ResizableFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
