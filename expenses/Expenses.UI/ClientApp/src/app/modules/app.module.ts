import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UserManager } from 'oidc-client';
import { expenseSummaryStore, IAppState } from '../store';
import { AppComponent } from './app.component';
import { ExpensesModule } from './expenses/expenses.module';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './router/router.module';
import { AuthCallbackComponent } from './shared/components/auth-callback/auth-callback.component';
import { MainNavComponent } from './shared/components/main-nav/main-nav.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { SignoutCallbackComponent } from './shared/components/signout-callback/signout-callback.component';
import { AppConfig, PROJECT_CONFIG } from './shared/projectConfigShared';
import { UserManagerFactory } from './shared/services/authorization/user-manager-factory';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, AuthCallbackComponent, SignoutCallbackComponent, MainNavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    NgReduxModule,
    AppRoutingModule,
    ExpensesModule,
    HomeModule
  ],
  providers: [
    {
      provide: AppConfig,
      useValue: PROJECT_CONFIG
    },
    {
      provide: UserManager,
      useFactory: UserManagerFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, router: Router) {
    ngRedux.provideStore(expenseSummaryStore);
  }
}
