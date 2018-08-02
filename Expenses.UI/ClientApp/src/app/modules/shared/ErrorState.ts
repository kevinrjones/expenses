export class ErrorState {
    constructor(item?: Partial<ErrorState>) {
        Object.assign(this, item);
    }
    message: string;
}
