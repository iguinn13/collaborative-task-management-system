import { User } from './user.entity';

type ProjectConstructorProps = {
    id: string;
    owner: User;
    name: string;
    createdAt?: Date;
    description: string;
}

export class Project {
    private _id: string;
    private _name: string;
    private _description: string;
    private readonly _owner: User;
    private readonly _createdAt: Date;

    public constructor(props: ProjectConstructorProps) {
        this._id = props.id;
        this._name = props.name;
        this._owner = props.owner;
        this._createdAt = props.createdAt;
        this._description = props.description;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get description(): string {
        return this._description;
    }

    public get owner(): User {
        return this._owner;
    }

    public set id(value: string) {
        this._id = value;
    }

    public set name(value: string) {
        this._name = value;
    }

    public set description(value: string) {
        this._description = value;
    }
}
