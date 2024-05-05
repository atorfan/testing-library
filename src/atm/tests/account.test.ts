import {Account, Console} from "../account";

describe("ATM machine", () => {

    const console = new Console();
    const consoleSpy = jest.spyOn(console, 'log');
    const account = new Account();

    /*
    allows to deposit into the account
    - not negative inputs

    allows to withdraw from the account
    - not negative inputs
    - not enough account balance

    print the statements of the account through the console
    */

    it("allows to deposit into the account", () => {

        account.deposit(1000);
        account.withdraw(500);
        account.deposit(2000);

        account.printStatement();

        expect(consoleSpy).toHaveBeenCalledWith('Date | Amount | Balance');
        expect(consoleSpy).toHaveBeenCalledWith('14/01/2022 | 2000.00 | 2500.00');
        expect(consoleSpy).toHaveBeenCalledWith('13/01/2022 | -500.00 | 500.00');
        expect(consoleSpy).toHaveBeenCalledWith('10/01/2022 | 1000.00 | 1000.00');
    });
});
