
import { expect, assert } from "chai";
import { AccountManager } from "../src/accountmanager";
import { Account } from "../src/account";


describe("Account Manager", () => {

    it("should increase account balances after deposits", () => {

        // Arrange
        var manager = new AccountManager("./data/accounts.json");
        var account = manager.load("11");
        var expected = account.balance + 100;

        // Act
        var transaction = manager.deposit(account, 100);
        
        // Assert
        expect(transaction.succeeded).to.be.true;
        expect(account.balance).to.equal(expected);
    });

    it("should decrease account balances after withdrawals", () => {

        // Arrange
        var manager = new AccountManager("./data/accounts.json");
        var account = manager.load("11");
        var expected = account.balance - 100;

        // Act
        var transaction = manager.withdraw(account, 100);

        // Assert
        expect(transaction.succeeded).to.be.true;
        expect(account.balance).to.equal(expected);
    });

    it("should generate unique transaction ids", () => {

        // Arrange
        var manager = new AccountManager("./data/accounts.json");
        var account = manager.load("11");

        // Act
        var withdrawal = manager.withdraw(account, 100);
        var deposit = manager.deposit(account, 100);

        // Assert
        expect(withdrawal.succeeded).to.be.true;
        expect(deposit.succeeded).to.be.true;
        expect(withdrawal.id).not.to.equal(deposit.id);
    });
});