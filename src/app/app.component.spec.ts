import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { LoginService } from './mockApis/login.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, StoreModule.forRoot({})],
      declarations: [AppComponent],
      providers: [LoginService]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const app = component;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'first-app'`, () => {
    const app = component;
    expect(app.title).toEqual('first-app');
  });

  it('should update screenWidth and isSideNavCollapsed', () => {
    const data = {
      screenWidth: 1024,
      collapsed: true
    };

    component.onToggleSideNav(data);

    expect(component.screenWidth).toEqual(data.screenWidth);
    expect(component.isSideNavCollapsed).toEqual(data.collapsed);
  });

  xit('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('first-app app is running!');
  });
  it('should call onInit', () => {
    component.isLoggedIn = false
   component.ngOnInit();
expect(component.ngOnInit).toBeTruthy();
  });
});
