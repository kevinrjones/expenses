import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { AuthenticationService } from './authentication.service';

// todo: test
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthenticationService, private storageService: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map(e => {
        if (e) {
          return true;
        } else {
          this.authService.startAuthentication();
          this.storageService.setItem('path_redirect', state.url);
          return false;
        }
      }),
      catchError(() => {
        this.authService.startAuthentication();
        this.storageService.setItem('path_redirect', state.url);
        return of(false);
      })
    );
  }
}
