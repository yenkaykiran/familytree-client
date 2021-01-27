import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreantRenderEngineComponent } from './treant-render-engine.component';

describe('TreantRenderEngineComponent', () => {
  let component: TreantRenderEngineComponent;
  let fixture: ComponentFixture<TreantRenderEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreantRenderEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreantRenderEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
