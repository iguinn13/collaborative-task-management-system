import { User } from '../entities/user.entity';

export interface IUserRepository {
    create(user: User): Promise<User>;
    findByName(name: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}
