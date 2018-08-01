import { Injectable } from '@angular/core';

/* istanbul ignore next */
@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor() {}

  public info(message: string) {
    // tslint:disable-next-line:no-console
    console.info(message);
  }

  public error(message: string) {
    // tslint:disable-next-line:no-console
    console.error(message);
  }
}
