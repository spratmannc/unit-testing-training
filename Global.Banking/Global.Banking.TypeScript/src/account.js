"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var accountholder_1 = require("./accountholder");
var accounttype_1 = require("./accounttype");
var Account = /** @class */ (function () {
    function Account(record) {
        if (record) {
            this.type = record.type;
            this.holder = new accountholder_1.AccountHolder(record.holder);
            this.balance = record.balance;
            this.number = record.number;
        }
    }
    /**
     * Writes a summary view to the screen
     */
    Account.prototype.summarize = function () {
        console.log("**********************************************".green);
        console.log("  Account: ".cyan + ("" + this.number));
        console.log("  Type:    ".cyan + ("" + accounttype_1.AccountType[this.type]));
        console.log("  Balance: ".cyan + ("$" + this.balance.toFixed(2)));
        console.log("**********************************************".green);
    };
    return Account;
}());
exports.Account = Account;
//# sourceMappingURL=account.js.map