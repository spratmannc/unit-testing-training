
export enum TransactionType {
    Deposit = 1,
    Withdrawal = 2
}

export interface ITransaction {
    id: number;
    type: TransactionType;
    succeeded: boolean;
    accountNumber: string;
    amount: number;
    resultingBalance: number;
    message?: string;
}