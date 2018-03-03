using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Global.Banking.CSharp
{
    public class AccountRecords
    {
        public IEnumerable<Account> Accounts { get; set; }
    }

    public static class AccountRecordLoader
    {
        public static Account LoadAccount(string jsonPath, string accountNumber)
        {
            var json = File.ReadAllText(jsonPath);

            var records = JsonConvert.DeserializeObject<AccountRecords>(json);

            return records.Accounts.FirstOrDefault(a => a.Number == accountNumber);
        }
    }
}
