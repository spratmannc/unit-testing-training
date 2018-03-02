import * as fs from "fs";
import { IAccount } from "./account";

export interface IAccountRecords {
    accounts: IAccount[];
}

export function loadAccount(jsonPath: string, accountNumber: string): IAccount {

    let json: string = fs.readFileSync(jsonPath).toString();

    let records: IAccountRecords = JSON.parse(json);

    let query: IAccount[] = records.accounts.filter(r => r.number === accountNumber);

    if (query.length) {
        return query[0];
    } else {
        return null;
    }
}