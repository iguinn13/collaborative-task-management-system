import { User } from '../entities/user.entity';

export interface IUserRepository {
    findAll(): Promise<Array<User>>;
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByName(name: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByIds(ids: Array<string>): Promise<Array<User>>;
}
