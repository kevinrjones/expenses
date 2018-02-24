import * as moment from 'moment';
import Moment = moment.Moment;
import { ExpenseItem } from './expense-item';


export class ExpenseClaim {

    constructor(item?: Partial<ExpenseClaim>) {
        Object.assign(this, item);
    }

    public id: number;
    public description: string;
    public dueDateUtc: string;
    public total: number;
    public currency: string;
    public paid: boolean;


    get Id(): number {
        return this.id;
    }

    get Description(): string {
        return this.description;
    }

    get DueDate(): Moment {
        return moment(this.dueDateUtc);
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
}
