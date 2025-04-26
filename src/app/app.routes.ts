import { Routes } from '@angular/router';
import { LoginComponent } from './core/layouts/auth/auth-componants/login/login.component';
import { AuthComponent } from './core/layouts/auth/auth.component';
import { loginGGuard } from './core/guards/login-g.guard';
import { homeGGuard } from './core/guards/home-g.guard';

export const routes: Routes = [
  // auth routes
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // auth Routs
  {
    path: 'auth',
    canActivate: [homeGGuard],
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      // lazy loading
      {
        path: 'reigister',
        loadComponent: () =>
          import(
            './core/layouts/auth/auth-componants/reigister/reigister.component'
          ).then((c) => c.ReigisterComponent),
      },

      // Rest Password
      {
        path: 'rest-password',
        loadComponent: () =>
          import(
            './core/layouts/auth/auth-componants/password/password.component'
          ).then((c) => c.PasswordComponent),
      },
    ],
  },

  // home routes
  {
    path: 'home',
    canActivate: [loginGGuard],
    loadComponent: () =>
      import('./feature/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },

      {
        path: 'profile',
        loadComponent: () =>
          import('./feature/componants/user-data/user-data.component').then(
            (c) => c.UserDataComponent
          ),
      },
      {
        path: 'quizHistory',
        loadComponent: () =>
          import(
            './feature/componants/quiz-history/quiz-history.component'
          ).then((c) => c.QuizHistoryComponent),
      },
      {
        path: 'quizMeun/:id',
        loadComponent: () =>
          import('./feature/componants/quiz/quiz-menu.component').then(
            (c) => c.QuizMenuComponent
          ),
      },
    ],
  },
];
