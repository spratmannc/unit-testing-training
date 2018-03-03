using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Global.Banking.CSharp
{
    public class Account
    {
        public AccountType Type { get; set; }

        public string Number { get; set; }

        public double Balance { get; set; }

        public AccountHolder Holder{ get; set; }
    }
}
