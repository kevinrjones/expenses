export class ExpenseItem {
    constructor(item?: Partial<ExpenseItem>) {
        Object.assign(this, item)
    }
    public id: number;
    public description: string;

    get Id(): number {
        return this.id
    }

    get Description(): string {
        return this.description;
    }
}

export class ExpenseClaim {

    constructor(item?: Partial<ExpenseClaim>) {
        Object.assign(this, item)
    }

    public id: number;
    public description: string;
    public expenseItems: Array<ExpenseItem>

    get Id(): number {
        return this.id
    }

    get Description(): string {
        return this.description
    }

    get ExpenseItems(): Array<ExpenseItem> {
        return this.expenseItems
    }
}