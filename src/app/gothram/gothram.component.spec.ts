import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GothramComponent } from './gothram.component';

describe('GothramComponent', () => {
  let component: GothramComponent;
  let fixture: ComponentFixture<GothramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GothramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GothramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
