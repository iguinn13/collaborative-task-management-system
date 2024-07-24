import { randomUUID } from 'crypto';

import { IUserRepository } from 'src/domain/repositories/user.repository';

import { IAccessTokenService } from '../services/access-token.service';
import { IHashCryptographyService } from '../services/hash-cryptography.service';

import { AuthenticateUserUseCase, AuthenticateUserUseCaseInput } from './authenticate-user.use-case';
import { UnauthorizedError } from 'src/shared/errors/unauthorized.error';

describe('AuthenticateUserUseCase Unit', () => {
    it('should authenticate user with success', async () => {
        const userRepository: IUserRepository = {
            findByName: vitest.fn().mockResolvedValue(null),
            findByEmail: vitest.fn().mockResolvedValue(true),
            create: vitest.fn().mockResolvedValue({ id: randomUUID() }),
        };

        const accessTokenService: IAccessTokenService = {
            sign: vitest.fn().mockReturnValue(randomUUID()),
        };

        const hashCryptographyService: IHashCryptographyService = {
            encrypt: vitest.fn().mockResolvedValue(null),
            compare: vitest.fn().mockResolvedValue(true),
        };

        const authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepository,
            accessTokenService,
            hashCryptographyService,
        );

        const input: AuthenticateUserUseCaseInput = {
            email: 'test@test.com',
            password: 'Test123@',
        };

        const output = await authenticateUserUseCase.execute(input);

        expect(!!output).toBeTruthy();
        expect(typeof output).toBe('object');
        expect(output).toHaveProperty('token');
        expect(!!output.token).toBeTruthy();
    });

    it('should throw an invalid credentials error when user not found', async () => {
        const userRepository: IUserRepository = {
            findByName: vitest.fn().mockResolvedValue(null),
            findByEmail: vitest.fn().mockResolvedValue(null),
            create: vitest.fn().mockResolvedValue({ id: randomUUID() }),
        };

        const accessTokenService: IAccessTokenService = {
            sign: vitest.fn().mockReturnValue(randomUUID()),
        };

        const hashCryptographyService: IHashCryptographyService = {
            encrypt: vitest.fn().mockResolvedValue(null),
            compare: vitest.fn().mockResolvedValue(true),
        };

        const authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepository,
            accessTokenService,
            hashCryptographyService,
        );

        const input: AuthenticateUserUseCaseInput = {
            email: 'test@test.com',
            password: 'Test123@',
        };

        try {
            await authenticateUserUseCase.execute(input);
        } catch (error) {
            expect(!!error).toBeTruthy();
            expect(error.message).toBe('Invalid credentials');
            expect(error instanceof UnauthorizedError).toBeTruthy();
        }
    });

    it('should throw an invalid credentials error when password not match', async () => {
        const userRepository: IUserRepository = {
            findByName: vitest.fn().mockResolvedValue(null),
            findByEmail: vitest.fn().mockResolvedValue(true),
            create: vitest.fn().mockResolvedValue({ id: randomUUID() }),
        };

        const accessTokenService: IAccessTokenService = {
            sign: vitest.fn().mockReturnValue(randomUUID()),
        };

        const hashCryptographyService: IHashCryptographyService = {
            encrypt: vitest.fn().mockResolvedValue(null),
            compare: vitest.fn().mockResolvedValue(false),
        };

        const authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepository,
            accessTokenService,
            hashCryptographyService,
        );

        const input: AuthenticateUserUseCaseInput = {
            email: 'test@test.com',
            password: 'Test123@',
        };

        try {
            await authenticateUserUseCase.execute(input);
        } catch (error) {
            expect(!!error).toBeTruthy();
            expect(error.message).toBe('Invalid credentials');
            expect(error instanceof UnauthorizedError).toBeTruthy();
        }
    });
});
