import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixTableComponent } from './matrix-table.component';

describe('MatrixTableComponent', () => {
  let component: MatrixTableComponent;
  let fixture: ComponentFixture<MatrixTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatrixTableComponent]
    });
    fixture = TestBed.createComponent(MatrixTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
