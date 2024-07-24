import { Module } from '@nestjs/common';

import { UseCasesModule } from 'src/application/use-cases/use-cases.module';
import { CreateUserController } from './controllers/create-user.controller';
import { AuthenticateUserController } from './controllers/authenticate-user.controller';

@Module({
    imports: [
        UseCasesModule
    ],
    controllers: [
        CreateUserController,
        AuthenticateUserController,
    ],
})
export class PresentationModule {}
