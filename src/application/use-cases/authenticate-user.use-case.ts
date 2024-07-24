import { UnauthorizedError } from 'src/shared/errors/unauthorized.error';
import { IUserRepository } from 'src/domain/repositories/user.repository';

import { IAccessTokenService } from '../services/access-token.service';
import { IHashCryptographyService } from '../services/hash-cryptography.service';

export type AuthenticateUserUseCaseInput = {
    email: string;
    password: string;
}

export type AuthenticateUserUseCaseOutput = {
    token: string;
}

export class AuthenticateUserUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly accessTokenService: IAccessTokenService,
        private readonly hashCryptographyService: IHashCryptographyService,
    ) {}

    public async execute(input: AuthenticateUserUseCaseInput): Promise<AuthenticateUserUseCaseOutput> {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) throw new UnauthorizedError('Invalid credentials');

        const passwordIsCorrect = await this.hashCryptographyService.compare(input.password, user.password);
        if (!passwordIsCorrect) throw new UnauthorizedError('Invalid credentials');

        const token = this.accessTokenService.sign({
            id: user.id,
        });

        return { token };
    }
}
