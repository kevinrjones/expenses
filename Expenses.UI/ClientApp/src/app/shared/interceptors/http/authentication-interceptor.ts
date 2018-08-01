import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { forwardRef, Inject, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authorization/authentication.service';
import { LoggingService } from '../../services/logging.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private authService: AuthenticationService;
  private logger: LoggingService;

  // prettier-ignore
  constructor(@Inject(forwardRef(() => Injector)) private injector: Injector) {
    this.authService = injector.get<AuthenticationService>(AuthenticationService);
    this.logger = injector.get<LoggingService>(LoggingService);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.getAuthorizationHeaderValue().subscribe(header => {

      request = request.clone({
        setHeaders: {
          Authorization: header
        }
      });
    });

    return next.handle(request);
  }
}
