import { Routes } from '@angular/router';
import { AuthComponent } from './core/layout/auth/auth.component';
import { LoginComponent } from './core/layout/auth/componant/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      // lazy loading
      {
        path: 'reigister',
        loadComponent: () =>
          import(
            './core/layout/auth/componant/reigister/reigister.component'
          ).then((c) => c.ReigisterComponent),
      },


// Rest Password
      {
        path: 'rest-password',
        loadComponent: () =>
          import(
            './core/layout/auth/componant/password/password.component'
          ).then((c) => c.PasswordComponent),
      },


    ],
  },
];
