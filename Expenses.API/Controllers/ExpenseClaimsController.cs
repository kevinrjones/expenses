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
                            Company = "ICSA",
                            Total = 100.0m,
                            ClaimDate = new DateTime(2017,1,2).ToUniversalTime().ToShortDateString(),
                            Paid = true,
                            Currency = "£"
                        },
                        new ExpenseClaim()
                        {
                            Id = 2,
                            Description = "Kevin Expenses 2",
                            Company = "Google",
                            Total = 100.0m,
                            DueDate = new DateTime(2017,2,3).ToUniversalTime().ToShortDateString(),
                            ClaimDate = new DateTime(2017,2,3).ToUniversalTime().ToShortDateString(),
                            Paid = true,
                            Currency = "$"
                        }
                    }
            };
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