import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ExpenseActions } from '../app/components/expenses/expense.actions';
import { IAppState, expenseSummaryStore } from '../app/store';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AddExpenseDetailsComponent } from './components/expenses/add-expense-details/add-expense-details.component';
import { ExpenseClaimsService } from './components/expenses/expense-claims.service';
import { ExpenseClaimsComponent } from './components/expenses/expense-claims/expense-claims.component';
import { NewExpenseComponent } from './components/expenses/new-expense/new-expense.component';
import { ShowExpenseDetailsComponent } from './components/expenses/show-expense-details/show-expense-details.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppConfig, PROJECT_CONFIG } from './shared/projectConfigShared';



@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent,
    ExpenseClaimsComponent, AddExpenseDetailsComponent, ShowExpenseDetailsComponent,
    NewExpenseComponent, AddExpenseDetailsComponent ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    NgReduxModule
  ],
  providers: [
    ExpenseClaimsService,
    {
      provide: AppConfig,
      useValue: PROJECT_CONFIG
    },
    ExpenseActions
  ],
  entryComponents: [NewExpenseComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(expenseSummaryStore);
  }
}
