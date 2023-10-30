import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { InitiateClaimComponent } from './components/initiate-claim/initiate-claim.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportsComponent } from './components/reports/reports.component';
import { WorkQueueComponent } from './components/work-queue/work-queue.component';
import { ThemeStyleComponent } from './components/theme-style/theme-style.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ClaimDuesComponent } from './components/dashboard/claim-dues/claim-dues.component';
import { OdItemsComponent } from './components/dashboard/od-items/od-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { loginReducer } from './ngrx/store/reducers/login.reducer';
import { AuthGaurd } from './ngrx/store/services/authgaurd';
import { ListFilterPipe } from './pipe/ListFilterPipe';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RecClaimsComponent } from './components/dashboard/rec-claims/rec-claims.component';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { RecClaimsService } from './mockApis/rec-claims.service';
import { BodyClassService } from './ngrx/store/services/body-class.service';
import { AuthInterceptorService } from './mockApis/auth-interceptor';
import { TableComponent } from './shared/table/table.component';
import { initiateClaimReducer } from './ngrx/store/reducers/initiate-claim.reducer';
import { PhoneNumberDirective } from './utils/phone-number.directive';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InputRestrictionDirective } from './utils/input-restriction.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApplicationRolesPermissionComponent } from './components/application-roles-permission/application-roles-permission.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgFor} from '@angular/common';

import { UserProfileManagementComponent } from './components/roles/user-profile-management/user-profile-management.component';
import { MatrixTableComponent } from './components/matrix-table/matrix-table.component';
import { StepperComponent } from './components/stepper-component/stepper/stepper.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserRolePermissionComponent } from './components/users-roles-permissions/user-role-permission/user-role-permission.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ListFilterPipe,
    HeaderComponent,
    SidenavComponent,
    InitiateClaimComponent,
    DashboardComponent,
    ReportsComponent,
    ThemeStyleComponent,
    WorkQueueComponent,
    BodyComponent,
    FooterComponent,
    SettingsComponent,
    ClaimDuesComponent,
    OdItemsComponent,
    LoginComponent,
    TableComponent,
    PhoneNumberDirective,
    InputRestrictionDirective,
    ApplicationRolesPermissionComponent,
     UserProfileManagementComponent,
     MatrixTableComponent,
     StepperComponent,
     UserRolePermissionComponent


  ],
  imports: [
    RecClaimsComponent,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbTypeaheadModule,
		NgbPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({ login: loginReducer,initiateClaim: initiateClaimReducer}), // Add the login reducer to the store
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    BsDatepickerModule.forRoot(),
    MatSnackBarModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    NgFor,
    TabsModule.forRoot(),
    MatTableModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule
  ],
  
  
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
    useClass :AuthInterceptorService,
    multi:true
  },
    AuthGaurd,
    RecClaimsService,
    DecimalPipe,
    BodyClassService], // Add AuthGuard as a provider
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
