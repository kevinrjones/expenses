using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Expenses.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Expenses.API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ExpenseClaimsController : Controller
    {
        [HttpGet]
        public IEnumerable<ExpenseClaim> Get()
        {
            return new List<ExpenseClaim>
            {
                new ExpenseClaim()
                {
                    Id = 1,
                    Description = "Kevin Expenses 1",
                    ExpenseItems = new List<Expense>
                    {
                        new Expense {Id = 1, Description = "Hotel", Total = 343.21m},
                        new Expense {Id = 1, Description = "Travel", Total = 134.00m}
                    }
                },
                new ExpenseClaim()
                {
                Id = 1,
                Description = "Kevin Expenses 2",
                ExpenseItems = new List<Expense>
                {
                    new Expense {Id = 1, Description = "Hotel", Total = 343.21m},
                    new Expense {Id = 1, Description = "Travel", Total = 134.00m}
                }
            }
            };
        }
    }
}