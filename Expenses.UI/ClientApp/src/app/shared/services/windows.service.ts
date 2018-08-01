import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowsService {

  constructor() { }

  /* istanbul ignore next */
  public redirect(href: string) {
    window.location.href = href;
  }
}
