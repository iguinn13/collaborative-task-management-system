export enum ProjectMemberRole {
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
}

type ProjectMemberConstructorProps = {
    id: string;
    userId: string;
    projectId: string;
    role: ProjectMemberRole;
}

export class ProjectMember {
    private _id: string;
    private _userId: string;
    private _projectId: string;
    private __role: ProjectMemberRole;

    public constructor(props: ProjectMemberConstructorProps) {
        this._id = props.id;
        this.__role = props.role;
        this._userId = props.userId;
        this._projectId = props.projectId;
    }

    public get id(): string {
        return this._id;
    }

    public get userId(): string {
        return this._userId;
    }

    public get projectId(): string {
        return this._projectId;

    }

    public get _role(): string {
        return this.__role;
    }

    public set _role(value: ProjectMemberRole) {
        this.__role = value;
    }
}
