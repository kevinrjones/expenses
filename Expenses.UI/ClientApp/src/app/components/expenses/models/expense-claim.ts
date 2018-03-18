import * as moment from 'moment';
import Moment = moment.Moment;
import { ExpenseItem } from './expense-item';


export class ExpenseClaim {

    constructor(item?: Partial<ExpenseClaim>) {
        Object.assign(this, item);
    }

    public id: number;
    public description: string;
    public company: string;
    public dueDateUtc: string;
    public claimDateUtc: string;
    public total: number;
    public currency: string;
    public paid: boolean;


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
}
