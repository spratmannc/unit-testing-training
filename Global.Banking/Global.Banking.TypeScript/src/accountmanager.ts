import { Account, IAccount, IAccountRecords } from "./account";
import { ITransaction, TransactionType } from "./transaction";
import * as fs from "fs";

export interface IAccountManager {
    deposit(account: Account, amount: number): ITransaction;
    withdraw(account: Account, amount: number): ITransaction;

    load(accountNumber: string): Account;
    save(account: Account): void
}


export class AccountManager {

    private nextId: number = 0;
    private filePath: string;

    /**
     * Initializes an account manager
     * @param jsonFilePath Path to the JSON file that stores all the accounts
     */
    constructor(jsonFilePath: string) {
        this.filePath = jsonFilePath;
    }

    deposit(account: Account, amount: number): ITransaction {

        // build successful transaction
        var transaction: ITransaction = {
            id: this.nextId + 1,
            type: TransactionType.Deposit,
            accountNumber: account.number,
            amount: amount,
            resultingBalance: account.balance + amount,
            succeeded: true,
            message: `Successfully deposited $${amount.toFixed(2)}`
        };

        // apply max balance rule
        if (transaction.resultingBalance > 1000) {
            transaction.succeeded = false;
            transaction.resultingBalance = account.balance;
            transaction.message = `A deposit of ${amount} would have exceeded the GFDIC max.  Cancelled.`;
        }

        // save to JSON file
        this.apply(account, transaction);

        return transaction;
    }

    withdraw(account: Account, amount: number): ITransaction {

        var transaction: ITransaction = {
            id: this.nextId + 1,
            type: TransactionType.Withdrawal,
            accountNumber: account.number,
            amount: amount,
            resultingBalance: account.balance - amount,
            succeeded: true,
            message: `Successfully withdrew $${amount.toFixed(2)}`
        };

        // apply prevent NSF rule
        if (transaction.resultingBalance < 0) {
            transaction.succeeded = false;
            transaction.resultingBalance = account.balance;
            transaction.message = `Insufficient funds on hand to withdraw $${amount.toFixed(2)}.  Cancelled.`;
        }

        // save to JSON file
        this.apply(account, transaction);

        return transaction;
    }

    private apply(account: Account, transaction: ITransaction): void {

        if (transaction.succeeded) {
            account.balance = transaction.resultingBalance;
        }

        this.save(account);
    }

    load(accountNumber: string): Account {

        let json: string = fs.readFileSync(this.filePath).toString();

        let records: IAccountRecords = JSON.parse(json);

        let query: IAccount[] = records.accounts.filter(r => r.number === accountNumber);

        if (query.length) {
            return new Account(query[0]);
        } else {
            return null;
        }
    }

    save(account: Account): void {

        // read in the JSON
        let json: string = fs.readFileSync(this.filePath).toString();

        // parse the records
        let records: IAccountRecords = JSON.parse(json);

        // find the one to update
        let query: IAccount[] = records.accounts.filter(r => r.number === account.number);

        if (query.length) {

            let accountToUpdate = query[0];

            // update the balance
            accountToUpdate.balance = account.balance;

            // now save back to the file
            fs.writeFileSync(this.filePath, JSON.stringify(records));
        } 
    }

}