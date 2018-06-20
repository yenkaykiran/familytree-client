import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GothramEditComponent } from './gothram-edit.component';

describe('GothramEditComponent', () => {
  let component: GothramEditComponent;
  let fixture: ComponentFixture<GothramEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GothramEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GothramEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
