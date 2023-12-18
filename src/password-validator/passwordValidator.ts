export class PasswordValidator {

    public execute(password: string): Result {
        const messages : string[] = [];
        let valid = this.containsUnderscore(password)
            && this.containsLowercaseLetter(password)
            && this.containsCapitalLetter(password)
            && this.containsNumber(password)
            && this.hasSixCharactersAtLeast(password);
        if (!this.containsUnderscore(password)) {
            messages.push("Should have some underscore");
        }
        if (!this.containsLowercaseLetter(password)) {
            messages.push("Should have some lowercase letter");
        }
        if (!this.containsCapitalLetter(password)) {
            messages.push("Should have some capital letter");
        }
        if (!this.containsNumber(password)) {
            messages.push("Should have some digit");
        }
        if (!this.hasSixCharactersAtLeast(password)) {
            messages.push("Should have a length of at least six characters");
        }
        return new Result(valid, messages);
    }

    private containsUnderscore(password: string) {
        return /_/.test(password);
    }

    private containsLowercaseLetter(password: string) {
        return /[a-z]/.test(password);
    }

    private containsCapitalLetter(password: string) {
        return /[A-Z]/.test(password);
    }

    private containsNumber(password: string) {
        return /\d/.test(password);
    }

    private hasSixCharactersAtLeast(password: string) {
        return password.length >= 6;
    }
}

export class Result {
    constructor(public valid: boolean, public messages: string[]) {
    }
}
