import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { User } from '../../components/user/models/user';
import { Observable } from 'rxjs/Observable';
import { ExpenseClaim } from '../../components/expenses/models/expense-claim';
import { ExpensesSummary } from '../../components/expenses/models/expenses-summary';

export interface State {
  user: User;
  summary: ExpensesSummary;
}

const defaultState = {
  user: null,
  summary: null
};

const __store = new BehaviorSubject<State>(defaultState);

/**
 * The real store has overloaded constructors for testing
 * Use this to decorate the real store as this can be injected with a default constructor
 *
 * @export
 * @class InjectableStoreDecorator
 */
@Injectable()
export class InjectableStoreDecorator {
  private store: Store;
  constructor() {
    this.store = new Store();
  }

  setState(state: State) {
    this.store.setState(state);
  }

  getState(): State {
    return this.store.getState();
  }

  purge() {
    this.store.purge();
  }
}

/**
 * The real store. Has overloaded constructors to nake testing easier
 *
 * @export
 * @class Store
 */
@Injectable()
export class Store {
  public changes: Observable<State>;
  private _store = __store;

  /**
   *
   */
  constructor();
  // tslint:disable-next-line:unified-signatures
  constructor(store: BehaviorSubject<State>);
  constructor(store?: any) {
    this._store = store == null ? __store : store;

    this.changes = this._store.asObservable().pipe(distinctUntilChanged());
  }

  setState(state: State) {
    this._store.next(state);
  }

  getState(): State {
    return this._store.value;
  }

  purge() {
    this._store.next(defaultState);
  }
}
