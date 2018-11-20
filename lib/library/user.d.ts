export default class User {
    registry: any;
    db: any;
    crypto: any;
    token: string;
    userId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    telephone: string;
    image: string;
    roleType: string;
    constructor(registry: any);
    login(email: string, password: string, override?: boolean): Promise<string | false>;
    verify(token: any): Promise<boolean>;
    getId(): number;
    getFirstName(): string;
    getMiddleName(): string;
    getLastName(): string;
    getEmail(): string;
    getTelephone(): string;
    getImage(): string;
    getRoleType(): string;
    isLogged(): boolean;
}
