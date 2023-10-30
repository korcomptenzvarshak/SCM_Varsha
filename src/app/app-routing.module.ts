import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InitiateClaimComponent } from './components/initiate-claim/initiate-claim.component';
import { ReportsComponent } from './components/reports/reports.component';
import { WorkQueueComponent } from './components/work-queue/work-queue.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGaurd } from './ngrx/store/services/authgaurd';
import { ApplicationRolesPermissionComponent } from './components/application-roles-permission/application-roles-permission.component';

import { UserProfileManagementComponent } from './components/roles/user-profile-management/user-profile-management.component';
import { MatrixTableComponent } from './components/matrix-table/matrix-table.component';
import { UserRolePermissionComponent } from './components/users-roles-permissions/user-role-permission/user-role-permission.component';




const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'initiateClaim', component: InitiateClaimComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'workQueue', component: WorkQueueComponent },
  // { path: 'user-mapping', component: UserProfileManagementComponent },
  { path: 'settings', component: SettingsComponent,canActivate: [AuthGaurd] },
  { path: 'roles-permissions', component: MatrixTableComponent },
  { path: 'user-profile', component: UserRolePermissionComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
