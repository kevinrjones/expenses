export const FILTER_EXPENSES = 'expenses/FILTER';

export interface IAction {
    type: String;
}

export function filterExpenses(filterDate: Date): IAction {
    return {
        type: FILTER_EXPENSES,
        filterDate
    } as IAction;
}
