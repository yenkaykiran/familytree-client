import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GothramListComponent } from './gothram-list.component';

describe('GothramListComponent', () => {
  let component: GothramListComponent;
  let fixture: ComponentFixture<GothramListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GothramListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GothramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
