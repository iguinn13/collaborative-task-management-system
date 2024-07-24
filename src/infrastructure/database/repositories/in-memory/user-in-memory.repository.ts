import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class UserInMemoryRepository implements IUserRepository {
    private users: Array<User> = [];

    public async create(user: User): Promise<User> {
        this.users.push(user);

        return user;
    }

    public async findByName(name: string): Promise<User | null> {
        return this.users.find((user) => user.name === name) || null;
    }

    public async findByEmail(email: string): Promise<User | null> {
        return this.users.find((user) => user.email === email) || null;
    }
}
