import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { AddExpenseDetailsComponent } from './components/add-expense-details/add-expense-details.component';
import { ExpenseClaimsComponent } from './components/expense-claims/expense-claims.component';
import { NewExpenseComponent } from './components/new-expense/new-expense.component';
import { ShowExpenseDetailsComponent } from './components/show-expense-details/show-expense-details.component';
import { expensesRoutes } from './expenses.routes';
import { ExpenseClaimsService } from './services/expense-claims.service';
import { ExpenseActions } from './store/expense-actions';

@NgModule({
  declarations: [
    ExpenseClaimsComponent,
    AddExpenseDetailsComponent,
    ShowExpenseDetailsComponent,
    NewExpenseComponent,
    AddExpenseDetailsComponent
  ],
  imports: [SharedModule, NgbModule, RouterModule.forChild(expensesRoutes)],
  providers: [ExpenseClaimsService,
    ExpenseActions]
})
export class ExpensesModule {}
