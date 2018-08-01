import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

// todo: test
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthenticationService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map(e => {
        if (e) {
          return true;
        } else {
          this.authService.startAuthentication();
          return false;
        }
      }),
      catchError(() => {
        this.authService.startAuthentication();
        return of(false);
      })
    );
  }
}
