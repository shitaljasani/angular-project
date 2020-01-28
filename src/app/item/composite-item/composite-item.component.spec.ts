import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeItemComponent } from './composite-item.component';

describe('CompositeItemComponent', () => {
  let component: CompositeItemComponent;
  let fixture: ComponentFixture<CompositeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompositeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
