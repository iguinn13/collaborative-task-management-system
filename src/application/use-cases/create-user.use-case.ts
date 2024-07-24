import { User } from 'src/domain/entities/user.entity';
import { ConflictError } from 'src/shared/errors/conflict.error';
import { IUserRepository } from 'src/domain/repositories/user.repository';

import { IHashCryptographyService } from '../services/hash-cryptography.service';
import { IUniqueIdentifierGeneratorService } from '../services/unique-identifier-generator.service';

export type CreateUserUseCaseInput = {
    name: string;
    email: string;
    password: string;
}

export type CreateUserUseCaseOutput = {
    id: string;
}

export class CreateUserUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly hashCryptographyService: IHashCryptographyService,
        private readonly uniqueIdentifierGeneratorService: IUniqueIdentifierGeneratorService,
    ) {}

    public async execute(input: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput> {
        const emailAlreadyInUse = await this.userRepository.findByEmail(input.email);
        if (emailAlreadyInUse) throw new ConflictError('Email is already in use');

        const nameAlreadyInUse = await this.userRepository.findByName(input.name);
        if (nameAlreadyInUse) throw new ConflictError('Username is already in use');

        const id = this.uniqueIdentifierGeneratorService.generate();
        const hashedPassword = await this.hashCryptographyService.encrypt(input.password);

        const user = new User({
            id,
            name: input.name,
            email: input.email,
            password: hashedPassword
        });

        await this.userRepository.create(user);

        return { id };
    }
}
