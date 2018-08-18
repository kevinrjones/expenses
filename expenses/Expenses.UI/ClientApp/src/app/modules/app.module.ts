import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { UserManager } from 'oidc-client';
import { environment } from '../../environments/environment';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserManagerFactory } from './authentication/services/user-manager-factory';
import { AppRoutingModule } from './router/router.module';
import { MainNavComponent } from './shared/components/main-nav/main-nav.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AppConfig, PROJECT_CONFIG } from './shared/projectConfigShared';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, MainNavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Expenses',
      maxAge: 25,
      logOnly: environment.production
    }),
      AppRoutingModule,
    AuthenticationModule
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
export class AppModule {}
