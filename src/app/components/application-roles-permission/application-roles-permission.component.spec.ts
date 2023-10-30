import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRolesPermissionComponent } from './application-roles-permission.component';

describe('ApplicationRolesPermissionComponent', () => {
  let component: ApplicationRolesPermissionComponent;
  let fixture: ComponentFixture<ApplicationRolesPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationRolesPermissionComponent]
    });
    fixture = TestBed.createComponent(ApplicationRolesPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
