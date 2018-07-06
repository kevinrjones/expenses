using System.ComponentModel.DataAnnotations.Schema;
using IdentityExpress.Identity;

namespace Expenses.Repository.Entities
{
    public class Expense
    {
        public int ExpenseId { get; set; }
        
        [ForeignKey("UserId")]
        public virtual IdentityExpressUser User { get; set; }

    }
}