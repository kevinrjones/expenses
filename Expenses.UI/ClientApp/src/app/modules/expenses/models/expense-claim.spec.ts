import * as moment from 'moment';
import { ExpenseClaim } from './expense-claim';
import { ExpenseItem } from './expense-item';

describe('Expense Claim', () => {
  let expenseClaim: ExpenseClaim;

  beforeEach(() => {
    expenseClaim = new ExpenseClaim({
      company: 'CompanyName',
      dueDateUtc: '2017-01-01',
      claimDateUtc: '2018-01-01',
      expenseItems: [new ExpenseItem({ id: 1, description: 'description', net: 23, tax: 4, total: 27 })]
    });
  });

  it('should return the comapny', () => {
    expect(expenseClaim.Company).toBe('CompanyName');
  });
  it('should return the DueDate', () => {
    expect(expenseClaim.DueDate).toEqual(moment('2017-01-01'));
  });
  it('should return the ClaimDate', () => {
    expect(expenseClaim.ClaimDate).toEqual(moment('2018-01-01'));
  });
  it('should return the DisplayDate', () => {
    expect(expenseClaim.DisplayDate).toBe('Jan 01 2017');
  });
  it('should return the ExpenseItems', () => {
    expect(expenseClaim.ExpenseItems.length).toBe(1);
  });
});
