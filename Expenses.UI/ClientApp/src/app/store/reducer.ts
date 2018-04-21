import { ExpenseClaim } from '../components/expenses/models/expense-claim';
import { IExpensesSummaryState } from './IExpenseClaimState';
import { ExpensesSummary } from '../components/expenses/models/expenses-summary';
import { FILTER_EXPENSES, IAction } from './actions';

const claims = [
  new ExpenseClaim({
    id: 1,
    description: 'Kevin Expenses 1',
    company: 'ICSA',
    total: 100,
    paid: true,
    currency: '£'
  }),
  new ExpenseClaim({
    id: 2,
    description: 'Kevin Expenses 2',
    company: 'Google',
    total: 100,
    paid: true,
    currency: '$'
  })
];

const initalExpenseClaimState: IExpensesSummaryState = {
  expenseClaims: new ExpensesSummary({ totalClaimed: 200, totalPaid: 100, claims: claims, currency: '$' }),
  filteredExpenseClaims: new ExpensesSummary({ totalClaimed: 200, totalPaid: 100, claims: claims, currency: '$' }),
};

function getFilteredExpenses(state: IExpensesSummaryState, filterDate: Date): IExpensesSummaryState {
    // todo: filter the expense details based on date
    return state;
}

function filterExpenses(state: IExpensesSummaryState, action): IExpensesSummaryState {
    return Object.assign({}, state,
    {filteredExpenseClaims: getFilteredExpenses(state, action.filterDate)});
}

export function reducer(state: IExpensesSummaryState = initalExpenseClaimState, action: IAction): IExpensesSummaryState {
  switch (action.type) {
    case FILTER_EXPENSES:
        return filterExpenses(state, action);
    default:
      return state;
  }
}
