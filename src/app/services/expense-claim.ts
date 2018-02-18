export class ExpenseClaim {
    constructor(item?: Partial<ExpenseClaim>) {
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
