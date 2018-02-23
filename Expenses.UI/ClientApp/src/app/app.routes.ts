import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ExpenseDetailsComponent } from './components/expenses/expense-details/expense-details.component';
import { ExpenseClaimsComponent } from './components/expenses/expense-claims/expense-claims.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ExpenseClaimsComponent },
      { path: 'expenses/:id', component: ExpenseDetailsComponent }
    ]
  },
  {
    path: 'home',
    redirectTo: '/',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
