export class TokenDto {
    value: String;
    email: String;
    // expiresIn
    // IdUser

    constructor(value: string) {
        this.value = value;
    }
}