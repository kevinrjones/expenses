using System.Collections;
using System.Collections.Generic;

namespace Expenses.API.Models
{
    public class ExpenseClaim
    {
        public int Id { get; set; }
        public IEnumerable<Expense> ExpenseItems { get; set; }
        public string Description { get; set; }
    }
}