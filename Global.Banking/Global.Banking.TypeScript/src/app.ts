import "colors";
import * as readline from "readline";
import { Account, IAccount } from "./account";
import { AccountType } from "./accounttype";
import { AccountHolder } from "./accountholder";
import { loadAccount } from "./accountrecords";
import { AccountManager } from "./accountmanager";

function clearScreen(): void {
    process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H');
}

function displayAccount(acctNumber: string, rl: readline.ReadLine): void {
    clearScreen();

    let record: IAccount = loadAccount("./data/accounts.json", acctNumber);

    if (!record) {
        console.log(`No account exists for number ${acctNumber}`.red);
        setTimeout(() => showMainMenu(rl), 2000);
    } else {

        let account: Account = new Account(record);
        let manager: AccountManager = new AccountManager(account);
        account.summarize();

        console.log("Menu:".cyan);
        console.log("\t1 - Deposit".cyan);
        console.log("\t2 - Withdrawal".cyan);
        console.log("\t3 - Back to main menu".cyan);

        rl.question("Option: ".green, (option) => {

            switch (option) {
                case "1":

                    rl.question("Amount: ".green, (amount) => {
                        let trans = manager.deposit(parseFloat(amount));

                        if (trans.succeeded) {
                            displayAccount(acctNumber, rl);
                        } else {
                            console.log(trans.message.red);
                            setTimeout(() => displayAccount(acctNumber, rl), 2000);
                        }
                    });
                    
                    break;

                case "2":
                    rl.question("Amount: ".yellow, (amount) => {

                        let trans = manager.withdraw(parseFloat(amount));

                        if (trans.succeeded) {
                            displayAccount(acctNumber, rl);
                        } else {
                            console.log(trans.message.red);
                            setTimeout(() => displayAccount(acctNumber, rl), 2000);
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
