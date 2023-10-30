import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecClaimsComponent } from './rec-claims.component';

describe('RecClaimsComponent', () => {
  let component: RecClaimsComponent;
  let fixture: ComponentFixture<RecClaimsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecClaimsComponent]
    });
    fixture = TestBed.createComponent(RecClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
