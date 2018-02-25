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
        public ExpensesSummary Get()
        {
            return new ExpensesSummary
            {
                TotalClaimed = 200,
                TotalPaid = 100,
                Currency = "£",
                Claims = new List<ExpenseClaim>
                    {
                        new ExpenseClaim()
                        {
                            Id = 1,
                            Description = "Kevin Expenses 1",
                            Total = 100.0m,
                            DueDate = new DateTime(2017,1,2).ToUniversalTime().ToShortDateString(),
                            Paid = true,
                            Currency = "£"
                        },
                        new ExpenseClaim()
                        {
                            Id = 2,
                            Description = "Kevin Expenses 2",
                            Total = 100.0m,
                            DueDate = new DateTime(2017,2,3).ToUniversalTime().ToShortDateString(),
                            Paid = true,
                            Currency = "$"
                        }
                    }
            };
        }
    }
}