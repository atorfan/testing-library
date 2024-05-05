import {PasswordValidator} from "../passwordValidator";

describe("Password validator", () => {
    let passwordValidator: PasswordValidator;

    beforeEach(() => {
        passwordValidator = new PasswordValidator();
    });

    it("passwordValidator fully compliance password", () => {
        let password = "i2_A56";

        let result = passwordValidator.execute(password);

        expect(result.valid).toBeTruthy();
        expect(result.messages).toHaveLength(0);
    });
    it("not allow passwords not compliance in all requirements", () => {
        let password = "#-@[]";

        let result = passwordValidator.execute(password);

        expect(result.valid).toBeFalsy();
        expect(result.messages).toContain("Should have a length of at least six characters");
        expect(result.messages).toContain("Should have some digit");
        expect(result.messages).toContain("Should have some capital letter");
        expect(result.messages).toContain("Should have some lowercase letter");
        expect(result.messages).toContain("Should have some underscore");
    });
    it("not allow passwords with less than six characters", () => {
        let password = "i2_A5";

        let result = passwordValidator.execute(password);

        expect(result.valid).toBeFalsy();
        expect(result.messages).toContain("Should have a length of at least six characters")
    });
    it("not allow passwords without some digit", () => {
        let password = "iz_Asb";

        let result = passwordValidator.execute(password);

        expect(result.valid).toBeFalsy();
        expect(result.messages).toContain("Should have some digit")
    });
    it("not allow passwords without some capital letter", () => {
        let password = "i2_a56";

        let result = passwordValidator.execute(password);

        expect(result.valid).toBeFalsy();
        expect(result.messages).toContain("Should have some capital letter")
    });
    it("not allow passwords without some lowercase letter", () => {
        let password = "I2_A56";

        let result = passwordValidator.execute(password);

        expect(result.valid).toBeFalsy();
        expect(result.messages).toContain("Should have some lowercase letter")
    });
    it("not allow passwords without some underscore", () => {
        let password = "I2LA56";

        let result = passwordValidator.execute(password);

        expect(result.valid).toBeFalsy();
        expect(result.messages).toContain("Should have some underscore")
    });
});
