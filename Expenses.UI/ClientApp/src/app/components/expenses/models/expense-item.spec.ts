import { ExpenseItem } from './expense-item';

describe('ExpenseItem', () => {
  let item: ExpenseItem;

  beforeEach(() => {
    item = new ExpenseItem({ id: 1, description: 'description', net: 23, tax: 4, total: 27 });
  });

  it('should return the correct Id ', () => {
    expect(item.Id).toBe(1);
  });

  it('should return the correct description', () => {
    expect(item.Description).toBe('description');
  });

  it('should return the correct net', () => {
    expect(item.Net).toBe(23);
  });

  it('should return the correct tax', () => {
    expect(item.Tax).toBe(4);
  });

  it('should return the correct total', () => {
    expect(item.Total).toBe(27);
  });

});
