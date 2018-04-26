import { createStore,applyMiddleware, compose, GenericStoreEnhancer } from 'redux';
import { rootReducer } from './reducer';
import { IAppState } from './IAppState';

declare var window: any;

const devToolsExtension: GenericStoreEnhancer = (window.devToolsExtension)
    ? window.devToolsExtension() : (f) => f;

export const expenseSummaryStore = createStore<IAppState>(rootReducer, compose(devToolsExtension));
