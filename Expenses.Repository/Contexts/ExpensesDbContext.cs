using IdentityExpress.Identity;
using Expenses.Repository.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Expenses.Repository.Contexts
{
    public class ExpensesDbContext : IdentityExpressDbContext
    {

        public ExpensesDbContext(DbContextOptions<ExpensesDbContext> options) : base (options)
        {
            
        }
        public DbSet<Expense> Expenses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }

    }

    public class PocedContextFactory : IDesignTimeDbContextFactory<ExpensesDbContext>
    {
        public ExpensesDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ExpensesDbContext>();
            optionsBuilder.UseMySql("server=localhost;database=expenses;user=expenses;password=expenses");

            return new ExpensesDbContext(optionsBuilder.Options);
        }
    }

}
