import { ExpenseClaim } from './expense-claim';

export class ExpensesSummary {

  public claims: Array<ExpenseClaim>;
  public totalPaid: number;
  public totalClaimed: number;
  public currency: string;

  constructor(item: ExpensesSummary = {} as ExpensesSummary) {

    const {
      totalClaimed = 0,
      totalPaid = 0,
      currency = '',
      claims = new Array<ExpenseClaim>()
    } = item;

    this.totalClaimed = totalClaimed;
    this.totalPaid = totalPaid;
    this.claims = claims.map(c => new ExpenseClaim(c));
    this.currency = currency;
  }

}
