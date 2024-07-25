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

    public async findAll(): Promise<Array<User>> {
        return this.users;
    }

    public async findById(id: string): Promise<User | null> {
        return this.users.find((user) => user.id === id) || null;
    }

    public async findByIds(ids: Array<string>): Promise<Array<User>> {
        return this.users.filter((user) => ids.includes(user.id));
    }
}
