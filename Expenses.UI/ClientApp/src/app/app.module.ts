import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes'
import { ExpenseClaimsService } from './components/expense-claims/expenses-claims.service';
import { ExpenseClaimsComponent } from './components/expense-claims/expense-claims.component';
import { HttpClientModule } from '@angular/common/http';
import { AppConfig, PROJECT_CONFIG } from './shared/projectConfigShared';
import { ExpenseDetailsComponent } from './components/expense-details/expense-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ExpenseClaimsComponent,
    ExpenseDetailsComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [ExpenseClaimsService,
    {
      provide: AppConfig,
      useValue: PROJECT_CONFIG
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }


