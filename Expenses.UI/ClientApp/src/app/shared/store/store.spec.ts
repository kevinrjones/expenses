import { Store, State, InjectableStoreDecorator } from './store';
import { StoreHelper } from './store-helper';
import { User } from '../../components/user/models/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('Store', () => {
  let store: Store;
  let behaviour;

  const defaultState = {
    user: new User(),
    summary: null
  };

  beforeEach(() => {
    behaviour = new BehaviorSubject<State>(defaultState)
    store = new Store(behaviour);
  });

  it('should add state', () => {
    const currentState = store.getState();
    const collection: any = currentState['user'];
    const user: User = new User();
    user.name = 'Kevin';
    const assignee = {
      ['user']: [user, ...collection]
    };
    const newstate = Object.assign({}, currentState, assignee);

    store.setState(newstate);

    store.changes.subscribe((s: any) => {
      expect(s.user.length).toBe(2);
    });
  });

  it('should set state', () => {
    const currentState = store.getState();
    const user: User = new User();
    user.name = 'Kevin';
    const assignee = {
      ['user']: user
    };
    const newstate = Object.assign({}, currentState, assignee);

    store.setState(newstate);

    store.changes.subscribe(s => {
      expect(s.user.name).toBe('Kevin');
    });
  });
  it('should purge the store', () => {
    spyOn(behaviour, 'next');
    store.purge();
    expect(behaviour.next).toHaveBeenCalled();
  });
});
