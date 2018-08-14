import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { SignoutCallbackComponent } from './components/signout-callback/signout-callback.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
  declarations: [
      AuthCallbackComponent,
      SignoutCallbackComponent
  ],
  imports: [SharedModule],
  providers: [AuthGuardService, AuthenticationService]
})
export class AuthenticationModule {}
