"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
var IAccountHolder = /** @class */ (function () {
    function IAccountHolder() {
    }
    return IAccountHolder;
}());
exports.IAccountHolder = IAccountHolder;
/**
 * Person who owns an account
 */
var AccountHolder = /** @class */ (function () {
    function AccountHolder(holder) {
        if (holder) {
            this.first = holder.first;
            this.last = holder.last;
        }
    }
    /**
     * Writes the name to the screen
     */
    AccountHolder.prototype.summarize = function () {
        console.log("  Holder:  ".cyan + +(this.first + " " + this.last));
    };
    return AccountHolder;
}());
exports.AccountHolder = AccountHolder;
//# sourceMappingURL=accountholder.js.map