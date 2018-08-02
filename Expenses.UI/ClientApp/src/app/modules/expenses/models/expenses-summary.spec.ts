import { ExpensesSummary } from './expenses-summary';

describe('ExpensesSummary', () => {
  it('should initialize with default values', () => {
    const summary: ExpensesSummary = new ExpensesSummary();
    expect(summary.currency).toBe('');
  });
});
