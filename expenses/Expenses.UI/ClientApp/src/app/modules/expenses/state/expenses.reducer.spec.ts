import { ExpenseClaim } from '../models/expense-claim';
import { ExpensesSummary } from '../models/expenses-summary';
import { ClearCurrentExpense, InitializeCurrentExpense, RequestAllExpenses, RequestAllExpensesFailed, RequestAllExpensesSuccess } from './expense.actions';
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
      error: 'initial',
      hasLoaded: false,
      currentExpenseId: null
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

  it('should not have set the hasLoaded flag to true when the default action has been used', () => {
    const newState = reducer(state, new RequestAllExpenses());
    expect(newState.hasLoaded).toBeFalsy();
  });

  it('should have set the hasLoaded flag to true when the action is RequestAllExpensesSuccess', () => {
    const newState = reducer(state, new RequestAllExpensesSuccess(summary));
    expect(newState.hasLoaded).toBeTruthy();
  });

  it('should not have set the hasLoaded flag to true when the action is RequestAllExpensesFail', () => {
    const newState = reducer(state, new RequestAllExpensesFailed('error'));
    expect(newState.hasLoaded).toBeFalsy();
  });

  it('should clear the currentExpenseId when the action is ClearCurrentExpense', () => {
    const newState = reducer(state, new ClearCurrentExpense());
    expect(newState.currentExpenseId).toBeNull();
  });

  it('should initialize the currentExpenseId when the action is InitializeCurrentExpense', () => {
    const newState = reducer(state, new InitializeCurrentExpense());
    expect(newState.currentExpenseId).toBe(0);
  });


});
