"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
var readline = require("readline");
var account_1 = require("./account");
var accountrecords_1 = require("./accountrecords");
var accountmanager_1 = require("./accountmanager");
function clearScreen() {
    process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H');
}
function displayAccount(acctNumber, rl) {
    clearScreen();
    var record = accountrecords_1.loadAccount("./data/accounts.json", acctNumber);
    if (!record) {
        console.log(("No account exists for number " + acctNumber).red);
        setTimeout(function () { return showMainMenu(rl); }, 2000);
    }
    else {
        var account = new account_1.Account(record);
        var manager_1 = new accountmanager_1.AccountManager(account);
        account.summarize();
        console.log("Menu:".cyan);
        console.log("\t1 - Deposit".cyan);
        console.log("\t2 - Withdrawal".cyan);
        console.log("\t3 - Back to main menu".cyan);
        rl.question("Option: ".green, function (option) {
            switch (option) {
                case "1":
                    rl.question("Amount: ".green, function (amount) {
                        var trans = manager_1.deposit(parseFloat(amount));
                        if (trans.succeeded) {
                            displayAccount(acctNumber, rl);
                        }
                        else {
                            console.log(trans.message.red);
                            setTimeout(function () { return displayAccount(acctNumber, rl); }, 2000);
                        }
                    });
                    break;
                case "2":
                    rl.question("Amount: ".yellow, function (amount) {
                        var trans = manager_1.withdraw(parseFloat(amount));
                        if (trans.succeeded) {
                            displayAccount(acctNumber, rl);
                        }
                        else {
                            console.log(trans.message.red);
                            setTimeout(function () { return displayAccount(acctNumber, rl); }, 2000);
                        }
                    });
                    break;
                default:
                    showMainMenu(rl);
                    break;
            }
        });
    }
}
function showMainMenu(rl) {
    clearScreen();
    console.log('Welcome to Global Flowpath Credit Union!'.green);
    console.log('...where every account is backed by the GFDIC...'.dim);
    console.log('...and you better keep $25 bucks in your savings...'.dim);
    console.log("");
    console.log("Please choose an option from the following:".cyan);
    console.log("\t1 - Open an account".gray);
    console.log("\t2 - Manage account".cyan);
    console.log("\t3 - Transfer funds".gray);
    console.log("\t4 - Issue Money Order".gray);
    rl.question("Option: ".green, function (answer) {
        switch (answer) {
            case "2":
                rl.question("Account Number: ".green, function (acct) {
                    displayAccount(acct, rl);
                });
                break;
            default:
                console.log("Invalid selection (Under Construction)".yellow);
                showMainMenu(rl);
                break;
        }
    });
}
// run the app
var app = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
showMainMenu(app);
//# sourceMappingURL=app.js.map