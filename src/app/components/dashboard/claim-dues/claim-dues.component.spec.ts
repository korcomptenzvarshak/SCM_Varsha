import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimDuesComponent } from './claim-dues.component';

describe('ClaimDuesComponent', () => {
  let component: ClaimDuesComponent;
  let fixture: ComponentFixture<ClaimDuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimDuesComponent]
    });
    fixture = TestBed.createComponent(ClaimDuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
