using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Global.Banking.CSharp
{
    public enum AccountType
    {
        Checking = 0,
        Savings = 1,
        COD = 2
    }

    public class AccountRecords
    {
        public IEnumerable<Account> Accounts { get; set; }
    }

    public class Account
    {
        public AccountType Type { get; set; }

        public string Number { get; set; }

        public double Balance { get; set; }

        public AccountHolder Holder{ get; set; }

        public void Summarize()
        {
            "**********************************************".WriteLine(ConsoleColor.Green);
            "  Account: ".Write(ConsoleColor.Cyan);
            $"{Number}".WriteLine(ConsoleColor.White);
            "  Type:    ".Write(ConsoleColor.Cyan);
            $"{Enum.GetName(typeof(AccountType), Type)}".WriteLine(ConsoleColor.White);

            "  Balance: ".Write(ConsoleColor.Cyan);
            $"{Balance.ToString("C2")}".WriteLine(ConsoleColor.White);
            "**********************************************".WriteLine(ConsoleColor.Green);

        }
    }
}
