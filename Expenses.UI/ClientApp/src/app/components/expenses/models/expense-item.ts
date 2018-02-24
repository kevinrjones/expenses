
export class ExpenseItem {
    public id: number;
    public description: string;

    constructor(item?: Partial<ExpenseItem>) {
        Object.assign(this, item);
    }

    get Id(): number {
        return this.id;
    }

    get Description(): string {
        return this.description;
    }
}
