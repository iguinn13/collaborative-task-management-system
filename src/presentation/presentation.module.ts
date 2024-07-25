import { Module } from '@nestjs/common';

import { UseCasesModule } from 'src/application/use-cases/use-cases.module';

import { CreateUserController } from './controllers/create-user.controller';
import { CreateProjectController } from './controllers/create-project.controller';
import { AuthenticateUserController } from './controllers/authenticate-user.controller';

@Module({
    imports: [
        UseCasesModule
    ],
    controllers: [
        CreateUserController,
        CreateProjectController,
        AuthenticateUserController,
    ],
})
export class PresentationModule {}
