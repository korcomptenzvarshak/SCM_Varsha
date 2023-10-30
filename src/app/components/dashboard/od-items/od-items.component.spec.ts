import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdItemsComponent } from './od-items.component';

describe('OdItemsComponent', () => {
  let component: OdItemsComponent;
  let fixture: ComponentFixture<OdItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OdItemsComponent]
    });
    fixture = TestBed.createComponent(OdItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
