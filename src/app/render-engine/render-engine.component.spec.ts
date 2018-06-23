import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderEngineComponent } from './render-engine.component';

describe('RenderEngineComponent', () => {
  let component: RenderEngineComponent;
  let fixture: ComponentFixture<RenderEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
