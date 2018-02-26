import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { appRoutes } from './app.routes';
import { AppConfig, PROJECT_CONFIG } from './shared/projectConfigShared';
import { ExpenseClaimsComponent } from './components/expenses/expense-claims/expense-claims.component';
import { ExpenseDetailsComponent } from './components/expenses/expense-details/expense-details.component';
import { ExpenseClaimsService } from './components/expenses/expenses-claims.service';
import { NewExpenseComponent } from './components/expenses/new-expense/new-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ExpenseClaimsComponent,
    ExpenseDetailsComponent,
    NewExpenseComponent
  ],
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
    BrowserAnimationsModule
  ],
  providers: [ExpenseClaimsService,
    {
      provide: AppConfig,
      useValue: PROJECT_CONFIG
    }],
    entryComponents: [ NewExpenseComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }


