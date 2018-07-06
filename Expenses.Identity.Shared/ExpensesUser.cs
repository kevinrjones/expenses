using IdentityExpress.Identity;
using Microsoft.AspNetCore.Identity;

namespace Expenses.Identity.Shared
{
    public class ExpensesUser : IdentityExpressUser
    {
        public string Wibble { get; set; }
    }
}
