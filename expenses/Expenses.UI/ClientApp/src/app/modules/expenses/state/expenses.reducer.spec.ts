import { ExpenseClaim } from '../models/expense-claim';
import { ExpensesSummary } from '../models/expenses-summary';
import { RequestAllExpensesFailed, RequestAllExpensesSuccess } from './expense.actions';
import { ExpensesState, reducer } from './expenses.reducer';

const claims = new Array<ExpenseClaim>(
  new ExpenseClaim({ description: 'A Description', id: 1, dueDateUtc: '20180417' }),
  new ExpenseClaim()
);

const summary = new ExpensesSummary({ totalClaimed: 200, totalPaid: 100, claims: claims, currency: '$' });

describe('Expenses reducer', () => {
  let state: ExpensesState;
  beforeEach(() => {
    state = {
      expensesSummary: new ExpensesSummary(),
      error: 'initial'
    };
  });

  it('should return the expenses Summary when the action is RequestAllExpensesSuccess', () => {
    const newState = reducer(state, new RequestAllExpensesSuccess(summary));
    expect(newState.expensesSummary.claims.length).toBe(2);
  });

  it('should return an empty error when the action is RequestAllExpensesSuccess', () => {
    const newState = reducer(state, new RequestAllExpensesSuccess(summary));
    expect(newState.error).toBe('');
  });

  it('should return the correct error when the action is RequestAllExpensesFail', () => {
    const newState = reducer(state, new RequestAllExpensesFailed('error'));
    expect(newState.error).toBe('error');
  });
});
