import { Module } from '@nestjs/common';

import { UserInMemoryRepository } from './in-memory/user-in-memory.repository';
import { ProjectInMemoryRepository } from './in-memory/project-in-memory.repository';
import { ProjectMemberInMemoryRepository } from './in-memory/project-member-in-memory.repository';

@Module({
    providers: [
        {
            provide: 'IUserRepository',
            useClass: UserInMemoryRepository,
        },
        {
            provide: 'IProjectRepository',
            useClass: ProjectInMemoryRepository,
        },
        {
            provide: 'IProjectMemberRepository',
            useClass: ProjectMemberInMemoryRepository
        }
    ],
    exports: [
        'IUserRepository',
        'IProjectRepository',
        'IProjectMemberRepository'
    ]
})
export class RepositoriesModule {}
