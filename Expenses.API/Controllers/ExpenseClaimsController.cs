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
        List<ExpenseClaim> Claims = new List<ExpenseClaim>
        {
            new ExpenseClaim()
            {
                Id = 1,
                Description = "Kevin Expenses 1",
                Company = "ICSA",
                Total = 195.0m,
                ClaimDate = new DateTime(2017,1,2).ToUniversalTime().ToShortDateString(),
                Paid = true,
                Currency = "£",
                ExpenseItems = new List<Expense>{                    
                    new Expense{Id = 1, Description = "Hotel", Net = 100, Tax = 20, Total = 120},
                    new Expense{Id = 2, Description = "Train", Net = 75, Tax = 0, Total = 75}
                    }
            },
            new ExpenseClaim()
            {
                Id = 2,
                Description = "Kevin Expenses 2",
                Company = "Google",
                Total = 247.0m,
                DueDate = new DateTime(2017,2,3).ToUniversalTime().ToShortDateString(),
                ClaimDate = new DateTime(2017,2,3).ToUniversalTime().ToShortDateString(),
                Paid = true,
                Currency = "$",
                ExpenseItems = new List<Expense>{                    
                    new Expense{Id = 1, Description = "Hotel", Net = 110, Tax = 21, Total = 131},
                    new Expense{Id = 2, Description = "Food", Net = 30, Tax = 6, Total = 36},
                    new Expense{Id = 3, Description = "Train", Net = 80, Tax = 0, Total = 80}
                    }
            }
        };

        [HttpGet]
        public ExpensesSummary Get()
        {
            return new ExpensesSummary
            {
                TotalClaimed = 200,
                TotalPaid = 100,
                Currency = "£",
                Claims = Claims
            };
        }

        [HttpGet("{id}")]
        public ExpenseClaim Get(int id)
        {
            return Claims[id];
        }

        [HttpPost]
        public ExpenseClaim Post([FromBody] ExpenseClaim claim)
        {
            // add new claim and return id
            var claimDate = DateTime.Parse(claim.ClaimDate);
            return new ExpenseClaim
            {
                Description = claim.Description,
                Company = claim.Company,
                Id = new Random().Next(10),
                ClaimDate = claim.ClaimDate
            };
        }
    }
}