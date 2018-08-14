import { Routes } from '@angular/router';
import { AuthCallbackComponent } from '../authentication/components/auth-callback/auth-callback.component';
import { SignoutCallbackComponent } from '../authentication/components/signout-callback/signout-callback.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: 'signout-callback',
    component: SignoutCallbackComponent
  },
  {
    path: 'home',
    loadChildren: 'app/modules/home/home.module#HomeModule'
  },
  {
    path: 'expenses',
    loadChildren: 'app/modules/expenses/expenses.module#ExpensesModule'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
