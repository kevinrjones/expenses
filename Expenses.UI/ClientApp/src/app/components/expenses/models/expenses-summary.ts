import { ExpenseClaim } from './expense-claim';

export class ExpensesSummary {    
    constructor(item: ExpensesSummary){
        this.totalClaimed = item.totalClaimed;
        this.totalPaid = item.totalPaid;
        this.claims = item.claims.map(c => new ExpenseClaim(c));
    }

    public claims: Array<ExpenseClaim>;
    public totalPaid: number;
    public totalClaimed: number;
}
