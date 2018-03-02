import { AccountHolder, IAccountHolder } from "./accountholder";
import { AccountType } from "./accounttype";


export interface IAccount {
    /** Type of Account */
    type: AccountType;

    /** Account Number */
    number: string;

    /** Current Balance */
    balance: number;

    /** Person who owns the account */
    holder: IAccountHolder;
}

export class Account {

    /** Type of Account */
    type: AccountType;

    /** Account Number */
    number: string;

    /** Current Balance */
    balance: number;

    /** Person who owns the account */
    holder: AccountHolder;

    constructor(record?: IAccount) {
        if (record) {
            this.type = record.type;
            this.holder = new AccountHolder(record.holder);
            this.balance = record.balance;
            this.number = record.number;
        }
    }


    /**
     * Writes a summary view to the screen
     */
    summarize(): void {

        console.log(`**********************************************`.green);
        console.log(`  Account: `.cyan + `${this.number}`);
        console.log(`  Type:    `.cyan + `${AccountType[this.type]}`);
        console.log(`  Balance: `.cyan + `$${this.balance.toFixed(2)}`);
        console.log(`**********************************************`.green);
    }
}