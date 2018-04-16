import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';


export function asyncData<T>(data: T): Observable<T> {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any): Observable<T> {
  return defer(() => Promise.reject(errorObject));
}


