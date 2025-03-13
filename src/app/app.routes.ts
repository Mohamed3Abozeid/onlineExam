import { Routes } from '@angular/router';
import { AuthComponent } from './core/layout/auth/auth.component';
import { ForgetPasswordComponent } from './core/layout/auth/componant/forget-password/forget-password.component';
import { LoginComponent } from './core/layout/auth/componant/login/login.component';
import { NewPasswordComponent } from './core/layout/auth/componant/new-password/new-password.component';
import { ReigisterComponent } from './core/layout/auth/componant/reigister/reigister.component';
import { ResetCodeComponent } from './core/layout/auth/componant/reset-code/reset-code.component';


export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'reigister', component: ReigisterComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'Verify-code', component: ResetCodeComponent },
      { path: 'New-Password', component: NewPasswordComponent },
    ],
  },
];
