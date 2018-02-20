namespace Expenses.API.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Net { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
    }
}