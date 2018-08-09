import * as moment from 'moment';
import { ExpenseItem } from './expense-item';
import Moment = moment.Moment;

export class ExpenseClaim {
  constructor(item?: Partial<ExpenseClaim>) {
    Object.assign(this, item);
    this.expenseItems = [];
    if (item && item['expenseItems']) {
      item['expenseItems'].forEach(element => {
        const ei = new ExpenseItem(element);
        this.expenseItems.push(ei);
      });
    }
  }

   id: number;
   description: string;
   company: string;
   dueDateUtc: string;
   claimDateUtc: string;
   total: number;
   currency: string;
   paid: boolean;
   expenseItems: Array<ExpenseItem>;

  get Id(): number {
    return this.id;
  }

  get Description(): string {
    return this.description;
  }

  get Company(): string {
    return this.company;
  }

  get DueDate(): Moment {
    return moment(this.dueDateUtc);
  }
  get ClaimDate(): Moment {
    return moment(this.claimDateUtc);
  }

  get DisplayDate(): string {
    return moment(this.dueDateUtc).format('MMM DD YYYY');
  }

  get Total(): number {
    return this.total;
  }

  get Paid(): boolean {
    return this.paid;
  }

  get Currency(): string {
    return this.currency;
  }

  get ExpenseItems(): Array<ExpenseItem> {
    return this.expenseItems;
  }
}
