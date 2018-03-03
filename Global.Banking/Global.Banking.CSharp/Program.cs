using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Global.Banking.CSharp
{
    class Program
    {
        static void Main(string[] args)
        {
            ShowMainMenu();
        }       

        static void ShowMainMenu()
        {
            Console.Clear();

            "Welcome to Global Flowpath Credit Union!".WriteLine(ConsoleColor.Green);
            "...where every account is backed by the GFDIC...".WriteLine(ConsoleColor.Gray);
            "...and you better keep $25 bucks in your savings...".WriteLine(ConsoleColor.Gray);
            Console.WriteLine();
            "Please choose an option from the following:".WriteLine(ConsoleColor.Cyan);
            "\t1 - Open an account".WriteLine(ConsoleColor.Gray);
            "\t2 - Manage account".WriteLine(ConsoleColor.Cyan);
            "\t3 - Transfer funds".WriteLine(ConsoleColor.Gray);
            "\t4 - Issue Money Order".WriteLine(ConsoleColor.Gray);

            "Option: ".Write(ConsoleColor.Green);
            var answer = Console.ReadLine();

            switch (answer)
            {
                case "2":
                    "Account Number: ".Write(ConsoleColor.Green);
                    var acct = Console.ReadLine();
                    DisplayAccount(acct);
                    break;

                default:
                    "Invalid selection (Under Construction)".WriteLineWithDelay(ConsoleColor.Yellow, 1000);
                    ShowMainMenu();
                    break;
            }
        }

        static void DisplayAccount(string accountNumber)
        {
            Console.Clear();

            // determine the file path
            var path = Path.Combine(Path.GetFullPath(Assembly.GetExecutingAssembly().Location), "account.json");

            // setup the account manager for loading/saving/manipulating accounts
            var manager = new AccountManager("accounts.json");

            // try to load an account
            var account = manager.Load(accountNumber);

            if(account == null)
            {
                $"No account exists for number {accountNumber}".WriteLineWithDelay(ConsoleColor.Red, 2000);
                ShowMainMenu();
            }
            else
            {
                account.Summarize();

                "Menu:".WriteLine(ConsoleColor.Cyan);
                "\t1 - Deposit".WriteLine(ConsoleColor.Cyan);
                "\t2 - Withdrawal".WriteLine(ConsoleColor.Cyan);
                "\t3 - Back to main menu".WriteLine(ConsoleColor.Cyan);

                "Option: ".Write(ConsoleColor.Green);
                var option = Console.ReadLine();

                switch (option)
                {
                    case "1":
                        ProcessDeposit(manager, account);
                        break;

                    case "2":
                        ProcessWithdrawal(manager, account);
                        break;

                    default:
                        ShowMainMenu();
                        break;
                }
            }
        }

        private static void ProcessWithdrawal(AccountManager manager, Account account)
        {
            // ask the user for the amount
            "Amount: ".Write(ConsoleColor.Yellow);
            var amount = Console.ReadLine();

            // process the transaction
            var trans = manager.Withdraw(account, float.Parse(amount));

            if(trans.Succeeded)
            {
                DisplayAccount(account.Number);
            }
            else
            {
                trans.Message.WriteLineWithDelay(ConsoleColor.Red, 2000);
                DisplayAccount(account.Number);
            }
        }

        static void ProcessDeposit(AccountManager manager, Account account)
        {
            // ask the user for the amount
            "Amount: ".Write(ConsoleColor.Yellow);
            var amount = Console.ReadLine();

            // process the transaction
            var trans = manager.Deposit(account, float.Parse(amount));

            if (trans.Succeeded)
            {
                DisplayAccount(account.Number);
            }
            else
            {
                trans.Message.WriteLineWithDelay(ConsoleColor.Red, 2000);
                DisplayAccount(account.Number);
            }
        }
    }
}
