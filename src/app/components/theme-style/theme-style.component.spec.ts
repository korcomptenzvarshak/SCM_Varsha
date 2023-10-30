import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeStyleComponent } from './theme-style.component';

describe('ThemeStyleComponent', () => {
  let component: ThemeStyleComponent;
  let fixture: ComponentFixture<ThemeStyleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeStyleComponent]
    });
    fixture = TestBed.createComponent(ThemeStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
