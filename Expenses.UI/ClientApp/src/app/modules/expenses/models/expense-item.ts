
export class ExpenseItem {
    public id: number;
    public description: string;
    public net: number;
    public tax: number;
    public total: number;

    constructor(item?: Partial<ExpenseItem>) {
        Object.assign(this, item);
    }

    get Id(): number {
        return this.id;
    }

    get Description(): string {
        return this.description;
    }

    get Net(): number {
        return this.net;
    }

    get Tax(): number {
        return this.tax;
    }

    get Total(): number {
        return this.total;
    }
}
