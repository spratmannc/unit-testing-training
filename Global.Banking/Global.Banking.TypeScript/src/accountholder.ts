import "colors";


export class IAccountHolder {
    /** First Name */
    first: string;

    /** Last Name */
    last: string;
}

/**
 * Person who owns an account
 */
export class AccountHolder implements IAccountHolder {

    /** First Name */
    first: string;

    /** Last Name */
    last: string;

    constructor(holder?: IAccountHolder) {
        if (holder) {
            this.first = holder.first;
            this.last = holder.last;
        }
    }

    /**
     * Writes the name to the screen
     */
    summarize(): void {
        console.log(`  Holder:  `.cyan + + `${this.first} ${this.last}`);
    }
}