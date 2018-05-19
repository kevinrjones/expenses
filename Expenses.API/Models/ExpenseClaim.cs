using System.Collections;
using System.Collections.Generic;

namespace Expenses.API.Models
{
    public class ExpenseClaim
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Company { get; set; }
        public decimal Total { get; set; }
        public string DueDate { get; set; }
        public string ClaimDate { get; set; }
        public bool Paid { get; set; }
        public string Currency { get; set; }
        public List<Expense> ExpenseItems {get; set;}
    }
}