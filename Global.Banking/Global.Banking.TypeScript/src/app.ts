import "colors";
import * as readline from "readline";
import { Account, AccountType } from "./account";
import { AccountHolder } from "./accountholder";
import { AccountManager } from "./accountmanager";

function clearScreen(): void {
    process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H');
}

function displayAccount(acctNumber: string, rl: readline.ReadLine): void {

    clearScreen();

    // setup the account manager for loading/saving/manipulating accounts
    let manager: AccountManager = new AccountManager("./data/accounts.json");

    // try to load an account
    let account: Account = manager.load(acctNumber);

    if (!account) {
        console.log(`No account exists for number ${acctNumber}`.red);
        setTimeout(() => showMainMenu(rl), 2000);
    } else {

        account.summarize();

        console.log("Menu:".cyan);
        console.log("\t1 - Deposit".cyan);
        console.log("\t2 - Withdrawal".cyan);
        console.log("\t3 - Back to main menu".cyan);

        rl.question("Option: ".green, (option) => {

            switch (option) {
                case "1":
                    processDeposit(rl, manager, account);
                    break;

                case "2":
                    processWithdrawal(rl, manager, account);
                    break;

                default:
                    showMainMenu(rl);
                    break;
            }
        });
    }
}

function processWithdrawal(rl: readline.ReadLine, manager: AccountManager, account: Account) {

    // ask the user for the amount
    rl.question("Amount: ".yellow, (amount) => {

        // process the transaction
        let trans = manager.withdraw(account, parseFloat(amount));

        if (trans.succeeded) {
            displayAccount(account.number, rl);
        }
        else {
            console.log(trans.message.red);
            setTimeout(() => displayAccount(account.number, rl), 2000);
        }
    });
}

function processDeposit(rl: readline.ReadLine, manager: AccountManager, account: Account) {

    // ask the user for the amount
    rl.question("Amount: ".green, (amount) => {

        // process the transaction
        let trans = manager.deposit(account, parseFloat(amount));

        if (trans.succeeded) {
            displayAccount(account.number, rl);
        }
        else {
            console.log(trans.message.red);
            setTimeout(() => displayAccount(account.number, rl), 2000);
        }
    });
}

function showMainMenu(rl: readline.ReadLine): void {
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

    rl.question("Option: ".green, (answer) => {

        switch (answer) {

            case "2":
                rl.question("Account Number: ".green, (acct) => {
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
let app = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

showMainMenu(app);
