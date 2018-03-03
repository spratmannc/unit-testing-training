using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Global.Banking.CSharp
{

    public class AccountManager
    {
        private int _nextId = 0;
        private string _filePath;

        /// <summary>
        /// Initializes an account manager
        /// </summary>
        /// <param name="jsonFilePath">Path to the JSON file that stores all the accounts</param>
        public AccountManager(string jsonFilePath)
        {
            this._filePath = jsonFilePath;
        }

        public Transaction Deposit(Account account, float amount)
        {
            // build successful transaction
            var transaction = new Transaction
            {
                Id = this._nextId + 1,
                Type = TransactionType.Deposit,
                AccountNumber = account.Number,
                Amount = amount,
                ResultingBalance = account.Balance + amount,
                Succeeded = true,
                Message = $"Successfully deposited {amount.ToString("C2")}"
            };

            // apply max balance rule
            if(transaction.ResultingBalance > 1000)
            {
                transaction.Succeeded = false;
                transaction.ResultingBalance = account.Balance;
                transaction.Message = $"A deposit of {amount.ToString("C2")} would have exceeded the GFDIC max.  Cancelled.";
            }

            // save to JSON file
            this.Apply(account, transaction);

            return transaction;
        }

        public Transaction Withdraw(Account account, float amount)
        {
            // build successful transaction
            var transaction = new Transaction
            {
                Id = this._nextId + 1,
                Type = TransactionType.Withdrawal,
                AccountNumber = account.Number,
                Amount = amount,
                ResultingBalance = account.Balance - amount,
                Succeeded = true,
                Message = $"Successfully withdrew {amount.ToString("C2")}"
            };

            // apply prevent NSF rule
            if (transaction.ResultingBalance < 0)
            {
                transaction.Succeeded = false;
                transaction.ResultingBalance = account.Balance;
                transaction.Message = $"Insufficient funds on hand to withdraw {amount.ToString("C2")}.  Cancelled.";
            }

            // save to JSON file
            this.Apply(account, transaction);

            return transaction;

        }

        private void Apply(Account account, Transaction transaction)
        {
            if (transaction.Succeeded)
            {
                account.Balance = transaction.ResultingBalance;
            }

            this.Save(account);
        }

        public Account Load(string accountNumber)
        {
            var json = File.ReadAllText(this._filePath);

            var records = JsonConvert.DeserializeObject<AccountRecords>(json);

            return records.Accounts.FirstOrDefault(a => a.Number == accountNumber);
        }

        public void Save(Account account)
        {
            // read in the JSON
            var json = File.ReadAllText(this._filePath);

            // parse the records
            var records = JsonConvert.DeserializeObject<AccountRecords>(json);

            // find the one to update
            var accountToUpdate = records.Accounts.FirstOrDefault(a => a.Number == account.Number);

            if(accountToUpdate != null)
            {
                // update the balance
                accountToUpdate.Balance = account.Balance;

                // generate the json
                json = JsonConvert.SerializeObject(records);

                // save the file
                File.WriteAllText(this._filePath, json);
            }
        }
    }
}
