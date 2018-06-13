import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DescriptionComponent } from './description/description.component';
import { ActivationComponent } from './activation/activation.component';
import { ForgotPasswordComponent } from './forgot/forgot-password/forgot-password.component';
import { CreatePasswordComponent } from './forgot/create-password/create-password.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AccountsComponent } from './admin/accounts/accounts.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/description', pathMatch: 'full' },
  { path: 'description', component: DescriptionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'activate/:key', component: ActivationComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'createpassword/:key', component: CreatePasswordComponent },
  { path: 'admin', component: AdminComponent,
  children: [
    {path: '', redirectTo: 'accounts', pathMatch: 'full'}, 
    {path: 'admindashboard', component: AdminDashboardComponent},
    {path: 'accounts', component: AccountsComponent}
  ] },
  { path: 'user', component: UserComponent,
  children: [
    {path: '', redirectTo: 'userdashboard', pathMatch: 'full'}, 
    {path: 'userdashboard', component: UserDashboardComponent}
  ] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }