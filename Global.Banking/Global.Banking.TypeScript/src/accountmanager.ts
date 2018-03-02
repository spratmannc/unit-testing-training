import { Account, IAccount } from "./account";
import { ITransaction, TransactionType } from "./transaction";
import * as fs from "fs";
import { IAccountRecords } from "./accountrecords";


export class AccountManager {

    nextId: number = 0;

    constructor(private account: Account) { }

    deposit(amount: number): ITransaction {

        // build successful transaction
        var transaction: ITransaction = {
            id: this.nextId + 1,
            type: TransactionType.Deposit,
            accountNumber: this.account.number,
            amount: amount,
            resultingBalance: this.account.balance + amount,
            succeeded: true,
            message: `Successfully deposited $${amount.toFixed(2)}`
        };

        // apply max balance rule
        if (transaction.resultingBalance > 1000) {
            transaction.succeeded = false;
            transaction.resultingBalance = this.account.balance;
            transaction.message = `A deposit of ${amount} would have exceeded the GFDIC max.  Cancelled.`;
        }

        // save to JSON file
        this.apply(transaction);

        return transaction;
    }

    withdraw(amount: number): ITransaction {

        var transaction: ITransaction = {
            id: this.nextId + 1,
            type: TransactionType.Withdrawal,
            accountNumber: this.account.number,
            amount: amount,
            resultingBalance: this.account.balance - amount,
            succeeded: true,
            message: `Successfully withdrew $${amount.toFixed(2)}`
        };

        // apply prevent NSF rule
        if (transaction.resultingBalance < 0) {
            transaction.succeeded = false;
            transaction.resultingBalance = this.account.balance;
            transaction.message = `Insufficient funds on hand to withdraw $${amount.toFixed(2)}.  Cancelled.`;
        }

        // save to JSON file
        this.apply(transaction);

        return transaction;
    }

    apply(transaction: ITransaction): void {

        if (transaction.succeeded) {
            this.account.balance = transaction.resultingBalance;
        }

        this.saveAccount();
    }


    saveAccount(): void {

        let filePath: string = "./data/accounts.json";

        // read in the JSON
        let json: string = fs.readFileSync(filePath).toString();

        // parse the records
        let records: IAccountRecords = JSON.parse(json);

        // find the one to update
        let query: IAccount[] = records.accounts.filter(r => r.number === this.account.number);

        if (query.length) {

            let accountToUpdate = query[0];

            // update the balance
            accountToUpdate.balance = this.account.balance;

            // now save back to the file
            fs.writeFileSync(filePath, JSON.stringify(records));
        } 
    }
}