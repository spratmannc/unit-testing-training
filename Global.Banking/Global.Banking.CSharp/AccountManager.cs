using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Global.Banking.CSharp
{
    public class AccountManager
    {
        private int _nextId = 0;
        private Account _account;

        public AccountManager(Account account)
        {
            this._account = account;
        }
    }
}
