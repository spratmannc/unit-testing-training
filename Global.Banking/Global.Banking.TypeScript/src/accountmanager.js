"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var account_1 = require("./account");
var transaction_1 = require("./transaction");
var fs = require("fs");
var AccountManager = /** @class */ (function () {
    function AccountManager() {
        this.nextId = 0;
        this.filePath = "./data/accounts.json";
    }
    AccountManager.prototype.deposit = function (account, amount) {
        // build successful transaction
        var transaction = {
            id: this.nextId + 1,
            type: transaction_1.TransactionType.Deposit,
            accountNumber: account.number,
            amount: amount,
            resultingBalance: account.balance + amount,
            succeeded: true,
            message: "Successfully deposited $" + amount.toFixed(2)
        };
        // apply max balance rule
        if (transaction.resultingBalance > 1000) {
            transaction.succeeded = false;
            transaction.resultingBalance = account.balance;
            transaction.message = "A deposit of " + amount + " would have exceeded the GFDIC max.  Cancelled.";
        }
        // save to JSON file
        this.apply(account, transaction);
        return transaction;
    };
    AccountManager.prototype.withdraw = function (account, amount) {
        var transaction = {
            id: this.nextId + 1,
            type: transaction_1.TransactionType.Withdrawal,
            accountNumber: account.number,
            amount: amount,
            resultingBalance: account.balance - amount,
            succeeded: true,
            message: "Successfully withdrew $" + amount.toFixed(2)
        };
        // apply prevent NSF rule
        if (transaction.resultingBalance < 0) {
            transaction.succeeded = false;
            transaction.resultingBalance = account.balance;
            transaction.message = "Insufficient funds on hand to withdraw $" + amount.toFixed(2) + ".  Cancelled.";
        }
        // save to JSON file
        this.apply(account, transaction);
        return transaction;
    };
    AccountManager.prototype.apply = function (account, transaction) {
        if (transaction.succeeded) {
            account.balance = transaction.resultingBalance;
        }
        this.save(account);
    };
    AccountManager.prototype.load = function (accountNumber) {
        var json = fs.readFileSync(this.filePath).toString();
        var records = JSON.parse(json);
        var query = records.accounts.filter(function (r) { return r.number === accountNumber; });
        if (query.length) {
            return new account_1.Account(query[0]);
        }
        else {
            return null;
        }
    };
    AccountManager.prototype.save = function (account) {
        // read in the JSON
        var json = fs.readFileSync(this.filePath).toString();
        // parse the records
        var records = JSON.parse(json);
        // find the one to update
        var query = records.accounts.filter(function (r) { return r.number === account.number; });
        if (query.length) {
            var accountToUpdate = query[0];
            // update the balance
            accountToUpdate.balance = account.balance;
            // now save back to the file
            fs.writeFileSync(this.filePath, JSON.stringify(records));
        }
    };
    return AccountManager;
}());
exports.AccountManager = AccountManager;
//# sourceMappingURL=accountmanager.js.map