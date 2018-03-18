import { ExpenseClaim } from './expense-claim';
import * as moment from 'moment';

describe('Expense Claim', () => {
  let expenseClaim: ExpenseClaim;

  beforeEach(() => {
    expenseClaim = new ExpenseClaim({
      company: 'CompanyName',
      dueDateUtc: '2017/01/01',
      claimDateUtc: '2018/01/01'
    });
  });

  it('should return the comapny', () => {
    expect(expenseClaim.Company).toBe('CompanyName');
  });
  it('should return the DueDate', () => {
    expect(expenseClaim.DueDate).toEqual(moment('2017/01/01'));
  });
  it('should return the ClaimDate', () => {
    expect(expenseClaim.ClaimDate).toEqual(moment('2018/01/01'));
  });
  it('should return the DisplayDate', () => {
    expect(expenseClaim.DisplayDate).toBe('Jan 01 2017');
  });
});
