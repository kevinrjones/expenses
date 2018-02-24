using System.Collections.Generic;

namespace Expenses.API.Models
{
    public class ExpensesSummary
    {
        public decimal TotalClaimed { get; set; }
        public decimal TotalPaid { get; set; }
        public List<ExpenseClaim> Claims { get; set; }
    }
}