import { randomUUID } from 'crypto';

import { IUserRepository } from 'src/domain/repositories/user.repository';
import { CreateUserUseCase, CreateUserUseCaseInput } from './create-user.use-case';

import { IHashCryptographyService } from '../services/hash-cryptography.service';
import { IUniqueIdentifierGeneratorService } from '../services/unique-identifier-generator.service';
import { ConflictError } from 'src/shared/errors/conflict.error';

describe('CreateUserUseCase Unit', () => {
    it('should create a new user with success', async () => {
        const userRepository: IUserRepository = {
            findByName: vitest.fn().mockResolvedValue(null),
            findByEmail: vitest.fn().mockResolvedValue(null),
            create: vitest.fn().mockResolvedValue({ id: randomUUID() }),
        };

        const hashCryptographyService: IHashCryptographyService = {
            encrypt: vitest.fn().mockResolvedValue(randomUUID()),
            compare: vitest.fn().mockResolvedValue(false),
        };

        const uniqueIdentifierGeneratorService: IUniqueIdentifierGeneratorService = {
            generate: vitest.fn().mockReturnValue(randomUUID()),
        };

        const createUserUseCase = new CreateUserUseCase(
            userRepository,
            hashCryptographyService,
            uniqueIdentifierGeneratorService
        );

        const input: CreateUserUseCaseInput = {
            name: 'test',
            email: 'test@test.com',
            password: 'Test123@',
        };

        const output = await createUserUseCase.execute(input);

        expect(!!output).toBeTruthy();
        expect(typeof output).toBe('object');
        expect(output).toHaveProperty('id');
        expect(!!output.id).toBeTruthy();
    });

    it('should throw an email already in use error on create', async () => {
        const userRepository: IUserRepository = {
            findByName: vitest.fn().mockResolvedValue(null),
            findByEmail: vitest.fn().mockResolvedValue(true),
            create: vitest.fn().mockResolvedValue({ id: randomUUID() }),
        };

        const hashCryptographyService: IHashCryptographyService = {
            encrypt: vitest.fn().mockResolvedValue(randomUUID()),
            compare: vitest.fn().mockResolvedValue(false),
        };

        const uniqueIdentifierGeneratorService: IUniqueIdentifierGeneratorService = {
            generate: vitest.fn().mockReturnValue(randomUUID()),
        };

        const createUserUseCase = new CreateUserUseCase(
            userRepository,
            hashCryptographyService,
            uniqueIdentifierGeneratorService
        );

        const input: CreateUserUseCaseInput = {
            name: 'test',
            email: 'test@test.com',
            password: 'Test123@',
        };

        try {
            await createUserUseCase.execute(input);
        } catch (error) {
            expect(!!error).toBeTruthy();
            expect(error.message).toBe('Email is already in use');
            expect(error instanceof ConflictError).toBeTruthy();
        }
    });

    it('should throw an username already in use error on create', async () => {
        const userRepository: IUserRepository = {
            findByName: vitest.fn().mockResolvedValue(true),
            findByEmail: vitest.fn().mockResolvedValue(null),
            create: vitest.fn().mockResolvedValue({ id: randomUUID() }),
        };

        const hashCryptographyService: IHashCryptographyService = {
            encrypt: vitest.fn().mockResolvedValue(randomUUID()),
            compare: vitest.fn().mockResolvedValue(false),
        };

        const uniqueIdentifierGeneratorService: IUniqueIdentifierGeneratorService = {
            generate: vitest.fn().mockReturnValue(randomUUID()),
        };

        const createUserUseCase = new CreateUserUseCase(
            userRepository,
            hashCryptographyService,
            uniqueIdentifierGeneratorService
        );

        const input: CreateUserUseCaseInput = {
            name: 'test',
            email: 'test@test.com',
            password: 'Test123@',
        };

        try {
            await createUserUseCase.execute(input);
        } catch (error) {
            expect(!!error).toBeTruthy();
            expect(error.message).toBe('Username is already in use');
            expect(error instanceof ConflictError).toBeTruthy();
        }
    });
});
