export class NewExpenseClaim {
    constructor(item?: Partial<NewExpenseClaim>) {
        Object.assign(this, item);
    }


    public description: string;
    public company: string;
    public claimDate: string;
}
