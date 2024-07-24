import { Module } from '@nestjs/common';

import { UserInMemoryRepository } from './in-memory/user-in-memory.repository';

@Module({
    providers: [
        {
            provide: 'IUserRepository',
            useClass: UserInMemoryRepository,
        },
    ],
    exports: [
        'IUserRepository',
    ]
})
export class RepositoriesModule {}
