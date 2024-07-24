export type UserConstructorProps = {
    id: string;
    name: string;
    email: string;
    password: string;
}

export class User {
    private _id: string;
    private _name: string;
    private _email: string;
    private _password: string;

    public constructor(props: UserConstructorProps) {
        this._id = props.id;
        this._name = props.name;
        this._email = props.email;
        this._password = props.password;
    }
    
    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }
}
