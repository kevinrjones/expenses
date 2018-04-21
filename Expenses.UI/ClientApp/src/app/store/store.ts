import { createStore,applyMiddleware, compose, StoreEnhancer } from 'redux';
import { reducer } from './reducer';
import { IExpensesSummaryState } from './IExpenseClaimState';

declare var window: any;

const devToolsExtension: StoreEnhancer = (window.devToolsExtension)
    ? window.devToolsExtension() : (f) => f;

export const expenseSummaryStore = createStore<IExpensesSummaryState, any, {}, {}>(reducer, compose(devToolsExtension));
