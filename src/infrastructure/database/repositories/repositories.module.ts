import { Module } from '@nestjs/common';

import { UserInMemoryRepository } from './user-in-memory.repository';

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
