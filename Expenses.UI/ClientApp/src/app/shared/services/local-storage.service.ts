import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  /* istanbul ignore next */
  public setItem(name: string, value: any) {
    window.localStorage.setItem(name, value);
  }

  /* istanbul ignore next */
  public getItem(name: string): any {
    return window.localStorage.getItem(name);
  }
}
