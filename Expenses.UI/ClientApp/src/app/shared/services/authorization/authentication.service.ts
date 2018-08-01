import { Injectable } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { from, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../local-storage.service';
import { LoggingService } from '../logging.service';
import { WindowsService } from '../windows.service';

export function getClientSettings(): UserManagerSettings {
  return {
    authority: environment.authorityUrl, // ids
    client_id: environment.clientId, // 'expenses',
    redirect_uri: environment.authRedirectUrl, // client's redirect URI
    post_logout_redirect_uri: environment.logoutRedirectUrl,
    response_type: environment.responseType, // 'id_token token',
    scope: environment.scope, // 'openid profile api1', // api1 woukd be the expenses API token
    filterProtocolClaims: true,
    loadUserInfo: true
  };
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: User = null;

  constructor(private manager: UserManager, private windowsService: WindowsService, private localStorageService: LocalStorageService, private logger: LoggingService) {
    this.getUser().subscribe(u => (this.user = u));
  }

  isLoggedIn(): Observable<boolean> {
    return this.getUser().map(u => !u.expired);
  }

  getClaims(): Observable<any> {
    return this.getUser().map(u => u.profile);
  }

  getAuthorizationHeaderValue(): Observable<string> {
    return this.getUser().map(u =>  `${u.token_type} ${u.access_token}`);
  }

  startAuthentication(): Observable<void> {
    this.logger.info('start authentication');
    this.localStorageService.setItem('path_redirect', window.location.href);
    return from(this.manager.signinRedirect());
  }

  completeAuthentication(): Observable<void> {
    return from(this.manager.signinRedirectCallback().then(user => {
      this.user = user;
      this.windowsService.redirect(this.localStorageService.getItem('path_redirect'));
    }));
  }

  private getUser(): Observable<User> {
    if (this.user != null) {
      // istanbul ignore next
      return of(this.user);
    }
    return from(this.manager.getUser());
  }
}