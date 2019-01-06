import { Routes } from '@angular/router';
import { AuthGuardService } from '../authentication/services/auth-guard.service';
import { ShowExpenseDetailsComponent } from './components/show-expense-details/show-expense-details.component';
import { ExpensesListContainerComponent } from './containers/expenses-list-container/expenses-list-container.component';

export const expensesRoutes: Routes = [
  {
    path: '',
    component: ExpensesListContainerComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: ':id',
    component: ShowExpenseDetailsComponent,
    canActivate: [AuthGuardService]
  }
];
