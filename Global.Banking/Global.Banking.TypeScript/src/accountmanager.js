"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transaction_1 = require("./transaction");
var fs = require("fs");
var AccountManager = /** @class */ (function () {
    function AccountManager(account) {
        this.account = account;
        this.nextId = 0;
    }
    AccountManager.prototype.deposit = function (amount) {
        // build successful transaction
        var transaction = {
            id: this.nextId + 1,
            type: transaction_1.TransactionType.Deposit,
            accountNumber: this.account.number,
            amount: amount,
            resultingBalance: this.account.balance + amount,
            succeeded: true,
            message: "Successfully deposited $" + amount.toFixed(2)
        };
        // apply max balance rule
        if (transaction.resultingBalance > 1000) {
            transaction.succeeded = false;
            transaction.resultingBalance = this.account.balance;
            transaction.message = "A deposit of " + amount + " would have exceeded the GFDIC max.  Cancelled.";
        }
        // save to JSON file
        this.apply(transaction);
        return transaction;
    };
    AccountManager.prototype.withdraw = function (amount) {
        var transaction = {
            id: this.nextId + 1,
            type: transaction_1.TransactionType.Withdrawal,
            accountNumber: this.account.number,
            amount: amount,
            resultingBalance: this.account.balance - amount,
            succeeded: true,
            message: "Successfully withdrew $" + amount.toFixed(2)
        };
        // apply prevent NSF rule
        if (transaction.resultingBalance < 0) {
            transaction.succeeded = false;
            transaction.resultingBalance = this.account.balance;
            transaction.message = "Insufficient funds on hand to withdraw $" + amount.toFixed(2) + ".  Cancelled.";
        }
        // save to JSON file
        this.apply(transaction);
        return transaction;
    };
    AccountManager.prototype.apply = function (transaction) {
        if (transaction.succeeded) {
            this.account.balance = transaction.resultingBalance;
        }
        this.saveAccount();
    };
    AccountManager.prototype.saveAccount = function () {
        var _this = this;
        var filePath = "./data/accounts.json";
        // read in the JSON
        var json = fs.readFileSync(filePath).toString();
        // parse the records
        var records = JSON.parse(json);
        // find the one to update
        var query = records.accounts.filter(function (r) { return r.number === _this.account.number; });
        if (query.length) {
            var accountToUpdate = query[0];
            // update the balance
            accountToUpdate.balance = this.account.balance;
            // now save back to the file
            fs.writeFileSync(filePath, JSON.stringify(records));
        }
    };
    return AccountManager;
}());
exports.AccountManager = AccountManager;
//# sourceMappingURL=accountmanager.js.map