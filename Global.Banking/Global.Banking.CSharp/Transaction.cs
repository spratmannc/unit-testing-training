using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Global.Banking.CSharp
{
    public enum TransactionType
    {
        Deposit = 1,
        Withdrawal = 2
    }

    public class Transaction
    {
        public int Id { get; set; }

        public TransactionType Type { get; set; }

        public bool Succeeded { get; set; }

        public string AccountNumber { get; set; }

        public double Amount { get; set; }

        public double ResultingBalance { get; set; }

        public string Message { get; set; }
    }
}
