import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UserManager } from 'oidc-client';
import { expenseSummaryStore, IAppState } from '../store';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AddExpenseDetailsComponent } from './expenses/components/add-expense-details/add-expense-details.component';
import { ExpenseClaimsComponent } from './expenses/components/expense-claims/expense-claims.component';
import { NewExpenseComponent } from './expenses/components/new-expense/new-expense.component';
import { ShowExpenseDetailsComponent } from './expenses/components/show-expense-details/show-expense-details.component';
import { ExpenseClaimsService } from './expenses/services/expense-claims.service';
import { ExpenseActions } from './expenses/store/expense-actions';
import { HomeComponent } from './home/components/home/home.component';
import { AuthCallbackComponent } from './shared/components/auth-callback/auth-callback.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AppConfig, PROJECT_CONFIG } from './shared/projectConfigShared';
import { UserManagerFactory } from './shared/services/authorization/user-manager-factory';
import { AuthenticationInterceptor } from './shared/interceptors/http/authentication-interceptor';



@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent,
    ExpenseClaimsComponent, AddExpenseDetailsComponent, ShowExpenseDetailsComponent,
    NewExpenseComponent, AddExpenseDetailsComponent, AuthCallbackComponent ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
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
    {
      provide: UserManager,
      useFactory: UserManagerFactory
    },
    ExpenseActions,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  entryComponents: [NewExpenseComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(expenseSummaryStore);
  }
}
