import { Injectable } from '@angular/core';
import { Store } from './store';

@Injectable()
export class StoreHelper {
  constructor(private store: Store) {}

  /**
   * Updates the entire state in the store
   *
   * @param {any} prop
   * @param {any} state
   * @memberof StoreHelper
   */
  update(prop, state) {
    const currentState = this.store.getState();
    this.store.setState(Object.assign({}, currentState, { [prop]: state }));
  }

  /**
   * Adds an entry to the current state in the store
   * We are storing a collection of entries
   *
   * @param {any} prop
   * @param {any} state
   * @memberof StoreHelper
   */
  add(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(
      Object.assign({}, currentState, { [prop]: [state, ...collection] })
    );
  }

  /**
   * Finds an entry based on its id and then updates it
   *
   * @param {any} prop
   * @param {any} state
   * @memberof StoreHelper
   */
  findAndUpdate(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];

    this.store.setState(
      Object.assign({}, currentState, {
        [prop]: collection.map(item => {
          if (item.id !== state.id) {
            return item;
          }
          return Object.assign({}, item, state);
        })
      })
    );
  }

  /**
   * Finds an entry based on its id and deletes it
   *
   * @param {any} prop
   * @param {any} id
   * @memberof StoreHelper
   */
  findAndDelete(prop, id) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(
      Object.assign({}, currentState, {
        [prop]: collection.filter(item => item.id !== id)
      })
    );
  }
}
