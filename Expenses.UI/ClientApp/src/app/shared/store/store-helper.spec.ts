import { Store, State } from './store';
import { StoreHelper } from './store-helper';
import { User } from '../../components/user/models/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('Store Helper', () => {
  let store: Store;
  let storehelper: StoreHelper;

  const defaultState = {
    user: new User(),
    users: [],
    summary: null
  };

  beforeEach(() => {
    store = new Store(new BehaviorSubject<State>(defaultState));
    storehelper = new StoreHelper(store);
  });

  it('should set a value', () => {
    const user: User = new User();
    user.name = 'Kevin';
    storehelper.update('user', user);
    store.changes.subscribe(d => {
      expect(d).not.toBeNull();
      expect(d.user.name).toBe('Kevin');
    });
  });

  it('should add to a values collection', () => {
    const user: User = new User();
    user.name = 'Kevin';
    storehelper.add('user', user);
    store.changes.subscribe((d: any) => {
      expect(d.user.length).toBe(2);
    });
  });

  it('should find and update a value when the IDs match', () => {
    const user: User = new User();
    user.name = 'Kevin';
    user.id = 1;

    storehelper.add('users', user);

    const user2: User = new User();
    user2.name = 'Fred';
    user2.id = 1;

    const newuser = storehelper.findAndUpdate('users', user2);

    const state: any = store.getState();
    const items = state.users.map(item => {
      if (item.id === 1) {
        return item;
      }
    });
    expect(items[0].name).toBe('Fred');
  });

  it('should find and update a value when the IDs do not match', () => {
    const user: User = new User();
    user.name = 'Kevin';
    user.id = 1;

    storehelper.add('users', user);

    const user2: User = new User();
    user2.name = 'Fred';
    user2.id = 2;

    const newuser = storehelper.findAndUpdate('users', user2);

    const state: any = store.getState();
    const items = state.users.map(item => {
      if (item.id === 1) {
        return item;
      }
    });
    expect(items[0].name).toBe('Kevin');
  });

  it('should find and delete a value when the IDs match', () => {
    const user: User = new User();
    user.name = 'Kevin';
    user.id = 1;

    storehelper.add('users', user);

    storehelper.findAndDelete('users', 1);

    const state: any = store.getState();
    expect(state.users.length).toBe(0);
  });

  it('should not find and delete a value when the IDs do not match', () => {
    const user: User = new User();
    user.name = 'Kevin';
    user.id = 1;

    storehelper.add('users', user);

    storehelper.findAndDelete('users', 2);

    const state: any = store.getState();
    expect(state.users.length).toBe(1);
  });
});
