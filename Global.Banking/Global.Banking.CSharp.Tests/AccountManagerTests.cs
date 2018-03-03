using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Global.Banking.CSharp.Tests
{
    public class AccountManagerTests
    {
        [Fact(DisplayName = "C# - Account Manager should increase account balances on deposit")]
        [Trait("Environment", "C#")]
        [Trait("Class", "AccountManager")]
        public void ShouldIncreaseOnDeposit()
        {
            // Arrange
            var manager = new AccountManager("accounts.json");
            var account = manager.Load("11");
            var expected = account.Balance + 100;

            // Act
            var transaction = manager.Deposit(account, 100);

            // Assert
            Assert.True(transaction.Succeeded);
            Assert.Equal(expected, account.Balance);
        }

        [Fact(DisplayName = "C# - Account Manager should decrease account balances on withdrawal")]
        [Trait("Environment", "C#")]
        [Trait("Class", "AccountManager")]
        public void ShouldDecreaseOnWithdrawal()
        {
            // Arrange
            var manager = new AccountManager("accounts.json");
            var account = manager.Load("11");
            var expected = account.Balance - 100;

            // Act
            var transaction = manager.Withdraw(account, 100);

            // Assert
            Assert.True(transaction.Succeeded);
            Assert.Equal(expected, account.Balance);
        }

        [Fact(DisplayName = "C# - Account Manager should decrease account balances on withdrawal")]
        [Trait("Environment", "C#")]
        [Trait("Class", "AccountManager")]
        [Trait("Category", "BugFix")]
        public void ShouldGenerateUniqueTransactionIds()
        {
            // Arrange
            var manager = new AccountManager("accounts.json");
            var account = manager.Load("11");

            // Act
            var withdrawal = manager.Withdraw(account, 100);
            var deposit = manager.Deposit(account, 100);

            // Assert
            Assert.True(withdrawal.Succeeded);
            Assert.True(deposit.Succeeded);
            Assert.NotEqual(withdrawal.Id, deposit.Id);
        }

        [Fact(DisplayName = "C# - Account Manager should block withdrawals if resulting balance would be less than $25")]
        [Trait("Environment", "C#")]
        [Trait("Class", "AccountManager")]
        [Trait("Category", "Business Rule")]
        public void ShouldBlockWithdrawalsIfSavingsAccountBelow25()
        {
            // Arrange
            var manager = new AccountManager("accounts.json");
            var account = manager.Load("22");

            // Act
            var withdrawal = manager.Withdraw(account, 20);

            // Assert
            Assert.False(withdrawal.Succeeded);
        }
    }
}
