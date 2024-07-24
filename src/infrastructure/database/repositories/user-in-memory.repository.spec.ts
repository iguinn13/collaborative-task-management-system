import { describe, it, expect, beforeEach } from 'vitest';

import { User } from 'src/domain/entities/user.entity';
import { UserInMemoryRepository } from './user-in-memory.repository';

describe('UserInMemoryRepository', () => {
    let userRepository: UserInMemoryRepository;

    beforeEach(() => {
        userRepository = new UserInMemoryRepository();
    });

    it('should create a user', async () => {
        const user = new User({ id: '1', name: 'John Doe', email: 'john@example.com', password: 'password' });
        const createdUser = await userRepository.create(user);

        expect(createdUser).toEqual(user);
    });

    it('should find a user by name', async () => {
        const user = new User({ id: '1', name: 'John Doe', email: 'john@example.com', password: 'password' });
        await userRepository.create(user);

        const foundUser = await userRepository.findByName('John Doe');
        expect(foundUser).toEqual(user);
    });

    it('should return null if user not found by name', async () => {
        const foundUser = await userRepository.findByName('Non Existent');
        expect(foundUser).toBeNull();
    });

    it('should find a user by email', async () => {
        const user = new User({ id: '1', name: 'John Doe', email: 'john@example.com', password: 'password' });
        await userRepository.create(user);

        const foundUser = await userRepository.findByEmail('john@example.com');
        expect(foundUser).toEqual(user);
    });

    it('should return null if user not found by email', async () => {
        const foundUser = await userRepository.findByEmail('nonexistent@example.com');
        expect(foundUser).toBeNull();
    });
});
