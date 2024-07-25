import { Module } from '@nestjs/common';

import { CreateUserUseCase } from './create-user.use-case';
import { AuthenticateUserUseCase } from './authenticate-user.use-case';

import { IUserRepository } from 'src/domain/repositories/user.repository';

import { ServicesModule } from 'src/infrastructure/services/services.module';
import { RepositoriesModule } from 'src/infrastructure/database/repositories/repositories.module';

import { IAccessTokenService } from '../services/access-token.service';
import { IHashCryptographyService } from '../services/hash-cryptography.service';
import { IUniqueIdentifierGeneratorService } from '../services/unique-identifier-generator.service';
import { CreateProjectUseCase } from './create-project.use-case';
import { IProjectRepository } from 'src/domain/repositories/project.repository';
import { IProjectMemberRepository } from 'src/domain/repositories/project-member.repository';

@Module({
    imports: [
        ServicesModule,
        RepositoriesModule,
    ],
    providers: [
        {
            provide: CreateUserUseCase,
            useFactory: (
                userRepository: IUserRepository,
                hashCryptographyService: IHashCryptographyService,
                uniqueIdentifierGeneratorService: IUniqueIdentifierGeneratorService
            ) => {
                return new CreateUserUseCase(userRepository, hashCryptographyService, uniqueIdentifierGeneratorService);
            },
            inject: ['IUserRepository', 'IHashCryptographyService', 'IUniqueIdentifierGeneratorService']
        },
        {
            provide: AuthenticateUserUseCase,
            useFactory: (
                userRepository: IUserRepository,
                accessTokenService: IAccessTokenService,
                hashCryptographyService: IHashCryptographyService,
            ) => {
                return new AuthenticateUserUseCase(userRepository, accessTokenService, hashCryptographyService);
            },
            inject: ['IUserRepository', 'IAccessTokenService', 'IHashCryptographyService']
        },
        {
            provide: CreateProjectUseCase,
            useFactory: (
                userRepository: IUserRepository,
                projectRepository: IProjectRepository,
                projectMemberRepository: IProjectMemberRepository,
                uniqueIdentifierGeneratorService: IUniqueIdentifierGeneratorService,
            ) => {
                return new CreateProjectUseCase(
                    userRepository,
                    projectRepository,
                    projectMemberRepository,
                    uniqueIdentifierGeneratorService,
                );
            },
            inject: [
                'IUserRepository',
                'IProjectRepository',
                'IProjectMemberRepository',
                'IUniqueIdentifierGeneratorService',
            ]
        },
    ],
    exports: [
        CreateUserUseCase,
        CreateProjectUseCase,
        AuthenticateUserUseCase,
    ]
})
export class UseCasesModule {}
