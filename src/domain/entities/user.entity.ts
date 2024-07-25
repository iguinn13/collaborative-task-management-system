import { Project } from './project.entity';

export type UserConstructorProps = {
    id: string;
    name: string;
    email: string;
    password: string;
    projects?: Array<Project>;
}

export class User {
    private _id: string;
    private _name: string;
    private _email: string;
    private _password: string;

    private _projects: Array<Project>;

    public constructor(props: UserConstructorProps) {
        this._id = props.id;
        this._name = props.name;
        this._email = props.email;
        this._password = props.password;
        this._projects = props.projects ?? [];
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

    public get projects(): Array<Project> {
        return this._projects;
    }

    public addProject(project: Project): void {
        this._projects.push(project);
    }

    public removeProject(project: Project): void {
        const projectToRemoveIndex = this._projects.findIndex((_project) => _project.id === project.id);
        if (projectToRemoveIndex === -1) return null;

        this._projects = this._projects.filter((_project, index) => index !== projectToRemoveIndex);
    }
}
