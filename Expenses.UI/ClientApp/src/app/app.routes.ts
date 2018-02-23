import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ExpenseClaimsComponent } from './components/expense-claims/expense-claims.component';
import { ExpenseDetailsComponent } from './components/expense-details/expense-details.component';


export const appRoutes: Routes = [
    // todo: individual expense
    { path: 'expenses/:id', component: ExpenseDetailsComponent },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: ExpenseClaimsComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
];